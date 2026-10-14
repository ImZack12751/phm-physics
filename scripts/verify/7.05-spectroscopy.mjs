import { check, report } from './lib.mjs';
import { WAVES as W, C } from './constants.mjs';
const c = C.c, deg = Math.PI / 180;
const hcnm = (C.h * c) / W.eV * 1e9; // 1239.84 eV nm
const dE = (hi, lo) => 13.6 * (1 / (lo * lo) - 1 / (hi * hi));
export default function () {
	// Concept
	check('Na D', W.naD2 * 1e9, 589.0, 0.0002); check('Na D1', W.naD1 * 1e9, 589.6, 0.0002); check('He', W.heD3 * 1e9, 587.6, 0.0002);
	check('lines fig', W.hDelta * 1e9, 410, 0.001); check('lines fig 434', W.hGamma * 1e9, 434, 0.001);
	check('n2 level', -13.6 / 4, -3.4, 1e-9); check('n3 level', -13.6 / 9, -1.51, 0.002);
	check('fig 3-2', 3.4 - 1.51, 1.89, 1e-9);
	check('R', 13.6 * W.eV / (C.h * c), 1.097e7, 0.001); check('R CODATA close', W.rydberg, 1.097e7, 0.001);
	check('Webb 4.3', W.co2Stretch * 1e6, 4.3, 0.01);
	// WE1
	check('WE1 f', 1 / 4 - 1 / 9, 0.1389, 0.0005); check('WE1 dE', dE(3, 2), 1.889, 0.0005); check('WE1 lam', 1240 / 1.889, 656, 0.001);
	check('WE1 dE2', dE(4, 2), 2.55, 1e-9); check('WE1 lam2', 1240 / 2.55, 486, 0.001);
	check('WE1 0.1%', Math.abs(hcnm / dE(3, 2) - W.hAlpha * 1e9) / 656.28, 0.0002, 0.9);
	// WE2
	const d = 1e-3 / 600;
	check('WE2 d', d, 1.667e-6, 0.0005);
	check('WE2 sa', 656.3e-9 / d, 0.3938, 0.0005); check('WE2 ta', Math.asin(656.3e-9 / d) / deg, 23.2, 0.002);
	check('WE2 sb', 486.1e-9 / d, 0.2917, 0.0005); check('WE2 tb', Math.asin(486.1e-9 / d) / deg, 17.0, 0.003);
	check('WE2 six', (Math.asin(656.3e-9 / d) - Math.asin(486.1e-9 / d)) / deg, 6.2, 0.01);
	// WE3
	const z = -W.tauCetiRV / c;
	check('WE3 z', z, 5.56e-5, 0.002); check('WE3 dl', z * W.hAlpha * 1e9, 0.0365, 0.002);
	check('WE3 new', W.hAlpha * 1e9 * (1 - z), 656.243, 1e-6); check('WE3 sixteenth', 0.0365 / ((W.naD1 - W.naD2) * 1e9), 1 / 16, 0.03);
	// WE4
	const mp = 3.93 * C.earthMass, Ms = 0.8 * C.sunMass;
	check('WE4 mp', mp, 2.347e25, 0.001); check('WE4 Ms', Ms, 1.591e30, 0.001); check('WE4 ratio', mp / Ms, 1.475e-5, 0.001);
	const vs = (mp / Ms) * 35.9e3;
	check('WE4 v', vs, 0.53, 0.002); check('WE4 z', vs / c, 1.8e-9, 0.02);
	check('WE4 walking', 1.4 / 3, 0.47, 0.01); check('WE4 period', W.tauCetiE.period, 168, 1e-9); check('WE4 30cm', W.tauCetiSignal, 0.3, 1e-9);
	// Problems
	check('P3a', -13.6 / 9, -1.51, 0.002); check('P3b', -13.6 / 16, -0.85, 1e-9);
	check('P4 dl', 660.0 - 656.279, 3.72, 0.001); check('P4 v', (2.998e5 * 3.72) / 656.279, 1700, 0.002);
	check('P5 dE', dE(5, 2), 2.856, 1e-6); check('P5 lam', 1240 / 2.856, 434, 0.001);
	check('P6 dE', dE(2, 1), 10.2, 1e-9); check('P6 lam', 1240 / 10.2, 122, 0.004);
	check('P7 sin', (2 * 656.3e-9) / 1.667e-6, 0.788, 0.001); check('P7 th', Math.asin((2 * 656.3e-9) / d) / deg, 52.0, 0.002);
	check('P7 third', (3 * 656.3e-9) / d, 1.18, 0.002);
	const t1 = Math.asin(W.naD2 / d) / deg, t2 = Math.asin(W.naD1 / d) / deg;
	check('P8 t1', t1, 20.695, 0.0001); check('P8 t2', t2, 20.717, 0.0001); check('P8 diff', t2 - t1, 0.022, 0.01);
	check('P9a', 1240 / 4260, 0.291, 0.002); check('P9b', 1240 / 14990, 0.0827, 0.002);
	check('P10', 0.01 * 25.984, 0.26, 0.002); check('P10 lo', 25.984 - 0.26, 25.72, 0.001); check('P10 hi', 25.984 + 0.26, 26.24, 0.001);
	const vsun = (5.97e24 / 1.99e30) * 29780;
	check('P11', vsun, 0.089, 0.005); check('P11 three', 0.3 / vsun, 3.4, 0.02); check('P11 earth', C.earthMass, 5.97e24, 0.001);
	check('P12', 1240 / 3.4, 365, 0.001); check('P12 limit', W.balmerLimit * 1e9, 364.5, 0.0005);
	return report('7.5 Spectroscopy');
}
