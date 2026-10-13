import { check, report } from './lib.mjs';
import { GRAV, ADRIAN } from './constants.mjs';
const P = Math.PI, GE = GRAV.earthGM, GS = 1.32712e20, AU = 1.496e11;
const visviva = (gm, r, a) => Math.sqrt(gm * (2 / r - 1 / a));
function hoh(gm, r1, r2) {
	const v1 = Math.sqrt(gm / r1), v2 = Math.sqrt(gm / r2), a = (r1 + r2) / 2;
	return { v1, v2, a, d1: visviva(gm, r1, a) - v1, d2: v2 - visviva(gm, r2, a), t: P * Math.sqrt(a ** 3 / gm) };
}
export default function () {
	const h1 = hoh(GE, 6.771e6, 4.2164e7);
	check('WE1 v1', h1.v1 / 1000, 7.673, 0.0002); check('WE1 v2', h1.v2 / 1000, 3.075, 0.0003); check('WE1 a', h1.a / 1000, 24468, 0.0001);
	check('WE1 f1', Math.sqrt((2 * 42164) / 48935) - 1, 0.3127, 0.0005); check('WE1 d1', h1.d1 / 1000, 2.4, 0.002);
	check('WE1 f2', 1 - Math.sqrt((2 * 6771) / 48935), 0.4739, 0.0005); check('WE1 d2', h1.d2 / 1000, 1.46, 0.003);
	check('WE1 total', (h1.d1 + h1.d2) / 1000, 3.86, 0.002); check('WE1 t', h1.t, 19040, 0.001); check('WE1 h', h1.t / 3600, 5.29, 0.002);
	check('WE1 vis-viva form', h1.v1 * (Math.sqrt((2 * 4.2164e7) / (6.771e6 + 4.2164e7)) - 1), h1.d1, 1e-9);
	const at = (AU + 0.7233 * AU) / 2;
	check('WE2 a au', at / AU, 0.8617, 0.0002); check('WE2 a', at, 1.289e11, 0.0005); check('WE2 Venus r', GRAV.venusSemiMajor, 1.082e11, 0.0005);
	const vd = visviva(GS, AU, at), va = visviva(GS, GRAV.venusSemiMajor, at);
	check('WE2 vdep', vd / 1000, 27.29, 0.0005); check('WE2 d1', vd / 1000 - 29.78, -2.5, 0.004); check('WE2 varr', va / 1000, 37.73, 0.0005);
	check('WE2 d2', 35.02 - va / 1000, -2.71, 0.004);
	const hm = hoh(GS, AU, 1.5238 * AU);
	check('WE3 t', hm.t / 86400, 258.9, 0.0005); check('WE3 angle', (360 * 258.9) / GRAV.marsPeriod, 135.7, 0.0005); check('WE3 lead', 180 - 135.7, 44.3, 0.001);
	check('WE3 d1', hm.d1 / 1000, 2.95, 0.002); check('WE3 d2', hm.d2 / 1000, 2.65, 0.002);
	const GA = GRAV.G * ADRIAN.mass, r1 = ADRIAN.parkR, r2 = r1 - 1e5, ha = hoh(GA, r1, r2);
	check('WE4 r2', r2 / 1000, 9757, 0.0001); check('WE4 v1', ha.v1, 12607, 0.0001); check('WE4 a', ha.a / 1000, 9807, 0.0001);
	check('WE4 d1', ha.d1, -32.2, 0.003); check('WE4 d2', ha.d2, -32.3, 0.003); check('WE4 t', ha.t, 2440, 0.002); check('WE4 min', ha.t / 60, 40.6, 0.002);
	const T0 = 2 * P * Math.sqrt(r1 ** 3 / GA), Tp = T0 * (1 - 10 / (3 * 360)), ap = Math.cbrt((GA * Tp * Tp) / (4 * P * P));
	check('WE5 T0', T0 / 60, 81.87, 0.0002); check('WE5 Tp', Tp / 60, 81.12, 0.0002); check('WE5 Tp s', Tp, 4867, 0.0002);
	check('WE5 ap', ap / 1000, 9796, 0.0001); check('WE5 low r', 2 * 9796 - 9857, 9735); check('WE5 low h', (2 * ap - r1 - ADRIAN.radius) / 1000, 178, 0.003);
	const vhi = visviva(GA, r1, ap);
	check('WE5 v', vhi, 12568, 0.0001); check('WE5 Δv', vhi - Math.sqrt(GA / r1), -39, 0.01); check('WE5 total', 2 * (Math.sqrt(GA / r1) - vhi), 79, 0.01);
	check('WE5 3 laps min', (3 * Tp) / 3600, 4.05, 0.003);
	const one = T0 * (1 - 10 / 360), apOne = Math.cbrt((GA * one * one) / (4 * P * P));
	check('WE5 one lap below clouds', 2 * apOne - r1 < ADRIAN.radius ? 1 : 0, 1);
	check('P5', Math.sqrt(GE / 6.771e6) / 1000, 7.67, 0.001);
	const a6 = 17.8 * AU, vp6 = visviva(GS, 0.6 * AU, a6), va6 = visviva(GS, 35 * AU, a6);
	check('P6 vp', vp6 / 1000, 53.9, 0.002); check('P6 va', va6 / 1000, 0.924, 0.002); check('P6 ratio', vp6 / va6, 58.3, 0.001); check('P6 35/0.6', 35 / 0.6, 58.3, 0.001);
	const h7 = hoh(GE, 6.771e6, 3.844e8);
	check('P7 a', h7.a / 1000, 195586, 0.0001); check('P7 t', h7.t, 4.3e5, 0.002); check('P7 d', h7.t / 86400, 5.0, 0.005); check('P7 d1', h7.d1 / 1000, 3.08, 0.002);
	check('P8', 37.73 - 35.02, 2.71, 0.001);
	check('P9 angle', (360 * 258.9) / 686.98, 135.7, 0.0005); check('P9 lead', 180 - (360 * 258.9) / 686.98, 44.3, 0.001);
	check('P11', Math.SQRT2 - 1, 0.414, 0.001);
	check('P12', Math.sqrt(GE / 6.77e6) - Math.sqrt(GE / 6.771e6), 0.57, 0.01);
	check('sim Venus lead negative', 180 * (1 - ((1 + 0.7233) / (2 * 0.7233)) ** 1.5) < 0 ? 1 : 0, 1);
	return report('4.6 Orbital manoeuvring');
}
