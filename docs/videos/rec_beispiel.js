const { chromium } = require('playwright');
const [w,h,out,fps,secs] = [1280, 800, process.argv[2], 30, 14];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, reducedMotion:'reduce' });
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:8765/beispiel/', {waitUntil:'networkidle'}); await pg.waitForTimeout(1500);
  await pg.addStyleTag({content:'html{scroll-behavior:auto!important} ::-webkit-scrollbar{display:none}'});
  const H = await pg.evaluate(()=>document.documentElement.scrollHeight - innerHeight);
  const maxY = Math.min(H, 2600);
  const ease = t => t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
  const N = fps*secs;
  for (let i=0;i<N;i++){
    const t = i/N; let p;
    if (t<0.08) p=0; else if (t<0.5) p=ease((t-0.08)/0.42); else if (t<0.58) p=1; else if (t<0.95) p=1-ease((t-0.58)/0.37); else p=0;
    await pg.evaluate(y=>window.scrollTo(0,y), Math.round(p*maxY));
    await pg.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});
  }
  console.log('H',H,'frames',N);
  await b.close();
})();
