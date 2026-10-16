import { check, report } from './lib.mjs';
import { C, GRAV, ATMOS as A, THERMAL, PRESSURE as PR } from './constants.mjs';
export default function () {
	const k = 1.380649e-23, u = A.u, G = GRAV.G, R = PR.R, ME = C.earthMass, RE = C.earthRadius;
	const vr = (M, T) => Math.sqrt((3 * k * T) / (M * u));
	const Tc = (M, ve) => (M * u * ve * ve) / (108 * k);
	const g = A.gasM;
	// Concept / table
	check('earth ve', Math.sqrt(2 * GRAV.earthGM / RE), 11.19e3, 0.002); check('N2 rms room', vr(g.N2, 293), 500, 0.03);
	check('36x', 36 * 1.5, 54, 1e-9); check('e-54', Math.exp(-54), 4e-24, 0.15); check('e-13.5', Math.exp(-13.5), 1e-6, 0.4);
	check('ratio', Math.exp(40.5), 4e17, 0.03);
	check('H2 6rms', 6 * vr(g.H2, 1000) / 1000, 21, 0.01); check('He 6rms', 6 * vr(g.He, 1000) / 1000, 15, 0.002);
	check('Ne x3', A.earthNe / A.earthHe, 3.5, 0.01);
	check('Three CO2 Tc', Tc(g.CO2, Math.sqrt(2 * A.three.gG * 9.80665 * A.three.R)), 330, 0.02);
	check('Three N2 Tc', Tc(g.N2, Math.sqrt(2 * A.three.gG * 9.80665 * A.three.R)), 210, 0.02);
	check('Three ve', Math.sqrt(2 * A.three.gG * 9.80665 * A.three.R) / 1000, 2.6, 0.01);
	check('DH 100', A.venusDH / A.earthDH, 100, 1e-9);
	check('lapse air', 9.80665 / (3.5 * R / 0.0289652) * 1000, 9.8, 0.005);
	const cpNH3 = (4 * R) / 0.01703, cpCO2 = (1.3 / 0.3) * R / 0.04401;
	const gAd = (G * A.adrian.mEarths * ME) / A.adrian.R ** 2;
	check('Erid lapse', (A.erid.g / cpNH3) * 1000, 10.5, 0.002); check('Adrian lapse', (gAd / cpCO2) * 1000, 18, 0.005);
	// WE1
	check('WE1 vrms', Math.sqrt((3 * 1.381e-23 * 390) / (28.01 * 1.661e-27)), 589, 0.002); check('WE1 6', 6 * 589, 3530, 0.002);
	check('WE1 CO2', 589 * Math.sqrt(28.01 / 44.01), 470, 0.002); check('WE1 6CO2', 6 * 470, 2820, 1e-9);
	check('WE1 Tc', (28.01 * 1.661e-27 * 2380 ** 2) / (108 * 1.381e-23), 177, 0.003); check('WE1 C', 177 - 273.15, -96, 0.005);
	check('WE1 exact', 6 * vr(g.N2, A.moon.T), 3530, 0.003);
	// WE2
	check('WE2 H2', Math.sqrt((3 * 1.381e-23 * 1000) / (2.016 * 1.661e-27)) / 1000, 3.52, 0.002); check('WE2 6H2', 6 * 3.52, 21.1, 0.001);
	check('WE2 He', 3.52 * Math.sqrt(2.016 / 4.003), 2.5, 0.002); check('WE2 6He', 6 * 2.498, 15.0, 0.002);
	check('WE2 N2', 3.52 * Math.sqrt(2.016 / 28.01), 0.943, 0.002); check('WE2 6N2', 6 * 0.9443, 5.66, 0.002);
	check('WE2 TcH2', (2.016 * 1.661e-27 * 11190 ** 2) / (108 * 1.381e-23), 281, 0.003); check('WE2 TcHe', 281 * 4.003 / 2.016, 558, 0.001);
	// WE3
	const ve3 = Math.sqrt(2 * 1.96 * 1.737e6);
	check('WE3 ve', ve3, 2610, 0.002); check('WE3 g', 0.2 * 9.80665, 1.96, 0.001);
	check('WE3 vCO2', Math.sqrt((3 * 1.381e-23 * 191) / (44.01 * 1.661e-27)), 329, 0.002); check('WE3 6', 6 * 329, 1970, 0.003);
	check('WE3 N2', 1.974 * Math.sqrt(44.01 / 28.01), 2.47, 0.002);
	check('WE3 TcCO2', (44.01 * 1.661e-27 * 2610 ** 2) / (108 * 1.381e-23), 334, 0.003); check('WE3 TcN2', 334 * 28.01 / 44.01, 213, 0.003);
	check('WE3 T', A.three.T, 191, 0.001);
	// WE4
	check('WE4 M', A.adrian.mEarths * ME, 2.347e25, 0.001);
	check('WE4 g', (6.674e-11 * 2.347e25) / 1.0318e7 ** 2, 14.71, 0.001); check('WE4 gg', 14.71 / 9.80665, 1.5, 0.002);
	check('WE4 ve', Math.sqrt(2 * 14.71 * 1.0318e7), 17420, 0.001);
	check('WE4 TcH2', (2.016 * 1.661e-27 * 17420 ** 2) / (108 * 1.381e-23), 682, 0.003);
	check('WE4 TcHe', 682 * 4.003 / 2.016, 1354, 0.002); check('WE4 TcCH4', 682 * 16.04 / 2.016, 5420, 0.003);
	check('WE4 exact g', gAd, 14.71, 0.001);
	// WE5
	check('WE5 cp', 3.5 * 8.314 / 0.02897, 1005, 0.001); check('WE5 G', 9.807 / 1005 * 1000, 9.76, 0.001);
	check('WE5 cpN', 4 * 8.314 / 0.01703, 1953, 0.001); check('WE5 GN', 20.48 / 1953 * 1000, 10.5, 0.002);
	// RvB
	check('RvB Erid g', (G * 8.5 * ME) / (2 * RE) ** 2, 20.9, 0.002);
	// Problems
	check('P1', Math.sqrt((3 * 1.381e-23 * 288) / (28.01 * 1.661e-27)), 506, 0.002); check('P1 r', 11190 / 506, 22, 0.01);
	check('P2 O2', (0.032 * 5030 ** 2) / (108 * 8.314), 901, 0.002); check('P2 CO2', 901 * 44.01 / 32, 1239, 0.001);
	check('P3', (8.314 * 94) / (0.02801 * 1.352), 2.06e4, 0.002);
	check('P4', Math.sqrt(2), 1.41, 0.005);
	check('P5 a', Math.exp(-13.5), 1.4e-6, 0.03); check('P5 b', Math.exp(-54), 3.5e-24, 0.01); check('P5 r', Math.exp(40.5), 3.9e17, 0.01);
	check('P6 ve', 11.19 * Math.sqrt(8.5 / 2), 23.1, 0.002);
	check('P6 NH3', (0.01703 * 23070 ** 2) / (108 * 8.314), 1.01e4, 0.003); check('P6 H2', 1.01e4 * 2.016 / 17.03, 1190, 0.005);
	check('P7 N2', 6 * Math.sqrt((3 * 1.381e-23 * 700) / (28.01 * 1.661e-27)), 4740, 0.002); check('P7 CO2', 4740 * Math.sqrt(28.01 / 44.01), 3780, 0.002);
	check('P8 cp', (1.3 / 0.3) * 8.314 / 0.04401, 819, 0.001); check('P8 G', 3.73 / 819 * 1000, 4.6, 0.01);
	check('P9 G', 14.71 / 819 * 1000, 18.0, 0.003); check('P9 T', 300 - 5 * 18, 210, 1e-9); check('P9 C', 210 - 273.15, -63, 0.01);
	check('P10', (0.002016 * 59500 ** 2) / (108 * 8.314), 7950, 0.002);
	check('P11 N2', 6 * Math.sqrt((3 * 1.381e-23 * 300) / (28.01 * 1.661e-27)), 3100, 0.003); check('P11 CO2', 3.097 * Math.sqrt(28.01 / 44.01), 2.47, 0.002);
	check('P12 a', 288.15 - 6.5 * 11, 216.65, 1e-9); check('P12 b', 288.15 - 9.76 * 11, 180.8, 0.001); check('P12 C', 216.65 - 273.15, -56.5, 1e-9);
	check('P13', (483 - 373) / 10.5, 10.5, 0.003);
	void THERMAL;
	return report('14.2 Planetary atmospheres');
}
