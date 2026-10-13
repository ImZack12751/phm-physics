import { check, report } from './lib.mjs';
import { ENERGY } from './constants.mjs';
const elastic = (m1, m2, u) => [((m1 - m2) / (m1 + m2)) * u, ((2 * m1) / (m1 + m2)) * u];
const withE = (m1, m2, u1, u2, e) => {
	const P = m1 * u1 + m2 * u2, M = m1 + m2;
	return [(P + m2 * e * (u2 - u1)) / M, (P + m1 * e * (u1 - u2)) / M];
};
export default function () {
	// figure: 2 kg at 3 m/s into 6 kg at rest
	const [a1, a2] = withE(2, 6, 3, 0, 0.5);
	check('fig e=.5 v1', a1, -0.375); check('fig e=.5 v2', a2, 1.125); check('fig e=.5 KE', 0.5 * 2 * a1 ** 2 + 0.5 * 6 * a2 ** 2, 3.9, 0.02);
	check('fig stick', 6 / 8, 0.75); check('fig stick KE', 0.5 * 8 * 0.75 ** 2, 2.25); check('fig KE0', 0.5 * 2 * 9, 9);
	const J = ENERGY.dimitriForce * ENERGY.dimitriTime;
	check('WE1 J', J, 6.0); check('WE1 v', J / 500, 0.012); check('WE1 p light', ENERGY.dimitriEnergy / 3.0e8, 6.0); check('WE1 mc', ENERGY.dimitriMass * 3e8, 6.0, 0.001);
	check('WE2', (-200 * 0.5) / 1.2e5, -8.3e-4, 0.005);
	const v3 = (1.2e5 * 0.2) / 6.2e5;
	check('WE3 v', v3, 0.039, 0.01); check('WE3 K0', 0.5 * 1.2e5 * 0.04, 2400); check('WE3 K1', 0.5 * 6.2e5 * 0.0387 ** 2, 465, 0.002);
	check('WE3 lost', 1 - (0.5 * 6.2e5 * v3 ** 2) / 2400, 0.81, 0.005); check('WE3 lost J', 2400 - 0.5 * 6.2e5 * v3 ** 2, 1900, 0.02);
	const [b1, b2] = elastic(2, 6, 3);
	check('WE4 v1', b1, -1.5); check('WE4 v2', b2, 1.5); check('WE4 p', 2 * b1 + 6 * b2, 6); check('WE4 KE', 0.5 * 2 * b1 ** 2 + 0.5 * 6 * b2 ** 2, 9);
	check('WE5 v', 20 / 198, 0.101, 0.001); check('WE5 t', 100 / (20 / 198), 990); check('WE5 min', 990 / 60, 16.5);
	check('P1', 80 * 3, 240); check('P2 J', 500 * 0.2, 100); check('P2 dv', 100 / 50, 2);
	check('P4 J', 0.5 * 0.02 * 1200, 12, 0.0001); check('P4 v', 12 / 0.15, 80, 0.0001);
	check('P5', (200 * 0.8) / 1.2e5, 1.3e-3, 0.03);
	check('P6 v', 2000 / 4000, 0.5); check('P6 lost', 1 - (0.5 * 4000 * 0.25) / 2000, 0.75);
	check('P8 seq', 20 / 200 + 20 / 198 + 20 / 196, 0.303, 0.001); check('P8 all', 60 / 200, 0.3);
	return report('5.5 Momentum');
}
