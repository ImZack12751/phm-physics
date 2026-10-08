import { check, report } from './lib.mjs';
import { C, BOOK } from './constants.mjs';
export default function () {
	check('WE1 a', -(50 ** 2) / 400, -6.25); check('WE1 t', 50 / 6.25, 8); check('WE1 check', 0.5 * 50 * 8, 200);
	check('WE2 s', 80 ** 2 / 5, 1280); check('WE2 t', 80 / 2.5, 32);
	check('WE3 meet', [0, 6].every((t) => t * t === 6 * t) ? 1 : 0, 1); check('WE3 v', 2 * 6, 12);
	check('WE4', 30 * 0.8 + 30 ** 2 / 10, 114); check('WE4 60', 60 ** 2 / 10, 360);
	const a = 14.7, d = 11.912 * C.lightYear, th = Math.sqrt(d / a);
	check('a 1.5g', BOOK.shipAccelG * C.gStandard, 14.7, 0.002);
	check('WE5 d', d, 1.127e17, 0.001); check('WE5 th', th, 8.756e7, 0.001); check('WE5 th yr', th / C.julianYear, 2.77, 0.003);
	check('WE5 trip', (2 * th) / C.julianYear, 5.55, 0.002); check('WE5 vpk', a * th, 1.287e9, 0.001); check('WE5 /c', (a * th) / C.c, 4.29, 0.002);
	check('P1 v', 3 * 5, 15); check('P1 s', 0.5 * 3 * 25, 37.5);
	check('P2 t', 20 / 4, 5); check('P2 s', 0.5 * 20 * 5, 50);
	const v4 = 0.01 * C.c;
	check('P4 t', v4 / a, 2.04e5, 0.003); check('P4 days', v4 / a / 86400, 2.36, 0.003);
	check('P4 s', (v4 * v4) / (2 * a), 3.06e11, 0.003); check('P4 au', (v4 * v4) / (2 * a) / C.au, 2.04, 0.003);
	check('P5 roots', [2, 6].every((t) => Math.abs(12 * t - 1.5 * t * t - 18) < 1e-12) ? 1 : 0, 1); check('P5 top', 12 * 4 - 1.5 * 16, 24);
	check('P6 a', (30 - 18) / 4.5, 2.67, 0.002); check('P6 v', 6 + (8 / 3) * 3, 14);
	check('P7 s', 1600 / 9.8, 163, 0.002); check('P7 t', 40 / 4.9, 8.2, 0.005);
	check('P8', 150 + 225, 375); check('P8 t', 10 + 15, 25);
	const r = Math.sqrt(1.5), t9 = (4 * r) / (r - 1);
	check('P9 t', t9, 21.8, 0.002); check('P9 x', t9 * t9, 475, 0.002); check('P9 equal', 1.5 * (t9 - 4) ** 2, t9 * t9, 1e-9);
	const tm = Math.sqrt(C.moonDistance / a);
	check('P10 th', tm, 5114, 0.001); check('P10 trip', 2 * tm, 10227, 0.001); check('P10 h', (2 * tm) / 3600, 2.84, 0.002);
	check('P10 v', a * tm, 75200, 0.001); check('P10 frac c', (a * tm) / C.c, 2.5e-4, 0.01);
	check('P11', 0.5 * 2 * 225, 225); check('P11 u', 2 * 15, 30);
	check('P12 true', 9 / 3, 3); check('P12 naive', 9 / 2, 4.5);
	return report('1.2 Equations of motion');
}
