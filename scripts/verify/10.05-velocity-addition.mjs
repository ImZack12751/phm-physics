import { check, report } from './lib.mjs';
import { WAVES as W, C } from './constants.mjs';
const add = (a, b) => (a + b) / (1 + a * b);
const D = (b) => Math.sqrt((1 + b) / (1 - b));
export default function () {
	// Concept
	check('0.973', add(0.5, 0.92), 0.973, 0.0005); check('light', add(1, 0.7), 1, 1e-12);
	check('fig phi .5', Math.atanh(0.5), 0.549, 0.001); check('fig phi .92', Math.atanh(0.92), 1.589, 0.0005); check('fig sum', Math.atanh(0.5) + Math.atanh(0.92), 2.138, 0.0005);
	check('fig D .92', D(0.92), 4.9, 0.001); check('burn', 1 - 1 / D(0.92), 0.8, 0.006);
	check('cosh = gamma', Math.cosh(Math.atanh(0.6)), 1.25, 1e-9); check('sinh = gb', Math.sinh(Math.atanh(0.6)), 0.75, 1e-9);
	// WE1
	check('WE1 num', 1.42 / 1.46, 0.973, 0.0005); check('WE1 tanh', Math.tanh(2.138), 0.973, 0.0005);
	// WE2
	const c = C.c, v = 0.5 * c, u = (10 + v) / (1 + (10 * v) / (c * c));
	check('WE2', u - v, 7.5, 0.001);
	// WE3
	check('WE3 sqrt24', Math.sqrt(24), 4.899, 0.0001); check('WE3 rec', W.petrova * 1e6 * D(0.92), 127.3, 0.001); check('WE3 app', W.petrova * 1e6 / D(0.92), 5.3, 0.001);
	// WE4
	check('WE4', D(0.92), 4.9, 0.001); check('WE4 left', 1 / D(0.92), 0.204, 0.002); check('WE4 simple', Math.exp(0.92), 2.51, 0.002); check('WE4 60', 1 - Math.exp(-0.92), 0.6, 0.003);
	// WE5
	check('WE5', add(0.6, 0.6), 0.882, 0.0005);
	// RvB
	check('24', D(0.92) ** 2, 24, 1e-9);
	// Problems
	check('P1', add(0.6, 0.6), 0.882, 0.0005);
	check('P3', 1200 / 9e16, 1.3e-14, 0.03);
	check('P4 phi', 0.5 * Math.log(3), 0.549, 0.001); check('P4 cosh', (Math.sqrt(3) + 1 / Math.sqrt(3)) / 2, 1.155, 0.0005);
	check('P5', add(0.9, 0.9), 0.9945, 0.0001);
	check('P6 D', D(0.995), 19.97, 0.0005); check('P6 lam', 25.984 * 19.97, 519, 0.001);
	check('P7', (0.92 - 0.5) / (1 - 0.46), 0.778, 0.0005);
	const b8 = 16.68e3 / 2.998e8;
	check('P8 b', b8, 5.564e-5, 0.0005); check('P8', Math.sqrt((1 - b8) / (1 + b8)), 0.9999444, 1e-7);
	check('P9 x', 1.25 * (3.0e8 - 0.6 * 3.0e8 * 2.0), -7.5e7, 1e-9); check('P9 t', 1.25 * (2.0 - 0.6), 1.75, 1e-9);
	check('P10 each', D(0.9), 4.36, 0.001); check('P10', D(0.9) ** 2, 19, 1e-9);
	const ph = Math.log(Math.sqrt(21));
	check('P11 each', Math.sqrt(21), 4.58, 0.001); check('P11 phi', ph, 1.522, 0.0005); check('P11 b', Math.tanh(ph), 0.909, 0.0005); check('P11 exact', Math.tanh(ph), 10 / 11, 1e-12);
	return report('10.5 Velocity addition');
}
