import { check, report } from './lib.mjs';
import { C, GRAV, ADRIAN, ENERGY } from './constants.mjs';
const d = (x) => (x * Math.PI) / 180;
export default function () {
	const gs = 1.5 * C.gStandard;
	check('g 1.5', gs, 14.71, 0.0005);
	check('WE1', 80 * 14.71 * 3, 3530, 0.001); check('WE1 Earth', 80 * 9.81 * 3, 2354, 0.001); check('WE1 ratio', 3530 / 2354, 1.5, 0.002);
	check('WE2', 150 * 4 * Math.cos(d(35)), 491, 0.002); check('WE2 cos', Math.cos(d(35)), 0.8192, 0.0001); check('WE2 lift', 150 * Math.sin(d(35)), 86, 0.005);
	check('WE3 1', 0.5 * 600 * 0.1 ** 2, 3.0); check('WE3 2', 0.5 * 600 * (0.04 - 0.01), 9.0);
	const GM = GRAV.G * ADRIAN.mass;
	check('GM Adrian', GM, 1.567e15, 0.001);
	check('WE4 W', GM * 1000 * (1 / ADRIAN.radius - 1 / ADRIAN.parkR), 4.99e9, 0.002);
	check('WE4 g', GM / ADRIAN.radius ** 2, 17.15, 0.001);
	check('WE4 mgh', 1000 * 17.15 * 3e5, 5.15e9, 0.002);
	check('WE4 3%', (1000 * (GM / ADRIAN.radius ** 2) * 3e5) / (GM * 1000 * (1 / ADRIAN.radius - 1 / ADRIAN.parkR)) - 1, 0.03, 0.06);
	const a5 = ENERGY.dimitriForce / 500;
	check('WE5 a', a5, 120); check('WE5 d', 0.5 * a5 * ENERGY.dimitriTime ** 2, 6.0e-7, 0.001); check('WE5 W', ENERGY.dimitriForce * 0.5 * a5 * ENERGY.dimitriTime ** 2, 0.036, 0.001);
	check('WE5 ratio', 0.036 / ENERGY.dimitriEnergy, 2e-11, 0.001);
	check('kcal', 3530 / 4184, 0.84, 0.01);
	check('P1', 200 * 5, 1000); check('P4', 12 * 14.71 * 1.2, 212, 0.002); check('P5', 80 * 10 * Math.cos(d(60)), 400, 0.0001);
	check('P6', 0.5 * 600 * (0.15 ** 2 - 0.05 ** 2), 6.0, 0.0001); check('P7', 0.5 * 2 * 400 + 3 * 400, 1600); check('P8', 10 * 2 ** 3, 80);
	check('P9', 0.5 * 2 * 9.81 * 50 ** 2, 24500, 0.002);
	check('P10 W', GRAV.earthGM / C.earthRadius, 6.26e7, 0.002); check('P10 KE', 0.5 * GRAV.earthEscape ** 2, 6.26e7, 0.002);
	return report('5.1 Work as an integral');
}
