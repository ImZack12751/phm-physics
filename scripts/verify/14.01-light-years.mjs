import { check, report } from './lib.mjs';
import { C, SKY as S } from './constants.mjs';
export default function () {
	const c = C.c, yr = C.julianYear, ly = c * yr, au = C.au, pc = S.pcAu * au, pcLy = pc / ly;
	const ang = ([h, m, s]) => ((h + m / 60 + s / 3600) * 15 * Math.PI) / 180;
	const dang = ([d, m, s]) => (Math.sign(d) * (Math.abs(d) + m / 60 + s / 3600) * Math.PI) / 180;
	const xyz = (st) => {
		const d = (1000 / st.p) * pcLy, a = ang(st.ra), de = dang(st.dec);
		return [d * Math.cos(de) * Math.cos(a), d * Math.cos(de) * Math.sin(a), d * Math.sin(de), d];
	};
	const T = xyz(S.tauCeti), E = xyz(S.eri40);
	const D = Math.hypot(T[0] - E[0], T[1] - E[1], T[2] - E[2]);
	const cosTh = (T[0] * E[0] + T[1] * E[1] + T[2] * E[2]) / (T[3] * E[3]);
	// Concept
	check('ly', ly, 9.4607e15, 1e-4); check('ly au', ly / au, 63000, 0.01);
	check('moon 1.3', 3.844e8 / c, 1.3, 0.02); check('sun 8.3 min', au / c / 60, 8.3, 0.005);
	check('marble earth', au / (S.sunDiameter / 0.01), 1.1, 0.03); check('marble TC', (11.912 * ly) / (S.sunDiameter / 0.01) / 1000, 810, 0.002);
	check('pc m', pc, 3.0857e16, 1e-4); check('pc ly', pcLy, 3.2616, 1e-4);
	check('proxima 0.768', S.proxima.p / 1000, 0.768, 0.001); check('proxima pc', 1000 / S.proxima.p, 1.3, 0.003); check('proxima ly', (1000 / S.proxima.p) * pcLy, 4.25, 0.002);
	check('bessel', (1 / S.cyg61.bessel) * pcLy, 10.4, 0.003); check('61cyg', (1000 / S.cyg61.p) * pcLy, 11.4, 0.003);
	check('TC frac', (S.tauCeti.dp / S.tauCeti.p) * 100, 0.062, 0.005); check('TC ly', T[3], 11.912, 1e-4);
	check('TC dly', (T[3] * S.tauCeti.dp) / S.tauCeti.p, 0.007, 0.06); check('2.7 days', ((T[3] * S.tauCeti.dp) / S.tauCeti.p) * 365.25, 2.7, 0.01);
	check('TC-40Eri', D, 10.1, 0.003);
	check('pogson', 100 ** 0.2, 2.512, 1e-4);
	check('sky angle', (Math.acos(cosTh) * 180) / Math.PI, 37.9, 0.002);
	// Formulas
	check('1 arcsec rad', Math.PI / 648000, (1 / 3600) * (Math.PI / 180), 1e-12);
	// WE1
	check('WE1 ly', 2.998e8 * 3.156e7, 9.461e15, 0.0005); check('WE1 au', 9.4607e15 / 1.495979e11, 63241, 1e-4);
	check('WE1 moon', 3.844e8 / 2.998e8, 1.28, 0.003); check('WE1 sun', 1.496e11 / 2.998e8, 499, 0.001); check('WE1 min', 499 / 60, 8.32, 0.001);
	// WE2
	check('WE2 pc', 1 / 0.27381, 3.6522, 1e-4); check('WE2 ly', 3.6522 * 3.2616, 11.912, 1e-4);
	check('WE2 frac', 0.17 / 273.81, 6.21e-4, 0.002); check('WE2 dly', 6.21e-4 * 11.912, 0.0074, 0.002);
	// WE3
	const ta = (26.017 * Math.PI) / 180, td = (-15.937 * Math.PI) / 180, ea = (63.818 * Math.PI) / 180, ed = (-7.653 * Math.PI) / 180;
	check('WE3 ra TC', (ang(S.tauCeti.ra) * 180) / Math.PI, 26.017, 1e-5); check('WE3 dec TC', (dang(S.tauCeti.dec) * 180) / Math.PI, -15.937, 1e-4);
	check('WE3 ra E', (ang(S.eri40.ra) * 180) / Math.PI, 63.818, 1e-5); check('WE3 dec E', (dang(S.eri40.dec) * 180) / Math.PI, -7.653, 1e-4);
	check('WE3 dE', E[3], 16.34, 2e-4);
	check('WE3 cos', Math.cos(td), 0.9616, 1e-4); check('WE3 sin', Math.sin(td), -0.2746, 1e-3);
	check('WE3 x', 11.912 * 0.9616 * Math.cos(ta), 10.29, 0.001); check('WE3 y', 11.912 * 0.9616 * Math.sin(ta), 5.02, 0.002); check('WE3 z', 11.912 * -0.2746, -3.27, 0.002);
	check('WE3 cosE', Math.cos(ed), 0.9911, 1e-4); check('WE3 sinE', Math.sin(ed), -0.1332, 0.001);
	check('WE3 xE', 16.34 * 0.9911 * Math.cos(ea), 7.15, 0.002); check('WE3 yE', 16.34 * 0.9911 * Math.sin(ea), 14.53, 0.001); check('WE3 zE', 16.34 * -0.1332, -2.18, 0.002);
	check('WE3 dx2', (7.15 - 10.29) ** 2, 9.9, 0.005); check('WE3 dy2', (14.53 - 5.02) ** 2, 90.4, 0.001); check('WE3 dz2', (-2.18 + 3.27) ** 2, 1.2, 0.01);
	check('WE3 D', Math.sqrt(9.86 + 90.44 + 1.19), 10.08, 0.001); check('WE3 exact D', D, 10.08, 0.001);
	// WE4
	const pcTC = 1000 / S.tauCeti.p;
	check('WE4 log', Math.log10(0.3652), -0.4375, 1e-3); check('WE4 2.19', 5 * 0.4375, 2.19, 0.002);
	check('WE4 m', S.sunM + 5 * Math.log10(pcTC / 10), 2.64, 0.002); check('WE4 ratio', 10 ** (-0.4 * (2.64 - 3.5)), 2.2, 0.01); check('WE4 exp', 0.4 * 0.86, 0.344, 1e-9);
	// WE5
	const b = S.beetle.beta, g = 1 / Math.sqrt(1 - b * b), phi = Math.atanh(b);
	check('WE5 phi', phi, 1.658, 0.0005); check('WE5 tau s', (c * phi) / (S.beetle.accelG * C.gStandard), 1.01e5, 0.005);
	check('WE5 tau d', (c * phi) / (S.beetle.accelG * C.gStandard) / 86400, 1.17, 0.005);
	check('WE5 t', 11.912 / b, 12.81, 0.0005); check('WE5 gamma', g, 2.72, 0.002); check('WE5 tau', 11.912 / b / g, 4.71, 0.002); check('WE5 lag', 12.81 - 11.91, 0.9, 1e-6);
	check('RvB 20 months', Math.sqrt(1 - 0.99 ** 2) * (11.912 / 0.99) * 12, 20, 0.05); // ~0.99c gives ~20 months
	// Problems
	check('P1 km', 4.2465 * 9.4607e12, 4.017e13, 0.001); check('P1 au', 4.2465 * 63241, 2.686e5, 0.001);
	check('P2', 1 / 0.199608, 5.01, 0.001); check('P2 ly', 5.01 * 3.2616, 16.34, 0.001);
	check('P4 dm', 3.5 + 1.46, 4.96, 1e-9); check('P4', 10 ** (0.4 * 4.96), 96, 0.005); check('P4 log', 0.4 * 4.96, 1.984, 1e-9);
	check('P5 a', 1 / 0.314, 3.18, 0.002); check('P5 a ly', 3.185 * 3.2616, 10.4, 0.002); check('P5 b', 1 / 0.286, 3.5, 0.002);
	check('P5 b ly', 3.4965 * 3.2616, 11.4, 0.001); check('P5 err', ((0.314 - 0.286) / 0.286) * 100, 9.8, 0.002);
	check('P5 coin', 0.02 / (0.314 / 206265) / 1000, 13, 0.02);
	check('P6 a', 100 * 3.2616, 326, 0.001); check('P6 b', 5000 * 3.2616, 16300, 0.001);
	check('P7 scale', 1.391e9 / 0.01, 1.391e11, 1e-9); check('P7 earth', 1.496e11 / 1.391e11, 1.08, 0.005);
	check('P7 TC', (11.912 * 9.4607e15) / 1.391e11, 8.1e5, 0.001); check('P7 E', (16.34 / 11.912) * 810, 1111, 0.001);
	const mu = ((S.tauCeti.pm / 3600) * Math.PI) / 180, dm = 11.912 * 9.4607e15;
	check('P8 mu', mu, 9.245e-6, 0.0005); check('P8 d', dm, 1.127e17, 0.001); check('P8 m/yr', mu * dm, 1.042e12, 0.001);
	check('P8 vt', (mu * dm) / yr / 1000, 33.0, 0.002); check('P8 v', Math.hypot(33.0, 16.68), 37.0, 0.001); check('P8 deg', 3600 / 1.907, 1890, 0.002);
	check('P9', 4.83 + 5 * Math.log10(0.501), 3.33, 0.002); check('P9 1.5', 5 * Math.log10(0.501), -1.5, 0.002);
	const cosA = (11.912 ** 2 + 10.076 ** 2 - 16.34 ** 2) / (2 * 11.912 * 10.076);
	check('P10 cos', cosA, -0.098, 0.005); check('P10 A', (Math.acos(cosA) * 180) / Math.PI, 95.6, 0.001);
	check('P10 sq', 11.912 ** 2, 141.9, 0.001); check('P10 sq2', 10.076 ** 2, 101.5, 0.001); check('P10 sq3', 16.34 ** 2, 267.0, 0.001); check('P10 den', 2 * 11.912 * 10.076, 240.1, 0.001);
	check('P11 a', Math.sin(td) * Math.sin(ed), 0.0366, 0.003); check('P11 b', 0.9616 * 0.9911 * Math.cos((37.801 * Math.PI) / 180), 0.753, 0.001);
	check('P11 cos', 0.0366 + 0.753, 0.7896, 1e-9); check('P11 exact', cosTh, 0.7896, 0.0005); check('P11 th', (Math.acos(0.7896) * 180) / Math.PI, 37.9, 0.002);
	check('P12 M', S.tauCeti.m - 5 * Math.log10(pcTC / 10), 5.69, 0.001); check('P12 L', 10 ** (-0.4 * (5.69 - 4.83)), 0.45, 0.01);
	check('P13 b', 11.912 / (11.912 + 1 / 12), 0.99305, 1e-5); check('P13 g', 1 / Math.sqrt(1 - 0.99305 ** 2), 8.5, 0.01);
	return report('14.1 Light-years and stellar distances');
}
