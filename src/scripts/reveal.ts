// Fade content blocks in as they scroll into view. Only blocks that start below the fold
// are hidden, nothing is hidden without JavaScript, and reduced-motion readers see no animation.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
	const sel = '.example, .problem, figure.diagram, .sim, .rvb, .prereqs, .formula-card, .roadmap-part, .chapter-footer, .dashboard, .pmap';
	const items = [...document.querySelectorAll<HTMLElement>(sel)].filter((el) => el.getBoundingClientRect().top > innerHeight);
	if (items.length) {
		document.documentElement.classList.add('js-reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add('in');
						io.unobserve(e.target);
					}
				}
			},
			{ rootMargin: '0px 0px -8% 0px' }
		);
		items.forEach((el) => {
			el.classList.add('reveal');
			io.observe(el);
		});
		// Reveal everything before printing, and anything a search or anchor jump lands on.
		addEventListener('beforeprint', () => items.forEach((el) => el.classList.add('in')));
		addEventListener('hashchange', () => document.querySelector(location.hash)?.closest(sel)?.classList.add('in'));
	}
}
