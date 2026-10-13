import { check, report } from './lib.mjs';
import { C, ENERGY } from './constants.mjs';
export default function () {
	const c = C.c, g0 = C.gStandard, a = ENERGY.aShip;
	check('fig c/RS-25', c / ENERGY.rs25Ve, 70000, 0.04); check('fig c/ion50', c / 50e3, 6000, 0.001);
	check('Isp 452', 452 * g0, 4436, 0.001);
	check('WE1 F', ENERGY.rs25Mdot * ENERGY.rs25Ve, 2.282e6, 0.001); check('WE1 vs wiki', ENERGY.rs25Mdot * ENERGY.rs25Ve, ENERGY.rs25ThrustVac, 0.002);
	check('WE1 Isp', ENERGY.rs25Ve / 9.807, 452, 0.001);
	const mdot2 = ENERGY.dimitriMass / ENERGY.dimitriTime;
	check('WE2 mdot', mdot2, 2.0e-4); check('WE2 F', mdot2 * 3.0e8, ENERGY.dimitriForce);
	const F3 = ENERGY.displayRate * c;
	check('WE3 F', F3, 1.812e6, 0.001); check('WE3 m', F3 / a, 1.23e5, 0.002); check('WE3 m via 14.71', 1.812e6 / 14.71, 1.23e5, 0.002);
	check('WE3 dry', ENERGY.massAtDisplay - ENERGY.displayFuel, 1.02e5, 0.003); check('WE3 ISS', 1.02e5 / 419725, 0.25, 0.04);
	check('WE4 mdot', 0.092 / 3e4, 3.1e-6, 0.02); check('WE4 P', 0.5 * 0.092 * 3e4, 1380); check('WE4 eta', 1380 / ENERGY.nstarPower, 0.6);
	check('WE4 a', ENERGY.nstarThrust / ENERGY.ds1Launch, 1.9e-4, 0.01); check('WE4 day', (ENERGY.nstarThrust / ENERGY.ds1Launch) * 86400, 16, 0.03);
	check('WE4 % g', ENERGY.nstarThrust / ENERGY.ds1Launch / g0, 2e-5, 0.04);
	const m5 = ENERGY.totalFuel + ENERGY.shipDry;
	check('WE5 mdot', (m5 * 14.71) / 2.998e8, 0.103, 0.003); check('WE5 ratio', 0.103 / ENERGY.displayRate, 17, 0.01);
	check('sim RS-25 flow', F3 / ENERGY.rs25Ve, 400, 0.03);
	check('P1', 100 * 3000, 3e5); check('P2', ENERGY.srbVe / 9.807, 268, 0.001);
	check('P4 W', 5e5 * 9.81, 4.9e6, 0.002); check('P4 mdot', (5e5 * 9.81) / 3000, 1630, 0.004);
	check('P5', 0.006 * 3e8, 1.8e6); check('P6', (0.092 / 486) * 86400, 16.4, 0.003);
	check('P7', (ENERGY.shipDry * 14.71) / 2.998e8, 4.9e-3, 0.003);
	check('P8 a', 4436 / 2, 2218); check('P8 b', 3e4 / 2, 15000); check('P8 c', c / 2218, 135000, 0.002);
	check('P9', m5 / ENERGY.shipDry, 21);
	check('P10', (15000 * 1.62) / 3000, 8.1);
	return report('5.6 Thrust');
}
