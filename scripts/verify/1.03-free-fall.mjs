import { check, report } from './lib.mjs';
import { C } from './constants.mjs';
// Time for a ball starting at height h with upward velocity u to reach the floor.
const quadT = (h, u, g) => (u + Math.sqrt(u * u + 2 * g * h)) / g;
export default function () {
	const gE = 9.81, gS = 14.7, gM = 1.62, gMa = 3.73;
	check('Earth g vs NASA', gE, C.earthGravityMean, 0.002);
	for (const [t, cm] of [[0.1, 4.9], [0.2, 19.6], [0.3, 44.1], [0.4, 78.5]]) check(`strobe E ${t}`, 50 * gE * t * t, cm, 0.003);
	for (const [t, cm] of [[0.1, 7.4], [0.2, 29.4], [0.3, 66.2], [0.4, 117.6]]) check(`strobe S ${t}`, 50 * gS * t * t, cm, 0.01);
	check('throw top', 12 / gE, 1.22, 0.003); check('throw h', 144 / (2 * gE), 7.34, 0.001); check('throw ret', 24 / gE, 2.45, 0.002);
	check('WE1 E', Math.sqrt(1.82 / gE), 0.431, 0.002); check('WE1 S', Math.sqrt(1.82 / gS), 0.352, 0.002); check('WE1 0.1855', 1.82 / gE, 0.1855, 0.001);
	check('WE3 moon h', 144 / (2 * gM), 44.4, 0.002); check('WE3 moon t', 24 / gM, 14.8, 0.002);
	check('WE3 mars h', 144 / (2 * gMa), 19.3, 0.002); check('WE3 mars t', 24 / gMa, 6.43, 0.002);
	check('WE4 S', Math.sqrt(2 * gS * 2), 7.67, 0.002); check('WE4 S²', 2 * gS * 2, 58.8); check('WE4 E', Math.sqrt(2 * gE * 2), 6.26, 0.002); check('WE4 ratio', Math.sqrt(1.5), 1.22, 0.005);
	check('WE5 t', Math.sqrt(2.4 / gE), 0.495, 0.002); check('WE5 x', 3 * Math.sqrt(2.4 / gE), 1.48, 0.003);
	check('P1 t', Math.sqrt(40 / gE), 2.02, 0.002); check('P1 v', Math.sqrt(2 * gE * 20), 19.8, 0.002);
	check('P2 h', gE / 2, 4.91, 0.002);
	check('P4 a', 19.6 - 4.9, 14.7, 0.01); check('P4 b', 44.1 - 19.6, 24.5, 0.01);
	check('P5 S', 0.5 * gS * 0.25, 1.84, 0.002); check('P5 E', 0.5 * gE * 0.25, 1.23, 0.005);
	check('P6 M', Math.sqrt(3.2 / gM), 1.41, 0.005); check('P6 E', Math.sqrt(3.2 / gE), 0.571, 0.002);
	check('P7 t', quadT(10, -5, gE), 1.01, 0.005); check('P7 v', Math.sqrt(25 + 2 * gE * 10), 14.9, 0.002);
	check('P8 t', quadT(2, 15, gE), 3.19, 0.002); check('P8 root', Math.sqrt(225 + 4 * 4.905 * 2), 16.26, 0.001);
	const A = 4.905, B = 344, t1 = (-B + Math.sqrt(B * B + 4 * A * 3 * B)) / (2 * A);
	check('P10 t1', t1, 2.88, 0.002); check('P10 h', A * t1 * t1, 40.7, 0.002); check('P10 naive', A * 9, 44.1, 0.002);
	check('P10 over', (A * 9) / (A * t1 * t1) - 1, 0.08, 0.1);
	const v0 = (1.5 - 4.905 * 0.0144) / 0.12;
	check('P11 v0', v0, 11.9, 0.002); check('P11 h', (v0 * v0) / 19.62, 7.23, 0.002);
	check('P12 S t', Math.sqrt(2 / gS), 0.369, 0.002); check('P12 S', 2 * Math.sqrt(2 / gS), 0.74, 0.005);
	check('P12 E t', Math.sqrt(2 / gE), 0.452, 0.002); check('P12 E', 2 * Math.sqrt(2 / gE), 0.9, 0.005);
	return report('1.3 Free fall');
}
