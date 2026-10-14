// The course structure: the single source of truth for chapter order, numbering,
// prerequisites and status. Used by the sidebar, the Physics map, the Prerequisites
// boxes, the progress tracker, the "Ask Claude" prompts and the /raw/ markdown export.
//
// status: 'planned'  – not written yet (shown on the roadmap only)
//         'review'   – written and published, waiting for the author's review
//         'done'     – reviewed and final
//
// slug:   the page lives at src/content/docs/<part.dir>/<slug>.mdx and /<part.dir>/<slug>/.
//         Slugs must be unique across the whole course (they also name /raw/<slug>.md).
// prereqs: slugs of earlier chapters this chapter builds on directly.

export const parts = [
	{
		id: 'part-0', icon: 'Σ',
		dir: 'part-0',
		code: '0',
		label: 'Part 0 · Maths toolkit',
		blurb: 'The algebra, notation and estimation habits every later chapter relies on.',
		chapters: [
			{ slug: 'scientific-notation', title: 'Scientific notation', prereqs: [], status: 'review' },
			{ slug: 'si-units', title: 'SI units and prefixes', prereqs: ['scientific-notation'], status: 'review' },
			{ slug: 'unit-handling', title: 'Handling units', prereqs: ['si-units'], status: 'review' },
			{ slug: 'rearranging-formulas', title: 'Rearranging formulas', prereqs: ['unit-handling'], status: 'review' },
			{ slug: 'ratios-proportionality', title: 'Ratios, proportionality and the inverse-square law', prereqs: ['rearranging-formulas'], status: 'review' },
			{ slug: 'trigonometry', title: 'Trigonometry refresher', prereqs: ['rearranging-formulas'], status: 'review' },
			{ slug: 'vectors', title: 'Vectors', prereqs: ['trigonometry'], status: 'review' },
			{ slug: 'exponentials-logarithms', title: 'Exponentials and logarithms', prereqs: ['scientific-notation', 'rearranging-formulas'], status: 'review' },
			{ slug: 'graphs', title: 'Reading and making graphs', prereqs: ['ratios-proportionality', 'exponentials-logarithms'], status: 'review' },
			{ slug: 'estimation', title: 'Order-of-magnitude estimation', prereqs: ['unit-handling', 'ratios-proportionality'], status: 'review' },
		],
	},
	{
		id: 'part-0-5', icon: '∫',
		dir: 'calculus',
		code: 'C',
		label: 'Part 0.5 · Calculus from scratch',
		blurb: 'Rates of change and areas under curves, taught gently with physics examples only.',
		chapters: [
			{ slug: 'rates-of-change', title: 'Rates of change', prereqs: ['graphs', 'vectors'], status: 'review' },
			{ slug: 'slopes-and-limits', title: 'Slopes of curves and limits', prereqs: ['rates-of-change'], status: 'review' },
			{ slug: 'derivatives', title: 'Derivatives and simple rules', prereqs: ['slopes-and-limits', 'exponentials-logarithms', 'trigonometry'], status: 'review' },
			{ slug: 'area-under-curves', title: 'Area under curves', prereqs: ['graphs', 'slopes-and-limits'], status: 'review' },
			{ slug: 'integrals', title: 'Integrals', prereqs: ['area-under-curves', 'derivatives'], status: 'review' },
			{ slug: 'fundamental-theorem', title: 'The fundamental theorem of calculus', prereqs: ['integrals'], status: 'review' },
		],
	},
	{
		id: 'part-1', icon: 'v', dir: 'part-1', code: '1', label: 'Part 1 · Motion',
		blurb: 'Describing motion precisely, and Grace’s first experiment: measuring g.',
		chapters: [
			{ slug: 'kinematics', title: 'Position, velocity and acceleration', prereqs: ['derivatives', 'fundamental-theorem', 'vectors'], status: 'review' },
			{ slug: 'equations-of-motion', title: 'The equations of motion', prereqs: ['kinematics', 'integrals'], status: 'review' },
			{ slug: 'free-fall', title: 'Free fall', prereqs: ['equations-of-motion'], status: 'review' },
			{ slug: 'measuring-g', title: 'Measuring g', prereqs: ['free-fall', 'graphs', 'unit-handling', 'derivatives'], status: 'review' },
		],
	},
	{
		id: 'part-2', icon: 'F', dir: 'part-2', code: '2', label: 'Part 2 · Forces',
		blurb: 'Newton’s laws, weight, and what you feel inside an accelerating ship.',
		chapters: [
			{ slug: 'newtons-laws', title: 'Newton’s laws', prereqs: ['kinematics', 'equations-of-motion', 'free-fall', 'vectors'], status: 'review' },
			{ slug: 'mass-and-weight', title: 'Mass vs weight', prereqs: ['newtons-laws', 'free-fall'], status: 'review' },
			{ slug: 'apparent-weight', title: 'Apparent weight in accelerating ships', prereqs: ['mass-and-weight', 'newtons-laws', 'kinematics'], status: 'review' },
			{ slug: 'pendulums-shm', title: 'Pendulums and simple harmonic motion', prereqs: ['newtons-laws', 'apparent-weight', 'derivatives', 'trigonometry', 'measuring-g'], status: 'review' },
		],
	},
	{
		id: 'part-3', icon: 'ω', dir: 'part-3', code: '3', label: 'Part 3 · Circular motion and artificial gravity',
		blurb: 'Spinning a ship to make gravity, and the strange sideways pushes that come with it.',
		chapters: [
			{ slug: 'angular-speed', title: 'Angular speed', prereqs: ['trigonometry', 'kinematics', 'derivatives'], status: 'review' },
			{ slug: 'centripetal-acceleration', title: 'Centripetal acceleration', prereqs: ['angular-speed', 'newtons-laws', 'vectors', 'pendulums-shm'], status: 'review' },
			{ slug: 'spin-gravity', title: 'Designing spin gravity', prereqs: ['centripetal-acceleration', 'apparent-weight', 'measuring-g', 'pendulums-shm'], status: 'review' },
			{ slug: 'coriolis', title: 'The Coriolis effect', prereqs: ['spin-gravity', 'centripetal-acceleration', 'kinematics', 'integrals'], status: 'review' },
		],
	},
	{
		id: 'part-4', icon: 'G', dir: 'part-4', code: '4', label: 'Part 4 · Gravitation and orbits',
		blurb: 'Gravity between bodies, orbits, and weighing a planet from orbit.',
		chapters: [
			{ slug: 'gravitation', title: 'Newton’s law of gravitation', prereqs: ['centripetal-acceleration', 'ratios-proportionality', 'mass-and-weight', 'newtons-laws'], status: 'review' },
			{ slug: 'orbital-speed', title: 'Orbital speed', prereqs: ['gravitation', 'centripetal-acceleration', 'apparent-weight', 'angular-speed'], status: 'review' },
			{ slug: 'keplers-laws', title: 'Kepler’s laws', prereqs: ['orbital-speed', 'graphs', 'vectors'], status: 'review' },
			{ slug: 'escape-velocity', title: 'Escape velocity', prereqs: ['keplers-laws', 'equations-of-motion', 'fundamental-theorem'], status: 'review' },
			{ slug: 'planet-mass-from-orbit', title: 'Finding a planet’s mass from an orbit', prereqs: ['keplers-laws', 'measuring-g', 'rearranging-formulas'], status: 'review' },
			{ slug: 'orbital-manoeuvring', title: 'Orbital manoeuvring', prereqs: ['escape-velocity', 'keplers-laws', 'vectors'], status: 'review' },
		],
	},
	{
		id: 'part-5', icon: 'E', dir: 'part-5', code: '5', label: 'Part 5 · Energy and momentum',
		blurb: 'Work, energy, momentum and the rocket equation that rules every spaceship.',
		chapters: [
			{ slug: 'work', title: 'Work as an integral', prereqs: ['newtons-laws', 'vectors', 'integrals', 'fundamental-theorem', 'gravitation'], status: 'review' },
			{ slug: 'kinetic-potential-energy', title: 'Kinetic and potential energy', prereqs: ['work', 'equations-of-motion', 'escape-velocity', 'derivatives'], status: 'review' },
			{ slug: 'power', title: 'Power', prereqs: ['work', 'kinetic-potential-energy', 'derivatives'], status: 'review' },
			{ slug: 'conservation-laws', title: 'Conservation laws', prereqs: ['kinetic-potential-energy', 'power', 'newtons-laws', 'orbital-manoeuvring'], status: 'review' },
			{ slug: 'momentum', title: 'Momentum', prereqs: ['newtons-laws', 'conservation-laws', 'integrals', 'vectors'], status: 'review' },
			{ slug: 'thrust', title: 'Thrust', prereqs: ['momentum', 'power', 'newtons-laws', 'apparent-weight'], status: 'review' },
			{ slug: 'rocket-equation', title: 'The Tsiolkovsky rocket equation', prereqs: ['thrust', 'integrals', 'exponentials-logarithms', 'orbital-manoeuvring'], status: 'review' },
		],
	},
	{
		id: 'part-6', icon: 'Q', dir: 'part-6', code: '6', label: 'Part 6 · Thermal physics and climate',
		blurb: 'Heat, temperature and why a dimmer Sun means an ice age.',
		chapters: [
			{ slug: 'temperature-heat', title: 'Temperature and heat', prereqs: ['unit-handling', 'kinetic-potential-energy', 'conservation-laws', 'momentum'], status: 'review' },
			{ slug: 'specific-latent-heat', title: 'Specific and latent heat', prereqs: ['temperature-heat', 'conservation-laws', 'graphs', 'power'], status: 'review' },
			{ slug: 'heat-transfer', title: 'Heat transfer', prereqs: ['temperature-heat', 'specific-latent-heat', 'exponentials-logarithms', 'derivatives', 'power'], status: 'review' },
			{ slug: 'energy-balance', title: 'Planetary energy balance and albedo', prereqs: ['heat-transfer', 'ratios-proportionality', 'specific-latent-heat', 'derivatives', 'keplers-laws'], status: 'review' },
			{ slug: 'greenhouse-effect', title: 'The greenhouse effect', prereqs: ['energy-balance', 'heat-transfer', 'exponentials-logarithms', 'temperature-heat'], status: 'review' },
			{ slug: 'feedback-loops', title: 'Feedback loops', prereqs: ['energy-balance', 'greenhouse-effect', 'specific-latent-heat', 'graphs'], status: 'review' },
		],
	},
	{
		id: 'part-7', icon: 'λ', dir: 'part-7', code: '7', label: 'Part 7 · Waves and light',
		blurb: 'Waves, the electromagnetic spectrum, photons and pushing a ship with light.',
		chapters: [
			{ slug: 'wave-properties', title: 'Wave properties', prereqs: ['pendulums-shm', 'centripetal-acceleration', 'trigonometry', 'vectors', 'kinetic-potential-energy', 'ratios-proportionality'], status: 'review' },
			{ slug: 'em-spectrum', title: 'c = fλ and the EM spectrum', prereqs: ['wave-properties', 'scientific-notation', 'si-units', 'exponentials-logarithms', 'trigonometry', 'kinematics'], status: 'review' },
			{ slug: 'photons', title: 'Photons', prereqs: ['em-spectrum', 'kinetic-potential-energy', 'power', 'scientific-notation', 'graphs', 'temperature-heat'], status: 'review' },
			{ slug: 'photon-propulsion', title: 'The momentum of light and photon propulsion', prereqs: ['photons', 'momentum', 'thrust', 'rocket-equation', 'ratios-proportionality', 'gravitation'], status: 'review' },
			{ slug: 'spectroscopy', title: 'Spectroscopy', prereqs: ['photons', 'em-spectrum', 'wave-properties', 'trigonometry', 'momentum', 'keplers-laws'], status: 'review' },
		],
	},
	{
		id: 'part-8', icon: '★', dir: 'part-8', code: '8', label: 'Part 8 · Thermal radiation and stars',
		blurb: 'Why hot things glow, how bright stars are, and the Sun compared with Tau Ceti.',
		chapters: [
			{ slug: 'blackbody-wien', title: 'Blackbody radiation and Wien’s law', prereqs: ['photons', 'em-spectrum', 'heat-transfer', 'temperature-heat', 'derivatives', 'exponentials-logarithms'], status: 'review' },
			{ slug: 'stefan-boltzmann', title: 'The Stefan–Boltzmann law and luminosity', prereqs: ['blackbody-wien', 'heat-transfer', 'integrals', 'ratios-proportionality', 'power', 'derivatives'], status: 'review' },
			{ slug: 'solar-constant', title: 'The inverse-square law and the solar constant', prereqs: ['stefan-boltzmann', 'ratios-proportionality', 'energy-balance', 'keplers-laws', 'trigonometry', 'photons'], status: 'review' },
			{ slug: 'sun-vs-tau-ceti', title: 'The Sun vs Tau Ceti', prereqs: ['solar-constant', 'stefan-boltzmann', 'blackbody-wien', 'planet-mass-from-orbit', 'spectroscopy', 'exponentials-logarithms'], status: 'review' },
		],
	},
	{
		id: 'part-9', icon: 'mc²', dir: 'part-9', code: '9', label: 'Part 9 · Mass–energy',
		blurb: 'E = mc² and why Astrophage is the ultimate fuel tank.',
		chapters: [
			{ slug: 'mass-energy', title: 'E = mc²', prereqs: ['photon-propulsion', 'momentum', 'spin-gravity', 'power', 'specific-latent-heat', 'scientific-notation'], status: 'review' },
			{ slug: 'energy-density', title: 'Energy density: chemical to Astrophage', prereqs: ['mass-energy', 'rocket-equation', 'thrust', 'kinetic-potential-energy', 'exponentials-logarithms', 'energy-balance'], status: 'review' },
		],
	},
	{
		id: 'part-10', icon: 'γ', dir: 'part-10', code: '10', label: 'Part 10 · Special relativity',
		blurb: 'Light clocks, time dilation and how long the trip really took.',
		chapters: [
			{ slug: 'postulates', title: 'The postulates of relativity', prereqs: [], status: 'planned' },
			{ slug: 'time-dilation', title: 'Time dilation and the light clock', prereqs: [], status: 'planned' },
			{ slug: 'lorentz-factor', title: 'The Lorentz factor', prereqs: [], status: 'planned' },
			{ slug: 'length-contraction', title: 'Length contraction', prereqs: [], status: 'planned' },
			{ slug: 'velocity-addition', title: 'Velocity addition', prereqs: [], status: 'planned' },
			{ slug: 'ship-time-earth-time', title: 'Ship time vs Earth time', prereqs: [], status: 'planned' },
		],
	},
	{
		id: 'part-11', icon: '♪', dir: 'part-11', code: '11', label: 'Part 11 · Sound',
		blurb: 'Pressure waves, pitch and chords: the physics of talking to Rocky.',
		chapters: [
			{ slug: 'pressure-waves', title: 'Sound as pressure waves', prereqs: [], status: 'planned' },
			{ slug: 'frequency-pitch', title: 'Frequency and pitch', prereqs: [], status: 'planned' },
			{ slug: 'speed-of-sound', title: 'The speed of sound in different media', prereqs: [], status: 'planned' },
			{ slug: 'harmonics-chords', title: 'Harmonics and chords', prereqs: [], status: 'planned' },
			{ slug: 'echolocation', title: 'Echolocation', prereqs: [], status: 'planned' },
		],
	},
	{
		id: 'part-12', icon: 'P', dir: 'part-12', code: '12', label: 'Part 12 · Pressure, gases and materials',
		blurb: 'Gas laws, alien atmospheres and the wall between two worlds.',
		chapters: [
			{ slug: 'pressure', title: 'Pressure: F = PA', prereqs: [], status: 'planned' },
			{ slug: 'gas-laws', title: 'The gas laws', prereqs: [], status: 'planned' },
			{ slug: 'partial-pressure', title: 'Partial pressure', prereqs: [], status: 'planned' },
			{ slug: 'pressure-walls', title: 'Forces on walls between atmospheres', prereqs: [], status: 'planned' },
			{ slug: 'stress-strength', title: 'Stress and strength', prereqs: [], status: 'planned' },
		],
	},
	{
		id: 'part-13', icon: 'ν', dir: 'part-13', code: '13', label: 'Part 13 · Atoms, radiation and particles',
		blurb: 'Atoms, radiation in deep space and the ghostly neutrinos.',
		chapters: [
			{ slug: 'atomic-structure', title: 'Atomic structure', prereqs: [], status: 'planned' },
			{ slug: 'isotopes', title: 'Isotopes', prereqs: [], status: 'planned' },
			{ slug: 'ionizing-radiation', title: 'Ionizing radiation', prereqs: [], status: 'planned' },
			{ slug: 'cosmic-rays-shielding', title: 'Cosmic rays and shielding', prereqs: [], status: 'planned' },
			{ slug: 'neutrinos', title: 'Neutrinos', prereqs: [], status: 'planned' },
		],
	},
	{
		id: 'part-14', icon: 'ly', dir: 'part-14', code: '14', label: 'Part 14 · Astronomy and scale',
		blurb: 'Light-years, other worlds, magnetic fields, and counting in base 6.',
		chapters: [
			{ slug: 'light-years', title: 'Light-years and stellar distances', prereqs: [], status: 'planned' },
			{ slug: 'planetary-atmospheres', title: 'Planetary atmospheres', prereqs: [], status: 'planned' },
			{ slug: 'magnetic-fields', title: 'Magnetic fields', prereqs: [], status: 'planned' },
			{ slug: 'base-six', title: 'Sidebar: base-6 numbers', prereqs: [], status: 'planned' },
		],
	},
];

/** Every chapter in teaching order, with number, part and URL path filled in. */
export const chapters = parts.flatMap((part) =>
	part.chapters.map((ch, i) => ({
		...ch,
		number: `${part.code}.${i + 1}`,
		partId: part.id,
		partLabel: part.label,
		id: `${part.dir}/${ch.slug}`, // content collection id == URL path without slashes
	}))
);

/** Chapters that exist as pages. */
export const publishedChapters = chapters.filter((c) => c.status !== 'planned');

export const chapterBySlug = Object.fromEntries(chapters.map((c) => [c.slug, c]));
export const chapterById = Object.fromEntries(chapters.map((c) => [c.id, c]));

/** Published chapters that come before `slug` in teaching order. */
export function chaptersBefore(slug) {
	const idx = publishedChapters.findIndex((c) => c.slug === slug);
	return idx < 0 ? [] : publishedChapters.slice(0, idx);
}

// Sanity checks that run whenever this file is imported (build time).
{
	const seen = new Set();
	for (const c of chapters) {
		if (seen.has(c.slug)) throw new Error(`curriculum: duplicate slug "${c.slug}"`);
		seen.add(c.slug);
		for (const p of c.prereqs) {
			const pc = chapterBySlug[p];
			if (!pc) throw new Error(`curriculum: "${c.slug}" lists unknown prerequisite "${p}"`);
			if (chapters.indexOf(pc) >= chapters.indexOf(c))
				throw new Error(`curriculum: "${c.slug}" depends on later chapter "${p}"`);
		}
	}
}
