import { check, report } from './lib.mjs';
import { GRAV } from './constants.mjs';
const AU = 149.598; // million km (NASA semimajor axis of Earth)
export default function () {
	check('WE1 rp', AU * (1 - GRAV.earthEcc), 147.1, 0.0005); check('WE1 ra', AU * (1 + GRAV.earthEcc), 152.1, 0.0005);
	check('WE1 vs NASA rp', GRAV.earthPerihelion / 1e9, 147.1, 0.0005); check('WE1 vs NASA ra', GRAV.earthAphelion / 1e9, 152.1, 0.0005);
	check('WE1 3%', (152.1 - 147.1) / 149.6, 0.033, 0.03); check('concept ±1.7%', GRAV.earthEcc, 0.017, 0.02);
	const a2 = GRAV.marsSemiMajor / 1e9 / AU;
	check('WE2 a', a2, 1.5238, 0.0002); check('WE2 T', a2 ** 1.5, 1.881, 0.0005); check('WE2 d', a2 ** 1.5 * GRAV.earthSiderealYear, 687, 0.001); check('WE2 NASA', GRAV.marsPeriod, 687, 0.001);
	check('WE3 ratio', 152.1 / 147.095, 1.034, 0.0005); check('WE3 NASA', 30.29 / 29.29, 1.034, 0.0005);
	const a4 = (1 + 0.7233) / 2;
	check('WE4 Venus au', GRAV.venusSemiMajor / 1e9 / AU, 0.7233, 0.0005); check('WE4 a', a4, 0.8617, 0.0002); check('WE4 T', a4 ** 1.5, 0.7998, 0.0005);
	check('WE4 t yr', a4 ** 1.5 / 2, 0.4, 0.002); check('WE4 days', (a4 ** 1.5 / 2) * GRAV.earthSiderealYear, 146, 0.003);
	check('WE5 a', (0.6 + 35) / 2, 17.8); check('WE5 e', (35 - 0.6) / 35.6, 0.966, 0.001); check('WE5 T', 17.8 ** 1.5, 75.1, 0.001);
	check('concept tau ceti 1 au', Math.sqrt(1 / 0.8), 1.12, 0.002); check('fig Neptune', 30 ** 1.5, 164, 0.003);
	check('sim 4^1.5', 4 ** 1.5, 8);
	check('P3', 4 ** 1.5, 8);
	const a5 = GRAV.jupiterSemiMajor / 1e9 / AU;
	check('P5 a', a5, 5.204, 0.0005); check('P5 T', a5 ** 1.5, 11.87, 0.001); check('P5 NASA', GRAV.jupiterPeriod / GRAV.earthSiderealYear, 11.86, 0.001);
	check('P6 rp', 227.956 * (1 - 0.0935), 206.6, 0.0005); check('P6 ra', 227.956 * (1 + 0.0935), 249.3, 0.0005);
	check('P7 a', (740.595 + 816.363) / 2, 778.48, 0.0001); check('P7 e', (816.363 - 740.595) / (816.363 + 740.595), 0.0487, 0.002);
	const a8 = (1 + 1.5238) / 2;
	check('P8 a', a8, 1.2619, 0.0001); check('P8 T', a8 ** 1.5, 1.4175, 0.0005); check('P8 half', a8 ** 1.5 / 2, 0.709, 0.001); check('P8 d', (a8 ** 1.5 / 2) * GRAV.earthSiderealYear, 259, 0.003);
	check('P9', 249.261 / 206.65, 1.206, 0.0005);
	check('P10', Math.log(11.862) / Math.log(5.2038), 1.4995, 0.0003);
	check('P11', 1.966 / 0.034, 58, 0.01);
	check('P12 inside', 1.334 ** 3 / 0.8, 2.967, 0.001); check('P12 T', Math.sqrt(1.334 ** 3 / 0.8), 1.723, 0.001); check('P12 d', Math.sqrt(1.334 ** 3 / 0.8) * 365.25, 629, 0.002);
	return report('4.3 Kepler’s laws');
}
