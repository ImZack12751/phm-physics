import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T } from './constants.mjs';
export default function () {
	const k = T.k, u = T.u;
	const vg = (g, m, TK) => Math.sqrt((g * k * TK) / (m * u));
	const Tc = (a, b) => (4 * a * b) / (a + b) ** 2;
	// Concept
	check('water 1% pressure', 0.01 * S.BWater, 22e6, 1e-9); check('over 200 atm', (0.01 * S.BWater) / S.atm, 217, 0.01);
	check('water v', Math.sqrt(S.BWater / 1000), 1480, 0.003); check('water table', S.vWaterFresh, 1480, 1e-9);
	check('water 4x', S.vWaterFresh / 343, 4.3, 0.01);
	check('15x', S.vSteel / 343, 17, 0.03); check('15x low', Math.sqrt(S.YSteel / S.rhoSteel) / 343, 15, 0.03);
	check('steel rod', Math.sqrt(S.YSteel / S.rhoSteel), 5050, 0.002); check('steel block', S.vSteel, 5960, 1e-9);
	check('Newton 298 15% low', 1 - S.newtonSpeed / 343, 0.15, 0.15);
	check('gamma mono', 1 + 2 / 3, 5 / 3, 1e-9); check('gamma di', 1 + 2 / 5, 1.4, 1e-9); check('gamma NH3', 1 + 2 / 6, 1.33, 0.003);
	check('sqrt 1.4', Math.sqrt(1.4), 1.18, 0.003);
	check('331 at 0', vg(1.4, S.mAir, 273.15), 331, 0.002); check('343 at 20', vg(1.4, S.mAir, 293.15), 343, 0.002);
	check('He seventh', S.mHe / S.mAir, 1 / 7, 0.04); check('He ~3x', vg(1.66, S.mHe, 293.15) / vg(1.4, S.mAir, 293.15), 2.93, 0.003);
	check('Xe 4.5x', S.mXe / S.mAir, 4.5, 0.01); check('Xe 176', vg(1.66, S.mXe, 293.15), 176, 0.003);
	check('68%', Math.sqrt(1.4 / 3), 0.683, 0.001);
	const Te = 483.15, Pe = T.eridPressureAtm * S.atm;
	const ve = vg(S.gammaNH3, S.mNH3, Te), re = (Pe * S.mNH3 * u) / (k * Te), Ze = re * ve;
	check('Erid v', ve, 556, 0.002); check('Erid 1.6x', ve / 343, 1.62, 0.003);
	check('Erid lam', ve / 440, 1.26, 0.003); check('Grace lam', 343 / 440, 0.78, 0.001);
	check('Erid 10x density', re / S.air20.rho, 10.4, 0.01);
	check('Air->water 0.11%', Tc(S.air20.Z, 1.48e6), 0.0011, 0.02);
	// thick wall model
	const Zx = S.rhoPyrex * S.vPyrex;
	check('thick wall -65', 10 * Math.log10(Tc(S.air20.Z, Zx) * Tc(Zx, Ze)), -65, 0.01);
	check('lam in wall', S.vPyrex / 440, 13, 0.02);
	// Formulas
	check('Newton 290', vg(1, S.mAir, 293.15), 290, 0.002);
	check('table f=3', 1 + 2 / 3, 1.67, 0.002); check('table f=6', 1 + 2 / 6, 1.33, 0.003);
	// WE1
	check('WE1 2.2e6', 2.2e9 / 1000, 2.2e6, 1e-9); check('WE1 v', Math.sqrt(2.2e6), 1480, 0.003);
	check('WE1 Y/rho', 2e11 / 7850, 2.55e7, 0.002); check('WE1 rod', Math.sqrt(2e11 / 7850), 5050, 0.002);
	check('WE1 90x', 2e11 / 2.2e9, 90, 0.02);
	// WE2
	const m = 28.97 * u;
	check('WE2 m', m, 4.81e-26, 0.002);
	check('WE2 kT/m', (1.381e-23 * 293) / 4.81e-26, 8.41e4, 0.002);
	check('WE2 a', Math.sqrt(8.41e4), 290, 0.001); check('WE2 b', Math.sqrt(1.4 * 8.41e4), 343, 0.001);
	// WE3
	const mN = S.mNH3 * u;
	check('WE3 m', mN, 2.828e-26, 0.001);
	check('WE3 v2', (1.31 * 1.381e-23 * 483) / 2.828e-26, 3.09e5, 0.002); check('WE3 v', Math.sqrt(3.09e5), 556, 0.001);
	check('WE3 lam', 556 / 440, 1.26, 0.003);
	check('WE3 rho', (29 * S.atm * 2.828e-26) / (1.381e-23 * 483), 12.5, 0.005);
	check('WE3 Z', 12.5 * 556, 6.9e3, 0.01); check('WE3 Z model', Ze, 6.9e3, 0.005);
	check('WE3 17x', 6.9e3 / 413, 17, 0.02);
	check('WE3 T', Math.sqrt(483 / 293), 1.284, 0.001); check('WE3 m', Math.sqrt(28.97 / 17.03), 1.304, 0.001);
	check('WE3 g', Math.sqrt(1.31 / 1.4), 0.967, 0.001); check('WE3 prod', 1.284 * 1.304 * 0.967, 1.62, 0.003);
	// WE4
	check('WE4 num', 4 * 413 * 1.48e6, 2.445e9, 0.001); check('WE4 den', (413 + 1.48e6) ** 2, 2.191e12, 0.001);
	check('WE4', 2.445e9 / 2.191e12, 1.1e-3, 0.02); check('WE4 dB', 10 * Math.log10(1.1156e-3), -29.5, 0.002);
	check('WE4 reflect', 1 - 0.0011, 0.9989, 1e-9);
	// WE5
	const sig = S.rhoPyrex * 0.01, w = 2 * Math.PI * 440;
	check('WE5 sigma', sig, 22.3, 1e-9); check('WE5 wsig', w * sig, 6.17e4, 0.002);
	check('WE5 Zsum', 6.9e3 + 413, 7.3e3, 0.005); check('WE5 8.4x', 6.17e4 / 7.3e3, 8.4, 0.01);
	check('WE5 num', 4 * 6.9e3 * 413, 1.14e7, 0.001); check('WE5 den', 6.17e4 ** 2, 3.81e9, 0.002);
	check('WE5 frac', 1.14e7 / 3.81e9, 3.0e-3, 0.005); check('WE5 dB', 10 * Math.log10(3.0e-3), -25, 0.01);
	const exact = (4 * S.air20.Z * Ze) / ((S.air20.Z + Ze) ** 2 + (w * sig) ** 2);
	check('WE5 exact model', 10 * Math.log10(exact), -25, 0.02);
	check('WE5 octave', 10 * Math.log10(4), 6, 0.004);
	// Problems
	check('P1', 1 / Math.sqrt(4), 0.5, 1e-9);
	check('P2 ratio', Math.sqrt(313 / 273), 1.071, 0.001); check('P2', 331 * Math.sqrt(313 / 273), 354, 0.002);
	check('P4 v2', 4.5e9 / 1260, 3.57e6, 0.002); check('P4', Math.sqrt(4.5e9 / 1260), 1890, 0.002);
	check('P5 v2', 7e10 / 2700, 2.59e7, 0.002); check('P5', Math.sqrt(7e10 / 2700), 5090, 0.001); check('P5 1%', 1 - 5090 / S.vAl, 0.006, 0.4);
	check('P6 v2', (1.66 * 1.381e-23 * 273) / 6.646e-27, 9.42e5, 0.002); check('P6 v', Math.sqrt(9.42e5), 970, 0.002);
	check('P6 He mass', S.mHe * u, 6.646e-27, 0.001); check('P6 0.6%', 970 / S.vHe - 1, 0.006, 0.2);
	check('P7 mass', S.mXe * u, 2.18e-25, 0.002);
	check('P7 v2', (1.66 * 1.381e-23 * 293) / 2.18e-25, 3.08e4, 0.002); check('P7 v', Math.sqrt(3.08e4), 176, 0.003);
	check('P7 lam', 176 / 440, 0.4, 1e-9);
	check('P9 a', 556 / 300, 1.85, 0.003); check('P9 b', 343 / 300, 1.14, 0.003);
	check('P10 rms', Math.sqrt(3 * 8.41e4), 502, 0.001); check('P10 v', 0.683 * 502, 343, 0.001);
	check('P11 a', -25 - 6, -31, 1e-9); check('P11 b', -25 + 12, -13, 1e-9);
	const w110 = 2 * Math.PI * 110;
	check('P11 w', w110, 691, 0.001); check('P11 wsig', 691 * 22.3, 1.54e4, 0.002); check('P11 2.1x', 1.54e4 / 7.3e3, 2.1, 0.01);
	check('P11 full', 10 * Math.log10((4 * 413 * 6.9e3) / (7313 ** 2 + (w110 * 22.3) ** 2)), -14, 0.01);
	check('P12', (343 / 290) ** 2, 1.4, 0.001);
	check('P13 rho', 12.5 / 29, 0.43, 0.003); check('P13 Z', 0.43 * 556, 239, 0.001); check('P13 dB', 10 * Math.log10(29), 14.6, 0.002);
	return report('11.3 The speed of sound in different media');
}
