// When printing (or saving as PDF), reveal every worked solution, then restore afterwards.
let opened: HTMLDetailsElement[] = [];
window.addEventListener('beforeprint', () => {
	opened = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')];
	opened.forEach((d) => (d.open = true));
});
window.addEventListener('afterprint', () => {
	opened.forEach((d) => (d.open = false));
	opened = [];
});
