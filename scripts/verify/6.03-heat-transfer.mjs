import { check, report } from './lib.mjs';
import { THERMAL as T, ENERGY } from './constants.mjs';
const s = T.sigma;
export default function () {
	check('WE1', (T.kGlass * 2 * 189) / 0.01, 3.2e4, 0.01); check('WE1 heaters', (T.kGlass * 2 * 189) / 0.01 / 2000, 16, 0.01);
	const r1 = 0.01 / T.kGlass, r2 = 0.05 / T.kGlassWool;
	check('WE2 r1', r1, 0.0119, 0.003); check('WE2 r2', r2, 1.19, 0.002); check('WE2 P', (2 * 189) / (r1 + r2), 314, 0.002);
	check('WE2 hundredfold', (T.kGlass * 2 * 189) / 0.01 / ((2 * 189) / (r1 + r2)), 100, 0.02);
	check('WE3', 0.9 * s * 2 * (333.15 ** 4 - 294.15 ** 4), 490, 0.01);
	check('WE4', 0.9 * s * 2 * (293.15 ** 4 - 3 ** 4), 754, 0.001); check('WE4 human', ENERGY.humanPower, 100);
	check('WE5 e', Math.exp(-1.5), 0.223, 0.002); check('WE5 T', 21 + 69 * Math.exp(-1.5), 36.4, 0.002);
	check('WE5 ln', Math.log(69 / 39), 0.571, 0.002); check('WE5 t', 20 * Math.log(69 / 39), 11.4, 0.002);
	check('P3', 2 ** 4, 16);
	check('P4', (T.kGlass * 1.5 * 20) / 0.004, 6300, 0.001);
	check('P5', 0.97 * s * 1.5 * (306.15 ** 4 - 295.15 ** 4), 99, 0.01);
	check('P6', 5000 / (0.9 * s * 300 ** 4), 12.1, 0.002);
	check('P7', (2000 * 0.03) / (T.kStainless * 0.5), 8.6, 0.005);
	check('P8', 10 / Math.log(2), 14.4, 0.002);
	check('P10 a', (0.8 * 10 * 25) / 0.1, 2000); check('P10 r', 0.08 / T.kGlassWool, 1.905, 0.001); check('P10 b', 250 / (0.125 + 0.08 / T.kGlassWool), 123, 0.003);
	const A = 4 * Math.PI * 0.01 ** 2;
	check('P11 A', A, 1.257e-3, 0.001); check('P11 P', s * A * (1000 ** 4 - 300 ** 4), 70.7, 0.002); check('P11 frac', 0.3 ** 4, 0.0081, 0.001);
	check('P12 theta', 69 * Math.exp(-3), 3.4, 0.015); check('P12 T', 21 + 69 * Math.exp(-3), 24.4, 0.002); check('P12 frac', Math.exp(-3), 0.05, 0.01);
	return report('6.3 Heat transfer');
}
