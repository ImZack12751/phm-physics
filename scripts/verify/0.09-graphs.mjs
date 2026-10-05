import { check, report } from './lib.mjs';

function fit(P) {
	const n = P.length, mx = P.reduce((a, p) => a + p[0], 0) / n, my = P.reduce((a, p) => a + p[1], 0) / n;
	let sxx = 0, sxy = 0, syy = 0;
	for (const [x, y] of P) { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); syy += (y - my) ** 2; }
	return { m: sxy / sxx, r2: (sxy * sxy) / (sxx * syy) };
}
export default function () {
	check('WE1 m', (140 - 50) / 6, 15);
	check('WE1 c', 50 - 15 * 2, 20);
	check('WE2 m', 100 / 75, 1.333, 1e-3);
	check('WE2 c', -(100 / 75) * 12, -16.0, 1e-9);
	check('WE2 b', (4 / 3) * 50, 66.7, 1e-3);
	check('WE2 c reading', 0.75 * 96.415 + 12, 84.3, 1e-3);
	check('WE3', 150 + 180, 330);
	check('WE4 mars x', 1 / 1.5238 ** 2, 0.4307, 1e-3);
	check('WE4 mars y/x', 586.2 * 1.5238 ** 2, 1361, 1e-3);
	check('WE4 L', 4 * Math.PI * 1361 * 1.496e11 ** 2, 3.83e26, 0.002);
	check('WE5 m', Math.log10(5) / 11, 0.0635, 1e-3);
	check('WE5 T', Math.log10(2) / (Math.log10(5) / 11), 4.74, 0.002);
	// Simulation datasets straighten as claimed
	const sun = [[0.3871, 9082.7], [0.7233, 2601.3], [1.0, 1361.0], [1.5238, 586.2], [5.2038, 50.26], [9.5727, 14.82]];
	check('sim sun 1/r² R²', fit(sun.map(([r, I]) => [1 / r ** 2, I])).r2, 1, 1e-4);
	check('sim sun log-log slope', fit(sun.map(([r, I]) => [Math.log10(r), Math.log10(I)])).m, -2, 2e-3);
	const pend = [[0.2, 0.9], [0.4, 1.27], [0.6, 1.55], [0.8, 1.79], [1.0, 2.0], [1.2, 2.2]];
	check('sim pendulum T² R² > 0.999', fit(pend.map(([L, T]) => [L, T * T])).r2 > 0.999 ? 1 : 0, 1);
	check('sim pendulum log slope', fit(pend.map(([L, T]) => [Math.log10(L), Math.log10(T)])).m, 0.5, 0.01);
	check('P1c', 2 / 3, 0.667, 1e-3);
	check('P4', 12 * 5 + 0.5 * 4 * 12, 84);
	check('P7 linear', 5 + (4 / 11) * 10, 8.6, 0.005);
	check('P8 n', Math.log(8) / Math.log(2), 3, 1e-9);
	check('P9a', (4 * Math.PI ** 2) / 9.81, 4.02, 0.002);
	check('P9b', (4 * Math.PI ** 2) / 2.69, 14.7, 0.002);
	check('P10 m', Math.log(0.25) / 10, -0.139, 0.003);
	check('P10 half-life', Math.LN2 / (Math.log(4) / 10), 5.0, 1e-9);
	return report('0.9 Graphs');
}
