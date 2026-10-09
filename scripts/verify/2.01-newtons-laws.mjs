import { check, report } from './lib.mjs';
const G = 9.81, GS = 14.7;
export default function () {
	check('WE1 a', 60000 / 500, 120); check('WE1 v', 120 * 1e-4, 0.012); check('WE1 in g', 120 / G, 12, 0.03);
	check('WE2 ship', 80 * GS, 1176); check('WE2 earth', 80 * G, 785, 0.002);
	check('WE3 crate a', 100 / 20, 5.0); check('WE3 Grace a', 100 / 80, 1.25); check('WE3 crate v', 5 * 0.5, 2.5); check('WE3 Grace v', 1.25 * 0.5, 0.625);
	check('WE3 rate', 2.5 + 0.625, 3.125); check('WE3 sep', 3.125 * 3, 9.4, 0.003); check('WE3 push sep', 0.5 * (5 + 1.25) * 0.25, 0.78, 0.002);
	check('WE4 F', 2.5e6 * GS, 3.7e7, 0.01); check('WE4 ratio', (2.5e6 * GS) / 60000, 600, 0.03);
	check('WE5 ship', Math.sqrt((0.005 * GS) / 0.002), 6.1, 0.01); check('WE5 inside', (0.005 * GS) / 0.002, 36.75); check('WE5 earth', Math.sqrt((0.005 * G) / 0.002), 4.95, 0.002); check('WE5 factor', Math.sqrt(1.5), 1.22, 0.005);
	check('half vt', 1 - 0.25, 0.75); check('drag half weight speed', Math.sqrt(0.5), 0.7, 0.02);
	check('P1', 1200 * 3, 3600); check('P2', 1 / 0.25, 4);
	check('P5 F', Math.hypot(30, 40), 50); check('P5 angle', (Math.atan2(40, 30) * 180) / Math.PI, 53.1, 0.001); check('P5 a', 50 / 10, 5);
	check('P6', 60000 / GS, 4080, 0.002);
	check('P7 T', 50 * (G + 1.2), 551, 0.002); check('P7 W', 50 * G, 491, 0.002);
	check('P8', Math.sqrt((80 * G) / 0.25), 56, 0.005); check('P8 inside', (80 * G) / 0.25, 3139, 0.001); check('P8 kmh', Math.sqrt((80 * G) / 0.25) * 3.6, 200, 0.01);
	check('P9', 0.75 * G, 7.36, 0.001);
	check('P10 a', 80 / 40, 2); check('P10 P', 10 * 2, 20); check('P10 check', (80 - 20) / 30, 2);
	check('P11 a', 0.5 / 0.4, 1.25); check('P11 F', 80 * 1.25, 100); check('P11 ship a', 100 / 2.5e6, 4e-5); check('P11 ship v', (100 / 2.5e6) * 0.4, 1.6e-5);
	check('P12', Math.sqrt(2), 1.41, 0.003);
	return report('2.1 Newton’s laws');
}
