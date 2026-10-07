import { check, report } from './lib.mjs';
import { C } from './constants.mjs';
// Midpoint-rule integral with many strips, as an independent check on every printed integral.
const integ = (f, a, b, n = 20000) => {
	const dx = (b - a) / n;
	let s = 0;
	for (let k = 0; k < n; k++) s += f(a + (k + 0.5) * dx);
	return s * dx;
};
const num = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
export default function () {
	check('1.5 g', 1.5 * C.gStandard, 14.7, 0.002);
	check('anatomy 735', integ((t) => 14.7 * t, 0, 10), 735);
	check('WE1 a', integ((t) => 14.7 * t, 0, 10), 735); check('WE1 b', integ((t) => 14.7 * t, 10, 20), 2205);
	check('WE1 total', integ((t) => 14.7 * t, 0, 20), 2940); check('WE1 check', 7.35 * 400, 2940);
	check('WE2', integ((t) => 3 + 2 * t, 0, 4), 28); check('WE2 rev', -integ((t) => 3 + 2 * t, 0, 4), -28);
	const F3 = (x) => 2 * x ** 3 - 2 * x * x + 5 * x;
	check('WE3 check', num(F3, 1.3), 6 * 1.69 - 4 * 1.3 + 5, 1e-6);
	check('WE4 v', 3000 + 14.7 * 60, 3882); check('WE4 x', 3000 * 60 + 7.35 * 3600, 206460);
	check('WE4 x by integral', integ((t) => 3000 + 14.7 * t, 0, 60), 206460);
	check('WE5 x(pi/4)', integ((t) => 0.4 * Math.cos(2 * t), 0, Math.PI / 4), 0.2);
	check('ln slope at 1', (Math.log(1.001) - 0) / 0.001, 0.9995, 1e-4);
	check('ln slope at 2.5', num(Math.log, 2.5), 1 / 2.5, 1e-6);
	check('P1a', integ(() => 3, 0, 5), 15); check('P1b', integ((x) => x, 0, 4), 8); check('P1c', integ((x) => x, -2, 2), 0);
	check('P2e', num((x) => (2 / 3) * x ** 1.5, 2), Math.sqrt(2), 1e-6);
	check('P3', 5 - 2, 3); check('P3c', 4 * 5, 20);
	check('P4c', num((t) => -Math.cos(Math.PI * t) / Math.PI, 0.3), Math.sin(Math.PI * 0.3), 1e-6);
	const tStop = 5000 / 14.7;
	check('P5 t', tStop, 340.1, 1e-3); check('P5 x', 5000 * tStop - 7.35 * tStop ** 2, 850340, 1e-5);
	check('P5 triangle', 0.5 * tStop * 5000, 850340, 1e-5);
	check('P6', 1 - 2 + 5, 4);
	check('P7', Math.log(3 * 2.7) - Math.log(2.7), 1.0986, 1e-4);
	check('P8 k', Math.LN2 / 4.737, 0.1463, 1e-3);
	check('P9', integ((t) => 0.6 * t * t, 0, 10), 200);
	check('P10 t', 5 / 9.81, 0.51, 0.002); check('P10 h', 25 / 19.62, 1.27, 0.005);
	check('P11', Math.cbrt(1000), 10); check('P11 by integral', integ((t) => 3 * t * t, 0, 10), 1000);
	check('P12 sin', integ(Math.sin, -Math.PI, Math.PI), 0); check('P12 cube', integ((x) => x ** 3, -1, 1), 0);
	return report('C.5 Integrals');
}
