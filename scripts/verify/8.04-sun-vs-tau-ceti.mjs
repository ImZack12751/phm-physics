import { check, report } from './lib.mjs';
import { STARS as S, THERMAL as T, C, GRAV } from './constants.mjs';
const Ts = C.sunTeff, b = S.wienB, tc = S.tauCeti;
const Lrt = (r, t) => r * r * (t / Ts) ** 4;
export default function () {
	const L = Lrt(tc.R, tc.T);
	// Concept / table
	check('peak', (b / tc.T) * 1e9, 545, 0.001); check('sun peak', (b / Ts) * 1e9, 502, 0.001);
	check('L', L, 0.454, 0.001); check('area', tc.R ** 2, 0.629, 0.001); check('perm2', (tc.T / Ts) ** 4, 0.722, 0.001);
	check('0.75%', 40 / 5320, 0.0075, 0.003); check('3%', (4 * 40) / 5320, 0.03, 0.003);
	check('T for 0.488', Ts * (tc.L / tc.R ** 2) ** 0.25, 5417, 0.0002); check('1.8%', Ts * (tc.L / tc.R ** 2) ** 0.25 / tc.T - 1, 0.018, 0.02);
	check('life', 10 * (tc.M / tc.L), 16, 0.03); check('twice as old', 9 / S.sunAgeGyr, 2, 0.03);
	check('third', 10 ** -0.5, 0.32, 0.02);
	check('Adrian S range lo', (1361 * (tc.R / 0.552) ** 2 * (tc.T / Ts) ** 4) / 1361, 1.5, 0.01); check('Adrian S range hi', S.courseTauCetiL / 0.552 ** 2, 1.7, 0.01);
	check('rot', tc.rotationDays, 46, 1e-9); check('dist', C.tauCetiLy, 11.912, 1e-9);
	// shell
	const a = 5e-6, m = (4 / 3) * Math.PI * a ** 3 * 1000;
	check('shell ratio', (C.au / C.sunRadius) ** 2, 46000, 0.01);
	// WE1
	check('WE1 R2', 0.793 ** 2, 0.6288, 1e-4); check('WE1 T4', (5320 / Ts) ** 4, 0.7217, 1e-4);
	check('WE1 dL', 4 * (40 / 5320) + 2 * (0.004 / 0.793), 0.04, 0.005); check('WE1 err', 0.04 * L, 0.018, 0.01);
	check('WE1 two sigma', (tc.L - L) / 0.018, 1.9, 0.02);
	// WE2
	const P = GRAV.adrianPeriodDays / 365.25;
	check('WE2 P', P, 0.46, 0.0005); check('WE2 a3', 0.552 ** 3, 0.1682, 0.0005); check('WE2 P2', P ** 2, 0.2116, 0.0005);
	check('WE2 M', 0.552 ** 3 / P ** 2, 0.795, 0.001);
	// WE3
	check('WE3 t', 10 * (0.8 / 0.488), 16, 0.03); check('WE3 f', 9 / 16.4, 0.55, 0.003); check('WE3 sun', 4.6 / 10, 0.46, 1e-9);
	// WE4
	const ratio = tc.R / 0.552;
	check('WE4 ratio', ratio, 1.437, 0.0005); check('WE4 deg', ratio * 0.533, 0.766, 0.001);
	check('WE4 r2', ratio ** 2, 2.064, 0.0005);
	const Sa = 1361 * ratio ** 2 * (tc.T / Ts) ** 4;
	check('WE4 S', Sa, 2027, 0.001); check('WE4 Te', 255.1 * (Sa / 1361) ** 0.25, 282, 0.002);
	check('WE4 1.49', Sa / 1361, 1.49, 0.002); check('WE4 6.4', 1361 * 0.52 / 0.552 ** 2, 2323, 0.001);
	check('WE4 6.4 Te', 255.13 * ((0.52 / 0.552 ** 2)) ** 0.25, 292, 0.002); check('WE4 1.71', 0.52 / 0.552 ** 2, 1.71, 0.003);
	check('WE4 13%', 0.52 / 0.454 - 1, 0.15, 0.04); check('WE4 10K', 292 - 282, 10, 1e-9);
	// WE5
	const Ns = (4 * 0.01 * C.sunRadius ** 2) / a ** 2, Na = (4 * 0.01 * C.au ** 2) / a ** 2;
	check('WE5 m cell', m, 5.24e-13, 0.001);
	check('WE5 Ns', Ns, 7.7e26, 0.01); check('WE5 ms', Ns * m, 4.1e14, 0.02);
	check('WE5 Na', Na, 3.6e31, 0.01); check('WE5 ma', Na * m, 1.9e19, 0.02); check('WE5 atm', (Na * m) / T.atmMass, 3.7, 0.01);
	check('WE5 months', (Ns * m) / 4.26e7 / 86400, 110, 0.02);
	// Problems
	check('P1', 545 / 502, 1.085, 0.002); check('P1 b', Ts / tc.T, 1.085, 0.001);
	check('P2', (tc.T / Ts) ** 4, 0.72, 0.003); check('P3', tc.R ** 2, 0.629, 0.001); check('P4', 10 ** -0.5, 0.32, 0.02);
	check('P5 f', (0.52 / 0.6288) ** 0.25, 0.9536, 0.0002); check('P5', Ts * (0.52 / 0.6288) ** 0.25, 5504, 0.0002); check('P5 diff', 5504 - 5320, 180, 0.03);
	check('P6 T', (4 * 40) / 5320, 0.03, 0.003); check('P6 R', (2 * 0.004) / 0.793, 0.01, 0.01);
	check('P7 a', Math.sqrt(0.454), 0.674, 0.001); check('P7 b', Math.sqrt(0.488), 0.699, 0.001); check('P7 c', Math.sqrt(0.52), 0.721, 0.001);
	check('P7 7%', Math.sqrt(0.52) / Math.sqrt(0.454) - 1, 0.07, 0.03);
	check('P8 S', (1361 * 0.488) / 0.552 ** 2, 2180, 0.001); check('P8 Te', 255.1 * (2180 / 1361) ** 0.25, 287, 0.002);
	check('P9', (10 * S.proxima.M) / S.proxima.L, 780, 0.002);
	const N10 = (4 * 0.01 * (0.1 * C.au) ** 2) / a ** 2;
	check('P10 N', N10, 3.6e29, 0.01); check('P10 m', N10 * 5.24e-13, 1.9e17, 0.02);
	check('P11 d', Math.sqrt(0.454), 0.674, 0.001); check('P11 ang', 0.793 / 0.674, 1.18, 0.003); check('P11 deg', 1.18 * 0.533, 0.629, 0.001);
	check('P11 check', 1.18 ** 2 * 0.722, 1.0, 0.006);
	check('P12 n', Math.log2(100), 6.6, 0.01); check('P12 days', 6.6 * 8, 53, 0.005);
	return report('8.4 The Sun vs Tau Ceti');
}
