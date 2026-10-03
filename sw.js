/* Nomad Horizon service worker: offline play + fast reloads.
   Bump VERSION on every release so installed copies pick up the new game. */
const VERSION = 'nh-2026-10-02-warpui';
const THREE_BASE = 'https://cdn.jsdelivr.net/npm/three@0.128.0/';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  THREE_BASE + 'build/three.min.js',
  THREE_BASE + 'examples/js/shaders/CopyShader.js',
  THREE_BASE + 'examples/js/shaders/LuminosityHighPassShader.js',
  THREE_BASE + 'examples/js/postprocessing/EffectComposer.js',
  THREE_BASE + 'examples/js/postprocessing/ShaderPass.js',
  THREE_BASE + 'examples/js/postprocessing/RenderPass.js',
  THREE_BASE + 'examples/js/postprocessing/UnrealBloomPass.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The game page: try the network first so updates arrive, fall back to the cached copy offline.
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('.html'))) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Versioned libraries and fonts never change: serve from cache, fetch once.
  if (url.hostname === 'cdn.jsdelivr.net' || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  // Everything else from this site (icons, manifest): cached copy now, refresh in the background.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
