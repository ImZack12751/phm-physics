import { check, report } from './lib.mjs';
import { C, BOOK } from './constants.mjs';

const oom = (x) => Math.round(Math.log10(x));
export default function () {
	check('sqrt10', Math.sqrt(10), 3.162, 1e-3);
	check('WE1a', oom(C.earthMass), 25);
	check('WE1b', oom(3.0e8), 8);
	check('WE1c', oom(5.2e-16), -15);
	check('WE1 logs', Math.log10(5.97e24), 24.78, 1e-3);
	check('WE2 rough', 3 * (6.4e6) ** 2 * 1400, 1.7e17, 0.02);
	check('WE2 precise', Math.PI * C.earthRadius ** 2 * C.solarIrradiance, 1.74e17, 0.003);
	check('WE2 1%', 0.01 * 1.74e17, 1.7e15, 0.03);
	check('WE3 shell', 4 * Math.PI * (7e8) ** 2, 6e18, 0.03);
	check('WE3 shell real Sun', 4 * Math.PI * C.sunRadius ** 2, 6e18, 0.03);
	check('WE3 N', (0.01 * 4 * Math.PI * (7e8) ** 2) / 1e-10, 6e26, 0.03);
	check('cell mass', 5.2e-16 * 1000, 5e-13, 0.05);
	check('WE3 mass', 6e26 * 5e-13, 3e14);
	check('WE3 vs atmosphere < 1e-4', 3e14 / 5.1e18 < 1e-4 ? 1 : 0, 1);
	check('WE4', 70 * 60 * 24 * 365 * 3.75, 1.4e8, 0.02);
	check('WE4 50bpm', 50 * 60 * 24 * 365 * 3.75, 1.0e8, 0.02);
	check('WE5', 8 * 60 * 3e8, 1.4e11, 0.03);
	check('P1', [oom(4.2e-3), oom(8.1e5), oom(2.9e3), oom(3.3e-7)].join(','), '-2,6,3,-6');
	check('P3', 80 * Math.PI * 1e7, 2.5e9, 0.01);
	check('P4', 70 * 5.3e5 * 80, 3e9, 0.02);
	check('P5', 6e-4 / 5e-16, 1.2e12, 0.01);
	check('P6', 1.2 * 50, 60);
	check('P7', 5.1e18 / 4e11, 1.3e7, 0.02);
	check('P8 cells', BOOK.fuelKg / 5e-13, 4e18);
	check('P8 area', (BOOK.fuelKg / 5e-13) * 1e-10, 4e8);
	check('P9', (7e8 / 6.4e6) ** 3, 1.3e6, 0.01);
	check('P9 NASA', (C.sunRadius / C.earthRadius) ** 3, 1.304e6, 0.003);
	check('P11 v', 5000 / 3600, 1.4, 0.01);
	check('P11 s', 1.1e17 / 1.4, 8e16, 0.02);
	check('P11 yr', 8e16 / (Math.PI * 1e7), 2.5e9, 0.02);
	check('P12 factor', (1.1e11 / 7e8) ** 2, 2.5e4, 0.02);
	check('P12 N', 6e26 * 2.5e4, 1.5e31);
	return report('0.10 Estimation');
}
