// Before/after evidence for the hero: wheel once (and once more as an inertial trackpad burst) and sample the drawn frame.
// Usage: node tests/evidence/hero-steps.mjs <url> <out.json>   (e.g. http://127.0.0.1:5175/ai/ against `npm run preview`)
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const [url = 'http://127.0.0.1:5175/ai/', out = 'test-results/hero-steps.json'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url);
await page.waitForSelector('.sequence-hero.is-ready');
await page.waitForTimeout(1500);
await page.mouse.move(720, 450);
const sample = async (gesture, ms = 3000) => {
  await page.evaluate(() => { const w = window, el = document.querySelector('.sequence-hero'), t0 = performance.now(); w.samples = []; const tick = () => { w.samples.push([Math.round(performance.now() - t0), Number(el.dataset.frame)]); if (performance.now() - t0 < 4000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await gesture();
  await page.waitForTimeout(ms);
  return page.evaluate(() => window.samples);
};
const summary = s => { const frames = [...new Set(s.map(x => x[1]))]; return { final: s.at(-1)[1], distinct: frames.length, path: frames }; };
const single = await sample(() => page.mouse.wheel(0, 100));
const burst = await sample(async () => { for (const d of [4, 10, 25, 50, 60, 55, 45, 38, 30, 24, 19, 15, 12, 9, 7, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1]) { await page.mouse.wheel(0, d); await page.waitForTimeout(16); } });
const result = { url, date: new Date().toISOString(), single: summary(single), burst: summary(burst), samples: { single, burst } };
writeFileSync(out, JSON.stringify(result, null, 1));
console.log(JSON.stringify({ single: result.single, burst: result.burst }));
await browser.close();
