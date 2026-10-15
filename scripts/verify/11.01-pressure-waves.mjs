import { check, report } from './lib.mjs';
import { SOUND as S, THERMAL as T, C } from './constants.mjs';
export default function () {
	const Z = 413, rho = S.air20.rho, v = S.air20.v;
	// Concept
	check('atm tonnes per m²', S.atm / 9.81 / 1000, 10, 0.04);
	check('Z air', rho * v, 413, 0.002); check('Z table', S.air20.Z, 413, 0.001);
	check('water/air Z', 1.48e6 / S.air20.Z, 3600, 0.01);
	check('molecule rms ~500', Math.sqrt((3 * T.k * 293.15) / (S.mAir * T.u)), 500, 0.01);
	check('conversation 0.03 Pa', Math.sqrt(2 * Z * 1e-6), 0.03, 0.05);
	check('3 parts in 10 million', Math.sqrt(2 * Z * 1e-6) / S.atm, 3e-7, 0.06);
	check('3 dB', 10 * Math.log10(2), 3.01, 0.001); check('6 dB', 20 * Math.log10(2), 6.02, 0.001);
	// WE1
	const dp = Math.sqrt(2 * Z * 1e-6);
	check('WE1 dp', dp, 0.0287, 0.002); check('WE1 frac', 0.0287 / S.atm, 2.8e-7, 0.02);
	// WE2
	const u = 0.0287 / Z, w = 2 * Math.PI * 440;
	check('WE2 u', u, 6.95e-5, 0.002); check('WE2 w', w, 2765, 0.001); check('WE2 s', 6.95e-5 / 2765, 2.5e-8, 0.01);
	const spacing = Math.cbrt((T.k * 293.15) / S.atm);
	check('WE2 spacing', spacing * 1e9, 3.4, 0.01); check('WE2 seven', 25 / 3.4, 7, 0.06);
	// WE3
	const dp0 = Math.sqrt(2 * Z * 1e-12);
	check('WE3 dp', dp0, 2.9e-5, 0.01); check('WE3 P', 1e-12 * S.eardrum, 1e-16, 1e-9); check('WE3 F', 2.9e-5 * 1e-4, 2.9e-9, 1e-9);
	const dustMass = 2000 * (Math.PI / 6) * 0.07e-3 ** 3; // grain of density 2000 kg/m³ (assumed)
	check('WE3 dust grain weight', dustMass * 9.81, 2.9e-9, 0.25);
	const s0 = 2.9e-5 / 413 / (2 * Math.PI * 1000);
	check('WE3 s', s0, 1.1e-11, 0.02); check('WE3 fifth of H radius', s0 / C.bohrRadius, 0.2, 0.08);
	// WE4
	check('WE4 shout', 10 * Math.log10(4), 6.0, 0.01); check('WE4 dist', -20 * Math.log10(4), -12.0, 0.01);
	check('WE4 net', 10 * Math.log10(4) - 20 * Math.log10(4), -6.0, 0.01);
	// WE5
	const Zw = 1000 * S.vWaterFresh;
	check('WE5 Zw', Zw, 1.48e6, 1e-9);
	const dpw = Math.sqrt(2 * 1.48e6 * 1e-6);
	check('WE5 dp', dpw, 1.72, 0.002); check('WE5 s', 1.72 / (1.48e6 * 2765), 4.2e-10, 0.01);
	check('WE5 60x', dpw / dp, 60, 0.02);
	// Problems
	check('P1 F', S.atm * 0.2 * 0.3, 6.1e3, 0.01); check('P1 kg', (S.atm * 0.06) / 9.81, 620, 0.002);
	check('P2', 1e-12 * 1e8, 1e-4, 1e-9);
	check('P3a', 10 * Math.log10(100), 20, 1e-9); check('P3b', 10 ** 3, 1000, 1e-9);
	check('P5 num', 0.656 ** 2, 0.4303, 0.001); check('P5 I', 0.656 ** 2 / 826, 5.21e-4, 0.002);
	check('P5 dB', 10 * Math.log10(5.21e-4 / 1e-12), 87.2, 0.001);
	check('P6', 70 + 10 * Math.log10(10), 80, 1e-9);
	check('P7 ratio', 10 ** 0.6, 3.98, 0.002); check('P7 r', 1.5 * 10 ** 0.6, 6.0, 0.005);
	const dpPain = Math.sqrt(2 * 413);
	check('P8 dp', dpPain, 28.7, 0.002); check('P8 frac', 28.7 / S.atm, 2.8e-4, 0.02);
	check('P8 u', 28.7 / 413, 0.0696, 0.002); check('P8 s', 0.0696 / (2 * Math.PI * 1000), 1.1e-5, 0.02);
	check('P9', 10000 / 100, 100, 1e-9);
	check('P10', 1e-6 * 4 * Math.PI, 1.26e-5, 0.005);
	check('P11 I', S.atm ** 2 / 826, 1.24e7, 0.005); check('P11 dB', 10 * Math.log10(1.24e19), 191, 0.002);
	check('P13', 1.48e6 / 413, 3.6e3, 0.01);
	return report('11.1 Sound as pressure waves');
}
