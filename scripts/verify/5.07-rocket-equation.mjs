import { check, report } from './lib.mjs';
import { C, ENERGY, BOOK, GRAV, ADRIAN } from './constants.mjs';
export default function () {
	const c = C.c, a = ENERGY.aShip, ca = c / a, yr = C.julianYear;
	// figure: mass-ratio marks
	[[1, 2.7, 0.63], [2, 7.4, 0.86], [3, 20, 0.95], [5, 148, 0.993]].forEach(([x, R, f]) => {
		check(`fig R ${x}`, Math.exp(x), R, 0.02); check(`fig f ${x}`, 1 - Math.exp(-x), f, 0.01);
	});
	check('c/a', ca, 2.038e7, 0.001); check('c/a yr', ca / yr, 0.65, 0.01);
	check('1.1 → 0.1c', Math.log(1.1), 0.095, 0.01);
	// fuel curve figure
	const m0 = ENERGY.massAtDisplay, dry = m0 - ENERGY.displayFuel;
	check('fig lin', ENERGY.displayFuel / ENERGY.displayRate / 86400, 40.0, 0.002); check('fig exp', (ca * Math.log(m0 / dry)) / 86400, 43.8, 0.002);
	check('WE1 R', Math.exp(7.67 / 4.436), 5.64, 0.002); check('WE1 x', 7.67 / 4.436, 1.73, 0.002); check('WE1 f', 1 - Math.exp(-7.67 / 4.436), 0.82, 0.005);
	const lnDS = Math.log(ENERGY.ds1Launch / (ENERGY.ds1Launch - ENERGY.ds1Xenon));
	check('WE2 mf', ENERGY.ds1Launch - ENERGY.ds1Xenon, 412.6); check('WE2 ln', lnDS, 0.164, 0.003); check('WE2 ve', ENERGY.ds1Dv / lnDS, 26e3, 0.015);
	check('WE2 chem', ENERGY.ds1Launch * (1 - Math.exp(-4.3 / 4.436)), 300, 0.01);
	const ln3 = Math.log(120000 / (120000 - ENERGY.manoeuvreFuel));
	check('WE3 ln', ln3, 1.084e-3, 0.001); check('WE3 dv', c * ln3, 325e3, 0.002);
	check('WE3 vs esc', (c * ln3) / Math.sqrt((2 * GRAV.G * ADRIAN.mass) / ADRIAN.radius), 18, 0.01); check('WE3 0.1%', 130 / 120000, 0.001, 0.09);
	check('WE4 m0', m0, 123160, 0.0001); check('WE4 mf', dry, 102300, 0.0001); check('WE4 ln', Math.log(m0 / dry), 0.1856, 0.001);
	check('WE4 t', ca * Math.log(m0 / dry), 3.78e6, 0.002); check('WE4 extra days', (ca * Math.log(m0 / dry) - ENERGY.displayFuel / ENERGY.displayRate) / 86400, 4, 0.1);
	const R5 = (ENERGY.totalFuel + ENERGY.shipDry) / ENERGY.shipDry;
	check('WE5 R', R5, 21); check('WE5 dv/c', Math.log(R5), 3.04, 0.002); check('WE5 t', ca * Math.log(R5), 6.2e7, 0.002); check('WE5 yr', (ca * Math.log(R5)) / yr, 1.97, 0.003);
	const t375 = BOOK.shipTimeYears * yr;
	check('WE5 t375', t375, 1.183e8, 0.001); check('WE5 exp', t375 / ca, 5.81, 0.002); check('WE5 R375', Math.exp(t375 / ca), 333, 0.003);
	check('WE5 fuel', ENERGY.shipDry * (Math.exp(t375 / ca) - 1), 3.3e7, 0.01); check('WE5 x17', (ENERGY.shipDry * (Math.exp(t375 / ca) - 1)) / ENERGY.totalFuel, 17, 0.03);
	check('WE5 3yr exp', (3 * yr) / ca, 4.65, 0.002); check('WE5 R3', Math.exp((3 * yr) / ca), 104, 0.003); check('WE5 R3 x5', (ENERGY.shipDry * (Math.exp((3 * yr) / ca) - 1)) / ENERGY.totalFuel, 5, 0.04);
	check('sim prop', 119.87 * (Math.exp(325e3 / c) - 1), 0.13, 0.01);
	check('P2 R', Math.exp(2), 7.39, 0.001); check('P2 f', 1 - Math.exp(-2), 0.865, 0.001);
	check('P4 x', 9 / 4.436, 2.029, 0.001); check('P4 R', Math.exp(9 / 4.436), 7.61, 0.001); check('P4 f', 1 - Math.exp(-9 / 4.436), 0.869, 0.001);
	check('P5 R', Math.exp(0.3), 1.35, 0.001); check('P5 f', 1 - Math.exp(-0.3), 0.26, 0.004);
	check('P6 x', 1e6 / 2.998e8, 0.003336, 0.0005); check('P6 fuel', 1e5 * (Math.exp(1e6 / c) - 1), 334, 0.002);
	check('P7 single', 3 * Math.log(10), 6.91, 0.001); check('P7 s1', 3 * Math.log(2.5), 2.75, 0.001); check('P7 s2', 3 * Math.log(8.5), 6.42, 0.001);
	check('P7 total', 3 * Math.log(2.5) + 3 * Math.log(8.5), 9.17, 0.001); check('P7 gain', 9.17 - 6.91, 2.3, 0.02);
	check('P8 x', (14.71 * 604800) / 2.998e8, 0.02968, 0.0005); check('P8 fuel', 1e5 * (Math.exp(0.02968) - 1), 3010, 0.002);
	check('P10 x', (14.71 * 2.592e6) / 2.998e8, 0.127, 0.002); check('P10 rate', 6.043 * Math.exp(-0.127), 5.32, 0.002);
	return report('5.7 The Tsiolkovsky rocket equation');
}
