import { check, report } from './lib.mjs';

export default function () {
	const T = (11 * Math.LN2) / Math.log(5);
	check('2^40', 2 ** 40, 1.0995e12, 1e-4);
	check('e n=12', (1 + 1 / 12) ** 12, 2.613, 1e-3);
	check('e n=365', (1 + 1 / 365) ** 365, 2.7146, 1e-4);
	check('n=2 halves', 1.5 ** 2, 2.25);
	check('WE1', 12 / Math.log10(2), 39.86, 1e-3);
	check('WE2', T, 4.74, 0.002);
	check('WE3 doublings', 10 / T, 2.11, 0.002);
	check('WE3 factor', 2 ** (10 / T), 4.32, 0.002);
	check('WE3', 5 * 2 ** (10 / T), 21.6, 0.002);
	check('WE4 exponent', 20 / 87.7, 0.2281, 1e-3);
	check('WE4 ln', (20 / 87.7) * Math.log(0.5), -0.1581, 1e-3);
	check('WE4', 0.5 ** (20 / 87.7), 0.854, 1e-3);
	const k = Math.LN2 / T;
	check('WE5 k', k, 0.1463, 1e-3);
	check('WE5 check', Math.exp(k * 11), 5, 1e-9);
	check('WE5 rule70', 70 / 14.63, 4.8, 0.01);
	check('P1c', 5 ** 6, 15625);
	check('P2c', 8 ** (2 / 3), 4, 1e-9);
	check('P5 doublings', (24 * 60) / 20, 72);
	check('P5 log', 72 * Math.log10(2), 21.674, 1e-4);
	check('P5', 2 ** 72, 4.72e21, 1e-3);
	check('P6', Math.log(50) / Math.LN2, 5.64, 1e-3);
	check('P7c', (87.7 * Math.log(0.1)) / Math.log(0.5), 291, 0.002);
	check('P8', Math.LN2 / Math.log(1.07), 10.24, 1e-3);
	check('P9', (Math.log(10) / Math.LN2) * 4.74, 15.7, 0.003);
	check('P10 log2', Math.log(0.01) / Math.LN2, -6.644, 1e-3);
	check('P10', 9 + T * (Math.log(0.01) / Math.LN2), -22.5, 0.005);
	check('P11c', Math.log10(1.6e3), 3.2041, 1e-4);
	check('P12a', (1 + 1 / 12) ** 12, 2.613, 1e-3);
	check('P12b yearly', 1.05 ** 10, 1.6289, 1e-4);
	check('P12b cont', Math.exp(0.5), 1.6487, 1e-4);
	return report('0.8 Exponentials and logarithms');
}
