import { check, report } from './lib.mjs';
import { C } from './constants.mjs';

export default function () {
	const g = (2 * 1.5) / 0.452 ** 2;
	check('WE1 g', g, 14.68, 1e-3);
	check('WE1 ratio', g / 9.81, 1.5, 0.005);
	check('WE1 vs standard g', g / C.gStandard, 1.497, 0.002);
	check('WE2', 5.0 / 1000, 5.0e-3);
	check('WE3 s', 1.127e17 / 2.998e8, 3.759e8, 1e-3);
	check('WE3 yr', 1.127e17 / 2.998e8 / 3.156e7, 11.91, 1e-3);
	check('WE4', (2.998e8 * 276) / 2, 4.14e10, 1e-3);
	check('WE4 Venus closest approach', C.earthSemiMajor - C.venusSemiMajor, 4.14e10, 0.01);
	check('WE5', 1200 / 8, 150);
	check('P3', 150 / 60, 2.5);
	check('P4', Math.sqrt(50 / Math.PI), 3.99, 1e-3);
	check('P5', (5 / 9) * (451 - 32) + 273.15, 505.93, 1e-4);
	check('P7', 2 * 11.91, 23.8, 1e-3);
	check('P8', 240 / 24, 10);
	check('P9', (7 + 9) / 2, 8);
	check('P10', (4 * Math.PI ** 2 * 0.5) / 1.16 ** 2, 14.7, 0.005);
	check('P11', 2550 / 4, 637.5);
	check('P11 check', 2.5 * 637.5 + 1.5 * 537.5, 2400);
	check('P12', Math.sqrt(C.sunLuminosity / (4 * Math.PI * C.solarIrradiance)), 1.496e11, 1e-3);
	return report('0.4 Rearranging formulas');
}
