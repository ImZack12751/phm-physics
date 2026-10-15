import { check, report } from './lib.mjs';
import { C, THERMAL as T, WAVES as W, PARTICLES as P } from './constants.mjs';
export default function () {
	const c = C.c, eV = 1.602176634e-19, MeV = 1e6 * eV, NA = T.NA, k = T.k, yr = 365.25 * 86400;
	const Enu = (C.h * c) / W.petrova / eV;
	// Concept
	check('C14 frac', (156 - 49) / 156, 0.69, 0.01); check('two thirds', (18.6 - 5.7) / 18.6, 2 / 3, 0.05);
	check('sigma m2', P.crSigma * 1e-4, 6.3e-48, 1e-9); check('thomson ratio', 6.652e-25 / 6.3e-44, 1e19, 0.06);
	check('emit', (2 * C.sunLuminosity) / (26.7 * MeV), 1.8e38, 0.01);
	check('flux', (2 * C.sunLuminosity) / (26.7 * MeV) / (4 * Math.PI * C.au ** 2) / 1e4, 6.4e10, 0.01);
	check('measured', P.solarNuFlux, 6.5e10, 1e-9);
	check('sqrt dm32', Math.sqrt(P.dm32), 0.05, 0.003); check('lighter than e', 0.511e6 / 0.05, 1e7, 0.03);
	check('Enu', Enu, 0.0477, 0.001); check('2 Enu', 2 * Enu, 0.0954, 0.001);
	const Tc = 273.15 + 96.415, kT = (1.5 * k * Tc) / eV;
	check('3/2 kT', kT, 0.0478, 0.001); check('2x', 2 * kT, 0.0955, 0.001);
	check('Komorov N', P.komorovJ / (0.0477 * eV), 2e26, 0.02); check('100 MeV', 89, 100, 0.12);
	// WE1
	const dm = (1.6749275 - 1.67262193 - 0.00091094) * 1e-27;
	check('WE1 dm', dm, 1.39463e-30, 1e-5); check('WE1 J', dm * 2.99792e8 ** 2, 1.2534e-13, 0.0002);
	check('WE1 Q', ((P.mn - P.mp - P.me) * c * c) / MeV, 0.782, 0.001); check('WE1 mean', 301, 300, 0.01);
	// WE2
	check('WE2 L/Q', 3.828e26 / (26.7 * 1.602e-13), 8.94e37, 0.002); check('WE2 2L/Q', 2 * 8.949e37, 1.79e38, 0.001);
	check('WE2 area', 4 * Math.PI * 1.496e11 ** 2, 2.81e23, 0.002); check('WE2 F', 1.79e38 / 2.812e23, 6.4e14, 0.01);
	// WE3
	const np = (1000 / 0.01802) * NA * 2;
	check('WE3 n', np, 6.69e28, 0.002); check('WE3 l', 1 / (np * 6.3e-48), 2.4e18, 0.015); check('WE3 ly', 1 / (np * 6.3e-48) / C.lightYear, 250, 0.01);
	const col = (5513 * 1.274e7) / 1.661e-27;
	check('WE3 col', col, 4.2e37, 0.01); check('WE3 P', col * 6.3e-48, 2.7e-10, 0.015); check('WE3 4bn', 1 / (col * 6.3e-48), 4e9, 0.07);
	// WE4
	check('WE4 E', 1239.84 / 25984, 0.047716, 0.0001);
	const T4 = (2 * 0.047716 * 1.60218e-19) / (3 * 1.38065e-23);
	check('WE4 T', T4, 369.2, 0.0005); check('WE4 C', T4 - 273.15, 96.0, 0.001); check('WE4 pct', Tc / T4 - 1, 0.0011, 0.05);
	check('WE4 m', (0.047716 * 1.602e-19) / 2.998e8 ** 2, 8.5e-38, 0.003); check('WE4 ratio', 0.51099895e6 / 0.047716, 1.07e7, 0.002);
	// WE5
	check('WE5 dm', 1.5e6 / 9e16, 1.7e-11, 0.02); check('WE5 ng', P.komorovNg, 17, 1e-9);
	const N5 = 1.5e6 / (0.0477 * 1.602e-19), V5 = (4 / 3) * Math.PI * 5e-6 ** 3;
	check('WE5 N', N5, 2.0e26, 0.02); check('WE5 V', V5, 5.2e-16, 0.01); check('WE5 n', N5 / V5, 3.7e41, 0.02);
	check('WE5 cube', (N5 / V5) ** (1 / 3), 7.2e13, 0.003); check('WE5 hc', C.h * c, 1.986e-25, 0.0005);
	check('WE5 E J', 1.986e-25 * 7.2e13, 1.4e-11, 0.03); check('WE5 MeV', (C.h * c * (N5 / V5) ** (1 / 3)) / MeV, 90, 0.01);
	check('WE5 2bn', 89.4e6 / 0.0477, 2e9, 0.07);
	// Problems
	check('P1', 156 - 49, 107, 1e-9); check('P1 pct', 107 / 156, 0.69, 0.01);
	check('P2', 6.5e10 * 1e4, 6.5e14, 1e-9); check('P2b', 6.5e14 * 0.5, 3e14, 0.1);
	check('P3', 2.5 / (168000 * 365.25 * 24), 1.7e-9, 0.005);
	check('P4 a', Math.sqrt(2.51e-3), 0.05, 0.003); check('P4 b', Math.sqrt(P.dm21), 0.0086, 0.003);
	check('P5 N', (200 / 0.01802) * NA * 2, 1.34e28, 0.004); check('P5 R', 1.34e28 * 5e13 * 6.3e-44, 0.042, 0.01); check('P5 h', 0.0422 * 3600, 150, 0.02);
	check('P6 N', 1.79e38 * 3.156e7, 5.6e45, 0.01); check('P6 W', 0.02 * 3.828e26, 7.7e24, 0.01);
	check('P6 J', 7.656e24 * 3.156e7, 2.4e32, 0.01); check('P6 kg', 2.416e32 / 8.988e16, 2.7e15, 0.01);
	check('P7', 3 * 0.0477, 0.143, 0.001);
	check('P8 N', 1.8e9 / (0.0477 * 1.602e-19), 2.4e29, 0.02); check('P8 nuc', 2e-8 / 1.661e-27, 1.2e19, 0.005); check('P8 ratio', 2.355e29 / 1.204e19, 2e10, 0.03);
	check('P9 T', 2 * 369.14 - 273.15, 465, 0.002);
	const Nb = 70 / 1.661e-27;
	check('P10 N', Nb, 4.2e28, 0.005); check('P10 R', Nb * 6.5e14 * 1e-49, 2.7e-6, 0.02); check('P10 life', 80 * yr, 2.5e9, 0.02);
	check('P10 n', 2.74e-6 * 2.52e9, 7000, 0.02); check('P10 pass', 6.5e14 * 0.5 * 2.5e9, 8e23, 0.02);
	check('P11 n', 1000 / 1.661e-27, 6.0e29, 0.005); check('P11 l', 1 / (6.02e29 * 1e-56), 1.7e26, 0.03); check('P11 ly', 1.66e26 / C.lightYear, 1.8e10, 0.03);
	check('P12', 6.4e10 * 0.52 / 0.552 ** 2, 1.1e11, 0.01); check('P12 x', 0.52 / 0.552 ** 2, 1.7, 0.01);
	check('SN', P.sn1987a.count, 12 + 8 + 5, 1e-9);
	return report('13.5 Neutrinos');
}
