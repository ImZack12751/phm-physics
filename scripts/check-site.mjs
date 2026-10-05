// Post-build checks on dist/:  npm run check
//  - no KaTeX errors and no un-rendered $…$ maths left in the text
//  - every internal link and #anchor resolves
//  - no caret notation (like m/s^2) in prose
//  - every published chapter has a /raw/<slug>.md copy
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { BASE } from '../course.config.mjs';
import { publishedChapters } from '../src/data/curriculum.mjs';

const DIST = path.resolve('dist');
const errors = [];
const err = (file, msg) => errors.push(`${path.relative(DIST, file)}: ${msg}`);

function walk(dir) {
	return readdirSync(dir).flatMap((f) => {
		const p = path.join(dir, f);
		return statSync(p).isDirectory() ? walk(p) : [p];
	});
}
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html') && !f.includes(`${path.sep}pagefind${path.sep}`));
const docs = new Map(htmlFiles.map((f) => [f, parseHTML(readFileSync(f, 'utf8')).document]));

/** Map a site URL path (/phm-physics/x/y/) to a file in dist. */
function resolve(urlPath) {
	if (!urlPath.startsWith(BASE + '/') && urlPath !== BASE) return null;
	let rel = decodeURIComponent(urlPath.slice(BASE.length)) || '/';
	const candidates = rel.endsWith('/') ? [rel + 'index.html'] : [rel, rel + '/index.html', rel + '.html'];
	for (const c of candidates) {
		const f = path.join(DIST, c);
		if (existsSync(f) && statSync(f).isFile()) return f;
	}
	return undefined;
}

for (const [file, doc] of docs) {
	const main = doc.querySelector('.sl-markdown-content');
	// 1. KaTeX
	if (doc.querySelector('.katex-error')) err(file, `KaTeX error: ${doc.querySelector('.katex-error').getAttribute('title') || doc.querySelector('.katex-error').textContent}`);
	if (main) {
		const clone = main.cloneNode(true);
		clone.querySelectorAll('.katex, script, style, code, pre, textarea, .sr-only, .sl-anchor-link').forEach((n) => n.remove());
		const text = clone.textContent;
		if (/\$[^$\s][^$]*\\[a-z]+/.test(text) || /\$\$/.test(text)) err(file, 'looks like un-rendered LaTeX ($…$) in the text');
		// 3. caret notation in prose, e.g. m/s^2 or 10^5
		const caret = text.match(/[A-Za-z0-9)]\^[-−0-9{]/);
		if (caret) err(file, `caret notation in prose near "${text.slice(Math.max(0, caret.index - 20), caret.index + 10)}"`);
	}
	// 2. links and anchors
	for (const a of doc.querySelectorAll('a[href], link[href], img[src], script[src]')) {
		const raw = a.getAttribute('href') ?? a.getAttribute('src');
		if (!raw || /^(https?:|mailto:|data:|javascript:)/.test(raw) || raw.startsWith('//')) continue;
		const u = new URL(raw, 'http://x' + '/' + path.relative(DIST, file).split(path.sep).join('/'));
		let target = file;
		if (raw.startsWith('#')) target = file;
		else {
			target = resolve(u.pathname);
			if (target === null) {
				err(file, `link outside the site base: ${raw}`);
				continue;
			}
			if (!target) {
				err(file, `broken link: ${raw}`);
				continue;
			}
		}
		if (u.hash && u.hash.length > 1 && target.endsWith('.html')) {
			const id = decodeURIComponent(u.hash.slice(1));
			const tdoc = docs.get(target);
			if (tdoc && !tdoc.getElementById(id)) err(file, `missing anchor: ${raw}`);
		}
	}
}

// 4. raw markdown copies
for (const ch of publishedChapters) {
	const f = path.join(DIST, 'raw', `${ch.slug}.md`);
	if (!existsSync(f)) err(f, 'missing raw markdown');
	else {
		const md = readFileSync(f, 'utf8');
		if (md.length < 500) err(f, 'raw markdown suspiciously short');
		if (/katex|class="/.test(md)) err(f, 'raw markdown contains leftover HTML/KaTeX markup');
		const prose = md.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^$\n]*\$/g, '');
		const caret = prose.match(/[A-Za-z0-9)]\^[-−0-9{]/);
		if (caret) err(f, `caret notation outside maths near "${prose.slice(Math.max(0, caret.index - 20), caret.index + 10)}"`);
	}
}

if (errors.length) {
	console.log(errors.map((e) => '✗ ' + e).join('\n'));
	console.log(`\n${errors.length} problem(s) in ${htmlFiles.length} pages.`);
	process.exit(1);
}
console.log(`✓ ${htmlFiles.length} pages: no KaTeX errors, no broken links or anchors, no caret notation; ${publishedChapters.length} raw markdown files present.`);
