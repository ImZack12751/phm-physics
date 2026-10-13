import { check, report } from './lib.mjs';
import { THERMAL as T, C } from './constants.mjs';
const k = T.k, u = T.u;
const vrms = (K, M) => Math.sqrt((3 * k * K) / (M * u));
export default function () {
	check('WE1 K', 96.415 + 273.15, 369.565, 1e-9);
	check('WE1 KE', 1.5 * k * 369.565, 7.65e-21, 0.002); check('WE1 KE room', 1.5 * k * 293.15, 6.07e-21, 0.002);
	check('WE1 ratio', 369.565 / 293.15, 1.26, 0.002);
	check('WE2 m', 28.0 * u, 4.65e-26, 0.001); check('WE2 v', vrms(293.15, 28), 511, 0.002);
	check('WE3 m', 17.0 * u, 2.823e-26, 0.001); check('WE3 v', vrms(483.15, 17), 842, 0.002);
	check('WE3 ratio', vrms(483.15, 17) / vrms(293.15, 28), 1.65, 0.003);
	const W = 20 * 10 * C.gStandard * 1.5 * 2.0;
	check('WE4 W', W, 5884, 0.001); check('WE4 cal', W / T.calorie, 1406, 0.001); check('WE4 dT', W / T.calorie / 1000, 1.41, 0.003);
	check('WE5 dL', T.alphaSteel * 3.0 * (210 - 21), 6.8e-3, 0.002); check('WE5 frac', T.alphaSteel * 189, 0.002, 0.15);
	check('P4', Math.sqrt(2), 1.41, 0.003);
	check('P5', vrms(293.15, 4.0), 1350, 0.002);
	check('P6', (28 * u * 1e6) / (3 * k), 1123, 0.002); check('P6 check', (1000 / 511) ** 2 * 293.15, 1122, 0.002);
	check('P7', 500 - 200, 300);
	check('P8 cal', (12 * 600) / T.calorie, 1721, 0.001); check('P8 dT', (12 * 600) / T.calorie / 1000, 1.72, 0.003);
	check('P9', T.alphaAl * 10 * 120, 0.03, 0.001);
	check('P10', vrms(293.15, 131.3), 236, 0.003);
	const N = 1 / (28 * u);
	check('P11 N', N, 2.15e25, 0.003); check('P11 E', N * 1.5 * k * 293.15, 1.31e5, 0.005); check('P11 h', (N * 1.5 * k * 293.15) / 9.81, 13.3e3, 0.01);
	return report('6.1 Temperature and heat');
}
