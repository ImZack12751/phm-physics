import { check, report } from './lib.mjs';
import { GRAV, ADRIAN, C } from './constants.mjs';
const d = (x) => (x * Math.PI) / 180;
export default function () {
	const GM = GRAV.G * ADRIAN.mass, R = ADRIAN.radius, r1 = ADRIAN.parkR, r2 = r1 - 100e3;
	check('fig ledger', 0.5 * 20 * 2 ** 2, 40);
	const h1 = 1.12 * (1 - Math.cos(d(20)));
	check('WE1 cos', Math.cos(d(20)), 0.9397, 0.0001); check('WE1 h', h1, 0.0675, 0.002); check('WE1 v', Math.sqrt(2 * 14.71 * h1), 1.41, 0.002);
	check('WE2 K', 40, 40); check('WE2 d', 40 / 60, 0.67, 0.01);
	check('WE3 E/m', -GM / (2 * r1), -7.95e7, 0.002); check('WE3 E', (-GM / (2 * r1)) * 1.2e5, -9.5e12, 0.005);
	check('WE4 dE', (-GM / 2) * (1 / r2 - 1 / r1), -8.1e5, 0.01);
	check('WE4 v1', Math.sqrt(GM / r1), 12.61e3, 0.001); check('WE4 v2', Math.sqrt(GM / r2), 12.67e3, 0.001);
	check('WE4 dv', Math.sqrt(GM / r2) - Math.sqrt(GM / r1), 64, 0.01);
	const GMs = 1.327e20;
	check('WE5 K', 0.5 * 2.729e4 ** 2, 3.724e8, 0.0005); check('WE5 U', GMs / 1.496e11, 8.87e8, 0.0005);
	check('WE5 E', 0.5 * 2.729e4 ** 2 - GMs / 1.496e11, -5.147e8, 0.001); check('WE5 -GM/2a', -GMs / (2 * 1.289e11), -5.147e8, 0.001);
	check('RvB billion', C.c ** 2 / (GM / (2 * r1)), 1e9, 0.15);
	check('P2', Math.sqrt(2 * 9.81 * 5), 9.9, 0.001); check('P4', Math.sqrt(2 * 14.71 * 0.3), 2.97, 0.001);
	check('P5 K', 0.5 * 15 * 2.5 ** 2, 46.9, 0.001); check('P5 f', (0.5 * 15 * 2.5 ** 2) / 3, 15.6, 0.002);
	check('P6', (-GM / (2 * r1)) * 1000, -7.95e10, 0.002);
	check('P9 v', Math.sqrt((2 * GM) / R), 18.1e3, 0.002); check('P9 E', GM / R, 1.64e8, 0.002); check('P9 TNT', GM / R / 4.184e6, 39, 0.01);
	const GMe = GRAV.earthGM, a = 6.771e6, b = 6.77e6, dE = (-GMe / 2) * (1 / b - 1 / a);
	check('P10 dE', dE, -4350, 0.002); check('P10 dU', 2 * dE, -8700, 0.002); check('P10 dv', Math.sqrt(GMe / b) - Math.sqrt(GMe / a), 0.57, 0.01);
	return report('5.4 Conservation laws');
}
