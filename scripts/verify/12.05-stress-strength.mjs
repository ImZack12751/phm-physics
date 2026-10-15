import { check, report } from './lib.mjs';
import { SOUND as S, PRESSURE as P, ADRIAN, GRAV } from './constants.mjs';
export default function () {
	const atm = S.atm, g = 9.81, q = (29 - P.hailMaryAtm) * atm, L = Math.SQRT2, t = P.panelThickness;
	const st = P.steelA36, gl = P.glassAnnealed;
	const bend = (qq, LL, tt) => (3 * qq * LL * LL) / (4 * tt * tt);
	const tNeed = (qq, LL, s) => LL * Math.sqrt((3 * qq) / (4 * s));
	// Concept
	check('optical 100x', P.glassFibreOptic / gl.uts, 100, 0.01);
	check('steel break', st.uts / (st.rho * g), 5.2e3, 0.006); check('kevlar break', P.kevlar.uts / (P.kevlar.rho * g), 200e3, 0.04);
	check('Adrian g', (GRAV.G * ADRIAN.mass) / ADRIAN.radius ** 2, 17.15, 0.002);
	check('steel Adrian', st.uts / (st.rho * 17.15), 3.0e3, 0.004);
	check('sphere steel 12mm', (q * 1) / (2 * 125e6), 0.012, 0.04);
	check('L/t', L / t, 141, 0.003); check('(L/t)^2', (L / t) ** 2, 20000, 1e-9);
	check('bend 43 GPa', bend(q, L, t), 43e9, 0.012);
	check('1000x glass', bend(q, L, t) / gl.uts, 1000, 0.07); check('170x steel', bend(q, L, t) / st.yield, 170, 0.025);
	check('third graphene', bend(q, L, t) / P.graphene, 1 / 3, 0.01);
	check('steel 13 cm', tNeed(q, L, st.yield), 0.13, 0.015); check('glass 33 cm', tNeed(q, L, gl.uts), 0.33, 0.015);
	check('sphere 145', (q * 1) / (2 * t), 145e6, 0.002); check('300x', bend(q, L, t) / ((q * 1) / (2 * t)), 300, 0.001);
	// WE1
	const A1 = Math.PI * 0.0005 ** 2;
	check('WE1 A', A1, 7.85e-7, 0.001); check('WE1 sigma', (10 * g) / A1, 1.25e8, 0.002);
	check('WE1 eps', 1.25e8 / P.Y.steel, 6.2e-4, 0.01); check('WE1 dL', 6.25e-4 * 2, 1.25e-3, 1e-9);
	check('WE1 k', (P.Y.steel * A1) / 2, 7.9e4, 0.01); check('WE1 half', 125 / 250, 0.5, 1e-9);
	check('WE1 yield kg', (st.yield * A1) / g, 20, 0.002); check('WE1 break kg', (st.uts * A1) / g, 32, 0.002);
	// WE2
	const A2 = 1.96e6 / st.yield;
	check('WE2 A', A2, 7.8e-3, 0.006); check('WE2 d', Math.sqrt((4 * A2) / Math.PI), 0.1, 0.001);
	check('WE2 eps', st.yield / P.Y.steel, 1.25e-3, 1e-9); check('WE2 dL', 1.25e-3 * 104, 0.13, 0.001);
	check('WE2 SF2 d', Math.sqrt((4 * 2 * A2) / Math.PI), 0.14, 0.01);
	// WE3
	check('WE3 steel', 4e8 / (7800 * g), 5.2e3, 0.006); check('WE3 kevlar', 2.92e9 / (1440 * g), 207e3, 0.002);
	check('WE3 carbon', 4.137e9 / (1750 * g), 241e3, 0.001); check('WE3 Adrian steel', 4e8 / (7800 * 17.15), 3.0e3, 0.004);
	check('WE3 Adrian kevlar', 2.92e9 / (1440 * 17.15), 118e3, 0.005);
	// WE4
	check('WE4 steel', (2.9e6 * 1) / (2 * 1.25e8), 0.0116, 0.001); check('WE4 glass', (2.9e6 * 1) / (2 * 4.1e7), 0.035, 0.012);
	check('WE4 1cm', (2.9e6 * 1) / (2 * 0.01), 1.45e8, 1e-9);
	check('WE4 CF laminate', 1600, 1600, 1e-9);
	// WE5
	check('WE5 sigma', (3 * 2.9e6 * 2.0) / (4 * 0.01 ** 2), 4.35e10, 0.001);
	check('WE5 1060', 43500 / 41, 1060, 0.002); check('WE5 174', 43500 / 250, 174, 0.001);
	check('WE5 sqrt steel', Math.sqrt((3 * 2.9e6) / (4 * 2.5e8)), 0.0932, 0.002); check('WE5 t steel', 1.41 * 0.0932, 0.13, 0.012);
	check('WE5 sqrt glass', Math.sqrt((3 * 2.9e6) / (4 * 4.1e7)), 0.23, 0.003); check('WE5 t glass', 1.41 * 0.23, 0.33, 0.02);
	check('WE5 mass', 7800 * 2 * 0.13, 2.1e3, 0.04);
	check('WE5 diamond factor', 43.5 / 2.8, 15, 0.04);
	// Problems
	check('P1', 500 / 2e-4, 2.5e6, 1e-9); check('P2', 1.5e-3 / 3, 5e-4, 1e-9);
	check('P3', 1e8 / 0.0014, 7.1e10, 0.01); check('P3 Al', P.Y.al, 7.0e10, 1e-9);
	check('P5', (2e11 * 7.85e-7) / 2, 7.9e4, 0.01); check('P5 short', (2e11 * 7.85e-7) / 0.5, 3.1e5, 0.02);
	check('P6', 1e9 / (1300 * g), 7.8e4, 0.006); check('P6 15x', 78 / 5.2, 15, 1e-9);
	check('P7 Erid', 5.2 / 2, 2.6, 1e-9); check('P7 ship', 5.2 / 1.5, 3.5, 0.01);
	check('P8', (2.9e6 * 0.5) / P.al6061.yield, 6.0e-3, 0.004);
	check('P9 eps', 1.45e8 / P.Y.glass, 2.4e-3, 0.01); check('P9 glass eps', 4.1e7 / 6e10, 6.8e-4, 0.005);
	check('P9 3.5x', 2.42e-3 / 6.83e-4, 3.5, 0.02);
	check('P10 sigma', 43.5 / 4, 10.9, 0.003); check('P10 sqrt', Math.sqrt((3 * 2.9e6) / (4 * 1.25e8)), 0.132, 0.002);
	check('P10 t', 1.41 * 0.132, 0.19, 0.025);
	check('P11 steel', 250 / 145, 1.7, 0.02); check('P11 glass', 41 / 145, 0.28, 0.01); check('P11 3.5', 145 / 41, 3.5, 0.02);
	check('P12 sqrt', Math.sqrt((3 * 2.9e6) / (4 * 1.3e11)), 4.09e-3, 0.002); check('P12 t', 1.41 * 4.09e-3, 5.8e-3, 0.01);
	return report('12.5 Stress and strength');
}
