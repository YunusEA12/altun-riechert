const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const pg=await b.newPage();
await pg.goto('file://'+process.cwd()+'/ki-ratgeber.html',{waitUntil:'networkidle'});await pg.evaluate(()=>document.fonts.ready);
await pg.pdf({path:'ki-ratgeber.pdf',format:'A4',printBackground:true,displayHeaderFooter:true,
 headerTemplate:'<span></span>',
 footerTemplate:'<div style="width:100%;font-family:Arial;font-size:7.5px;color:#6b8183;padding:0 18mm;display:flex;justify-content:space-between"><span>A&amp;R Praxiswissen 01 · KI im Handwerksbetrieb</span><span>Seite <span class="pageNumber"></span> von <span class="totalPages"></span></span></div>',
 margin:{top:'18mm',bottom:'18mm',left:'0',right:'0'}});
await b.close();})();
