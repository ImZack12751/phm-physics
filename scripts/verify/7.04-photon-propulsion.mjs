import { check, report } from './lib.mjs';
import { WAVES as W, ENERGY as EN, GRAV, C } from './constants.mjs';
const c = C.c, h = C.h, S = C.solarIrradiance, L = C.sunLuminosity;
const GM = GRAV.G * C.sunMass;
export default function () {
	const Ep = (h * c) / W.petrova;
	// Concept
	check('Nichols', W.nicholsHull, 0.006, 1e-9);
	check('sun pressure', S / c, 4.5e-6, 0.01); check('hundred-billionth', S / c / 101325, 4.5e-11, 0.01);
	check('IKAROS', W.ikarosForce, 1.12e-3, 1e-9); check('IK side', Math.sqrt(W.ikarosArea), 14, 1e-9);
	check('sigma crit', L / (2 * Math.PI * c * GM), 1.53e-3, 0.002);
	check('100 t at 1.5 g > 1e14 W', 1e5 * 1.5 * C.gStandard * c, 4.41e14, 0.002);
	check('GM', GM, 1.327e20, 0.0005);
	// WE1
	check('WE1 p', Ep / c, 2.55e-29, 0.002);
	const N = 5.4e14 / Ep;
	check('WE1 N', N, 7.06e34, 0.002); check('WE1 F', N * (Ep / c), 1.8e6, 0.001); check('WE1 F2', EN.drivePowerBook / c, 1.8e6, 0.001);
	check('WE1 F rounded', 7.06e34 * 2.55e-29, 1.8e6, 0.001);
	check('WE1 m', 1.8e6 / (1.5 * 9.81), 1.22e5, 0.003); check('WE1 vs 5.6', EN.massAtDisplay, 1.23e5, 0.003);
	// WE2
	check('WE2 black', S / c, 4.54e-6, 0.001); check('WE2 mirror', (2 * S) / c, 9.08e-6, 0.001); check('WE2 ratio', 4.54e-6 / 101325, 4.5e-11, 0.005);
	// WE3
	const Fi = (2 * S * W.ikarosArea) / c;
	check('WE3 ideal', Fi, 1.78e-3, 0.002); check('WE3 63%', W.ikarosForce / Fi, 0.63, 0.002);
	const a = W.ikarosForce / W.ikarosMass;
	check('WE3 a', a, 3.61e-6, 0.002); check('WE3 yr s', C.julianYear, 3.156e7, 0.0005); check('WE3 dv', a * C.julianYear, 114, 0.002);
	check('WE3 day', a * 86400, 0.31, 0.01); check('WE3 3yr', 3 * a * C.julianYear, 340, 0.01);
	// WE4
	const m = (4 / 3) * Math.PI * (5e-6) ** 3 * 1000, A = Math.PI * (5e-6) ** 2;
	check('WE4 m', m, 5.24e-13, 0.002); check('WE4 A', A, 7.85e-11, 0.002);
	const beta = (L * A) / (4 * Math.PI * c * GM * m);
	check('WE4 beta', beta, 0.115, 0.003);
	// WE5
	const P25 = 0.5 * EN.rs25Mdot * EN.rs25Ve ** 2;
	check('WE5 P', P25, 5.06e9, 0.002); check('WE5 F/P', EN.rs25ThrustVac / P25, 4.5e-4, 0.002); check('WE5 1/c', 1 / c, 3.34e-9, 0.002);
	check('WE5 ratio', (EN.rs25ThrustVac / P25) * c, 1.35e5, 0.003); check('WE5 c/ve', c / EN.rs25Ve, 6.76e4, 0.002);
	// Problems
	check('P1', h / 540e-9, 1.23e-27, 0.003);
	check('P3', 1 / c, 3.34e-9, 0.002);
	check('P4', 586.2 / c, 1.96e-6, 0.003);
	check('P5', EN.dimitriEnergy / c, 6.0, 0.001); check('P5 b', EN.dimitriForce * EN.dimitriTime, 6.0, 1e-9);
	check('P6', (1e-3 * c) / (2 * S), 110, 0.002); check('P6 side', Math.sqrt(110), 10.5, 0.002);
	check('P7', C.venusIrradiance / S, 1.91, 0.002);
	check('P8 F', 1e5 * 1.5 * 9.81, 1.47e6, 0.002); check('P8 P', 1.47e6 * c, 4.41e14, 0.001); check('P8 mdot', 1.47e6 / c, 4.9e-3, 0.002);
	const sf = 7.5e-6 * 1400;
	check('P9 sigma', sf, 1.05e-2, 1e-9); check('P9 beta', 1.53 / 10.5, 0.146, 0.002); check('P9 seven', 10.5 / 1.53, 7, 0.02);
	check('P9 probe', W.ikarosMass / W.ikarosArea, 1.58, 0.002);
	check('P9 probe beta', (2 * L * W.ikarosArea) / (4 * Math.PI * c * GM * W.ikarosMass), 0.001, 0.04);
	check('P10', 1 / beta, 8.7, 0.002);
	check('P11 ratio', Math.exp(0.92), 2.51, 0.002); check('P11 frac', 1 - 1 / Math.exp(0.92), 0.6, 0.003);
	check('P11 rel', Math.sqrt(1.92 / 0.08), 4.9, 0.001); check('P11 rel frac', 1 - 1 / Math.sqrt(1.92 / 0.08), 0.8, 0.006);
	const Fl = (2 * 10e9) / c;
	check('P12 F', Fl, 66.7, 0.001); check('P12 a', Fl / 1e-3, 6.67e4, 0.001); check('P12 g', Fl / 1e-3 / C.gStandard, 6800, 0.002);
	check('P12 t', (0.2 * c) / 6.67e4, 899, 0.001);
	return report('7.4 The momentum of light and photon propulsion');
}
