import { check, report } from './lib.mjs';
import { C, SPIN } from './constants.mjs';
const P = Math.PI, G = 9.81, RPM = (2 * P) / 60;
// Exact landing of a ball dropped from height h in a habitat of floor radius R spinning at w (non-rotating frame, then compare angles).
function drop(R, w, h) {
	const r1 = R - h, d = Math.sqrt(R * R - r1 * r1), v = w * r1, t = d / v;
	const angBall = Math.atan(d / r1), angSpot = w * t;
	return { d, v, t, angBall, angSpot, defl: R * (angSpot - angBall), approx: (2 / 3) * w * h * t };
}
export default function () {
	const w = SPIN.omega, d1 = drop(78, w, 1);
	check('WE1 v', d1.v, 27.31, 0.001); check('WE1 d', d1.d, 12.45, 0.001); check('WE1 t', d1.t, 0.456, 0.001);
	check('WE1 ball', d1.angBall, 0.1603, 0.001); check('WE1 spot', d1.angSpot, 0.1617, 0.001); check('WE1 x', d1.defl, 0.108, 0.003); check('WE1 approx', d1.approx, 0.108, 0.003);
	const vf = w * 78;
	check('WE2 floor', vf, 27.66, 0.001); check('WE2 spin', (vf + 2) ** 2 / 78, 11.28, 0.001); check('WE2 anti', (vf - 2) ** 2 / 78, 8.44, 0.001);
	check('WE2 spin g', (vf + 2) ** 2 / 78 / G, 1.15, 0.002); check('WE2 anti g', (vf - 2) ** 2 / 78 / G, 0.86, 0.002);
	check('WE2 2ωu', 2 * w * 2, 1.42, 0.002); check('WE2 u²/r', 4 / 78, 0.05, 0.03); check('WE2 float', vf, 27.7, 0.002); check('WE2 kmh', vf * 3.6, 100, 0.005);
	const R3 = 4.5 / ((347 / 346) ** 2 - 1), w3 = Math.sqrt(14.7 / R3), d3 = drop(R3, w3, 0.91);
	check('WE3 R', R3, 777, 0.001); check('WE3 ω', w3, 0.1375, 0.001); check('WE3 t', d3.t, 0.352, 0.001); check('WE3 x', d3.approx, 0.029, 0.02); check('WE3 exact', d3.defl, 0.029, 0.02);
	check('WE3 model', drop(78, w, 0.91).defl, 0.094, 0.005);
	const t4 = Math.sqrt(200 / G);
	check('WE4 t', t4, 4.52, 0.002); check('WE4 x', (C.earthOmega * G * t4 ** 3) / 3, 0.022, 0.005); check('WE4 ratio', w / C.earthOmega, 5000, 0.03);
	check('Ω', C.earthOmega, 7.29e-5, 0.001); check('15.04°/h', 360 / 23.9345, 15.04, 0.001);
	const s5 = Math.sin((48.86 * P) / 180), TF = 23.93 / s5;
	check('WE5 sin', s5, 0.753, 0.001); check('WE5 TF', TF, 31.8, 0.002); check('WE5 rate', 360 / TF, 11.3, 0.003);
	check('WE5 T', 2 * P * Math.sqrt(67 / G), 16.4, 0.002); check('WE5 per swing', (11.3 * 16.4) / 3600, 0.051, 0.01);
	check('P1', 2 * 0.35 * 3, 2.1, 1e-9); check('P3', 2 * C.earthOmega * 10, 1.46e-3, 0.002);
	check('P5 spin', (vf + 3) ** 2 / 78, 12.05, 0.001); check('P5 anti', (vf - 3) ** 2 / 78, 7.8, 0.001);
	check('P5 spin g', (vf + 3) ** 2 / 78 / G, 1.23, 0.002); check('P5 anti g', (vf - 3) ** 2 / 78 / G, 0.79, 0.008);
	check('P6', 2 * w * 1, 0.709, 0.001); check('P6 %', (2 * w) / G, 0.072, 0.005);
	const w7 = 6 * RPM, g7 = w7 ** 2 * 25, t7 = Math.sqrt(3 / g7);
	check('P7 ω', w7, 0.628, 0.001); check('P7 g', g7, 9.87, 0.001); check('P7 t', t7, 0.551, 0.002); check('P7 x', (2 / 3) * w7 * 1.5 * t7, 0.35, 0.02);
	check('P7 exact', drop(25, w7, 1.5).defl, 0.37, 0.005);
	check('P8', 23.93 / Math.sin(P / 4), 33.8, 0.002); check('P8 days', 23.93 / Math.sin(P / 4) / 24, 1.4, 0.01);
	const c11 = 2 * C.earthOmega * 0.05, cp = 0.05 ** 2 / 0.2;
	check('P11 C', c11, 7.3e-6, 0.002); check('P11 cp', cp, 0.0125); check('P11 ratio', c11 / cp, 5.8e-4, 0.01);
	const w12 = (0.1 * G) / (2 * 1.5);
	check('P12 ω', w12, 0.327, 1e-6); check('P12 rpm', w12 / RPM, 3.12, 0.002); check('P12 r', G / w12 ** 2, 91.7, 0.001);
	return report('3.4 The Coriolis effect');
}
