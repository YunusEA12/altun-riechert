const C = { deep:'#0C2A2E', petrol:'#123B40', mid:'#1F5A60', p2:'#4E6A6D', mist:'#D3DEDC', paper:'#F3F6F5', sand:'#F1E4CE', amber:'#E39A2D', white:'#FFFFFF' };
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const P = new URLSearchParams(location.search);
const W = +P.get('w') || 1280, H = +P.get('h') || 720, scene = P.get('s');
cv.width = W; cv.height = H;
const TAU = Math.PI*2;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const easeOut=t=>1-Math.pow(1-t,3);
const back=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
const seg=(t,a,b)=>clamp((t-a)/(b-a));
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}

// ---------- Höhenlinien-Feld (periodisch in t, damit die Schleife nahtlos ist)
function field(hills, t, gw, gh, sx, sy) {
  const v = new Float64Array(gw*gh);
  const hs = hills.map(h => ({
    x: h.x + h.ax*Math.cos(TAU*(t*h.k)+h.p), y: h.y + h.ay*Math.sin(TAU*(t*h.k)+h.p*1.3),
    s: h.s*(1+0.08*Math.sin(TAU*t*h.k+h.p)), a: h.a }));
  for (let j=0;j<gh;j++) for (let i=0;i<gw;i++) {
    const x=i*sx, y=j*sy; let s=0;
    for (const h of hs) { const dx=x-h.x, dy=y-h.y; s += h.a*Math.exp(-(dx*dx+dy*dy)/(2*h.s*h.s)); }
    v[j*gw+i]=s;
  }
  return v;
}
function drawContours(values, gw, gh, sx, sy, levels, style) {
  const cs = D3.contours().size([gw,gh]).thresholds(levels)(values);
  cs.forEach((c, k) => {
    ctx.beginPath();
    for (const poly of c.coordinates) for (const ring of poly) {
      ring.forEach(([x,y],i)=>{ const X=x*sx, Y=y*sy; i?ctx.lineTo(X,Y):ctx.moveTo(X,Y); });
      ctx.closePath();
    }
    style(k, cs.length);
    ctx.stroke();
  });
}
function bg(top=C.deep) {
  ctx.fillStyle = top; ctx.fillRect(0,0,W,H);
}
function glow(x,y,r,col,a){ const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,col.replace(')',`,${a})`).replace('rgb','rgba')); g.addColorStop(1,col.replace(')',',0)').replace('rgb','rgba')); ctx.fillStyle=g; ctx.fillRect(x-r,y-r,2*r,2*r); }
const AMB='rgb(227,154,45)', WHITE='rgb(255,255,255)';

// ================= Szene: Kontakt (Höhenlinien + Gipfel-Puls) =================
function kontakt(t) {
  bg();
  const s = W/1280;
  const hills = [
    {x:980*s,y:420*s,ax:30*s,ay:20*s,s:190*s,a:1.0,k:1,p:0},
    {x:640*s,y:620*s,ax:40*s,ay:25*s,s:260*s,a:.55,k:1,p:2},
    {x:240*s,y:260*s,ax:35*s,ay:30*s,s:220*s,a:.6,k:1,p:4},
    {x:1180*s,y:120*s,ax:20*s,ay:20*s,s:150*s,a:.45,k:2,p:1},
  ];
  const gw=161, gh=91, sx=W/(gw-1), sy=H/(gh-1);
  const v=field(hills,t,gw,gh,sx,sy);
  const lv=[]; for(let k=1;k<26;k++) lv.push(k*0.045);
  ctx.lineWidth=1.1*s;
  drawContours(v,gw,gh,sx,sy,lv,(k,n)=>{ ctx.strokeStyle=`rgba(211,222,220,${0.10+0.16*k/n})`; });
  let mi=0; for(let i=1;i<v.length;i++) if(v[i]>v[mi]) mi=i;
  const px=(mi%gw)*sx, py=Math.floor(mi/gw)*sy;
  const pulse=(t*3)%1;
  glow(px,py,260*s,AMB,.20);
  ctx.strokeStyle=`rgba(227,154,45,${0.6*(1-pulse)})`; ctx.lineWidth=2*s;
  ctx.beginPath(); ctx.arc(px,py,(8+70*easeOut(pulse))*s,0,TAU); ctx.stroke();
  ctx.fillStyle=C.amber; ctx.beginPath(); ctx.arc(px,py,6*s,0,TAU); ctx.fill();
}

// ================= Szene: Über uns (Karte der Region, Betriebe leuchten auf) =================
const PTS=[[180,520],[300,300],[420,450],[560,250],[640,560],[760,380],[880,200],[940,520],[1060,330],[1150,560],[340,620],[1000,120]];
function ueber(t) {
  bg();
  const s=W/1280;
  const hills=[{x:640*s,y:380*s,ax:25*s,ay:18*s,s:300*s,a:1,k:1,p:.5},{x:250*s,y:200*s,ax:30*s,ay:20*s,s:180*s,a:.5,k:1,p:3},{x:1050*s,y:560*s,ax:30*s,ay:25*s,s:200*s,a:.6,k:1,p:5}];
  const gw=161,gh=91,sx=W/(gw-1),sy=H/(gh-1);
  const v=field(hills,t,gw,gh,sx,sy);
  const lv=[]; for(let k=1;k<22;k++) lv.push(k*0.05);
  ctx.lineWidth=1*s;
  drawContours(v,gw,gh,sx,sy,lv,(k,n)=>{ ctx.strokeStyle=`rgba(211,222,220,${0.07+0.12*k/n})`; });
  // Netz: Punkte werden nacheinander verbunden, dann blendet alles weich aus
  const n=PTS.length, order=[0,1,3,2,5,4,7,6,8,9,11,10];
  const grow=seg(t,0.04,0.62), fade=1-seg(t,0.82,0.98);
  const cx=640*s, cy=380*s;
  ctx.lineWidth=1.4*s;
  order.forEach((idx,k)=>{
    const [x,y]=PTS[idx].map(q=>q*s);
    const st=k/n, a=seg(grow,st,st+1/n);
    if(a<=0) return;
    // Linie zum Zentrum (Altun & Riechert, Stuttgart)
    ctx.strokeStyle=`rgba(227,154,45,${0.45*fade})`;
    ctx.setLineDash([4*s,6*s]);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+(x-cx)*easeOut(a), cy+(y-cy)*easeOut(a)); ctx.stroke();
    ctx.setLineDash([]);
    if(a>=1){
      const ph=((t-st*0.58)*2.2)%1;
      glow(x,y,46*s,AMB,.35*fade);
      ctx.fillStyle=`rgba(255,255,255,${0.9*fade})`; ctx.beginPath(); ctx.arc(x,y,4.5*s,0,TAU); ctx.fill();
      ctx.strokeStyle=`rgba(227,154,45,${0.5*(1-ph)*fade})`; ctx.beginPath(); ctx.arc(x,y,(6+26*easeOut(ph))*s,0,TAU); ctx.stroke();
    }
  });
  // Zentrum
  const p=(t*2)%1;
  glow(cx,cy,140*s,AMB,.28);
  ctx.strokeStyle=`rgba(227,154,45,${0.7*(1-p)})`; ctx.lineWidth=2*s; ctx.beginPath(); ctx.arc(cx,cy,(10+40*easeOut(p))*s,0,TAU); ctx.stroke();
  ctx.fillStyle=C.amber; ctx.beginPath(); ctx.arc(cx,cy,8*s,0,TAU); ctx.fill();
}

// ================= Szene: Ablauf (Mail → Check → Gespräch) =================
function iconMail(x,y,s,a,k){ // a: Fortschritt 0..1, k: Hervorhebung
  ctx.save(); ctx.translate(x,y);
  const fly = seg(a,.55,1), sc=1;
  ctx.lineWidth=3*s; ctx.strokeStyle=C.white; ctx.lineJoin='round'; ctx.lineCap='round';
  const w=110*s,h=74*s;
  ctx.fillStyle=C.petrol; rr(-w/2,-h/2,w,h,8*s); ctx.fill(); ctx.stroke();
  const f=easeOut(seg(a,.1,.5)); // Klappe schließt
  ctx.beginPath(); ctx.moveTo(-w/2+4*s,-h/2+4*s); ctx.lineTo(0,-h/2+(4+ (34)*f)*s+ (1-f)*(-30*s)); ctx.lineTo(w/2-4*s,-h/2+4*s); ctx.stroke();
  const ck=back(seg(a,.6,.85));
  if(ck>0){ ctx.translate(w/2-6*s,h/2-6*s); ctx.scale(ck,ck); ctx.fillStyle=C.amber; ctx.beginPath(); ctx.arc(0,0,16*s,0,TAU); ctx.fill();
    ctx.strokeStyle=C.deep; ctx.lineWidth=3.2*s; ctx.beginPath(); ctx.moveTo(-7*s,0); ctx.lineTo(-2*s,5*s); ctx.lineTo(7*s,-6*s); ctx.stroke(); }
  ctx.restore();
}
function iconDoc(x,y,s,a){
  ctx.save(); ctx.translate(x,y); ctx.lineCap='round';
  const w=96*s,h=124*s;
  ctx.fillStyle=C.white; rr(-w/2,-h/2,w,h,10*s); ctx.fill();
  ctx.fillStyle=C.mist;
  for(let i=0;i<4;i++){
    const ly=-h/2+28*s+i*24*s;
    const lw=seg(a,.05+i*.08,.2+i*.08);
    rr(-w/2+38*s,ly-4*s,(42*s)*lw,8*s,4*s); ctx.fill();
    const ck=back(seg(a,.35+i*.12,.5+i*.12));
    if(ck>0){ ctx.save(); ctx.translate(-w/2+22*s,ly); ctx.scale(ck,ck);
      ctx.fillStyle=C.amber; ctx.beginPath(); ctx.arc(0,0,10*s,0,TAU); ctx.fill();
      ctx.strokeStyle=C.deep; ctx.lineWidth=2.6*s; ctx.beginPath(); ctx.moveTo(-4.5*s,0); ctx.lineTo(-1*s,3.5*s); ctx.lineTo(5*s,-4*s); ctx.stroke(); ctx.restore(); ctx.fillStyle=C.mist; }
  }
  ctx.restore();
}
function iconPhone(x,y,s,a){
  ctx.save(); ctx.translate(x,y);
  const wob = a>0&&a<.6 ? Math.sin(a*TAU*9)*0.06*(1-a/.6) : 0;
  ctx.rotate(wob);
  const w=70*s,h=124*s;
  ctx.fillStyle=C.petrol; ctx.strokeStyle=C.white; ctx.lineWidth=3*s; rr(-w/2,-h/2,w,h,14*s); ctx.fill(); ctx.stroke();
  ctx.fillStyle=C.white; rr(-12*s,h/2-14*s,24*s,4*s,2*s); ctx.fill();
  // Uhr: 15 Minuten füllen sich
  const p=seg(a,.25,.95);
  ctx.strokeStyle='rgba(255,255,255,.25)'; ctx.lineWidth=5*s; ctx.beginPath(); ctx.arc(0,-6*s,20*s,0,TAU); ctx.stroke();
  ctx.strokeStyle=C.amber; ctx.beginPath(); ctx.arc(0,-6*s,20*s,-Math.PI/2,-Math.PI/2+TAU*p); ctx.stroke();
  ctx.restore();
  // Schallwellen
  for(let i=0;i<3;i++){ const ph=((a*3)+i/3)%1; if(a<=0||a>=.98) break;
    ctx.strokeStyle=`rgba(227,154,45,${0.6*(1-ph)})`; ctx.lineWidth=3*s;
    ctx.beginPath(); ctx.arc(x,y,(76+40*ph)*s,-0.5,0.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(x,y,(76+40*ph)*s,Math.PI-0.5,Math.PI+0.5); ctx.stroke(); }
}
function ablauf(t){
  bg();
  const s=W/1280;
  // dezente Höhenlinien im Hintergrund
  const hills=[{x:1000*s,y:200*s,ax:20*s,ay:15*s,s:220*s,a:1,k:1,p:1},{x:200*s,y:620*s,ax:25*s,ay:15*s,s:240*s,a:.7,k:1,p:3}];
  const gw=129,gh=73,sx=W/(gw-1),sy=H/(gh-1); const v=field(hills,t,gw,gh,sx,sy);
  const lv=[]; for(let k=1;k<16;k++) lv.push(k*0.06);
  ctx.lineWidth=1*s; drawContours(v,gw,gh,sx,sy,lv,(k,n)=>{ctx.strokeStyle=`rgba(211,222,220,${0.05+0.08*k/n})`;});
  const xs=[260*s,640*s,1020*s], y=350*s;
  const fadeAll=1-seg(t,.93,1)*1;
  // Weg
  ctx.setLineDash([2*s,10*s]); ctx.lineCap='round'; ctx.lineWidth=3*s; ctx.strokeStyle='rgba(255,255,255,.22)';
  ctx.beginPath(); ctx.moveTo(xs[0],y); ctx.lineTo(xs[2],y); ctx.stroke(); ctx.setLineDash([]);
  // Fortschritt
  const prog = clamp(ease(seg(t,.22,.40))*0.5 + ease(seg(t,.56,.74))*0.5);
  ctx.strokeStyle=`rgba(227,154,45,${fadeAll})`; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(xs[0],y); ctx.lineTo(xs[0]+(xs[2]-xs[0])*prog,y); ctx.stroke();
  const dotX=xs[0]+(xs[2]-xs[0])*prog;
  glow(dotX,y,50*s,AMB,.5*fadeAll); ctx.fillStyle=C.amber; ctx.globalAlpha=fadeAll; ctx.beginPath(); ctx.arc(dotX,y,7*s,0,TAU); ctx.fill(); ctx.globalAlpha=1;
  // Stationen
  const act=[seg(t,0,.24), seg(t,.38,.58), seg(t,.72,.93)];
  const on=[t>=0, t>=.38, t>=.72];
  xs.forEach((x,i)=>{
    // Bühne
    const k = on[i]?1:0;
    const bs = 1+0.04*back(clamp(act[i]*4));
    ctx.save(); ctx.translate(x,y); ctx.scale(on[i]?bs:1,on[i]?bs:1); ctx.translate(-x,-y);
    ctx.fillStyle=on[i]? 'rgba(31,90,96,.95)':'rgba(31,90,96,.55)';
    ctx.beginPath(); ctx.arc(x,y,118*s,0,TAU); ctx.fill();
    ctx.strokeStyle=on[i]?`rgba(227,154,45,${0.9*fadeAll+0.1})`:'rgba(255,255,255,.15)'; ctx.lineWidth=2*s; ctx.stroke();
    if(i===0) iconMail(x,y,s,act[0]);
    if(i===1) iconDoc(x,y,s,act[1]);
    if(i===2) iconPhone(x,y,s,act[2]);
    ctx.restore();
    // Nummer
    const nx=x-84*s, ny=y-84*s;
    ctx.fillStyle=on[i]?C.amber:C.p2; ctx.beginPath(); ctx.arc(nx,ny,24*s,0,TAU); ctx.fill();
    ctx.fillStyle=on[i]?C.deep:C.white; ctx.font=`700 ${26*s}px Archivo`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(String(i+1),nx,ny+1*s);
  });
  // Ausblenden am Schleifenende
  if(t>.93){ ctx.fillStyle=`rgba(12,42,46,${seg(t,.93,1)})`; ctx.fillRect(0,0,W,H); }
  if(t<.04){ ctx.fillStyle=`rgba(12,42,46,${1-seg(t,0,.04)})`; ctx.fillRect(0,0,W,H); }
}
window.draw = t => ({kontakt, ueber, ablauf})[scene](t);
window.ready = document.fonts.load('700 20px Archivo').then(()=>true);
