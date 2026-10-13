import { check, report } from './lib.mjs';
import { THERMAL as T } from './constants.mjs';
// Toy model used in 6.6 (figure TwoClimates and sim SnowballLab): absorbed (S/4)(1 − α(T)) with
// α(T) = 0.4417 − 0.1583 tanh((T − 254.42)/20); emitted 240.2 + 1.58 (T − 288) W/m²; C = 4.19e8 J/(m² K).
const Q = 1361 / 4;
export const alpha = (t) => 0.4417 - 0.1583 * Math.tanh((t - 254.42) / 20);
const E = (t) => 240.2 + 1.58 * (t - 288);
const net = (t, f) => Q * f * (1 - alpha(t)) - E(t);
function roots(f) {
	const r = [];
	let p = net(150, f);
	for (let t = 150.25; t <= 340; t += 0.25) {
		const c = net(t, f);
		if (p * c <= 0) {
			let a = t - 0.25, b = t;
			for (let i = 0; i < 60; i++) { const m = (a + b) / 2; net(a, f) * net(m, f) <= 0 ? (b = m) : (a = m); }
			r.push((a + b) / 2);
		}
		p = c;
	}
	return r;
}
function run(f, years, t0 = 288) {
	let t = t0;
	const dt = 0.01 * 3.156e7;
	for (let y = 0; y < years - 1e-9; y += 0.01) t += (dt * net(t, f)) / 4.19e8;
	return t;
}
export default function () {
	const lam0 = 3.8, sum = 1.8 + T.albedoFeedback + 0.42;
	const f = sum / lam0;
	check('lambda0', 4 * T.sigma * 255.12 ** 3, 3.8, 0.01);
	check('WE1 f', f, 0.68, 0.006); check('WE1 sum', sum, 2.57); check('WE1 gain', 1 / (1 - f), 3.1, 0.005);
	check('WE1 dT0', 3.71 / 3.8, 0.98, 0.005); check('WE1 dT', 3.71 / (lam0 - sum), 3.0, 0.01); check('WE1 lam', 1 / (lam0 - sum), 0.81, 0.005);
	check('WE2 1', 2.4 * 0.8, 1.9, 0.011); check('WE2 5', 12.0 * 0.8, 9.6); check('WE2 10', 24.0 * 0.8, 19, 0.011);
	check('WE3', 4.19e8 * 0.8, 3.35e8, 0.001); check('WE3 yr', (4.19e8 * 0.8) / 3.156e7, 10.6, 0.003); check('WE3 x', 10.6 / 3.5, 3, 0.02);
	const r1 = roots(1);
	check('toy alpha288', alpha(288), 0.294, 0.002); check('toy warm', r1[2], 288, 0.001); check('toy snow', r1[0], 226, 0.002); check('toy unstable', r1[1], 252, 0.003);
	check('toy sens', 1 / -((net(288.01, 1) - net(287.99, 1)) / 0.02), 0.81, 0.005);
	check('WE4 10y', run(0.95, 10), 282, 0.001); check('WE4 30y', run(0.95, 30), 277.7, 0.0005); check('WE4 eq', roots(0.95).slice(-1)[0], 276, 0.002);
	check('WE4 cool', 288 - roots(0.95).slice(-1)[0], 12, 0.03);
	check('WE4 10% 30y', run(0.9, 30), 261, 0.002); check('WE4 10% 100y', run(0.9, 100), 215, 0.002); check('WE4 10% roots', roots(0.9).length, 1);
	let tip = 1;
	while (roots(tip).some((x) => x > 265)) tip -= 0.001;
	check('WE4 tip', 1 - tip, 0.06, 0.02);
	check('WE5 f', 0.7 ** 0.25, 0.9147, 1e-4); check('WE5 T', 255.1 * 0.7 ** 0.25, 233, 0.002); check('WE5 F', 0.3 * 240.2, 72, 0.002); check('WE5 diff', 255.1 - 255.1 * 0.7 ** 0.25, 22, 0.015);
	check('P2', 0.5 / 0.5, 1);
	check('P4 f', 1.8 / 3.8, 0.47, 0.01); check('P4 g', 1 / (1 - 1.8 / 3.8), 1.9, 0.001);
	check('P5', 1.875 / 2, 0.9375); check('P6 F', 6 / 0.8, 7.5); check('P6 pct', 7.5 / 2.4, 3.1, 0.01);
	check('P7 lo', 3.71 / (3.8 - 2.05), 2.1, 0.01); check('P7 hi', 3.71 / (3.8 - (1.8 + 0.35 + 0.94)), 5.2, 0.01);
	const g = (t) => 1.9 * (1 - Math.exp(-t / 10.6));
	check('P9 5', g(5), 0.71, 0.01); check('P9 x', 1 - Math.exp(-5 / 10.6), 0.376, 0.003); check('P9 20', g(20), 1.6, 0.01); check('P9 x20', 1 - Math.exp(-20 / 10.6), 0.849, 0.002);
	check('P10', 1 / 3.77, 0.27, 0.02);
	check('P11 E', E(226), 142, 0.003); check('P11 abs', Q * (1 - 0.58), 143, 0.002); check('P11 alpha', alpha(r1[0]), 0.58, 0.01);
	check('P12 n', 72 / 3.71, 19, 0.03); check('P12 2^19', 2 ** 19, 5e5, 0.05);
	return report('6.6 Feedback loops');
}
