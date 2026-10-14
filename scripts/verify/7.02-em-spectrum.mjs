import { check, report } from './lib.mjs';
import { WAVES as W, C } from './constants.mjs';
const c = C.c, deg = Math.PI / 180;
export default function () {
	// Concept
	check('c approx', c, 3.0e8, 0.001);
	check('Petrova f concept', c / W.petrova, 1.15e13, 0.004); check('Petrova 11.5 THz', c / W.petrova / 1e12, 11.5, 0.004);
	check('Tau Ceti ly', 1 / 0.2738097 * 3.26156, 11.9, 0.002);
	check('Petrova vs visible lo', W.petrova / W.visibleLong, 35, 0.02); check('Petrova vs visible hi', W.petrova / W.visibleShort, 65, 0.002);
	check('Sun 8.3 min', C.au / c / 60, 8.3, 0.003);
	check('fifty octaves', Math.log2(1e16), 53, 0.01);
	// WE1
	check('WE1 f', c / W.petrova, 1.154e13, 0.001); check('WE1 THz', c / W.petrova / 1e12, 11.54, 0.001);
	check('WE1 T', W.petrova / c, 8.67e-14, 0.001);
	// WE2
	check('WE2 f400', c / W.visibleShort, 7.49e14, 0.001); check('WE2 f750', c / W.visibleLong, 4.0e14, 0.001);
	check('WE2 r750', 25.984 / 0.75, 34.6, 0.002); check('WE2 r400', 25.984 / 0.4, 65.0, 0.001);
	// WE3
	const lyTC = (1 / 0.27381) * 3.26156;
	check('WE3 ly', lyTC, 11.91, 0.001); check('WE3 rt', 2 * 11.91, 23.8, 0.002);
	check('WE3 sun', C.au / c, 499, 0.001); check('WE3 sun min', C.au / c / 60, 8.3, 0.003);
	// WE4
	check('WE4 sin40', Math.sin(40 * deg), 0.643, 0.001); check('WE4 sin2', Math.sin(40 * deg) / W.nWater, 0.483, 0.002);
	check('WE4 th2', Math.asin(Math.sin(40 * deg) / W.nWater) / deg, 28.9, 0.002);
	check('WE4 v', c / W.nWater, 2.25e8, 0.002); check('WE4 lam', 589 / W.nWater, 443, 0.002);
	// WE5
	check('WE5 lam', c / W.microwaveOven, 0.122, 0.003); check('WE5 node', c / W.microwaveOven / 2 * 100, 6.1, 0.004);
	// Problems
	check('P1', C.au / c, 499, 0.001);
	check('P2', c / 100e6, 3.0, 0.001);
	check('P5 glass', c / W.nGlass, 2.0e8, 0.001); check('P5 diamond', c / W.nDiamond, 1.24e8, 0.002);
	check('P6 sin', 0.5 / 1.5, 0.333, 0.002); check('P6', Math.asin(0.5 / 1.5) / deg, 19.5, 0.002);
	check('P7a', c / W.co2Stretch, 7.04e13, 0.001); check('P7b', c / W.co2Bend, 2.0e13, 0.001);
	check('P8', (W.tauCetiE.a * C.au) / c, 275, 0.002); check('P8 min', (W.tauCetiE.a * C.au) / c / 60, 4.6, 0.003);
	const rom = (2 * C.au) / (22 * 60);
	check('P9', rom, 2.27e8, 0.002); check('P9 frac', rom / c, 0.76, 0.006); check('P9 true', (2 * C.au) / c / 60, 16.6, 0.003);
	check('P10 water', Math.asin(1 / W.nWater) / deg, 48.8, 0.002); check('P10 diamond', Math.asin(1 / W.nDiamond) / deg, 24.4, 0.002);
	check('P11', 25.984 / 1.5, 17.3, 0.002);
	check('P12', 10 / 25.984, 0.385, 0.002);
	// Figures: refraction diagram, 50° into glass
	check('fig refraction', Math.asin(Math.sin(50 * deg) / 1.5) / deg, 30.7, 0.002);
	check('fig oven', c / W.microwaveOven, 0.1224, 0.001); check('fig FM', c / 100e6, 3.0, 0.001);
	return report('7.2 c = fλ and the EM spectrum');
}
