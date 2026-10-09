import { check, report } from './lib.mjs';
import { SPIN } from './constants.mjs';
const P = Math.PI, G = 9.81, RPM = (2 * P) / 60;
const rFor = (n) => G / (n * RPM) ** 2;
export default function () {
	[[1, 895, 93.7], [2, 224, 46.8], [4, 55.9, 23.4], [6, 24.8, 15.6]].forEach(([n, r, v]) => {
		check(`fig/WE1 r ${n}`, rFor(n), r, 0.002); check(`WE1 v ${n}`, Math.sqrt(G * rFor(n)), v, 0.002);
	});
	check('WE1 ω4', 4 * RPM, 0.419, 0.001);
	check('WE2 rCrew', SPIN.rCrew, 78); check('WE2 rAft', SPIN.rAft, 26);
	check('WE2 ω', SPIN.omega, 0.355, 0.002); check('WE2 rpm', SPIN.omega / RPM, 3.39, 0.002); check('WE2 ω²', SPIN.omega ** 2, 0.1258, 0.001);
	check('WE2 gRear', SPIN.omega ** 2 * 26, 3.27, 0.001); check('WE2 gRear g', (SPIN.omega ** 2 * 26) / G, 0.33, 0.015);
	check('WE2 T', SPIN.mCrew * SPIN.omega ** 2 * SPIN.rCrew, 1.96e6, 0.002); check('WE2 T other', SPIN.mAft * SPIN.omega ** 2 * SPIN.rAft, 1.96e6, 0.002);
	check('WE3 head', G * (76.2 / 78), 9.58, 0.001); check('WE3 %', 1.8 / 78, 0.023, 0.005);
	const f = (347 / 346) ** 2 - 1, r4 = 4.5 / f, w4 = Math.sqrt(14.7 / r4);
	check('WE4 frac', f, 0.00579, 0.002); check('WE4 r', r4, 777, 0.001); check('text r', r4, 780, 0.005);
	check('WE4 ω', w4, 0.138, 0.005); check('WE4 rpm', w4 / RPM, 1.31, 0.003); check('WE4 v', Math.sqrt(14.7 * r4), 107, 0.002);
	check('WE5', (SPIN.omega ** 2 * 39) / G, 0.5); check('WE5 ms', SPIN.omega ** 2 * 39, 4.9, 0.002);
	check('gradient 25', 1.8 / 25, 0.072); check('Earth gradient', (2 * 1.8) / 6.371e6, 5.7e-7, 0.01);
	check('sim 1.31rpm', rFor(1.31), 520, 0.005);
	const w1 = 3 * RPM;
	check('P1 ω', w1, 0.314, 0.001); check('P1 ω²', w1 ** 2, 0.0987, 0.001); check('P1 g', w1 ** 2 * 100, 9.87, 0.001);
	check('P2 ω', 2 * RPM, 0.209, 0.003); check('P2 r', rFor(2), 224, 0.002);
	check('P5', Math.sqrt(G * 224), 46.9, 0.001);
	check('P6 25', 1.8 / 25, 0.072); check('P6 78', 1.8 / 78, 0.023, 0.005);
	check('P7 ω', Math.sqrt(3.73 / 78), 0.219, 0.002); check('P7 rpm', Math.sqrt(3.73 / 78) / RPM, 2.09, 0.002);
	check('P8 ω', Math.sqrt(14.7 / 78), 0.434, 0.001); check('P8 rpm', Math.sqrt(14.7 / 78) / RPM, 4.15, 0.002); check('P8 T', 2e5 * 14.7, 2.94e6);
	check('P9 ω', Math.sqrt(G / 52), 0.434, 0.001); check('P9 rpm', Math.sqrt(G / 52) / RPM, 4.15, 0.002);
	const f2 = (348 / 346) ** 2 - 1;
	check('P11 frac', f2, 0.0116, 0.002); check('P11 r', 4.5 / f2, 388, 0.001);
	check('P12 grad', 1.8 / 0.05, 36); check('P12 spin', (0.9 * G) / (4 * RPM) ** 2, 50.3, 0.001);
	return report('3.3 Designing spin gravity');
}
