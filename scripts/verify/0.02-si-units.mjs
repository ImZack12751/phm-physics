import { check, report } from './lib.mjs';
import { C } from './constants.mjs';

export default function () {
	check('1 Gm / Earth–Moon', 1e9 / C.moonDistance, 2.6, 0.01);
	check('Earth radius Mm', C.earthRadius / 1e6, 6.37);
	check('light in 1 ns (m)', C.c * 1e-9, 0.2998, 1e-3);
	check('proton fm', (2 * C.protonRadius) / 1e-15, 1.7, 0.02);
	check('350 nm', 350e-9, 3.5e-7);
	check('WE1 m', 10e-6, 1e-5);
	check('WE1 mm', 10e-6 / 1e-3, 0.01);
	check('WE1 nm', 10e-6 / 1e-9, 1e4);
	check('WE2 Pm', 1.13e17 / 1e15, 113);
	check('WE3 tonnes', 2.0e6 / 1e3, 2000);
	check('WE3 grams', 2.0e6 * 1e3, 2.0e9);
	check('WE5 µm³', 5.2e-16 / 1e-18, 520);
	check('P1b', 250e-3, 0.25);
	check('P1d', 47e6, 4.7e7);
	check('P2d fg', 6.0e-14 / 1e-15, 60);
	check('P4a', 1e6 / 1e-3, 1e9);
	check('P5b', 2.5 * 1e-4, 2.5e-4);
	check('P6c', 500e-6, 5e-4);
	check('P7a', 3e8 * 1e-6, 300);
	check('P7b', 3e8 * 1e-3, 3e5);
	check('P8', 0.08e-3 / 10e-6, 8);
	check('Earth area', 4 * Math.PI * C.earthRadius ** 2, 5.1e14, 0.01);
	check('P9', 5.1e14 / 1e6, 5.1e8);
	check('P10', 1e-3 / 1e-6, 1e3);
	check('P11a', C.csFrequency * 1e-3, 9.19e6, 1e-3);
	check('P11b', 2.366 * C.csFrequency, 2.175e10, 1e-3);
	check('P12a', 20e-9 * 80e-9, 1.6e-15);
	check('P12b', 1e-4 / 1.6e-15, 6.25e10);
	return report('0.2 SI units and prefixes');
}
