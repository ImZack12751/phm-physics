import { check, report } from './lib.mjs';
import { REL as R, C, THERMAL as T } from './constants.mjs';
const c = C.c;
const gam = (b) => 1 / Math.sqrt(1 - b * b);
export default function () {
	const D = C.tauCetiLy;
	// Concept / figures
	check('660', 0.995 * c * R.muonLife, 660, 0.01); check('fig 22us', 10.01 * 2.197, 22, 0.001); check('fig 6.6', gam(0.995) * 0.995 * c * R.muonLife / 1000, 6.6, 0.01);
	check('fig 0.44', 1 / gam(0.9), 0.44, 0.01); check('fig g', gam(0.9), 2.29, 0.002);
	check('1.2 ly', D / 10.22, 1.2, 0.03);
	// WE1
	check('WE1 L', 15 / 10.0, 1.5, 1e-9); check('WE1 d', 0.995 * 2.998e8 * 2.197e-6, 655, 0.002); check('WE1 44%', 655 / 1500, 0.44, 0.01);
	// WE2
	const g92 = gam(0.92);
	check('WE2 tE', D / 0.92, 12.95, 0.001); check('WE2 L', D / 2.552, 4.67, 0.001); check('WE2 tau', 4.67 / 0.92, 5.07, 0.002); check('WE2 chk', 12.95 / 2.552, 5.07, 0.002);
	check('WE2 exact', D / 0.92 / g92, 5.07, 0.002);
	// WE3
	check('WE3', D / 10.2, 1.17, 0.003);
	// WE4
	check('WE4', 100 / gam(0.995), 10.0, 0.002);
	// WE5
	check('WE5', 12742 / 10.2, 1249, 0.001);
	// Problems
	check('P1', 1.0 / gam(0.6), 0.8, 1e-9);
	check('P4', Math.sqrt(0.75), 0.866, 0.0005);
	check('P5 L', D / gam(0.5), 10.32, 0.001); check('P5 tau', 10.32 / 0.5, 20.6, 0.002); check('P5 tE', D / 0.5, 23.8, 0.002);
	check('P6', 1500 / (0.995 * 2.998e8) * 1e6, 5.03, 0.002);
	const gb = D / 3.75, g7 = Math.sqrt(1 + gb * gb);
	check('P7 gb', gb, 3.177, 0.0005); check('P7 g', g7, 3.33, 0.002); check('P7 b', gb / g7, 0.954, 0.001); check('P7 tE', D / 0.954, 12.5, 0.002);
	check('P8 g', 50 / 30, 1.667, 0.0005); check('P8 b', Math.sqrt(1 - (30 / 50) ** 2), 0.8, 1e-9);
	check('P9', 0.5 * (100 / 3.0e8) ** 2 * 300, 1.7e-11, 0.02); check('P9 atom', 1.7e-11 / C.bohrRadius / 2, 0.16, 0.02);
	check('P10', 12742 / g92, 4990, 0.002);
	check('P12 tE', 10 / 0.92, 10.9, 0.003); check('P12 tau', 10.9 / 2.552, 4.3, 0.01); check('P12 L', 10 / 2.552, 3.9, 0.01);
	// sim tip
	check('sim 0.6', 100 / gam(0.6), 80, 1e-9); check('sim 0.999', D / gam(0.999), 0.53, 0.01);
	return report('10.4 Length contraction');
}
