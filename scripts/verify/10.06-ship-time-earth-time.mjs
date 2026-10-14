import { check, report } from './lib.mjs';
import { BOOK, ENERGY as EN, C } from './constants.mjs';
const c = C.c, yr = C.julianYear, ly = C.lightYear;
const flip = (D, ag) => {
	const a = ag * C.gStandard, ca = c / a / yr, ph = Math.acosh(1 + D / (2 * ca));
	return { a, ca, ph, tau: 2 * ph * ca, t: 2 * ca * Math.sinh(ph), v: Math.tanh(ph), g: Math.cosh(ph), R: Math.exp(2 * ph) };
};
export default function () {
	const D = C.tauCetiLy, T = flip(D, BOOK.shipAccelG), ca = T.ca;
	// Concept
	check('c/a s', c / T.a, 2.04e7, 0.002); check('c/a yr', ca, 0.646, 0.001);
	check('tau', T.tau, 3.89, 0.002); check('t', T.t, 13.14, 0.001); check('v', T.v, 0.9952, 0.0001); check('g', T.g, 10.2, 0.003);
	check('within 4%', T.tau / BOOK.shipTimeYears - 1, 0.04, 0.05); check('R', T.R, 416, 0.001);
	check('41500 t', 1e5 * (T.R - 1) / 1000, 41500, 0.001); check('novel 2000 t', EN.totalFuel / 1000, 2000, 1e-9);
	const Rn = (EN.shipDry + EN.totalFuel) / EN.shipDry, phb = Math.log(Math.sqrt(Rn));
	check('novel R', Rn, 21, 1e-9); check('coast v', Math.tanh(phb), 10 / 11, 1e-12);
	// coast plan
	const xb = ca * (Math.cosh(phb) - 1), xc = D - 2 * xb, vc = Math.tanh(phb), tc = xc / vc;
	const tauC = 2 * phb * ca + tc / Math.cosh(phb), tC = 2 * ca * Math.sinh(phb) + tc;
	check('coast tau', tauC, 6.6, 0.001); check('coast t', tC, 13.93, 0.001);
	check('newton 5.55', (2 * Math.sqrt((D * ly) / T.a)) / yr, 5.55, 0.001); check('newton peak', Math.sqrt(T.a * D * ly) / c, 4.29, 0.002);
	// WE1
	const p1 = 1 / ca;
	check('WE1 phi', p1, 1.548, 0.0005); check('WE1 v', Math.tanh(p1), 0.914, 0.001); check('WE1 sinh', Math.sinh(p1), 2.246, 0.0005);
	check('WE1 t', ca * Math.sinh(p1), 1.45, 0.001); check('WE1 cosh-1', Math.cosh(p1) - 1, 1.459, 0.0005); check('WE1 x', ca * (Math.cosh(p1) - 1), 0.942, 0.001);
	check('WE1 newton x', 0.5 * p1 * p1 * ca, 0.774, 0.001);
	// WE2
	check('WE2 cosh', 1 + D / (2 * ca), 10.22, 0.0005); check('WE2 phi', T.ph, 3.015, 0.0002); check('WE2 sinh', Math.sinh(T.ph), 10.17, 0.001);
	check('WE2 tau', 2 * 0.6458 * 3.015, 3.89, 0.002); check('WE2 t', 2 * 0.6458 * 10.17, 13.14, 0.001);
	// WE3
	check('WE3 exp', 2 * T.ph, 6.031, 0.0005); check('WE3 R', Math.exp(6.031), 416, 0.001); check('WE3 fuel', 1e5 * 415, 4.15e7, 1e-9);
	check('WE3 twenty', 416 / 21, 20, 0.01);
	// WE4
	check('WE4 phib', phb, 1.522, 0.0005); check('WE4 v', vc, 0.909, 0.0005); check('WE4 g', Math.cosh(phb), 2.4, 0.001);
	check('WE4 xb', xb, 0.904, 0.001); check('WE4 coast', xc, 10.1, 0.002);
	check('WE4 tau parts', 2 * 0.6458 * 1.522, 1.966, 0.001); check('WE4 coast tau', 10.1 / 0.909 / 2.4, 4.63, 0.002);
	check('WE4 t parts', 2 * 0.6458 * Math.sinh(1.522), 2.819, 0.001); check('WE4 coast t', 10.1 / 0.909, 11.11, 0.001);
	// WE5
	const E = flip(10.08, 1.5);
	check('WE5 cosh', 1 + 10.08 / (2 * 0.6458), 8.8, 0.002); check('WE5 phi', E.ph, 2.865, 0.0005); check('WE5 tau', E.tau, 3.7, 0.002); check('WE5 t', E.t, 11.29, 0.001);
	check('WE5 d1', T.t - T.tau, 9.25, 0.001); check('WE5 d2', E.t - E.tau, 7.59, 0.002); check('WE5 total', T.t - T.tau + E.t - E.tau, 16.8, 0.003);
	check('WE5 71-54', 71 - 54, 17, 1e-9);
	// WE6
	const vN = Math.sqrt(T.a * 10.08 * ly) / c;
	check('WE6 vN', vN, 3.95, 0.002); check('WE6 RN', Math.exp(2 * vN), 2700, 0.01); check('WE6 R', E.R, 308, 0.003); check('WE6 nine', Math.exp(2 * vN) / E.R, 8.8, 0.01);
	// Problems
	const c1 = c / C.gStandard;
	check('P1 s', c1, 3.06e7, 0.002); check('P1 yr', c1 / yr, 0.969, 0.0005);
	check('P4', Math.tanh(1 / 0.969), 0.775, 0.001);
	const p5 = 0.5 / ca;
	check('P5 phi', p5, 0.7742, 0.0002); check('P5 v', Math.tanh(p5), 0.649, 0.001); check('P5 t', ca * Math.sinh(p5), 0.552, 0.001); check('P5 x', ca * (Math.cosh(p5) - 1), 0.203, 0.003);
	const p6 = 0.05 / ca;
	check('P6 rel', ca * (Math.cosh(p6) - 1), 0.001936, 0.001); check('P6 newton', 0.5 * p6 * p6 * ca, 0.001935, 0.001);
	let lo = 0.5, hi = 5;
	for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; flip(D, m).tau > 3.75 ? (lo = m) : (hi = m); }
	check('P7 a', lo, 1.58, 0.003); check('P7 t', flip(D, lo).t, 13.08, 0.001); check('P7 v', flip(D, lo).v, 0.9957, 0.0001);
	check('P9', D / T.g, 1.17, 0.005);
	const K = flip(1000, 1);
	check('P10 cosh', 1 + 1000 / (2 * 0.969), 517, 0.001); check('P10 phi', K.ph, 6.94, 0.001); check('P10 tau', K.tau, 13.4, 0.004); check('P10 t', K.t, 1002, 0.001); check('P10 R', K.R, 1.07e6, 0.003);
	check('P11', 2.0e6 / 415, 4.8e3, 0.005);
	check('P12', T.tau / ca, 6.031, 0.0005);
	return report('10.6 Ship time vs Earth time');
}
