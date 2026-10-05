import { check, report } from './lib.mjs';

const d2r = Math.PI / 180;
const ang = (x, y) => ((Math.atan2(y, x) / d2r) + 360) % 360;
export default function () {
	check('WE1 mag', Math.hypot(30, 40), 50);
	check('WE1 ang', ang(30, 40), 53.1, 1e-3);
	check('WE2 vx', 2 * Math.cos(35 * d2r), 1.64, 0.002);
	check('WE2 vy', 2 * Math.sin(35 * d2r), 1.15, 0.003);
	check('WE3 v', Math.hypot(1.5, 4), 4.27, 0.001);
	check('WE3 ang', ang(1.5, 4), 69.4, 1e-3);
	check('WE4 mag', Math.hypot(-2, 3), 3.61, 0.002);
	check('WE4 calc atan', Math.atan(3 / -2) / d2r, -56.3, 1e-3);
	check('WE4 ang', ang(-2, 3), 123.7, 1e-3);
	check('WE4 speeds', Math.hypot(3, 1), 3.16, 0.002);
	check('WE4 speeds 2', Math.hypot(1, 4), 4.12, 0.002);
	check('WE5 mag', Math.hypot(-3, 4), 5);
	check('WE5 ang', ang(-3, 4), 126.9, 1e-3);
	check('P2', ang(6, 8), 53.1, 1e-3);
	check('P3x', 12 * Math.cos(30 * d2r), 10.4, 0.002);
	check('P5 mag', Math.hypot(-12, 5), 13);
	check('P5 ang', ang(-12, 5), 157.4, 1e-3);
	check('P5 W of N', ang(-12, 5) - 90, 67.4, 1e-3);
	check('P6', Math.hypot(6, -2), 6.32, 1e-3);
	check('P7 v', Math.hypot(40, 250), 253, 0.002);
	check('P7 ang', Math.atan(40 / 250) / d2r, 9.1, 0.005);
	check('P8', Math.hypot(1.5 - 3, 3 * Math.sin(60 * d2r)), 3.0, 1e-9);
	check('P9', Math.hypot(2, 3, 6), 7);
	check('P10', ang(-4, -3), 216.9, 1e-3);
	check('P11 mag', Math.hypot(10, 8), 12.8, 0.002);
	check('P11 ang', ang(-10, -8), 218.7, 1e-3);
	const bx = 2 + 1.5 * Math.cos(120 * d2r), by = 1.5 * Math.sin(120 * d2r);
	check('P12 x', bx, 1.25);
	check('P12 y', by, 1.299, 1e-3);
	check('P12 mag', Math.hypot(bx, by), 1.80, 0.003);
	check('P12 ang', ang(bx, by), 46.1, 1e-3);
	return report('0.7 Vectors');
}
