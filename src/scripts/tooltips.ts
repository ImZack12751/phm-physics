// Glossary tooltips: CSS shows .term-tip on hover / focus (tap on phones focuses the term).
// This script only keeps the tooltip inside the viewport and lets Escape close it.
function place(term: HTMLElement) {
	const tip = term.querySelector<HTMLElement>('.term-tip');
	if (!tip) return;
	const r = term.getBoundingClientRect();
	const margin = 8;
	const w = Math.min(320, window.innerWidth - 2 * margin);
	tip.style.width = `${w}px`;
	const left = Math.min(Math.max(margin, r.left + r.width / 2 - w / 2), window.innerWidth - w - margin);
	tip.style.left = `${left}px`;
	// Prefer below the term; flip above if there is no room.
	const h = tip.offsetHeight || 120;
	const below = r.bottom + 6;
	tip.style.top = below + h > window.innerHeight - margin ? `${Math.max(margin, r.top - 6 - h)}px` : `${below}px`;
}

document.addEventListener('mouseover', (e) => {
	const t = (e.target as Element).closest?.('.term');
	if (t) place(t as HTMLElement);
});
document.addEventListener('focusin', (e) => {
	const t = (e.target as Element).closest?.('.term');
	if (t) place(t as HTMLElement);
});
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		const t = (document.activeElement as Element | null)?.closest?.('.term');
		if (t) (t as HTMLElement).blur();
	}
});
// Tooltips use position:fixed, so keep an open one attached to its term while the page scrolls
// (focusing a term with the keyboard scrolls it into view, so closing on scroll would be wrong).
let hovered: HTMLElement | null = null;
document.addEventListener('mouseover', (e) => {
	hovered = ((e.target as Element).closest?.('.term') as HTMLElement | null) ?? null;
});
window.addEventListener(
	'scroll',
	() => {
		const focused = (document.activeElement as Element | null)?.closest?.('.term') as HTMLElement | null;
		for (const t of new Set([focused, hovered])) if (t) place(t);
	},
	{ passive: true }
);
