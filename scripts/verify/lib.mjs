// Tiny helper for verifying every number printed in a chapter.
// check('label', computedValue, valueWrittenInChapter, relativeTolerance)
let failures = 0, count = 0;
export function check(label, got, want, tol = 0.005) {
	count++;
	const ok = typeof want === 'string' ? String(got) === want : want === 0 ? Math.abs(got) < 1e-12 : Math.abs(got - want) / Math.abs(want) <= tol;
	if (!ok) {
		failures++;
		console.log(`  ✗ ${label}: computed ${typeof got === 'number' ? got.toPrecision(6) : got}, chapter says ${want}`);
	}
}
export function report(name) {
	console.log(`${failures ? '✗' : '✓'} ${name}: ${count - failures}/${count} values agree`);
	const f = failures;
	failures = 0;
	count = 0;
	return f;
}
