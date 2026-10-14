import { check, report } from './lib.mjs';
import { MASSENERGY as M, ENERGY as EN, THERMAL as T, WAVES as W, C } from './constants.mjs';
const c = C.c, c2 = c * c;
export default function () {
	const H4 = 4 * M.mH, dm = H4 - M.mHe4;
	// Concept
	check('c2', c2, 8.988e16, 0.0001); check('world hours', c2 / EN.worldPower / 3600, 1.25, 0.03);
	check('coffee ng', (0.25 * T.cWater * 60) / c2 * 1e12, 0.7, 0.002);
	check('chem billionth', M.spec.gasoline / c2, 1e-9, 0.5);
	check('0.7%', dm / H4, 0.007, 0.02); check('sun loss', C.sunLuminosity / c2, 4.26e9, 0.001); check('4 million t', C.sunLuminosity / c2 / 1000, 4e6, 0.07);
	check('fission 0.09%', M.spec.uranium / c2, 0.0009, 0.005); check('DT 0.4%', M.spec.dtFusion / c2, 0.004, 0.07);
	check('511', M.electronMeV * 1000, 511, 0.001);
	check('fig TNT %', (M.spec.tnt / c2) * 100, 4.7e-9, 0.02); check('fig gas %', (M.spec.gasoline / c2) * 100, 5.2e-8, 0.01);
	check('fig H %', (M.spec.h2 / c2) * 100, 1.6e-7, 0.02); check('fig U %', (M.spec.uranium / c2) * 100, 0.09, 0.005); check('fig DT %', (M.spec.dtFusion / c2) * 100, 0.38, 0.02);
	check('drive 543', EN.displayRate * c2, 5.43e14, 0.001); check('dimitri', EN.dimitriMass * c2, 1.8e9, 0.002);
	// WE1
	check('WE1 1kg', c2, 8.988e16, 0.0001); check('WE1 1g', 1e-3 * c2, 8.988e13, 0.0001);
	check('WE1 t', c2 / 1.96e13, 4590, 0.001); check('WE1 h', c2 / 1.96e13 / 3600, 1.3, 0.03);
	const Ey = EN.worldPower * C.julianYear;
	check('WE1 Ey', Ey, 6.19e20, 0.001); check('WE1 m', Ey / c2, 6880, 0.002);
	// WE2
	check('WE2 E', 20e-9 * c2, 1.8e9, 0.002); check('WE2 P', 6.043e-3 * c2, 5.43e14, 0.001);
	check('WE2 grace', 6e-3 * (3e8) ** 2, 5.4e14, 1e-9); check('WE2 TNT', (20e-9 * c2) / M.spec.tnt, 430, 0.003);
	// WE3
	const ms = C.sunLuminosity / c2, life = ms * 4.6e9 * C.julianYear;
	check('WE3 rate', ms, 4.26e9, 0.001); check('WE3 total', life, 6.2e26, 0.003); check('WE3 frac', life / 1.988e30, 0.00031, 0.005);
	check('WE3 earths', life / C.earthMass, 100, 0.05);
	// WE4
	check('WE4 4H', H4, 4.0313, 1e-5); check('WE4 dm', 4 * 1.007825 - 4.002603, 0.028697, 1e-5);
	check('WE4 frac', 0.028697 / 4.0313, 0.00712, 0.001); check('WE4 MeV', 0.028697 * 931.5, 26.7, 0.002); check('WE4 MeV exact', dm * M.uMeV, 26.73, 0.001);
	check('WE4 H rate', 4.26e9 / 0.00712, 6.0e11, 0.003);
	// WE5
	const Q = 0.25 * T.cWater * 60;
	check('WE5 Q', Q, 6.28e4, 0.001); check('WE5 dm', Q / c2, 7.0e-13, 0.003); check('WE5 ppt', Q / c2 / 0.25, 2.8e-12, 0.003);
	// Problems
	check('P1', 1e-6 * c2, 8.99e10, 0.001);
	check('P2', 3.6e6 / c2, 4.0e-11, 0.002);
	const me = 9.109e-31 * c2;
	check('P4 J', me, 8.187e-14, 0.0005); check('P4 MeV', me / 1.602e-13, 0.511, 0.001);
	check('P5', 1240 / 5.11e5, 2.43e-3, 0.002);
	const dt = M.mD + M.mT - M.mHe4 - M.mn;
	check('P6 before', 2.014102 + 3.016049, 5.030151, 1e-7); check('P6 after', 4.002603 + 1.008665, 5.011268, 1e-7);
	check('P6 dm', dt, 0.018883, 1e-4); check('P6 MeV', 0.018883 * 931.5, 17.6, 0.001);
	check('P6 frac', 0.018883 / 5.030151, 0.00375, 0.002); check('P6 J/kg', 0.003754 * c2, 3.37e14, 0.002); check('P6 table', M.spec.dtFusion, 3.37e14, 0.002);
	check('P7 E', EN.totalFuel * c2, 1.8e23, 0.002); check('P7 yr', (EN.totalFuel * c2) / Ey, 290, 0.005);
	check('P8', 0.01 * (C.sunLuminosity / c2), 4.26e7, 0.001);
	check('P9', (1.8e9 * 10) / (1000 * c2), 2.0e-10, 0.002);
	const Ep = 50 * 34.2e6;
	check('P10 E', Ep, 1.71e9, 1e-9); check('P10 dm', Ep / c2, 1.9e-8, 0.002); check('P10 frac', Ep / c2 / 37, 5.1e-10, 0.01);
	check('P11 kg', (0.0477 * 1.602e-19) / c2, 8.5e-38, 0.002); check('P11 ratio', 0.511e6 / 0.0477, 1.07e7, 0.002);
	check('P11 petrova eV', (C.h * c) / W.petrova / W.eV, 0.0477, 0.001);
	check('P12', 133 / c2, 1.5e-15, 0.02);
	return report('9.1 E = mc²');
}
