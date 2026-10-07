/* Nomad Horizon trailer director.
   Loaded only when the game is opened with ?trailer. Plays a scripted sequence of shots in the live game, renders every
   frame at a fixed step (so it's smooth whatever the machine manages live), draws titles and letterbox bars, mixes the
   soundtrack with a few game sounds, and encodes an H.264/AAC MP4 in the browser (WebCodecs + mp4-muxer).
   __trailer.preview(shot, t) shows one frame for review; __trailer.render() makes the whole film and POSTs it to /save. */
(function(){
'use strict';
var N=window.__nh, D=N.director, W=1920, H=1080, FPS=30, LB=Math.round((H-W/2.39)/2);
var V=THREE.Vector3, UP=new V(0,1,0);
function sleep(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }
function clamp(v,a,b){ return v<a?a:v>b?b:v; }
function ease(t){ t=clamp(t,0,1); return t*t*(3-2*t); }
function lerp(a,b,t){ return a+(b-a)*t; }
function step(n){ for(var i=0;i<n;i++) D.tick(1/FPS); }
var st=N.state;

/* ---------- output canvas: the game frame, letterboxed, with titles over it ---------- */
var comp=document.createElement('canvas'); comp.width=W; comp.height=H; var cx=comp.getContext('2d');
var view=document.createElement('canvas'); view.width=W; view.height=H;
view.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;object-fit:contain;background:#000;z-index:99999;display:none';
document.body.appendChild(view);
function grab(overlay, t){
  cx.fillStyle='#000'; cx.fillRect(0,0,W,H);
  cx.drawImage(D.renderer.domElement,0,0,W,H);
  if(overlay) overlay(cx,t);
  cx.fillStyle='#000'; cx.fillRect(0,0,W,LB); cx.fillRect(0,H-LB,W,LB);
}
function show(){ view.style.display='block'; view.getContext('2d').drawImage(comp,0,0); }

/* ---------- titles ---------- */
function title(ctx, text, size, y, alpha, color, spacing){
  ctx.save(); ctx.globalAlpha=clamp(alpha,0,1); ctx.fillStyle=color||'#eee8da'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font='700 '+size+'px "Barlow Condensed","Arial Narrow",sans-serif'; ctx.letterSpacing=(spacing||.12)*size+'px';
  ctx.shadowColor='rgba(0,0,0,.65)'; ctx.shadowBlur=size*.25; ctx.fillText(text,W/2+(spacing||.12)*size/2,y); ctx.restore();
}
function caption(ctx, text, alpha){
  ctx.save(); ctx.globalAlpha=clamp(alpha,0,1); var x=120, y=H-LB-70;
  ctx.fillStyle='#ffb24d'; ctx.fillRect(x,y-30,4,60);
  ctx.font='600 40px "IBM Plex Mono",monospace'; ctx.letterSpacing='8px'; ctx.textBaseline='middle'; ctx.fillStyle='#eee8da';
  ctx.shadowColor='rgba(0,0,0,.7)'; ctx.shadowBlur=12; ctx.fillText(text,x+28,y); ctx.restore();
}
function fadeIO(t, a, b, inn, out){ return ease((t-a)/inn)*(1-ease((t-(b-out))/out)); }

/* ---------- helpers for staging ---------- */
function ship(){ return N.ship(); }
function S(){ return N.getS(); }
function aimShip(obj, dir){ var m=new THREE.Matrix4().lookAt(obj.position.clone().sub(dir), obj.position, UP); obj.quaternion.setFromRotationMatrix(m); }
function setYawPitchFrom(dir){ st.yaw=Math.atan2(dir.x,dir.z); st.pitch=Math.asin(clamp(dir.y/dir.length(),-1,1)); }
async function surface(i){ N.queue(i,true); for(var k=0;k<400 && !D.surfaces()[i];k++) await sleep(100); return D.surfaces()[i]; }
function camAt(fn){ D.cam(function(cam,dt){ var r=fn(cam,dt); if(r && r.p){ cam.position.copy(r.p); cam.lookAt(r.l); } if(r && r.fov){ cam.fov=r.fov; cam.updateProjectionMatrix(); } }); }
function townOf(key){ var s=S(); return s && s.towns.filter(function(T){ return T.key===key; })[0]; }
function leaveSurface(){ if(st.mode==='surface'||st.mode==='atmo'){ if(st.inHome) D.exitHome(); D.exitAtmosphere(); } }

/* ---------- the film ---------- */
var CITY='0:T1', PLANET=1;   // Salt Harbor on Glasswater: a city with your estate outside it
var SHOTS=[
  { name:'title', dur:3.5,
    setup:async function(){ leaveSurface(); st.dock=null; st.warp=null; st.spool=null; st.route=null; st.ap=null;
      var sh=ship(), P=D.planets()[PLANET]; sh.position.copy(P.pos).addScaledVector(new V(.55,.18,.82).normalize(),P.radius*3.2);
      var d=P.pos.clone().sub(sh.position).normalize(); d.applyAxisAngle(UP,.55); setYawPitchFrom(d); aimShip(sh,d); st.vel.copy(d).multiplyScalar(14); st.throttle=.25;
      this.d=d.clone(); },
    cam:function(t){ var sh=ship(), d=this.d, side=new V().crossVectors(d,UP).normalize();
      return {p:sh.position.clone().addScaledVector(side,13-t*1.2).addScaledVector(UP,-3+t*.4).addScaledVector(d,-9-t*2), l:sh.position.clone().addScaledVector(d,30)}; },
    overlay:function(ctx,t){ title(ctx,'NOMAD HORIZON',190,H/2-10,fadeIO(t,.5,3.5,.9,.6)); } },
  { name:'pier', dur:4,
    setup:async function(){ var stn=D.station(); st.vel.set(0,0,0); D.dockNow(); step(8); D.undock(); st.dock.t=-.5;
      this.side=new V().crossVectors(stn.dirW,UP).normalize(); this.base=stn.mouthW.clone(); this.dir=stn.dirW.clone(); },
    cam:function(t){ var sh=ship(); return {p:sh.position.clone().addScaledVector(this.dir,14-t*1.5).addScaledVector(this.side,-16+t*2.2).addScaledVector(UP,5.5-t*.6), l:sh.position.clone().addScaledVector(this.dir,-6).addScaledVector(UP,.5)}; },
    overlay:function(ctx,t){ caption(ctx,'HAUL FREIGHT',fadeIO(t,.6,4,.5,.5)); } },
  { name:'warp', dur:3,
    setup:async function(){ st.dock=null; var sh=ship(), stn=D.station(), d=stn.dirW.clone().applyAxisAngle(UP,-.4).normalize();
      sh.position.copy(stn.mouthW).addScaledVector(stn.dirW,420).addScaledVector(UP,40); setYawPitchFrom(d); aimShip(sh,d);
      st.warp={t:0, seed:999, swapped:false, ly:400, cruise:5.4, prog:0}; this.d=d.clone(); this.side=new V().crossVectors(d,UP).normalize(); },
    cam:function(t){ var sh=ship(), d=this.d; return {p:sh.position.clone().addScaledVector(d,-13+t*1.5).addScaledVector(this.side,4.5).addScaledVector(UP,2.4), l:sh.position.clone().addScaledVector(d,40)}; },
    overlay:function(ctx,t){ caption(ctx,'ACROSS AN ENDLESS GALAXY',fadeIO(t,.9,3,.4,.4)); },
    after:function(){ st.warp=null; D.camera.fov=62; D.camera.updateProjectionMatrix(); st.fovKick=0; } },
  { name:'reentry', dur:4,
    setup:async function(){ var P=D.planets()[PLANET]; await surface(PLANET); var sh=ship();
      sh.position.copy(P.pos).addScaledVector(new V(.2,.5,.84).normalize(),P.radius*1.3); var d=P.pos.clone().sub(sh.position).normalize(); setYawPitchFrom(d); aimShip(sh,d);
      st.vel.copy(d).multiplyScalar(60); D.enterAtmosphere(P); N.gfx.day(Math.PI*.42);
      var Sx=S(), T=townOf(CITY); Sx.ship.position.set(T.x+900,240,T.z+520); var dd=new V(T.x-Sx.ship.position.x,0,T.z-Sx.ship.position.z).normalize();
      st.yaw=Math.atan2(dd.x,dd.z); st.pitch=-.42; st.vel.set(dd.x*70,-38,dd.z*70); D.cam(null); step(2); },
    cam:null,
    overlay:function(ctx,t){ caption(ctx,'DOWN THROUGH THE WEATHER',fadeIO(t,.6,4,.5,.5)); } },
  { name:'landing', dur:4,
    setup:async function(){ var Sx=S(), T=townOf(CITY); N.gfx.day(Math.PI*.08);
      st.landing=null; st.mode='atmo'; Sx.ship.position.set(T.x+90,T.pad.y+40,T.z-70); var dd=new V(T.x-Sx.ship.position.x,0,T.z-Sx.ship.position.z).normalize();
      st.yaw=Math.atan2(dd.x,dd.z); st.pitch=-.05; st.vel.set(dd.x*14,-2,dd.z*14); D.setShipFlying && D.setShipFlying(Sx.ship,true);
      st.ap={kind:'town', key:T.key, name:T.name, t:0};
      this.T=T; this.cp=new V(T.x-30,T.pad.y+9,T.z+40); },
    cam:function(t){ var sh=S().ship; return {p:this.cp.clone().add(new V(t*1.2,0,-t*.6)), l:sh.position.clone().addScaledVector(UP,-1)}; },
    overlay:function(ctx,t){ caption(ctx,'BUILD UP THE FRONTIER',fadeIO(t,.8,4,.5,.5)); } },
  { name:'city', dur:3.5,
    setup:async function(){ var Sx=S(), T=townOf(CITY); N.gfx.day(-Math.PI*.35);
      Sx.ship.position.set(T.x+160,T.pad.y+1.6,T.z-120);
      var fv=D.fleetVisit({tier:3, name:'HF-04', pilot:{name:'WREN', grade:'veteran'}},T); var v=N.town.fleetVis()[0];
      if(v){ v.ph='down'; v.t=1.2; v.h.position.copy(v.hover); }
      this.T=T; this.cp=new V(T.x+34,T.pad.y+24,T.z+30); },
    cam:function(t){ var T=this.T; return {p:this.cp.clone().add(new V(-t*1.6,-t*1.2,t*1.0)), l:new V(T.x,T.pad.y+6-t*1.2,T.z)}; },
    overlay:null },
  { name:'home', dur:4,
    setup:async function(){ N.gfx.day(Math.PI*.12); var HT=D.homeT(); var Sx=S();
      Sx.ship.position.set(HT.x,HT.pad.y+N.ship().userData.gear*0+Sx.ship.userData.gear,HT.z); D.setShipFlying(Sx.ship,false);
      var vf=N.town.fleetVis(); vf.forEach(function(v){ v.t=999; v.ph='out'; }); step(2);
      this.H=HT; },
    cam:function(t){ var L=this.H.lot, a=L.rot+Math.PI+.55-t*.07, r=L.d*.95+16, c=new V(L.x,L.y,L.z);
      return {p:c.clone().add(new V(Math.sin(a)*r,13-t*.5,Math.cos(a)*r)), l:c.clone().add(new V(0,1.5,0))}; },
    overlay:function(ctx,t){ caption(ctx,'COME HOME',fadeIO(t,.8,4,.5,.5)); } },
  { name:'orbit', dur:4,
    setup:async function(){ leaveSurface(); var sh=ship(), P=D.planets()[PLANET];
      var n=new V(-.35,.25,.9).normalize(); sh.position.copy(P.pos).addScaledVector(n,P.radius*1.45);
      var d=new V().crossVectors(n,UP).normalize(); setYawPitchFrom(d); aimShip(sh,d); st.vel.copy(d).multiplyScalar(3); st.throttle=0; this.n=n; this.d=d; },
    cam:function(t){ var sh=ship(), k=ease(t/4); return {p:sh.position.clone().addScaledVector(this.n,6+k*60).addScaledVector(this.d,-10-k*30).addScaledVector(UP,2+k*12), l:sh.position.clone().addScaledVector(this.n,-k*30)}; },
    overlay:function(ctx,t){ var a=fadeIO(t,.6,4.6,.8,.01), f=ease((t-3.3)/.7);
      title(ctx,'NOMAD HORIZON',150,H/2-40,a); title(ctx,'HAUL FREIGHT ACROSS AN ENDLESS GALAXY',38,H/2+70,fadeIO(t,1.2,4.6,.8,.01),'#ffb24d',.22);
      if(f>0){ ctx.save(); ctx.globalAlpha=f; ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H); ctx.restore(); } } }
];
var TOTAL=SHOTS.reduce(function(a,s){ return a+s.dur; },0);

async function prepare(){
  D.set({w:W, h:H}); D.setRes(); st.needsOff=true;
  document.getElementById('hud').style.visibility='hidden';
  ['toastWrap','cbMsg','guide','stationPanel','lawPanel'].forEach(function(id){ var e=document.getElementById(id); if(e) e.style.visibility='hidden'; });
  for(var k=0;k<20 && st.mode==='title';k++){ N.enter(); await sleep(250); }
  if(st.mode==='title') throw new Error('could not leave the title screen');
  await sleep(200);
}
async function runShot(i, onFrame, upTo){
  var sh=SHOTS[i]; await sh.setup.call(sh);
  if(sh.cam){ var self=sh, t0=0; D.cam(function(cam){ var r=self.cam.call(self,self._t||0); cam.position.copy(r.p); cam.lookAt(r.l); }); } else D.cam(null);
  var n=Math.round(sh.dur*FPS), last=upTo==null?n:Math.min(n,Math.round(upTo*FPS)+1);
  for(var f=0;f<last;f++){ sh._t=f/FPS; D.tick(1/FPS); grab(sh.overlay?function(ctx){ sh.overlay.call(sh,ctx,f/FPS); }:null, f/FPS); if(onFrame) await onFrame(f); }
  if(sh.after) sh.after();
}
window.__trailer={
  shots:SHOTS.map(function(s){ return s.name; }), total:TOTAL,
  preview:async function(i, t){ await prepare(); await runShot(i,null,t||0); show(); return SHOTS[i].name+' @ '+(t||0)+'s'; },
  hide:function(){ view.style.display='none'; },
  still:async function(i, t, name){ await prepare(); await runShot(i,null,t||0); var small=document.createElement('canvas'); small.width=960; small.height=540; small.getContext('2d').drawImage(comp,0,0,960,540);
    var blob=await new Promise(function(r){ small.toBlob(r,'image/jpeg',.85); }); var res=await fetch('/save?name='+(name||('still-'+SHOTS[i].name+'.jpg')),{method:'POST', body:blob}); return await res.text(); },
  render:async function(opts){ opts=opts||{}; await prepare();
    await loadScript('https://cdn.jsdelivr.net/npm/mp4-muxer@5.1.3/build/mp4-muxer.js');
    var audio=await mixAudio();
    var muxer=new Mp4Muxer.Muxer({target:new Mp4Muxer.ArrayBufferTarget(), video:{codec:'avc', width:W, height:H}, audio:{codec:'aac', numberOfChannels:2, sampleRate:48000}, fastStart:'in-memory'});
    var venc=new VideoEncoder({output:function(c,m){ muxer.addVideoChunk(c,m); }, error:function(e){ console.error(e); }});
    venc.configure({codec:'avc1.640028', width:W, height:H, bitrate:16e6, framerate:FPS});
    var frame=0, t0=performance.now();
    for(var i=0;i<SHOTS.length;i++){
      await runShot(i, async function(){ var vf=new VideoFrame(comp,{timestamp:Math.round(frame*1e6/FPS), duration:Math.round(1e6/FPS)}); venc.encode(vf,{keyFrame:frame%(FPS*2)===0}); vf.close(); frame++;
        if(frame%15===0){ show(); window.__trailerProgress=frame; } while(venc.encodeQueueSize>6) await sleep(5); });
    }
    await venc.flush();
    await encodeAudio(audio,muxer);
    muxer.finalize(); var buf=muxer.target.buffer;
    var res=await fetch('/save?name='+(opts.name||'nomad-horizon-trailer.mp4'),{method:'POST', body:buf});
    return {frames:frame, seconds:frame/FPS, bytes:buf.byteLength, renderSec:Math.round((performance.now()-t0)/1000), saved:await res.text(), music:audio.track};
  }
};
function loadScript(src){ return new Promise(function(ok,bad){ if(window.Mp4Muxer) return ok(); var s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=bad; document.head.appendChild(s); }); }

/* ---------- sound: a soundtrack excerpt with fades, and a few game sounds on the cuts ---------- */
async function decode(url, ctx){ var b=await (await fetch(url)).arrayBuffer(); return await ctx.decodeAudioData(b); }
async function pickTrack(ctx){
  var best=null;
  for(var k=1;k<=7;k++){ var buf=await decode('audio/music/track'+k+'.mp3',ctx); if(buf.duration<TOTAL+4) continue;
    var ch=buf.getChannelData(0), sr=buf.sampleRate, win=Math.floor(sr), rms=[];
    for(var s=0;s+win<=ch.length;s+=win){ var e=0; for(var j=s;j<s+win;j+=8) e+=ch[j]*ch[j]; rms.push(Math.sqrt(e/(win/8))); }
    for(var a=0;a+TOTAL<=rms.length;a+=2){ var seg=rms.slice(a,a+Math.round(TOTAL)), mean=seg.reduce(function(x,y){ return x+y; },0)/seg.length,
      rise=seg.slice(-8).reduce(function(x,y){ return x+y; },0)/8-seg.slice(0,6).reduce(function(x,y){ return x+y; },0)/6, sc=mean+rise*.8;
      if(!best || sc>best.sc) best={sc:sc, buf:buf, at:a, track:'track'+k+'.mp3'}; }
  }
  return best;
}
async function mixAudio(){
  var tmp=new AudioContext({sampleRate:48000}), pick=await pickTrack(tmp), len=Math.ceil(TOTAL*48000);
  var oc=new OfflineAudioContext(2,len,48000), mg=oc.createGain(), src=oc.createBufferSource(); src.buffer=pick.buf; src.connect(mg); mg.connect(oc.destination);
  mg.gain.setValueAtTime(0,0); mg.gain.linearRampToValueAtTime(.9,1.2); mg.gain.setValueAtTime(.9,TOTAL-2.2); mg.gain.linearRampToValueAtTime(0,TOTAL-.1);
  src.start(0,pick.at);
  var starts=[], acc=0; SHOTS.forEach(function(s){ starts.push(acc); acc+=s.dur; });
  async function sfxAt(url, t, vol){ var b=await decode(url,tmp), s=oc.createBufferSource(), g=oc.createGain(); s.buffer=b; g.gain.value=vol; s.connect(g); g.connect(oc.destination); s.start(t); }
  await sfxAt('audio/hatch_open.mp3',starts[1]+.4,.35);
  await sfxAt('audio/warp_whoosh.mp3',starts[2]+.1,.7);
  await sfxAt('audio/reentry.mp3',starts[3],.45);
  await sfxAt('audio/landing.mp3',starts[4]+.6,.4);
  await sfxAt('audio/gear.mp3',starts[4]+2.6,.4);
  await sfxAt('audio/town_amb.mp3',starts[5],.25);
  var out=await oc.startRendering(); tmp.close();
  return {buf:out, track:pick.track, at:pick.at};
}
async function encodeAudio(A, muxer){
  var aenc=new AudioEncoder({output:function(c,m){ muxer.addAudioChunk(c,m); }, error:function(e){ console.error(e); }});
  aenc.configure({codec:'mp4a.40.2', sampleRate:48000, numberOfChannels:2, bitrate:192000});
  var L=A.buf.getChannelData(0), R=A.buf.getChannelData(1), CH=1024;
  for(var s=0;s<L.length;s+=CH){ var n=Math.min(CH,L.length-s), data=new Float32Array(n*2); data.set(L.subarray(s,s+n),0); data.set(R.subarray(s,s+n),n);
    var ad=new AudioData({format:'f32-planar', sampleRate:48000, numberOfFrames:n, numberOfChannels:2, timestamp:Math.round(s/48000*1e6), data:data}); aenc.encode(ad); ad.close(); }
  await aenc.flush();
}
})();
