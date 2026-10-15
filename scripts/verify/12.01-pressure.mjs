import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T, PRESSURE as P, C } from './constants.mjs';
export default function () {
	const atm = S.atm, g = 9.81, R = P.R;
	// Concept
	check('flat shoes', 600 / 150e-4, 40e3, 1e-9); check('heel', 600 / 1e-4, 6e6, 1e-9);
	check('atm bar', atm / P.bar, 1.013, 0.001); check('atm psi', atm / P.psi, 14.7, 0.001); check('atm mmHg', atm / P.mmHg, 760, 0.001);
	check('29 atm Pa', 29 * atm, 2.94e6, 0.002);
	check('column Earth', atm / g, 10300, 0.003);
	check('rhog water', 1000 * g, 9800, 0.002);
	check('ice fraction', T.rhoIce / T.rhoSea, 0.89, 0.002);
	check('Erid air density', (29 * atm * S.mNH3 * 1e-3) / (R * 483.15), 12.5, 0.005);
	check('10x Grace air', 12.46 / S.air20.rho, 10.3, 0.01);
	// Formulas
	check('baro', atm / (13600 * C.gStandard), 0.76, 0.001);
	// WE1
	check('WE1 g', 2 * g, 19.6, 0.002); check('WE1 P', 29 * atm, 2.94e6, 0.002);
	check('WE1 m/A', (29 * atm) / (2 * g), 1.5e5, 0.002); check('WE1 earth', atm / g, 1.03e4, 0.003);
	check('WE1 ratio', 1.5e5 / 1.03e4, 14.5, 0.005);
	// WE2
	check('WE2 28 atm', 28 * atm, 2.84e6, 0.002); check('WE2 rhog', 1030 * g, 1.01e4, 0.001);
	check('WE2 h', (28 * atm) / (1030 * g), 281, 0.002);
	// WE3
	check('WE3 geff', 1.5 * C.gStandard, 14.7, 0.001); check('WE3 P', P.hailMaryAtm * atm, 4.05e4, 0.001);
	check('WE3 h', (P.hailMaryAtm * atm) / (13600 * 1.5 * C.gStandard), 0.203, 0.003);
	check('WE3 304', 0.4 * 760, 304, 1e-9);
	// WE4
	check('WE4 ratio', (20 / 2) ** 2, 100, 1e-9); check('WE4 F2', 1200 * g, 1.18e4, 0.005);
	check('WE4 F1', (1200 * g) / 100, 118, 0.005); check('WE4 d1', 0.1 * 100, 10, 1e-9);
	check('WE4 work', 118 * 10, 1180, 1e-9); check('WE4 work out', 1.18e4 * 0.1, 1180, 1e-9);
	// WE5
	const rhoH2E = (atm * 2.016e-3) / (R * 293.15), rhoH2Erid = (29 * atm * 2.016e-3) / (R * 483.15);
	check('WE5 H2 earth', rhoH2E, 0.084, 0.005); check('WE5 H2 Erid', rhoH2Erid, 1.475, 0.003);
	check('WE5 earth lift', 1.204 - 0.084, 1.12, 1e-9); check('WE5 Erid lift', 12.46 - 1.475, 11.0, 0.002);
	check('WE5 10x', 11.0 / 1.12, 10, 0.02); check('WE5 force', 11.0 * 19.6, 215, 0.003); check('WE5 earth force', 1.12 * g, 11, 0.01);
	// Problems
	check('P1 bar', (29 * atm) / 1e5, 29.4, 0.002); check('P1 psi', 29 * 14.7, 426, 0.001);
	check('P2 atm', 6e6 / atm, 59, 0.01); check('P2 flat', 600 / 0.015, 4e4, 1e-9); check('P2 flat atm', 4e4 / atm, 0.39, 0.02);
	check('P3', 1000 * g * 3, 2.94e4, 0.002); check('P3 abs', 101.3 + 29.4, 130.7, 1e-9); check('P3 atm', 130.7 / 101.325, 1.29, 0.003);
	check('P4', 32 + 14.7, 46.7, 1e-9); check('P4 kPa', 46.7 * P.psi, 3.22e5, 0.002);
	check('P5', atm / (1000 * g), 10.3, 0.003);
	check('P6 erid', 12.5 * 19.6, 245, 0.001); check('P6 room', 245 * 3, 735, 1e-9);
	check('P6 earth', 1.2 * g, 11.8, 0.005); check('P6 earth room', 11.8 * 3, 35, 0.02);
	check('P6 21x', 735 / 35.4, 21, 0.02); check('P6 frac', 735 / (29 * atm), 0.00025, 0.01);
	check('P7', 1500 * g * (2.5 / 30) ** 2, 102, 0.003); check('P7 ratio', (2.5 / 30) ** 2, 6.94e-3, 0.001);
	check('P8 sea', 917 / 1030, 0.89, 0.001); check('P8 fresh', 917 / 1000, 0.917, 1e-9);
	const area = 4 * Math.PI * C.earthRadius ** 2;
	check('P9 area', area, 5.1e14, 0.001); check('P9 mass', (atm * area) / g, 5.27e18, 0.002);
	check('P9 3%', (atm * area) / g / T.atmMass - 1, 0.03, 0.15);
	check('P10 dp', 28.6 * atm, 2.9e6, 0.002); check('P10 h', (28.6 * atm) / (13600 * g), 21.7, 0.002);
	check('P10 1.5g', 21.7 / 1.5, 14.5, 0.003);
	check('P11 p', 1000 * g * 2, 1.96e4, 0.005); check('P11 F1', 1.96e4 * 0.01, 196, 1e-9); check('P11 F2', 1.96e4 * 10, 1.96e5, 1e-9);
	check('P12 V', 100 / 11.0, 9.1, 0.002); check('P12 r', Math.cbrt((3 * (100 / 11.0)) / (4 * Math.PI)), 1.3, 0.005);
	check('P12 3V/4pi', (3 * 9.09) / (4 * Math.PI), 2.17, 0.002);
	check('P12 earth V', 100 / 1.12, 89, 0.005); check('P12 earth r', Math.cbrt((3 * 89.3) / (4 * Math.PI)), 2.77, 0.002);
	check('P12 earth 3V/4pi', (3 * 89.3) / (4 * Math.PI), 21.3, 0.002);
	return report('12.1 Pressure: F = PA');
}
