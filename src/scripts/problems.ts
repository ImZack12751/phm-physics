// "Solved" checkboxes on practice problems and the chapter-complete button, both saved in
// localStorage. Completing a chapter sets off a small burst of stars and a mission-log toast.
import { onProgress, setChapterDone, setProblemDone, isProblemDone, problemsDoneIn, loadProgress } from './progress';

const metaEl = document.getElementById('phm-chapter-meta');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function celebrate(from: HTMLElement, title: string, detail: string) {
	if (!reduce.matches) {
		const r = from.getBoundingClientRect();
		const box = document.createElement('div');
		box.className = 'celebrate';
		const colours = ['#ffd27a', '#ff8a5c', '#4fd1c5', '#c7a8ff', '#ffffff'];
		for (let i = 0; i < 46; i++) {
			const p = document.createElement('i');
			const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 160;
			p.style.left = `${r.left + r.width / 2}px`;
			p.style.top = `${r.top + r.height / 2}px`;
			p.style.background = colours[i % colours.length];
			p.style.boxShadow = `0 0 8px ${colours[i % colours.length]}`;
			p.style.setProperty('--dx', `${Math.cos(a) * d}px`);
			p.style.setProperty('--dy', `${Math.sin(a) * d}px`);
			box.append(p);
		}
		document.body.append(box);
		setTimeout(() => box.remove(), 1500);
	}
	const t = document.createElement('div');
	t.className = 'mission-toast';
	t.setAttribute('role', 'status');
	t.innerHTML = `<small>${detail}</small>${title}`;
	document.body.append(t);
	requestAnimationFrame(() => t.classList.add('show'));
	setTimeout(() => {
		t.classList.remove('show');
		setTimeout(() => t.remove(), 400);
	}, 3200);
}

if (metaEl) {
	const { slug, number, title } = JSON.parse(metaEl.textContent || '{}') as { slug: string; number: string; title: string };
	const boxes = [...document.querySelectorAll<HTMLInputElement>('input[data-problem-check]')];
	boxes.forEach((b) => b.addEventListener('change', () => setProblemDone(slug, b.dataset.problemCheck!, b.checked)));

	const btn = document.querySelector<HTMLButtonElement>('[data-chapter-done]');
	const status = document.querySelector<HTMLElement>('[data-chapter-status]');
	btn?.addEventListener('click', () => {
		const nowDone = btn.getAttribute('aria-pressed') !== 'true';
		setChapterDone(slug, nowDone);
		if (nowDone) {
			const total = document.querySelectorAll('.progress-widget').length
				? JSON.parse(document.querySelector<HTMLElement>('.progress-widget')!.dataset.chapters || '[]').length
				: 0;
			const done = Object.keys(loadProgress().chapters).length;
			celebrate(btn, `Chapter ${number} complete: ${title}`, `Mission log updated · ${done}${total ? ` of ${total}` : ''} chapters`);
		}
	});

	onProgress((p) => {
		boxes.forEach((b) => {
			b.checked = isProblemDone(p, slug, b.dataset.problemCheck!);
			b.closest('.problem')?.classList.toggle('is-solved', b.checked);
		});
		const done = Boolean(p.chapters[slug]);
		if (btn) {
			btn.setAttribute('aria-pressed', String(done));
			btn.textContent = done ? '✓ Chapter completed (click to undo)' : 'Mark this chapter as completed';
		}
		if (status) status.textContent = `Practice problems solved: ${problemsDoneIn(p, slug)} of ${boxes.length}.`;
	});
}
