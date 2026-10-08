import { check, report } from './lib.mjs';
const integ = (f, a, b, n = 20000) => {
	const dx = (b - a) / n;
	let s = 0;
	for (let k = 0; k < n; k++) s += f(a + (k + 0.5) * dx);
	return s * dx;
};
const num = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
export default function () {
	check('disp', 20 - -30, 50); check('dist', 80 + 30, 110);
	check('WE1 vavg', 50 / 60, 0.83, 0.005); check('WE1 speed', 110 / 60, 1.83, 0.005);
	const x2 = (t) => 4 + 12 * t - 1.5 * t * t;
	check('WE2 rest', 12 / 3, 4); check('WE2 x(4)', x2(4), 28); check('WE2 v(2)', num(x2, 2), 6, 1e-6); check('WE2 v(6)', num(x2, 6), -6, 1e-6);
	const v = (t) => (t < 5 ? 2 * t : t < 10 ? 10 : 10 - 2.5 * (t - 10));
	check('WE3 stage1', integ(v, 0, 5), 25); check('WE3 stage2', integ(v, 5, 10), 50); check('WE3 stage3', integ(v, 10, 14), 20);
	check('WE3 total', integ(v, 0, 14), 95, 1e-4); check('WE3 avg', 95 / 14, 6.79, 0.002);
	check('WE4 speed', Math.hypot(3, 4), 5); check('WE4 angle', (Math.atan2(-4, 3) * 180) / Math.PI, -53.1, 0.002);
	check('WE4 pos x', 3 * 4, 12); check('WE4 pos y', 40 - 0.5 * 16, 32);
	check('WE5', Math.sqrt(0.91 / 7.35), 0.352, 0.003);
	check('P1', 12 - 5, 7); check('P2 v', 6 * 2 - 2, 10);
	check('P3', 14.7 * 3600, 52920);
	check('P5 avg5', 25 / 5, 5);
	const x6 = (t) => 20 + 6 * t - t * t;
	check('P6 x3', x6(3), 29); check('P6 x8', x6(8), 4); check('P6 dist', integ((t) => Math.abs(6 - 2 * t), 0, 8), 34, 1e-4);
	check('P7 a', 100 / 3.6 / 8, 3.47, 0.002); check('P7 g', 100 / 3.6 / 8 / 9.81, 0.35, 0.02); check('P7 t', 100 / 3.6 / 14.7, 1.89, 0.002);
	check('P8 speed', Math.hypot(2, 6), 6.32, 0.002); check('P8 angle', (Math.atan(3) * 180) / Math.PI, 71.6, 0.002);
	const v9 = (t) => (t < 3 ? 4 : 4 - 2 * (t - 3));
	check('P9 disp', integ(v9, 0, 6), 15, 1e-4); check('P9 dist', integ((t) => Math.abs(v9(t)), 0, 6), 17, 1e-4);
	check('P10 vmax', 6 * 3 - 9, 9); check('P10 x6', 3 * 36 - 216 / 3, 36); check('P10 by integral', integ((t) => 6 * t - t * t, 0, 6), 36);
	check('P11', (9.261 - 6.859) / 0.2, 12.01, 1e-3);
	check('P12', 24 / 5, 4.8);
	return report('1.1 Kinematics');
}
