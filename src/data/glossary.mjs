// Site-wide glossary. Every term wrapped in <Term id="…"> must have an entry here.
//   term:    how the term is written
//   def:     one or two plain-text sentences (Unicode allowed: m/s², ×, 10⁻³); no LaTeX
//   chapter: slug of the chapter that introduces it
// Terms from the novel say so in their definition ("In the novel, …").
export const glossary = {
	// ---- 0.1 Scientific notation ----
	exponent: {
		term: 'Exponent',
		def: 'The small raised number in a power. In 10⁶ the exponent is 6: six tens multiplied together. A negative exponent means "one divided by": 10⁻² = 1/100.',
		chapter: 'scientific-notation',
	},
	'power-of-ten': {
		term: 'Power of ten',
		def: 'A number of the form 10ⁿ, such as 10³ = 1000 or 10⁻³ = 0.001. Each step up in n makes the number ten times bigger.',
		chapter: 'scientific-notation',
	},
	'scientific-notation': {
		term: 'Scientific notation',
		def: 'Writing a number as a × 10ⁿ, where the coefficient a is at least 1 but less than 10 and n is a whole number. Example: 0.000 01 = 1 × 10⁻⁵.',
		chapter: 'scientific-notation',
	},
	coefficient: {
		term: 'Coefficient (in scientific notation)',
		def: 'The number in front of the power of ten in a × 10ⁿ. In scientific notation it is at least 1 and less than 10. It carries the significant figures.',
		chapter: 'scientific-notation',
	},
	'significant-figures': {
		term: 'Significant figures',
		def: 'The digits of a number that carry real information about its value. 1.20 × 10³ has three. Leading zeros never count; trailing zeros count only after a decimal point.',
		chapter: 'scientific-notation',
	},
	'e-notation': {
		term: 'E notation',
		def: 'The way calculators and computers display scientific notation: 1.13E17 means 1.13 × 10¹⁷. Fine on a screen, but write the proper form in your working.',
		chapter: 'scientific-notation',
	},
	'light-year': {
		term: 'Light-year (ly)',
		def: 'A unit of distance: how far light travels in one year (a Julian year of 365.25 days), about 9.46 × 10¹⁵ m. Despite the name, it measures distance, not time.',
		chapter: 'scientific-notation',
	},
	astrophage: {
		term: 'Astrophage',
		def: 'In the novel, a fictional single-celled organism about 10 micrometres across that lives on stars, stores energy as mass and moves by emitting infrared light. It is dimming the Sun.',
		chapter: 'scientific-notation',
	},
	'tau-ceti': {
		term: 'Tau Ceti',
		def: 'A real Sun-like star about 11.9 light-years from Earth, a little smaller and dimmer than the Sun. In the novel it is the one nearby star that Astrophage has not dimmed, so the mission goes there.',
		chapter: 'scientific-notation',
	},
	'petrova-line': {
		term: 'Petrova line',
		def: 'In the novel, a faint line of infrared light stretching from the Sun towards Venus, made by Astrophage travelling between them. Fictional.',
		chapter: 'scientific-notation',
	},

	// ---- 0.2 SI units and prefixes ----
	rocky: {
		term: 'Rocky',
		def: 'In the novel, an engineer from the planet Erid who becomes Grace’s partner. Eridians are fictional: they sense the world by sound rather than sight.',
		chapter: 'si-units',
	},
	'hail-mary': {
		term: 'Hail Mary (the ship)',
		def: 'In the novel, the spacecraft that carries Grace to Tau Ceti, powered by Astrophage fuel. Fictional.',
		chapter: 'si-units',
	},
	unit: {
		term: 'Unit',
		def: 'An agreed amount of a quantity that measurements are counted in, such as one metre of length or one second of time. A measurement is a number times a unit.',
		chapter: 'si-units',
	},
	si: {
		term: 'SI (International System of Units)',
		def: 'The worldwide system of units used in science, built on seven base units (second, metre, kilogram, ampere, kelvin, mole, candela) and decimal prefixes.',
		chapter: 'si-units',
	},
	'base-unit': {
		term: 'Base unit',
		def: 'One of the seven SI units from which all others are built: s, m, kg, A, K, mol, cd.',
		chapter: 'si-units',
	},
	'derived-unit': {
		term: 'Derived unit',
		def: 'A unit built by multiplying or dividing base units, such as m² for area, m/s for speed or kg/m³ for density.',
		chapter: 'si-units',
	},
	second: {
		term: 'Second (s)',
		def: 'The SI unit of time: the duration of exactly 9 192 631 770 vibrations of the radiation from a particular transition in caesium-133 atoms.',
		chapter: 'si-units',
	},
	metre: {
		term: 'Metre (m)',
		def: 'The SI unit of length: the distance light travels in a vacuum in exactly 1/299 792 458 of a second.',
		chapter: 'si-units',
	},
	kilogram: {
		term: 'Kilogram (kg)',
		def: 'The SI unit of mass, defined since 2019 by fixing the value of the Planck constant. It is the only base unit whose name contains a prefix.',
		chapter: 'si-units',
	},
	prefix: {
		term: 'Prefix (SI)',
		def: 'A word or symbol in front of a unit that multiplies it by a power of ten: k (kilo) = 10³, m (milli) = 10⁻³, µ (micro) = 10⁻⁶, and so on.',
		chapter: 'si-units',
	},
	litre: {
		term: 'Litre (L)',
		def: 'A unit of volume accepted for use with the SI: 1 L = 10⁻³ m³, the volume of a cube 10 cm on each side. 1 mL = 1 cm³.',
		chapter: 'si-units',
	},
	tonne: {
		term: 'Tonne (t)',
		def: 'A unit of mass accepted for use with the SI: 1 t = 1000 kg.',
		chapter: 'si-units',
	},
	'astronomical-unit': {
		term: 'Astronomical unit (au)',
		def: 'A unit of length roughly equal to the average Earth–Sun distance, defined as exactly 149 597 870 700 m.',
		chapter: 'si-units',
	},

	// ---- 0.3 Handling units ----
	'conversion-factor': {
		term: 'Conversion factor',
		def: 'A fraction equal to 1 that changes a quantity’s units without changing its size, such as (1000 m)/(1 km). Orient it so the unwanted unit cancels.',
		chapter: 'unit-handling',
	},
	kelvin: {
		term: 'Kelvin (K)',
		def: 'The SI unit of temperature. Its zero is absolute zero and its steps are the same size as Celsius degrees: T(K) = T(°C) + 273.15.',
		chapter: 'unit-handling',
	},
	'absolute-zero': {
		term: 'Absolute zero',
		def: 'The lowest possible temperature: 0 K, which is −273.15 °C or −459.67 °F. Chapter 6.1 explains why nothing can be colder: particles’ average kinetic energy can’t fall below zero.',
		chapter: 'unit-handling',
	},
	dimension: {
		term: 'Dimension',
		def: 'The kind of quantity something is, regardless of the unit: length [L], mass [M], time [T], or combinations such as [L]/[T] for speed.',
		chapter: 'unit-handling',
	},
	'dimensional-analysis': {
		term: 'Dimensional analysis',
		def: 'Checking that both sides of an equation have the same dimensions. It catches many wrong formulas and can suggest the form of a correct one.',
		chapter: 'unit-handling',
	},

	// ---- 0.4 Rearranging formulas ----
	equation: {
		term: 'Equation',
		def: 'A statement that two expressions are equal, like a balanced scale. It stays true if you do the same thing to both sides (except divide by zero).',
		chapter: 'rearranging-formulas',
	},
	variable: {
		term: 'Variable',
		def: 'A letter standing for a quantity that can take different values, such as t for time or v for speed.',
		chapter: 'rearranging-formulas',
	},
	'subject-of-formula': {
		term: 'Subject (of a formula)',
		def: 'The variable standing alone on one side of a formula. In v = d/t the subject is v. Rearranging changes which variable is the subject.',
		chapter: 'rearranging-formulas',
	},
	'inverse-operation': {
		term: 'Inverse operation',
		def: 'An operation that undoes another: subtraction undoes addition, division undoes multiplication, a square root undoes squaring.',
		chapter: 'rearranging-formulas',
	},
	density: {
		term: 'Density (ρ)',
		def: 'Mass per unit volume, ρ = m/V, measured in kg/m³. Water is about 1000 kg/m³.',
		chapter: 'rearranging-formulas',
	},

	// ---- 0.5 Ratios, proportionality and the inverse-square law ----
	ratio: {
		term: 'Ratio',
		def: 'One quantity divided by another of the same kind, giving a pure number that says how many times bigger one is: 14.7 m/s² ÷ 9.81 m/s² = 1.5.',
		chapter: 'ratios-proportionality',
	},
	'direct-proportion': {
		term: 'Direct proportion (y ∝ x)',
		def: 'Doubling one quantity doubles the other: y = kx. The graph is a straight line through the origin.',
		chapter: 'ratios-proportionality',
	},
	'inverse-proportion': {
		term: 'Inverse proportion (y ∝ 1/x)',
		def: 'Doubling one quantity halves the other: y = k/x, so the product xy stays constant.',
		chapter: 'ratios-proportionality',
	},
	'constant-of-proportionality': {
		term: 'Constant of proportionality',
		def: 'The fixed number k in y = kx (or y = k/x, y = kxⁿ). It often has units.',
		chapter: 'ratios-proportionality',
	},
	'inverse-square-law': {
		term: 'Inverse-square law',
		def: 'For anything spreading evenly from a point, strength falls as 1/r²: twice as far gives a quarter as much. For light, I = L/(4πr²).',
		chapter: 'ratios-proportionality',
	},
	luminosity: {
		term: 'Luminosity (L)',
		def: 'The total power a star radiates in all directions, in watts. The Sun’s is about 3.83 × 10²⁶ W.',
		chapter: 'ratios-proportionality',
	},
	intensity: {
		term: 'Intensity (of light)',
		def: 'Power arriving per square metre of a surface facing the source, in W/m².',
		chapter: 'ratios-proportionality',
	},
	'solar-constant': {
		term: 'Solar constant',
		def: 'The intensity of sunlight at Earth’s average distance, measured above the atmosphere: about 1361 W/m². It varies by around 0.1%.',
		chapter: 'ratios-proportionality',
	},
	watt: {
		term: 'Watt (W)',
		def: 'The SI unit of power: how fast energy is delivered or used. A 60 W bulb uses energy twice as fast as a 30 W bulb. Defined properly in Part 5 (1 W = 1 joule per second).',
		chapter: 'ratios-proportionality',
	},

	// ---- 0.6 Trigonometry ----
	'degree-angle': {
		term: 'Degree (angle)',
		def: 'A unit of angle: a full turn is 360°. One degree is 60 arcminutes, and one arcminute is 60 arcseconds.',
		chapter: 'trigonometry',
	},
	radian: {
		term: 'Radian (rad)',
		def: 'The natural unit of angle: the angle whose arc length equals the radius. A full turn is 2π rad = 360°, so 1 rad ≈ 57.3°.',
		chapter: 'trigonometry',
	},
	sine: {
		term: 'Sine (sin)',
		def: 'For an angle θ in a right-angled triangle, opposite ÷ hypotenuse. On the unit circle, the y-coordinate of the point at angle θ.',
		chapter: 'trigonometry',
	},
	cosine: {
		term: 'Cosine (cos)',
		def: 'For an angle θ in a right-angled triangle, adjacent ÷ hypotenuse. On the unit circle, the x-coordinate of the point at angle θ.',
		chapter: 'trigonometry',
	},
	tangent: {
		term: 'Tangent (tan)',
		def: 'For an angle θ in a right-angled triangle, opposite ÷ adjacent, which equals sin θ / cos θ.',
		chapter: 'trigonometry',
	},
	'unit-circle': {
		term: 'Unit circle',
		def: 'A circle of radius 1 centred on the origin. The point at angle θ (measured anticlockwise from the x-axis) is (cos θ, sin θ), which defines sine and cosine for any angle.',
		chapter: 'trigonometry',
	},
	'small-angle-approximation': {
		term: 'Small-angle approximation',
		def: 'For small angles measured in radians, sin θ ≈ tan θ ≈ θ (and cos θ ≈ 1). Accurate to about 1% up to 10°.',
		chapter: 'trigonometry',
	},
	parallax: {
		term: 'Parallax',
		def: 'The apparent shift of a nearby object against distant ones when seen from two places. For stars, the parallax angle p (from a 1 au baseline) gives the distance d ≈ 1 au / p.',
		chapter: 'trigonometry',
	},

	// ---- 0.7 Vectors ----
	scalar: {
		term: 'Scalar',
		def: 'A quantity fully described by a number and a unit, with no direction: mass, time, temperature, speed.',
		chapter: 'vectors',
	},
	vector: {
		term: 'Vector',
		def: 'A quantity with both a size (magnitude) and a direction, drawn as an arrow: displacement, velocity, force.',
		chapter: 'vectors',
	},
	magnitude: {
		term: 'Magnitude',
		def: 'The size of a vector, ignoring its direction: |A| = √(Aₓ² + A_y²). It is never negative.',
		chapter: 'vectors',
	},
	displacement: {
		term: 'Displacement',
		def: 'The straight-line change in position, with direction: how far and which way you ended up from where you started. Compare distance, the length of the route taken.',
		chapter: 'vectors',
	},
	velocity: {
		term: 'Velocity',
		def: 'Speed together with direction: a vector. Two objects with the same speed but different directions have different velocities.',
		chapter: 'vectors',
	},
	resultant: {
		term: 'Resultant',
		def: 'The single vector equal to the sum of several vectors, drawn from the first tail to the last head.',
		chapter: 'vectors',
	},
	component: {
		term: 'Component (of a vector)',
		def: 'The part of a vector along one axis: Aₓ = A cos θ along x and A_y = A sin θ along y. Vectors add component by component.',
		chapter: 'vectors',
	},
	'unit-vector': {
		term: 'Unit vector',
		def: 'A vector of length 1 used to mark a direction, such as î along x and ĵ along y, so that A = Aₓ î + A_y ĵ.',
		chapter: 'vectors',
	},
	'relative-velocity': {
		term: 'Relative velocity',
		def: 'How an object moves as seen from another moving object: v_rel = v₂ − v₁ (vector subtraction).',
		chapter: 'vectors',
	},

	// ---- 0.8 Exponentials and logarithms ----
	'exponential-growth': {
		term: 'Exponential growth',
		def: 'Growth by the same factor in every equal time interval, for example doubling every T: N = N₀ × 2^(t/T). Slow at first, then explosive.',
		chapter: 'exponentials-logarithms',
	},
	'exponential-decay': {
		term: 'Exponential decay',
		def: 'Shrinking by the same factor in every equal time interval, for example halving every half-life.',
		chapter: 'exponentials-logarithms',
	},
	'doubling-time': {
		term: 'Doubling time (T)',
		def: 'The time for an exponentially growing quantity to double. Related to the continuous growth rate k by T = ln 2 / k ≈ 0.693/k.',
		chapter: 'exponentials-logarithms',
	},
	'half-life': {
		term: 'Half-life',
		def: 'The time for an exponentially decaying quantity, such as a radioactive sample, to fall to half. Plutonium-238’s is 87.7 years.',
		chapter: 'exponentials-logarithms',
	},
	'eulers-number': {
		term: 'e (Euler’s number)',
		def: 'The constant 2.718 28…, the limit of (1 + 1/n)ⁿ as n grows. It is the natural base for continuous growth: N = N₀ e^(kt).',
		chapter: 'exponentials-logarithms',
	},
	logarithm: {
		term: 'Logarithm',
		def: 'The exponent needed to make a number from a base: log_b(x) = y means bʸ = x. log₁₀ 1000 = 3, log₂ 32 = 5. It undoes exponentiation.',
		chapter: 'exponentials-logarithms',
	},
	'natural-logarithm': {
		term: 'Natural logarithm (ln)',
		def: 'The logarithm with base e: ln x = log_e x. The ln key on a calculator. ln 2 ≈ 0.693.',
		chapter: 'exponentials-logarithms',
	},
	'log-scale': {
		term: 'Logarithmic scale',
		def: 'A scale where equal steps mean equal multiplications (1, 10, 100, 1000 evenly spaced). Exponential curves become straight lines on it.',
		chapter: 'exponentials-logarithms',
	},

	// ---- 0.9 Graphs ----
	'independent-variable': {
		term: 'Independent variable',
		def: 'The quantity an experimenter chooses or controls. It goes on the horizontal (x) axis.',
		chapter: 'graphs',
	},
	'dependent-variable': {
		term: 'Dependent variable',
		def: 'The quantity that responds to the independent variable and is measured. It goes on the vertical (y) axis.',
		chapter: 'graphs',
	},
	gradient: {
		term: 'Gradient (slope)',
		def: 'How steeply a graph rises: Δy/Δx. Its units are (units of y) per (unit of x), and it is a rate, such as speed on a distance–time graph.',
		chapter: 'graphs',
	},
	intercept: {
		term: 'Intercept',
		def: 'Where a line crosses the y-axis: the value of y when x = 0 (the c in y = mx + c).',
		chapter: 'graphs',
	},
	interpolation: {
		term: 'Interpolation',
		def: 'Estimating a value between measured points. Usually reliable.',
		chapter: 'graphs',
	},
	extrapolation: {
		term: 'Extrapolation',
		def: 'Estimating a value beyond the measured range, assuming the pattern continues. Risky: different models that fit the data can disagree wildly.',
		chapter: 'graphs',
	},

	// ---- 0.10 Order-of-magnitude estimation ----
	'order-of-magnitude': {
		term: 'Order of magnitude',
		def: 'The power of ten nearest to a number: 5.97 × 10²⁴ is of order 10²⁵. Two things "three orders of magnitude apart" differ by about 1000×.',
		chapter: 'estimation',
	},
	'fermi-problem': {
		term: 'Fermi problem',
		def: 'A quick estimate made by splitting a hard question into factors you can each guess roughly, then multiplying. Named after physicist Enrico Fermi.',
		chapter: 'estimation',
	},
	'geometric-mean': {
		term: 'Geometric mean',
		def: 'For two positive numbers a and b, √(ab): the value halfway between them on a logarithmic scale. The best single guess when you only know bounds.',
		chapter: 'estimation',
	},

	// ---- C.1 Rates of change ----
	'rate-of-change': {
		term: 'Rate of change',
		def: 'How much one quantity changes per unit change in another, such as metres per second or % per year. Its unit is (unit of y) per (unit of x).',
		chapter: 'rates-of-change',
	},
	'average-rate': {
		term: 'Average rate of change',
		def: 'The change in a quantity divided by the change in what it depends on over an interval: Δy/Δx. Geometrically, the slope of the secant line.',
		chapter: 'rates-of-change',
	},
	'secant-line': {
		term: 'Secant line',
		def: 'A straight line through two points on a curve. Its slope is the average rate of change between them.',
		chapter: 'rates-of-change',
	},
	acceleration: {
		term: 'Acceleration',
		def: 'The rate of change of velocity, in m/s². 1.5 g means speed grows by about 14.7 m/s every second.',
		chapter: 'rates-of-change',
	},

	// ---- C.2 Slopes of curves and limits ----
	'tangent-line': {
		term: 'Tangent line',
		def: 'The straight line that just grazes a curve at a point, matching its direction there. Its slope is the instantaneous rate of change.',
		chapter: 'slopes-and-limits',
	},
	'local-linearity': {
		term: 'Local linearity',
		def: 'The fact that a smooth curve, magnified enough around a point, looks like a straight line: its tangent.',
		chapter: 'slopes-and-limits',
	},
	'difference-quotient': {
		term: 'Difference quotient',
		def: '[f(a + h) − f(a)] / h: the slope of the secant from a to a + h. Its limit as h → 0 is the slope at a.',
		chapter: 'slopes-and-limits',
	},
	limit: {
		term: 'Limit',
		def: 'The value an expression gets as close as we like to as a variable approaches some value (without reaching it). Written lim as h → 0.',
		chapter: 'slopes-and-limits',
	},

	// ---- C.3 Derivatives ----
	derivative: {
		term: 'Derivative',
		def: 'The slope of a function at every point, itself a function: f′(x) or dy/dx. The derivative of position is velocity.',
		chapter: 'derivatives',
	},
	differentiation: {
		term: 'Differentiation',
		def: 'Finding a derivative, usually with rules such as d/dx(xⁿ) = n xⁿ⁻¹.',
		chapter: 'derivatives',
	},
	'second-derivative': {
		term: 'Second derivative',
		def: 'The derivative of the derivative, d²y/dx². The second derivative of position is acceleration.',
		chapter: 'derivatives',
	},

	// ---- C.4 Area under curves ----
	'riemann-sum': {
		term: 'Riemann sum',
		def: 'An estimate of the area under a curve made by cutting it into thin strips and adding up "height × width" for each. Thinner strips give a better estimate.',
		chapter: 'area-under-curves',
	},
	'sigma-notation': {
		term: 'Sigma notation (Σ)',
		def: 'Shorthand for a sum: Σ from k = 1 to n of aₖ means a₁ + a₂ + … + aₙ.',
		chapter: 'area-under-curves',
	},
	'trapezoid-rule': {
		term: 'Trapezoid rule',
		def: 'Estimating an area by joining neighbouring points on a curve with straight lines, so each strip is a trapezoid. It equals the average of the left and right sums.',
		chapter: 'area-under-curves',
	},
	'signed-area': {
		term: 'Signed area',
		def: 'Area that counts as positive above the horizontal axis and negative below it. Under a velocity–time graph it gives the displacement.',
		chapter: 'area-under-curves',
	},

	// ---- C.5 Integrals ----
	integral: {
		term: 'Integral (definite)',
		def: 'The exact signed area under f(x) from a to b, written ∫ₐᵇ f(x) dx: the limit of Riemann sums as the strips become infinitely thin. It turns a rate into a total.',
		chapter: 'integrals',
	},
	integrand: {
		term: 'Integrand',
		def: 'The function being integrated: the f(x) in ∫ f(x) dx.',
		chapter: 'integrals',
	},
	'limits-of-integration': {
		term: 'Limits of integration',
		def: 'The start and end values a and b in ∫ₐᵇ f(x) dx, written at the bottom and top of the integral sign.',
		chapter: 'integrals',
	},
	antiderivative: {
		term: 'Antiderivative',
		def: 'A function F whose derivative is f. Position is an antiderivative of velocity. Antiderivatives of the same function differ only by a constant.',
		chapter: 'integrals',
	},
	'indefinite-integral': {
		term: 'Indefinite integral',
		def: 'The whole family of antiderivatives of f, written ∫ f(x) dx = F(x) + C.',
		chapter: 'integrals',
	},
	'constant-of-integration': {
		term: 'Constant of integration (C)',
		def: 'The unknown constant "+ C" in an antiderivative. Differentiating removes any constant, so reversing it can’t tell what the constant was.',
		chapter: 'integrals',
	},
	'initial-condition': {
		term: 'Initial condition',
		def: 'A known value at one moment, such as the starting position, used to fix the constant of integration.',
		chapter: 'integrals',
	},

	// ---- C.6 The fundamental theorem ----
	'accumulation-function': {
		term: 'Accumulation function',
		def: 'The area so far, A(x) = ∫ₐˣ f(t) dt, as a function of where the area stops. Its slope is f(x).',
		chapter: 'fundamental-theorem',
	},
	'fundamental-theorem': {
		term: 'Fundamental theorem of calculus',
		def: 'Differentiation and integration undo each other: the area function of f has slope f, and ∫ₐᵇ f(x) dx = F(b) − F(a) for any antiderivative F.',
		chapter: 'fundamental-theorem',
	},
	'average-value': {
		term: 'Average value (of a function)',
		def: 'The height of the rectangle with the same width and area as the area under f: (1/(b − a)) ∫ₐᵇ f(x) dx.',
		chapter: 'fundamental-theorem',
	},

	// ---- 1.1 Position, velocity and acceleration ----
	'reference-frame': {
		term: 'Reference frame',
		def: 'A choice of origin, positive directions and clock from which positions and times are measured. Physics works in any sensible frame.',
		chapter: 'kinematics',
	},
	position: {
		term: 'Position (x)',
		def: 'Where something is, measured from the origin of a reference frame. Along a line it is a signed number; in space it is a vector.',
		chapter: 'kinematics',
	},
	'instantaneous-velocity': {
		term: 'Instantaneous velocity',
		def: 'The velocity at a single moment, v = dx/dt: the slope of the position–time graph at that moment.',
		chapter: 'kinematics',
	},
	speed: {
		term: 'Speed',
		def: 'How fast something moves, regardless of direction: the size of the velocity, |v|. A scalar.',
		chapter: 'kinematics',
	},

	// ---- 1.2 The equations of motion ----
	'uniform-acceleration': {
		term: 'Uniform acceleration',
		def: 'Acceleration that stays constant in size and direction, so the velocity–time graph is a straight line.',
		chapter: 'equations-of-motion',
	},
	'kinematic-equations': {
		term: 'Kinematic equations ("suvat")',
		def: 'The five equations linking displacement s, initial velocity u, final velocity v, acceleration a and time t when the acceleration is constant.',
		chapter: 'equations-of-motion',
	},
	'flip-and-burn': {
		term: 'Flip-and-burn',
		def: 'A trip plan: accelerate for the first half, turn the ship round, and decelerate for the second half, arriving at rest.',
		chapter: 'equations-of-motion',
	},

	// ---- 1.3 Free fall ----
	'free-fall': {
		term: 'Free fall',
		def: 'Motion under gravity alone, with nothing else pushing or pulling. In free fall all objects have the same acceleration.',
		chapter: 'free-fall',
	},
	'acceleration-due-to-gravity': {
		term: 'Acceleration due to gravity (g)',
		def: 'The acceleration of an object in free fall: about 9.81 m/s² on Earth, 1.62 m/s² on the Moon and 3.73 m/s² on Mars.',
		chapter: 'free-fall',
	},
	'air-resistance': {
		term: 'Air resistance',
		def: 'The push of the air against a moving object. It grows with speed and acts against the motion.',
		chapter: 'free-fall',
	},
	'terminal-velocity': {
		term: 'Terminal velocity',
		def: 'The steady speed a falling object reaches when air resistance has grown to balance the pull of gravity.',
		chapter: 'free-fall',
	},
	projectile: {
		term: 'Projectile',
		def: 'An object launched and then left to move under gravity alone. Its horizontal velocity stays constant while it falls vertically.',
		chapter: 'free-fall',
	},

	// ---- 1.4 Measuring g ----
	uncertainty: {
		term: 'Uncertainty',
		def: 'The range within which the true value of a measurement probably lies, written as value ± uncertainty.',
		chapter: 'measuring-g',
	},
	'fractional-uncertainty': {
		term: 'Fractional uncertainty',
		def: 'Uncertainty divided by the value (often as a percentage). For y ∝ xⁿ, it is multiplied by n.',
		chapter: 'measuring-g',
	},
	'random-error': {
		term: 'Random error',
		def: 'An error that scatters results unpredictably both ways, such as varying reaction time. Averaging reduces it.',
		chapter: 'measuring-g',
	},
	'systematic-error': {
		term: 'Systematic error',
		def: 'An error that pushes every result the same way, such as a miscalibrated ruler. Averaging does not reduce it.',
		chapter: 'measuring-g',
	},
	mean: {
		term: 'Mean',
		def: 'The ordinary average: the sum of the readings divided by how many there are.',
		chapter: 'measuring-g',
	},
	'standard-deviation': {
		term: 'Standard deviation',
		def: 'A measure of how widely readings scatter about their mean. The uncertainty of the mean is about the standard deviation ÷ √N.',
		chapter: 'measuring-g',
	},
	period: {
		term: 'Period (T)',
		def: 'The time for one complete cycle of a repeating motion, such as one full swing of a pendulum, out and back.',
		chapter: 'measuring-g',
	},
	// ---- 2.1 Newton's laws ----
	force: {
		term: 'Force',
		def: 'A push or a pull on an object, with a size and a direction (a vector). Measured in newtons.',
		chapter: 'newtons-laws',
	},
	newton: {
		term: 'Newton (N)',
		def: 'The SI unit of force: the force that gives a 1 kg mass an acceleration of 1 m/s². 1 N = 1 kg·m/s².',
		chapter: 'newtons-laws',
	},
	'net-force': {
		term: 'Net force',
		def: 'The vector sum of all the forces acting on an object. Only the net force affects its motion.',
		chapter: 'newtons-laws',
	},
	inertia: {
		term: 'Inertia',
		def: 'The tendency of every object to keep its velocity unless a net force acts on it. Mass measures how much inertia an object has.',
		chapter: 'newtons-laws',
	},
	'free-body-diagram': {
		term: 'Free-body diagram',
		def: 'A sketch of one object on its own, with an arrow for every force acting on it (and none for the forces it exerts on other things).',
		chapter: 'newtons-laws',
	},
	weight: {
		term: 'Weight (W)',
		def: 'The force with which a planet’s gravity pulls on an object: W = mg, pointing down, measured in newtons. It depends on where you are; mass does not.',
		chapter: 'newtons-laws',
	},
	'normal-force': {
		term: 'Normal force (N)',
		def: 'The push of a surface on an object touching it, at right angles to the surface. A floor holding you up exerts a normal force.',
		chapter: 'newtons-laws',
	},
	tension: {
		term: 'Tension (T)',
		def: 'The pulling force exerted by a stretched rope, string or cable, directed along it.',
		chapter: 'newtons-laws',
	},
	equilibrium: {
		term: 'Equilibrium',
		def: 'The state of an object whose net force is zero, so it has no acceleration: it is at rest or moves at constant velocity.',
		chapter: 'newtons-laws',
	},
	// ---- 2.2 Mass vs weight ----
	mass: {
		term: 'Mass (m)',
		def: 'How much matter an object contains, measured in kilograms. It measures both how hard the object is to accelerate and how strongly gravity pulls on it, and it is the same everywhere.',
		chapter: 'mass-and-weight',
	},
	'inertial-mass': {
		term: 'Inertial mass',
		def: 'Mass as resistance to acceleration: the m in F = ma.',
		chapter: 'mass-and-weight',
	},
	'gravitational-mass': {
		term: 'Gravitational mass',
		def: 'Mass as the thing gravity pulls on: the m in W = mg. Experiments show it equals inertial mass to about one part in 10¹⁵.',
		chapter: 'mass-and-weight',
	},
	'gravitational-field-strength': {
		term: 'Gravitational field strength (g)',
		def: 'The gravitational force per kilogram at a place, in N/kg: 9.81 N/kg at Earth’s surface. 1 N/kg is the same as 1 m/s², so it equals the free-fall acceleration.',
		chapter: 'mass-and-weight',
	},
	// ---- 2.3 Apparent weight ----
	'apparent-weight': {
		term: 'Apparent weight',
		def: 'The force with which a floor, seat or scale pushes on you: what you actually feel as weight. In a cabin accelerating upwards at a, it is m(g + a).',
		chapter: 'apparent-weight',
	},
	weightlessness: {
		term: 'Weightlessness',
		def: 'The state of feeling no weight because you and your surroundings are in free fall together, so nothing needs to push on you. Gravity has not vanished.',
		chapter: 'apparent-weight',
	},
	'equivalence-principle': {
		term: 'Equivalence principle',
		def: 'In a small closed room, no experiment can tell uniform gravity g apart from an acceleration a = g with no gravity. The starting point of Einstein’s general relativity.',
		chapter: 'apparent-weight',
	},
	'g-force': {
		term: 'G-force',
		def: 'Apparent gravity measured in units of Earth’s 9.81 m/s². Standing on Earth is 1 g; the Hail Mary gives 1.5 g; orbit is 0 g.',
		chapter: 'apparent-weight',
	},
	// ---- 2.4 Pendulums and SHM ----
	'restoring-force': {
		term: 'Restoring force',
		def: 'A force that always points back towards an object’s equilibrium position. Every oscillation is driven by one.',
		chapter: 'pendulums-shm',
	},
	'hookes-law': {
		term: 'Hooke’s law',
		def: 'A stretched or squashed spring pulls back with a force proportional to the stretch: F = −kx.',
		chapter: 'pendulums-shm',
	},
	'spring-constant': {
		term: 'Spring constant (k)',
		def: 'The stiffness of a spring: the force per metre of stretch, in N/m.',
		chapter: 'pendulums-shm',
	},
	'simple-harmonic-motion': {
		term: 'Simple harmonic motion (SHM)',
		def: 'Oscillation in which the acceleration is proportional to the displacement and opposite to it, a = −ω²x. Its motion is a sine or cosine wave, and its period does not depend on the amplitude.',
		chapter: 'pendulums-shm',
	},
	amplitude: {
		term: 'Amplitude (A)',
		def: 'The largest displacement of an oscillation from its equilibrium position.',
		chapter: 'pendulums-shm',
	},
	'angular-frequency': {
		term: 'Angular frequency (ω)',
		def: 'The rate at which the angle inside the sine or cosine of an oscillation grows, in radians per second: ω = 2π/T = 2πf.',
		chapter: 'pendulums-shm',
	},
	frequency: {
		term: 'Frequency (f)',
		def: 'The number of complete cycles per second: f = 1/T, measured in hertz.',
		chapter: 'pendulums-shm',
	},
	hertz: {
		term: 'Hertz (Hz)',
		def: 'The SI unit of frequency: one cycle per second. 1 Hz = 1 s⁻¹.',
		chapter: 'pendulums-shm',
	},
	// ---- 3.1 Angular speed ----
	'angular-displacement': {
		term: 'Angular displacement (θ)',
		def: 'The angle through which something has turned, measured in radians.',
		chapter: 'angular-speed',
	},
	'angular-speed': {
		term: 'Angular speed (ω)',
		def: 'How fast something turns: the rate of change of its angle, ω = dθ/dt, in radians per second. Every part of a rigid rotating object has the same ω.',
		chapter: 'angular-speed',
	},
	'revolutions-per-minute': {
		term: 'Revolutions per minute (rpm)',
		def: 'A common unit of rotation rate: full turns per minute. ω in rad/s = rpm × 2π/60.',
		chapter: 'angular-speed',
	},
	'tangential-speed': {
		term: 'Tangential speed',
		def: 'The speed of a point moving around a circle, directed along the tangent: v = ωr.',
		chapter: 'angular-speed',
	},
	'uniform-circular-motion': {
		term: 'Uniform circular motion',
		def: 'Motion around a circle at a steady speed. The velocity keeps changing direction, so the object is always accelerating.',
		chapter: 'angular-speed',
	},
	// ---- 3.2 Centripetal acceleration ----
	'centripetal-acceleration': {
		term: 'Centripetal acceleration',
		def: 'The acceleration of anything moving in a circle, pointing towards the centre: a = v²/r = ω²r.',
		chapter: 'centripetal-acceleration',
	},
	'centripetal-force': {
		term: 'Centripetal force',
		def: 'The net inward force needed to keep something moving in a circle, mv²/r. It is a role played by a real force such as tension, gravity, friction or a floor’s push, not a new kind of force.',
		chapter: 'centripetal-acceleration',
	},
	'centrifugal-force': {
		term: 'Centrifugal force',
		def: 'The outward push you seem to feel inside a rotating frame. It is a fictitious (inertial) force: really, your body tends to go straight while something pushes you inwards.',
		chapter: 'centripetal-acceleration',
	},
	// ---- 3.3 Designing spin gravity ----
	'artificial-gravity': {
		term: 'Artificial gravity',
		def: 'Apparent weight produced by rotation (or acceleration) instead of a planet. In a spinning habitat the floor pushes you inwards, giving g = ω²r pointing away from the axis.',
		chapter: 'spin-gravity',
	},
	'gravity-gradient': {
		term: 'Gravity gradient',
		def: 'A change in gravity from one place to another, such as from your feet to your head. In a spinning habitat it is Δg/g = Δr/r.',
		chapter: 'spin-gravity',
	},
	'centre-of-mass': {
		term: 'Centre of mass',
		def: 'The balance point of an object or a system of objects. Two masses on a cable spin about the point where m₁r₁ = m₂r₂.',
		chapter: 'spin-gravity',
	},
	// ---- 3.4 The Coriolis effect ----
	'coriolis-effect': {
		term: 'Coriolis effect',
		def: 'The apparent sideways swerve of anything moving inside a rotating frame, with acceleration 2ωv at right angles to the motion. From a non-rotating frame, the object is simply moving in a straight line.',
		chapter: 'coriolis',
	},
	spinward: {
		term: 'Spinward and antispinward',
		def: 'Inside a spinning habitat: spinward is the direction the floor is moving; antispinward is the opposite way.',
		chapter: 'coriolis',
	},
	'foucault-pendulum': {
		term: 'Foucault pendulum',
		def: 'A long pendulum whose direction of swing slowly turns because Earth rotates beneath it: once every sidereal day ÷ sin(latitude). First shown by Léon Foucault in Paris in 1851.',
		chapter: 'coriolis',
	},
	// ---- 4.1 Newton’s law of gravitation ----
	'law-of-gravitation': {
		term: 'Law of universal gravitation',
		def: 'Newton’s law: every pair of masses attracts with a force F = GMm/r², along the line joining their centres, where r is the distance between the centres.',
		chapter: 'gravitation',
	},
	'gravitational-constant': {
		term: 'Gravitational constant (G)',
		def: 'The constant in Newton’s law of gravitation: G = 6.674 × 10⁻¹¹ N·m²/kg². First measured by Henry Cavendish in 1797–98 with a torsion balance.',
		chapter: 'gravitation',
	},
	'shell-theorem': {
		term: 'Shell theorem',
		def: 'Newton’s result that a spherical body (uniform, or built of uniform layers) pulls on anything outside it as if all its mass were concentrated at its centre.',
		chapter: 'gravitation',
	},
	// ---- 4.2 Orbital speed ----
	orbit: {
		term: 'Orbit',
		def: 'The path of a body moving freely under the gravity of another: free fall in which the body moves sideways fast enough that it keeps missing the surface. Orbits are circles or ellipses.',
		chapter: 'orbital-speed',
	},
	'geostationary-orbit': {
		term: 'Geostationary orbit',
		def: 'A circular orbit above the equator with a period of one sidereal day, so the satellite stays above the same spot on the ground. Radius 42 164 km (35 786 km up).',
		chapter: 'orbital-speed',
	},
	'tidal-effect': {
		term: 'Tidal effect',
		def: 'A stretching caused by gravity being stronger on the near side of an object than on its far side. It raises the ocean tides and pulls on anything hanging below an orbiting ship.',
		chapter: 'orbital-speed',
	},
	// ---- 4.3 Kepler’s laws ----
	ellipse: {
		term: 'Ellipse',
		def: 'A stretched circle: the set of points whose distances from two fixed points (the foci) add up to the same total, 2a. Orbits are ellipses with the central body at one focus.',
		chapter: 'keplers-laws',
	},
	'semi-major-axis': {
		term: 'Semi-major axis (a)',
		def: 'Half the longest width of an ellipse; for an orbit, the average of the closest and furthest distances from the central body. It sets the period through T² ∝ a³.',
		chapter: 'keplers-laws',
	},
	eccentricity: {
		term: 'Eccentricity (e)',
		def: 'How stretched an ellipse is, from 0 (a circle) towards 1 (very long and thin). Each focus lies a distance ae from the centre. Earth’s orbit has e = 0.0167.',
		chapter: 'keplers-laws',
	},
	perihelion: {
		term: 'Perihelion and aphelion',
		def: 'The closest (perihelion, r = a(1 − e)) and furthest (aphelion, r = a(1 + e)) points of an orbit around the Sun or another star. Around Earth the words are perigee and apogee.',
		chapter: 'keplers-laws',
	},
	// ---- 4.4 Escape velocity ----
	'escape-velocity': {
		term: 'Escape velocity',
		def: 'The smallest speed at which a coasting object leaves a body’s gravity for good: v = √(2GM/r), which is √2 times the circular orbit speed at the same distance. 11.2 km/s from Earth’s surface.',
		chapter: 'escape-velocity',
	},
	// ---- 4.6 Orbital manoeuvring ----
	burn: {
		term: 'Burn',
		def: 'A firing of a spacecraft’s engine to change its velocity. A forward (prograde) burn raises the opposite side of the orbit; a backward (retrograde) burn lowers it.',
		chapter: 'orbital-manoeuvring',
	},
	'delta-v': {
		term: 'Delta-v (Δv)',
		def: 'The change in velocity a manoeuvre needs. It is the “cost” of moving between orbits, paid for with fuel.',
		chapter: 'orbital-manoeuvring',
	},
	'vis-viva': {
		term: 'Vis-viva equation',
		def: 'The speed at any point of an orbit: v² = GM(2/r − 1/a), where r is the current distance and a the semi-major axis.',
		chapter: 'orbital-manoeuvring',
	},
	'hohmann-transfer': {
		term: 'Hohmann transfer',
		def: 'The cheapest two-burn route between two circular orbits: half an ellipse that just touches both. Described by Walter Hohmann in 1925.',
		chapter: 'orbital-manoeuvring',
	},
	// ---- 5.1 Work as an integral ----
	work: {
		term: 'Work',
		def: 'Energy transferred by a force that moves something along its direction: W = Fd cos θ for a steady force, or W = ∫F dx (the area under a force–distance graph) for a changing one. Measured in joules.',
		chapter: 'work',
	},
	joule: {
		term: 'Joule (J)',
		def: 'The SI unit of work and energy: the work done by a 1 N force moving its object 1 m. 1 J = 1 N m = 1 kg m²/s².',
		chapter: 'work',
	},
	// ---- 5.2 Kinetic and potential energy ----
	'kinetic-energy': {
		term: 'Kinetic energy',
		def: 'Energy of motion, K = ½mv². It depends on speed but not direction, and quadruples when the speed doubles. (Part 10 corrects it near light speed.)',
		chapter: 'kinetic-potential-energy',
	},
	'work-energy-theorem': {
		term: 'Work–energy theorem',
		def: 'The net work done on an object equals its change in kinetic energy: W_net = ½mv² − ½mu².',
		chapter: 'kinetic-potential-energy',
	},
	'potential-energy': {
		term: 'Potential energy',
		def: 'Work stored by a conservative force because of position: mgh near a surface, ½kx² in a spring, −GMm/r for gravity (zero far away). Force is its downhill slope, F = −dU/dx.',
		chapter: 'kinetic-potential-energy',
	},
	'conservative-force': {
		term: 'Conservative force',
		def: 'A force, like gravity or an ideal spring, that gives back all the work done against it, whatever the route taken. Only conservative forces have a potential energy. Friction is not conservative.',
		chapter: 'kinetic-potential-energy',
	},
	'mechanical-energy': {
		term: 'Mechanical energy',
		def: 'Kinetic plus potential energy, K + U. It stays constant when only conservative forces do work.',
		chapter: 'kinetic-potential-energy',
	},
	// ---- 5.3 Power ----
	power: {
		term: 'Power',
		def: 'The rate of transferring energy or doing work, P = dW/dt, measured in watts. A force pushing an object at speed v delivers P = Fv.',
		chapter: 'power',
	},
	'kilowatt-hour': {
		term: 'Kilowatt-hour (kWh)',
		def: 'The energy delivered in one hour at a power of 1 kW: 3.6 × 10⁶ J. Used on electricity bills.',
		chapter: 'power',
	},
	efficiency: {
		term: 'Efficiency (η)',
		def: 'The fraction of a machine’s input power (or energy) that comes out in the useful form: η = useful output / input, between 0 and 1.',
		chapter: 'power',
	},
	// ---- 5.4 Conservation laws ----
	'thermal-energy': {
		term: 'Thermal energy',
		def: 'The energy of the random jiggling of atoms and molecules, felt as warmth. Friction and drag turn mechanical energy into thermal energy.',
		chapter: 'conservation-laws',
	},
	'closed-system': {
		term: 'Closed system',
		def: 'A collection of objects that nothing enters or leaves and that no outside influence acts on. Conserved quantities keep their totals in a closed system.',
		chapter: 'conservation-laws',
	},
	'conservation-of-energy': {
		term: 'Conservation of energy',
		def: 'Energy is never created or destroyed, only transferred or converted between forms (kinetic, potential, thermal, chemical, light, mass). The total in a closed system is constant.',
		chapter: 'conservation-laws',
	},
	'bound-orbit': {
		term: 'Bound orbit',
		def: 'An orbit with negative total energy, E = −GMm/2a, which can never carry the object arbitrarily far away. Zero or positive energy means the object escapes.',
		chapter: 'conservation-laws',
	},
	// ---- 5.5 Momentum ----
	momentum: {
		term: 'Momentum',
		def: 'Mass times velocity, p = mv: a vector, measured in kg m/s. Force is its rate of change, F = dp/dt. Light carries momentum too, p = E/c.',
		chapter: 'momentum',
	},
	impulse: {
		term: 'Impulse',
		def: 'The change in momentum a force produces: J = ∫F dt, the area under a force–time graph, or F × Δt for a steady force. Measured in N s.',
		chapter: 'momentum',
	},
	'conservation-of-momentum': {
		term: 'Conservation of momentum',
		def: 'With no outside force, the total momentum of a system never changes, because internal forces come in equal and opposite pairs (Newton’s third law). It explains recoil, collisions and rockets.',
		chapter: 'momentum',
	},
	'elastic-collision': {
		term: 'Elastic collision',
		def: 'A collision in which kinetic energy is conserved as well as momentum: the objects bounce apart with no energy turned into heat or sound.',
		chapter: 'momentum',
	},
	'inelastic-collision': {
		term: 'Inelastic collision',
		def: 'A collision in which some kinetic energy becomes heat, sound or deformation. Momentum is still conserved. When the objects stick together it is perfectly inelastic.',
		chapter: 'momentum',
	},
	// ---- 5.6 Thrust ----
	propellant: {
		term: 'Propellant',
		def: 'The material a rocket throws out of its engine to push itself along: burnt fuel and oxidiser, ions, or, for an Astrophage drive, light made from the fuel’s mass.',
		chapter: 'thrust',
	},
	thrust: {
		term: 'Thrust',
		def: 'The push on a rocket from its exhaust: F = ṁ v_e, the mass thrown out per second times the exhaust speed. For a light drive, F = ṁc.',
		chapter: 'thrust',
	},
	'exhaust-velocity': {
		term: 'Exhaust speed (v_e)',
		def: 'How fast a rocket’s exhaust leaves, relative to the rocket: about 2.6–4.5 km/s for chemical rockets, 20–50 km/s for ion engines, and c for light.',
		chapter: 'thrust',
	},
	'specific-impulse': {
		term: 'Specific impulse (I_sp)',
		def: 'Exhaust speed divided by standard gravity, I_sp = v_e/g₀, quoted in seconds. The RS-25’s 452 s means 4.44 km/s.',
		chapter: 'thrust',
	},
	// ---- 5.7 The rocket equation ----
	'rocket-equation': {
		term: 'Tsiolkovsky rocket equation',
		def: 'The speed a rocket gains by burning propellant: Δv = v_e ln(m₀/m_f). Published by Konstantin Tsiolkovsky in 1903.',
		chapter: 'rocket-equation',
	},
	'mass-ratio': {
		term: 'Mass ratio',
		def: 'A rocket’s starting mass divided by its final mass, m₀/m_f. It must equal e raised to the power Δv/v_e, so it grows exponentially with the Δv wanted.',
		chapter: 'rocket-equation',
	},
	// ---- 6.1 Temperature and heat ----
	temperature: {
		term: 'Temperature',
		def: 'A measure of how vigorously the particles of a substance jiggle: proportional to their average kinetic energy, ⅔ × KE/k in kelvins.',
		chapter: 'temperature-heat',
	},
	'thermal-equilibrium': {
		term: 'Thermal equilibrium',
		def: 'The state reached when objects in contact stop exchanging heat overall, because they are at the same temperature.',
		chapter: 'temperature-heat',
	},
	'zeroth-law': {
		term: 'Zeroth law of thermodynamics',
		def: 'If A is in thermal equilibrium with B, and B with C, then A is in thermal equilibrium with C. It is why thermometers work.',
		chapter: 'temperature-heat',
	},
	'boltzmann-constant': {
		term: 'Boltzmann constant (k)',
		def: 'The number linking temperature to energy, k = 1.380649 × 10⁻²³ J/K (exact since 2019). A gas molecule’s average kinetic energy is 3/2 kT.',
		chapter: 'temperature-heat',
	},
	'rms-speed': {
		term: 'Root-mean-square speed',
		def: 'The square root of the average of the squared speeds of a gas’s molecules: v_rms = √(3kT/m). About 511 m/s for nitrogen at 20 °C.',
		chapter: 'temperature-heat',
	},
	'internal-energy': {
		term: 'Internal energy',
		def: 'All the energy stored inside an object at the scale of its atoms: their kinetic energy of jiggling plus the potential energy of the forces between them.',
		chapter: 'temperature-heat',
	},
	heat: {
		term: 'Heat',
		def: 'Energy that flows from one object to another because they are at different temperatures. Objects contain internal energy, not heat.',
		chapter: 'temperature-heat',
	},
	calorie: {
		term: 'Calorie',
		def: 'An old unit of heat: the energy that warms 1 g of water by 1 °C, now defined as exactly 4.184 J. A food Calorie is 1000 of them.',
		chapter: 'temperature-heat',
	},
	'first-law': {
		term: 'First law of thermodynamics',
		def: 'Energy conservation for heat and work: ΔU = Q − W, where Q is the heat flowing in and W the work the system does on its surroundings.',
		chapter: 'temperature-heat',
	},
	'thermal-expansion': {
		term: 'Thermal expansion',
		def: 'The growth of most materials as they warm: ΔL = αLΔT, with α = 12 × 10⁻⁶ per kelvin for steel.',
		chapter: 'temperature-heat',
	},
	// ---- 6.2 Specific and latent heat ----
	'specific-heat': {
		term: 'Specific heat (c)',
		def: 'The heat needed to warm 1 kg of a material by 1 K, so Q = mcΔT. Water: 4186 J/(kg·K), about ten times iron’s.',
		chapter: 'specific-latent-heat',
	},
	'heat-capacity': {
		term: 'Heat capacity',
		def: 'The heat an object absorbs per kelvin of warming: mc for a mass m of one material.',
		chapter: 'specific-latent-heat',
	},
	calorimetry: {
		term: 'Calorimetry',
		def: 'Measuring heat by mixing objects in an insulated container: the heat lost by the hot parts equals the heat gained by the cold parts.',
		chapter: 'specific-latent-heat',
	},
	'phase-change': {
		term: 'Phase change',
		def: 'A change between solid, liquid and gas (melting, freezing, boiling, condensing). It happens at a fixed temperature while latent heat flows in or out.',
		chapter: 'specific-latent-heat',
	},
	'latent-heat': {
		term: 'Latent heat (L)',
		def: 'The heat per kilogram absorbed or released at a phase change, Q = mL, with no change in temperature. Water: 334 kJ/kg to melt, 2256 kJ/kg to boil.',
		chapter: 'specific-latent-heat',
	},
	// ---- 6.3 Heat transfer ----
	conduction: {
		term: 'Conduction',
		def: 'Heat passed from particle to particle through a material, with no overall movement of the material. P = kAΔT/d through a slab.',
		chapter: 'heat-transfer',
	},
	convection: {
		term: 'Convection',
		def: 'Heat carried by a moving fluid: warm fluid rises and cool fluid sinks (needs gravity), or a fan or wind moves it.',
		chapter: 'heat-transfer',
	},
	'thermal-radiation': {
		term: 'Thermal radiation',
		def: 'Electromagnetic radiation (infrared at everyday temperatures) given off by every object because its particles jiggle. It needs no material and crosses empty space.',
		chapter: 'heat-transfer',
	},
	'thermal-conductivity': {
		term: 'Thermal conductivity (k)',
		def: 'How well a material conducts heat, in W/(m·K): copper 390, glass 0.84, still air 0.023.',
		chapter: 'heat-transfer',
	},
	'newtons-law-of-cooling': {
		term: 'Newton’s law of cooling',
		def: 'An object’s excess temperature over its surroundings falls at a rate proportional to itself, so the gap decays exponentially, shrinking by the same factor each equal time.',
		chapter: 'heat-transfer',
	},
	'stefan-boltzmann-constant': {
		term: 'Stefan–Boltzmann constant (σ)',
		def: 'The constant in the radiation law P = eσAT⁴: σ = 5.67 × 10⁻⁸ W/(m²K⁴).',
		chapter: 'heat-transfer',
	},
	emissivity: {
		term: 'Emissivity (e)',
		def: 'How well a surface radiates (and absorbs) compared with a perfect black body, from 0 to 1. Skin is 0.97 in the infrared.',
		chapter: 'heat-transfer',
	},
	// ---- 6.4 Planetary energy balance ----
	'equilibrium-temperature': {
		term: 'Equilibrium temperature',
		def: 'The temperature at which a planet radiates away exactly as much power as it absorbs from its star: [S(1 − α)/4σ] to the power ¼. 255 K for Earth.',
		chapter: 'energy-balance',
	},
	albedo: {
		term: 'Albedo',
		def: 'The fraction of sunlight a surface or planet reflects. Earth 0.29, fresh snow 0.8, desert sand 0.4, open ocean 0.06.',
		chapter: 'energy-balance',
	},
	// ---- 6.5 The greenhouse effect ----
	'greenhouse-effect': {
		term: 'Greenhouse effect',
		def: 'The warming of a planet’s surface by gases that let sunlight in but absorb the surface’s infrared and radiate part of it back down. It keeps Earth about 33 K warmer than its equilibrium temperature.',
		chapter: 'greenhouse-effect',
	},
	'greenhouse-gas': {
		term: 'Greenhouse gas',
		def: 'A gas whose molecules absorb and emit infrared because their charge is lopsided: water vapour, carbon dioxide, methane, ammonia. Nitrogen and oxygen are not.',
		chapter: 'greenhouse-effect',
	},
	'radiative-forcing': {
		term: 'Radiative forcing',
		def: 'A change in a planet’s energy balance, in W/m², before the climate responds: positive warms, negative cools. Doubling CO₂ gives about +3.7 W/m²; a 1% dimmer Sun about −2.4 W/m².',
		chapter: 'greenhouse-effect',
	},
	// ---- 6.6 Feedback loops ----
	feedback: {
		term: 'Feedback',
		def: 'A loop where a change causes effects that come back to alter the change itself. Positive feedback amplifies it; negative feedback damps it.',
		chapter: 'feedback-loops',
	},
	'planck-response': {
		term: 'Planck response',
		def: 'The climate’s basic negative feedback: a warmer planet radiates more, about 4σT³ ≈ 3.8 W/m² more per kelvin, which pulls it back towards balance.',
		chapter: 'feedback-loops',
	},
	'feedback-factor': {
		term: 'Feedback factor (f)',
		def: 'The fraction of each temperature change that the amplifying feedbacks add back. The total change is ΔT₀/(1 − f); f ≈ 0.68 for Earth, a gain of about 3. At f = 1 the change runs away.',
		chapter: 'feedback-loops',
	},
	'climate-sensitivity': {
		term: 'Climate sensitivity',
		def: 'How much the Earth’s temperature changes in the end for a given forcing: about 3 °C per doubling of CO₂ (likely 2.5 to 4 °C), or about 0.8 K per W/m².',
		chapter: 'feedback-loops',
	},
	'tipping-point': {
		term: 'Tipping point',
		def: 'A threshold beyond which a small extra push sets off a large, self-reinforcing change, such as ice spreading to the equator in a snowball Earth.',
		chapter: 'feedback-loops',
	},
	hysteresis: {
		term: 'Hysteresis',
		def: 'When a system’s state depends on its history: under the same Sun, the Earth can be warm or frozen, depending on which it was before.',
		chapter: 'feedback-loops',
	},
	// ---- 7.1 Wave properties ----
	wave: {
		term: 'Wave',
		def: 'A disturbance that travels from place to place, carrying energy and information but not the material it passes through. Each bit of the medium only moves a little around its rest position.',
		chapter: 'wave-properties',
	},
	medium: {
		term: 'Medium (of a wave)',
		def: 'The material a wave travels through, such as a rope, water or air. Light is the exception: it needs no medium and crosses empty space.',
		chapter: 'wave-properties',
	},
	'transverse-wave': {
		term: 'Transverse wave',
		def: 'A wave in which the medium moves across the direction the wave travels, like a wave on a rope. Light is transverse.',
		chapter: 'wave-properties',
	},
	'longitudinal-wave': {
		term: 'Longitudinal wave',
		def: 'A wave in which the medium moves back and forth along the direction of travel, forming compressions and rarefactions. Sound is longitudinal.',
		chapter: 'wave-properties',
	},
	wavelength: {
		term: 'Wavelength (λ)',
		def: 'The distance from one crest of a wave to the next (one full repeat of the pattern), in metres.',
		chapter: 'wave-properties',
	},
	'wave-speed': {
		term: 'Wave speed (v)',
		def: 'How fast a wave’s pattern moves: v = fλ. It is set by the medium; the frequency is set by the source.',
		chapter: 'wave-properties',
	},
	wavenumber: {
		term: 'Wavenumber (k)',
		def: 'k = 2π/λ, the number of radians of phase per metre along a wave. With ω = 2πf, a travelling wave is y = A cos(kx − ωt) and v = ω/k.',
		chapter: 'wave-properties',
	},
	phase: {
		term: 'Phase',
		def: 'Where a wave or oscillation is in its cycle, measured as the angle inside the cosine, kx − ωt. Two waves “in phase” reach their crests together.',
		chapter: 'wave-properties',
	},
	superposition: {
		term: 'Superposition',
		def: 'Where waves overlap, the total displacement is the sum of the separate displacements; afterwards each wave carries on unchanged.',
		chapter: 'wave-properties',
	},
	interference: {
		term: 'Interference',
		def: 'The adding of overlapping waves. In step (path difference mλ) they reinforce: constructive. Half a wavelength out of step ((m + ½)λ) they cancel: destructive.',
		chapter: 'wave-properties',
	},
	'standing-wave': {
		term: 'Standing wave',
		def: 'The pattern made by two equal waves travelling in opposite directions: it throbs in place without travelling, with motionless nodes half a wavelength apart.',
		chapter: 'wave-properties',
	},
	// ---- 7.2 c = fλ and the EM spectrum ----
	'electric-charge': {
		term: 'Electric charge',
		def: 'A property of particles that makes them push or pull on each other: electrons are negative, protons positive. Like charges repel, opposite charges attract.',
		chapter: 'em-spectrum',
	},
	'electric-field': {
		term: 'Electric field',
		def: 'The push a small test charge would feel at each point in space, per unit of its charge. Charges make electric fields; changing fields can travel as light.',
		chapter: 'em-spectrum',
	},
	'electromagnetic-wave': {
		term: 'Electromagnetic wave',
		def: 'A self-sustaining ripple of electric and magnetic fields, at right angles to each other and to the direction of travel. It needs no medium and travels at c in a vacuum. Light, radio and X-rays are all electromagnetic waves.',
		chapter: 'em-spectrum',
	},
	'speed-of-light': {
		term: 'Speed of light (c)',
		def: 'c = 299 792 458 m/s exactly in a vacuum, the same for every electromagnetic wave. Since 1983 it defines the metre.',
		chapter: 'em-spectrum',
	},
	'electromagnetic-spectrum': {
		term: 'Electromagnetic spectrum',
		def: 'The full range of electromagnetic waves by wavelength: gamma rays, X-rays, ultraviolet, visible light (about 400–750 nm), infrared, microwaves and radio.',
		chapter: 'em-spectrum',
	},
	infrared: {
		term: 'Infrared',
		def: 'Electromagnetic waves a little longer than red light, from about 750 nm to 1 mm. Warm objects glow in the infrared; the Petrova line is at 25.984 µm.',
		chapter: 'em-spectrum',
	},
	'refractive-index': {
		term: 'Refractive index (n)',
		def: 'How many times slower light travels in a material than in a vacuum: n = c/v. Water 1.33, glass about 1.5, diamond 2.419.',
		chapter: 'em-spectrum',
	},
	refraction: {
		term: 'Refraction',
		def: 'The bending of a wave as it crosses into a material where it travels at a different speed. Light entering a slower material bends towards the normal.',
		chapter: 'em-spectrum',
	},
	'snells-law': {
		term: 'Snell’s law',
		def: 'n₁ sin θ₁ = n₂ sin θ₂, with angles measured from the normal: the rule for how much light bends at a boundary.',
		chapter: 'em-spectrum',
	},
	'total-internal-reflection': {
		term: 'Total internal reflection',
		def: 'When light inside a dense material meets its surface at more than the critical angle (sin θc = 1/n) and is reflected back completely. Optical fibres use it.',
		chapter: 'em-spectrum',
	},
	// ---- 7.3 Photons ----
	'photoelectric-effect': {
		term: 'Photoelectric effect',
		def: 'Light knocking electrons out of a metal. It happens only above a threshold frequency, however bright the light, which showed that light comes in photons.',
		chapter: 'photons',
	},
	photon: {
		term: 'Photon',
		def: 'A single packet of light energy, E = hf. Brightness is how many photons arrive; colour (frequency) is how much energy each carries.',
		chapter: 'photons',
	},
	'planck-constant': {
		term: 'Planck constant (h)',
		def: 'h = 6.626 070 15 × 10⁻³⁴ J·s exactly: the constant in a photon’s energy E = hf. Fixing it defines the kilogram (since 2019).',
		chapter: 'photons',
	},
	electronvolt: {
		term: 'Electronvolt (eV)',
		def: 'A unit for tiny energies: 1 eV = 1.602 × 10⁻¹⁹ J, the energy an electron gains from 1 volt. Visible photons carry 1.65–3.1 eV.',
		chapter: 'photons',
	},
	'work-function': {
		term: 'Work function (φ)',
		def: 'The least energy needed to pull an electron out of a metal: 2.46 eV for sodium, 4.73 eV for silver. Freed electrons have up to hf − φ of kinetic energy.',
		chapter: 'photons',
	},
	'wave-particle-duality': {
		term: 'Wave–particle duality',
		def: 'Light (and matter) travels like a wave, interfering and diffracting, but is absorbed and emitted in single lumps, like particles.',
		chapter: 'photons',
	},
	// ---- 7.4 The momentum of light and photon propulsion ----
	'radiation-pressure': {
		term: 'Radiation pressure',
		def: 'The push of light per square metre: I/c on a surface that absorbs it, 2I/c on a perfect mirror. Sunlight at 1 au gives about 4.5 × 10⁻⁶ Pa.',
		chapter: 'photon-propulsion',
	},
	'solar-sail': {
		term: 'Solar sail',
		def: 'A large, thin, light mirror that is pushed by sunlight. IKAROS (2010) was the first to fly between planets.',
		chapter: 'photon-propulsion',
	},
	'photon-rocket': {
		term: 'Photon rocket',
		def: 'A rocket whose exhaust is light. Its thrust is F = P/c: tiny per watt, but the exhaust speed c is the highest possible. The Hail Mary is one.',
		chapter: 'photon-propulsion',
	},
	// ---- 7.5 Spectroscopy ----
	dispersion: {
		term: 'Dispersion',
		def: 'The spreading of light into its colours because a material’s refractive index is slightly different for each wavelength (violet bends more than red in glass).',
		chapter: 'spectroscopy',
	},
	spectrum: {
		term: 'Spectrum',
		def: 'Light spread out by wavelength, by a prism or a grating; or the pattern of how much light there is at each wavelength.',
		chapter: 'spectroscopy',
	},
	'emission-spectrum': {
		term: 'Emission spectrum',
		def: 'The bright lines given out by a hot, thin gas, at wavelengths set by its atoms’ energy levels: a fingerprint of the element.',
		chapter: 'spectroscopy',
	},
	'absorption-spectrum': {
		term: 'Absorption spectrum',
		def: 'A continuous spectrum with dark lines where a cooler gas in front has absorbed light, at the same wavelengths that gas would emit.',
		chapter: 'spectroscopy',
	},
	'energy-level': {
		term: 'Energy level',
		def: 'One of the fixed energies an electron in an atom (or a vibrating molecule) can have. Jumping between levels emits or absorbs a photon of the energy difference. Hydrogen: Eₙ = −13.6 eV/n².',
		chapter: 'spectroscopy',
	},
	'doppler-effect': {
		term: 'Doppler effect',
		def: 'The change in wavelength when a source moves along the line of sight: shorter (blueshift) when approaching, longer (redshift) when receding. Δλ/λ = v/c for v much less than c.',
		chapter: 'spectroscopy',
	},
	'radial-velocity': {
		term: 'Radial-velocity method',
		def: 'Finding a planet by the small, regular Doppler shifts of its star as the planet tugs it back and forth. It gives the planet’s minimum mass.',
		chapter: 'spectroscopy',
	},
	// ---- 8.1 Blackbody radiation and Wien's law ----
	blackbody: {
		term: 'Blackbody',
		def: 'An ideal object that absorbs all light falling on it. When hot, it glows with a spectrum that depends only on its temperature. The Sun and a small hole in a hot box are close to blackbodies.',
		chapter: 'blackbody-wien',
	},
	'plancks-law': {
		term: 'Planck’s law',
		def: 'The formula for a blackbody’s spectrum, B = (2hc²/λ⁵)/(e^(hc/λkT) − 1). Planck found it in 1900 by assuming light is emitted in lumps of hf.',
		chapter: 'blackbody-wien',
	},
	'wiens-law': {
		term: 'Wien’s displacement law',
		def: 'A blackbody’s spectrum peaks at λmax = b/T, with b = 2.898 × 10⁻³ m·K: hotter objects peak at shorter wavelengths. The Sun peaks at about 500 nm.',
		chapter: 'blackbody-wien',
	},
	'ultraviolet-catastrophe': {
		term: 'Ultraviolet catastrophe',
		def: 'The prediction of classical (wave) physics that a hot object should glow ever more strongly at short wavelengths, giving infinite power. Planck’s photon lumps resolved it.',
		chapter: 'blackbody-wien',
	},
	// ---- 8.2 The Stefan–Boltzmann law and luminosity ----
	'stefan-boltzmann-law': {
		term: 'Stefan–Boltzmann law',
		def: 'A blackbody radiates σT⁴ watts from each square metre: the area under Planck’s curve. Found by Stefan (1879) and explained by Boltzmann (1884).',
		chapter: 'stefan-boltzmann',
	},
	'effective-temperature': {
		term: 'Effective temperature',
		def: 'The temperature a blackbody of a star’s size would need to give out the star’s luminosity, from L = 4πR²σT⁴. The Sun’s is 5772 K.',
		chapter: 'stefan-boltzmann',
	},
	// ---- 8.3 The inverse-square law and the solar constant ----
	'habitable-zone': {
		term: 'Habitable zone',
		def: 'The range of distances from a star where an Earth-like planet could keep liquid water on its surface: about 0.99 to 1.67 au for the Sun (one model). It scales with √L.',
		chapter: 'solar-constant',
	},
	'angular-radius': {
		term: 'Angular radius',
		def: 'Half the angle a star or planet appears to span in the sky: about R/d radians for an object of radius R at distance d. Starlight received is σT⁴ × (R/d)².',
		chapter: 'solar-constant',
	},
	// ---- 8.4 The Sun vs Tau Ceti ----
	'main-sequence': {
		term: 'Main sequence',
		def: 'The long, steady stage of a star’s life when it burns hydrogen in its core. Its length goes roughly as mass ÷ luminosity: about 10 billion years for the Sun.',
		chapter: 'sun-vs-tau-ceti',
	},
	metallicity: {
		term: 'Metallicity',
		def: 'How much of a star is made of elements heavier than helium (“metals” to astronomers), measured from its spectral lines. Tau Ceti has about a third of the Sun’s.',
		chapter: 'sun-vs-tau-ceti',
	},
	// ---- 9.1 E = mc² ----
	'mass-energy-equivalence': {
		term: 'Mass–energy equivalence (E = mc²)',
		def: 'Mass is a form of energy: a mass m stores energy mc², and any energy E carries mass E/c². Derived from light’s momentum and the centre of mass (Einstein, 1905–06).',
		chapter: 'mass-energy',
	},
	'rest-energy': {
		term: 'Rest energy',
		def: 'The energy a body has just by having mass, at rest: mc². For 1 kg it is 8.988 × 10¹⁶ J.',
		chapter: 'mass-energy',
	},
	'mass-defect': {
		term: 'Mass defect',
		def: 'How much lighter the products of a nuclear reaction are than what went in. Times c², it is the energy released: 0.712% for hydrogen fusing to helium.',
		chapter: 'mass-energy',
	},
	antimatter: {
		term: 'Antimatter',
		def: 'Particles with the same mass as ordinary ones but opposite charge, such as the positron. Matter meeting antimatter turns its whole mass into energy.',
		chapter: 'mass-energy',
	},
	// ---- 9.2 Energy density ----
	'specific-energy': {
		term: 'Specific energy',
		def: 'Energy a fuel releases per kilogram, in J/kg: gasoline 46 MJ/kg, uranium fission 81 TJ/kg, complete mass–energy c² = 90 PJ/kg.',
		chapter: 'energy-density',
	},
	'energy-density': {
		term: 'Energy density',
		def: 'Energy stored per volume, in J/m³ or MJ/L: density × specific energy. Petrol holds 34 MJ per litre; hydrogen gas at room pressure only 0.012.',
		chapter: 'energy-density',
	},
	// ---- 10.1 The postulates of relativity ----
	'inertial-frame': {
		term: 'Inertial frame',
		def: 'A frame of reference that is not accelerating, where Newton’s first law holds. A coasting spacecraft is one; the Hail Mary under thrust is not.',
		chapter: 'postulates',
	},
	'principle-of-relativity': {
		term: 'Principle of relativity',
		def: 'The laws of physics are the same in every inertial frame, so no experiment can reveal absolute rest or absolute steady motion (Galileo, 1632).',
		chapter: 'postulates',
	},
	'postulates-of-relativity': {
		term: 'Postulates of special relativity',
		def: 'Einstein (1905): (1) the laws of physics are the same in every inertial frame; (2) light in a vacuum travels at c in every inertial frame.',
		chapter: 'postulates',
	},
	event: {
		term: 'Event',
		def: 'Something that happens at one place at one moment, described by a position and a time in some frame.',
		chapter: 'postulates',
	},
	'relativity-of-simultaneity': {
		term: 'Relativity of simultaneity',
		def: 'Two events that happen at the same time in one frame happen at different times in a frame moving relative to it. There is no universal “now”.',
		chapter: 'postulates',
	},
	// ---- 10.2 Time dilation ----
	'time-dilation': {
		term: 'Time dilation',
		def: 'A clock moving relative to you runs slow by the Lorentz factor: Δt = γΔτ. At 0.92c, each year on the ship is 2.55 years on Earth.',
		chapter: 'time-dilation',
	},
	'proper-time': {
		term: 'Proper time (τ)',
		def: 'The time between two events measured by a clock present at both, such as the ship’s own clock for a trip. It is the shortest time any observer measures.',
		chapter: 'time-dilation',
	},
	'lorentz-factor': {
		term: 'Lorentz factor (γ)',
		def: 'γ = 1/√(1 − v²/c²): 1 at rest, 1.25 at 0.6c, 2.55 at 0.92c, growing without limit as v approaches c. It sets time dilation and length contraction.',
		chapter: 'time-dilation',
	},
	'twin-paradox': {
		term: 'Twin paradox',
		def: 'A traveller who goes away fast and comes back ages less than a twin who stays home. Not a contradiction: the traveller accelerates to turn round, so the two situations aren’t symmetric.',
		chapter: 'time-dilation',
	},
	// ---- 10.3 The Lorentz factor ----
	'relativistic-momentum': {
		term: 'Relativistic momentum',
		def: 'p = γmv, the momentum that is conserved in every inertial frame. Close to mv at low speed; grows without limit near c.',
		chapter: 'lorentz-factor',
	},
	'relativistic-energy': {
		term: 'Relativistic energy',
		def: 'A body’s total energy E = γmc²: its rest energy mc² plus kinetic energy (γ − 1)mc², which becomes ½mv² at low speed. E² = (pc)² + (mc²)².',
		chapter: 'lorentz-factor',
	},
	// ---- 10.4 Length contraction ----
	'length-contraction': {
		term: 'Length contraction',
		def: 'A moving object or distance is shorter along its motion by the Lorentz factor: L = L₀/γ. Sizes across the motion don’t change.',
		chapter: 'length-contraction',
	},
	'proper-length': {
		term: 'Proper length (L₀)',
		def: 'The length of an object or distance measured in the frame where it is at rest: the longest length any observer measures.',
		chapter: 'length-contraction',
	},
	// ---- 10.5 Velocity addition ----
	'lorentz-transformation': {
		term: 'Lorentz transformation',
		def: 'The rules translating an event’s position and time between frames: x′ = γ(x − vt), t′ = γ(t − vx/c²). They replace Galileo’s x′ = x − vt, t′ = t.',
		chapter: 'velocity-addition',
	},
	'velocity-addition': {
		term: 'Relativistic velocity addition',
		def: 'u = (u′ + v)/(1 + u′v/c²): how velocities combine between frames. Nearly u′ + v when slow; never more than c; exactly c for light.',
		chapter: 'velocity-addition',
	},
	rapidity: {
		term: 'Rapidity (φ)',
		def: 'A measure of speed that simply adds between frames: β = tanh φ. At low speed φ ≈ v/c; it grows without limit as v approaches c. γ = cosh φ.',
		chapter: 'velocity-addition',
	},
	'hyperbolic-functions': {
		term: 'Hyperbolic functions',
		def: 'cosh φ = (eᵠ + e⁻ᵠ)/2, sinh φ = (eᵠ − e⁻ᵠ)/2, tanh φ = sinh φ / cosh φ. They satisfy cosh² − sinh² = 1 and describe motion near the speed of light.',
		chapter: 'velocity-addition',
	},
	'relativistic-doppler': {
		term: 'Relativistic Doppler shift',
		def: 'Light from a source receding at β is stretched by √((1 + β)/(1 − β)) = eᵠ (squeezed by the inverse when approaching): 4.90 at 0.92c.',
		chapter: 'velocity-addition',
	},
	// ---- 10.6 Ship time vs Earth time ----
	'proper-acceleration': {
		term: 'Proper acceleration',
		def: 'The acceleration measured on board, in the ship’s own momentary rest frame: what the crew feel as weight. Holding it constant adds rapidity steadily, φ = aτ/c.',
		chapter: 'ship-time-earth-time',
	},
	// ---- 11.1 Sound as pressure waves ----
	pressure: {
		term: 'Pressure (P)',
		def: 'Force per unit area, P = F/A, pushing at right angles on a surface. In a gas it comes from molecules hitting the surface. Measured in pascals.',
		chapter: 'pressure-waves',
	},
	pascal: {
		term: 'Pascal (Pa)',
		def: 'The SI unit of pressure: one newton per square metre. Atmospheric pressure is about 101 kPa.',
		chapter: 'pressure-waves',
	},
	'atmospheric-pressure': {
		term: 'Atmospheric pressure',
		def: 'The pressure of Earth’s air at sea level: one standard atmosphere (atm) is exactly 101 325 Pa, the weight of about 10 tonnes of air on every square metre.',
		chapter: 'pressure-waves',
	},
	'compression-rarefaction': {
		term: 'Compression and rarefaction',
		def: 'In a sound wave, a compression is a region where the medium is squeezed to above its normal pressure; a rarefaction is where it is stretched to below it.',
		chapter: 'pressure-waves',
	},
	'pressure-amplitude': {
		term: 'Pressure amplitude (Δp)',
		def: 'The largest change in pressure from normal caused by a sound wave. Even a loud sound changes air pressure by only a few parts in ten thousand.',
		chapter: 'pressure-waves',
	},
	'acoustic-impedance': {
		term: 'Acoustic impedance (Z)',
		def: 'Z = ρv, density times the speed of sound: the pressure a medium pushes back with per unit of speed you push it with (Δp = Zu). About 413 Pa·s/m for air, 1.5 × 10⁶ for water.',
		chapter: 'pressure-waves',
	},
	decibel: {
		term: 'Decibel (dB)',
		def: 'The unit of sound intensity level, β = 10 log₁₀(I/I₀) with I₀ = 10⁻¹² W/m². Every factor of 10 in intensity adds 10 dB; doubling adds 3 dB.',
		chapter: 'pressure-waves',
	},
	'threshold-of-hearing': {
		term: 'Threshold of hearing (I₀)',
		def: 'The faintest sound a person with normal hearing can detect at 1000 Hz: about 10⁻¹² W/m², 0 dB, a pressure swing of about 3 × 10⁻⁵ Pa.',
		chapter: 'pressure-waves',
	},
	// ---- 11.2 Frequency and pitch ----
	pitch: {
		term: 'Pitch',
		def: 'How high or low a sound seems: our perception of its frequency. Equal steps in pitch are equal ratios of frequency, not equal differences.',
		chapter: 'frequency-pitch',
	},
	octave: {
		term: 'Octave',
		def: 'The step between two notes whose frequencies are in the ratio 2 : 1. Notes an octave apart sound like the same note, higher or lower.',
		chapter: 'frequency-pitch',
	},
	'equal-temperament': {
		term: 'Equal temperament',
		def: 'The modern tuning that splits each octave into 12 equal semitones, each a frequency ratio of 2^(1/12) ≈ 1.0595: f = 440 × 2^(n/12) Hz for the note n semitones above A4.',
		chapter: 'frequency-pitch',
	},
	beats: {
		term: 'Beats',
		def: 'The slow, regular rise and fall in loudness heard when two notes of nearly equal frequency sound together. The beat frequency is the difference, |f₁ − f₂|.',
		chapter: 'frequency-pitch',
	},
	ultrasound: {
		term: 'Ultrasound and infrasound',
		def: 'Sound above the human hearing range (above about 20 kHz) is ultrasound; sound below it (under about 20 Hz) is infrasound.',
		chapter: 'frequency-pitch',
	},
	'mach-number': {
		term: 'Mach number',
		def: 'A source’s speed divided by the speed of sound. Above Mach 1 the wavefronts pile up into a cone-shaped shock wave, heard as a sonic boom.',
		chapter: 'frequency-pitch',
	},
	// ---- 11.3 The speed of sound in different media ----
	'bulk-modulus': {
		term: 'Bulk modulus (B)',
		def: 'How hard a material is to squeeze: B = −Δp/(ΔV/V), the extra pressure needed per fractional loss of volume. Water: 2.2 × 10⁹ Pa. Sound in a fluid travels at √(B/ρ).',
		chapter: 'speed-of-sound',
	},
	'youngs-modulus': {
		term: 'Young’s modulus (Y)',
		def: 'How hard a solid is to stretch or squash along one direction: stress divided by fractional change in length. Steel: about 2 × 10¹¹ Pa. Sound along a thin rod travels at √(Y/ρ).',
		chapter: 'speed-of-sound',
	},
	'adiabatic-process': {
		term: 'Adiabatic process',
		def: 'A change so quick (or so well insulated) that no heat flows in or out. Squeezing a gas adiabatically warms it, so its pressure rises more than if it were held at constant temperature.',
		chapter: 'speed-of-sound',
	},
	'adiabatic-index': {
		term: 'Adiabatic index (γ)',
		def: 'The factor by which quick (adiabatic) squeezing stiffens a gas: B = γP. About 5/3 for single atoms (helium, xenon), 7/5 = 1.40 for air, 1.31 for ammonia.',
		chapter: 'speed-of-sound',
	},
	'degrees-of-freedom': {
		term: 'Degrees of freedom',
		def: 'The independent ways a molecule can hold energy: 3 for moving along x, y and z, plus 2 more for a tumbling two-atom molecule, or 3 more for a tumbling bent one. Each holds ½kT on average.',
		chapter: 'speed-of-sound',
	},
	'transmission-coefficient': {
		term: 'Transmission coefficient',
		def: 'The fraction of a sound’s intensity that crosses a boundary between two media: 4Z₁Z₂/(Z₁ + Z₂)². Close to 1 when the impedances match, tiny when they are very different.',
		chapter: 'speed-of-sound',
	},
	// ---- 11.4 Harmonics and chords ----
	resonance: {
		term: 'Resonance',
		def: 'The large response of an object driven at one of its natural frequencies, the frequencies at which it vibrates by itself as a standing wave.',
		chapter: 'harmonics-chords',
	},
	harmonic: {
		term: 'Harmonic',
		def: 'A frequency that is a whole-number multiple of a fundamental frequency: fₙ = nf₁. A string or open pipe can vibrate at all of them; a pipe closed at one end only at the odd ones.',
		chapter: 'harmonics-chords',
	},
	'fundamental-frequency': {
		term: 'Fundamental frequency (f₁)',
		def: 'The lowest natural frequency of a vibrating object, usually heard as its pitch. The higher natural frequencies are called overtones.',
		chapter: 'harmonics-chords',
	},
	'node-antinode': {
		term: 'Node and antinode',
		def: 'In a standing wave, a node is a point that never moves; an antinode is a point of largest motion, halfway between two nodes.',
		chapter: 'harmonics-chords',
	},
	timbre: {
		term: 'Timbre',
		def: 'The quality that makes a violin and a flute sound different on the same note: the mix of harmonics and their strengths.',
		chapter: 'harmonics-chords',
	},
	'fourier-analysis': {
		term: 'Fourier analysis',
		def: 'Splitting a wave into the pure sine waves that add up to it, and finding their frequencies and amplitudes (its spectrum). Any repeating wave is a sum of harmonics of its repeat frequency.',
		chapter: 'harmonics-chords',
	},
	chord: {
		term: 'Chord',
		def: 'Several notes sounded together. Notes whose frequencies are in simple whole-number ratios, such as 4 : 5 : 6 (a major chord), sound smooth together.',
		chapter: 'harmonics-chords',
	},
	consonance: {
		term: 'Consonance and dissonance',
		def: 'Consonant intervals sound smooth: their frequencies are in simple ratios, so their harmonics coincide. Dissonant ones sound rough, because nearby harmonics beat against each other.',
		chapter: 'harmonics-chords',
	},
	formant: {
		term: 'Formant',
		def: 'A resonant frequency of the throat and mouth that strengthens the voice’s harmonics near it. Moving the tongue and lips shifts the formants and makes the different vowels.',
		chapter: 'harmonics-chords',
	},
	// ---- 11.5 Echolocation ----
	echolocation: {
		term: 'Echolocation',
		def: 'Sensing the surroundings by sound: timing echoes for distance, comparing the two ears for direction, and listening to pitch shifts for motion. Used by bats, toothed whales and (in the novel) Eridians.',
		chapter: 'echolocation',
	},
	sonar: {
		term: 'Sonar',
		def: 'Locating objects with sound, usually under water. Active sonar sends out a ping and times the echo; passive sonar only listens to sounds already there.',
		chapter: 'echolocation',
	},
	diffraction: {
		term: 'Diffraction',
		def: 'The spreading of a wave around obstacles and through gaps. Waves bend strongly around objects about a wavelength across or smaller, so such objects send back little echo.',
		chapter: 'echolocation',
	},
	'interaural-time-difference': {
		term: 'Interaural time difference',
		def: 'The gap between a sound’s arrival at the two ears, Δt = d sin θ / v for ears a distance d apart. The brain uses it to tell the direction of the sound.',
		chapter: 'echolocation',
	},
	// ---- 12.1 Pressure: F = PA ----
	'gauge-pressure': {
		term: 'Gauge pressure',
		def: 'Pressure measured above the surrounding air, as a tyre gauge reads it. Absolute pressure = gauge pressure + atmospheric pressure.',
		chapter: 'pressure',
	},
	'hydrostatic-pressure': {
		term: 'Hydrostatic pressure',
		def: 'The pressure in a fluid at rest, which grows with depth as P = P₀ + ρgh because each layer holds up the weight of the fluid above it.',
		chapter: 'pressure',
	},
	barometer: {
		term: 'Barometer',
		def: 'An instrument that measures air pressure. Torricelli’s mercury barometer balances the air against a column of mercury about 760 mm tall at sea level.',
		chapter: 'pressure',
	},
	'pascals-principle': {
		term: 'Pascal’s principle',
		def: 'A change in pressure applied to an enclosed fluid is passed on undiminished to every part of it. Hydraulic machines use it to multiply force: F₂ = F₁A₂/A₁.',
		chapter: 'pressure',
	},
	'buoyant-force': {
		term: 'Buoyant force',
		def: 'The net upward push of a fluid on an object in it, because the fluid pushes harder on the object’s deeper bottom than on its top.',
		chapter: 'pressure',
	},
	'archimedes-principle': {
		term: 'Archimedes’ principle',
		def: 'The buoyant force on an object equals the weight of the fluid it pushes aside: F = ρ_fluid gV.',
		chapter: 'pressure',
	},
	// ---- 12.2 The gas laws ----
	'ideal-gas-law': {
		term: 'Ideal-gas law',
		def: 'PV = NkT = nRT, linking a gas’s pressure, volume, temperature (in kelvin) and amount. It combines Boyle’s, Charles’s and Gay-Lussac’s laws.',
		chapter: 'gas-laws',
	},
	'ideal-gas': {
		term: 'Ideal gas',
		def: 'A gas whose molecules are far apart compared with their size and only interact by brief collisions, so that it obeys PV = NkT. Real gases come close when they are thin and far from condensing.',
		chapter: 'gas-laws',
	},
	mole: {
		term: 'Mole (mol)',
		def: 'The SI unit for an amount of substance: exactly 6.022 140 76 × 10²³ particles.',
		chapter: 'gas-laws',
	},
	'avogadro-constant': {
		term: 'Avogadro constant (N_A)',
		def: 'The number of particles in one mole, exactly 6.022 140 76 × 10²³ per mole.',
		chapter: 'gas-laws',
	},
	'molar-mass': {
		term: 'Molar mass (M)',
		def: 'The mass of one mole of a substance. In grams per mole it equals the mass of one molecule in atomic mass units: 18.0 g/mol for water, 28.97 g/mol for air.',
		chapter: 'gas-laws',
	},
	'gas-constant': {
		term: 'Gas constant (R)',
		def: 'R = N_A k = 8.314 J/(mol·K), the Boltzmann constant counted per mole instead of per molecule.',
		chapter: 'gas-laws',
	},
	'molar-volume': {
		term: 'Molar volume',
		def: 'The volume of one mole of gas, RT/P: 22.4 litres at 0 °C and 1 atm, the same for every ideal gas.',
		chapter: 'gas-laws',
	},
	'scale-height': {
		term: 'Scale height (H)',
		def: 'The height over which an atmosphere’s pressure falls by a factor of e (to 37%): H = RT/Mg. About 8.5 km for Earth and 15.9 km for Venus.',
		chapter: 'gas-laws',
	},
	// ---- 12.3 Partial pressure ----
	'partial-pressure': {
		term: 'Partial pressure',
		def: 'The pressure one gas in a mixture would exert if it filled the container alone. It sets how many molecules of that gas there are per cubic metre, which is what lungs and microbes respond to.',
		chapter: 'partial-pressure',
	},
	'daltons-law': {
		term: 'Dalton’s law',
		def: 'The total pressure of a mixture of gases is the sum of their partial pressures, because each gas pushes on the walls as if the others weren’t there.',
		chapter: 'partial-pressure',
	},
	'mole-fraction': {
		term: 'Mole fraction (x)',
		def: 'The fraction of the molecules in a mixture that belong to one gas, which equals its share of the pressure: x = Pᵢ/P. Percentages “by volume” are mole fractions.',
		chapter: 'partial-pressure',
	},
	hypoxia: {
		term: 'Hypoxia',
		def: 'A shortage of oxygen in the body. It sets in when the oxygen partial pressure of the air breathed falls well below sea level’s 21 kPa, as near the summit of Everest.',
		chapter: 'partial-pressure',
	},
	'oxygen-toxicity': {
		term: 'Oxygen toxicity',
		def: 'Poisoning by oxygen breathed at high partial pressure, above about 1.4 to 1.6 bar, which can cause convulsions. It limits how deep divers can go breathing air.',
		chapter: 'partial-pressure',
	},
	// ---- 12.4 Forces on walls between atmospheres ----
	'pressure-difference': {
		term: 'Pressure difference (ΔP)',
		def: 'The difference between the pressures on the two sides of a wall. Only the difference pushes the wall: F = ΔP × A.',
		chapter: 'pressure-walls',
	},
	'wall-tension': {
		term: 'Wall tension (of a pressure vessel)',
		def: 'The pull carried by each metre of a curved wall holding a pressure difference, in N/m: ΔPr/2 in a sphere, ΔPr around a cylinder (hoop) and ΔPr/2 along it.',
		chapter: 'pressure-walls',
	},
	sag: {
		term: 'Sag (bulge)',
		def: 'How far a stretched sheet bulges in the middle under a pressure difference. A sag s across a span L makes an arc of radius about L²/8s, so a nearly flat sheet needs a huge tension.',
		chapter: 'pressure-walls',
	},
	// ---- 12.5 Stress and strength ----
	stress: {
		term: 'Stress (σ)',
		def: 'Force per area inside a material, σ = F/A, in pascals. Tensile stress stretches it, compressive stress squashes it.',
		chapter: 'stress-strength',
	},
	strain: {
		term: 'Strain (ε)',
		def: 'The fractional change in length of a stressed material, ε = ΔL/L, a pure number. For small stresses σ = Yε.',
		chapter: 'stress-strength',
	},
	'yield-strength': {
		term: 'Yield strength',
		def: 'The stress at which a material starts to stretch permanently instead of springing back. About 250 MPa for structural steel.',
		chapter: 'stress-strength',
	},
	'tensile-strength': {
		term: 'Ultimate tensile strength',
		def: 'The largest pulling stress a material can carry before it breaks: about 41 MPa for window glass, 400 MPa for structural steel, 4 GPa for carbon fibre.',
		chapter: 'stress-strength',
	},
	'ductile-brittle': {
		term: 'Ductile and brittle',
		def: 'A ductile material (most metals) stretches a lot after yielding, giving warning before it breaks. A brittle one (glass, ceramics, concrete) stays elastic and then snaps.',
		chapter: 'stress-strength',
	},
	'breaking-length': {
		term: 'Breaking length',
		def: 'The longest cable of a material that can hang under its own weight, σ_max/ρg: about 5 km for steel and over 200 km for Kevlar or carbon fibre on Earth.',
		chapter: 'stress-strength',
	},
	'safety-factor': {
		term: 'Safety factor',
		def: 'The ratio of a material’s strength to the stress it is designed to carry. Engineers use 2 or more to allow for flaws, wear and unexpected loads.',
		chapter: 'stress-strength',
	},
	torque: {
		term: 'Torque (τ)',
		def: 'The turning effect of a force about a point: the force times the perpendicular distance from the point to its line, τ = Fd. An object at rest has no net torque.',
		chapter: 'stress-strength',
	},
	// ---- 13.1 Atomic structure ----
	atom: {
		term: 'Atom',
		def: 'The smallest piece of a chemical element: a tiny, heavy, positive nucleus surrounded by a cloud of electrons, about 10⁻¹⁰ m across. The nucleus is roughly 100 000 times smaller still.',
		chapter: 'atomic-structure',
	},
	electron: {
		term: 'Electron',
		def: 'A light particle with negative charge −e = −1.602 × 10⁻¹⁹ C and mass 9.109 × 10⁻³¹ kg, found around every atomic nucleus. It decides an atom’s chemistry.',
		chapter: 'atomic-structure',
	},
	proton: {
		term: 'Proton',
		def: 'A particle in the atomic nucleus with charge +e and mass 1.673 × 10⁻²⁷ kg, 1836 times an electron’s. A hydrogen nucleus is a single proton.',
		chapter: 'atomic-structure',
	},
	neutron: {
		term: 'Neutron',
		def: 'An uncharged particle in the atomic nucleus, slightly heavier than a proton (1.675 × 10⁻²⁷ kg). Found by Chadwick in 1932. A free neutron decays in about a quarter of an hour.',
		chapter: 'atomic-structure',
	},
	nucleus: {
		term: 'Nucleus (atomic)',
		def: 'The tiny centre of an atom, holding almost all its mass and all its positive charge: Z protons and some neutrons, a few femtometres (10⁻¹⁵ m) across.',
		chapter: 'atomic-structure',
	},
	nucleon: {
		term: 'Nucleon',
		def: 'Either of the particles that make up a nucleus: a proton or a neutron.',
		chapter: 'atomic-structure',
	},
	'atomic-number': {
		term: 'Atomic number (Z)',
		def: 'The number of protons in an atom’s nucleus, which is also the number of electrons in the neutral atom. It decides which element the atom is: hydrogen 1, carbon 6, xenon 54.',
		chapter: 'atomic-structure',
	},
	'coulombs-law': {
		term: 'Coulomb’s law',
		def: 'The force between two charges: F = kq₁q₂/r², with k = 8.988 × 10⁹ N·m²/C². Like charges repel, unlike attract. Between a proton and an electron it is 2 × 10³⁹ times stronger than gravity.',
		chapter: 'atomic-structure',
	},
	'bohr-model': {
		term: 'Bohr model',
		def: 'Bohr’s 1913 picture of hydrogen: the electron circles the proton only on orbits that fit a whole number of its wavelengths, giving radii n²a₀ and energies −13.6 eV/n².',
		chapter: 'atomic-structure',
	},
	'ground-state': {
		term: 'Ground state',
		def: 'The lowest energy level of an atom or nucleus, where it stays unless it is given energy. Higher levels are excited states.',
		chapter: 'atomic-structure',
	},
	'ionization-energy': {
		term: 'Ionization energy',
		def: 'The energy needed to pull an electron right out of an atom, leaving a positive ion: 13.6 eV for hydrogen, 24.6 eV for helium, 12.1 eV for xenon, 5.1 eV for sodium.',
		chapter: 'atomic-structure',
	},
	ion: {
		term: 'Ion',
		def: 'An atom or molecule that has lost or gained electrons, so it carries a net electric charge.',
		chapter: 'atomic-structure',
	},
	'electron-shell': {
		term: 'Electron shell',
		def: 'A group of electron energy levels at roughly the same distance from the nucleus. Shell n holds at most 2n² electrons; the outermost shell decides how an atom reacts.',
		chapter: 'atomic-structure',
	},
	'pauli-exclusion': {
		term: 'Pauli exclusion principle',
		def: 'No two electrons (or other particles of the same kind, such as neutrinos) can be in exactly the same state. It forces electrons into ever higher shells and gives atoms their size.',
		chapter: 'atomic-structure',
	},
	'noble-gas': {
		term: 'Noble gas',
		def: 'An element with a full outer electron shell (helium, neon, argon, krypton, xenon, radon). They hold their electrons tightly and react very reluctantly; xenon’s first compound was made in 1962.',
		chapter: 'atomic-structure',
	},
	xenonite: {
		term: 'Xenonite',
		def: 'In the novel, the Eridians’ super-strong building material, a compound containing xenon. The Blip-A is made almost entirely of it.',
		chapter: 'atomic-structure',
	},
	// ---- 13.2 Isotopes ----
	isotope: {
		term: 'Isotope',
		def: 'Atoms of the same element (same number of protons) with different numbers of neutrons, such as carbon-12 and carbon-14. Isotopes have the same chemistry but different masses and nuclear stability.',
		chapter: 'isotopes',
	},
	'mass-number': {
		term: 'Mass number (A)',
		def: 'The number of nucleons (protons plus neutrons) in a nucleus, written as in ¹⁴C or carbon-14. N = A − Z is the number of neutrons.',
		chapter: 'isotopes',
	},
	'atomic-mass-unit': {
		term: 'Atomic mass unit (u)',
		def: 'One twelfth of the mass of a carbon-12 atom, 1.660 539 × 10⁻²⁷ kg, about one nucleon’s mass. Its energy equivalent is 931.5 MeV.',
		chapter: 'isotopes',
	},
	'strong-force': {
		term: 'Strong nuclear force',
		def: 'The attraction between nucleons that holds nuclei together against the electric repulsion of their protons. It is far stronger than the electric force but acts only over about a femtometre.',
		chapter: 'isotopes',
	},
	'binding-energy': {
		term: 'Binding energy',
		def: 'The energy needed to pull a nucleus apart into separate protons and neutrons, equal to its mass defect times c². Per nucleon it peaks near iron at about 8.8 MeV.',
		chapter: 'isotopes',
	},
	'nuclear-fusion': {
		term: 'Nuclear fusion',
		def: 'Light nuclei joining into a heavier one, releasing energy because the product is more tightly bound. It powers the Sun: four hydrogen nuclei become one helium-4.',
		chapter: 'isotopes',
	},
	'nuclear-fission': {
		term: 'Nuclear fission',
		def: 'A heavy nucleus such as uranium-235 splitting into two mid-sized ones, releasing energy because they are more tightly bound per nucleon.',
		chapter: 'isotopes',
	},
	radioactivity: {
		term: 'Radioactivity',
		def: 'The spontaneous decay of unstable nuclei, which give out radiation (alpha, beta or gamma) as they change into more stable ones. Discovered by Becquerel in 1896.',
		chapter: 'isotopes',
	},
	'alpha-decay': {
		term: 'Alpha decay',
		def: 'A nucleus throwing out an alpha particle (a helium-4 nucleus: 2 protons, 2 neutrons), so Z falls by 2 and A by 4. Typical alpha energies are about 5 MeV.',
		chapter: 'isotopes',
	},
	'beta-decay': {
		term: 'Beta decay',
		def: 'A neutron in a nucleus turning into a proton, emitting an electron and an antineutrino (beta-minus); or a proton into a neutron, emitting a positron and a neutrino (beta-plus). A stays the same; Z changes by one.',
		chapter: 'isotopes',
	},
	'gamma-ray': {
		term: 'Gamma ray',
		def: 'A high-energy photon (typically 0.1 to 10 MeV) given out when a nucleus drops from an excited state to a lower one.',
		chapter: 'isotopes',
	},
	'decay-constant': {
		term: 'Decay constant (λ)',
		def: 'The probability per unit time that a given unstable nucleus decays: dN/dt = −λN, N = N₀e^(−λt), and λ = ln 2 / half-life.',
		chapter: 'isotopes',
	},
	activity: {
		term: 'Activity (A)',
		def: 'The number of nuclei in a sample decaying each second, A = λN, measured in becquerels.',
		chapter: 'isotopes',
	},
	becquerel: {
		term: 'Becquerel (Bq)',
		def: 'The SI unit of activity: one decay per second. A human body contains about 4400 Bq of potassium-40.',
		chapter: 'isotopes',
	},
	'radiocarbon-dating': {
		term: 'Radiocarbon dating',
		def: 'Finding the age of once-living material from how much of its carbon-14 (half-life 5700 years) has decayed since it stopped taking in fresh carbon.',
		chapter: 'isotopes',
	},
	'decay-chain': {
		term: 'Decay chain',
		def: 'A sequence of radioactive decays from one unstable nucleus to a stable one, such as uranium-238 to lead-206 through 8 alpha and 6 beta decays.',
		chapter: 'isotopes',
	},
	// ---- 13.3 Ionizing radiation ----
	'ionizing-radiation': {
		term: 'Ionizing radiation',
		def: 'Radiation whose particles or photons carry enough energy (more than about 10 eV each) to knock electrons out of atoms: ultraviolet beyond about 120 nm, X-rays, gamma rays, and fast charged particles and neutrons.',
		chapter: 'ionizing-radiation',
	},
	'attenuation-coefficient': {
		term: 'Attenuation coefficient (μ)',
		def: 'The fraction of a beam of photons removed per unit thickness of material, so I = I₀e^(−μx). Divided by density it gives the mass attenuation coefficient μ/ρ, in cm²/g.',
		chapter: 'ionizing-radiation',
	},
	'half-value-layer': {
		term: 'Half-value layer',
		def: 'The thickness of a material that halves a beam of gamma or X-rays, ln 2/μ: about 0.86 cm of lead or 9.8 cm of water for 1 MeV gamma rays.',
		chapter: 'ionizing-radiation',
	},
	gray: {
		term: 'Gray (Gy)',
		def: 'The SI unit of absorbed dose: one joule of radiation energy absorbed per kilogram of material.',
		chapter: 'ionizing-radiation',
	},
	sievert: {
		term: 'Sievert (Sv)',
		def: 'The unit of equivalent dose: absorbed dose in grays times a weighting factor for the kind of radiation (1 for gamma rays and electrons, 2 for protons, 20 for alpha particles). It measures harm to people.',
		chapter: 'ionizing-radiation',
	},
	'acute-radiation-syndrome': {
		term: 'Acute radiation syndrome',
		def: 'Radiation sickness: illness after a large whole-body dose in a short time, above about 0.7 Gy. Bone marrow, gut and (at very high doses) nerves fail; above about 8 Gy it is almost always fatal.',
		chapter: 'ionizing-radiation',
	},
	'background-radiation': {
		term: 'Background radiation',
		def: 'The radiation everyone receives from natural sources: radon gas, rocks, cosmic rays and radioactive atoms in food and our own bodies. The world average is about 2.4 mSv per year.',
		chapter: 'ionizing-radiation',
	},
	// ---- 13.4 Cosmic rays and shielding ----
	'cosmic-ray': {
		term: 'Cosmic ray',
		def: 'A fast charged particle from space, mostly protons (about 90%) and helium nuclei (9%), typically with hundreds of MeV to many GeV. Discovered by Victor Hess in 1912.',
		chapter: 'cosmic-rays-shielding',
	},
	'column-density': {
		term: 'Column density (areal density)',
		def: 'The mass of material per unit area along a path, in g/cm² or kg/m². Shielding depends mainly on it: Earth’s air above sea level is 1033 g/cm², like 10 m of water.',
		chapter: 'cosmic-rays-shielding',
	},
	'interaction-length': {
		term: 'Nuclear interaction length',
		def: 'The column density a fast proton or neutron crosses, on average, before hitting a nucleus head-on: about 83 g/cm² of water or 90 g/cm² of air. A beam of them falls as e^(−x/λ).',
		chapter: 'cosmic-rays-shielding',
	},
	'air-shower': {
		term: 'Air shower',
		def: 'The cascade of secondary particles made when a cosmic ray smashes into a nucleus high in the atmosphere. Most of what reaches the ground is muons.',
		chapter: 'cosmic-rays-shielding',
	},
	muon: {
		term: 'Muon',
		def: 'A heavier cousin of the electron (207 times its mass) that decays in 2.2 µs. Muons from air showers reach the ground at about one per square centimetre per minute.',
		chapter: 'cosmic-rays-shielding',
	},
	'interstellar-medium': {
		term: 'Interstellar medium',
		def: 'The thin gas and dust between the stars, mostly hydrogen. Near the Sun it holds about 0.3 atoms per cubic centimetre.',
		chapter: 'cosmic-rays-shielding',
	},
	// ---- 13.5 Neutrinos ----
	neutrino: {
		term: 'Neutrino (ν)',
		def: 'An uncharged particle with a tiny mass (well under 1 eV/c²) that feels only the weak force and gravity, so it passes through whole planets. Made in beta decay and in the Sun’s fusion; three kinds exist.',
		chapter: 'neutrinos',
	},
	'weak-interaction': {
		term: 'Weak interaction',
		def: 'The fundamental force behind beta decay, which can turn a neutron into a proton. It acts over very short distances and is the only way (besides gravity) that neutrinos interact.',
		chapter: 'neutrinos',
	},
	'cross-section': {
		term: 'Cross-section (σ)',
		def: 'The effective target area a particle presents for a given reaction. Reaction rate per target = flux × σ. A few-MeV antineutrino on a proton has σ ≈ 6 × 10⁻⁴⁴ cm².',
		chapter: 'neutrinos',
	},
	'mean-free-path': {
		term: 'Mean free path',
		def: 'The average distance a particle travels before interacting, 1/(nσ) for n targets per unit volume each of cross-section σ. For reactor antineutrinos in water it is about 250 light-years.',
		chapter: 'neutrinos',
	},
	'neutrino-oscillation': {
		term: 'Neutrino oscillation',
		def: 'Neutrinos changing between their three kinds as they travel. It happens only if neutrinos have mass; its discovery won the 2015 Nobel Prize.',
		chapter: 'neutrinos',
	},
	'cherenkov-radiation': {
		term: 'Cherenkov radiation',
		def: 'Blue light given off when a charged particle moves through a material faster than light travels in that material (faster than c/n). Water and ice neutrino detectors watch for it.',
		chapter: 'neutrinos',
	},
	'super-cross-sectionality': {
		term: 'Super cross-sectionality',
		def: 'In the novel, the property of Astrophage’s membrane that nothing can pass through it, not even neutrinos, so the cell can store energy as trapped neutrinos. Fiction.',
		chapter: 'neutrinos',
	},
	// ---- 14.1 Light-years and stellar distances ----
	parsec: {
		term: 'Parsec (pc)',
		def: 'The distance at which 1 au makes an angle of one arcsecond: 648 000/π au = 3.0857 × 10¹⁶ m = 3.2616 light-years. A star with parallax p arcseconds is 1/p parsecs away.',
		chapter: 'light-years',
	},
	'celestial-coordinates': {
		term: 'Right ascension and declination',
		def: 'The two angles that give a star’s direction on the sky, like longitude and latitude on Earth: right ascension (α) measured eastward around the sky’s equator, declination (δ) north or south of it.',
		chapter: 'light-years',
	},
	'apparent-magnitude': {
		term: 'Apparent magnitude (m)',
		def: 'How bright a star looks from Earth, on a logarithmic scale where 5 magnitudes is a factor of 100 and bigger numbers mean fainter. Sirius is −1.46, Tau Ceti +3.50, the naked-eye limit about +6.5.',
		chapter: 'light-years',
	},
	'absolute-magnitude': {
		term: 'Absolute magnitude (M)',
		def: 'The magnitude a star would have seen from a standard distance of 10 parsecs, a fair measure of how luminous it really is. The Sun’s is +4.83 in visible light; Tau Ceti’s +5.69.',
		chapter: 'light-years',
	},
	'distance-modulus': {
		term: 'Distance modulus',
		def: 'The difference m − M between a star’s apparent and absolute magnitudes, equal to 5 log₁₀(d / 10 pc). Measuring it gives the distance.',
		chapter: 'light-years',
	},
	'proper-motion': {
		term: 'Proper motion (μ)',
		def: 'A star’s slow drift across the sky caused by its sideways motion through space, in arcseconds per year. Tau Ceti’s is 1.9″ per year; sideways speed = μ × distance.',
		chapter: 'light-years',
	},
	// ---- 14.2 Planetary atmospheres ----
	'boltzmann-factor': {
		term: 'Boltzmann factor',
		def: 'The factor e^(−E/kT) by which a state of energy E is rarer than one of zero energy at temperature T. It sets how air thins with height and how rare very fast molecules are.',
		chapter: 'planetary-atmospheres',
	},
	exosphere: {
		term: 'Exosphere',
		def: 'The outermost layer of an atmosphere, so thin that a fast molecule moving upward can leave without hitting another. On Earth it starts about 500 km up, in air heated to about 1000 K.',
		chapter: 'planetary-atmospheres',
	},
	'jeans-escape': {
		term: 'Jeans escape',
		def: 'The slow leak of gas from the top of an atmosphere as the fastest molecules exceed the escape speed. Light gases such as hydrogen and helium leak fastest.',
		chapter: 'planetary-atmospheres',
	},
	'critical-temperature-escape': {
		term: 'Critical temperature (for escape)',
		def: 'The upper-atmosphere temperature above which a world loses a gas, by the rule of thumb v_esc ≥ 6 v_rms: T_c = m v_esc² / 108k. For hydrogen on Earth it is about 280 K.',
		chapter: 'planetary-atmospheres',
	},
	'lapse-rate': {
		term: 'Lapse rate (Γ)',
		def: 'How fast air temperature falls with height. Dry rising air cools at g/c_p ≈ 9.8 K per km on Earth; the standard atmosphere uses 6.5 K per km because condensing water releases heat.',
		chapter: 'planetary-atmospheres',
	},
	tropopause: {
		term: 'Tropopause',
		def: 'The top of the lowest layer of the atmosphere, where temperature stops falling with height: about 11–12 km up on Earth, at about 217 K in the standard atmosphere.',
		chapter: 'planetary-atmospheres',
	},
	// ---- 14.3 Magnetic fields ----
	'magnetic-field': {
		term: 'Magnetic field (B)',
		def: 'The field made by moving charges and magnets. Its direction is where a compass needle points; it pushes on a charge q moving at v with force qvB sin θ, at right angles to both. Measured in teslas.',
		chapter: 'magnetic-fields',
	},
	tesla: {
		term: 'Tesla (T)',
		def: 'The SI unit of magnetic field: 1 T pushes with 1 N on 1 C moving across it at 1 m/s. Earth’s field is about 31–58 µT; an MRI scanner 1.5–7 T.',
		chapter: 'magnetic-fields',
	},
	gyroradius: {
		term: 'Gyroradius',
		def: 'The radius of the circle a charged particle moves in across a magnetic field: r = mv/qB, or p/qB at any speed.',
		chapter: 'magnetic-fields',
	},
	'cyclotron-frequency': {
		term: 'Cyclotron frequency',
		def: 'How many times per second a charged particle circles in a magnetic field, f = qB/2πm, the same whatever its speed (well below c).',
		chapter: 'magnetic-fields',
	},
	rigidity: {
		term: 'Rigidity (ℛ)',
		def: 'Momentum per charge, ℛ = pc/q, measured in volts (usually gigavolts). Particles with the same rigidity bend the same way in a magnetic field: r = ℛ/cB.',
		chapter: 'magnetic-fields',
	},
	'electric-current': {
		term: 'Electric current (I)',
		def: 'The amount of electric charge flowing past a point per second, measured in amperes. Moving charges, and so currents, make magnetic fields.',
		chapter: 'magnetic-fields',
	},
	ampere: {
		term: 'Ampere (A)',
		def: 'The SI base unit of electric current: one coulomb per second, about 6.2 × 10¹⁸ electrons a second. Defined since 2019 by fixing the electron’s charge.',
		chapter: 'magnetic-fields',
	},
	'magnetic-constant': {
		term: 'Magnetic constant (μ₀)',
		def: 'The constant 1.2566 × 10⁻⁶ N/A² that sets how strong a magnetic field a current makes, as in B = μ₀I/2πr near a long wire.',
		chapter: 'magnetic-fields',
	},
	dynamo: {
		term: 'Dynamo (planetary)',
		def: 'Currents in a planet’s molten, conducting core, kept going by convection and the planet’s spin, that sustain its magnetic field. Earth has one; Mars’s stopped about four billion years ago.',
		chapter: 'magnetic-fields',
	},
	'magnetic-dipole': {
		term: 'Magnetic dipole',
		def: 'A field shaped like a bar magnet’s, leaving one pole and returning to the other; far away it weakens as 1/r³. Earth’s field is roughly a dipole.',
		chapter: 'magnetic-fields',
	},
	'cutoff-rigidity': {
		term: 'Cutoff rigidity',
		def: 'The least rigidity a cosmic ray needs to get through a planet’s magnetic field to a given place. For a dipole and vertical arrival it is (cB₀R/4) cos⁴λ: about 15 GV at Earth’s magnetic equator, zero at the poles.',
		chapter: 'magnetic-fields',
	},
	'solar-wind': {
		term: 'Solar wind',
		def: 'The thin stream of protons and electrons blowing out from the Sun: at Earth, 3–10 particles per cm³ at 250–750 km/s.',
		chapter: 'magnetic-fields',
	},
	'magnetic-pressure': {
		term: 'Magnetic pressure',
		def: 'The outward push of a magnetic field, B²/2μ₀ pascals, equal to the energy stored in the field per cubic metre.',
		chapter: 'magnetic-fields',
	},
	magnetosphere: {
		term: 'Magnetosphere',
		def: 'The region around a planet controlled by its magnetic field, bounded by the magnetopause (about 10 Earth radii towards the Sun) where the solar wind’s pressure balances the field’s.',
		chapter: 'magnetic-fields',
	},
	'van-allen-belts': {
		term: 'Van Allen belts',
		def: 'Zones around Earth, roughly 640 to 58 000 km up, where charged particles are trapped on magnetic field lines, spiralling back and forth between the hemispheres.',
		chapter: 'magnetic-fields',
	},
	// ---- 14.4 Sidebar: base-6 numbers ----
	'place-value': {
		term: 'Place value',
		def: 'Writing numbers so that each digit’s worth depends on its position: in base b each place is worth b times the place to its right.',
		chapter: 'base-six',
	},
	'number-base': {
		term: 'Base (of a number system)',
		def: 'How many digits a place-value system uses and how much each place is worth: base ten uses 0–9 and powers of 10; base six (senary), the Eridians’ base, uses 0–5 and powers of 6.',
		chapter: 'base-six',
	},
	binary: {
		term: 'Binary',
		def: 'Base two: digits 0 and 1 only, each place worth twice the one to its right. Computers store numbers in binary; each binary digit is one bit.',
		chapter: 'base-six',
	},
	sexagesimal: {
		term: 'Sexagesimal',
		def: 'Base sixty, from ancient Sumer and Babylon. It survives in 60 seconds per minute, 60 minutes per hour, and 60 arcminutes per degree.',
		chapter: 'base-six',
	},
	'eridian-second': {
		term: 'Eridian second',
		def: 'In the novel, the Eridians’ unit of time, 2.366 s, which Grace measures by timing Rocky’s base-six clock. An Eridian day is 6⁵ = 7776 Eridian seconds, 5.11 hours.',
		chapter: 'base-six',
	},
};
