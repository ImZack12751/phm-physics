import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T, PRESSURE as P } from './constants.mjs';
export default function () {
	const atm = S.atm, R = P.R, k = T.k, E = P.earth, V = P.venus;
	// Concept
	check('ppO2 sea', E.O2 * 101.3, 21.2, 0.002); check('ppN2 sea', E.N2 * 101.3, 79.1, 0.001);
	check('O2 mass %', (E.O2 * P.mO2) / 28.97, 0.231, 0.002);
	check('Everest ppO2', E.O2 * P.everestP, 7.1e3, 0.01); check('Everest third', P.everestP / atm, 1 / 3, 0.01);
	check('tox 7x', P.oxToxLow / (E.O2 * atm), 7, 0.06);
	check('Apollo 1 5x', (P.apolloPad * P.psi) / (E.O2 * atm), 5.4, 0.01);
	check('EMU kPa', P.emu * P.psi, 29.6e3, 0.002); check('EMU third', (P.emu * P.psi) / atm, 0.29, 0.03);
	const breed = P.breedAtm * atm;
	check('Venus N2', V.N2 * breed, 71, 0.002); check('Three N2', P.threeworldN2 * breed, 162, 0.002);
	check('Earth N2 Pa', E.N2 * atm, 79e3, 0.002); check('2.3x', 162 / 71, 2.3, 0.01);
	check('Venus surf N2', V.N2 * 92, 3.2, 0.01); check('4x Earth', (V.N2 * V.P) / (E.N2 * atm), 4, 0.03);
	const ME = E.N2 * P.mN2 + E.O2 * P.mO2 + E.Ar * P.mAr + E.CO2 * 44.009, MV = V.CO2 * 44.009 + V.N2 * P.mN2;
	check('Earth M', ME, E.M, 0.0005); check('Venus M', MV, V.M, 0.0005);
	// WE1
	check('WE1 P', 0.4 * 101.3, 40.5, 0.001); check('WE1 ppO2', E.O2 * 40.5, 8.5, 0.002);
	check('WE1 frac', 21.2 / 40.5, 0.52, 0.01); check('WE1 1.9', 40.5 / 21.2, 1.9, 0.01);
	// WE2
	check('WE2 tot', breed, 2030, 0.002); check('WE2 Venus', 0.035 * 2030, 71, 0.001); check('WE2 Three', 0.08 * 2030, 162, 0.003);
	check('WE2 ship', E.N2 * 0.4 * atm, 3.16e4, 0.002); check('WE2 450', 3.16e4 / 71, 450, 0.02);
	check('WE2 20x', (0.035 * 0.4 * atm) / (V.N2 * breed), 20, 1e-9);
	// WE3
	check('WE3 P', 1.4e5 / E.O2, 6.68e5, 0.001); check('WE3 diff', 6.68e5 - 1.013e5, 5.67e5, 0.001);
	check('WE3 rhog', 1030 * 9.81, 1.01e4, 0.001); check('WE3 h', (1.4e5 / E.O2 - atm) / (1030 * 9.81), 56, 0.003);
	check('WE3 Wikipedia', P.oxToxAirDepth, 56, 1e-9);
	// WE4
	check('WE4 a', 0.965 * 44.01, 42.47, 0.0005); check('WE4 b', 0.035 * 28.01, 0.98, 0.001);
	check('WE4 M', 0.965 * 44.01 + 0.035 * 28.01, 43.45, 0.0005);
	check('WE4 rho', (V.P * 0.04345) / (R * V.T), 65, 0.005); check('WE4 NASA', V.rho, 65, 1e-9);
	check('WE4 sixteenth', 1000 / 65, 16, 0.04);
	check('WE4 N2', 0.035 * 92, 3.2, 0.01); check('WE4 Earth bar', E.N2 * 1.013, 0.791, 0.001); check('WE4 4.1', 3.22 / 0.791, 4.1, 0.01);
	// WE5
	check('WE5 flight', 5 * 6895, 34.5e3, 0.001); check('WE5 ratio', 34.5 / 21.2, 1.6, 0.02);
	check('WE5 pad', 16.7 * 6895, 115e3, 0.002); check('WE5 pad ratio', 115 / 21.2, 5.4, 0.005);
	check('WE5 third', (5 * P.psi) / atm, 1 / 3, 0.03);
	// Problems
	check('P1', 2 + 0.5, 2.5, 1e-9); check('P1 x', 0.5 / 2.5, 0.2, 1e-9);
	check('P2', E.CO2 * atm, 42.6, 0.002);
	check('P3', P.mars.O2 * P.mars.P, 1.0, 0.02); check('P3 ratio', 21200 / 1.02, 2.1e4, 0.015);
	check('P4', 0.965 * breed, 1.96e3, 0.003);
	check('P5', E.O2 * 33.7, 7.06, 0.001); check('P5 frac', 33.7 / 101.3, 0.33, 0.01);
	check('P6 terms', 0.7808 * 28.01, 21.87, 0.001); check('P6 O', 0.2095 * 32, 6.7, 0.001); check('P6 Ar', 0.00934 * 39.95, 0.37, 0.01);
	check('P6 M', 0.7808 * 28.01 + 0.2095 * 32 + 0.00934 * 39.95 + 0.00042 * 44.01, 28.97, 0.0005);
	check('P6 mass', (0.2095 * 32) / 28.97, 0.231, 0.002);
	check('P7', 162 / (0.4 * atm), 0.004, 0.003); check('P7 20x', 0.08 / 0.004, 20, 1e-9);
	check('P8 P', 1.4 / 0.32, 4.375, 1e-9); check('P8 h', (4.375e5 - 1.013e5) / (1030 * 9.81), 33, 0.01);
	const P300 = 1.013e5 + 300 * 1030 * 9.81;
	check('P9 P', P300, 3.13e6, 0.002); check('P9 bar', P300 / 1e5, 31.3, 0.002); check('P9 x', 1.4 / 31.3, 0.045, 0.01);
	check('P9 surface', 0.045 * 1.013, 0.046, 0.01);
	check('P10 a O2', E.O2 * 0.4, 0.0838, 0.001); check('P10 a', 29 * 0.0838, 2.4, 0.02); check('P10 b', 29 * 0.4, 11.6, 1e-9);
	check('P11 Venus', 71 / (1.381e-23 * 173.15), 3.0e22, 0.015); check('P11 Earth', 7.91e4 / (1.381e-23 * 288), 2.0e25, 0.01);
	check('P11 ratio', 1.99e25 / 2.97e22, 670, 0.003);
	return report('12.3 Partial pressure');
}
