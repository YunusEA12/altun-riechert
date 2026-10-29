// Panel-Videos Sichtbar, Fachkräfte, Automatisierung: echte Bewegung auf den vorhandenen Panel-Bildern.
const cv=document.getElementById('c'), ctx=cv.getContext('2d');
const P=new URLSearchParams(location.search), scene=P.get('s');
const W=1280,H=720; cv.width=W; cv.height=H;
const TAU=Math.PI*2, clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), seg=(t,a,b)=>clamp((t-a)/(b-a));
const easeOut=t=>1-Math.pow(1-t,3), ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const back=t=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
const AMBER='#E39A2D', PETROL='#123B40', DEEP='#0C2A2E';
const img=new Image(); img.src=`first-${scene}.png`;
window.ready=new Promise(r=>img.onload=()=>r(true));
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};}

// Kamera: sanftes Hin- und Zurückfahren, nahtlos in der Schleife
function camera(t,cx,cy,amp){const z=1.035+amp*0.5*(1-Math.cos(TAU*t));ctx.setTransform(z,0,0,z,cx-cx*z,cy-cy*z);}
// Staub im Licht
function dust(t,box,n,seed,col){const r=rng(seed);for(let i=0;i<n;i++){const x0=box[0]+r()*box[2],y0=box[1]+r()*box[3],sp=.4+r()*.8,ph=r(),sz=.6+r()*1.8;
  const k=(t*sp+ph)%1; const x=x0+Math.sin(TAU*(t+ph))*18, y=y0-k*60; const a=Math.sin(Math.PI*k)*(.25+r()*.45);
  ctx.fillStyle=`rgba(${col},${a})`;ctx.beginPath();ctx.arc(x,y,sz,0,TAU);ctx.fill();}}
function glow(x,y,r,rgb,a){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${rgb},${a})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
function quad(q){ctx.beginPath();ctx.moveTo(...q[0]);ctx.lineTo(...q[1]);ctx.lineTo(...q[2]);ctx.lineTo(...q[3]);ctx.closePath();}
function star(x,y,r){ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;ctx.lineTo(x+rr*Math.cos(a),y+rr*Math.sin(a));}ctx.closePath();}
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}

// ---------------- Sichtbar: Handy im Transporter, Pin fällt, Sterne füllen sich ----------------
function sichtbar(t){
  camera(t,650,330,0.03);
  ctx.drawImage(img,0,0,W,H);
  // Bildschirm (Ecken im Bild) neu zeichnen
  const Q=[[586,202],[700,197],[717,465],[591,471]];
  ctx.save(); quad(Q); ctx.clip();
  ctx.fillStyle='#22302f'; ctx.fillRect(560,180,180,310);
  const g=ctx.createLinearGradient(0,200,0,470); g.addColorStop(0,'rgba(60,78,76,.55)'); g.addColorStop(1,'rgba(20,28,28,.2)'); ctx.fillStyle=g; ctx.fillRect(560,180,180,310);
  // Karte driftet langsam (periodisch)
  const ox=Math.sin(TAU*t)*6, oy=Math.cos(TAU*t)*5;
  ctx.strokeStyle='rgba(220,230,228,.28)'; ctx.lineWidth=1.6;
  [[560,250,760,215],[560,330,760,280],[575,420,760,365],[600,180,700,490],[650,180,640,490],[690,180,735,490],[560,380,760,450]].forEach(([a,b,c,d])=>{ctx.beginPath();ctx.moveTo(a+ox,b+oy);ctx.lineTo(c+ox,d+oy);ctx.stroke();});
  ctx.strokeStyle='rgba(227,154,45,.35)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(595+ox,455+oy); ctx.quadraticCurveTo(630+ox,360+oy,648+ox,330+oy); ctx.stroke();
  // Pin fällt (0.04–0.16), pulsiert, steigt am Ende wieder auf
  const px=648, py0=322;
  const drop=back(seg(t,.04,.16)), up=ease(seg(t,.9,.98));
  const py=py0-(1-drop)*90-up*90, pa=seg(t,.04,.08)*(1-up);
  if(pa>0){
    glow(px,py+4,48,'227,154,45',.55*pa);
    const ph=(t*4)%1; ctx.strokeStyle=`rgba(227,154,45,${.7*(1-ph)*pa*seg(t,.16,.2)})`; ctx.lineWidth=2;
    ctx.beginPath(); ctx.ellipse(px,py0+18,8+26*ph,3+9*ph,0,0,TAU); ctx.stroke();
    ctx.globalAlpha=pa; ctx.fillStyle='#F2B357';
    ctx.beginPath(); ctx.arc(px,py-6,13,Math.PI*0.85,Math.PI*2.15); ctx.lineTo(px,py+16); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#3a2a12'; ctx.beginPath(); ctx.arc(px,py-6,5,0,TAU); ctx.fill(); ctx.globalAlpha=1;
  }
  // Sterne nacheinander (0.25–0.55), am Ende ausblenden
  const fade=1-seg(t,.86,.95);
  for(let i=0;i<5;i++){const x=624+i*14.5, y=440-i*0.6, k=back(seg(t,.25+i*.06,.33+i*.06));
    ctx.fillStyle='rgba(255,255,255,.18)'; star(x,y,6.2); ctx.fill();
    if(k>0){ctx.save();ctx.translate(x,y);ctx.scale(k,k);glow(0,0,14,'227,154,45',.6*fade);ctx.fillStyle=`rgba(242,179,87,${fade})`;star(0,0,6.2);ctx.fill();ctx.restore();}}
  // Glanz wandert über das Glas
  const sh=seg(t,.6,.75); if(sh>0&&sh<1){const x=560+sh*240;const gg=ctx.createLinearGradient(x-30,0,x+30,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,'rgba(255,255,255,.18)');gg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gg;ctx.fillRect(540,170,260,330);}
  ctx.restore();
  // Bildschirmlicht auf dem Halter
  glow(650,330,140,'227,154,45',.06+.04*Math.sin(TAU*t*2));
  // Sonne flackert durch die Scheibe, Staub im Licht
  glow(30,30,420,'255,214,150',.22+.06*Math.sin(TAU*t*3)+.03*Math.sin(TAU*t*7));
  dust(t,[0,40,560,300],70,7,'255,226,180');
}

// ---------------- Fachkräfte: Bewerbung kommt aufs Handy ----------------
function fachkraefte(t){
  camera(t,650,330,0.03);
  ctx.drawImage(img,0,0,W,H);
  // Licht durchs Fenster, Staub
  glow(900,100,380,'255,236,205',.10+.05*Math.sin(TAU*t*2));
  dust(t,[700,0,560,420],80,11,'255,240,215');
  // Bildschirm leuchtet beim Senden auf
  const Q=[[633,294],[697,300],[651,371],[601,354]];
  const send=seg(t,.18,.24)*(1-seg(t,.28,.4));
  ctx.save(); quad(Q); ctx.clip();
  // Formularzeilen füllen sich
  for(let i=0;i<3;i++){const k=easeOut(seg(t,.04+i*.04,.1+i*.04))*(1-seg(t,.9,.97));
    const y=307+i*11; ctx.fillStyle='rgba(18,59,64,.55)'; const x0=622-i*4.5, w=36*k; ctx.save(); ctx.translate(x0,y); ctx.rotate(.1); ctx.fillRect(0,0,w,2.4); ctx.restore();}
  ctx.fillStyle=`rgba(227,154,45,${send*.5})`; ctx.fillRect(590,285,120,100);
  ctx.restore();
  // Button pulsiert vor dem Absenden
  const bp=seg(t,.12,.18); if(bp>0&&bp<1){glow(629,353,30,'60,150,220',.5*Math.sin(Math.PI*bp));}
  // Bestätigungs-Karten steigen auf
  for(let i=0;i<3;i++){
    const st=.22+i*.18, k=seg(t,st,st+.42);
    if(k<=0||k>=1) continue;
    const a=Math.sin(Math.PI*k), x=705+i*44+Math.sin(TAU*k)*6, y=300-easeOut(k)*190;
    ctx.save(); ctx.globalAlpha=a; ctx.translate(x,y); const s=1.35*(.9+.1*back(seg(k,0,.2))); ctx.scale(s,s);
    ctx.shadowColor='rgba(12,42,46,.35)'; ctx.shadowBlur=18; ctx.shadowOffsetY=6;
    ctx.fillStyle='#FFFFFF'; rr(0,0,124,44,12); ctx.fill(); ctx.shadowColor='transparent';
    ctx.fillStyle=PETROL; ctx.beginPath(); ctx.arc(22,22,13,0,TAU); ctx.fill();
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(22,18,4.5,0,TAU); ctx.fill(); ctx.beginPath(); ctx.arc(22,31,8,Math.PI,TAU); ctx.fill();
    ctx.fillStyle='#D3DEDC'; rr(44,13,52,6,3); ctx.fill(); rr(44,25,36,6,3); ctx.fill();
    ctx.fillStyle=AMBER; ctx.beginPath(); ctx.arc(106,22,9,0,TAU); ctx.fill();
    ctx.strokeStyle=DEEP; ctx.lineWidth=2.4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(102,22); ctx.lineTo(105,25); ctx.lineTo(110,18); ctx.stroke();
    ctx.restore();
  }
}

// ---------------- Automatisierung: Daten fließen, Kaffee dampft ----------------
const NODES={L3:[946,298],L2:[1003,298],L1:[1066,298],C:[1142,297],R1:[1218,298],R2:[1270,298],TL:[1046,253],BL:[1046,346],TR:[1240,253],BR:[1240,346],T1:[1142,230],T2:[1142,190],B1:[1142,347],B2:[1142,381],B3:[1142,415]};
const PATHS=[['L3','L2','L1','C','R1','R2'],['TL','C','BR'],['BL','C','TR'],['T2','T1','C','B1','B2','B3'],['L3','L2','L1','C','TR'],['BL','C','R1','R2']];
function along(path,k){const pts=path.map(n=>NODES[n]);let L=0;const seg2=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg2.push(d);L+=d;}
  let s=k*L;for(let i=0;i<seg2.length;i++){if(s<=seg2[i]){const f=s/seg2[i];return[pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f];}s-=seg2[i];}return pts[pts.length-1];}
function automatisierung(t){
  camera(t,900,360,0.03);
  ctx.drawImage(img,0,0,W,H);
  // Lichtpakete laufen über das Diagramm auf dem Laptop
  ctx.save(); ctx.beginPath(); ctx.rect(872,134,408,333); ctx.clip();
  PATHS.forEach((p,i)=>{for(let j=0;j<2;j++){const k=((t*2)+i/PATHS.length+j*.5)%1; const [x,y]=along(p,k); const a=Math.sin(Math.PI*k);
    glow(x,y,26,'227,154,45',.8*a); ctx.fillStyle=`rgba(255,210,140,${a})`; ctx.beginPath(); ctx.arc(x,y,3.6,0,TAU); ctx.fill();}});
  // Knoten leuchten nacheinander
  Object.values(NODES).forEach(([x,y],i)=>{const a=Math.max(0,Math.sin(TAU*(t*2+i*.13)))**6; glow(x,y,30,'227,154,45',.55*a);});
  const c=(t*4)%1; ctx.strokeStyle=`rgba(227,154,45,${.5*(1-c)})`; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(1142,297,22+30*c,0,TAU); ctx.stroke();
  ctx.restore();
  // Sonne durchs Fenster, Blätterschatten bewegen sich leicht
  glow(120,120,420,'255,230,190',.10+.04*Math.sin(TAU*t*2));
  ctx.save(); ctx.globalCompositeOperation='multiply';
  for(let i=0;i<6;i++){const x=120+i*70+Math.sin(TAU*(t+i*.17))*12, y=470+Math.cos(TAU*(t+i*.11))*8;
    const g=ctx.createRadialGradient(x,y,0,x,y,40); g.addColorStop(0,'rgba(120,110,95,.18)'); g.addColorStop(1,'rgba(120,110,95,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,40,0,TAU); ctx.fill();}
  ctx.restore();
  dust(t,[0,0,700,420],60,5,'255,236,205');
}
window.draw=t=>{ctx.setTransform(1,0,0,1,0,0);({sichtbar,fachkraefte,automatisierung})[scene](t);};
