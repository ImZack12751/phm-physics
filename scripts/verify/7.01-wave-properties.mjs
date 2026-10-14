import { check, report } from './lib.mjs';
import { WAVES as W, SPIN } from './constants.mjs';
export default function () {
	const v = W.soundAir20;
	check('343 Hz → 1 m', v / 343, 1, 1e-9); check('20 kHz < 2 cm', v / 20000, 0.01715, 0.001);
	check('water 4x', W.soundWater / v, 4.31, 0.002);
	// WE1
	check('WE1 T', 1000 / 440, 2.27, 0.002); check('WE1 lam', v / 440, 0.78, 0.002);
	// WE2: tension of the Part 3 model centrifuge, crew section 2.0e5 kg at 1 g (9.81)
	const T = SPIN.mCrew * SPIN.omega ** 2 * SPIN.rCrew;
	check('WE2 T', T, 1.96e6, 0.002);
	const vc = Math.sqrt(1.96e6 / 10);
	check('WE2 v2', 1.96e6 / 10, 1.96e5, 1e-9); check('WE2 v', vc, 443, 0.002); check('WE2 t', 104 / vc, 0.235, 0.002);
	check('WE2 echo', 208 / vc, 0.47, 0.01);
	// WE3
	check('WE3 lam', (2 * Math.PI) / 3, 2.09, 0.003); check('WE3 f', 12 / (2 * Math.PI), 1.91, 0.002);
	check('WE3 v', 12 / 3, 4.0, 1e-9); check('WE3 Aw', 0.02 * 12, 0.24, 1e-9); check('WE3 check', 1.91 * 2.09, 4.0, 0.003);
	// WE4
	check('WE4 lam', v / 686, 0.5, 1e-9); check('WE4 d', 3.25 - 3.0, 0.25, 1e-9);
	// WE5
	check('WE5 P', 2 ** 2, 4, 1e-9); check('WE5 A', 1 / 3, 0.333, 0.002);
	// Problems
	check('P2', 5 * 0.4, 2, 1e-9); check('P3', 1 / 250, 0.004, 1e-9);
	check('P4a', v / 20, 17.2, 0.003); check('P4b', (v / 20000) * 100, 1.72, 0.003);
	check('P5', W.soundWater / 440, 3.36, 0.002);
	check('P6 lam', (2 * Math.PI) / 0.5, 12.6, 0.003); check('P6 f', 4 / (2 * Math.PI), 0.637, 0.002); check('P6 v', 4 / 0.5, 8, 1e-9);
	check('P6 chk', 0.637 * 12.6, 8.0, 0.004);
	check('P7a', Math.sqrt(100 / 0.01), 100, 1e-9); check('P7b', 2 ** 2 * 100, 400, 1e-9);
	const v8 = Math.sqrt(1.96e6 / 40);
	check('P8 v', v8, 221, 0.002); check('P8 t', 104 / v8, 0.47, 0.005);
	check('P10 lam', 2 * 0.35, 0.7, 1e-9); check('P10 v', 200 * 0.7, 140, 1e-9);
	check('P11', v / 0.8, 429, 0.002);
	check('P12', 0.02 * 3, 0.06, 1e-9);
	check('P13', 1.5 * Math.sqrt(4), 3.0, 1e-9);
	return report('7.1 Wave properties');
}
