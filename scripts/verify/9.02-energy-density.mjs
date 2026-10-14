import { check, report } from './lib.mjs';
import { MASSENERGY as M, ENERGY as EN, C } from './constants.mjs';
const c = C.c, c2 = c * c, s = M.spec;
const vmax = (e) => Math.sqrt(2 * e);
export default function () {
	// Concept
	check('h2 gas per L', 0.01188, 0.012, 0.011); check('petrol vs h2 gas', 34.2 / 0.01188, 3000, 0.05);
	check('chem 150', s.h2 / 1e6, 142, 0.001); check('fission', s.uranium / 1e6, 8.0e7, 0.01); check('fusion', s.dtFusion / 1e6, 3.4e8, 0.01);
	check('c2 MJ', c2 / 1e6, 9.0e10, 0.002);
	check('gram TNT t', (1e-3 * c2) / s.tnt / 1000, 21000, 0.03); check('gram liion t', (1e-3 * c2) / s.liion[1] / 1000, 100000, 0.03);
	const mix = s.h2 / 9;
	check('mix', mix / 1e6, 15.8, 0.003); check('ve h2', vmax(mix) / 1000, 5.6, 0.003); check('rs25 frac', EN.rs25Ve / vmax(mix), 0.79, 0.002);
	check('ve U', vmax(s.uranium), 1.27e7, 0.002); check('U %c', vmax(s.uranium) / c, 0.042, 0.01);
	check('ve DT', vmax(s.dtFusion), 2.6e7, 0.002); check('DT %c', vmax(s.dtFusion) / c, 0.087, 0.005);
	check('fig U km/s', vmax(s.uranium) / 1000, 12698, 0.0005); check('fig DT km/s', vmax(s.dtFusion) / 1000, 25976, 0.0005);
	check('sqrt2 c', Math.sqrt(2), 1.414, 0.001);
	// Table at 0.1c
	const dv = 0.1 * c;
	check('tab chem x', dv / EN.rs25Ve, 6758, 0.001); check('tab chem log', dv / EN.rs25Ve / Math.LN10, 2935, 0.001);
	check('tab ion x', dv / 30000, 999, 0.001); check('tab ion log', dv / 30000 / Math.LN10, 434, 0.001);
	check('tab U x', dv / vmax(s.uranium), 2.36, 0.002); check('tab U R', Math.exp(dv / vmax(s.uranium)), 10.6, 0.002);
	check('tab DT x', dv / vmax(s.dtFusion), 1.15, 0.004); check('tab DT R', Math.exp(dv / vmax(s.dtFusion)), 3.2, 0.01);
	check('tab light', Math.exp(0.1), 1.105, 0.0005); check('rel 0.1', Math.sqrt(1.1 / 0.9), 1.106, 0.0005);
	// WE1
	const Eg = 1e-3 * c2;
	check('WE1 E', Eg, 8.99e13, 0.001); check('WE1 GWh', Eg / 3.6e12, 25.0, 0.002); check('WE1 bat', Eg / 0.875e6, 1.03e8, 0.003);
	check('WE1 ratio', c2 / 0.875e6, 1e11, 0.03);
	// WE2
	const E2 = EN.totalFuel * c2;
	check('WE2 E', E2, 1.8e23, 0.002); check('WE2 petrol', E2 / s.gasoline, 3.9e15, 0.01); check('WE2 V', EN.totalFuel / 1000, 2000, 1e-9);
	check('WE2 cube', Math.cbrt(2000), 12.6, 0.001);
	// WE3
	check('WE3 eps', 141.86 / 9, 15.8, 0.003); check('WE3 v', Math.sqrt(2 * 1.576e7), 5.61e3, 0.001); check('WE3 frac', 4.436 / 5.61, 0.79, 0.002);
	// WE4
	check('WE4 dv', 0.1 * c, 3.0e7, 0.001);
	check('WE4 Ux', 3.0 / 1.27, 2.36, 0.001); check('WE4 Uf', Math.exp(2.36) - 1, 9.6, 0.005); check('WE4 Ut', 9.6 * 100, 960, 1e-9);
	check('WE4 Dx', 3.0 / 2.6, 1.154, 0.0005); check('WE4 Df', Math.exp(1.154) - 1, 2.17, 0.002); check('WE4 L', Math.exp(0.1) - 1, 0.105, 0.002);
	check('WE4 twenty', 217 / 10.5, 20, 0.04);
	// WE5
	const P = 2e12 * 250, md = P / c2;
	check('WE5 P', P, 5.0e14, 1e-9); check('WE5 mdot', md, 5.6e-3, 0.01); check('WE5 t', 2e6 / md, 3.6e8, 0.003); check('WE5 yr', 2e6 / md / C.julianYear, 11, 0.04);
	check('WE5 per day t', md * 86400 / 1000, 0.5, 0.04);
	// Problems
	check('P2', c2 / s.tnt, 2.15e10, 0.002);
	check('P3 fat', 8.64 / 38, 0.23, 0.02); check('P3 astro', 8.64e6 / c2, 9.6e-11, 0.002); check('P3 day', 100 * 86400, 8.64e6, 1e-9);
	check('P4', c2 / 3.42e7, 2.6e9, 0.02);
	check('P5', vmax(8.062e13), 1.27e7, 0.001);
	const OF = (18.5 * 31.998) / 170.33;
	check('P6 OF', OF, 3.48, 0.002); check('P6 eps', 43 / 4.48, 9.6, 0.002); check('P6 v', Math.sqrt(2 * 9.6e6), 4.4e3, 0.005);
	check('P7', Math.exp(10 / 4.436), 9.5, 0.003); check('P7 x', 10 / 4.436, 2.25, 0.002);
	check('P8', 5.24e-13 * c2, 4.7e4, 0.003);
	check('P10 x', 3.0e6 / 4436, 676, 0.001); check('P10 log', 676 / Math.LN10, 294, 0.002);
	check('P11 f', Math.exp(9.0 / 2.6) - 1, 30.9, 0.003); check('P11 l', Math.exp(0.3) - 1, 0.35, 0.002);
	const P12 = 2e12 * 1361;
	check('P12 P', P12, 2.72e15, 0.001); check('P12 m', P12 / c2, 0.03, 0.01); check('P12 yr', 2e6 / (P12 / c2) / C.julianYear, 2.1, 0.02);
	check('P12 s', 2e6 / (P12 / c2), 6.6e7, 0.01);
	return report('9.2 Energy density: chemical to Astrophage');
}
