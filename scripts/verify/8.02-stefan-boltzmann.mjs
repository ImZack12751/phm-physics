import { check, report } from './lib.mjs';
import { STARS as S, THERMAL as T, ENERGY as EN, C } from './constants.mjs';
const h = C.h, c = C.c, k = T.k, sigma = T.sigma;
const Rs = C.sunRadius, Ts = C.sunTeff, Ls = C.sunLuminosity;
const Lr = (r, t) => r * r * (t / Ts) ** 4;
export default function () {
	// Concept
	check('1.5^5', 1.5 ** 5, 7.6, 0.002); check('1.5^4', 1.5 ** 4, 5.1, 0.01); check('7.6/1.5', 7.6 / 1.5, 5.1, 0.01);
	check('sigma formula', (2 * Math.PI ** 5 * k ** 4) / (15 * c * c * h ** 3), 5.67e-8, 0.0005);
	check('integral', Math.PI ** 4 / 15, 6.494, 0.0001);
	check('1000 K', sigma * 1e12, 57e3, 0.006); check('sun 63 MW', sigma * Ts ** 4, 63e6, 0.002);
	check('quarter percent', 1 - 0.99 ** 0.25, 0.0025, 0.005);
	check('14 K', Ts * (1 - 0.99 ** 0.25), 14, 0.04); check('4e24', 0.01 * Ls, 3.83e24, 0.001);
	check('proxima seventh', S.proxima.R, 1 / 7, 0.08);
	// WE1
	check('WE1 flux', sigma * Ts ** 4, 6.294e7, 0.0005); check('WE1 L', 4 * Math.PI * Rs ** 2 * sigma * Ts ** 4, 3.828e26, 0.0005);
	check('WE1 heaters', (sigma * Ts ** 4) / 1000, 60000, 0.05);
	// WE2
	check('WE2 sqrt', Math.sqrt(S.sirius.L), 4.974, 0.0005); check('WE2 T2', (S.sirius.T / Ts) ** 2, 2.909, 0.0005);
	check('WE2 R', Math.sqrt(S.sirius.L) / (S.sirius.T / Ts) ** 2, 1.71, 0.002); check('WE2 T4', (S.sirius.T / Ts) ** 4, 8.5, 0.005);
	check('WE2 R2', 1.71 ** 2, 2.9, 0.01);
	// WE3
	check('WE3 factor', 0.99 ** 0.25, 0.99749, 1e-5); check('WE3 T', Ts * 0.99 ** 0.25, 5757.5, 1e-4); check('WE3 dT', Ts * (1 - 0.99 ** 0.25), 14.5, 0.002);
	check('WE3 rule', (Ts / 4) * 0.01, 14.4, 0.003);
	// WE4
	const P = 0.01 * Ls;
	check('WE4 P', P, 3.828e24, 1e-9); check('WE4 rate', P / c ** 2, 4.26e7, 0.001); check('WE4 yr', (P / c ** 2) * C.julianYear, 1.34e15, 0.004);
	check('WE4 tonnes', P / c ** 2 / 1000, 40000, 0.07);
	// WE5
	check('WE5 P', 0.001 * EN.drivePowerBook, 5.4e11, 1e-9); check('WE5 A', 5.4e11 / (sigma * 1000 ** 4), 9.5e6, 0.003);
	check('WE5 side km', Math.sqrt(9.5e6) / 1000, 3.1, 0.01);
	// Problems
	check('P1', 2 ** 4, 16, 1e-9); check('P2', 4, Lr(2, Ts), 1e-9);
	check('P3', sigma * 1e12, 5.67e4, 0.0005);
	const rp = Math.sqrt(S.proxima.L) / (S.proxima.T / Ts) ** 2;
	check('P4 sqrt', Math.sqrt(S.proxima.L), 0.03959, 0.0005); check('P4 T2', (S.proxima.T / Ts) ** 2, 0.2687, 0.0005);
	check('P4 R', rp, 0.147, 0.003); check('P4 5%', 1 - rp / S.proxima.R, 0.045, 0.1);
	check('P5 R2', 0.793 ** 2, 0.6288, 1e-4); check('P5 T4', (5320 / Ts) ** 4, 0.7217, 1e-4);
	const lt = Lr(S.tauCeti.R, S.tauCeti.T);
	check('P5 L', lt, 0.454, 0.001); check('P5 vs488', 1 - lt / S.tauCeti.L, 0.07, 0.03); check('P5 vs52', 1 - lt / S.courseTauCetiL, 0.13, 0.03);
	check('P6', 4 * Math.PI * C.earthRadius ** 2 * sigma * 255 ** 4, 1.22e17, 0.003);
	check('P7', sigma * 737 ** 4, 1.67e4, 0.003); check('P7 70', (sigma * 737 ** 4) / 240, 70, 0.005);
	check('P8 2pi5', 2 * Math.PI ** 5, 612.0, 0.0002); check('P8 k4', k ** 4, 3.634e-92, 0.0005);
	check('P8 den', 15 * (2.998e8) ** 2 * (6.626e-34) ** 3, 3.922e-82, 0.001);
	check('P9', Lr(2, 0.8 * Ts), 1.64, 0.002);
	check('P10 rule', (Ts * 0.05) / 4, 72, 0.003); check('P10 exact', Ts * (1 - 0.95 ** 0.25), 73.5, 0.002); check('P10 f', 1 - 0.95 ** 0.25, 0.01274, 0.001);
	check('P11', 5.4e11 / (sigma * 500 ** 4), 1.52e8, 0.003);
	check('P12 R2', 1.7144 ** 2, 2.939, 0.0005); check('P12 T4', (9845 / Ts) ** 4, 8.464, 0.0005); check('P12', Lr(S.sirius.R, S.sirius.T), 24.9, 0.002);
	return report('8.2 The Stefan–Boltzmann law and luminosity');
}
