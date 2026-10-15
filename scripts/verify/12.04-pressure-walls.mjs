import { check, report } from './lib.mjs';
import { SOUND as S, PRESSURE as P } from './constants.mjs';
export default function () {
	const atm = S.atm, A = P.panelArea, dP = (29 - P.hailMaryAtm) * atm, g = 9.81;
	// Concept and figure
	check('fig Rocky', 29 * atm * A, 5.88e6, 0.002); check('fig Grace', 0.4 * atm * A, 0.08e6, 0.02);
	check('dP', dP, 2.9e6, 0.002); check('F', dP * A, 5.8e6, 0.002); check('590 t', (dP * A) / g / 1000, 590, 0.003);
	check('per cm2', dP * 1e-4, 290, 0.002); check('30 kg', 290 / g, 30, 0.02);
	check('ISS 1.4', (dP * A) / g / P.issMass, 1.4, 0.01);
	check('2% at most', 1 - 28 / 28.6, 0.02, 0.06); check('vacuum', 29 / 28.6 - 1, 0.014, 0.01);
	check('Magdeburg', atm * Math.PI * (P.magdeburgD / 2) ** 2, 2.0e4, 0.01);
	check('hatch', 0.4 * atm * Math.PI * 0.25, 3.2e4, 0.01);
	check('integral half', Math.sin(Math.PI / 2) ** 2 / 2, 0.5, 1e-9);
	// WE1
	check('WE1 dP', 28.6 * atm, 2.9e6, 0.002); check('WE1 F', 2.9e6 * 2, 5.8e6, 1e-9);
	check('WE1 kg', 5.8e6 / g, 5.9e5, 0.003); check('WE1 ISS', 590 / 420, 1.4, 0.01);
	check('WE1 1atm', 28 * atm * 2, 5.67e6, 0.001); check('WE1 2%', 1 - 5.67 / 5.8, 0.02, 0.15);
	// WE2
	check('WE2 A', Math.PI * 0.25 ** 2, 0.196, 0.002); check('WE2 F', atm * 0.19635, 1.99e4, 0.001);
	check('WE2 kg', 1.99e4 / g, 2030, 0.002); check('WE2 0.4', 0.4 * 19.9, 8.0, 0.006); check('WE2 29', 29 * 19.9e3, 577e3, 0.001);
	// WE3
	check('WE3 F', 2.9e6 * Math.PI, 9.1e6, 0.002); check('WE3 T', 2.9e6 / 2, 1.45e6, 1e-9); check('WE3 t', 1.45e6 / g / 1000, 148, 0.002);
	// WE4
	check('WE4 hoop', 2.9e6 * 0.5, 1.45e6, 1e-9); check('WE4 axial', 2.9e6 * 0.25, 7.2e5, 0.01);
	check('WE4 cap', 2.9e6 * Math.PI * 0.25, 2.28e6, 0.005);
	// WE5
	check('WE5 L', Math.sqrt(2), 1.41, 0.003); check('WE5 r', 2.0 / (8 * 0.01), 25, 1e-9);
	check('WE5 T', (2.9e6 * 25) / 2, 3.6e7, 0.01); check('WE5 25x', 3.6e7 / 1.45e6, 25, 0.01);
	// Problems
	check('P1', 2.9e6 * Math.PI * 0.15 ** 2, 2.05e5, 0.001); check('P1 t', 2.05e5 / g / 1000, 21, 0.01);
	check('P2', 0.4 * atm * Math.PI * 0.25, 3.18e4, 0.005); check('P2 t', 3.18e4 / g / 1000, 3.2, 0.02);
	check('P3', atm * Math.PI * 0.025 ** 2, 199, 0.002); check('P3 kg', 199 / g, 20, 0.02);
	check('P4 dP', 0.3 * atm, 3.04e4, 0.001); check('P4', 3.04e4 * Math.PI * 0.035 ** 2, 117, 0.002);
	const d5 = 92e5 - 1.013e5;
	check('P5 dP', d5, 9.1e6, 0.002); check('P5 F', d5 * Math.PI * 0.25, 7.15e6, 0.002); check('P5 T', (d5 * 0.5) / 2, 2.27e6, 0.005);
	check('P6 hoop', 2e7 * 0.1, 2e6, 1e-9); check('P6 axial', 2e7 * 0.05, 1e6, 1e-9);
	check('P9', 1 - Math.sqrt(1 - 0.5), 0.29, 0.01); check('P9 small', 2 / 8, 0.25, 1e-9); check('P9 13%', 1 - 0.25 / 0.2929, 0.15, 0.05);
	check('P10 module', atm * 2.1, 2.13e5, 0.002); check('P10 ratio', 1.45e6 / 2.13e5, 6.8, 0.01);
	check('P11 r', (2 * 5e6) / 2.9e6, 3.45, 0.001); check('P11 s', 2 / (8 * 3.45), 0.072, 0.01);
	check('P11 5%', 0.072 / 1.41, 0.05, 0.03); check('P11 3.4x', 5e6 / 1.45e6, 3.4, 0.02);
	return report('12.4 Forces on walls between atmospheres');
}
