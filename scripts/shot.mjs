// Dev helper: screenshot a page of the local preview.  node scripts/shot.mjs <path> <out.png> [width] [height] [theme]
import puppeteer from 'puppeteer-core';
import { CHROME, PREVIEW } from './browser-config.mjs';
const [, , p = '', out = 'shot.png', w = '1280', h = '900', theme = 'dark', full = ''] = process.argv;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await page.evaluateOnNewDocument((t) => localStorage.setItem('starlight-theme', t), theme);
if (process.env.MOTION !== '1') await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
page.on('console', (m) => m.type() === 'error' && console.log('console error:', m.text()));
page.on('pageerror', (e) => console.log('page error:', e.message));
await page.goto(PREVIEW + p, { waitUntil: 'networkidle0' });
await page.screenshot({ path: out, fullPage: full === 'full' });
await browser.close();
