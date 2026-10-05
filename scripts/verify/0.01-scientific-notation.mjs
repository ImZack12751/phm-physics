import { check, report } from './lib.mjs';
import { C, BOOK } from './constants.mjs';

export default function () {
	// Concept / sim data
	check('light-year (m)', C.lightYear, 9.46e15);
	check('Tau Ceti distance (m)', C.tauCetiLy * C.lightYear, 1.13e17);
	check('Tau Ceti ly from parallax', (1000 / C.tauCetiParallaxMas) * 3.26156, 11.912, 1e-3);
	check('proton diameter', 2 * C.protonRadius, 1.7e-15, 0.02);
	check('H atom diameter', 2 * C.bohrRadius, 1.1e-10, 0.05);
	check('Earth diameter', 2 * C.earthRadius, 1.27e7);
	check('Sun diameter', 2 * C.sunRadius, 1.39e9);
	check('Astrophage diameter', BOOK.astrophageDiameter, 1.0e-5);
	// Worked examples
	check('WE2 11.9 × 9.46', 11.9 * 9.46, 112.574);
	check('WE2 distance', 11.9 * 9.46e15, 1.13e17);
	check('WE3 cells across Earth', 1.27e7 / 1.0e-5, 1.27e12);
	check('WE4 r^3', (5.0e-6) ** 3, 125e-18);
	check('WE4 volume', (4 / 3) * Math.PI * (5.0e-6) ** 3, 5.236e-16, 1e-3);
	check('WE5 Venus orbit', C.venusSemiMajor, 1.082e11, 1e-3);
	check('WE5 surface to Venus', 1.082e11 - 6.96e8, 1.07504e11, 1e-5);
	// Practice
	check('P5a', 6.0e3 * 5.0e-7, 3.0e-3);
	check('P5b', 8.4e-2 / 2.1e4, 4.0e-6);
	check('P5c', 1.5e6 / 6.0e-2, 2.5e7);
	check('P6a', 4.2e5 + 3.1e4, 4.51e5);
	check('P6b', 9.0e-3 - 5.0e-4, 8.5e-3);
	check('P7 seconds', 1.5e11 / 3.0e8, 500);
	check('P7 minutes', 500 / 60, 8.33);
	check('P7 real light time (s)', C.au / C.c, 499, 0.01);
	check('P8 cells to Venus', 1.075e11 / 1.0e-5, 1.075e16);
	check('P9a', Math.sqrt(4.0e-6), 2.0e-3);
	check('P9b', Math.sqrt(9.0e9), 9.49e4);
	check('P10 Earths to Tau Ceti', 1.13e17 / 1.27e7, 8.898e9, 1e-3);
	check('P11', (2.0e-3) ** 3 / (4.0e5) ** 2, 5.0e-20);
	check('P12 (i)', 1.13e17 / 1.0e-5, 1.13e22);
	check('P12 (ii)', 1.0e-5 / 1.7e-15, 5.88e9);
	check('P12 compare', 1.13e22 / 5.88e9, 1.92e12);
	return report('0.1 Scientific notation');
}
