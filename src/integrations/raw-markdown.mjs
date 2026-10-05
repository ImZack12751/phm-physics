// After `astro build`, writes a clean plain-markdown copy of every published chapter to
// dist/raw/<chapter-slug>.md (plus glossary.md, formulas.md and an index.md), so Claude
// can fetch a chapter by URL without any site chrome.
//
// It works from the *built HTML*, so whatever the reader sees (components, KaTeX, diagrams)
// is what ends up in the markdown: maths goes back to $LaTeX$, diagrams become their text
// description, simulations become a one-line note, and hidden solutions are included.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
import turndownGfm from 'turndown-plugin-gfm';

import { COURSE_NAME, SITE, BASE } from '../../course.config.mjs';
import { publishedChapters, chapterBySlug, chaptersBefore } from '../data/curriculum.mjs';

const siteRoot = SITE + BASE.replace(/\/$/, '') + '/';
const pageUrl = (id) => siteRoot + id + '/';
const rawUrl = (slug) => siteRoot + 'raw/' + slug + '.md';

function makeTurndown() {
	const td = new TurndownService({
		headingStyle: 'atx',
		codeBlockStyle: 'fenced',
		bulletListMarker: '-',
		emDelimiter: '*',
	});
	td.use(turndownGfm.gfm);
	td.addRule('mathBlock', {
		filter: (n) => n.nodeName === 'RAW-MATHBLOCK',
		replacement: (_c, n) => `\n\n$$\n${n.textContent.trim()}\n$$\n\n`,
	});
	td.addRule('mathInline', {
		filter: (n) => n.nodeName === 'RAW-MATH',
		replacement: (_c, n) => `$${n.textContent.trim()}$`,
	});
	td.addRule('note', {
		filter: (n) => n.nodeName === 'RAW-NOTE',
		replacement: (_c, n) => `\n\n> ${n.textContent.trim().replace(/\n+/g, ' ')}\n\n`,
	});
	return td;
}

/** Turn the rendered article into simpler HTML that turndown handles well. */
function simplify(doc, root, pageHref) {
	const $$ = (sel) => [...root.querySelectorAll(sel)];
	const replace = (el, tag, text) => {
		const n = doc.createElement(tag);
		n.textContent = text;
		el.replaceWith(n);
	};

	// Site chrome and interactive-only bits.
	$$('script, style, .ask-claude-btn, .sl-anchor-link, .no-raw, .term-tip, .problem-check, button').forEach((el) =>
		el.remove()
	);

	// Maths back to LaTeX (display first: it contains an inline .katex).
	$$('.katex-display').forEach((el) => {
		const tex = el.querySelector('annotation[encoding="application/x-tex"]')?.textContent ?? '';
		replace(el, 'raw-mathblock', tex);
	});
	$$('.katex').forEach((el) => {
		const tex = el.querySelector('annotation[encoding="application/x-tex"]')?.textContent ?? '';
		replace(el, 'raw-math', tex);
	});

	// Diagrams and simulations become text notes.
	$$('figure.diagram').forEach((el) => {
		const alt = el.getAttribute('data-alt') || '';
		const cap = el.querySelector('figcaption')?.textContent.trim() || '';
		replace(el, 'raw-note', `[Diagram] ${cap}${alt ? ' Description: ' + alt : ''}`);
	});
	$$('.sim').forEach((el) => {
		const title = el.getAttribute('data-title') || 'Interactive simulation';
		const desc = el.getAttribute('data-description') || '';
		replace(el, 'raw-note', `[Interactive simulation, web version only] ${title}. ${desc}`);
	});

	// Component titles become small headings.
	$$('[data-raw-heading]').forEach((el) => {
		const h = doc.createElement('h4');
		h.textContent = el.getAttribute('data-raw-heading') || el.textContent.replace(/\s+/g, ' ').trim();
		el.replaceWith(h);
	});

	// <details> solutions: always included, clearly labelled.
	$$('details').forEach((el) => {
		const div = doc.createElement('div');
		const label = doc.createElement('p');
		label.innerHTML = `<strong>${el.querySelector('summary')?.textContent.trim() || 'Details'}:</strong>`;
		el.querySelector('summary')?.remove();
		div.append(label, ...el.childNodes);
		el.replaceWith(div);
	});

	// Heading wrappers → plain headings; links → absolute URLs.
	$$('.sl-heading-wrapper').forEach((el) => {
		const h = el.querySelector('h1,h2,h3,h4,h5,h6');
		if (h) el.replaceWith(h);
	});
	$$('a[href]').forEach((a) => {
		try {
			a.setAttribute('href', new URL(a.getAttribute('href'), pageHref).href);
		} catch {}
	});
}

async function convertPage(distDir, id, td) {
	const file = path.join(distDir, id, 'index.html');
	const html = await readFile(file, 'utf8');
	const { document } = parseHTML(html);
	const root = document.querySelector('.sl-markdown-content');
	if (!root) throw new Error(`raw-markdown: no .sl-markdown-content in ${file}`);
	simplify(document, root, pageUrl(id));
	return td.turndown(root.innerHTML).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export default function rawMarkdown() {
	return {
		name: 'phm-raw-markdown',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const distDir = fileURLToPath(dir);
				const outDir = path.join(distDir, 'raw');
				await mkdir(outDir, { recursive: true });
				const td = makeTurndown();

				for (const ch of publishedChapters) {
					const body = await convertPage(distDir, ch.id, td);
					const prereqs = ch.prereqs.map((s) => chapterBySlug[s]);
					const before = chaptersBefore(ch.slug);
					const header = [
						`# ${ch.number} ${ch.title}`,
						'',
						`- Course: ${COURSE_NAME}`,
						`- ${ch.partLabel}`,
						`- Web version (with diagrams and simulations): ${pageUrl(ch.id)}`,
						`- Direct prerequisites: ${prereqs.length ? prereqs.map((p) => `${p.number} ${p.title} (${rawUrl(p.slug)})`).join('; ') : 'none'}`,
						`- Chapters before this one: ${before.length ? before.map((p) => `${p.number} ${p.title}`).join('; ') : 'none (this is the first chapter)'}`,
						`- Glossary: ${rawUrl('glossary')} · Formula sheet: ${rawUrl('formulas')}`,
						'',
						'---',
						'',
						'',
					].join('\n');
					await writeFile(path.join(outDir, `${ch.slug}.md`), header + body, 'utf8');
				}

				for (const [id, title] of [['glossary', 'Glossary'], ['formulas', 'Formula sheet']]) {
					const body = await convertPage(distDir, id, td);
					await writeFile(
						path.join(outDir, `${id}.md`),
						`# ${title}\n\n- Course: ${COURSE_NAME}\n- Web version: ${pageUrl(id)}\n\n---\n\n${body}`,
						'utf8'
					);
				}

				const index = [
					`# ${COURSE_NAME}: plain-markdown chapters`,
					'',
					'Chapters in teaching order. Each file is a clean copy of the web page.',
					'',
					...publishedChapters.map((c) => `- ${c.number} ${c.title}: ${rawUrl(c.slug)}`),
					'',
					`- Glossary: ${rawUrl('glossary')}`,
					`- Formula sheet: ${rawUrl('formulas')}`,
					'',
				].join('\n');
				await writeFile(path.join(outDir, 'index.md'), index, 'utf8');
				logger.info(`wrote ${publishedChapters.length + 3} files to /raw/`);
			},
		},
	};
}
