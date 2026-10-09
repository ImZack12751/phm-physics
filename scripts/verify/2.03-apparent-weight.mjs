import { check, report } from './lib.mjs';
const G = 9.81, GS = 14.7;
export default function () {
	check('fig Earth', 80 * G, 785, 0.001); check('fig ship', 80 * GS, 1176); check('fig orbit W', 80 * 8.67, 694, 0.001);
	check('ISS fraction', 8.67 / G, 0.88, 0.005);
	check('WE1 N', 80 * GS, 1176); check('WE1 display', (80 * GS) / G, 120, 0.002); check('WE1 n', GS / G, 1.5, 0.002);
	check('WE2a N', 80 * (G + 1.2), 881, 0.001); check('WE2a kg', (80 * (G + 1.2)) / G, 89.8, 0.001);
	check('WE2b N', 80 * (G - 1.2), 689, 0.001); check('WE2b kg', (80 * (G - 1.2)) / G, 70.2, 0.001);
	check('WE3 N', 3 * 80 * G, 2350, 0.002); check('WE3 a', 2 * G, 19.6, 0.002);
	check('WE4 c', G + 0.5 * G, 14.7, 0.002); check('WE4 t', Math.sqrt((2 * 0.91) / GS), 0.352, 0.002);
	check('WE5 W', 80 * 8.67, 694, 0.001);
	check('sim try', GS - G, 4.9, 0.005);
	check('tilt g_eff', Math.hypot(G, 3), 10.26, 0.001); check('tilt angle', (Math.atan(3 / G) * 180) / Math.PI, 17.0, 0.002);
	check('P1', 60 * (G + 2), 709, 0.001); check('P2', 60 * (G - 2), 469, 0.001); check('P3', 60 * G, 589, 0.001);
	check('P6', Math.sqrt((2 * 0.91) / G), 0.431, 0.002);
	check('P7 ship', 100 * GS, 1470); check('P7 Erid', 100 * 2 * G, 1960, 0.002); check('P7 ratio', GS / (2 * G), 0.75, 0.002);
	check('P8 lift', 2 * Math.PI * Math.sqrt(1.12 / (G + 2)), 1.93, 0.003); check('P8 rest', 2 * Math.PI * Math.sqrt(1.12 / G), 2.12, 0.002);
	check('P9', 3.5 * 80 * G, 2750, 0.002);
	check('P10 a', GS - 3.73, 11.0, 0.005); check('P10 g', (GS - 3.73) / G, 1.12, 0.002);
	check('P11 g_eff', Math.hypot(G, 3), 10.26, 0.001); check('P11 angle', (Math.atan(3 / G) * 180) / Math.PI, 17.0, 0.002); check('P11 N', 80 * G, 785, 0.001);
	check('P12 frac', (2 * 4.5) / 6.371e6, 1.4e-6, 0.01); check('P12 times', 0.0058 / ((2 * 4.5) / 6.371e6), 4000, 0.05);
	return report('2.3 Apparent weight');
}
