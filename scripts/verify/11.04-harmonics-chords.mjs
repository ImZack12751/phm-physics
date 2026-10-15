import { check, report } from './lib.mjs';
export default function () {
	const v = 343, note = (n) => 440 * 2 ** (n / 12);
	// Concept
	check('ear canal', v / (4 * 0.025), 3430, 1e-9);
	check('vocal tract 500', v / (4 * 0.169), 500, 0.02); check('vt 1500', (3 * v) / (4 * 0.169), 1500, 0.02); check('vt 2500', (5 * v) / (4 * 0.169), 2500, 0.02);
	check('helium 2.9x', 1005.4 / 343.21, 2.9, 0.012);
	check('fifth coincide', 3 * 440, 2 * 660, 1e-9);
	check('ET fifth', 2 ** (7 / 12), 1.498, 0.0003); check('ET third', 2 ** (4 / 12), 1.26, 0.0002);
	check('ladder 330 ET', 220 * 2 ** (7 / 12), 329.6, 0.0002);
	// Formulas
	check('cents fifth', 1200 * Math.log2(2 ** (7 / 12) / 1.5), -2.0, 0.03); check('cents third', 1200 * Math.log2(2 ** (4 / 12) / 1.25), 13.7, 0.003);
	// WE1
	check('WE1 v', 2 * 0.65 * 110, 143, 1e-9); check('WE1 T', 0.004 * 143 ** 2, 82, 0.003);
	// WE2
	check('WE2 f1', v / 0.1, 3430, 1e-9); check('WE2 f3', 3 * 3430, 10300, 0.001);
	// WE3
	check('WE3 f1', v / (4 * 0.169), 507, 0.001); check('WE3 f3', (3 * v) / (4 * 0.169), 1520, 0.002); check('WE3 f5', (5 * v) / (4 * 0.169), 2540, 0.002);
	check('WE3 He', 2.93 * 507, 1490, 0.004);
	// WE4
	check('WE4 ratio', 440 / 110, 4, 1e-9); check('WE4 ratio2', 550 / 110, 5, 1e-9); check('WE4 ratio3', 660 / 110, 6, 1e-9);
	check('WE4 period', 1000 / 110, 9.09, 0.001);
	check('WE4 c1', 3 * 440, 1320, 1e-9); check('WE4 c2', 5 * 440, 4 * 550, 1e-9); check('WE4 c3', 6 * 550, 5 * 660, 1e-9);
	// WE5
	check('WE5 C4', note(-9), 261.63, 0.00002); check('WE5 E4', note(-5), 329.63, 0.00002);
	check('WE5 5C', 5 * 261.63, 1308.1, 0.0001); check('WE5 4E', 4 * 329.63, 1318.5, 0.0001); check('WE5 beat', 4 * 329.63 - 5 * 261.63, 10.4, 0.003);
	check('WE5 E5', note(7), 659.26, 0.00002); check('WE5 2E5', 2 * 659.26, 1318.5, 0.0001); check('WE5 beat2', 1320 - 2 * 659.26, 1.5, 0.02);
	// Problems
	check('P1', [2, 3, 4].map((n) => n * 196).join(','), '392,588,784');
	check('P4', v / 1.2, 286, 0.001);
	check('P5', v / (2 * 16.35), 10.5, 0.002);
	check('P6 ratio', Math.sqrt(125 / 80), 1.25, 1e-9); check('P6 semis', 12 * Math.log2(1.25), 3.86, 0.001);
	check('P7', 450 / 300, 1.5, 1e-9); check('P7 meet', 3 * 300, 900, 1e-9);
	check('P8 L', 25 + 0.6 * 3.5, 27.1, 1e-9); check('P8 f', v / (4 * 0.0271), 3160, 0.002);
	check('P10', v / (4 * 0.141), 608, 0.001); check('P10 He', 2.93 * 608, 1780, 0.001);
	check('P11 cents', 1200 * Math.log2(2 ** (5 / 12) / (4 / 3)), 2.0, 0.03); check('P11 pure', 1200 * Math.log2(4 / 3), 498.0, 0.0001);
	check('P11 D5', note(5), 587.33, 0.00002); check('P11 3D5', 3 * 587.33, 1762.0, 0.0001); check('P11 beat', 3 * 587.33 - 1760, 2.0, 0.01);
	check('P12 a', (24 * 23 * 22) / 6, 2024, 1e-9); check('P12 b', (24 * 23 * 22 * 21 * 20) / 120, 42504, 1e-9);
	check('P13', 1000 / 110, 9.09, 0.001);
	return report('11.4 Harmonics and chords');
}
