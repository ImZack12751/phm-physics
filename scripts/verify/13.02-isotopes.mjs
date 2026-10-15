import { check, report } from './lib.mjs';
import { THERMAL as T, MASSENERGY as M, PARTICLES as P } from './constants.mjs';
export default function () {
	const yr = 365.25 * 86400, NA = T.NA, uMeV = M.uMeV;
	const BA = (Z, N, m) => ((Z * M.mH + N * M.mn - m) * uMeV) / (Z + N);
	// Concept
	check('D 1 in 8700', 1 / 0.000115, 8700, 0.001);
	check('He mass defect', 2 * M.mH + 2 * M.mn - M.mHe4, 0.0304, 0.001); check('He B', BA(2, 2, M.mHe4) * 4, 28.3, 0.001);
	check('Cl', P.cl35 * P.mCl35 + (1 - P.cl35) * P.mCl37, 35.45, 0.0005);
	check('Fe peak', BA(26, 30, P.mFe56), 8.8, 0.002);
	check('Fe N', 56 - 26, 30, 1e-9); check('U N', 238 - 92, 146, 1e-9);
	check('U alpha', P.u238Alpha, 4.27, 1e-9);
	check('K40 frac', 0.0117e-2 * 140, 0.0164, 0.002);
	// WE1
	const xe = P.xeIsotopes, sum = xe.reduce((a, [, f]) => a + f, 0), num = xe.reduce((a, [A, f]) => a + A * f, 0);
	check('WE1 sum', sum, 99.92, 0.0001); check('WE1 num', num, 13128.7, 0.00001);
	[[0, 11.8], [1, 11.2], [2, 244.5], [3, 3405.6], [4, 529.1], [5, 2777.2], [6, 3550.8], [7, 1393.6], [8, 1205.0]].forEach(([i, v]) => check(`WE1 term${i}`, xe[i][0] * xe[i][1], v, 0.003));
	check('WE1 avg', num / 99.92, 131.39, 0.0001); check('WE1 table', P.xeWeight, 131.293, 1e-6);
	check('WE1 diff', 131.39 - 131.293, 0.1, 0.05); check('WE1 Xe132', 131.9041550856, 131.904, 1e-5);
	// WE2
	check('WE2 sum', 2 * 1.007825 + 2 * 1.008665, 4.03298, 1e-6); check('WE2 dm', 4.03298 - 4.002603, 0.030377, 1e-5);
	check('WE2 B', 0.030377 * 931.5, 28.3, 0.001); check('WE2 BA', 28.3 / 4, 7.07, 0.001); check('WE2 BA exact', BA(2, 2, M.mHe4), 7.07, 0.002);
	check('WE2 ratio', 28.3e6 / 24.6, 1.15e6, 0.001);
	// WE3
	const NK = (0.0167 / 39.96) * NA, lamK = Math.LN2 / (1.248e9 * 3.156e7);
	check('WE3 N', NK, 2.52e20, 0.002); check('WE3 lam', lamK, 1.76e-17, 0.002); check('WE3 A', NK * lamK, 4.4e3, 0.01);
	check('WE3 const', P.k40BodyMass * 1e6, 16.7, 1e-9);
	// WE4
	check('WE4 a', 5700 * Math.log2(14 / 3.5), 11400, 1e-9); check('WE4 b ratio', Math.log(1.4) / Math.LN2, 0.485, 0.002);
	check('WE4 b', 5700 * Math.log2(1.4), 2770, 0.002);
	check('WE4 atoms', NA / 12.011, 5.01e22, 0.001); check('WE4 N14', 1.2e-12 * 5.01e22, 6.0e10, 0.003);
	const A14 = (Math.LN2 / (5700 * 3.156e7)) * 6.01e10;
	check('WE4 A', A14, 0.232, 0.003); check('WE4 dpm', A14 * 60, 13.9, 0.003);
	// WE5
	check('WE5 alpha', (238 - 206) / 4, 8, 1e-9); check('WE5 Z', 92 - 16, 76, 1e-9); check('WE5 beta', 82 - 76, 6, 1e-9);
	check('WE5 exp', 4.54 / 4.463, 1.017, 0.001); check('WE5 frac', 0.5 ** (4.54 / (P.halfLife.U238 / 1e9)), 0.494, 0.002);
	// Problems
	check('P1', 14 - 6, 8, 1e-9); check('P1b', 235 - 92, 143, 1e-9);
	check('P2 a', 0.7576 * 34.969, 26.492, 0.0001); check('P2 b', 0.2424 * 36.966, 8.961, 0.0001); check('P2', 26.492 + 8.961, 35.45, 0.0005);
	check('P3', 0.5 ** 3, 1 / 8, 1e-9); check('P3 n', 80 / 8.02, 9.97, 0.001); check('P3 frac', 0.5 ** (80 / 8.0252), 0.001, 0.01);
	check('P4 yr', Math.LN2 / 5700, 1.22e-4, 0.005); check('P4 s', 1.216e-4 / 3.156e7, 3.85e-12, 0.002);
	check('P6 sum', 8 * 1.007825 + 8 * 1.008665, 16.13192, 1e-6); check('P6 dm', 16.13192 - 15.994915, 0.137005, 1e-5);
	check('P6 B', 0.137005 * 931.5, 127.6, 0.001); check('P6 BA', 127.6 / 16, 7.98, 0.001); check('P6 exact', BA(8, 8, P.mO16), 7.98, 0.001);
	check('P7 dm', 2 * 2.014102 - 4.002603, 0.025601, 1e-4); check('P7 Q', 0.025601 * 931.5, 23.8, 0.002);
	check('P7 bind', 4 * (7.07 - 1.11), 23.8, 0.002); check('D BA', BA(1, 1, M.mD), 1.11, 0.003);
	check('P8 a exp', 20 / 12.32, 1.62, 0.003); check('P8 a', 0.5 ** (20 / 12.32), 0.32, 0.02);
	check('P8 b exp', 50 / 12.32, 4.06, 0.001); check('P8 b', 0.5 ** (50 / 12.32), 0.06, 0.003);
	const NRa = NA / 226.0, lamRa = Math.LN2 / (1600 * 3.156e7);
	check('P9 N', NRa, 2.66e21, 0.002); check('P9 lam', lamRa, 1.37e-11, 0.003); check('P9 A', NRa * lamRa, 3.66e10, 0.003);
	check('P10 yr', 4400 * 3.156e7, 1.4e11, 0.01); check('P10 frac', 1.39e11 / 2.52e20, 5.5e-10, 0.005);
	check('P10 lam', Math.LN2 / 1.248e9, 5.5e-10, 0.01);
	check('P11 235', 2 ** (2.0 / 0.704), 7.16, 0.002); check('P11 238', 2 ** (2.0 / 4.463), 1.364, 0.001);
	check('P11 now', 0.7204 / 99.274, 0.007257, 0.0005); check('P11 then', (0.007257 * 7.16) / 1.364, 0.0381, 0.002);
	check('P11 pct', 0.0381 / 1.0381, 0.037, 0.01);
	check('P12 tau', 1 / Math.LN2, 1.443, 0.001); check('P12 C14', 5700 / Math.LN2, 8220, 0.001); check('P12 e', Math.exp(-1), 0.368, 0.001);
	// Table & concept half-lives
	check('HL I131', P.halfLife.I131 * 365.25, 8.02, 0.001); check('HL H3', P.halfLife.H3, 12.32, 1e-9);
	return report('13.2 Isotopes');
}
