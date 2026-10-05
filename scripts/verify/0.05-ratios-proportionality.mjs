import { check, report } from './lib.mjs';
import { C } from './constants.mjs';

const auM = 1.496e11;
export default function () {
	check('gravity ratio', 14.7 / 9.81, 1.5, 0.005);
	check('WE1', 0.99 * 1361, 1347, 1e-3);
	check('WE1 drop', 0.01 * 1361, 14, 0.03);
	check('WE2 r^2', auM ** 2, 2.238e22, 1e-3);
	check('WE2 4πr²', 4 * Math.PI * auM ** 2, 2.812e23, 1e-3);
	check('WE2 I', C.sunLuminosity / (4 * Math.PI * auM ** 2), 1361, 1e-3);
	check('WE3 ratio', (1.496 / 1.082) ** 2, 1.912, 1e-3);
	check('WE3 I', 1361 * (1.496 / 1.082) ** 2, 2602, 1e-3);
	check('WE3 vs NASA', 1361 * (1.496 / 1.082) ** 2, C.venusIrradiance, 1e-3);
	check('WE3 closer %', 1 - 1.082 / 1.496, 0.28, 0.02);
	check('WE4', Math.sqrt(0.52), 0.72, 0.005);
	check('P2', 3 * (60 / 90), 2);
	check('P5', 1361 / 1.524 ** 2, 586.0, 1e-3);
	check('P5 vs NASA', 1361 / (227.956 / 149.598) ** 2, 586.2, 1e-3);
	check('P6 fraction', 1 / 5.204 ** 2, 0.0369, 2e-3);
	check('P6 I', 1361 / 5.204 ** 2, 50.3, 2e-3);
	check('P7 r', Math.sqrt(0.95), 0.9747, 1e-4);
	check('P7 km', (1 - Math.sqrt(0.95)) * 1.496e8, 3.8e6, 0.01);
	check('P8', 3 ** 3, 27);
	check('P9', 0.52 * 1361, 708, 1e-3);
	check('P10 au', Math.sqrt(1361 / 2000), 0.825, 1e-3);
	check('P10 m', Math.sqrt(1361 / 2000) * auM, 1.23e11, 0.005);
	check('P11 area', Math.PI * (5e-6) ** 2, 7.85e-11, 1e-3);
	check('P11 P', 136100 * Math.PI * (5e-6) ** 2, 1.07e-5, 0.005);
	const Itc = (0.52 * C.sunLuminosity) / (4 * Math.PI * 1.127e17 ** 2);
	check('P12a', Itc, 1.25e-9, 0.005);
	check('P12 denominator', 4 * Math.PI * 1.127e17 ** 2, 1.596e35, 1e-3);
	check('P12b', 1361 / Itc, 1.09e12, 0.005);
	check('P12c au', Math.sqrt(1361 / Itc), 1.04e6, 0.005);
	check('ly in au', C.lightYear / C.au, 63240, 1e-3);
	check('P12c ly', Math.sqrt(1361 / Itc) / 63240, 16.5, 0.005);
	return report('0.5 Ratios and proportionality');
}
