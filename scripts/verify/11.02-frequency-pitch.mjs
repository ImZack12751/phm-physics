import { check, report } from './lib.mjs';
import { SOUND as S } from './constants.mjs';
export default function () {
	const n = (f) => 12 * Math.log2(f / S.a4), note = (k) => S.a4 * 2 ** (k / 12), v = 343;
	// Concept
	[27.5, 55, 110, 220, 440, 880, 1760, 3520].forEach((f, i) => check(`A ${f}`, 27.5 * 2 ** i, f, 1e-9));
	check('hearing ~10 octaves', Math.log2(1000), 10, 0.004);
	check('middle C', note(-9), 261.6, 0.001);
	check('0.3%: 501.5', 500 * (1 + S.pitchJnd), 501.5, 1e-9);
	check('twentieth of a semitone', Math.log2(1.003) * 12, 0.05, 0.04);
	check('beats 440/443 avg', (440 + 443) / 2, 441.5, 1e-9);
	check('1 Hz needs 1 s', 1 / (441 - 440), 1, 1e-9);
	check('Mach 2 angle', (Math.asin(0.5) * 180) / Math.PI, 30, 1e-9);
	// Formulas
	check('r', 2 ** (1 / 12), 1.05946, 1e-5); check('cents', 1200 * Math.log2(1.003), 5.2, 0.005);
	// WE1
	check('WE1 T', 25 / 11, 2.27, 0.002); check('WE1 f', 11 / 0.025, 440, 1e-9);
	// WE2
	check('WE2 log', Math.log2(523 / 440), 0.2493, 0.001); check('WE2 n', n(523), 2.99, 0.002); check('WE2 C5', note(3), 523.3, 0.001);
	check('WE2 hundredth', Math.abs(n(523) - 3), 0.0083, 0.01);
	check('WE2 log300', Math.log2(300 / 440), -0.5525, 0.001); check('WE2 n300', n(300), -6.63, 0.002);
	check('WE2 D4', note(-7), 293.7, 0.001); check('WE2 D#4', note(-6), 311.1, 0.001);
	check('WE2 cents', 1200 * Math.log2(300 / 293.7), 37, 0.01);
	// WE3
	check('WE3 frac', 3 / 440, 0.0068, 0.003); check('WE3 twice jnd', 0.0068 / 0.003, 2.27, 0.003);
	check('WE3 beat', 443 - 440, 3, 1e-9); check('WE3 t', 1 / 3, 0.33, 0.011);
	// WE4
	check('WE4 kmh', 30 * 3.6, 108, 1e-9);
	check('WE4 factor up', v / (v - 30), 1.0958, 0.0002); check('WE4 up', (700 * v) / (v - 30), 767, 0.001);
	check('WE4 factor down', v / (v + 30), 0.9196, 0.0002); check('WE4 down', (700 * v) / (v + 30), 644, 0.001);
	check('WE4 log', Math.log2(767 / 644), 0.252, 0.002); check('WE4 semis', 12 * Math.log2(767 / 644), 3.0, 0.02);
	check('WE4 observer', (700 * 373) / 343, 761, 0.001);
	// WE5
	check('WE5 x', 10 / Math.tan(Math.PI / 6), 17.3, 0.002); check('WE5 t', 17320 / (2 * 343), 25, 0.01);
	// Problems
	check('P1', 1000 / 256, 3.91, 0.001);
	check('P2a', 440 * 4, 1760, 1e-9); check('P2b', 440 / 8, 55, 1e-9);
	check('P4 ratio', 2 ** (7 / 12), 1.4983, 0.0001); check('P4', note(7), 659.3, 0.0005);
	check('P5 log', Math.log2(185 / 440), -1.25, 0.002); check('P5 n', n(185), -15.0, 0.002); check('P5 F#3', note(-15), 185.0, 0.001);
	check('P6 ratio', 4186 / 27.5, 152.2, 0.001); check('P6 piano', Math.log2(4186 / 27.5), 7.25, 0.002); check('P6 hearing', Math.log2(1000), 9.97, 0.001);
	check('P7 avg', (880 + 884) / 2, 882, 1e-9); check('P7 t', 1 / 4, 0.25, 1e-9);
	check('P8 factor', 343 / 318, 1.0786, 0.0002); check('P8', (400 * 343) / 318, 431, 0.002);
	check('P9a', (1000 * 353) / 343, 1029, 0.001); check('P9b', (1000 * 333) / 343, 971, 0.001);
	check('P11 diff', (700 * v) / (v - 30) - (700 * 373) / 343, 5.9, 0.01);
	check('P11 767.1', (700 * v) / (v - 30), 767.1, 0.0002); check('P11 761.2', (700 * 373) / 343, 761.2, 0.0002);
	check('P12 sin', Math.sin((25 * Math.PI) / 180), 0.4226, 0.0002); check('P12 v', 343 / Math.sin((25 * Math.PI) / 180), 812, 0.001);
	check('P12 Mach', 812 / 343, 2.4, 0.02);
	check('P13 df', 0.005 * 300, 1.5, 1e-9); check('P13 t', 1 / 1.5, 0.67, 0.005);
	return report('11.2 Frequency and pitch');
}
