import { check, report } from './lib.mjs';
const P = Math.PI, G = 9.81, GS = 14.7;
const per = (L, g) => 2 * P * Math.sqrt(L / g);
// Exact pendulum period ratio T/T₀ = 1/AGM(1, cos(θ₀/2)).
const exact = (deg) => {
	let a = 1, b = Math.cos((deg * P) / 360);
	for (let i = 0; i < 30; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
	return 1 / a;
};
const approx = (deg) => 1 + ((deg * P) / 180) ** 2 / 16;
export default function () {
	const T = 600 / 346, w = (2 * P) / T;
	check('WE1 T', T, 1.734, 0.001); check('WE1 ω', w, 3.623, 0.001); check('WE1 ω²', w * w, 13.13, 0.001); check('WE1 L', GS / (w * w), 1.12, 0.002);
	check('WE2 T', P, 3.14, 0.001); check('WE2 f', 1 / P, 0.318, 0.002); check('WE2 k', 0.5 * 4, 2.0); check('WE2 vmax', 0.2 * 2, 0.4); check('WE2 amax', 0.2 * 4, 0.8);
	const m3 = (600 * 2.3 ** 2) / (4 * P * P);
	check('WE3 total', m3, 80.4, 0.001); check('WE3 astro', m3 - 12, 68.4, 0.001); check('WE3 empty', 2 * P * Math.sqrt(12 / 600), 0.889, 0.001); check('4π²', 4 * P * P, 39.48, 1e-4);
	[['Moon', 1.62, 5.224, 115], ['Mars', 3.73, 3.443, 174], ['Earth', G, 2.123, 283], ['ship', GS, 1.734, 346], ['Erid', 2 * G, 1.501, 400]].forEach(([n, g, t, c]) => {
		check(`WE4 T ${n}`, per(1.12, g), t, 0.001); check(`WE4 count ${n}`, 600 / per(1.12, g), c, 0.003);
	});
	const th = (10 * P) / 180;
	check('WE5 θ', th, 0.1745, 0.001); check('WE5 corr', th * th / 16, 0.0019, 0.01); check('WE5 g', GS * (1 - 2 * 0.0019), 14.64, 0.001);
	check('text 10°', approx(10) - 1, 0.0019, 0.01); check('text 30°', approx(30) - 1, 0.017, 0.01);
	check('accuracy 40°', Math.abs(exact(40) - approx(40)) / exact(40), 0.00085, 0.05);
	check('sim 90°', exact(90) - 1, 0.18, 0.01);
	check('P1', 200 * 0.05, 10); check('P2 f', 1 / 0.5, 2); check('P2 ω', 2 * P * 2, 12.6, 0.003);
	check('P3', per(0.25, G), 1.0, 0.004); check('P5', 2 * P * Math.sqrt(0.4 / 160), 0.314, 0.001);
	check('P6', (G * 4) / (4 * P * P), 0.994, 0.001); check('P7', 2 / Math.sqrt(1.5), 1.63, 0.003); check('P7 direct', per(0.994, GS), 1.63, 0.003);
	const w8 = (2 * P) / 0.5;
	check('P8 ω', w8, 12.57, 0.001); check('P8 v', 0.1 * w8, 1.26, 0.003); check('P8 ω²', w8 * w8, 158, 0.002); check('P8 a', 0.1 * w8 * w8, 15.8, 0.001);
	check('P10 a', -5 * Math.cos(1), -2.7, 0.002); check('P10 x', 0.05 * Math.cos(1), 0.027, 0.001);
	check('P11 ratio²', (0.812 / 0.574) ** 2, 2.0, 0.002); check('P11 m', 5 * (0.812 / 0.574) ** 2, 10.0, 0.002); check('P11 k', (4 * P * P * 5) / 0.574 ** 2, 600, 0.003);
	check('P12 θ', (30 * P) / 180, 0.5236, 0.001); check('P12 θ²', ((30 * P) / 180) ** 2, 0.2742, 0.001); check('P12 approx', approx(30) - 1, 0.0171, 0.003);
	check('P12 exact', exact(30) - 1, 0.0174, 0.003); check('P12 90 approx', approx(90) - 1, 0.154, 0.003); check('P12 90 exact', exact(90) - 1, 0.18, 0.01);
	return report('2.4 Pendulums and SHM');
}
