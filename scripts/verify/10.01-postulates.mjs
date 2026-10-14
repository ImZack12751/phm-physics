import { check, report } from './lib.mjs';
import { REL as R, C } from './constants.mjs';
const c = C.c, a = 1.5 * C.gStandard, ly = C.lightYear;
const gam = (b) => 1 / Math.sqrt(1 - b * b);
export default function () {
	// Concept / scene
	check('newton 5.55', (2 * Math.sqrt((11.912 * ly) / a)) / C.julianYear, 5.55, 0.002);
	check('MM expected', R.mmExpected, 0.4, 1e-9); check('MM observed', R.mmObserved, 0.02, 1e-9); check('twentieth', R.mmObserved / R.mmExpected, 0.05, 1e-9);
	// WE1
	const vp = Math.sqrt(a * 11.912 * ly);
	check('WE1 a', a, 14.71, 0.0005); check('WE1 v', vp, 1.288e9, 0.002); check('WE1 vc', vp / c, 4.29, 0.002); check('WE1 gal', vp / c + 1, 5.29, 0.002);
	// WE2
	const b = 3.0e4 / 3.0e8, L = R.mmArm;
	check('WE2 b', b, 1e-4, 1e-9); check('WE2 dt', (L / 3.0e8) * b * b, 3.7e-16, 0.01); check('WE2 path', L * b * b, 1.1e-7, 1e-6);
	check('WE2 shift', (2 * L * b * b) / 5.5e-7, 0.4, 1e-6);
	// exact check of the approximation
	const tpar = (2 * L) / c / (1 - b * b), tper = (2 * L) / c / Math.sqrt(1 - b * b);
	check('WE2 exact', tpar - tper, 3.67e-16, 0.003);
	// WE3
	check('WE3', 1 + 0.92, 1.92, 1e-9);
	// WE4
	check('WE4 t', 50 / 3.0e8 * 1e9, 167, 0.002); check('WE4 g', gam(0.6), 1.25, 1e-9); check('WE4 dt', (1.25 * 100 * 0.6) / 3.0e8 * 1e9, 250, 1e-9);
	// WE5
	check('WE5', (4 * 30) / (3.0e8) ** 2, 1.3e-15, 0.03);
	// Problems
	check('P3', 40 + 1.5, 41.5, 1e-9); check('P3 small', (40 / c) ** 2, 1.8e-14, 0.02);
	check('P5', (2 * 30 * 1e-8) / 5.5e-7, 1.1, 0.01);
	check('P6 2L/c', (2 * 11) / c, 7.34e-8, 0.001); check('P6 rel', 0.5 * 1e-8, 5e-9, 1e-9);
	check('P7 g', gam(0.9), 2.29, 0.002); check('P7', (2.29 * 100 * 0.9) / 3.0e8 * 1e9, 690, 0.005);
	check('P8 fwd', 100 / (1.6 * 3e8) * 1e9, 208, 0.002); check('P8 back', 100 / (0.4 * 3e8) * 1e9, 833, 0.001);
	check('P9', (3e4 / 3e8) ** 2, 1e-8, 1e-9);
	check('P11', gam(0.5) * 0.5, 0.577, 0.001); check('P11 g', gam(0.5), 1.155, 0.0005);
	// sim default
	check('sim L0/2c', 50 / c * 1e9, 166.8, 0.001);
	return report('10.1 The postulates of relativity');
}
