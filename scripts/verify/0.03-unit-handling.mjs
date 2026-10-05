import { check, report } from './lib.mjs';
import { C, BOOK } from './constants.mjs';

const F = (c) => (9 / 5) * c + 32;
export default function () {
	check('WE1', (90 * 1000) / 3600, 25);
	check('WE2 km/h', 29.78 * 3600, 107208);
	check('WE2 mph', (29.78 * 3600) / 1.609344, 66616, 1e-4);
	check('WE3 year s', C.julianYear, 31557600);
	check('WE3 c in ly/yr', (C.c * C.julianYear) / C.lightYear, 1.0, 1e-9);
	check('WE3 with rounded ly', (2.99792458 * 3.15576) / 9.4607, 1.0, 1e-4);
	check('WE4 K', BOOK.astrophageTempC + 273.15, 369.565, 1e-9);
	check('WE4 F', F(BOOK.astrophageTempC), 205.547, 1e-6);
	check('abs zero F', F(-273.15), -459.67, 1e-9);
	check('P1a', 3.5 * 3600, 12600);
	check('P1b', 86400, 86400);
	check('P2a', 72 / 3.6, 20);
	check('P2b', 15 * 3.6, 54);
	check('P3c', 300 - 273.15, 26.85);
	check('P4', 3.0 * 0.5, 1.5);
	check('P5', ((3.15576 - Math.PI) / 3.15576) * 100, 0.449, 0.01);
	check('P6', (11.9 * C.lightYear) / C.au, 7.53e5, 0.002);
	check('P7 km/h', 343 * 3.6, 1234.8);
	check('P7 mph', (343 * 3.6) / 1.609344, 767.3, 1e-3);
	check('P9 C', (5 / 9) * (98.6 - 32), 37.0, 1e-3);
	check('P10', F(-40), -40);
	check('P11 kg/d', (BOOK.fuelBurnKgPerS * 86400), 518.4);
	check('P11 t/yr', (BOOK.fuelBurnKgPerS * C.julianYear) / 1000, 189.3, 1e-3);
	return report('0.3 Handling units');
}
