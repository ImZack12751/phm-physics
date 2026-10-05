// Where the browser checks find Chrome and the running `npm run preview` server.
import { existsSync } from 'node:fs';
const candidates = [
	process.env.CHROME_PATH,
	'C:/Program Files/Google/Chrome/Application/chrome.exe',
	'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium',
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
export const CHROME = candidates.find((p) => existsSync(p));
export const PREVIEW = process.env.PREVIEW_URL || 'http://localhost:4321/phm-physics/';
