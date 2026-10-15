import { check, report } from './lib.mjs';
import { C, SOUND as S, PRESSURE as PR, REL, PARTICLES as P } from './constants.mjs';
export default function () {
	const c = C.c, mp = REL.protonMeV, dE = P.dEdxWater, MeVg = 1.602176634e-10; // Gy per MeV/g
	const beam = (b, n = P.ismDensity * 1e6) => {
		const g = 1 / Math.sqrt(1 - b * b), K = (g - 1) * mp, F = g * n * b * c;
		return { g, K, F, D: F * 1e-4 * dE * MeVg, P: F * K * 1.602176634e-13 };
	};
	// Concept
	check('earth col', S.atm / 9.807 / 10, 1033, 0.001); check('earth water', S.atm / 9.807 / 1000, 10.3, 0.005);
	check('earth lambdas', 1033 / P.lambdaInt.air, 11.5, 0.005); check('1 in 1e5', Math.exp(-11.5), 1e-5, 0.02);
	check('Erid col', (29 * S.atm) / (2.0 * 9.81) / 10, 15000, 0.002); check('Erid ratio', 1.5e5 / 10330, 14.5, 0.002);
	check('Erid lambdas', 15000 / 90.1, 166, 0.003); check('muon GeV', 2 * 15000 / 1000, 30, 1e-9);
	check('Mars', P.marsSurface / P.marsCruise, 1 / 3, 0.05);
	const b909 = beam(10 / 11), b995 = beam(0.9952);
	check('909 gamma', b909.g, 2.4, 0.001); check('909 K', b909.K / 1000, 1.31, 0.005);
	check('909 F', b909.F * 1e-4, 2e10, 0.03); check('909 D', b909.D, 6, 0.05); check('909 P', b909.P, 41e3, 0.01);
	check('2e10 x GCR', (b909.F * 1e-4) / 1, 2e10, 0.03); check('30 suns', b909.P / 1361, 30, 0.02);
	check('e10', Math.exp(10), 22000, 0.01); check('8.3 m', (10 * P.lambdaInt.water) / 100, 8.33, 0.001);
	check('slurry', 0.1 / P.lambdaInt.water, 0.0012, 0.01);
	// Formulas
	check('MeV/g', 1.602176634e-13 * 1000, 1.602e-10, 0.001);
	// WE1
	check('WE1 S', S.atm / 9.807, 1.033e4, 0.001); check('WE1 water', 10330 / 1000, 10.3, 0.003);
	check('WE1 ratio', 1033 / 90.1, 11.5, 0.005); check('WE1 frac', Math.exp(-11.5), 1.0e-5, 0.02);
	// WE2
	check('WE2 S', (29 * S.atm) / (2.0 * 9.81), 1.5e5, 0.002); check('WE2 water', 1.5e5 / 1000, 150, 1e-9);
	check('WE2 lambdas', 15000 / 90.1, 166, 0.003); check('WE2 ratio', 15000 / 1033, 14.5, 0.002); check('WE2 muon', 2 * 15000, 30000, 1e-9);
	// WE3
	check('WE3 S', PR.mars.P / PR.mars.g, 171, 0.003); check('WE3 g/cm2', 171 / 10, 17, 0.01); check('WE3 lambdas', 17.1 / 90.1, 0.19, 0.003);
	check('WE3 frac', 0.64 / 1.84, 0.35, 0.01);
	// WE4
	check('WE4 K', 1.4 * 938.3, 1314, 0.0005); check('WE4 F', 2.4 * 0.3e6 * 0.909 * 3.0e8, 1.96e14, 0.002);
	check('WE4 Dmev', 1.96e10 * 1.98, 3.9e10, 0.005); check('WE4 D', 3.88e10 * 1.602e-10, 6.2, 0.005);
	check('WE4 P', 1.96e14 * 1314 * 1.602e-13, 4.1e4, 0.01); check('WE4 exact D', b909.D, 6.2, 0.01);
	check('WE4 8Gy', 8 / 6.2, 1.3, 0.01);
	// WE5
	check('WE5 gamma', 1 / Math.sqrt(1 - 0.9952 ** 2), 10.22, 0.002);
	check('WE5 K', 9.22 * 938.3 / 1000, 8.65, 0.001); check('WE5 F', 10.22 * 0.3e6 * 0.9952 * 3.0e8, 9.15e14, 0.002);
	check('WE5 D', 9.15e10 * 1.98 * 1.602e-10, 29, 0.002); check('WE5 P', 9.15e14 * 8650 * 1.602e-13, 1.27e6, 0.002);
	check('WE5 exact P', b995.P, 1.27e6, 0.005);
	check('WE5 shield', 10 * 83.3, 833, 1e-9); check('WE5 m', 8.33 * 10 * 1000, 8.3e4, 0.004); check('WE5 8000', 833 / 0.1, 8000, 0.05);
	// Problems
	check('P1b', 2.7 * 5, 13.5, 1e-9); check('P1c', 11.35 * 0.1, 1.1, 0.04);
	check('P2', 200 / 83.3, 2.4, 0.001); check('P2 frac', Math.exp(-2.4), 0.091, 0.005);
	check('P3', 938.3, 938, 0.001); check('P3b', 9 * 938.3, 8440, 0.001);
	check('P4', 0.1 / 83.3, 0.0012, 0.01);
	check('P5', 33700 / 9.81, 3435, 0.001); check('P5 frac', 343.5 / 1033, 1 / 3, 0.01);
	check('P6', 92e5 / 8.87 / 10, 1.04e5, 0.003); check('P6 l', 1.037e5 / 90.1, 1150, 0.002);
	const b5 = beam(0.5);
	check('P7 g', b5.g, 1.155, 0.001); check('P7 K', b5.K, 145, 0.002); check('P7 F', b5.F * 1e-4, 5.2e9, 0.003); check('P7 D', b5.D, 1.6, 0.04);
	check('P9', 300 / 83.3, 3.6, 0.001); check('P9 frac', Math.exp(-3.6), 0.027, 0.015);
	check('P10 D', 8 / 60, 0.133, 0.003); check('P10 F', 0.1333 / (1.98 * 1.602e-10), 4.2e8, 0.002);
	check('P10 gb', 4.2e12 / (0.3e6 * 3e8), 0.047, 0.01); check('P10 v', 0.0467 * 3e5, 14000, 0.002);
	check('P10 K', 0.5 * 0.0467 ** 2 * 938.3, 1.0, 0.03);
	check('P11 T', (4.13e4 / (0.9 * 5.670e-8)) ** 0.25, 950, 0.003); check('P11 inner', 4.1e4 / (0.9 * 5.67e-8), 8.0e11, 0.005);
	check('P11 T995', (1.27e6 / (0.9 * 5.67e-8)) ** 0.25, 2200, 0.02); check('P11 inner2', 1.27e6 / (0.9 * 5.67e-8), 2.5e13, 0.01);
	check('P12 d', 0.909 * 11.11, 10, 0.01); check('P12 m', 10 * C.lightYear, 9.5e16, 0.005);
	check('P12 N', 0.3e6 * 10 * 9.46e16, 2.8e23, 0.02); check('P12 g', 2.84e23 * 1.6726e-27 * 1000, 0.5, 0.06);
	check('P12 E', 2.84e23 * 1314 * 1.602e-13, 5.9e13, 0.02); check('P12 kt', 5.98e13 / 4.184e12, 14, 0.03);
	return report('13.4 Cosmic rays and shielding');
}
