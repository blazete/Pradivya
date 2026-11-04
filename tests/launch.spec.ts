import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

// Hero resting frames (owner 2026-11-04): 5 chapters, 3 fault-card middles, and each chapter again after its card.
// The opening (0) is on screen at load, so 10 scrolls visit the other 10.
// Tests tagged @webkit also run in WebKit (Safari's layout and scroll input differ); the rest are engine-agnostic.
const stops = [0, 45, 75, 97, 128, 164, 184, 215, 240, 259, 299];
const faults = [75, 164, 240];
const heroScrollTo = (page: Page, frame: number) => page.evaluate(frame => { const el = document.querySelector<HTMLElement>('.sequence-hero')!; window.scrollTo({ top: el.offsetTop + (el.offsetHeight - innerHeight) * frame / 299, behavior: 'instant' }); }, frame);
// Resting = on the frame and not stepping, still so a few polls later (checked every 16 ms, not with
// expect's 100-1000 ms back-off). Frame first: a settle step starts ~200 ms after a jump, so 'not stepping' alone can
// pass before it begins.
const restsOn = async (page: Page, frame: number) => {
  // synchronous predicate polled every 16 ms (raf polling stalls in loaded WebKit); must hold on 3 consecutive polls
  const ok = await page.waitForFunction(frame => {
    const w = window as Window & { rest_?: number }, el = document.querySelector<HTMLElement>('.sequence-hero')!;
    w.rest_ = el.dataset.frame === String(frame) && !el.classList.contains('is-stepping') ? (w.rest_ ?? 0) + 1 : 0;
    return w.rest_ >= 3;
  }, frame, { polling: 16, timeout: 8000 }).then(() => true, () => false);
  await page.evaluate(() => { (window as Window & { rest_?: number }).rest_ = 0; });
  if (!ok) await expect(page.locator('.sequence-hero'), `rests on ${frame}`).toHaveAttribute('data-frame', String(frame), { timeout: 1 });
};
const recordFrames = (page: Page) => page.evaluate(() => { const w = window as Window & { frames_?: number[] }, el = document.querySelector<HTMLElement>('.sequence-hero')!; w.frames_ = []; const tick = () => { w.frames_!.push(Number(el.dataset.frame)); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const recordedFrames = (page: Page) => page.evaluate(() => (window as Window & { frames_?: number[] }).frames_!);
const heroReady = async (page: Page) => { await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/); await page.waitForTimeout(300); await page.mouse.move(200, 400); };
const heroEnd = (page: Page) => page.evaluate(() => { const el = document.querySelector<HTMLElement>('.sequence-hero')!; return el.offsetTop + el.offsetHeight - innerHeight; });
// A trackpad flick: 12 events at a real trackpad's 16 ms cadence, carried in their timestamps and dispatched at once, so a
// loaded test machine's timer stalls (WebKit: 100-300 ms) can't split one gesture into two.
const flick = (page: Page, sign = 1) => page.evaluate(sign => { const t0 = performance.now(), el = document.elementFromPoint(200, 400)!; [4,25,60,45,30,19,12,7,4,3,2,1].forEach((d, k) => { const e = new WheelEvent('wheel', { deltaY: sign * d, bubbles: true, cancelable: true }); Object.defineProperty(e, 'timeStamp', { value: t0 + 16 * k }); el.dispatchEvent(e); }); }, sign);
const watch = (page: Page) => {
  const errors: string[] = [], broken: string[] = [], outside: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400 && r.url().startsWith('http://127.0.0.1')) broken.push(r.url()); });
  // Served under pradivya.com/ai/: nothing may load from the main site's root (/img, /fonts, /assets ...).
  page.on('request', r => { const u = new URL(r.url()); if (u.hostname === '127.0.0.1' && !u.pathname.startsWith('/ai/')) outside.push(u.pathname); });
  return () => { expect(errors).toEqual([]); expect(broken).toEqual([]); expect(outside).toEqual([]); };
};
// Steps play at a tenth of their real duration (1.2-2.4 s each) so the suite fits in 30 s; the one-gesture test plays
// its first step at real speed.
const stepScale = (page: Page, scale: number) => page.evaluate(scale => { (window as Window & { __heroStepScale?: number }).__heroStepScale = scale; }, scale);
test.beforeEach(async ({ page }, info) => { if (!info.title.startsWith('one gesture')) await page.addInitScript(() => { (window as Window & { __heroStepScale?: number }).__heroStepScale = .1; }); });
const axe = async (page: Page) => (await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }));

// Longest tests first so they start on the first workers (the suite is bounded by its longest test).
// Chromium only: the flicks are dispatched in-page, so this exercises the same engine-independent code in WebKit;
// WebKit's own input (keys, Lenis scroll) is covered by the keyboard tests.
test('ten scrolls visit all ten resting points in order, none skipped; the eleventh leaves; back up re-enters on 259', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto(''); await heroReady(page);
  await recordFrames(page);
  for (const stop of stops.slice(1)) { await page.waitForTimeout(250); await flick(page); await restsOn(page, stop); }
  // Playback only moved forward.
  const played = await recordedFrames(page);
  expect(played.every((f, i) => i === 0 || f >= played[i - 1])).toBe(true);
  const end = await heroEnd(page);
  await page.waitForTimeout(250); await flick(page); await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(end + 50);
  await page.waitForTimeout(300);
  for (let i = 0; i < 30 && await page.evaluate(end => scrollY > end + 2, end); i++) { await page.mouse.wheel(0, -100); await page.waitForTimeout(60); }
  await restsOn(page, 259);
});

test('keyboard steps; a stop between resting frames finishes its step @webkit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto(''); await heroReady(page);
  await page.keyboard.press('ArrowDown'); await restsOn(page, 45);
  await page.keyboard.press('PageDown'); await restsOn(page, 75);
  await page.keyboard.press('Space'); await restsOn(page, 97);
  await page.keyboard.press('PageUp'); await restsOn(page, 75);
  // A position between resting frames (scrollbar drag, restored scroll) finishes its step in the direction of travel.
  await heroScrollTo(page, 110); await restsOn(page, 128);
});

test('keyboard leaves the hero both ways; links work @webkit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto(''); await heroReady(page);
  await heroScrollTo(page, 259); await restsOn(page, 259);
  await page.keyboard.press('ArrowDown'); await restsOn(page, 299);
  const end = await heroEnd(page);
  await page.waitForTimeout(300); for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(40); }
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(end + 200);
  // let the page's smooth wheel scroll finish before jumping home (400 ms still: loaded WebKit stalls frames ~200 ms)
  await expect.poll(async () => { const a = await page.evaluate(() => scrollY); await page.waitForTimeout(400); return a === await page.evaluate(() => scrollY); }).toBe(true);
  await page.keyboard.press('Home'); await restsOn(page, 0);
  // Before the first resting frame the gesture is released to the page (not swallowed by the hero).
  await page.evaluate(() => { (window as Window & { released?: number }).released = 0; addEventListener('wheel', () => { (window as Window & { released?: number }).released!++; }); });
  await page.waitForTimeout(300); await page.mouse.wheel(0, -100); await page.waitForTimeout(300);
  expect(await page.evaluate(() => (window as Window & { released?: number }).released)).toBe(1);
  await expect(page.locator('.sequence-hero')).not.toHaveClass(/is-stepping/);
  await page.getByRole('link', { name: /SCROLL TO DISCOVER/ }).click();
  await expect(page).toHaveURL(/#thesis$/);
  // Lenis animates the anchor scroll; loaded WebKit can take >5 s for it.
  await expect.poll(() => page.locator('#thesis').evaluate(el => Math.abs(el.getBoundingClientRect().top)), { timeout: 10000 }).toBeLessThan(100);
});

test('one gesture is exactly one step: wheel notch, big delta, inertial burst, a second flick during a step is ignored', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto(''); await heroReady(page);
  await recordFrames(page);
  await page.mouse.wheel(0, 100); await expect(page.locator('.sequence-hero')).toHaveClass(/is-stepping/); await restsOn(page, 45);
  const played = await recordedFrames(page);
  expect(played.every((f, i) => i === 0 || f >= played[i - 1])).toBe(true); expect(new Set(played).size).toBeGreaterThan(5);
  await stepScale(page, .1);
  await page.waitForTimeout(250); await page.mouse.wheel(0, 1200); await restsOn(page, 75);
  // >1 s after the 1200 px event, or the flick's small first event counts as that gesture's decaying tail.
  await stepScale(page, 1); await page.waitForTimeout(1000); await flick(page); await page.waitForTimeout(300); await flick(page); await restsOn(page, 97);
  await page.waitForTimeout(500); await restsOn(page, 97);
  await page.waitForTimeout(250); await page.mouse.wheel(0, -8); await restsOn(page, 75);
});

for (const width of [360, 768, 1414]) test(`landing page at ${width}px: no section overflows, nothing outside /ai/ @webkit`, async ({ page }) => {
  const check = watch(page);
  await page.emulateMedia({ reducedMotion: 'reduce' }); // layout only: the hero stays on its still (much less CPU)
  await page.setViewportSize({ width, height: width < 768 ? 844 : 827 }); await page.goto('');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const id of ['top','thesis','platform','products','open-source','industries','opportunity','team','hub','contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} at ${width}px overflows`).toBe(true);
  }
  check();
});

test('landing page: mobile nav, interactions, reload, every local link resolves', async ({ page, request }) => {
  const check = watch(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('');
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.click(); await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape'); await expect(menu).toBeFocused();
  await menu.click(); await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Industries', exact: true }).click();
  await expect(page).toHaveURL(/#industries$/); await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: /Rail & infrastructure/ }).click(); await expect(page.locator('.industry-scene strong')).toHaveText('Rail & infrastructure');
  await page.locator('.hub-location-tabs').getByRole('button', { name: 'Chicago', exact: true }).click(); await expect(page.locator('.hub-address')).toContainText('5807 S Woodlawn Ave');
  await page.locator('#team').scrollIntoViewIfNeeded(); await page.getByRole('tab', { name: /Sebastian Grimm/ }).click(); await expect(page.getByRole('tabpanel', { name: /Sebastian Grimm/ })).toBeVisible();
  // A reload starts the story from the hero.
  await page.reload(); await expect(page).toHaveURL(/\/ai\/$/); await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
  const links = await page.locator('a[href^="/"]').evaluateAll(nodes => [...new Set(nodes.map(n => (n as HTMLAnchorElement).getAttribute('href')!))]);
  expect(links).toContain('/ai/hero-credits.html');
  for (const href of links) expect((await request.get(href)).ok(), href).toBe(true);
  check();
});

test('content: headline, associations, market forecasts, advisor rotation, ASCII reveal on scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1414, height: 827 }); await page.goto('');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Intelligence for a world in motion.');
  await expect(page.locator('.sequence-chapter').first()).toHaveCSS('text-align', 'center');
  await expect(page.locator('.sequence-foot')).not.toContainText('CREDITS');
  await page.evaluate(() => { (window as Window & { asciiEvents?: string[] }).asciiEvents = []; document.addEventListener('asciireveal', e => { if ((e as CustomEvent).detail.active) (window as Window & { asciiEvents: string[] }).asciiEvents.push((e.target as HTMLElement).className); }); });
  await expect(page.locator('.association-group').first().getByRole('img', { name: /University of Chicago/ })).toHaveCount(1);
  for (const name of ['Microsoft','Google','ZF']) await expect(page.locator('.association-group').first().getByRole('img', { name: new RegExp(name + ' —') })).toHaveCount(1);
  await page.locator('.section-heading').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => (window as Window & { asciiEvents: string[] }).asciiEvents.some(n => n.includes('section-heading')))).toBe(true);
  await page.locator('#opportunity').scrollIntoViewIfNeeded();
  await expect(page.locator('.market-value').nth(0)).toHaveText('157'); await expect(page.locator('.market-value').nth(1)).toHaveText('121.5'); await expect(page.locator('.market-value').nth(2)).toHaveText('15.2');
  await page.locator('#team').scrollIntoViewIfNeeded();
  await expect(page.getByRole('tab', { name: /Sebastian Grimm/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: /R. \(Shyam\)/ })).toHaveAttribute('aria-selected', 'true', { timeout: 4000 });
});

test('accessibility, light desktop: landing and the contact form', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.setViewportSize({ width: 1414, height: 827 }); await page.goto('');
  expect(await axe(page)).toEqual([]);
  await page.getByRole('link', { name: 'Book a demo', exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact#request$/); await expect(page.getByRole('form', { name: 'Contact request' })).toBeVisible();
  expect(await axe(page)).toEqual([]);
});

for (const route of ['', 'contact']) test(`accessibility, dark phone: /ai/${route}`, async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' }); await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route); expect(await axe(page)).toEqual([]);
});

test('secondary routes render under /ai/, direct links open', async ({ page }) => {
  const check = watch(page);
  for (const route of ['about','technology','achievements','solutions','investors','terms','privacy','legal','contact']) {
    await page.goto(route); await expect(page.locator('main')).toHaveCount(1); await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  await page.goto('contact#request'); await expect(page).toHaveURL(/\/ai\/contact#request$/); await expect(page.getByRole('form', { name: 'Contact request' })).toBeVisible();
  check();
});

for (const width of [1440, 390]) test(`hero stage at ${width}px: fault cards only on fault frames, chapter back after each card, white exit`, async ({ page }) => {
  const check = watch(page);
  {
    await page.setViewportSize({ width, height: 900 }); await page.goto(''); await heroReady(page);
    const g = await page.locator('.sequence-stage').evaluate(el => ({ top: el.getBoundingClientRect().top, w: el.clientWidth, h: el.clientHeight, vw: innerWidth, vh: innerHeight }));
    expect(g.top).toBe(0); expect(g.w).toBe(g.vw); expect(g.h).toBe(g.vh);
    await expect(page.locator('.ph-nav')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    // Phones: the fault cards must fit; desktop: every resting frame.
    for (const frame of width === 390 ? faults : stops) {
      await heroScrollTo(page, frame); await restsOn(page, frame);
      const fault = page.locator('.sequence-fault');
      if (faults.includes(frame)) {
        await expect(fault).toHaveClass(/is-active/); await expect(page.locator('.sequence-fault img')).toBeVisible();
        const box = await fault.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        if (width === 1440 && frame === 75) { await expect(page.locator('.sequence-fault-surface')).toHaveCSS('backdrop-filter', /blur/); await expect(page.locator('.sequence-leader line')).toHaveCSS('stroke-dashoffset', '0px'); }
      } else {
        await expect(fault).not.toHaveClass(/is-active/);
        await expect(page.locator('.sequence-chapter.is-active[aria-hidden="false"]')).toHaveCount(1);
      }
    }
    if (width === 1440) { expect(await page.locator('.sequence-stage').evaluate(el => Number(el.style.getPropertyValue('--exit-progress')))).toBe(1); await expect(page.getByRole('link', { name: 'Meet Pradivya' })).toBeVisible(); }
  }
  await expect(page.locator('.hud')).toHaveCount(0);
  check();
});

test('loader and opening reveal: headline does not wait for frames, poster + nav visible, reveal runs once', async ({ page }) => {
  // Frame 0 and its neighbours are gated separately: the hero gets ready on frame 0 alone.
  let release!: () => void, releaseRest!: () => void; const gate = new Promise<void>(r => { release = r; }), rest = new Promise<void>(r => { releaseRest = r; });
  await page.route('**/web/frames/**', async route => { await (route.request().url().endsWith('/0000.webp') ? gate : rest); await route.continue(); });
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto('');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.sequence-opening-reveal')).toHaveClass(/is-decoding/);
  await expect(page.locator('.sequence-poster img')).toBeVisible(); await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('status', { name: 'Preparing inspection animation' })).toBeVisible();
  await expect(page.locator('.sequence-loader [data-ascii-skeleton]')).toHaveCount(1);
  await expect(page.locator('.sequence-hero')).not.toHaveClass(/is-ready/);
  release(); await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/); await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame', '0');
  await expect(page.locator('.sequence-loader')).toBeHidden(); await expect(page.locator('.sequence-stage canvas')).toHaveCSS('opacity', '1');
  releaseRest();
  const heading = page.locator('.sequence-opening-reveal');
  await expect(heading).toHaveClass(/decode-complete/); await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for'); await expect(page.locator('.opening-line').nth(1)).toHaveText('a world in motion.');
  await heroScrollTo(page, 128); await restsOn(page, 128); await heroScrollTo(page, 0); await restsOn(page, 0);
  await expect(heading).toHaveClass(/decode-complete/); await expect(page.locator('.opening-line').first()).toHaveText('Intelligence for');
});

test('reduced motion stays on a still; missing frames keep the poster and navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('');
  await expect(page.locator('.sequence-hero')).toHaveClass(/is-ready/); await expect(page.locator('.sequence-hero')).toHaveClass(/is-reduced/);
  await page.locator('#platform').scrollIntoViewIfNeeded(); await expect(page.locator('.sequence-hero')).toHaveAttribute('data-frame', '0');
  await page.route('**/web/frames/**', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto(''); await expect(page.locator('.sequence-error')).toBeVisible();
  await expect(page.locator('.sequence-poster img')).toBeVisible(); await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('touch swipe steps the hero on phones; phones load every second frame plus resting frames', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'synthetic touch input via CDP');
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto(''); await heroReady(page);
  const cdp = await page.context().newCDPSession(page);
  const swipe = async (from: number, to: number) => { await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: from }] }); for (let k = 1; k <= 8; k++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200, y: from + (to - from) * k / 8 }] }); await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); };
  await swipe(600, 300); await restsOn(page, 45);
  await swipe(600, 300); await restsOn(page, 75);
  await swipe(300, 600); await restsOn(page, 45);
  const loaded = await page.evaluate(() => performance.getEntriesByType('resource').map(e => e.name).filter(n => n.includes('/frames/mobile/')).map(n => Number(n.slice(-9, -5))));
  expect(loaded.length).toBeGreaterThan(10);
  expect(loaded.filter(f => f % 2 && !stops.includes(f))).toEqual([]);
});
