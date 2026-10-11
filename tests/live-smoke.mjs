/**
 * A real-browser smoke test of the PUBLIC GitHub Pages deployment, not the local
 * HTML fixture. Runs after the Pages workflow completes; all scenario data is fake.
 *
 * This is neither a WCAG audit nor evidence of real workforce authority.
 */
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const site = process.env.LIVE_SITE_URL ?? 'https://nathantaylorops.github.io/workforce-capability-development/';
const evidenceDir = 'artifacts/live-smoke';
const src = await readFile('src/app.js', 'utf8');
const expectedMark = src.match(/PROTOTYPE V\d+(?:\.\d+)+ · ISSUE #\d+/)?.[0];
assert.ok(expectedMark, 'Deployed-version marker not present in checked-out app source');
assert.ok(site.startsWith('https://'), 'Actual live test requires HTTPS');

await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

function countInCard(text, label) {
  const match = new RegExp(label + '\\s*(\\d+) responsibilities').exec(text);
  assert.ok(match, 'Expected comparison metric missing: ' + label);
  return Number(match[1]);
}
async function loadPublishedPage(page) {
  let lastError;
  // Pages CDN caches can lag behind a successful publish event. We bound retries
  // and verify the current source version, not merely that some app page renders.
  for (let attempt = 1; attempt <= 7; attempt++) {
    try {
      const response = await page.goto(site, { waitUntil: 'domcontentloaded', timeout: 30000 });
      assert.equal(response?.status(), 200, 'Expected HTTPS 200 from published site');
      await page.locator('#page-title').waitFor({ state: 'visible', timeout: 12000 });
      const footer = await page.locator('.app-footer').innerText();
      assert.ok(footer.includes(expectedMark), 'Deployment appears stale: expected ' + expectedMark + '; found ' + footer);
      return;
    } catch (error) {
      lastError = error;
      console.log('Published-site readiness attempt ' + attempt + '/7: ' + error.message);
      if (attempt < 7) await page.waitForTimeout(10000);
    }
  }
  throw lastError;
}
async function assertBaseline(page, event, expected) {
  await page.locator('button[data-action="absence"][data-value="' + event + '"]').click();
  await page.locator('.compare-columns .compare-response').first().waitFor();
  const nums = await page.locator('.absence-summary strong').allInnerTexts();
  assert.deepEqual(nums.map(s=>Number(s.trim())), expected, 'Underlying absence exposure changed');
  const cols = await page.locator('.compare-response').allInnerTexts();
  assert.equal(cols.length, 2);
  assert.deepEqual(cols.map(x=>countInCard(x, 'Still uncovered')), [expected[2],expected[2]]);
  assert.deepEqual(cols.map(x=>countInCard(x, 'Partial support')), [expected[1],expected[1]]);
  assert.ok(cols.every(x=>x.includes('0h; no new authority')), 'Comparison has implied new qualified cover');
}
async function exportComparison(page, proposal, expectedEvent, expectedUncovered) {
  await page.locator('button[data-action="continuity-propose"][data-value="' + proposal + '"]').click();
  const chosen=page.locator('button[data-action="continuity-propose"][data-value="' + proposal + '"]');
  assert.equal(await chosen.getAttribute('aria-pressed'), 'true');
  const [download] = await Promise.all([
    page.waitForEvent('download', {timeout:15000}),
    page.locator('button[data-action="download-comparison"]').click()
  ]);
  assert.equal(download.suggestedFilename(), 'fictional-continuity-comparison.json');
  const payload=JSON.parse(await readFile(await download.path(), 'utf8'));
  assert.equal(payload.synthetic, true);
  assert.equal(payload.kind, 'fictional-continuity-comparison');
  assert.equal(payload.proposed.id, proposal);
  assert.match(payload.event, expectedEvent);
  assert.equal(payload.baseline.tasks.filter(x=>x.status==='uncovered').length, expectedUncovered);
  assert.equal(payload.independentAuthorityEstablished, false);
  assert.match(payload.decisionStatus, /not approved/i);
  assert.equal(payload.responses.length, 2);
  assert.ok(payload.responses.every(x=>x.qualifiedCoverHours===0 && x.authorityGranted===false));
  assert.ok(payload.nextReview && payload.accountable);
  assert.equal(payload.assumptions.length, 2);
  return payload;
}
async function scenario(viewport, name) {
  const context=await browser.newContext({ viewport, acceptDownloads:true });
  const page=await context.newPage();
  const scriptErrors=[], assetFailures=[];
  page.on('pageerror', error=>scriptErrors.push(error.message));
  page.on('response', response=>{
    const pathname=new URL(response.url()).pathname;
    if (response.status()>=400 && /\.(?:js|css)$/.test(pathname)) {
      assetFailures.push(response.status()+' '+response.url());
    }
  });
  page.on('requestfailed', request=>{
    if (/\.(?:js|css)(?:\?|$)/.test(request.url())) assetFailures.push(request.url()+' '+(request.failure()?.errorText??'failed'));
  });
  page.on('dialog', dialog=>dialog.accept());
  try {
    await loadPublishedPage(page);
    assert.match(await page.locator('#page-title').innerText(), /Better decisions start/);
    assert.ok((await page.locator('main').count())===1);

    // The skip-link is the first keyboard target; visit the main region with Enter.
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement), true);
    await page.keyboard.press('Enter');

    // Use real visible progression controls, not direct engine calls or in-memory scripts.
    for (const next of [1,2,3,4]) {
      const selector='#main button[data-action="step"][data-value="'+next+'"]';
      await page.locator(selector).last().click();
    }
    assert.match(await page.locator('#page-title').innerText(), /considered decision/);
    await assertBaseline(page, 'casey', [4,1,1]);
    assert.equal(await page.locator('button[data-action="decide"]:not([disabled])').count(), 0,
      'Hypothetically absent GM must not approve a decision');
    await page.screenshot({path:evidenceDir+'/'+name+'-casey.png',fullPage:true});
    const first=await exportComparison(page, 'stage', /Casey/, 1);
    assert.ok(first.responses.find(x=>x.id==='stage').deferredHours > 0);

    await assertBaseline(page, 'reese', [4,0,2]);
    assert.equal(await page.locator('button[data-action="download-comparison"]').count(), 0,
      'Changing the hypothetical event must invalidate prior export');
    await page.screenshot({path:evidenceDir+'/'+name+'-reese.png',fullPage:true});
    const second=await exportComparison(page, 'source', /Reese/, 2);
    assert.equal(second.responses.find(x=>x.id==='source').qualifiedCoverHours,0);

    await page.locator('button[data-action="absence"][data-value="none"]').click();
    assert.equal(await page.locator('.compare-card').count(), 0, 'Baseline should hide comparison');
    assert.equal(await page.locator('button[data-action="download-comparison"]').count(),0);

    const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
    assert.ok(width.scroll <= width.client + 2, name+': horizontal overflow '+JSON.stringify(width));
    assert.deepEqual(scriptErrors, [], name+': uncaught JavaScript errors');
    assert.deepEqual(assetFailures, [], name+': missing published JS/CSS assets');
    console.log(name+': HTTPS page, keyboard, progression, casey/reese, comparison and downloaded JSON PASS');
    report.push({name,status:'passed',viewport,expectedMark});
  } catch(error) {
    await page.screenshot({path:evidenceDir+'/'+name+'-FAILED.png',fullPage:true}).catch(()=>{});
    report.push({name,status:'failed',error:error.stack,scriptErrors,assetFailures});
    throw error;
  } finally {
    await context.close();
  }
}
try {
  await scenario({width:1440,height:900},'desktop');
  await scenario({width:390,height:844},'mobile');
} finally {
  await writeFile(evidenceDir+'/report.json',JSON.stringify(report,null,2));
  await browser.close();
}
