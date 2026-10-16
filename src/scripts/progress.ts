// Progress tracking, stored only in this browser's localStorage.
// Shape: { chapters: { [slug]: timestamp }, problems: { ["slug#n"]: timestamp } }

const KEY = 'phm-progress-v1';
const EVENT = 'phm-progress';

export interface Progress {
	chapters: Record<string, number>;
	problems: Record<string, number>;
}

export function loadProgress(): Progress {
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
		return { chapters: raw.chapters || {}, problems: raw.problems || {} };
	} catch {
		return { chapters: {}, problems: {} };
	}
}

function save(p: Progress) {
	try {
		localStorage.setItem(KEY, JSON.stringify(p));
	} catch {}
	document.dispatchEvent(new CustomEvent(EVENT));
}

export function setChapterDone(slug: string, done: boolean) {
	const p = loadProgress();
	if (done) p.chapters[slug] = Date.now();
	else delete p.chapters[slug];
	save(p);
}

export function setProblemDone(slug: string, n: string | number, done: boolean) {
	const p = loadProgress();
	const key = `${slug}#${n}`;
	if (done) p.problems[key] = Date.now();
	else delete p.problems[key];
	save(p);
}

export function isProblemDone(p: Progress, slug: string, n: string | number) {
	return Boolean(p.problems[`${slug}#${n}`]);
}

/** Problems ticked in a chapter. Pass `count` (the chapter's number of problems) to ignore stale ticks. */
export function problemsDoneIn(p: Progress, slug: string, count = Infinity) {
	return Object.keys(p.problems).filter((k) => k.startsWith(slug + '#') && Number(k.slice(slug.length + 1)) <= count).length;
}

export function resetProgress() {
	save({ chapters: {}, problems: {} });
}

/** Run `cb` now and whenever progress changes (in this tab or another one). */
export function onProgress(cb: (p: Progress) => void) {
	const run = () => cb(loadProgress());
	document.addEventListener(EVENT, run);
	window.addEventListener('storage', (e) => {
		if (e.key === KEY) run();
	});
	run();
}
