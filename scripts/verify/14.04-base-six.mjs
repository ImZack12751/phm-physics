import { check, report } from './lib.mjs';
import { C, ERIDIAN as E } from './constants.mjs';
const toB = (n, b) => n.toString(b).toUpperCase();
const fromB = (s, b) => parseInt(s, b);
export default function () {
	const es = E.second;
	// Concept
	check('2026', 2 * 1000 + 0 + 2 * 10 + 6, 2026, 1e-12);
	check('135_6', fromB('135', 6), 59, 1e-12); check('55555', fromB('55555', 6), 7775, 1e-12); check('6^5-1', 6 ** 5 - 1, 7775, 1e-12);
	check('22031', fromB('22031', 6), 3043, 1e-12); check('3043 to 6', toB(3043, 6), '22031');
	check('horner', (((2 * 6 + 2) * 6 + 0) * 6 + 3) * 6 + 1, 3043, 1e-12);
	check('45+23', toB(fromB('45', 6) + fromB('23', 6), 6), '112'); check('29+15', 29 + 15, 44, 1e-12);
	check('5x5', toB(25, 6), '41');
	check('1/4', 1 / 6 + 3 / 36, 0.25, 1e-12);
	check('million', toB(1e6, 6), '33233344'); check('1.285', Math.log(10) / Math.log(6), 1.285, 0.0005); check('bits', Math.log2(6), 2.585, 0.0002);
	check('6^5', 6 ** 5, 7776, 1e-12);
	// WE1
	check('WE1', 2 * 1296 + 2 * 216 + 0 + 18 + 1, 3043, 1e-12);
	// WE2
	check('WE2 ticks', 6 ** 3, 216, 1e-12); check('WE2 s', E.lapS / 216, es, 0.0002);
	check('WE2 frac', (E.reaction / E.lapS) * 100, 0.04, 0.03); check('WE2 d', 0.0004 * 2.366, 0.001, 0.06);
	check('WE2 one tick', (E.reaction / es) * 100, 8, 0.06);
	// WE3
	check('WE3', (2 * 3600) / es, 3043, 0.0005); check('WE3 b6', toB(3043, 6), '22031');
	// WE4
	check('WE4 s', 7776 * es, 18398, 0.0001); check('WE4 h', (7776 * es) / 3600, 5.11, 0.001); check('WE4 vs Erid', (7776 * es) / 3600, E.eridDayH, 0.01);
	check('WE4 40000', fromB('40000', 6), 5184, 1e-12); check('WE4 s1', 5184 * es, 12265, 0.0001); check('WE4 h1', (5184 * es) / 3600, 3.41, 0.001);
	check('WE4 220000', fromB('220000', 6), 18144, 1e-12); check('WE4 parts', 15552 + 2592, 18144, 1e-12);
	check('WE4 s2', 18144 * es, 42929, 0.00002); check('WE4 h2', (18144 * es) / 3600, 11.9, 0.003);
	// WE5: fractions by repeated multiplication
	const frac = (x, b, n = 6) => { let s = ''; for (let i = 0; i < n && x > 1e-12; i++) { x *= b; const d = Math.floor(x + 1e-12); s += d; x -= d; } return s; };
	check('WE5 1/3', frac(1 / 3, 6), '2'); check('WE5 1/4', frac(1 / 4, 6), '13'); check('WE5 1/10', frac(1 / 10, 6, 5), '03333');
	check('WE5 check', 1 / 6 + 3 / 36, 9 / 36, 1e-12);
	// Problems
	check('P1 a', fromB('135', 6), 59, 1e-12); check('P1 b', fromB('555', 6), 215, 1e-12);
	check('P2', toB(100, 6), '244'); check('P2 chk', 72 + 24 + 4, 100, 1e-12);
	check('P3 a', fromB('13', 6), 9, 1e-12); check('P3 b', fromB('22', 6), 14, 1e-12);
	check('P4', toB(44, 6), '112');
	check('P5 1/2', frac(1 / 2, 6), '3'); check('P5 1/9', frac(1 / 9, 6), '04'); check('P5 5/6', frac(5 / 6, 6), '5');
	check('P6', frac(1 / 5, 6, 4), '1111');
	check('P7', fromB('1000', 6) * es, 511.1, 0.0002); check('P7 min', (216 * es) / 60, 8.52, 0.001);
	check('P8 log', (6 * Math.log(10)) / Math.log(6), 7.71, 0.001); check('P8 6^7', 6 ** 7, 279936, 1e-12); check('P8 lead', 1e6 / 279936, 3.57, 0.001);
	check('P9', (42 * 24) / 5.11, 197, 0.002); check('P9 b6', toB(197, 6), '525');
	check('P10 log', Math.log(2.998e8) / Math.log(6), 10.89, 0.001); check('P10 ln', Math.log(2.998e8), 19.52, 0.001); check('P10 ln6', Math.log(6), 1.792, 0.001);
	check('P10 6^10', 6 ** 10, 60466176, 1e-12); check('P10 lead', 2.998e8 / 6.047e7, 4.96, 0.001); check('P10 full', toB(C.c, 6), '45425332014');
	const tc = (11.912 * 3.156e7) / es;
	check('P11 x', tc, 1.589e8, 0.001); check('P11 log', Math.log(tc) / Math.log(6), 10.54, 0.001); check('P11 a', tc / 6 ** 10, 2.628, 0.001);
	check('P11 14', toB(10, 6), '14'); check('P11 digits', frac(0.628, 6, 3), '343');
	check('P12 states', 6 ** 5, 7776, 1e-12); check('P12 bits', Math.log2(7776), 12.9, 0.003); check('P12 bin', toB(7775, 2), '1111001011111');
	return report('14.4 Sidebar: base-6 numbers');
}
