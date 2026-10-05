// "Ask Claude about this" buttons.
//
// Nothing here calls an AI API. A click builds a self-contained prompt, copies it to the
// clipboard, shows a toast, and opens CLAUDE_LINK (set in course.config.mjs) in a new tab,
// where the reader pastes the prompt into their own claude.ai chat or Project.
import { CLAUDE_LINK } from '../../course.config.mjs';

interface ChapterMeta {
	course: string;
	slug: string;
	number: string;
	title: string;
	part: string;
	rawUrl: string;
	before: string[];
}

const INSTRUCTION =
	'I am a beginner working through this course. Explain my doubt from the ground up, using only ideas from this chapter and earlier ones unless you explicitly teach the new idea first. My doubt: ';

const ICON =
	'<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9z"/></svg>';

const metaEl = document.getElementById('phm-chapter-meta');
const content = document.querySelector<HTMLElement>('.sl-markdown-content');
if (metaEl && content) init(JSON.parse(metaEl.textContent || '{}'), content);

function init(meta: ChapterMeta, content: HTMLElement) {
	const headings = () => [...content.querySelectorAll<HTMLElement>('h2[id], h3[id]')];

	/** "Worked examples › Example 2" style path to the section containing `node`. */
	function sectionPath(node: Node): string {
		let h2: HTMLElement | null = null;
		let h3: HTMLElement | null = null;
		for (const h of headings()) {
			if (!(h.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)) break;
			if (h.tagName === 'H2') {
				h2 = h;
				h3 = null;
			} else h3 = h;
		}
		return [h2, h3].filter(Boolean).map((h) => h!.textContent!.trim()).join(' › ') || '(chapter introduction)';
	}

	// 1. Section headings: the passage is the whole section, up to the next heading of equal or higher rank.
	for (const h of headings()) {
		const wrapper = h.closest('.sl-heading-wrapper') || h;
		const level = Number(h.tagName[1]);
		const btn = makeButton('Ask Claude', `Ask Claude about the section “${h.textContent?.trim()}”`, 'ask-heading');
		btn.addEventListener('click', () => {
			const box = document.createElement('div');
			box.append(h.cloneNode(true));
			let n = wrapper.nextElementSibling;
			while (n) {
				const m = (n.getAttribute('class') || '').match(/\blevel-h(\d)\b/) || (/^H(\d)$/.exec(n.tagName) as RegExpMatchArray | null);
				if (m && Number(m[1]) <= level) break;
				box.append(n.cloneNode(true));
				n = n.nextElementSibling;
			}
			ask(meta, { section: sectionPath(h), kind: 'section', passage: toPlainText(box) });
		});
		wrapper.append(btn);
	}

	// 2. Worked examples and practice problems (components marked with data-ask).
	for (const box of content.querySelectorAll<HTMLElement>('[data-ask]')) {
		const label = box.dataset.askLabel || 'this passage';
		const slot = box.querySelector('[data-ask-slot]') || box;
		const btn = makeButton('Ask Claude about this', `Ask Claude about ${label}`, 'ask-box');
		btn.addEventListener('click', () => {
			ask(meta, {
				section: `${sectionPath(box)} › ${label}`,
				kind: box.classList.contains('problem') ? 'practice problem' : 'worked example',
				passage: toPlainText(box),
			});
		});
		slot.prepend(btn);
	}

	// 3. Floating button when text is selected inside the chapter.
	setupSelection(meta, content, sectionPath);
}

function makeButton(text: string, label: string, cls: string) {
	const b = document.createElement('button');
	b.type = 'button';
	b.className = `ask-claude-btn ${cls}`;
	b.setAttribute('aria-label', label);
	b.title = 'Copies a ready-made prompt and opens Claude';
	b.innerHTML = `${ICON}<span>${text}</span>`;
	return b;
}

function setupSelection(meta: ChapterMeta, content: HTMLElement, sectionPath: (n: Node) => string) {
	const fab = makeButton('Ask Claude about this', 'Ask Claude about the selected text', 'ask-selection');
	fab.hidden = true;
	document.body.append(fab);
	let saved: Range | null = null;

	const update = () => {
		const sel = window.getSelection();
		if (!sel || sel.isCollapsed || sel.rangeCount === 0) return hide();
		const range = sel.getRangeAt(0);
		if (!content.contains(range.commonAncestorContainer) || !sel.toString().trim()) return hide();
		saved = range.cloneRange();
		const r = range.getBoundingClientRect();
		fab.hidden = false;
		const w = fab.offsetWidth;
		const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
		// Below the selection, so it doesn't fight the phone's own copy/paste bubble above it.
		fab.style.left = `${left + window.scrollX}px`;
		fab.style.top = `${r.bottom + window.scrollY + 10}px`;
	};
	const hide = () => {
		fab.hidden = true;
	};

	let t: number | undefined;
	document.addEventListener('selectionchange', () => {
		clearTimeout(t);
		t = window.setTimeout(update, 250);
	});
	// Keep the selection alive when the button is pressed with a mouse.
	fab.addEventListener('mousedown', (e) => e.preventDefault());
	fab.addEventListener('click', () => {
		if (!saved) return;
		const range = expandToWholeMath(saved);
		const box = document.createElement('div');
		box.append(range.cloneContents());
		ask(meta, { section: sectionPath(range.startContainer), kind: 'selected passage', passage: toPlainText(box) });
		hide();
	});
}

/** If a selection starts or ends inside a formula, widen it to include the whole formula. */
function expandToWholeMath(range: Range) {
	const r = range.cloneRange();
	const mathOf = (n: Node) => {
		const el = n.nodeType === 1 ? (n as Element) : n.parentElement;
		return el?.closest('.katex-display') || el?.closest('.katex');
	};
	const s = mathOf(r.startContainer);
	const e = mathOf(r.endContainer);
	if (s) r.setStartBefore(s);
	if (e) r.setEndAfter(e);
	return r;
}

const BLOCK = new Set([
	'P', 'DIV', 'SECTION', 'ASIDE', 'HEADER', 'FOOTER', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
	'TABLE', 'THEAD', 'TBODY', 'BLOCKQUOTE', 'PRE', 'FIGURE', 'FIGCAPTION', 'DETAILS', 'SUMMARY', 'DL', 'DT', 'DD',
]);

/** Readable plain text: maths back to $LaTeX$, diagrams/simulations as short notes, hidden solutions left out. */
export function toPlainText(root: HTMLElement): string {
	const el = root.cloneNode(true) as HTMLElement;
	el.querySelectorAll('.ask-claude-btn, .sl-anchor-link, script, style, .term-tip, .problem-check, .no-raw, .sr-only').forEach((n) =>
		n.remove()
	);
	// Closed <details> (unrevealed solutions) are left out; opened ones are kept.
	el.querySelectorAll('details:not([open])').forEach((n) => n.remove());
	el.querySelectorAll('details > summary').forEach((s) => (s.textContent = 'Solution:'));
	const swap = (n: Element, text: string) => n.replaceWith(document.createTextNode(text));
	el.querySelectorAll<HTMLElement>('[data-raw-heading]').forEach((n) => {
		const p = document.createElement('p');
		p.textContent = n.dataset.rawHeading || n.textContent || '';
		n.replaceWith(p);
	});
	el.querySelectorAll('.katex-display').forEach((n) => {
		const tex = n.querySelector('annotation[encoding="application/x-tex"]')?.textContent?.trim() ?? '';
		const p = document.createElement('p');
		p.textContent = `$$ ${tex} $$`;
		n.replaceWith(p);
	});
	el.querySelectorAll('.katex').forEach((n) =>
		swap(n, `$${n.querySelector('annotation[encoding="application/x-tex"]')?.textContent?.trim() ?? ''}$`)
	);
	el.querySelectorAll('figure.diagram').forEach((n) => {
		const p = document.createElement('p');
		p.textContent = `[Diagram: ${n.querySelector('figcaption')?.textContent?.trim() ?? ''}]`;
		n.replaceWith(p);
	});
	el.querySelectorAll('.sim').forEach((n) => {
		const p = document.createElement('p');
		p.textContent = `[Interactive simulation: ${(n as HTMLElement).dataset.title ?? ''}]`;
		n.replaceWith(p);
	});

	const walk = (n: Node): string => {
		if (n.nodeType === Node.TEXT_NODE) return (n.nodeValue || '').replace(/\s+/g, ' ');
		if (n.nodeType !== Node.ELEMENT_NODE && n.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return '';
		const e = n as HTMLElement;
		const tag = e.tagName || '';
		if (tag === 'BR') return '\n';
		const inner = [...n.childNodes].map(walk).join('');
		if (tag === 'LI') return `\n- ${inner.trim()}\n`;
		if (tag === 'TR') return '\n' + [...e.children].map((c) => walk(c).trim()).join(' | ') + '\n';
		if (BLOCK.has(tag)) return `\n${inner}\n`;
		return inner;
	};
	return walk(el)
		.split('\n')
		.map((l) => l.trim())
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function buildPrompt(meta: ChapterMeta, a: { section: string; kind: string; passage: string }) {
	return [
		`Course: ${meta.course}`,
		`Chapter: ${meta.number} ${meta.title} (${meta.part})`,
		`Section: ${a.section}`,
		`Plain-markdown copy of this chapter (please read it for context): ${meta.rawUrl}`,
		`Chapters before this one: ${meta.before.length ? meta.before.join('; ') : 'none (this is the first chapter)'}`,
		'',
		`The ${a.kind} I am asking about:`,
		'"""',
		a.passage,
		'"""',
		'',
		INSTRUCTION,
	].join('\n');
}

function ask(meta: ChapterMeta, a: { section: string; kind: string; passage: string }) {
	const prompt = buildPrompt(meta, a);
	// Copy synchronously first (most reliable inside a click), then fall back to the async API.
	if (copySync(prompt)) {
		toast('Copied, paste it into Claude');
		window.open(CLAUDE_LINK, '_blank', 'noopener');
		return;
	}
	if (navigator.clipboard?.writeText) {
		navigator.clipboard.writeText(prompt).then(
			() => {
				toast('Copied, paste it into Claude');
				window.open(CLAUDE_LINK, '_blank', 'noopener');
			},
			() => manualCopy(prompt)
		);
	} else manualCopy(prompt);
}

function copySync(text: string) {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.setAttribute('readonly', '');
	ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
	document.body.append(ta);
	const prevSel = document.getSelection()?.rangeCount ? document.getSelection()!.getRangeAt(0) : null;
	ta.select();
	ta.setSelectionRange(0, text.length);
	let ok = false;
	try {
		ok = document.execCommand('copy');
	} catch {}
	ta.remove();
	if (prevSel) {
		document.getSelection()?.removeAllRanges();
		document.getSelection()?.addRange(prevSel);
	}
	return ok;
}

let toastTimer: number | undefined;
function toast(msg: string) {
	let el = document.querySelector<HTMLElement>('.ask-toast');
	if (!el) {
		el = document.createElement('div');
		el.className = 'ask-toast';
		el.setAttribute('role', 'status');
		el.setAttribute('aria-live', 'polite');
		document.body.append(el);
	}
	el.textContent = msg;
	el.classList.add('show');
	clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => el!.classList.remove('show'), 4000);
}

/** Last resort if the browser blocks clipboard access: show the prompt so it can be copied by hand. */
function manualCopy(text: string) {
	const dlg = document.createElement('dialog');
	dlg.className = 'ask-dialog';
	dlg.innerHTML = `<p><strong>Your browser blocked automatic copying.</strong> Select all the text below, copy it, then paste it into Claude.</p>
		<textarea readonly rows="12"></textarea>
		<div class="ask-dialog-actions"><a class="ask-open" target="_blank" rel="noopener">Open Claude</a><button type="button">Close</button></div>`;
	dlg.querySelector('textarea')!.value = text;
	dlg.querySelector<HTMLAnchorElement>('.ask-open')!.href = CLAUDE_LINK;
	dlg.querySelector('button')!.addEventListener('click', () => dlg.close());
	dlg.addEventListener('close', () => dlg.remove());
	document.body.append(dlg);
	dlg.showModal();
	dlg.querySelector('textarea')!.select();
}
