import { check, report } from './lib.mjs';
import { REL as R, ENERGY as EN, MASSENERGY as M, C } from './constants.mjs';
const c = C.c, c2 = c * c;
const gam = (b) => 1 / Math.sqrt(1 - b * b);
export default function () {
	// Concept
	check('g 0.1', gam(0.1), 1.005, 0.0001); check('g 0.5', gam(0.5), 1.155, 0.0005); check('g=2 at', Math.sqrt(0.75), 0.866, 0.0005);
	check('g 0.99', gam(0.99), 7.09, 0.001); check('g 0.999', gam(0.999), 22.4, 0.002);
	check('day v', 14.71 * 86400 / 1000, 1270, 0.001); check('day g-1', gam((14.71 * 86400) / c) - 1, 9e-6, 0.002);
	check('0.99 vs 0.92 KE', (gam(0.99) - 1) / (gam(0.92) - 1), 3.9, 0.01); check('8% speed', 0.99 / 0.92 - 1, 0.076, 0.01);
	// fig
	check('fig 0.8', gam(0.8), 1.67, 0.002); check('fig 0.92', gam(0.92), 2.55, 0.001);
	check('triangle', Math.sqrt((5 / 3) ** 2 - 1), 4 / 3, 1e-9);
	// WE1
	check('WE1 b', 1.27e6 / 3.0e8, 4.24e-3, 0.002); check('WE1', 0.5 * (4.24e-3) ** 2, 9.0e-6, 0.002);
	// WE2
	const K = (gam(0.92) - 1) * EN.shipDry * c2;
	check('WE2 g', gam(0.92), 2.552, 0.0002); check('WE2 K', K, 1.39e22, 0.004);
	check('WE2 KN', 0.5 * EN.shipDry * (0.92 * 2.998e8) ** 2, 3.8e21, 0.002); check('WE2 ratio', K / (0.5 * EN.shipDry * (0.92 * c) ** 2), 3.7, 0.01);
	check('WE2 frac', K / (EN.totalFuel * c2), 0.078, 0.01);
	// WE3
	const G = (R.lhcTeV * 1e6) / R.protonMeV;
	check('WE3 g', G, 7247, 0.0005); check('WE3 1-b', 1 / (2 * G * G), 9.5e-9, 0.003);
	// WE4
	check('WE4 E', 1.155 * 8.988e16, 1.038e17, 0.0005); check('WE4 K', 0.155 * 8.988e16, 1.39e16, 0.003);
	check('WE4 p', 1.155 * 1.499e8, 1.731e8, 0.0005); check('WE4 pc', 1.731e8 * 2.998e8, 5.19e16, 0.001);
	check('WE4 check', Math.sqrt(5.19e16 ** 2 + 8.988e16 ** 2), 1.038e17, 0.001);
	check('WE4 KN', 0.5 * (0.5 * c) ** 2, 1.12e16, 0.004); check('WE4 19%', 1 - 1.12e16 / 1.39e16, 0.19, 0.03);
	// WE5
	check('WE5 ratio exact', (gam(0.5) - 1) / (0.5 * 0.25), 1.24, 0.003); check('WE5 approx', 1 + 0.75 * 0.25, 1.19, 0.003);
	check('WE5 b', Math.sqrt(0.01 / 0.75), 0.115, 0.005);
	// realism
	check('years of world', K / (EN.worldPower * C.julianYear), 23, 0.02);
	// Problems
	check('P1', gam(0.1), 1.00504, 1e-5);
	const p5 = gam(0.92) * 5.24e-13 * 0.92 * 2.998e8;
	check('P5', p5, 3.7e-4, 0.005); check('P5 n', 5.24e-13 * 0.92 * 2.998e8, 1.4e-4, 0.04);
	check('P6 a', gam(0.99), 7.09, 0.001); check('P6 b', gam(0.999), 22.37, 0.0005); check('P6 r', 21.37 / 6.09, 3.5, 0.005);
	check('P7', gam(0.995) * 105.7, 1058, 0.001); check('P7 muon', R.muonMeV, 105.7, 0.001);
	check('P8', (gam(0.99) - 1) * M.electronMeV, 3.11, 0.001);
	check('P9 g-1', gam(0.995) - 1, 9.01, 0.001); check('P9 K', 9.01e5 * 8.988e16, 8.1e22, 0.001); check('P9 frac', 8.1e22 / 1.8e23, 0.45, 0.001);
	check('P11 b', Math.sqrt(1 - 1 / 9), 0.943, 0.0005); check('P11 p', 3 * 0.943, 2.83, 0.001); check('P11 sqrt8', Math.sqrt(8), 2.83, 0.001);
	check('P12', (3.47 - 1) * 1e5 * 8.988e16, 2.2e22, 0.01); check('P12 frac', 2.2e22 / 1.8e23, 0.12, 0.02);
	return report('10.3 The Lorentz factor');
}
