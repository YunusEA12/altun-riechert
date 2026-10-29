// Bildschirmaufnahme der Muster-Website mit sichtbarem Mauszeiger: Vergleich ziehen, Formular ausfüllen, Demo absenden.
const { chromium } = require('playwright');
const out = process.argv[2]; const W = 1280, H = 800;
(async () => {
  const b = await chromium.launch();
  const pg = await (await b.newContext({ viewport:{width:W,height:H}, deviceScaleFactor:1, reducedMotion:'reduce' })).newPage();
  await pg.goto('http://localhost:8765/beispiel/', {waitUntil:'networkidle'}); await pg.waitForTimeout(1200);
  await pg.addStyleTag({content:`html{scroll-behavior:auto!important} ::-webkit-scrollbar{display:none}
    #rc{position:fixed;left:0;top:0;width:26px;height:26px;z-index:99999;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))}
    #rr{position:fixed;left:0;top:0;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:3px solid #E39A2D;z-index:99998;pointer-events:none;opacity:0}`});
  await pg.evaluate(()=>{const d=document.createElement('div');d.id='rc';d.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26"><path d="M3 2l7.5 19 2.6-7.6L21 11z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';document.body.appendChild(d);const r=document.createElement('div');r.id='rr';document.body.appendChild(r);});
  let f = 0, cx = 980, cy = 620, ripple = -99;
  const ease = t => t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
  async function shot() {
    const rk = (f - ripple) / 12;
    await pg.evaluate(([x,y,rk])=>{const c=document.getElementById('rc');c.style.transform=`translate(${x-3}px,${y-2}px)`;
      const r=document.getElementById('rr');r.style.left=x+'px';r.style.top=y+'px';
      if(rk>=0&&rk<1){r.style.opacity=String(1-rk);r.style.transform=`scale(${.4+rk*.9})`;}else r.style.opacity='0';},[cx,cy,rk]);
    await pg.screenshot({path:`${out}/f${String(f).padStart(4,'0')}.png`}); f++;
  }
  const hold = async n => { for (let i=0;i<n;i++) await shot(); };
  async function center(sel, dx=0, dy=0) { return pg.evaluate(([s,dx,dy])=>{const r=document.querySelector(s).getBoundingClientRect();return [r.left+r.width/2+dx, r.top+r.height/2+dy];},[sel,dx,dy]); }
  async function moveTo([tx,ty], n, drag=false) { const sx=cx, sy=cy; for (let i=1;i<=n;i++){ const k=ease(i/n); cx=sx+(tx-sx)*k; cy=sy+(ty-sy)*k; await pg.mouse.move(cx,cy); await shot(); } }
  async function click(real=true) { if (real) await pg.mouse.click(cx,cy); ripple=f; await hold(8); }
  async function scrollTo(y, n) { const s = await pg.evaluate(()=>scrollY); for (let i=1;i<=n;i++){ await pg.evaluate(v=>scrollTo(0,v), Math.round(s+(y-s)*ease(i/n))); await shot(); } }
  async function type(text, per=2) { for (const ch of text) { await pg.keyboard.type(ch); await hold(per); } }

  await hold(18);
  // Vorher/Nachher-Regler ziehen
  await moveTo(await center('#compare'), 30);
  await pg.mouse.down(); ripple=f;
  const box = await pg.evaluate(()=>{const r=document.getElementById('compare').getBoundingClientRect();return [r.left,r.width,r.top+r.height/2];});
  for (const [to,n] of [[.15,26],[.85,40],[.5,22]]) await moveTo([box[0]+box[1]*to, box[2]], n);
  await pg.mouse.up(); await hold(8);
  // Button „Angebot mit Fotos anfragen“
  await moveTo(await center('.hero .cta .btn'), 30); await click(false);
  const formY = await pg.evaluate(()=>document.getElementById('anfrage').getBoundingClientRect().top + scrollY - 70);
  await scrollTo(formY, 40);
  // Arbeiten wählen
  await moveTo(await center('label:has(#w-fassade)'), 26); await click();
  await moveTo(await center('label:has(#w-tapete)'), 16); await click();
  // Name, Telefon, Ort
  const nameY = await pg.evaluate(()=>document.getElementById('f-name').getBoundingClientRect().top + scrollY - 380);
  await scrollTo(nameY, 30);
  await moveTo(await center('#f-name', -60), 22); await click(); await type('Maria Beispiel');
  await moveTo(await center('#f-tel', -60), 18); await click(); await type('0171 2345678', 1);
  await moveTo(await center('#f-ort', -80), 18); await click(); await type('Ludwigsburg');
  // Demo absenden
  await moveTo(await center('#lead-demo'), 22); await click(); await hold(6);
  const doneY = await pg.evaluate(()=>document.getElementById('done').getBoundingClientRect().top + scrollY - 420);
  await scrollTo(doneY, 26); await hold(60);
  // zurück nach oben, Zeiger an den Start
  const sx=cx, sy=cy; const s0 = await pg.evaluate(()=>scrollY);
  for (let i=1;i<=50;i++){ const k=ease(i/50); cx=sx+(980-sx)*k; cy=sy+(620-sy)*k; await pg.evaluate(v=>scrollTo(0,v), Math.round(s0*(1-k))); await shot(); }
  await hold(12);
  console.log('frames', f);
  await b.close();
})();
