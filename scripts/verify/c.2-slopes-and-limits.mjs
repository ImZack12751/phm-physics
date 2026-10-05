import { check, report } from './lib.mjs';
const d = (t) => 7.35 * t * t;
const T = 4.737, D = (t) => 2 ** ((t - 9) / T);
export default function () {
	[[1, 66.15], [0.1, 59.535], [0.01, 58.8735], [0.001, 58.80735]].forEach(([h, v]) => check(`WE1 h=${h}`, (d(4 + h) - d(4)) / h, v, 1e-6));
	check('WE1', 2 * 7.35 * 4, 58.8);
	check('WE2 D20', D(20), 5.0, 1e-3);
	[[1, 0.788], [0.1, 0.737], [0.01, 0.732], [0.001, 0.732]].forEach(([h, v]) => check(`WE2 h=${h}`, (D(20 + h) - D(20)) / h, v, 0.002));
	[[0.5, 0.958851], [0.1, 0.998334], [0.01, 0.999983], [0.001, 0.99999983]].forEach(([x, v]) => check(`WE3 ${x}`, Math.sin(x) / x, v, 1e-6));
	check('WE4 slope', -2 * 1361, -2722);
	check('WE4 est', 1361 - 27.22, 1333.8, 1e-4);
	check('WE4 exact', 1361 / 1.01 ** 2, 1334.2, 1e-4);
	check('P4', 2.1 ** 2, 4.41, 1e-9);
	check('P7', -2722 / 1.524 ** 3, -769, 0.002);
	check('P7 cube', 1.524 ** 3, 3.540, 0.001);
	[[0.1, 1.05171], [0.01, 1.005017], [0.001, 1.0005]].forEach(([h, v]) => check(`P8 ${h}`, (Math.exp(h) - 1) / h, v, 1e-5));
	check('P9', Math.sqrt(4.1), 2.024846, 1e-6);
	return report('C.2 Slopes and limits');
}
