import { check, report } from './lib.mjs';
import { C, ENERGY } from './constants.mjs';
export default function () {
	const c = C.c, P = ENERGY.displayRate * c * c, F = ENERGY.displayRate * c;
	check('kWh', 1000 * 3600, 3.6e6);
	check('fig RS-25', 0.5 * ENERGY.rs25Mdot * ENERGY.rs25Ve ** 2, 5.06e9, 0.002);
	check('fig sunlight', C.solarIrradiance * Math.PI * C.earthRadius ** 2, 1.74e17, 0.003);
	check('fig/WE2 drive', P, 5.43e14, 0.001); check('28x', P / ENERGY.worldPower, 28, 0.02);
	check('trillionth', P / C.sunLuminosity, 1.4e-12, 0.02);
	check('P/F Dimitri', ENERGY.dimitriEnergy / ENERGY.dimitriTime / ENERGY.dimitriForce, 3.0e8, 0.001);
	check('1000 km/s', 1e6 / c, 0.0033, 0.02);
	check('WE1', (80 * 14.71 * 3) / 4, 883, 0.001); check('WE1 x9', 883 / ENERGY.humanPower, 8.8, 0.01);
	check('WE2 Grace', 0.006 * 9e16, ENERGY.drivePowerBook); check('WE2 ratio', P / ENERGY.worldPower, 27.7, 0.002);
	check('WE3 P', ENERGY.dimitriEnergy / ENERGY.dimitriTime, 1.8e13); check('WE3 92%', 1.8e13 / ENERGY.worldPower, 0.92, 0.003);
	check('WE3 kWh', ENERGY.dimitriEnergy / 3.6e6, 500); check('WE3 lamp months', ENERGY.dimitriEnergy / 100 / 86400 / 30.44, 7, 0.03);
	check('WE4 F', F, 1.81e6, 0.002); check('WE4 Fv', F * 0.1 * c, 5.43e13, 0.001); check('WE4 1000', 1000 / 299792, 0.0033, 0.02);
	check('WE5 P', 0.5 * ENERGY.rs25Mdot * ENERGY.rs25Ve ** 2, 5.06e9, 0.002); check('WE5 P/F', ENERGY.rs25Ve / 2, 2218); check('WE5 ratio', c / 2218, 1.35e5, 0.002);
	check('sim 1 µg/s', 1e-9 * c * c, 90e6, 0.002);
	check('P2', 100 * 24 * 3600, 8.64e6);
	check('P4 E', ENERGY.displayFuel * c * c, 1.87e21, 0.003); check('P4 t', ENERGY.displayFuel / ENERGY.displayRate, 3.45e6, 0.002); check('P4 days', ENERGY.displayFuel / ENERGY.displayRate / 86400, 40.0, 0.002);
	check('P5', (20 * 9.81 * 3) / 2, 294, 0.002); check('P5 eta', 294 / 400, 0.74, 0.01);
	check('P6', 3530 / 300, 11.8, 0.003); check('P7', 400 * 30, 12000);
	check('P8', C.sunLuminosity / c ** 2, 4.26e9, 0.002);
	check('P9 v', 14.71 * 86400, 1.27e6, 0.002); check('P9 frac', (14.71 * 86400) / c, 0.0042, 0.01);
	check('P10', 2000 / (1000 * 17.15), 0.117, 0.005);
	return report('5.3 Power');
}
