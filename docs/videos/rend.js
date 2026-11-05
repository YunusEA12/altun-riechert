const { chromium } = require('playwright');
const [scene, w, h, secs, out] = process.argv.slice(2); const fps=30, N=fps*+secs;
(async () => {
  const b = await chromium.launch();
  const pg = await (await b.newContext({ viewport:{width:+w,height:+h} })).newPage();
  pg.on('pageerror', e=>console.log('ERR', e.message));
  await pg.goto(`file://${process.cwd()}/render.html?s=${scene}&w=${w}&h=${h}`); await pg.evaluate(()=>window.ready);
  require('fs').mkdirSync(out,{recursive:true});
  for (let i=0;i<N;i++){ await pg.evaluate(t=>draw(t), i/N); await pg.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`}); }
  await b.close(); console.log(scene,'done',N);
})();
