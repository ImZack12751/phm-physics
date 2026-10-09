import { check, report } from './lib.mjs';
const G = 9.81, MOON = 1.62, MARS = 3.73, ERID = 2 * G;
export default function () {
	check('fig Moon', 80 * MOON, 130, 0.005); check('fig Mars', 80 * MARS, 298, 0.002); check('fig Earth', 80 * G, 785, 0.001); check('fig Erid', 80 * ERID, 1570, 0.001);
	check('WE1 Erid g', ERID, 19.6, 0.002);
	check('WE2 W', 80 * MARS, 298, 0.002); check('WE2 reading', (80 * MARS) / G, 30.4, 0.002);
	check('WE3 W', 20862 * G, 2.05e5, 0.002); check('WE3 F', 20862 * 0.1, 2090, 0.002);
	check('WE4 hammer W', 1.32 * MOON, 2.14, 0.002); check('WE4 hammer a', 2.14 / 1.32, 1.62, 0.002);
	check('WE4 feather W', 0.003 * MOON, 0.00486, 0.001); check('WE4 feather a', 0.00486 / 0.003, 1.62, 1e-6); check('WE4 ratio', 1.32 / 0.003, 440);
	check('WE5 m', 50 / 0.625, 80); check('WE5 dm', 0.01 * 80, 0.8);
	check('scale Moon', MOON / G, 1 / 6, 0.01); check('scale Erid', ERID / G, 2);
	check('P1', 60 * G, 589, 0.001); check('P2', 49 / G, 5.0, 0.002);
	check('P5 F', 50 * G, 491, 0.002); check('P5 Moon', (50 * G) / MOON, 303, 0.002); check('P5 Erid', (50 * G) / ERID, 25);
	check('P6 F', 80 * ERID, 1570, 0.001); check('P6 reading', (80 * ERID) / G, 160);
	check('P7 Mars', (70 * MARS) / G, 26.6, 0.002); check('P7 Moon', (70 * MOON) / G, 11.6, 0.005);
	check('P8', 2 * MOON, 3.24);
	check('P9', 40 / 0.571, 70.1, 0.001);
	check('P10 a', (2 * 0.5) / 1.25 ** 2, 0.64); check('P10 m', 40 / 0.64, 62.5); check('P10 a2', 1 / 1.2625 ** 2, 0.627, 0.001); check('P10 m2', 40 / (1 / 1.2625 ** 2), 63.8, 0.001);
	check('P11', 1e-15 * G, 9.8e-15, 0.002);
	check('P12 a', 0.5 / 0.25, 2); check('P12 F', 20 * 2, 40);
	return report('2.2 Mass vs weight');
}
