import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {readFile} from 'node:fs/promises';

const browser=await chromium.launch({headless:true});
async function check(viewport,label){
 const context=await browser.newContext({viewport,acceptDownloads:true});
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 try{
  let response;
  for(let attempt=0;attempt<15;attempt++){
   try{response=await page.goto(process.env.LOCAL_SITE_URL,{waitUntil:'networkidle',timeout:15000});break;}
   catch(error){if(attempt===14)throw error;await page.waitForTimeout(350);}
  }
  assert.equal(response.status(),200);
  assert.match(await page.locator('#page-title').innerText(),/Develop capability without leaving the work exposed/);
  assert.equal(await page.locator('.overview-principle').count(),3);
  assert.equal(await page.locator('button[data-action="decide"]').count(),0);
  assert.match(await page.locator('.overview-case').innerText(),/3 hours \/ week/);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Enter');
  await page.locator('.overview-actions button[data-action="enter-scenario"]').click();
  assert.match(await page.locator('#page-title').innerText(),/Better decisions start/);
  await page.locator('#main button[data-action="step"][data-value="1"]').last().click();
  assert.match(await page.locator('#page-title').innerText(),/A career is not a ladder/);
  await page.locator('button[data-action="show-overview"]').click();
  assert.match(await page.locator('#page-title').innerText(),/Develop capability without leaving the work exposed/);
  await page.locator('.overview-start button[data-action="enter-scenario"]').click();
  assert.match(await page.locator('#page-title').innerText(),/A career is not a ladder/);
  // Record two separate completed decisions and verify the comparison in the actual UI.
  await page.locator('.step-link[data-value="4"]').click();
  assert.equal(await page.locator('.decision-jump a').count(),6);
  await page.locator('button[data-action="decide"][data-value="coach"]').click();
  assert.match(await page.locator('#page-title').innerText(),/A decision you can explain/);
  await page.locator('button[data-action="save-first-management-run"]').click();
  assert.match(await page.locator('#page-title').innerText(),/Better decisions start/);
  await page.locator('.step-link[data-value="1"]').click();
  await page.locator('.path-card[data-value="operations"]').click();
  await page.locator('.step-link[data-value="4"]').click();
  await page.locator('button[data-action="decide"][data-value="redirect"]').click();
  await page.locator('button[data-action="compare-management-runs"]').click();
  assert.equal(await page.locator('.run-route').count(),2);
  assert.ok((await page.locator('.run-difference-list').innerText()).includes('Development direction'));
  const [download]=await Promise.all([
    page.waitForEvent('download',{timeout:15000}),
    page.locator('button[data-action="download-management-runs"]').click()
  ]);
  const payload=JSON.parse(await readFile(await download.path(),'utf8'));
  assert.equal(download.suggestedFilename(),'fictional-management-decision-comparison.json');
  assert.equal(payload.kind,'fictional-management-decision-comparison');
  assert.equal(payload.runs.length,2);
  assert.equal(payload.runs[0].initialFixture,payload.runs[1].initialFixture);
  assert.equal(payload.runs[0].inputs.evidenceReviews.planning,undefined);
  assert.equal(payload.runs[1].inputs.evidenceReviews.planning,undefined);
  assert.equal(payload.independentAuthorityEstablished,false);
  const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(widths.scroll<=widths.client+2,JSON.stringify({label,widths}));
  assert.deepEqual(errors,[]);
  console.log(label+': intro, keyboard, decision replay, comparison and fictional JSON PASS');
 }finally{await context.close();}
}
try{await check({width:1440,height:900},'desktop');await check({width:390,height:844},'mobile');}
finally{await browser.close();}
