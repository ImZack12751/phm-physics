// "Solved" checkboxes on practice problems and the chapter-complete button, both saved in localStorage.
import { onProgress, setChapterDone, setProblemDone, isProblemDone, problemsDoneIn } from './progress';

const metaEl = document.getElementById('phm-chapter-meta');
if (metaEl) {
	const { slug } = JSON.parse(metaEl.textContent || '{}') as { slug: string };
	const boxes = [...document.querySelectorAll<HTMLInputElement>('input[data-problem-check]')];
	boxes.forEach((b) => b.addEventListener('change', () => setProblemDone(slug, b.dataset.problemCheck!, b.checked)));

	const btn = document.querySelector<HTMLButtonElement>('[data-chapter-done]');
	const status = document.querySelector<HTMLElement>('[data-chapter-status]');
	btn?.addEventListener('click', () => setChapterDone(slug, btn.getAttribute('aria-pressed') !== 'true'));

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
