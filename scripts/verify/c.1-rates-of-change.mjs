import { check, report } from './lib.mjs';
import { C } from './constants.mjs';
const d = (t) => 7.35 * t * t;
export default function () {
	check('1.5 g', 1.5 * C.gStandard, 14.7, 0.002);
	check('day of 1.5g km/s', (14.7 * 86400) / 1000, 1270, 0.001);
	check('fig d(2)', d(2), 29.4); check('fig d(6)', d(6), 264.6);
	check('WE1', -21.6 / 3600, -6.0e-3);
	check('WE2', (d(6) - d(2)) / 4, 58.8);
	check('WE2 shortcut', 7.35 * 8, 58.8);
	check('WE3a', 4 / 11, 0.364, 0.002);
	check('WE3b', 16.6 / 10, 1.66);
	check('WE3 D30', 5 * 2 ** (10 / 4.737), 21.6, 0.002);
	check('WE5 speed', (Math.PI * C.earthSemiMajor) / (C.julianYear / 2), 2.978e4, 0.002);
	check('WE5 velocity', (2 * C.earthSemiMajor) / (C.julianYear / 2), 1.896e4, 0.002);
	check('P1 km/h', 5 / (25 / 60), 12); check('P1 m/s', 5000 / 1500, 3.3, 0.02);
	check('P2', -240 / 30, -8);
	check('P4a', 7.35 * 10, 73.5); check('P4b', 7.35 * 19, 139.65); check('P4c', 7.35 * 19.9, 146.27, 1e-4);
	check('P5', 27 / 9, 3); check('P5 g', 3 / 9.81, 0.31, 0.02);
	check('P6b', 1 / 4.74, 0.21, 0.02); check('P6c', 100 / 4.74, 21, 0.01);
	check('P7 a', (30 - 18) / 2, 6);
	check('P8', (1361 - 2601) / 0.277, -4.48e3, 0.002);
	check('P9', (8 - 1) / 1, 1 + 2 + 4);
	check('P10 s', (0.01 * 3e8) / 14.7, 2.04e5, 0.002);
	check('P10 h', (0.01 * 3e8) / 14.7 / 3600, 56.7, 0.002);
	return report('C.1 Rates of change');
}
