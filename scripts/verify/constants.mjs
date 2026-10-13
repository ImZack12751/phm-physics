// Reference values used in the course, each with the source it was checked against.
// Verification scripts import these so every chapter uses the same numbers.
// (Checked October 2026. Book figures are from the novel and are marked BOOK.)

export const C = {
	// NIST CODATA 2022 (https://physics.nist.gov/cuu/Constants/): exact by definition
	c: 299_792_458, // m/s
	gStandard: 9.80665, // m/s², standard acceleration of gravity (exact, conventional)
	h: 6.62607015e-34, // J s (exact)
	bohrRadius: 5.29177210544e-11, // m (CODATA 2022)
	protonRadius: 8.4075e-16, // m (CODATA 2022 rms charge radius)
	csFrequency: 9_192_631_770, // Hz, defines the second (BIPM SI Brochure, 9th ed.)

	// IAU 2012 Resolution B2 (au) and IAU definition of the light-year (Julian year × c)
	au: 149_597_870_700, // m (exact)
	julianYear: 365.25 * 86400, // s
	get lightYear() {
		return this.c * this.julianYear; // 9.4607304725808e15 m
	},

	// NASA NSSDCA fact sheets (https://nssdc.gsfc.nasa.gov/planetary/factsheet/), 2024 versions
	sunMass: 1.9884e30, // kg
	sunRadius: 6.957e8, // m (volumetric mean radius 695,700 km)
	sunLuminosity: 3.828e26, // W
	sunTeff: 5772, // K
	solarIrradiance: 1361.0, // W/m² at 1 au (Earth fact sheet)
	earthMass: 5.9722e24, // kg
	earthRadius: 6.371e6, // m (volumetric mean)
	earthEqRadius: 6.378137e6, // m
	earthSemiMajor: 1.49598e11, // m
	earthGravityMean: 9.82, // m/s² (fact sheet "surface gravity (mean)" 9.820)
	earthSiderealDay: 23.9345 * 3600, // s (fact sheet "sidereal rotation period" 23.9345 h)
	get earthOmega() {
		return (2 * Math.PI) / this.earthSiderealDay; // 7.2921e-5 rad/s
	},
	moonDistance: 3.844e8, // m (semimajor axis of orbit)
	moonSiderealMonth: 27.3217 * 86400, // s (Moon fact sheet "sidereal orbit period" 27.3217 days)
	moonRadius: 1.7374e6, // m
	venusSemiMajor: 1.0821e11, // m
	venusIrradiance: 2601.3, // W/m²
	marsSemiMajor: 2.28e11, // m (planetary fact table 228.0 × 10⁶ km)
	jupiterSemiMajor: 7.785e11, // m

	// Tau Ceti: parallax 273.8097 ± 0.1701 mas → 11.912 ± 0.007 ly (Wikipedia summary of Gaia/Hipparcos);
	// luminosity 0.52 ± 0.03 L☉ (spectroscopic; Teixeira et al. 2009 give 0.488) — compared in Tang & Gai 2011, A&A 526, A35
	tauCetiParallaxMas: 273.8097,
	tauCetiLy: 11.912,
	tauCetiLuminositySun: 0.52,

	// Biology scale references (Wikipedia "Micrometre", citing standard texts)
	redBloodCell: 7e-6, // m (6–8 µm)
	humanHair: [20e-6, 200e-6], // m
};

// Part 4 (gravitation and orbits).
// NIST CODATA 2022 (https://physics.nist.gov/cgi-bin/cuu/Value?bg): G = 6.674 30(15) × 10⁻¹¹ m³ kg⁻¹ s⁻².
// NASA NSSDCA fact sheets (checked Oct 2026): masses, radii, GM, orbits, escape velocities.
export const GRAV = {
	G: 6.6743e-11,
	earthGM: 3.986e14, // m³/s² (fact sheet 0.39860 × 10⁶ km³/s²)
	earthEscape: 11.186e3, // m/s
	earthSiderealYear: 365.256, // days
	earthPerihelion: 147.095e9, // m
	earthAphelion: 152.1e9, // m
	earthEcc: 0.0167,
	moonMass: 7.346e22, // kg
	moonGravity: 1.62, // m/s²
	moonEscape: 2.38e3, // m/s
	moonOrbitSpeed: 1.022e3, // m/s
	marsMass: 6.4169e23, // kg
	marsRadius: 3.3895e6, // m
	marsGravity: 3.73,
	marsEscape: 5.03e3,
	marsSemiMajor: 227.956e9, // m
	marsPeriod: 686.98, // days
	venusMass: 4.8673e24, // kg
	venusRadius: 6.0518e6, // m
	venusGravity: 8.87,
	venusEscape: 10.36e3,
	venusSemiMajor: 108.21e9, // m
	venusPeriod: 224.701, // days
	jupiterMass: 1.89813e27, // kg
	jupiterSemiMajor: 778.479e9, // m
	jupiterPeriod: 4332.589, // days
	sunGravity: 274.0,
	sunEscape: 617.6e3,
	// ISS altitude 370–460 km (NASA ISS reference guide). Our examples use 400 km.
	issAltitude: 400e3,
	// Geostationary orbit radius 42,164 km (Wikipedia "Geostationary orbit"); sidereal day from the Earth fact sheet.
	geoRadius: 42_164e3,
	// Tau Ceti mass 0.800 ± 0.008 M☉ (Korolik et al. 2023, via Wikipedia "Tau Ceti").
	tauCetiMassSun: 0.8,
	// Tau Ceti e, the candidate planet the novel calls Adrian (Feng et al. 2017, AJ 154, 135; via Wikipedia "Tau Ceti e"):
	// period ≈ 168 d, a ≈ 0.552 au, minimum mass 3.93 M⊕. Later studies (2024–25) suggest it may not exist.
	adrianPeriodDays: 168,
	adrianSemiMajorAu: 0.552,
	adrianMassEarths: 3.93,
};

// Our model Adrian for Part 4 (ASSUMED radius, stated in the chapters): mass 3.93 M⊕, radius 1.5 R⊕,
// Hail Mary parked in a circular orbit 300 km up.
export const ADRIAN = {
	mass: 3.93 * 5.9722e24, // 2.347e25 kg
	radius: 1.5 * 6.371e6, // 9.5565e6 m
	parkAlt: 300e3,
	get parkR() {
		return this.radius + this.parkAlt; // 9.8565e6 m
	},
};

// BOOK: figures as given in the novel (Weir 2021), cross-checked against Royal Institution
// article "Project Hail Mary: the science behind the fiction" and fan summaries. Treat as approximate.
export const BOOK = {
	astrophageDiameter: 10e-6, // m (RI article: "10 micrometres in diameter")
	astrophageTempC: 96.415, // °C
	shipAccelG: 1.5, // the Hail Mary's acceleration in g
	shipTimeYears: 3.75, // about 3 years 9 months for Grace
	earthTimeYears: 13, // "over thirteen years" on Earth (fan summaries: ~13.7)
	fuelKg: 2.0e6, // about 2 million kg of Astrophage at launch
	fuelBurnKgPerS: 6e-3, // six grams per second
	dimming9yr: 0.01, // 1% drop in solar output within about 9 years
	dimming20yr: 0.05, // 5% within about 20 years
	// Part 3 (reader summary trangnkp.substack.com): Grace's estimate of the centrifuge he would need
	graceCentrifugeRadius: 700, // m
	graceCentrifugeSpeed: 88, // m/s (inconsistent with 1.5 g at 700 m, which needs ~101 m/s; flagged in 3.1)
	// Centrifuge cables "up to 104 m" appear only in fan wikis (unverified). Our model, used in Part 3:
	// crew section 2.0e5 kg, aft section 6.0e5 kg (both ASSUMED) on 104 m of cable → crew floor at 78 m, aft at 26 m, 1 g at the crew floor.
	centrifugeCable: 104,
};

// Our model centrifuge for Part 3 (assumptions, stated in the chapters).
export const SPIN = {
	cable: 104, // m
	mCrew: 2.0e5, // kg
	mAft: 6.0e5, // kg
	get rCrew() {
		return (this.cable * this.mAft) / (this.mCrew + this.mAft); // 78 m
	},
	get rAft() {
		return (this.cable * this.mCrew) / (this.mCrew + this.mAft); // 26 m
	},
	get omega() {
		return Math.sqrt(9.81 / this.rCrew); // 0.3546 rad/s
	},
};

// Part 5 (energy and momentum).
// BOOK (reader summary, trangnkp.substack.com, and Goodreads reader highlights): fuel display 20,862 kg at 6.043 g/s
// (Grace rounds to 6 g/s, ~40 days); drive power 540 trillion W (Grace's E = mc² estimate); Dimitri's test released
// 1.8 × 10⁹ J of light from ~20 µg, 60,000 N for 100 µs; one manoeuvre "will consume 130 kilograms of fuel".
// Total fuel ≈ 2 × 10⁶ kg (Nick Frass, "The Energy Economics of Project Hail Mary", citing the novel).
// Real engines: RS-25 vacuum Isp 452.3 s (4.436 km/s), mass flow 514.49 kg/s, vacuum thrust 2279 kN (Wikipedia "RS-25").
// Shuttle SRB Isp 268 s (2.63 km/s). NSTAR ion thruster max 92 mN, 2.3 kW; ion exhausts 20–50 km/s (Wikipedia "Ion thruster").
// Deep Space 1: launch mass 486 kg, 73.4 kg xenon for Δv 4.3 km/s (Wikipedia "Deep Space 1", "Ion thruster").
// World primary energy production 2021 ≈ 19.6 TW (Wikipedia "World energy supply and consumption"). Human ≈ 100 W (hypertextbook).
export const ENERGY = {
	displayFuel: 20_862, // kg (BOOK)
	displayRate: 6.043e-3, // kg/s (BOOK)
	drivePowerBook: 540e12, // W (BOOK, Grace's estimate with 6 g/s and c = 3e8)
	dimitriEnergy: 1.8e9, // J (BOOK)
	dimitriMass: 20e-9, // kg (BOOK)
	dimitriForce: 60_000, // N (BOOK)
	dimitriTime: 100e-6, // s (BOOK)
	manoeuvreFuel: 130, // kg (BOOK)
	totalFuel: 2.0e6, // kg (BOOK, approximate)
	rs25Ve: 4436, // m/s
	rs25Mdot: 514.49, // kg/s
	rs25ThrustVac: 2.279e6, // N
	srbVe: 2630, // m/s
	nstarThrust: 0.092, // N
	nstarPower: 2300, // W
	ds1Launch: 486, // kg
	ds1Xenon: 73.4, // kg
	ds1Dv: 4300, // m/s
	worldPower: 19.6e12, // W (2021)
	humanPower: 100, // W
	// Our inference (stated in 5.6): if the 6.043 g/s display rate holds the ship at 1.5 g with a light exhaust,
	// F = ṁc and m = F/(1.5 g) ≈ 1.23 × 10⁵ kg, so the dry ship is ≈ 1.02 × 10⁵ kg. We round the dry mass to 1.0 × 10⁵ kg.
	shipDry: 1.0e5, // kg (OUR MODEL)
	get aShip() {
		return 1.5 * C.gStandard;
	},
	get massAtDisplay() {
		return (this.displayRate * C.c) / this.aShip;
	},
};

// Part 6 (thermal physics and climate). Checked October 2026.
// NIST CODATA 2022: k and N_A exact; σ = 5.670 374 419 × 10⁻⁸ W m⁻² K⁻⁴.
// OpenStax University Physics Vol. 2 (§1.3 Table 1.2, §1.4 Table 1.3, §1.5 Table 1.4, §1.6 Table 1.5).
// NASA NSSDCA fact sheets (Bond albedo, black-body and mean temperatures). NASA Earth Observatory energy budget.
// Wikipedia: Climate sensitivity (IPCC AR6), Radiative forcing (Myhre 1998), Atmospheric methane, Last Glacial Maximum,
// Year Without a Summer, Faint young Sun paradox, Snowball Earth, Albedo, 40 Eridani.
export const THERMAL = {
	k: 1.380649e-23, // J/K (exact)
	NA: 6.02214076e23, // 1/mol (exact)
	sigma: 5.670374419e-8, // W m⁻² K⁻⁴
	calorie: 4.184, // J (thermochemical calorie)
	u: 1.66053906892e-27, // kg, atomic mass unit (CODATA 2022)
	// Specific heats, J/(kg K) (OpenStax Table 1.3)
	cWater: 4186, cIce: 2090, cSteam: 2020, cAl: 900, cCu: 387, cIron: 452, cGlass: 840, cAir: 1015,
	// Latent heats, J/kg (OpenStax Table 1.4)
	LfWater: 334e3, LvWater: 2256e3, LfAmmonia: 332e3, LvAmmonia: 1370e3, ammoniaBoilC: -33.4,
	// Thermal conductivities, W/(m K) (OpenStax Table 1.5)
	kCu: 390, kAl: 220, kSteel: 80, kStainless: 14, kGlass: 0.84, kWater: 0.6, kGlassWool: 0.042, kDown: 0.025, kAir: 0.023,
	rhoIce: 917, rhoSea: 1030, atmMass: 5.1e18, // kg/m³ (OpenStax Vol. 1 Table 14.1), kg (NASA Earth fact sheet)
	alphaAl: 25e-6, alphaSteel: 12e-6, // 1/K, linear expansion (OpenStax Table 1.2)
	// Planets (NASA fact sheets): Bond albedo, black-body temperature (K), mean surface temperature (K)
	earthAlbedo: 0.294, earthTbb: 254.0, earthTmean: 288,
	venusAlbedo: 0.77, venusTbb: 226.6, venusTmean: 737,
	marsAlbedo: 0.25, marsTbb: 209.8, marsTmean: 214,
	marsIrradiance: 586.2,
	// NASA Earth Observatory energy budget (percent of 340 W/m² incoming)
	budgetIn: 340, budgetReflected: 0.29, budgetSurfaceUp: 1.17, budgetBack: 1.0,
	// Climate (Wikipedia citing IPCC AR6, Myhre 1998)
	ecs: 3.0, ecsRange: [2.5, 4.0], f2x: 3.7, lambda: 0.8, // K, K, W/m², K per W/m²
	albedoFeedback: 0.35, // W/(m² K) (Wikipedia, Climate change feedbacks, AR6); water vapour ~1.8, clouds 0.42, Planck ~3.8
	co2Coeff: 5.35, // W/m², ΔF = 5.35 ln(C/C₀)
	co2Pre: 280, co2Now: 421, // ppm (NOAA, May 2022 at Mauna Loa)
	ch4Lifetime: 12, // years (perturbation lifetime)
	ch4Now: 1911.8, ch4PreInd: 722, // ppb (2022, 1750)
	lgmCooling: 6, // °C colder 21,000 years ago (Tierney 2020)
	lgmSeaLevel: 125, // m lower
	tamboraCooling: [0.4, 0.7], // °C, 1816
	faintSun: 0.7, // early Sun's output relative to today
	// Albedos (Wikipedia "Albedo" table)
	albedoOcean: 0.06, albedoSand: 0.4, albedoSeaIce: [0.5, 0.7], albedoSnow: 0.8, albedoForest: 0.15, albedoAsphalt: 0.04,
	earthArea: 4 * Math.PI * 6.371e6 ** 2, // m²
	// 40 Eridani A (Wikipedia): L = 0.4 L☉, M = 0.78 M☉, candidate planet period 42 days (likely stellar activity)
	eriL: 0.4, eriM: 0.78, eriPeriodDays: 42,
	// BOOK (fan guides and articles, approximate)
	eridTempC: 210, eridPressureAtm: 29, // /Film
	bombs: 241, bombDepth: 50, bombSpacing: 3000, // m (readifyai reader guide)
	saharaPanels: 2e12, saharaArea: 9e12, // m² (reader guide: a quarter of the Sahara)
	iceAgeYears: 30, // Wikipedia plot summary: ice age within thirty years
};
