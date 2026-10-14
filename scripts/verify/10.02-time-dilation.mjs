import { check, report } from './lib.mjs';
import { REL as R, C } from './constants.mjs';
const c = C.c;
const gam = (b) => 1 / Math.sqrt(1 - b * b);
export default function () {
	// Concept
	check('10 ns', (2 * 1.5) / c * 1e9, 10, 0.001);
	check('660 m', 0.995 * c * R.muonLife, 660, 0.01); check('muon life', R.muonLife * 1e6, 2.197, 0.0001);
	check('flux', R.muonFluxPerM2Min, 10000, 1e-9); check('gps 3.9', R.gpsSpeed / 1000, 3.9, 0.01); check('gps 7.2', R.gpsSR, 7.2, 1e-9);
	check('2 km', c * 7e-6 / 1000, 2.1, 0.01);
	// WE1
	check('WE1 tau', 2 / 3.0e8 * 1e9, 6.67, 0.001); check('WE1 g', gam(0.5), 1.155, 0.0005); check('WE1 t', 1.155 * 6.67, 7.7, 0.001);
	// WE2
	check('WE2 1-b2', 1 - 0.92 ** 2, 0.1536, 1e-6); check('WE2 sqrt', Math.sqrt(0.1536), 0.3919, 0.0002); check('WE2 g', gam(0.92), 2.55, 0.001);
	// WE3
	const g3 = gam(0.995), t3 = 1.5e4 / (0.995 * 3.0e8);
	check('WE3 1-b2', 1 - 0.995 ** 2, 0.009975, 1e-6); check('WE3 g', g3, 10.0, 0.002); check('WE3 t', t3 * 1e6, 50.3, 0.002);
	check('WE3 x', 50.3 / 2.197, 22.9, 0.002); check('WE3 no', Math.exp(-50.3 / 2.197), 1.1e-10, 0.04);
	check('WE3 xd', 50.3 / (10.0 * 2.197), 2.29, 0.002); check('WE3 yes', Math.exp(-50.3 / 21.97), 0.1, 0.02);
	// fig values
	const sv = (km, g) => Math.exp(-((15 - km) * 1e3) / (0.995 * c) / (R.muonLife * g));
	check('fig 10 no', sv(10, 1), 5e-4, 0.03); check('fig 5 no', sv(5, 1), 2.4e-7, 0.05); check('fig 10 yes', sv(10, 10.01), 0.47, 0.01);
	check('fig 5 yes', sv(5, 10.01), 0.22, 0.012); check('fig 0 yes', sv(0, 10.01), 0.1, 0.02);
	// WE4
	const b4 = R.gpsSpeed / 2.998e8;
	check('WE4 b2', b4 * b4, 1.67e-10, 0.001); check('WE4', 0.5 * b4 * b4 * 86400 * 1e6, 7.2, 0.003); check('WE4 km', 2.998e8 * 7.2e-6 / 1000, 2.2, 0.02);
	// WE5
	const b5 = 250 / 3.0e8;
	check('WE5 b2', b5 * b5, 6.94e-13, 0.001); check('WE5 s', 45 * 3600, 1.62e5, 1e-9); check('WE5', 0.5 * b5 * b5 * 1.62e5 * 1e9, 56, 0.005);
	check('WE5 HK', R.hkEast.kin, -184, 1e-9); check('WE5 HK2', R.hkWest.kin, 96, 1e-9);
	// Problems
	check('P1a', gam(0.6), 1.25, 1e-9); check('P1b', gam(0.8), 1.667, 0.0005);
	check('P4', gam(0.8), 1.67, 0.002);
	const g5 = gam(0.95);
	check('P5 g', g5, 3.2, 0.001); check('P5 t', 3.2 * 2.2, 7.05, 0.002); check('P5 d', 0.95 * 3.0e8 * 7.05e-6 / 1000, 2.0, 0.005); check('P5 no', 0.95 * 3e8 * 2.2e-6, 630, 0.01);
	check('P6', Math.sqrt(0.75), 0.866, 0.0005);
	check('P7', 0.5 * (30 / 3.0e8) ** 2 * C.julianYear, 1.6e-7, 0.02);
	check('P8 v', Math.sqrt(3.986e14 / (6.371e6 + 4e5)), 7670, 0.001);
	check('P8 b2', (7670 / 2.998e8) ** 2, 6.55e-10, 0.001); check('P8 s', 182 * 86400, 1.572e7, 0.0005); check('P8', 0.5 * 6.55e-10 * 1.572e7, 5.1e-3, 0.01);
	const t9 = 1e4 / (0.995 * 3.0e8);
	check('P9 t', t9 * 1e6, 33.5, 0.002); check('P9 x', 33.5 / 21.97, 1.525, 0.001); check('P9', Math.exp(-1.525), 0.22, 0.012);
	check('P10', 46 * 2.55, 117, 0.003); check('P10 rocky', R.rockyYears, 46, 1e-9);
	check('P11 g-1', gam(0.01) - 1, 5.0004e-5, 0.00005);
	const g12 = 13 / 3.75;
	check('P12 g', g12, 3.47, 0.002); check('P12 1-b2', 1 / 3.47 ** 2, 0.0831, 0.001); check('P12 b', Math.sqrt(1 - 1 / g12 ** 2), 0.957, 0.001);
	return report('10.2 Time dilation and the light clock');
}
