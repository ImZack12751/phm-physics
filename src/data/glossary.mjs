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
		def: 'The lowest possible temperature: 0 K, which is −273.15 °C or −459.67 °F. Part 6 explains why nothing can be colder.',
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
};
