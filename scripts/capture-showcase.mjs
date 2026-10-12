/**
 * Capture reproducible screenshots from the real application in Chromium.
 * The scene is the repository's synthetic example, never a real employee.
 * Run from a local HTTP server. No composition of invented UI elements.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const site = process.env.SHOWCASE_SITE_URL || 'http://127.0.0.1:8765/';
const out = 'docs/media';
const stage = 'artifacts/showcase-frames';
await mkdir(out, { recursive: true });
await mkdir(stage, { recursive: true });

const browser = await chromium.launch({ headless: true });
const desktop = await browser.newPage({
  viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
  reducedMotion: 'reduce'
});
const failures = [];
desktop.on('pageerror', err => failures.push(err.message));
const frames = [];

async function capture(page, name, hold = 1.6, includeGif = true) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.locator('#page-title, .brief-preview').first().waitFor({ state: 'visible' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(150);
  const filename = out + '/' + name + '.png';
  await page.screenshot({ path: filename, animations: 'disabled' });
  if (includeGif) {
    const frame = stage + '/' + String(frames.length).padStart(2, '0') + '.png';
    await page.screenshot({ path: frame, animations: 'disabled' });
    frames.push({ frame, hold });
  }
  console.log('Captured ' + filename);
}
function action(key, value) {
  return 'button[data-action="' + key + '"]' +
    (value === undefined ? '' : '[data-value="' + value + '"]');
}

try {
  const response = await desktop.goto(site, { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200);
  await desktop.locator('#page-title').waitFor();
  assert.match(await desktop.locator('#page-title').innerText(), /Develop capability without leaving/);

  await capture(desktop, '01-overview', 2.6);
  await desktop.locator('.overview-actions ' + action('enter-scenario')).click();
  await capture(desktop, '02-employee', 1.5);
  await desktop.locator('#main ' + action('step', '1')).last().click();
  await capture(desktop, '03-development-pathways', 2.0);
  await desktop.locator('.step-link[data-value="3"]').click();
  await capture(desktop, '04-competency-evidence', 1.8);
  await desktop.locator('.step-link[data-value="4"]').click();
  await desktop.locator('#decision-actions').scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(150);
  await desktop.screenshot({ path: out + '/05-accountable-decision.png', animations: 'disabled' });
  await desktop.locator(action('decide', 'coach')).click();
  await capture(desktop, '06-outcome', 2.0);

  await desktop.locator(action('save-first-management-run')).click();
  await desktop.locator('.step-link[data-value="1"]').click();
  await desktop.locator('.path-card[data-value="operations"]').click();
  await desktop.locator('.step-link[data-value="4"]').click();
  await desktop.locator(action('decide', 'redirect')).click();
  await desktop.locator(action('compare-management-runs')).click();
  assert.equal(await desktop.locator('.run-route').count(), 2);
  await capture(desktop, '07-compare-decisions', 2.5);
  await desktop.locator(action('show-brief')).click();
  assert.equal(await desktop.locator('.brief-page').count(), 2);
  await desktop.locator('.brief-preview').waitFor();
  await desktop.screenshot({ path: out + '/08-management-brief.png', animations: 'disabled' });
  // Include the printed decision as a genuine app screen at the end of the preview.
  const briefFrame = stage + '/' + String(frames.length).padStart(2, '0') + '.png';
  await desktop.screenshot({ path: briefFrame, animations: 'disabled' });
  frames.push({ frame: briefFrame, hold: 2.5 });

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true
  });
  await mobile.goto(site, { waitUntil: 'networkidle' });
  await mobile.locator('#page-title').waitFor();
  await mobile.screenshot({ path: out + '/09-mobile-overview.png', animations: 'disabled' });
  const width = await mobile.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth
  }));
  assert.ok(width.content <= width.viewport + 2, 'Mobile horizontal overflow: ' + JSON.stringify(width));
  await mobile.close();

  assert.deepEqual(failures, [], 'Browser errors during capture');
  // ffmpeg concat demuxer: all frames are the actual browser-rendered application.
  const lines = [];
  for (const item of frames) {
    lines.push('file ' + item.frame);
    lines.push('duration ' + item.hold);
  }
  lines.push('file ' + frames[frames.length - 1].frame);
  await writeFile(stage + '/frames.txt', lines.join('\n') + '\n');
  console.log('Captured ' + frames.length + ' GIF scenes without replacing the UI.');
} finally {
  await browser.close();
}
