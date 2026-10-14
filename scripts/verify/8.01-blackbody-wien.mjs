import { check, report } from './lib.mjs';
import { STARS as S, THERMAL as T, WAVES as W, C } from './constants.mjs';
const h = C.h, c = C.c, k = T.k, b = S.wienB, sigma = T.sigma, eV = W.eV;
const B = (l, TT) => (2 * h * c * c) / l ** 5 / Math.expm1((h * c) / (l * k * TT));
const frac = (TT, a, z) => {
	let s = 0;
	const n = 20000;
	for (let i = 0; i < n; i++) s += B(a + ((z - a) * (i + 0.5)) / n, TT) * ((z - a) / n);
	return (Math.PI * s) / (sigma * TT ** 4);
};
const nm = (TT) => (b / TT) * 1e9;
export default function () {
	// Wien from Planck by iteration
	let x = 5;
	const it = [];
	for (let i = 0; i < 8; i++) { x = 5 * (1 - Math.exp(-x)); it.push(x); }
	check('x1', it[0], 4.9663, 1e-4); check('x2', it[1], 4.9652, 1e-4); check('x3', it[2], 4.9651, 1e-4); check('x', x, 4.9651, 1e-5);
	check('b derived', (h * c) / (x * k), 2.898e-3, 0.0002); check('b CODATA', b, 2.898e-3, 0.0002);
	check('b with rounded', (6.626e-34 * 2.998e8) / (4.9651 * 1.381e-23), 2.898e-3, 0.0005);
	// Concept
	check('Draper', S.draperT, 798, 1e-9); check('CMB', S.cmbT, 2.725, 0.0002);
	check('Kirchhoff curves fig peaks', nm(5000), 580, 0.001); check('fig 4000', nm(4000), 724, 0.001);
	check('Sun vis', frac(5772, 400e-9, 750e-9), 0.42, 0.02); check('Sun UV', frac(5772, 1e-9, 400e-9), 0.12, 0.02); check('Sun IR', frac(5772, 750e-9, 1e-2), 0.44, 0.01);
	check('bulb vis', frac(2400, 400e-9, 750e-9), 0.04, 0.03);
	check('astro near petrova', frac(369.565, W.petrova * 0.995, W.petrova * 1.005), 0.0022, 0.03);
	check('fig petrova T', b / W.petrova, 111.5, 0.001);
	// WE1
	check('WE1 lam', nm(5772), 502, 0.001); check('WE1 E J', 4.965 * 1.381e-23 * 5772, 3.96e-19, 0.001); check('WE1 eV', (4.965 * k * 5772) / eV, 2.47, 0.002);
	// WE2
	check('WE2 earth', nm(288) / 1000, 10.1, 0.004); check('WE2 grace', nm(310) / 1000, 9.35, 0.001); check('WE2 twenty', nm(288) / nm(5772), 20, 0.003);
	// WE3
	check('WE3 K', 96.415 + 273.15, 369.565, 1e-9); check('WE3 a', nm(369.565) / 1000, 7.84, 0.001);
	check('WE3 b', b / W.petrova, 111.5, 0.001); check('WE3 C', b / W.petrova - 273.15, -161.6, 0.001); check('WE3 three', 25.984 / 7.84, 3.31, 0.002);
	// WE4
	check('WE4 sirius', nm(S.sirius.T), 294, 0.002); check('WE4 proxima', nm(S.proxima.T), 969, 0.001);
	check('WE4 proxima vis', frac(S.proxima.T, 400e-9, 750e-9), 0.11, 0.03);
	// WE5
	check('WE5 lam', (b / S.cmbT) * 1e3, 1.06, 0.004); check('WE5 J', 4.965 * 1.381e-23 * 2.725, 1.87e-22, 0.002);
	check('WE5 eV', (4.965 * 1.381e-23 * 2.725) / eV, 1.17e-3, 0.004); check('WE5 2000', 2.3 / 1.17e-3, 2000, 0.02);
	// Problems
	check('P3', nm(798) / 1000, 3.63, 0.001);
	check('P4', b / 400e-9, 7240, 0.001);
	check('P5', nm(2400) / 1000, 1.21, 0.003);
	check('P6', nm(S.tauCeti.T), 545, 0.001); check('P6 diff', nm(5320) - nm(5772), 43, 0.01);
	check('P8 J', 4.965 * 1.381e-23 * 288, 1.97e-20, 0.003); check('P8 eV', (4.965 * 1.381e-23 * 288) / eV, 0.123, 0.004);
	check('P9 diff', 369.565 - 111.5, 258, 0.001); check('P9 ratio', 369.565 / 111.5, 3.31, 0.002);
	let y = 3;
	const ys = [];
	for (let i = 0; i < 6; i++) { y = 5 * (1 - Math.exp(-y)); ys.push(y); }
	check('P10 x1', ys[0], 4.751, 1e-3); check('P10 x2', ys[1], 4.957, 1e-3); check('P10 x3', ys[2], 4.965, 1e-3);
	check('P11 hc/k', (h * c) / k, 0.014388, 1e-4); check('P11 K', (h * c) / k / 500e-9, 28776, 1e-4);
	check('P11 e1', Math.exp(28776 / 3000), 14650, 0.001); check('P11 e2', Math.exp(28776 / 6000) - 1, 120.0, 0.002);
	check('P11 ratio', B(500e-9, 6000) / B(500e-9, 3000), 122, 0.003); check('P11 peaks', B(b / 6000, 6000) / B(b / 3000, 3000), 32, 1e-6);
	return report('8.1 Blackbody radiation and Wien’s law');
}
