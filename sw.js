/* Nomad Horizon service worker: offline play + fast reloads.
   Bump VERSION on every release so installed copies pick up the new game. */
const VERSION = 'nh-2026-10-03-hangar';
const MUSIC_CACHE = 'nh-music-1';   // kept across releases so music downloads once
const THREE_BASE = 'https://cdn.jsdelivr.net/npm/three@0.128.0/';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './audio/cab_drone.mp3', './audio/station_amb.mp3', './audio/warp_whoosh.mp3', './audio/hatch_open.mp3', './audio/hatch_close.mp3', './audio/forklift.mp3', './audio/warehouse.mp3', './audio/warp_spool.mp3', './audio/landing.mp3', './audio/airbrake.mp3', './audio/scanner.mp3', './audio/confirm.mp3', './audio/gate_chains.mp3', './audio/steps.mp3', './audio/town_amb.mp3', './audio/crickets.mp3', './audio/gear.mp3', './audio/reentry.mp3', './audio/reentry_loop.mp3',
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
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== MUSIC_CACHE).map((k) => caches.delete(k))))
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

  // Music: served from its own cache (fetched whole on first play), with byte ranges for the audio player.
  if (url.origin === location.origin && url.pathname.indexOf('/audio/music/') >= 0) {
    e.respondWith(musicResponse(req, url));
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

/* ---------- music for offline play ---------- */
async function musicFull(key) {
  const cache = await caches.open(MUSIC_CACHE);
  let hit = await cache.match(key);
  if (!hit) {
    const res = await fetch(key);
    if (!res.ok) return null;
    await cache.put(key, res.clone());
    hit = res;
  }
  return hit;
}
async function musicResponse(req, url) {
  const key = url.origin + url.pathname;
  let full;
  try { full = await musicFull(key); } catch (err) { full = null; }
  if (!full) return new Response('', { status: 504 });
  const buf = await full.arrayBuffer(), total = buf.byteLength;
  const head = { 'Content-Type': 'audio/mpeg', 'Accept-Ranges': 'bytes' };
  const range = req.headers.get('range');
  const m = range && /bytes=(\d*)-(\d*)/.exec(range);
  if (!m) return new Response(buf, { status: 200, headers: Object.assign({ 'Content-Length': String(total) }, head) });
  let start = m[1] ? +m[1] : 0, end = m[2] ? +m[2] : total - 1;
  if (!m[1] && m[2]) { start = Math.max(0, total - +m[2]); end = total - 1; }
  end = Math.min(end, total - 1);
  if (start > end) return new Response('', { status: 416, headers: { 'Content-Range': 'bytes */' + total } });
  return new Response(buf.slice(start, end + 1), { status: 206, headers: Object.assign({
    'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Content-Length': String(end - start + 1) }, head) });
}
// The page asks for the whole soundtrack in the background; reply when it is all stored.
self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type !== 'cache-music' || !Array.isArray(d.urls)) return;
  e.waitUntil((async () => {
    const cache = await caches.open(MUSIC_CACHE);
    let fresh = 0;
    for (const u of d.urls) {
      const key = new URL(u, self.registration.scope).href;
      if (await cache.match(key)) continue;
      try { const res = await fetch(key); if (res.ok) { await cache.put(key, res); fresh++; } } catch (err) { return; }
    }
    const all = await self.clients.matchAll();
    all.forEach((c) => c.postMessage({ type: 'music-cached', fresh: fresh }));
  })());
});
