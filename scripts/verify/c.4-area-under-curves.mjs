import { check, report } from './lib.mjs';
// Strip sums of f on [a, b] with n strips: 'left' | 'right' | 'mid' | 'trap'
export const strips = (f, a, b, n, m) => {
	const dx = (b - a) / n;
	let s = 0;
	for (let k = 0; k < n; k++) {
		const x0 = a + k * dx, x1 = x0 + dx;
		s += m === 'left' ? f(x0) : m === 'right' ? f(x1) : m === 'mid' ? f((x0 + x1) / 2) : (f(x0) + f(x1)) / 2;
	}
	return s * dx;
};
const sumK = (n, p) => Array.from({ length: n }, (_, i) => (i + 1) ** p).reduce((a, b) => a + b, 0);
export default function () {
	const v = (t) => 0.6 * t * t;
	check('fig L5', strips(v, 0, 10, 5, 'left'), 144);
	check('fig L20', strips(v, 0, 10, 20, 'left'), 185.25);
	check('fig exact', 0.6 * 1000 / 3, 200);
	check('signed +', 0.5 * 3 * 6, 9); check('signed -', 0.5 * 2 * -4, -4);
	check('signed net', strips((t) => 6 - 2 * t, 0, 5, 1000, 'mid'), 5, 1e-6);
	check('sum k^2 n=4', sumK(4, 2), 30);
	check('sum formula k^2', (4 * 5 * 9) / 6, 30);
	check('WE1', 0.5 * 10 * 147, 735); check('WE1 check', 7.35 * 100, 735);
	check('WE2 L', strips(v, 0, 10, 5, 'left'), 144);
	check('WE2 R', strips(v, 0, 10, 5, 'right'), 264);
	check('WE2 M', strips(v, 0, 10, 5, 'mid'), 198);
	check('WE2 L err%', (200 - 144) / 200, 0.28); check('WE2 R err%', (264 - 200) / 200, 0.32);
	const P = [50, 80, 90, 85, 60];
	check('WE3', 120 * (P[0] / 2 + P[1] + P[2] + P[3] + P[4] / 2), 37200);
	const R = (n) => (100 * (n + 1) * (2 * n + 1)) / n ** 2;
	check('WE5 n5', R(5), 264); check('WE5 n100', R(100), 203.01, 1e-5); check('WE5 n1000', R(1000), 200.3, 1e-4);
	check('WE5 numeric', strips(v, 0, 10, 1000, 'right'), 200.3, 1e-4);
	check('P2', 30 * 7200, 216000);
	check('P3a', sumK(4, 2), 30); check('P3b', [1, 2, 3, 4, 5].reduce((a, k) => a + 2 * k + 1, 0), 35);
	check('P3c', sumK(100, 1), 5050); check('P3d', sumK(10, 2), 385);
	const sq = (x) => x * x;
	check('P4 L', strips(sq, 0, 3, 3, 'left'), 5); check('P4 R', strips(sq, 0, 3, 3, 'right'), 14); check('P4 M', strips(sq, 0, 3, 3, 'mid'), 8.75);
	check('P5', strips((t) => 14.7 * t, 10, 20, 1, 'trap'), 2205); check('P5 check', 7.35 * 300, 2205);
	const tab = [0, 12, 20, 25, 27];
	check('P6 L', 10 * (tab[0] + tab[1] + tab[2] + tab[3]), 570); check('P6 R', 10 * (tab[1] + tab[2] + tab[3] + tab[4]), 840);
	check('P6 T', 10 * (tab[0] / 2 + tab[1] + tab[2] + tab[3] + tab[4] / 2), 705);
	check('P7 net', strips((t) => 4 - t, 0, 6, 1000, 'mid'), 6, 1e-6);
	check('P9 n10', (11 * 21) / 600, 0.385); check('P9 n100', strips(sq, 0, 1, 100, 'right'), 0.33835, 1e-5);
	const D = (t) => 2 ** ((t - 9) / 4.737);
	check('P10 D14.5', D(14.5), 2.236, 1e-3); check('P10 D20', D(20), 5, 1e-3);
	check('P10 trap', strips(D, 9, 20, 2, 'trap'), 28.8, 0.001);
	check('P11', strips(v, 0, 10, 601, 'right') - strips(v, 0, 10, 601, 'left') < 1 ? 1 : 0, 1);
	check('P11 600', 600 / 600, 1);
	check('P12 sum k^3', sumK(7, 3), ((7 * 8) / 2) ** 2);
	return report('C.4 Area under curves');
}
