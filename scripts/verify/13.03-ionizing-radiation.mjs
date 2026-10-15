import { check, report } from './lib.mjs';
import { WAVES as W, PARTICLES as P } from './constants.mjs';
export default function () {
	const hc = 1239.84198, MeV = 1.602176634e-13;
	const muPb = P.muLead[1] * P.rhoLead, muW = P.muWater[1];
	// Concept
	check('124 nm', hc / 10, 124, 0.001); check('Petrova', hc / (W.petrova * 1e9), 0.048, 0.01);
	check('ions per alpha', 5e6 / 33, 150000, 0.02);
	check('HVL Pb', Math.LN2 / muPb, 0.86, 0.002); check('HVL W', Math.LN2 / muW, 9.8, 0.001);
	check('65 Pb', Math.log(100) / P.muLead[1], 65, 0.003); check('65 W', Math.log(100) / P.muWater[1], 65, 0.002);
	check('5.7 cm', Math.log(100) / muPb, 5.7, 0.003); check('65 cm', Math.log(100) / muW, 65, 0.002);
	check('wR', P.wR.alpha, 20, 1e-9); check('wR p', P.wR.proton, 2, 1e-9);
	check('350 J', 5 * 70, 350, 1e-9); check('180x', (0.25 * 4186 * 60) / 350, 180, 0.005);
	check('thermal', 1.5 * 1.380649e-23 * 310 / 1.602176634e-19, 0.04, 0.01);
	check('bonds', 1e6 / 4, 250000, 1e-9); check('2e15', 350 / MeV, 2e15, 0.1);
	check('bg', P.background.world, 2.4, 1e-9); check('K40', P.background.k40, 0.17, 1e-9); check('cosmic', P.background.cosmic, 0.39, 1e-9);
	check('cruise', P.marsCruise * 1e3, 1.84, 1e-9); check('1.3 days', 2.4 / 1.84, 1.3, 0.005);
	check('0.67', P.marsCruise * 365.25, 0.67, 0.005);
	// WE1
	check('WE1 E', 5 * 70, 350, 1e-9); check('WE1 dT', 5 / 4186, 0.0012, 0.005);
	check('WE1 coffee', 0.25 * 4186 * 60, 6.3e4, 0.005); check('WE1 N', 350 / MeV, 2.2e15, 0.01);
	check('WE1 per cell', 2.18e15 / 3.7e13, 60, 0.02);
	// WE2
	check('WE2 muPb', muPb, 0.806, 0.001); check('WE2 muW', muW, 0.0707, 0.001);
	check('WE2 hvlPb', 0.693 / 0.806, 0.86, 0.002); check('WE2 hvlW', 0.693 / 0.0707, 9.8, 0.001);
	check('WE2 ln100', Math.log(100), 4.61, 0.002); check('WE2 xPb', 4.61 / 0.806, 5.7, 0.004); check('WE2 xW', 4.61 / 0.0707, 65, 0.004);
	check('WE2 rhoxPb', 11.35 * 5.71, 64.8, 0.001); check('WE2 rhoxW', Math.log(100) / 0.07072, 65.1, 0.001);
	// WE3
	check('WE3', 1 + 2 + 20, 23, 1e-9); check('WE3 yrs', 23 / 2.4, 10, 0.05);
	// WE4
	check('WE4 H', 1.84 * 365.25, 672, 0.001); check('WE4 t', 1000 / 1.84, 543, 0.001); check('WE4 yr', 543 / 365.25, 1.5, 0.01);
	check('WE4 risk', P.riskPerSv * 0.672, 0.037, 0.003); check('WE4 280', 672 / 2.4, 280, 1e-9);
	// WE5
	check('WE5 P', hc / 25984, 0.0477, 0.001); check('WE5 g', hc / 500, 2.48, 0.001); check('WE5 H', hc / 13.6, 91.2, 0.001);
	check('WE5 five', 13.6 / 2.48, 5, 0.1); check('WE5 300', 13.6 / 0.0477, 285, 0.002);
	// Problems
	check('P1', 0.7 / 70, 0.01, 1e-9); check('P2', 2 * 2, 4, 1e-9); check('P3', 2.4 / 0.02, 120, 1e-9);
	check('P4', 2 ** 10, 1024, 1e-9); check('P4 Pb', 10 * 0.86, 8.6, 1e-9);
	const mu01 = P.muLead[0.1] * P.rhoLead;
	check('P5 mu', mu01, 63.0, 0.001); check('P5 hvl', 0.693 / 63.0, 0.011, 0.001);
	check('P5 n', 0.05 / 0.011, 4.5, 0.02); check('P5 frac', 0.5 ** (0.05 / (Math.LN2 / mu01)), 0.04, 0.08);
	check('P6 a', 40 / 9, 4.4, 0.02); check('P6 b', Math.sqrt(40), 6.3, 0.004);
	check('P7', 1.84 * 180, 331, 0.001);
	check('P8 ln', Math.log(1e6), 13.8, 0.002); check('P8', Math.log(1e6) / 0.07072, 195, 0.002);
	check('P9', 80 * 2.4, 192, 1e-9); check('P9 risk', 0.055 * 0.192, 0.011, 0.04);
	check('P10 rhox', 40e-4, 4e-3, 1e-9); check('P10', 5 / 4e-3, 1250, 1e-9); check('P10 ratio', 1250 / 2, 600, 0.05);
	check('P11', 5 / 100, 0.05, 1e-9); check('P11 bg', 50 / 2.4, 20, 0.05); check('P11 risk', 0.055 * 0.05, 0.0028, 0.02);
	check('P11 hvl', Math.log2(100), 6.6, 0.01);
	check('P12', P.muLead[0.1] / P.muWater[0.1], 32.5, 0.001);
	return report('13.3 Ionizing radiation');
}
