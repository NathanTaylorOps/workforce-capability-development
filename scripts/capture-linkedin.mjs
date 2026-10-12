/**
 * LinkedIn short-format showcase, created exclusively from actual application
 * states reached by visible Playwright interactions.
 *
 * Adds editorial captions OUTSIDE captured UI; never changes rendered app HTML,
 * data, assertions or decisions. All people and operating figures are fictional.
 *
 * Exports two reproducible still-image manifests: GIF (760 square) and MP4
 * (1080 square); the workflow encodes and checks platform constraints.
 */
import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const site = process.env.SHOWCASE_SITE_URL || 'http://127.0.0.1:8765/';
const prefix = 'artifacts/linkedin-teaser';
const gifDir = prefix + '/gif';
const videoDir = prefix + '/video';
await mkdir(gifDir, {recursive:true});
await mkdir(videoDir, {recursive:true});
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({
  viewport:{width:1280,height:900},
  deviceScaleFactor:1,
  reducedMotion:'reduce'
});
const compositor = await browser.newPage();
const failures=[];
page.on('pageerror', e=>failures.push(e.message));
page.on('response', response=>{
  if (response.status()>=400 && /\.(js|css)$/.test(new URL(response.url()).pathname))
    failures.push('Asset '+response.status()+' '+response.url());
});
const scenes=[];
const selector=(name,value)=>'button[data-action="'+name+'"]'+(value===undefined?'':'[data-value="'+value+'"]');

async function focus(sel, margin=162) {
  await page.locator(sel).first().waitFor({state:'visible'});
  await page.evaluate(({sel,margin})=>{
    const el=document.querySelector(sel);
    window.scrollTo({top:Math.max(0,window.scrollY+el.getBoundingClientRect().top-margin),behavior:'instant'});
  },{sel,margin});
  await page.waitForTimeout(140);
}
async function shot({eyebrow,title,subtitle,focusOn,crop,duration,focusMargin}) {
  if(focusOn) await focus(focusOn,focusMargin);
  await page.evaluate(async()=>document.fonts.ready);
  const source=(await page.screenshot({animations:'disabled'})).toString('base64');
  const data={source,eyebrow,title,subtitle,crop,index:scenes.length};
  for(const [width,dir] of [[760,gifDir],[1080,videoDir]]) {
    const encoded=await compositor.evaluate(async({data,width})=>{
      const image=new Image();
      image.src='data:image/png;base64,'+data.source;
      await image.decode();
      const canvas=document.createElement('canvas');
      canvas.width=width; canvas.height=width;
      const context=canvas.getContext('2d',{alpha:false});
      const s=width/760;
      context.scale(s,s);
      const fill=(color,x,y,w,h)=>{context.fillStyle=color;context.fillRect(x,y,w,h);};
      // Captions are editorial, always outside the untouched real UI picture.
      fill('#112b35',0,0,760,760);
      fill('#112b35',0,0,760,127);
      context.fillStyle='#c4d8ce';
      context.font='700 13px Arial, sans-serif';
      context.letterSpacing='1px';
      context.fillText(data.eyebrow.toUpperCase(),20,31);
      context.letterSpacing='0px';
      context.fillStyle='#ffffff';
      context.font='700 30px Arial, sans-serif';
      context.fillText(data.title,20,72);
      context.font='16px Arial, sans-serif';
      context.fillStyle='#d3e5db';
      context.fillText(data.subtitle,20,99);
      context.font='700 13px Arial, sans-serif';
      context.fillStyle='#acc2ba';
      context.textAlign='right';
      context.fillText(String(data.index+1).padStart(2,'0')+'/08',736,31);
      context.textAlign='left';
      fill('#f1f5f3',0,127,760,594);
      const area={x:18,y:139,w:724,h:565};
      context.save();
      context.beginPath();
      context.rect(area.x,area.y,area.w,area.h);
      context.clip();
      context.fillStyle='#ffffff';
      context.fillRect(area.x,area.y,area.w,area.h);
      const c=data.crop;
      context.drawImage(image,c.x,c.y,c.width,c.height,area.x,area.y,area.w,area.h);
      context.restore();
      context.strokeStyle='#d8e6e0';
      context.lineWidth=2;
      context.strokeRect(area.x+1,area.y+1,area.w-2,area.h-2);
      fill('#112b35',0,721,760,39);
      context.font='14px Arial, sans-serif';
      context.fillStyle='#d1e7dd';
      context.fillText('Workforce Capability & Development  |  Live interactive demo',20,744);
      context.font='12px Arial, sans-serif';
      context.textAlign='right';
      context.fillStyle='#a9c0b6';
      context.fillText('Fictional case',739,744);
      return canvas.toDataURL('image/png').split(',')[1];
    },{data,width});
    await writeFile(dir+'/'+String(scenes.length).padStart(2,'0')+'.png',Buffer.from(encoded,'base64'));
  }
  scenes.push({title,duration});
  console.log('LinkedIn scene '+scenes.length+': '+title);
}
const mainCrop={x:263,y:109,width:750,height:585};
const overviewCrop={x:85,y:113,width:880,height:687};
const briefCrop={x:186,y:107,width:850,height:664};
try {
  const response=await page.goto(site,{waitUntil:'networkidle'});
  assert.equal(response?.status(),200);
  await page.locator('#page-title').waitFor();
  assert.match(await page.locator('#page-title').innerText(),/Develop capability without leaving/);
  await shot({
    eyebrow:'Leadership studio / an SME operating case',
    title:'Growth creates new pressure.',
    subtitle:'Who keeps the work moving while people develop?',
    crop:overviewCrop,duration:1.4
  });

  await page.locator('.overview-actions '+selector('enter-scenario')).click();
  await page.locator('.step-link[data-value="1"]').click();
  assert.equal(await page.locator('.path-card[aria-pressed="true"]').count(),1);
  await shot({
    eyebrow:'People / capability',
    title:'Potential is not a job title.',
    subtitle:'Three useful directions. No automatic promotion.',
    crop:mainCrop,duration:1.4
  });

  await page.locator('.path-card[data-value="operations"]').click();
  assert.equal(await page.locator('.path-card[data-value="operations"]').getAttribute('aria-pressed'),'true');
  await shot({
    eyebrow:'An actual scenario choice',
    title:'Choose a different path.',
    subtitle:'The capability and delivery considerations change.',
    crop:mainCrop,duration:1.6
  });

  await page.locator('.step-link[data-value="4"]').click();
  await shot({
    eyebrow:'Operational risk / before',
    title:'Now test your coverage.',
    subtitle:'What happens if a critical manager is unavailable?',
    focusOn:'#absence-review',focusMargin:110,crop:mainCrop,duration:1.4
  });

  await page.locator(selector('absence','casey')).click();
  const nums=(await page.locator('.absence-summary strong').allInnerTexts()).map(s=>Number(s.trim()));
  assert.deepEqual(nums,[4,1,1],'Fictional Casey absence figures changed');
  assert.equal(await page.locator('button[data-action="decide"]:not([disabled])').count(),0);
  await shot({
    eyebrow:'Operational risk / after',
    title:'A gap is not covered.',
    subtitle:'Missing authority cannot be assigned by software.',
    focusOn:'.absence-summary',focusMargin:315,crop:mainCrop,duration:1.8
  });

  await page.locator(selector('absence','none')).click();
  await page.locator(selector('decide','coach')).click();
  assert.match(await page.locator('#page-title').innerText(),/decision you can explain/i);
  await shot({
    eyebrow:'General manager decision',
    title:'Record the accountable choice.',
    subtitle:'Actions, evidence, next steps and uncertainty.',
    crop:mainCrop,duration:1.4
  });

  await page.locator(selector('save-first-management-run')).click();
  await page.locator('.step-link[data-value="1"]').click();
  await page.locator('.path-card[data-value="operations"]').click();
  await page.locator('.step-link[data-value="4"]').click();
  await page.locator(selector('decide','redirect')).click();
  await page.locator(selector('compare-management-runs')).click();
  assert.equal(await page.locator('.run-route').count(),2);
  await shot({
    eyebrow:'Two decisions / same starting conditions',
    title:'Compare the consequences.',
    subtitle:'Different actions, same fictional business.',
    focusOn:'.run-compare-columns',focusMargin:245,crop:mainCrop,duration:1.8
  });

  await page.locator(selector('show-brief')).click();
  assert.equal(await page.locator('.brief-page').count(),2);
  await shot({
    eyebrow:'Documented management judgement',
    title:'Turn decisions into follow-through.',
    subtitle:'Review risks, accountability and the next action.',
    focusOn:'.brief-page',focusMargin:135,crop:briefCrop,duration:1.2
  });

  assert.equal(scenes.length,8);
  assert.equal(scenes.reduce((sum,x)=>sum+x.duration,0),12);
  assert.deepEqual(failures,[], 'App error during teaser capture');
  for(const dir of [gifDir,videoDir]){
    const entries=[];
    for(let i=0;i<scenes.length;i++){
      entries.push('file '+String(i).padStart(2,'0')+'.png');
      entries.push('duration '+scenes[i].duration.toFixed(1));
    }
    entries.push('file '+String(scenes.length-1).padStart(2,'0')+'.png');
    await writeFile(dir+'/manifest.txt',entries.join('\n')+'\n');
  }
  await writeFile(prefix+'/scene-list.json',JSON.stringify({
    durationSeconds:12,description:'Synthetic, real application states, editorial labels external to UI',scenes
  },null,2));
  console.log('Eight verified app scenes, 12 seconds, no invented UI.');
} finally {
  await browser.close();
}
