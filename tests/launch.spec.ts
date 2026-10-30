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

 test('touch preview and optional 3D remain usable', async ({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();await page.goto('http://127.0.0.1:5175/');
  await expect(page.locator('.robot-canvas img')).toBeVisible();
  await expect(page.locator('.robot-canvas canvas')).toHaveCount(0);
  await page.getByRole('button',{name:'Enable 3D robot'}).tap();
  await expect(page.locator('.robot-canvas canvas')).toBeVisible();
  await page.getByRole('button',{name:'Pause 3D · show still'}).tap();
  await expect(page.locator('.robot-canvas canvas')).toHaveCount(0);
  await expect(page.locator('.robot-canvas img')).toBeVisible();
  await context.close();
});

test('mobile dark preference remains accessible', async ({page})=>{
 await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 for(const route of ['/','/contact']){await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
});
