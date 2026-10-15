import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T, PRESSURE as P } from './constants.mjs';
export default function () {
	const atm = S.atm, R = P.R, k = T.k;
	// Concept
	check('litre of air', (atm * 1e-3) / (k * 293.15), 2.5e22, 0.003);
	check('Xe/H2 65x', S.mXe / 2.016, 65, 0.01);
	check('R', T.NA * T.k, 8.314, 0.0001);
	check('Vm 0C', ((R * 273.15) / atm) * 1000, 22.4, 0.001); check('Vm 20C', ((R * 293.15) / atm) * 1000, 24.1, 0.002);
	check('air rho', (atm * 0.02897) / (R * 293.15), 1.204, 0.001);
	const rhoErid = (29 * atm * 0.01703) / (R * 483.15);
	check('Erid rho', rhoErid, 12.5, 0.005); check('Erid 10x', rhoErid / S.air20.rho, 10, 0.04);
	check('Grace spacing', Math.cbrt((k * 294.15) / (0.4 * atm)) * 1e9, 4.6, 0.01);
	check('Rocky spacing', Math.cbrt((k * 483.15) / (29 * atm)) * 1e9, 1.3, 0.015);
	check('Rocky 5 widths', 1.31 / 0.26, 5, 0.02);
	check('e', Math.E, 2.718, 0.001);
	// Formulas
	check('R calc', 6.02214076e23 * 1.380649e-23, 8.314, 0.0001);
	check('Charles 0.366%', 1 / 273.15, 0.00366, 0.001);
	check('Vm m3', (R * 273.15) / atm, 0.02241, 0.0005); check('Vm 24.06', ((R * 293.15) / atm) * 1000, 24.06, 0.0005);
	check('ln2', Math.LN2, 0.693, 0.001);
	// WE1
	check('WE1', (29 * 294.15) / 483.15, 17.7, 0.005); check('WE1 44x', 17.66 / 0.4, 44, 0.005);
	check('WE1 wrong', (29 * 21) / 210, 2.9, 1e-9);
	check('NH3 vapour 8.5 atm', 857.3e3 / atm, 8.5, 0.01);
	check('WE1 half condenses', 1 - 8.46 / 17.66, 0.5, 0.05);
	// WE2
	const n2 = (29 * atm * 8) / (R * 483.15), nG = (0.4 * atm * 8) / (R * 294.15);
	check('WE2 P', 29 * atm, 2.94e6, 0.002); check('WE2 n', n2, 5.85e3, 0.002); check('WE2 m', n2 * 0.01703, 99.7, 0.002);
	check('WE2 nG', nG, 133, 0.005); check('WE2 mG', nG * 0.02897, 3.84, 0.002); check('WE2 26x', (n2 * 0.01703) / (nG * 0.02897), 26, 0.003);
	// WE3
	check('WE3', 0.5 / 0.4, 1.25, 1e-9); check('WE3 2.5x', 1 / 0.4, 2.5, 1e-9);
	// WE4
	const He = (R * 288) / (0.02897 * 9.81), Hv = (R * 737) / (0.04345 * 8.87), Hr = (R * 483.15) / (0.01703 * 19.62);
	check('WE4 Earth', He, 8.43e3, 0.002); check('WE4 Venus', Hv, 15.9e3, 0.002); check('WE4 Erid', Hr, 12.0e3, 0.003);
	check('WE4 NASA Earth', P.earth.H, 8.5e3, 1e-9); check('WE4 NASA Venus', P.venus.H, 15.9e3, 1e-9);
	check('WE4 exp', Math.exp(-8849 / 8430), 0.35, 0.003); check('WE4 Everest', 101.3 * Math.exp(-8849 / 8430), 35.4, 0.002);
	check('WE4 measured', P.everestP / 1000, 33.7, 1e-9); check('WE4 5% high', 35.4 / 33.7 - 1, 0.05, 0.03);
	// WE5
	check('WE5 Grace vol', (1.381e-23 * 294.15) / (0.4 * atm), 1.0e-25, 0.003);
	check('WE5 Grace d', Math.cbrt(1.0e-25), 4.6e-9, 0.01);
	check('WE5 Rocky vol', (1.381e-23 * 483.15) / (29 * atm), 2.27e-27, 0.003);
	check('WE5 Rocky d', Math.cbrt(2.27e-27), 1.3e-9, 0.02);
	check('WE5 13', 4.6 / 0.36, 13, 0.02); check('WE5 5', 1.3 / 0.26, 5, 1e-9);
	// Problems
	check('P1', (1 * 50) / 20, 2.5, 1e-9);
	check('P2', (2 * 353.15) / 293.15, 2.41, 0.002);
	check('P3 n', atm / (R * 293.15), 41.6, 0.001); check('P3 m', 41.6 * 0.02897, 1.2, 0.005);
	check('P4 Pa', (0.5 * R * 300) / 0.01, 1.25e5, 0.003); check('P4 atm', (0.5 * R * 300) / 0.01 / atm, 1.23, 0.002);
	check('P5', (1.78 * R * 273.15) / atm, 0.0399, 0.001); check('P5 Ar', P.mAr, 39.95, 0.001);
	const N6 = (29 * atm * 0.01) / (k * 483.15);
	check('P6 N', N6, 4.4e24, 0.003); check('P6 n', N6 / T.NA, 7.31, 0.002); check('P6 g', (N6 / T.NA) * 17.03, 125, 0.005);
	check('P7 abs', 2.2 + 1.013, 3.213, 1e-9); check('P7 hot', (3.213 * 313.15) / 283.15, 3.553, 0.001);
	check('P7 gauge', 3.553 - 1.013, 2.54, 1e-9); check('P7 wrong', (2.2 * 313.15) / 283.15, 2.43, 0.002);
	check('P8 exp', Math.exp(-5 / 12), 0.659, 0.001); check('P8', 29 * Math.exp(-5 / 12), 19.1, 0.002);
	check('P8 half', 12 * Math.LN2, 8.3, 0.003);
	const rm = (P.mars.P * P.mars.M * 1e-3) / (R * P.mars.T), Hm = (R * P.mars.T) / (P.mars.M * 1e-3 * P.mars.g);
	check('P9 rho', rm, 0.0155, 0.003); check('P9 H', Hm, 1.1e4, 0.003); check('P9 NASA H', P.mars.H, 11.0e3, 1e-9);
	check('P9 80x', 1.204 / 0.0155, 80, 0.03);
	check('P10 ratio', 92e5 / atm, 90.8, 0.001); check('P10 ln', Math.log(90.8), 4.51, 0.001);
	check('P10 h', 15.9 * Math.log(92e5 / atm), 71.7, 0.002);
	check('P11 N', (atm * 5e-4) / (1.381e-23 * 293.15), 1.25e22, 0.003);
	check('P11 vol', T.atmMass / 1.2, 4.25e18, 0.001); check('P11 breaths', 4.25e18 / 5e-4, 8.5e21, 0.001);
	check('P11 1.5', 1.25e22 / 8.5e21, 1.5, 0.02);
	check('P12 2/3', 1 / 1.5, 2 / 3, 1e-9);
	return report('12.2 The gas laws');
}
