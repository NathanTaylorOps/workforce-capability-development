import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const browser=await chromium.launch({headless:true});
async function check(viewport,label){
 const context=await browser.newContext({viewport});
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
  const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(widths.scroll<=widths.client+2,JSON.stringify({label,widths}));
  assert.deepEqual(errors,[]);
  console.log(label+': intro, keyboard, scenario handoff and return PASS');
 }finally{await context.close();}
}
try{await check({width:1440,height:900},'desktop');await check({width:390,height:844},'mobile');}
finally{await browser.close();}
