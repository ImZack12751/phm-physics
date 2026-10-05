// Browser checks against the running preview server (npm run preview, in another terminal):
//   npm run check:browser
// For every page: no console or page errors, no horizontal scrolling on a phone-sized screen.
// For every simulation: it renders, and changing its first control changes what it shows.
// For chapters: Ask Claude buttons build a correct prompt, copy it and open CLAUDE_LINK;
// the text-selection button appears; glossary tooltips open.
import puppeteer from 'puppeteer-core';
import { CHROME, PREVIEW } from './browser-config.mjs';
import { COURSE_NAME, CLAUDE_LINK } from '../course.config.mjs';
import { publishedChapters } from '../src/data/curriculum.mjs';

if (!CHROME) {
	console.log('No Chrome/Edge found. Set CHROME_PATH to a Chromium-based browser.');
	process.exit(1);
}
const pages = ['', 'start-here/', 'glossary/', 'formulas/', 'physics-map/', ...publishedChapters.map((c) => c.id + '/')];
const INSTRUCTION = 'I am a beginner working through this course. Explain my doubt from the ground up';
const problems = [];
const fail = (p, msg) => problems.push(`${p || '/'}: ${msg}`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const p of pages) {
	const page = await browser.newPage();
	await page.setViewport({ width: 1280, height: 900 });
	const errs = [];
	page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
	page.on('pageerror', (e) => errs.push(e.message));
	// Capture clipboard writes and window.open instead of really doing them.
	await page.evaluateOnNewDocument(() => {
		window.__copied = null;
		window.__opened = null;
		const orig = document.execCommand.bind(document);
		document.execCommand = (cmd, ...rest) => {
			if (cmd === 'copy') {
				const el = document.activeElement;
				window.__copied = el && 'value' in el ? el.value : String(getSelection());
				return true;
			}
			return orig(cmd, ...rest);
		};
		window.open = (url) => {
			window.__opened = url;
			return null;
		};
	});
	const res = await page.goto(PREVIEW + p, { waitUntil: 'networkidle0' });
	if (!res || !res.ok()) {
		fail(p, `HTTP ${res && res.status()}`);
		await page.close();
		continue;
	}

	// Simulations
	const sims = await page.$$('.sim');
	for (let i = 0; i < sims.length; i++) {
		const result = await page.evaluate(async (i) => {
			const sim = document.querySelectorAll('.sim')[i];
			const title = sim.dataset.title || `sim ${i}`;
			const snapshot = () => sim.innerText + '|' + [...sim.querySelectorAll('svg')].map((s) => s.innerHTML.length).join(',');
			const before = snapshot();
			const hasContent = (sim.querySelector('.readout')?.textContent.trim().length ?? 0) > 0 || (sim.querySelector('svg')?.childElementCount ?? 0) > 0;
			const ctl = sim.querySelector('input[type=range], select, input[type=number]');
			if (!ctl) {
				const btn = sim.querySelector('button[aria-pressed="false"]') || sim.querySelector('button');
				if (!btn) return { title, hasContent, changed: true, note: 'no controls' };
				btn.click();
				await new Promise((r) => setTimeout(r, 150));
				return { title, hasContent, changed: snapshot() !== before };
			}
			if (ctl.tagName === 'SELECT') ctl.selectedIndex = (ctl.selectedIndex + 1) % ctl.options.length;
			else if (ctl.type === 'range') ctl.value = String((+ctl.min + +ctl.max) / 2 + (+ctl.step || 1) * 1.5 > +ctl.max ? +ctl.min : (+ctl.min + +ctl.max) / 2 + (+ctl.step || 1) * 1.5);
			else ctl.value = String(+ctl.value * 3 + 7);
			ctl.dispatchEvent(new Event('input', { bubbles: true }));
			ctl.dispatchEvent(new Event('change', { bubbles: true }));
			await new Promise((r) => setTimeout(r, 150));
			return { title, hasContent, changed: snapshot() !== before };
		}, i);
		if (!result.hasContent) fail(p, `simulation "${result.title}" rendered nothing`);
		if (!result.changed) fail(p, `simulation "${result.title}" did not react to its first control`);
	}

	// Chapter-only features
	if (p.startsWith('part-') || p.startsWith('calculus')) {
		const ask = await page.evaluate(async () => {
			const out = {};
			out.heading = document.querySelectorAll('.ask-heading').length;
			out.box = document.querySelectorAll('.ask-box').length;
			out.boxesNeeding = document.querySelectorAll('[data-ask]').length;
			const prob = document.querySelector('.problem .ask-box');
			prob?.click();
			out.prompt = window.__copied;
			out.opened = window.__opened;
			out.toast = document.querySelector('.ask-toast.show')?.textContent;
			window.__copied = null;
			document.querySelector('.ask-heading')?.click();
			out.headingPrompt = window.__copied;
			// Selection button
			const para = document.querySelector('.sl-markdown-content p');
			const r = document.createRange();
			r.selectNodeContents(para);
			getSelection().removeAllRanges();
			getSelection().addRange(r);
			document.dispatchEvent(new Event('selectionchange'));
			await new Promise((res) => setTimeout(res, 400));
			const fab = document.querySelector('.ask-selection');
			out.fab = fab && !fab.hidden;
			// Tooltip
			const term = document.querySelector('.term');
			if (term) {
				term.focus();
				await new Promise((res) => setTimeout(res, 50));
				out.tip = getComputedStyle(term.querySelector('.term-tip')).display;
				term.blur();
			}
			return out;
		});
		if (!ask.heading) fail(p, 'no Ask Claude buttons on headings');
		if (ask.box !== ask.boxesNeeding) fail(p, `Ask Claude buttons on ${ask.box} of ${ask.boxesNeeding} examples/problems`);
		const pr = ask.prompt || '';
		for (const [what, ok] of [
			['course name', pr.includes(COURSE_NAME)],
			['raw markdown URL', /\/raw\/[a-z0-9-]+\.md/.test(pr)],
			['instruction', pr.includes(INSTRUCTION)],
			['passage', /Problem 1/.test(pr)],
			['chapters before', pr.includes('Chapters before this one:')],
		])
			if (!ok) fail(p, `Ask Claude prompt is missing the ${what}`);
		if (/Worked solution|Solution:/.test(pr)) fail(p, 'Ask Claude prompt leaked a hidden solution');
		if (ask.opened !== CLAUDE_LINK) fail(p, `Ask Claude opened ${ask.opened} instead of CLAUDE_LINK`);
		if (!ask.toast) fail(p, 'no "Copied" toast');
		if (!ask.headingPrompt) fail(p, 'heading Ask Claude button copied nothing');
		if (!ask.fab) fail(p, 'selection button did not appear');
		if (ask.tip && ask.tip !== 'block') fail(p, 'glossary tooltip did not open on focus');
	}

	// Mobile layout: no sideways scrolling
	await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
	await new Promise((r) => setTimeout(r, 200));
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
	if (overflow > 1) fail(p, `page is ${overflow}px wider than a 390px phone screen`);

	for (const e of errs) fail(p, `console: ${e}`);
	await page.close();
}
await browser.close();

if (problems.length) {
	console.log(problems.map((x) => '✗ ' + x).join('\n'));
	process.exit(1);
}
console.log(`✓ ${pages.length} pages: no errors, all simulations respond, Ask Claude / selection / tooltips work, no sideways scrolling on mobile.`);
