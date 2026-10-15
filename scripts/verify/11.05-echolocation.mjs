import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T } from './constants.mjs';
export default function () {
	const v = 343, ve = Math.sqrt((S.gammaNH3 * T.k * 483.15) / (S.mNH3 * T.u));
	check('Erid v model', ve, 556, 0.002);
	// Concept
	check('3 s per km', 1000 / v, 3, 0.03);
	check('10 m echo', (2 * 10) / v, 0.058, 0.006); check('1 m echo', 2 / v, 0.006, 0.03);
	check('speech 0.3 m', v / 1000, 0.34, 0.01);
	check('bat 20k', (v / 20000) * 1000, 17, 0.01); check('bat 60k', (v / 60000) * 1000, 6, 0.05);
	check('bat range', S.batLow, 11e3, 1e-9); check('bat high', S.batHigh, 212e3, 1e-9);
	check('Erid 1 cm', 556 / 0.01, 56e3, 0.01);
	check('3 ms = 1 m', v * 0.003, 1, 0.03); check('half metre', (v * 0.003) / 2, 0.5, 0.03);
	check('25 µs', 1 / 40e3, 25e-6, 1e-9); check('4 mm', v / (2 * 40e3), 0.0043, 0.003);
	check('max ITD 0.6 ms', 0.2 / v, 0.0006, 0.03);
	check('12 dB', 40 * Math.log10(2), 12, 0.004); check('16x', 2 ** 4, 16, 1e-9);
	check('99.9% reflect', 1 - (4 * 413 * 1.54e6) / (413 + 1.54e6) ** 2, 0.999, 0.0002);
	// WE1
	check('WE1 Erid', (2 * 2.5) / 556, 0.009, 0.001); check('WE1 air', 5 / v, 0.0146, 0.004); check('WE1 1.6x', 556 / v, 1.6, 0.02);
	// WE2
	check('WE2 a', 556 / 440, 1.26, 0.003); check('WE2 b', 556 / 5000, 0.111, 0.002); check('WE2 f', 556 / 0.01, 5.6e4, 0.01);
	// WE3
	check('WE3 a', v * 0.003, 1.0, 0.03); check('WE3 b1', (v / 60000) * 1000, 5.7, 0.003); check('WE3 b2', (v / 20000) * 1000, 17, 0.01);
	check('WE3 c', (v / 80000) * 1000, 4.3, 0.003); check('WE3 d', (v * 0.058) / 2, 9.9, 0.005);
	// WE4
	check('WE4 sin', (v * 0.0003) / 0.2, 0.514, 0.002); check('WE4 theta', (Math.asin(0.5145) * 180) / Math.PI, 31, 0.003);
	check('WE4 max', (0.2 / v) * 1000, 0.58, 0.006);
	// WE5
	check('WE5 factor', 348 / 338, 1.0296, 0.0001); check('WE5 f', (50000 * 348) / 338, 51480, 0.0001);
	check('WE5 shift', (50000 * 348) / 338 - 50000, 1500, 0.02); check('WE5 approx', (2 * 5 * 50000) / v, 1460, 0.002);
	// WE6
	check('WE6 lam', 1540 / 5e6, 3.1e-4, 0.01); check('WE6 d', (1540 * 104e-6) / 2, 0.08, 0.002);
	// Problems
	check('P1', v * 6, 2.1e3, 0.02); check('P2', (v * 0.5) / 2, 86, 0.003); check('P3', (1540 * 5.2) / 2, 4.0e3, 0.002);
	check('P4', 50 - 40 * Math.log10(2), 38, 0.003);
	check('P5 a', (556 * 0.025) / 2, 6.95, 1e-9); check('P5 b', (v * 0.025) / 2, 4.3, 0.003);
	check('P6', 1540 / 100000, 0.0154, 1e-9); check('P6 4.5x', 1540 / v, 4.5, 0.003);
	check('P7', (v / (2 * 50000)) * 1000, 3.4, 0.01);
	check('P8 sin', (v * 0.00045) / 0.2, 0.772, 0.001); check('P8 theta', (Math.asin(0.772) * 180) / Math.PI, 50.5, 0.002);
	check('P9', (2 * 0.5 * 40000) / v, 117, 0.004);
	check('P10', (4 * 413 * 1.54e6) / 1.54e6 ** 2, 1.1e-3, 0.03);
	check('P11 sin', (556 * 0.00027) / 0.3, 0.5, 0.001); check('P11 max', (0.3 / 556) * 1000, 0.54, 0.002);
	check('P12', 2 * 50000 * (5 / v) ** 2, 21, 0.02); check('P12 diff', 51480 - 51460, 20, 1e-9);
	check('P13 a', 5 * 10 ** 0.3, 10, 0.003); check('P13 b', 10 ** 0.6, 4.0, 0.005);
	return report('11.5 Echolocation');
}
