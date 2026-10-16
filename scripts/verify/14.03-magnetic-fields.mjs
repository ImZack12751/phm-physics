import { check, report } from './lib.mjs';
import { C, MAGNET as M, PARTICLES as P, REL } from './constants.mjs';
// Størmer check: in the equatorial plane of a dipole (lengths in planet radii), a path's direction turns as
// dθ/ds = −κ/r³ with κ = cB₀R/rigidity. A vertical arrival, traced backwards from the surface, escapes to infinity only
// if κ is below the critical value, which Størmer's theory puts at 4 (cutoff = cB₀R/4).
function escapes(kappa) {
	let x = 1, y = 0, th = 0;
	const ds = 1e-3;
	for (let i = 0; i < 4e6; i++) {
		const r = Math.hypot(x, y);
		if (r > 60) return true;
		if (r < 0.999 && i > 10) return false;
		th -= (kappa / r ** 3) * ds;
		x += Math.cos(th) * ds; y += Math.sin(th) * ds;
	}
	return false;
}
export default function () {
	const c = C.c, e = P.e, me = P.me, mp = P.mp, mu0 = M.mu0, B0 = M.B0, RE = C.earthRadius, mpc2 = REL.protonMeV;
	const pcK = (K) => Math.sqrt((K + mpc2) ** 2 - mpc2 ** 2), Kpc = (pc) => Math.sqrt(pc * pc + mpc2 * mpc2) - mpc2;
	const cBR = (c * B0 * RE) / 1e9; // GV
	let lo = 2, hi = 6;
	for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2; if (escapes(m)) lo = m; else hi = m; }
	check('Stormer kappa = 4', lo, 4, 0.005);
	// Concept
	check('2 radii x8', 2 ** 3, 8, 1e-9);
	check('108 km/GV', 1e9 / (c * B0) / 1000, 108, 0.005);
	check('10 GeV rig', pcK(10000) / 1000, 10.9, 0.001); check('1200 km', pcK(10000) * 1e6 / (c * B0) / 1000, 1200, 0.03); check('fifth', 1172.6 / 6371, 0.2, 0.1);
	check('6.2e18', 1 / e, 6.2e18, 0.01);
	check('wire 2 mT', (mu0 * 100) / (2 * Math.PI * 0.01), 2e-3, 0.001); check('x100', 2e-3 / B0, 100, 0.4);
	check('cBR 59', cBR, 59, 0.005); check('cutoff 14.8', cBR / 4, 14.8, 0.001); check('K 13.9', Kpc(cBR / 4 * 1000) / 1000, 13.9, 0.002);
	check('45', (cBR / 4) * Math.cos(Math.PI / 4) ** 4, 3.7, 0.001); check('60', (cBR / 4) * Math.cos(Math.PI / 3) ** 4, 0.9, 0.03);
	check('Erid 50x', M.eridField * M.eridRadius, 50, 1e-9); check('Erid 740', 50 * cBR / 4, 740, 0.001);
	const mpd = (n, v) => ((2 * B0 * B0) / (mu0 * n * 1e6 * mp * v * v)) ** (1 / 6);
	check('mp 10', mpd(M.sw.n, M.sw.v), 10, 0.01);
	check('11%', 1 - 2 ** (-1 / 6), 0.11, 0.02);
	check('beam pc', (2.4 * (10 / 11) * mpc2) / 1000, 2.05, 0.002); check('beam B', (2.4 * (10 / 11) * mpc2 * 1e6) / (c * 2), 3.4, 0.005);
	const g995 = 1 / Math.sqrt(1 - 0.9952 ** 2);
	check('995 B', (g995 * 0.9952 * mpc2 * 1e6) / (c * 2), 16, 0.01); check('4.6 MJ', 3.4 ** 2 / (2 * mu0), 4.6e6, 0.005);
	// WE1
	check('WE1 re', (9.109e-31 * 1e6) / (1.602e-19 * 3.1e-5), 0.18, 0.02); check('WE1 f', (1.602e-19 * 3.1e-5) / (2 * Math.PI * 9.109e-31), 8.7e5, 0.003);
	check('WE1 rp', (1.673e-27 * 4e5) / (1.602e-19 * 3.1e-5), 135, 0.003);
	check('WE1 exact', (me * 1e6) / (e * B0), 0.18, 0.02);
	// WE2
	check('WE2 pc1', pcK(1000), 1696, 0.0005); check('WE2 R', 1.696, 1.7, 0.003);
	check('WE2 r1', 1.696e9 / (2.998e8 * 3.1e-5), 1.82e5, 0.003); check('WE2 pc10', pcK(10000), 10898, 0.0002);
	check('WE2 r10', 182 * 10898 / 1696, 1170, 0.002);
	// WE3
	check('WE3 cBR', 2.998e8 * 3.1e-5 * 6.371e6, 5.92e10, 0.001); check('WE3 /4', 59.2 / 4, 14.8, 1e-9);
	check('WE3 45', 14.8 * 0.25, 3.7, 1e-9); check('WE3 60', 14.8 * 0.0625, 0.93, 0.01);
	check('WE3 K0', Math.sqrt(14802 ** 2 + 938.3 ** 2) - 938.3, 13900, 0.002); check('WE3 K45', Kpc(3700), 2880, 0.002); check('WE3 K60', Kpc(925), 380, 0.01);
	// WE4
	check('WE4', 50 * 14.8, 740, 1e-9); check('WE4 K', Kpc(740000) / 1000, 740, 0.002);
	check('WE4 root', 25 ** (1 / 6), 1.71, 0.001); check('WE4 mp', 9.9 * 1.71, 17, 0.005); check('WE4 34', 17 * 2, 34, 1e-9);
	check('WE4 exact', mpd(M.sw.n, M.sw.v) * 25 ** (1 / 6), 17, 0.005);
	// WE5
	check('WE5 pc', 2.4 * 0.909 * 938.3, 2047, 0.0005); check('WE5 B', 2.047e9 / (2.998e8 * 2), 3.4, 0.005);
	check('WE5 g', g995, 10.22, 0.001); check('WE5 pc2', 10.22 * 0.9952 * 938.3, 9544, 0.0005); check('WE5 B2', 9.544e9 / (2.998e8 * 2), 15.9, 0.002);
	check('WE5 u', 3.4 ** 2 / (2 * 1.2566e-6), 4.6e6, 0.005);
	// Problems
	check('P1', 1.602e-19 * 4e5 * 3.1e-5, 2.0e-18, 0.01); check('P1 W', 1.673e-27 * 9.81, 1.6e-26, 0.03); check('P1 r', 1.99e-18 / 1.641e-26, 1.2e8, 0.02);
	check('P2', (1.2566e-6 * 100) / (2 * Math.PI * 0.01), 2.0e-3, 0.001); check('P2 x', 2.0e-3 / 3.1e-5, 65, 0.01);
	check('P3', (1.602e-19 * 1.5) / (2 * Math.PI * 1.673e-27), 2.29e7, 0.002);
	check('P4', 31e-6 / 60.3 ** 3, 1.4e-10, 0.02); check('P4 moon', C.moonDistance / RE, 60.3, 0.001);
	const v6 = Math.sqrt((2 * 1e4 * 1.602e-19) / 9.109e-31);
	check('P6 v', v6, 5.9e7, 0.01); check('P6 c', v6 / c, 0.2, 0.02); check('P6 r', (9.109e-31 * 5.93e7) / (1.602e-19 * 5.8e-5), 5.8, 0.01);
	check('P7 cos4', Math.cos(Math.PI / 6) ** 4, 0.5625, 1e-9); check('P7 R', 14.8 * 0.5625, 8.33, 0.001); check('P7 K', Kpc(8326), 7440, 0.002);
	const quiet = 3e6 * 1.673e-27 * 3e5 ** 2, storm = 10e6 * 1.673e-27 * 7.5e5 ** 2, num = (2 * 3.1e-5 ** 2) / 1.2566e-6;
	check('P8 q', quiet, 4.5e-10, 0.005); check('P8 num', num, 1.53e-3, 0.002); check('P8 qr', num / quiet, 3.4e6, 0.01); check('P8 q6', (num / quiet) ** (1 / 6), 12.3, 0.005);
	check('P8 s', storm, 9.4e-9, 0.002); check('P8 sr', num / storm, 1.6e5, 0.02); check('P8 s6', (num / storm) ** (1 / 6), 7.4, 0.005);
	check('P9', (4 * Math.PI * 3.1e-5 * 6.371e6 ** 3) / 1.2566e-6, 8.0e22, 0.005);
	check('P10 E', 3.1e-5 ** 2 / (2 * 1.2566e-6), 3.8e-4, 0.01); check('P10 Erid', (25 * 3.1e-5) ** 2 / (2 * 1.2566e-6), 0.24, 0.005);
	check('P10 air', 29 * 101325, 2.9e6, 0.02);
	check('P11 ln', Math.log(1.01e5 / 3.8e-4), 19.4, 0.002); check('P11 h', 8.5 * 19.4, 165, 0.001);
	check('P12 V', (4 / 3) * Math.PI * 27, 113, 0.002); check('P12 E', 4.6e6 * 113, 5.2e8, 0.002);
	check('P12 m', 5.2e8 / 8.99e16, 5.8e-9, 0.003); check('P12 atm', 4.6e6 / 101325, 45, 0.01);
	return report('14.3 Magnetic fields');
}
