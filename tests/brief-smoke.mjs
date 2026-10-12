import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
try{
 for(const [label,viewport] of [['desktop',{width:1440,height:900}],['mobile',{width:390,height:844}]]){
  const page=await browser.newPage({viewport});
  await page.goto(process.env.LOCAL_SITE_URL);
  await page.locator('.overview-start button[data-action="enter-scenario"]').click();
  await page.locator('.step-link[data-value="4"]').click();
  await page.locator('button[data-action="decide"][data-value="coach"]').click();
  await page.locator('button[data-action="show-brief"]').click();
  assert.equal(await page.locator('.brief-page').count(),1);
  if(process.env.BRIEF_EVIDENCE_DIR && label==='desktop') await page.pdf({path:process.env.BRIEF_EVIDENCE_DIR+'/single-brief.pdf',preferCSSPageSize:true});
  await page.locator('button[data-action="close-brief"]').click();
  await page.locator('button[data-action="save-first-management-run"]').click();
  await page.locator('.step-link[data-value="1"]').click();
  await page.locator('.path-card[data-value="operations"]').click();
  await page.locator('.step-link[data-value="4"]').click();
  await page.locator('button[data-action="decide"][data-value="redirect"]').click();
  await page.locator('button[data-action="compare-management-runs"]').click();
  await page.locator('button[data-action="show-brief"]').click();
  assert.equal(await page.locator('.brief-page').count(),2);
  const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(width.scroll<=width.client+2);
  if(process.env.BRIEF_EVIDENCE_DIR){
   await page.screenshot({path:process.env.BRIEF_EVIDENCE_DIR+'/'+label+'-brief.png',fullPage:true});
   if(label==='desktop') await page.pdf({path:process.env.BRIEF_EVIDENCE_DIR+'/comparison-brief.pdf',preferCSSPageSize:true});
  }
  await page.locator('button[data-action="close-brief"]').click();
  assert.equal(await page.locator('.run-route').count(),2);
  console.log(label+': single brief, comparison brief, responsive preview and preserved decision PASS');
  if(label==='desktop') {
   await page.evaluate(async()=>{
    const e=await import('/src/engine.js'), b=await import('/src/decision-brief.js');
    let state=e.recordWeeklyReview(e.hearEmployee(e.initialState()),'handover');
    state=e.reviewEvidence(e.addSampleObservation(e.addSampleObservation(e.recordMentoring(state),'planning'),'planning'),'planning');
    state=e.confirmCoveragePlan(e.chooseCoveragePlan(state,'stage'));
    state=e.confirmSuccessionPlan(e.chooseSuccessionPlan(state,'jordan'));
    state=e.confirmOrganisationPlan(e.chooseOrganisationPlan(state,'jordan'));
    state=e.decide(state,'scope');
    document.getElementById('app').innerHTML=b.briefPreview(state,null,()=> '');
   });
   assert.match(await page.locator('.brief-page').innerText(),/Field coverage review recorded/);
   if(process.env.BRIEF_EVIDENCE_DIR) await page.pdf({path:process.env.BRIEF_EVIDENCE_DIR+'/scoped-brief.pdf',preferCSSPageSize:true});
  }
  await page.close();
 }
}finally{await browser.close();}
