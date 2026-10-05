// Dev helper: screenshot every diagram and simulation on a page.
//   node scripts/shot-elements.mjs part-0/si-units/ <outdir> [width]
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { CHROME, PREVIEW } from './browser-config.mjs';
const [, , p, out = 'shots', w = '1280'] = process.argv;
mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: 900 });
page.on('pageerror', (e) => console.log('page error:', e.message));
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(PREVIEW + p, { waitUntil: 'networkidle0' });
const els = await page.$$('figure.diagram, .sim');
let i = 0;
for (const el of els) {
	const file = `${out}/${p.replace(/\W+/g, '_')}${i++}.png`;
	await el.screenshot({ path: file });
	console.log(file);
}
await browser.close();
