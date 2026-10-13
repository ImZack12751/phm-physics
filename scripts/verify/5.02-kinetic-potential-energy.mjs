import { check, report } from './lib.mjs';
import { C, GRAV, ADRIAN, ENERGY } from './constants.mjs';
export default function () {
	const GM = GRAV.G * ADRIAN.mass, R = ADRIAN.radius, r = ADRIAN.parkR;
	check('fig total', 14.71 * 2, 29.4, 0.001); check('fig half', 14.71, 14.7, 0.001);
	check('WE1 3', 0.5 * 80 * 9, 360); check('WE1 6', 0.5 * 80 * 36, 1440);
	check('WE2', Math.sqrt(2 * 14.71 * 2), 7.67, 0.001); check('WE2 Earth', Math.sqrt(2 * 9.81 * 2), 6.26, 0.001);
	check('WE3', Math.sqrt((2 * GM) / R), 18.1e3, 0.002);
	check('WE4 dU', GM * (1 / R - 1 / r), 4.99e6, 0.002); check('WE4 K', GM / (2 * r), 7.95e7, 0.002); check('WE4 v', Math.sqrt(GM / r), 12.61e3, 0.001);
	const tot = GM * (1 / R - 1 / r) + GM / (2 * r);
	check('WE4 tot', tot, 8.45e7, 0.002); check('WE4 94%', GM / (2 * r) / tot, 0.94, 0.005);
	check('WE5 K', 0.5 * ENERGY.shipDry * (0.1 * C.c) ** 2, 4.5e19, 0.002); check('WE5 fuel', ENERGY.totalFuel * C.c ** 2, 1.8e23, 0.002);
	check('WE5 ratio', (0.5 * ENERGY.shipDry * (0.1 * C.c) ** 2) / (ENERGY.totalFuel * C.c ** 2), 0.00025, 0.001);
	const gam = 1 / Math.sqrt(1 - 0.01);
	check('WE5 rel', (gam - 1) / 0.005 - 1, 0.008, 0.06);
	const Re = C.earthRadius, re = Re + GRAV.issAltitude, GMe = GRAV.earthGM;
	check('RvB Earth orbit', GMe * (1 / Re - 1 / re) + GMe / (2 * re), 33e6, 0.01);
	check('RvB escape ratio', GM / R / (GMe / Re), 2.6, 0.01);
	check('P1', 0.5 * 0.15 * 400, 30); check('P3', 12 * 14.71 * 1.2, 212, 0.002); check('P4', Math.sqrt(2 * 14.71 * 1.5), 6.64, 0.001);
	check('P5', Math.sqrt((2 * 3) / 0.5), 3.46, 0.002);
	const GMm = GRAV.G * GRAV.moonMass;
	check('P7 GM', GMm, 4.9e12, 0.002); check('P7 v', Math.sqrt((2 * GMm) / 1.737e6), 2.38e3, 0.002);
	check('P8 E', GM / (2 * r), 7.95e7, 0.002); check('P8 vesc', Math.sqrt((2 * GM) / r), 17.83e3, 0.001); check('P8 dv', Math.sqrt((2 * GM) / r) - Math.sqrt(GM / r), 5.22e3, 0.002);
	const rmax = 1 / (1 / Re - 5000 ** 2 / (2 * GMe));
	check('P9 rmax', rmax, 7.96e6, 0.001); check('P9 h', (rmax - Re) / 1000, 1590, 0.002); check('P9 const g', 5000 ** 2 / (2 * 9.82) / 1000, 1270, 0.003);
	check('P10 v', Math.sqrt(2 * GM * (1 / R - 1 / (R + 1e6))), 5.57e3, 0.002); check('P10 ratio', 84.5 / 33.1, 2.5, 0.03);
	return report('5.2 Kinetic and potential energy');
}
