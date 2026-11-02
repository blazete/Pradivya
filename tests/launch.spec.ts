import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('responsive landing page, local assets and core interactions', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const broken: string[] = [];
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) broken.push(response.url()); });
  for (const width of [360, 390, 768, 1024, 1414]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 827 });
    await page.goto('/');
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
  await page.goto('/');
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
  await expect(page).toHaveURL('/');
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(5);
  const links=await page.locator('a[href^="/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>(n as HTMLAnchorElement).getAttribute('href')!))]);
  for(const href of links) expect((await request.get(href)).ok(),href).toBe(true);
  expect(errors).toEqual([]); expect(broken).toEqual([]);
});

test('accessible landing page and contact form with reduced motion', async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1414,height:827});
  await page.goto('/');
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

test('secondary routes render and GitHub Pages fallback restores a direct link', async ({page})=>{
  const errors: string[]=[]; const broken: string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400&&response.url().startsWith('http://127.0.0.1'))broken.push(response.url());});
  for(const route of ['/about','/technology','/achievements','/solutions','/investors','/terms','/privacy','/legal','/contact']){
    await page.goto(route);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    await page.evaluate(()=>window.scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
    await page.waitForTimeout(150);
  }
  await page.goto('/?__path=%2Fcontact%23request');
  await expect(page).toHaveURL(/\/contact#request$/);
  await expect(page.getByRole('form',{name:'Contact request'})).toBeVisible();
  expect(errors).toEqual([]);expect(broken).toEqual([]);
});

test('sequence follows scroll, brands faults, and switches responsive assets', async ({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const hero=page.locator('.sequence-hero');await expect(hero).toHaveClass(/is-ready/);
  const geometry=await page.locator('.sequence-stage').evaluate(el=>({top:el.getBoundingClientRect().top,width:el.clientWidth,height:el.clientHeight,viewportWidth:innerWidth,viewportHeight:innerHeight}));
  expect(geometry.top).toBe(0);expect(geometry.width).toBe(geometry.viewportWidth);expect(geometry.height).toBe(geometry.viewportHeight);
  await expect(page.locator('.ph-nav')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
  for(const frame of [70,160,240,299,128,0]){
   await page.evaluate(frame=>{const el=document.querySelector<HTMLElement>('.sequence-hero')!;window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*frame/299,behavior:'instant'});},frame);
   await expect(hero).toHaveAttribute('data-frame',String(frame));
   if([70,160,240].includes(frame)){
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
 for(const route of ['/','/contact']){await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
});

test('platform messaging, market forecasts and advisor-first timing', async ({page})=>{
 await page.setViewportSize({width:1414,height:827});await page.goto('/');
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
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(page.locator('.sequence-hero')).toHaveClass(/is-reduced/);
 await page.locator('#platform').scrollIntoViewIfNeeded();await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','0');
 await page.route('**/web/frames/**',route=>route.fulfill({status:503,body:'unavailable'}));
 await page.goto('/');await expect(page.locator('.sequence-error')).toBeVisible();
 await expect(page.locator('.sequence-poster img')).toBeVisible();await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('centered chapter typography and ASCII reveal start in view', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
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
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 await expect(page.getByRole('status',{name:'Preparing inspection animation'})).toBeVisible();
 await expect(page.locator('.sequence-loader [data-ascii-skeleton]')).toHaveCount(1);
 await expect(page.locator('.sequence-poster img')).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
 release();await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(page.locator('.sequence-loader')).toBeHidden();
});


test('clean hero, glass fault card and white scroll exit', async ({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const hero=page.locator('.sequence-hero');await expect(hero).toHaveClass(/is-ready/);
 await expect(page.getByRole('link',{name:'Explore the platform'})).toHaveCount(0);
 for(const label of ['01 / ROAD','02 / RAIL','03 / AIR'])await expect(page.getByText(label,{exact:true})).toHaveCount(0);
 for(const frame of [70,276,288,299,276]){
  await page.evaluate(frame=>{const el=document.querySelector<HTMLElement>('.sequence-hero')!;window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*frame/299,behavior:'instant'});},frame);
  await expect(hero).toHaveAttribute('data-frame',String(frame));
  const exit=await hero.evaluate(el=>Number(el.style.getPropertyValue('--exit-progress')));
  if(frame===70){await expect(page.locator('.sequence-fault-surface')).toHaveCSS('backdrop-filter',/blur/);await expect(page.locator('.sequence-leader line')).toHaveCSS('stroke-dashoffset','0px');}
  if(frame===276)expect(exit).toBe(0);
  if(frame===288){expect(exit).toBeGreaterThan(0);expect(exit).toBeLessThan(1);}
  if(frame===299){expect(exit).toBe(1);const cta=page.getByRole('link',{name:'Meet Pradivya'});await expect(cta).toBeVisible();expect((await cta.boundingBox())!.height).toBeGreaterThanOrEqual(52);}
 }
});


test('opening ASCII reveal runs after readiness and only once per visit', async ({page})=>{
 let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/web/frames/desktop/0000.webp',async route=>{await gate;await route.continue();});
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 await expect(page.getByRole('status',{name:'Preparing inspection animation'})).toBeVisible();
 const heading=page.locator('.sequence-opening-reveal');
 await expect(heading).not.toHaveClass(/is-decoding/);
 release();await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/);
 await expect(heading).toHaveClass(/is-decoding/);
 await expect.poll(()=>page.locator('.opening-line').first().textContent()).toMatch(/[01<>]/);
 await expect(heading).toHaveAccessibleName('Intelligence for a world in motion.');
 await expect(heading).toHaveClass(/decode-complete/);
 await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for');
 await expect(page.locator('.opening-line').nth(1)).toHaveText('a world in motion.');
 await page.evaluate(()=>{const el=document.querySelector<HTMLElement>('.sequence-hero')!;scrollTo(0,(el.offsetHeight-innerHeight)*100/299);});
 await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','100');
 await page.evaluate(()=>scrollTo(0,0));await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame','0');
 await expect(heading).toHaveClass(/decode-complete/);
 await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for');
});
