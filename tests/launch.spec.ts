import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

// Hero resting frames: chapter rests 0/45/128/215/299 plus the fault-callout middles 75/164/240.
const stops = [0, 45, 75, 128, 164, 215, 240, 299];
const heroScrollTo = (page: Page, frame: number) => page.evaluate(frame => { const el = document.querySelector<HTMLElement>('.sequence-hero')!; window.scrollTo({ top: el.offsetTop + (el.offsetHeight - innerHeight) * frame / 299, behavior: 'instant' }); }, frame);
// Frame first, then idle: a settle step starts ~200 ms after a jump, so 'not stepping' alone can pass before it begins.
const restsOn = async (page: Page, frame: number) => { const hero = page.locator('.sequence-hero'); await expect(hero).toHaveAttribute('data-frame', String(frame)); await expect(hero).not.toHaveClass(/is-stepping/); await expect(hero).toHaveAttribute('data-frame', String(frame)); };
const recordFrames = (page: Page) => page.evaluate(() => { const w = window as Window & { frames_?: number[] }, el = document.querySelector<HTMLElement>('.sequence-hero')!; w.frames_ = []; const tick = () => { w.frames_!.push(Number(el.dataset.frame)); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const recordedFrames = (page: Page) => page.evaluate(() => (window as Window & { frames_?: number[] }).frames_!);
const heroReady = async (page: Page) => { await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/); await page.waitForTimeout(300); await page.mouse.move(200, 400); };

test('responsive landing page, local assets and core interactions', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const broken: string[] = [];
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) broken.push(response.url()); });
  // Served under pradivya.com/ai/: nothing may load from the main site's root (/img, /fonts, /assets ...).
  const outside: string[] = [];
  page.on('request', r => { const u = new URL(r.url()); if (u.hostname === '127.0.0.1' && !u.pathname.startsWith('/ai/')) outside.push(u.pathname); });
  for (const width of [360, 390, 768, 1024, 1414]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 827 });
    await page.goto('');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const id of ['top','thesis','platform','products','open-source','industries','opportunity','team','hub','contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} at ${width}px overflows`).toBe(true);
    }
    if (width === 390 || width === 1414) {
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      await page.screenshot({path:`test-results/hero-${width}.png`});
      await page.locator('#hub').scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/hub-${width}.png`});
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('');
  await page.getByRole('button', {name:'Open navigation'}).click();
  await expect(page.getByRole('navigation', {name:'Main navigation'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', {name:'Open navigation'})).toBeFocused();
  await page.getByRole('button', {name:'Open navigation'}).click();
  await page.getByRole('navigation', {name:'Main navigation'}).getByRole('link',{name:'Industries',exact:true}).click();
  await expect(page).toHaveURL(/#industries$/);
  await expect(page.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
  await page.getByRole('button',{name:/Rail & infrastructure/}).click();
  await expect(page.locator('.industry-scene strong')).toHaveText('Rail & infrastructure');
  await page.locator('.hub-location-tabs').getByRole('button',{name:'Chicago',exact:true}).click();
  await expect(page.locator('.hub-address')).toContainText('5807 S Woodlawn Ave');
  await page.locator('#team').scrollIntoViewIfNeeded();
  await page.getByRole('tab',{name:/Sebastian Grimm/}).click();
  await expect(page.getByRole('tabpanel',{name:/Sebastian Grimm/})).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/ai\/$/);
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(5);
  const links=await page.locator('a[href^="/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>(n as HTMLAnchorElement).getAttribute('href')!))]);
  for(const href of links) expect((await request.get(href)).ok(),href).toBe(true);
  expect(errors).toEqual([]); expect(broken).toEqual([]); expect(outside).toEqual([]);
});

test('accessible landing page and contact form with reduced motion', async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1414,height:827});
  await page.goto('');
  const landing=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(landing.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  await page.getByRole('link',{name:'Book a demo',exact:true}).first().click();
  await expect(page).toHaveURL(/\/contact#request$/);
  await expect(page.getByRole('form',{name:'Contact request'})).toBeVisible();
  const contact=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(contact.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  await page.getByLabel('Full Name').fill('Local QA');
  await page.getByLabel('Email Address').fill('qa@example.com');
  await page.getByLabel('Company *', {exact:true}).fill('Local QA');
  await page.getByLabel('Phone Number').fill('2025550123');
  await page.locator('textarea[name="message"]').fill('Local browser check; email is not sent.');
  await page.getByRole('button',{name:'Open email draft'}).click();
  await expect(page.getByRole('status')).toContainText('Send it from your email app');
});

test('secondary routes render under /ai/ and a direct link opens', async ({page})=>{
  const errors: string[]=[]; const broken: string[]=[]; const outside: string[]=[];
  page.on('request',r=>{const u=new URL(r.url());if(u.hostname==='127.0.0.1'&&!u.pathname.startsWith('/ai/'))outside.push(u.pathname);});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400&&response.url().startsWith('http://127.0.0.1'))broken.push(response.url());});
  for(const route of ['about','technology','achievements','solutions','investors','terms','privacy','legal','contact']){
    await page.goto(route);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    await page.evaluate(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
    await page.waitForTimeout(150);
  }
  await page.goto('contact#request');
  await expect(page).toHaveURL(/\/ai\/contact#request$/);
  await expect(page.getByRole('form',{name:'Contact request'})).toBeVisible();
  expect(errors).toEqual([]);expect(broken).toEqual([]);expect(outside).toEqual([]);
});

test('sequence rests on chapter frames, brands faults, and switches responsive assets', async ({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});await page.goto('');
  const hero=page.locator('.sequence-hero');await expect(hero).toHaveClass(/is-ready/);
  const geometry=await page.locator('.sequence-stage').evaluate(el=>({top:el.getBoundingClientRect().top,width:el.clientWidth,height:el.clientHeight,viewportWidth:innerWidth,viewportHeight:innerHeight}));
  expect(geometry.top).toBe(0);expect(geometry.width).toBe(geometry.viewportWidth);expect(geometry.height).toBe(geometry.viewportHeight);
  await expect(page.locator('.ph-nav')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
  for(const frame of [75,164,240,299,128,0]){
   await heroScrollTo(page,frame);await restsOn(page,frame);
   if([75,164,240].includes(frame)){
    await expect(page.locator('.sequence-fault')).toHaveClass(/is-active/);
    await expect(page.locator('.sequence-fault img')).toBeVisible();
    const box=await page.locator('.sequence-fault').boundingBox();expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(width);
   }
  }
  await expect(page.locator('.hud')).toHaveCount(0);
 }
 expect(errors).toEqual([]);
});

test('mobile dark preference remains accessible', async ({page})=>{
 await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 for(const route of ['','contact']){await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
});

test('platform messaging, market forecasts and advisor-first timing', async ({page})=>{
 await page.setViewportSize({width:1414,height:827});await page.goto('');
 await expect(page.getByRole('heading',{level:1})).toHaveAccessibleName(/Intelligence for a world in motion/);
 await expect(page.locator('.association-group').first().getByRole('img',{name:/University of Chicago/})).toHaveCount(1);
 for(const name of ['Microsoft','Google','ZF']) await expect(page.locator('.association-group').first().getByRole('img',{name:new RegExp(name+' —')})).toHaveCount(1);
 await page.locator('#opportunity').scrollIntoViewIfNeeded();
 await expect(page.locator('.market-value').nth(0)).toHaveText('157');
 await expect(page.locator('.market-value').nth(1)).toHaveText('121.5');
 await expect(page.locator('.market-value').nth(2)).toHaveText('15.2');
 await page.locator('#team').scrollIntoViewIfNeeded();
 await expect(page.getByRole('tab',{name:/Sebastian Grimm/})).toHaveAttribute('aria-selected','true');
 await expect(page.getByRole('tab',{name:/R. \(Shyam\)/})).toHaveAttribute('aria-selected','true',{timeout:4000});
});

test('reduced motion stays on a still; missing frames retain poster and navigation', async ({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('');
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-reduced/);
 await page.locator('#platform').scrollIntoViewIfNeeded();await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','0');
 await page.route('**/web/frames/**',route=>route.fulfill({status:503,body:'unavailable'}));
 await page.goto('');await expect(page.locator('.sequence-error')).toBeVisible();
 await expect(page.locator('.sequence-poster img')).toBeVisible();await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('centered chapter typography and ASCII reveal start in view', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('');
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(page.locator('.sequence-chapter').first()).toHaveCSS('text-align','center');
 await expect(page.getByRole('heading',{level:1})).toHaveAccessibleName('Intelligence for a world in motion.');
 await page.evaluate(()=>{(window as Window & {asciiEvents?:string[]}).asciiEvents=[];document.addEventListener('asciireveal',event=>{if((event as CustomEvent).detail.active)(window as Window & {asciiEvents:string[]}).asciiEvents.push((event.target as HTMLElement).className);});});
 await page.waitForTimeout(200);
 expect(await page.evaluate(()=>(window as Window & {asciiEvents:string[]}).asciiEvents)).toEqual([]);
 await page.locator('.section-heading').scrollIntoViewIfNeeded();
 await expect.poll(()=>page.evaluate(()=>(window as Window & {asciiEvents:string[]}).asciiEvents.some(name=>name.includes('section-heading')))).toBe(true);
});

test('ASCII loader keeps poster and navigation visible, then clears on readiness', async ({page})=>{
 let release!:()=>void;
 const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/web/frames/desktop/0000.webp',async route=>{await gate;await route.continue();});
 await page.setViewportSize({width:1440,height:900});await page.goto('');
 await expect(page.getByRole('status',{name:'Preparing inspection animation'})).toBeVisible();
 await expect(page.locator('.sequence-loader [data-ascii-skeleton]')).toHaveCount(1);
 await expect(page.locator('.sequence-poster img')).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
 release();await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(page.locator('.sequence-loader')).toBeHidden();
});


test('clean hero, glass fault card and white scroll exit', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('');
 const hero=page.locator('.sequence-hero');await expect(hero).toHaveClass(/is-ready/);
 await expect(page.getByRole('link',{name:'Explore the platform'})).toHaveCount(0);
 for(const label of ['01 / ROAD','02 / RAIL','03 / AIR'])await expect(page.getByText(label,{exact:true})).toHaveCount(0);
  const stage=page.locator('.sequence-stage');
  for(const frame of [75,240,299]){
  if(frame!==299){await heroScrollTo(page,frame);await restsOn(page,frame);}
  const exit=await stage.evaluate(el=>Number(el.style.getPropertyValue('--exit-progress')));
  if(frame===75){await expect(page.locator('.sequence-fault-surface')).toHaveCSS('backdrop-filter',/blur/);await expect(page.locator('.sequence-leader line')).toHaveCSS('stroke-dashoffset','0px');}
  if(frame===240){
   expect(exit).toBe(0);
   // The white exit fades in while the last step plays.
   await page.evaluate(()=>{const w=window as Window&{exits?:number[]},el=document.querySelector<HTMLElement>('.sequence-stage')!;w.exits=[];const tick=()=>{w.exits!.push(Number(el.style.getPropertyValue('--exit-progress')));if(w.exits!.length<400)requestAnimationFrame(tick);};requestAnimationFrame(tick);});
   await page.keyboard.press('ArrowDown');await restsOn(page,299);
   expect((await page.evaluate(()=>(window as Window&{exits?:number[]}).exits!)).some(v=>v>0&&v<1)).toBe(true);
  }
  if(frame===299){expect(exit).toBe(1);const cta=page.getByRole('link',{name:'Meet Pradivya'});await expect(cta).toBeVisible();expect((await cta.boundingBox())!.height).toBeGreaterThanOrEqual(52);}
 }
});


test('opening ASCII reveal does not wait for the frame sequence and runs once per visit', async ({page})=>{
 let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/web/frames/desktop/0000.webp',async route=>{await gate;await route.continue();});
 await page.setViewportSize({width:1440,height:900});await page.goto('');
 await expect(page.getByRole('status',{name:'Preparing inspection animation'})).toBeVisible();
 const heading=page.locator('.sequence-opening-reveal');
 await expect(heading).toHaveClass(/is-decoding/);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.locator('.sequence-hero')).not.toHaveClass(/is-ready/);
 release();await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(heading).toHaveAccessibleName('Intelligence for a world in motion.');
 await expect(heading).toHaveClass(/decode-complete/);
 await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for');
 await expect(page.locator('.opening-line').nth(1)).toHaveText('a world in motion.');
 await heroScrollTo(page,128);await restsOn(page,128);
 await heroScrollTo(page,0);await restsOn(page,0);
 await expect(heading).toHaveClass(/decode-complete/);
 await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for');
});

test('first frame becomes ready while neighboring frames are still loading', async ({page})=>{
 let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/web/frames/**',async route=>{if(!route.request().url().endsWith('/0000.webp'))await gate;await route.continue();});
 try{
  await page.goto('');await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
  await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','0');
  await expect(page.locator('.sequence-loader')).toBeHidden();
  await expect(page.locator('.sequence-stage canvas')).toHaveCSS('opacity','1');
 }finally{release();}
});

test('one wheel gesture plays to the next resting frame and never stops in between', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('');await heroReady(page);
 await recordFrames(page);
 await page.mouse.wheel(0,100);
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-stepping/);await restsOn(page,45);
 await page.waitForTimeout(500);await restsOn(page,45);
 const played=await recordedFrames(page);
 expect(played.every((f,i)=>i===0||f>=played[i-1])).toBe(true);expect(new Set(played).size).toBeGreaterThan(10);
 // A small or a large wheel delta is the same step.
 await page.waitForTimeout(250);await page.mouse.wheel(0,1200);await restsOn(page,75);
 await page.waitForTimeout(250);await page.mouse.wheel(0,-8);await restsOn(page,45);
});

test('an inertial trackpad burst advances exactly one step; a deliberate second flick queues one more', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('');await heroReady(page);
 // Dispatched in-page at a real trackpad's 16 ms cadence (driver-level wheel input is too irregular in WebKit).
 const flick=()=>page.evaluate(()=>new Promise<void>(done=>{const ds=[4,10,25,50,60,55,45,38,30,24,19,15,12,9,7,5,4,3,3,2,2,2,1,1,1,1,1,1,1,1];let k=0;const id=setInterval(()=>{document.elementFromPoint(200,400)!.dispatchEvent(new WheelEvent('wheel',{deltaY:ds[k++],bubbles:true,cancelable:true}));if(k===ds.length){clearInterval(id);done();}},16);}));
 await flick();await restsOn(page,45);await page.waitForTimeout(400);await restsOn(page,45);
 await page.waitForTimeout(250);await recordFrames(page);
 await flick();await page.waitForTimeout(80);await flick();await restsOn(page,128);
 // The queued flick continues the same playback instead of stopping on the fault frame in between.
 const played=await recordedFrames(page);
 expect(played.every((f,i)=>i===0||f>=played[i-1])).toBe(true);
});

test('keyboard steps between resting frames and the page leaves the hero both ways', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('');await heroReady(page);
 await page.keyboard.press('ArrowDown');await restsOn(page,45);
 await page.keyboard.press('PageDown');await restsOn(page,75);
 await page.keyboard.press('Space');await restsOn(page,128);
 await page.keyboard.press('PageUp');await restsOn(page,75);
 // A position between resting frames (scrollbar drag, restored scroll) finishes its step in the direction of travel.
 await heroScrollTo(page,100);await restsOn(page,128);
 await heroScrollTo(page,240);await restsOn(page,240);
 await page.mouse.wheel(0,100);await restsOn(page,299);
 const end=await page.evaluate(()=>{const el=document.querySelector<HTMLElement>('.sequence-hero')!;return el.offsetTop+el.offsetHeight-innerHeight;});
 await page.waitForTimeout(300);
 for(let i=0;i<6;i++){await page.mouse.wheel(0,100);await page.waitForTimeout(40);}
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(end+200);
 await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','299');
 // Coming back up re-enters on the last segment and rests on its fault frame.
 await page.waitForTimeout(300);
 for(let i=0;i<30&&await page.evaluate(end=>scrollY>end+2,end);i++){await page.mouse.wheel(0,-100);await page.waitForTimeout(60);}
 await restsOn(page,240);
 await page.keyboard.press('Home');await restsOn(page,0);
 // Before the first resting frame the gesture is released to the page (not swallowed by the hero).
 await page.evaluate(()=>{(window as Window&{released?:number}).released=0;addEventListener('wheel',()=>{(window as Window&{released?:number}).released!++;});});
 await page.waitForTimeout(300);await page.mouse.wheel(0,-100);await page.waitForTimeout(300);
 expect(await page.evaluate(()=>(window as Window&{released?:number}).released)).toBe(1);
 await expect(page.locator('.sequence-hero')).not.toHaveClass(/is-stepping/);
 // In-page links still work from the hero.
 await page.getByRole('link',{name:/SCROLL TO DISCOVER/}).click();
 await expect(page).toHaveURL(/#thesis$/);
 await expect.poll(()=>page.locator('#thesis').evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(100);
});

test('touch swipe steps the hero on phones', async ({page,browserName})=>{
 test.skip(browserName!=='chromium','synthetic touch input via CDP');
 await page.setViewportSize({width:390,height:844});await page.goto('');await heroReady(page);
 const cdp=await page.context().newCDPSession(page);
 const swipe=async(from:number,to:number)=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:200,y:from}]});for(let k=1;k<=8;k++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:200,y:from+(to-from)*k/8}]});}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});};
 await swipe(600,300);await restsOn(page,45);
 await swipe(600,300);await restsOn(page,75);
 await swipe(300,600);await restsOn(page,45);
 // Phones load every second frame plus the resting frames.
 const loaded=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>e.name).filter(n=>n.includes('/frames/mobile/')).map(n=>Number(n.slice(-9,-5))));
 expect(loaded.length).toBeGreaterThan(10);
 expect(loaded.filter(f=>f%2&&!stops.includes(f))).toEqual([]);
});
