import { check, report } from './lib.mjs';
import { WAVES as W, THERMAL as T, ENERGY as EN, C } from './constants.mjs';
const h = C.h, c = C.c, e = W.eV, k = T.k;
const eVnm = (h * c) / e * 1e9;
export default function () {
	const Ep = (h * c) / W.petrova, kT = 1.5 * k * (96.415 + 273.15);
	// Concept
	check('hc eV nm', eVnm, 1240, 0.001); check('vis red eV', eVnm / 750, 1.65, 0.003); check('vis violet eV', eVnm / 400, 3.1, 0.001);
	check('Petrova eV', Ep / e, 0.048, 0.006); check('Petrova J concept', Ep, 7.645e-21, 0.0005); check('Petrova eV 3sf', Ep / e, 0.0477, 0.001);
	check('kT', kT, 7.654e-21, 0.0005); check('0.1%', 1 - Ep / kT, 0.001, 0.15);
	check('laser >1e15', 1e-3 / ((h * c) / 650e-9), 3.27e15, 0.002);
	check('kg f concept', (c * c) / h, 1.36e50, 0.003);
	check('H 13.6', W.hydrogenIonization, 13.6, 1e-9);
	check('KATRIN', W.katrinLimit, 0.45, 1e-9);
	// Formulas
	check('h eVs', h / e, 4.136e-15, 0.0005); check('hc Jm', h * c, 1.986e-25, 0.0005);
	// WE1
	check('WE1 J', Ep, 7.645e-21, 0.0005); check('WE1 eV', Ep / e, 0.0477, 0.001); check('WE1 kT', kT, 7.654e-21, 0.0005);
	check('WE1 ratio', 7.645 / 7.654, 0.9989, 0.0002);
	// WE2
	check('WE2 green eV', 1240 / 540, 2.3, 0.002); check('WE2 green J', (h * c) / 540e-9, 3.68e-19, 0.002);
	check('WE2 FM J', h * 1e8, 6.63e-26, 0.001); check('WE2 FM eV', (h * 1e8) / e, 4.14e-7, 0.002);
	check('WE2 5 million', ((h * c) / 540e-9) / (h * 1e8), 5.55e6, 0.002);
	// WE3
	check('WE3 E', 1240 / 400, 3.1, 1e-9); check('WE3 K', 3.1 - W.phiNa, 0.64, 1e-9); check('WE3 cut', 1240 / W.phiNa, 504, 0.001);
	check('WE3 fifty', W.phiNa / (Ep / e), 51.6, 0.003);
	// WE4
	check('WE4', 5.4e14 / Ep, 7.06e34, 0.002); check('WE4 drive', EN.drivePowerBook, 5.4e14, 1e-9);
	check('WE4 48', ((h * c) / 540e-9) / Ep, 48, 0.003);
	// WE5
	check('WE5 E', (1.986e-25) / 650e-9, 3.06e-19, 0.002); check('WE5 N', 1e-3 / 3.06e-19, 3.27e15, 0.002);
	// Problems
	check('P1 J', h * W.microwaveOven, 1.62e-24, 0.003); check('P1 eV', (h * W.microwaveOven) / e, 1.01e-5, 0.004);
	check('P2 red', eVnm / 700, 1.8, 0.02);
	check('P3', 2 * e, 3.2e-19, 0.002);
	check('P4', 1240 / 1.0, 1240, 1e-9);
	check('P5', 1361 / (2 * e), 4.25e21, 0.002);
	check('P6 cut', 1240 / W.phiAg, 262, 0.002); check('P6 E', 1240 / 200, 6.2, 1e-9); check('P6 K', 6.2 - W.phiAg, 1.47, 1e-9);
	const hs = (1.68 - 0.44) / 3.0e14;
	check('P7 h eV', hs, 4.13e-15, 0.002); check('P7 h J', 4.13e-15 * e, 6.62e-34, 0.001);
	check('P7 hf', 4.13e-15 * 7e14, 2.89, 0.001); check('P7 phi', 4.13e-15 * 7e14 - 0.44, 2.45, 0.001);
	check('P7 data consistent', (h / e) * 1e15 - ((h / e) * 7e14 - 0.44), 1.68, 0.002);
	check('P8', 1.8e9 / 7.645e-21, 2.35e29, 0.002); check('P8 dimitri', EN.dimitriEnergy, 1.8e9, 1e-9);
	const T9 = (2 * Ep) / (3 * k);
	check('P9 K', T9, 369.1, 0.0003); check('P9 C', T9 - 273.15, 96.0, 0.002); check('P9 diff', 96.415 - (T9 - 273.15), 0.4, 0.06);
	check('P10 nm', 1240 / W.katrinLimit, 2760, 0.002); check('P10 ratio', 0.45 / 0.0477, 9.4, 0.005);
	check('P11 c2', c * c, 8.988e16, 0.0002); check('P11', (c * c) / h, 1.36e50, 0.003);
	check('P12', 2.296 / 0.0477, 48.1, 0.002);
	// Figures
	check('fig red 700', eVnm / 700, 1.77, 0.002); check('fig Na f0', W.phiNa / (h / e), 0.59e15, 0.01); check('fig Ag f0', W.phiAg / (h / e), 1.14e15, 0.004);
	check('fig FM', (h * 1e8) / e, 4e-7, 0.04); check('fig green', 1240 / 540, 2.3, 0.002);
	return report('7.3 Photons');
}
