// Collapsible sidebars. State lives on <html> as data-nav / data-toc ("collapsed" or absent),
// is applied before first paint by the inline script in overrides/ThemeProvider.astro, and is
// remembered in localStorage. Keyboard: [ toggles navigation, ] toggles page contents,
// \ toggles focus mode (both).
const KEY = 'phm-layout-v1';
const root = document.documentElement;

type State = { nav: boolean; toc: boolean };
const read = (): State => ({ nav: root.dataset.nav === 'collapsed', toc: root.dataset.toc === 'collapsed' });

function apply(s: State) {
	if (s.nav) root.dataset.nav = 'collapsed';
	else delete root.dataset.nav;
	if (s.toc) root.dataset.toc = 'collapsed';
	else delete root.dataset.toc;
	try {
		localStorage.setItem(KEY, JSON.stringify(s));
	} catch {}
	sync();
}

function sync() {
	const s = read();
	const focus = s.nav && s.toc;
	document.querySelectorAll<HTMLButtonElement>('.layout-btn').forEach((b) => {
		const t = b.dataset.toggle;
		const on = t === 'nav' ? s.nav : t === 'toc' ? s.toc : focus;
		b.setAttribute('aria-pressed', String(on));
		const label =
			t === 'nav' ? (on ? 'Show navigation sidebar' : 'Hide navigation sidebar')
			: t === 'toc' ? (on ? 'Show page contents' : 'Hide page contents')
			: on ? 'Leave focus mode' : 'Focus mode: hide both sidebars';
		b.setAttribute('aria-label', label);
	});
}

function toggle(which: 'nav' | 'toc' | 'focus') {
	const s = read();
	if (which === 'focus') {
		const on = !(s.nav && s.toc);
		apply({ nav: on, toc: on });
	} else apply({ ...s, [which]: !s[which] });
}

document.addEventListener('click', (e) => {
	const el = (e.target as Element).closest?.<HTMLElement>('[data-toggle]');
	if (el) toggle(el.dataset.toggle as 'nav' | 'toc' | 'focus');
});
document.addEventListener('keydown', (e) => {
	if (e.ctrlKey || e.metaKey || e.altKey) return;
	const t = e.target as HTMLElement;
	if (t.closest('input, textarea, select, [contenteditable="true"], dialog')) return;
	if (e.key === '[') toggle('nav');
	else if (e.key === ']') toggle('toc');
	else if (e.key === '\\') toggle('focus');
});
sync();
