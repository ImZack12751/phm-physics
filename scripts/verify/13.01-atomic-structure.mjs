import { check, report } from './lib.mjs';
import { C, THERMAL as T, PARTICLES as P } from './constants.mjs';
export default function () {
	const { e, me, mp, mn, eps0, u, G } = P;
	const k = 1 / (4 * Math.PI * eps0), hbar = C.h / (2 * Math.PI), eV = e;
	const a0 = hbar ** 2 / (me * k * e * e), E1 = (k * e * e) / (2 * a0) / eV, v1 = hbar / (me * a0);
	// Concept
	check('e', e, 1.602e-19, 0.001); check('me', me, 9.109e-31, 0.0005);
	check('mp', mp, 1.673e-27, 0.0005); check('mn', mn, 1.675e-27, 0.0005);
	check('me u', me / u, 0.000549, 0.002); check('mp u', mp / u, 1.00728, 1e-5); check('mn u', mn / u, 1.00866, 1e-5);
	check('mp/me', mp / me, 1836, 0.001);
	check('R Xe132', P.r0 * 132 ** (1 / 3) * 1e15, 6.1, 0.005);
	check('nuc density', mp / ((4 / 3) * Math.PI * P.r0 ** 3), 2.3e17, 0.01);
	check('k', k, 8.988e9, 0.0005); check('eps0', eps0, 8.854e-12, 0.0005);
	check('ratio', (k * e * e) / (G * mp * me), 2.3e39, 0.015);
	check('ke2 MeV fm', (k * e * e) / (1e6 * eV) / 1e-15, 1.44, 0.001);
	check('a0', a0, 5.29e-11, 0.001); check('a0 CODATA', C.bohrRadius, 5.29e-11, 0.001); check('E1', E1, 13.6, 0.001);
	check('He', P.ion.He, 24.6, 0.002); check('Xe', P.ion.Xe, 12.1, 0.003); check('Xe half He', P.ion.Xe / P.ion.He, 0.5, 0.02);
	check('Xe < O', P.ion.Xe < P.ion.O ? 1 : 0, 1, 1e-9);
	check('O2 kJ', 1175 / 96.485, 12.18, 0.001); check('Xe kJ', 1170.4 / 96.485, P.ion.Xe, 0.001);
	// Formulas
	check('hbar', hbar, 1.055e-34, 0.001); check('ke2 eV nm', (k * e * e) / eV / 1e-9, 1.44, 0.001);
	check('step5', 1.44 / (2 * 0.0529), 13.6, 0.001);
	// WE1
	check('WE1 ratio', 5.29e-11 / (C.protonRadius), 6.3e4, 0.005); check('WE1 vol', (1 / 6.29e4) ** 3, 4.0e-15, 0.005);
	check('WE1 marble', 0.01 * 6.29e4, 630, 0.002); check('WE1 empty', 1 - 4.0e-15, 0.999999999999996, 1e-15);
	check('WE1 tsp', 2.31e17 * 5e-6, 1.2e12, 0.04);
	// WE2
	check('WE2 F', (k * e * e) / 5.29e-11 ** 2, 8.24e-8, 0.002); check('WE2 a', 8.24e-8 / me, 9.0e22, 0.01);
	check('WE2 g', 9.04e22 / 9.81, 1e22, 0.1);
	// WE3
	check('WE3 v', v1, 2.19e6, 0.002); check('WE3 v/c', v1 / C.c, 0.0073, 0.003);
	check('WE3 circ', 2 * Math.PI * a0, 3.32e-10, 0.003); check('WE3 f', v1 / (2 * Math.PI * a0), 6.6e15, 0.005);
	check('WE3 lambda', 1240 / 13.6, 91.2, 0.001);
	// WE4
	check('WE4 mol', P.xeGasDensity / 131.29, 0.04489, 0.0005); check('WE4 N', 0.04489 * T.NA, 2.7e22, 0.002);
	check('WE4 Ne', 54 * 2.7e22, 1.46e24, 0.002); check('WE4 Q', 1.46e24 * e, 2.3e5, 0.02);
	// WE5
	check('WE5 eV mol', e * T.NA / 1000, 96.49, 0.0005); check('WE5 O', 1175 / 96.49, 12.18, 0.001);
	check('WE5 Xe', 12.13 * 96.49, 1170, 0.001); check('WE5 He', 24.59 * 96.49, 2373, 0.0005);
	check('WE5 lXe', 1240 / 12.13, 102, 0.003); check('WE5 lHe', 1240 / 24.59, 50.4, 0.001);
	// Problems
	check('P1', 132 - 54, 78, 1e-9);
	check('P2', (k * e * e) / 1e-30, 231, 0.002);
	check('P3 Au', 1.2 * 197 ** (1 / 3), 7.0, 0.003); check('P3 cube', 197 ** (1 / 3), 5.82, 0.001); check('P3 He', 1.2 * 4 ** (1 / 3), 1.9, 0.005);
	check('P4 r', 9 * 5.29e-11, 4.76e-10, 0.001); check('P4 E', 13.6 / 9, 1.51, 0.001);
	check('P5 E', 13.606 * (1 / 4 - 1 / 9), 1.89, 0.001); check('P5 frac', 1 / 4 - 1 / 9, 0.1389, 0.0005); check('P5 l', 1240 / 1.89, 656, 0.001);
	check('P6 d', (2 * 79 * 1.44) / 5, 45.5, 0.001); check('P6 ratio', 45.5 / 7.0, 6.5, 0.001);
	check('P7', 2.19e6 / 2, 1.09e6, 0.005);
	check('P8', (54 * me) / (131.29 * u), 2.26e-4, 0.002);
	check('P9', 13.6 / 0.0477, 285, 0.002);
	check('P10 r', 5.29e-11 * 2.27e39, 1.2e29, 0.001); check('P10 ratio', 1.2e29 / 4.4e26, 270, 0.02);
	check('P11 V', 5.97e24 / 2.31e17, 2.58e7, 0.002); check('P11 r', ((3 * 2.584e7) / (4 * Math.PI)) ** (1 / 3), 183, 0.003);
	check('P11 inner', (3 * 2.58e7) / (4 * Math.PI), 6.16e6, 0.002);
	check('P12 E', 2.7e22 * 12.13 * e, 5.25e4, 0.001); check('P12 x', 5.25e4 / 4186, 12, 0.05);
	check('P12 kT', 12.13 / ((T.k * 293) / e), 500, 0.05);
	return report('13.1 Atomic structure');
}
