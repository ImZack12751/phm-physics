import { check, report } from './lib.mjs';
import { STARS as S, THERMAL as T, C, GRAV } from './constants.mjs';
const sigma = T.sigma, R = C.sunRadius, au = C.au, L = C.sunLuminosity, S0 = C.solarIrradiance;
export default function () {
	const dR = au / R;
	// Concept
	check('ground 3/4', 1050 / 1361, 0.77, 0.01);
	check('revision', 1 - S.tsiNew / S.tsiOld, 0.0033, 0.01);
	check('cycle W', S.tsiCycle * S0, 1.4, 0.03);
	check('rp', GRAV.earthPerihelion / au, 0.983, 0.0005); check('ra', GRAV.earthAphelion / au, 1.017, 0.0005);
	check('7%', (GRAV.earthAphelion / GRAV.earthPerihelion) ** 2, 1.07, 0.002);
	check('1% W', 0.01 * S0, 13.6, 0.001); check('ten times', 0.01 / S.tsiCycle, 10, 1e-9);
	check('215', dR, 215, 0.0005); check('0.048', Math.sqrt(1 / (2 * dR)), 0.048, 0.005);
	check('255', 5772 * Math.sqrt(R / (2 * au)) * (1 - T.earthAlbedo) ** 0.25, 255, 0.002);
	check('HZ in', 1 / S.sunHZ[0] ** 2, 1.02, 0.001); check('HZ out', 1 / S.sunHZ[1] ** 2, 0.36, 0.005);
	check('sun ang', ((2 * R) / au) * (180 / Math.PI), 0.533, 0.001);
	// WE1
	const q = (S0 / sigma) ** 0.25;
	check('WE1 ratio', S0 / sigma, 2.4e10, 0.001); check('WE1 q', q, 393.6, 0.0005); check('WE1 sqrt', Math.sqrt(215.0), 14.66, 0.0005);
	check('WE1 T', 393.6 * 14.66, 5772, 0.0005); check('WE1 T exact', q * Math.sqrt(dR), 5772, 0.0005);
	// WE2
	check('WE2 p', 1361 * (149.6 / 147.1) ** 2, 1408, 0.0005); check('WE2 a', 1361 * (149.6 / 152.1) ** 2, 1317, 0.0005);
	check('WE2 ratio', (152.1 / 147.1) ** 2, 1.069, 0.0005);
	check('fig p', S0 / (GRAV.earthPerihelion / au) ** 2, 1408, 0.0005); check('fig a', S0 / (GRAV.earthAphelion / au) ** 2, 1317, 0.0005);
	// WE3
	check('WE3 1%', 0.01 * 1361, 13.6, 0.001); check('WE3 cycle', 0.001 * 1361, 1.4, 0.03); check('WE3 rev', (1365.4 - 1360.9) / 1365.4, 0.0033, 0.01);
	check('WE3 three', 0.01 / 0.0033, 3, 0.02);
	// WE4
	const d = C.tauCetiLy * C.lightYear;
	check('WE4 d', d, 1.127e17, 0.0005);
	const F = (S.courseTauCetiL * L) / (4 * Math.PI * d * d);
	check('WE4 F', F, 1.25e-9, 0.003);
	const A = Math.PI * 3.5e-3 ** 2, Eg = (C.h * C.c) / 550e-9;
	check('WE4 A', A, 3.85e-5, 0.0005); check('WE4 E', Eg, 3.61e-19, 0.001);
	check('WE4 N', (0.39 * F * A) / Eg, 5.2e4, 0.01); check('WE4 trillion', S0 / F, 1e12, 0.1);
	// WE5
	const ds = S.sirius.ly * C.lightYear;
	check('WE5 d', ds, 8.146e16, 0.0005); check('WE5 F given', (S.sirius.L * L) / (4 * Math.PI * ds * ds), 1.136e-7, 0.001);
	check('WE5 L', 4 * Math.PI * ds * ds * 1.136e-7, 9.47e27, 0.001); check('WE5 Lsun', (4 * Math.PI * ds * ds * 1.136e-7) / L, 24.7, 0.002);
	// Problems
	check('P1', 1361 / 5.203 ** 2, 50.3, 0.001);
	check('P2 S', 1361 / 4, 340, 0.001); check('P2 T', 255 / Math.SQRT2, 180, 0.002);
	check('P4', 0.05 * 1361, 68, 0.001);
	check('P5', 0.533 / 1.524, 0.35, 0.002);
	check('P6', 255.1 / Math.sqrt(1.524), 207, 0.002); check('P6 albedo', T.marsAlbedo, 0.25, 1e-9);
	check('P7 a', 0.706 ** 0.25, 0.9167, 0.0002); check('P7 b', Math.sqrt(1 / 430), 0.04822, 0.0002); check('P7', 5772 * 0.9167 * 0.04822, 255, 0.002);
	const Fs = L / (4 * Math.PI * d * d);
	check('P8', Fs, 2.4e-9, 0.002); check('P8 ratio', 1 / 0.52, 1.92, 0.002);
	check('P9 sqrt', Math.sqrt(0.52), 0.721, 0.0005); check('P9 in', 0.99 * Math.sqrt(0.52), 0.71, 0.006); check('P9 out', 1.67 * Math.sqrt(0.52), 1.2, 0.004);
	check('P10 cycle', (255 * 0.001) / 4, 0.064, 0.005); check('P10 1%', (255 * 0.01) / 4, 0.64, 0.005);
	check('P11', (255 * 0.0033) / 4, 0.21, 0.002);
	check('P12 f', (5320 / 5772) ** 4, 0.7217, 0.0002); check('P12', 1361 * (5320 / 5772) ** 4, 982, 0.001); check('P12 28', 1 - (5320 / 5772) ** 4, 0.28, 0.01);
	return report('8.3 The inverse-square law and the solar constant');
}
