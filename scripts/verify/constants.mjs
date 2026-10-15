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

// Part 7 (waves and light). Checked October 2026.
// NIST CODATA 2022: eV exact, Rydberg constant. OpenStax University Physics Vol. 1 §17.2 Table 17.1 (speeds of sound),
// Vol. 2 §16.5 (spectrum: visible about 400–750 nm, microwave oven 2.45 GHz), Vol. 3 §1.3 (n: water 1.33, diamond 2.419),
// Vol. 3 §6.2 Table 6.1 (work functions). Wikipedia: Speed of light (glass about 1.5), Balmer series, Fraunhofer lines,
// Helium (D3 line, 1868), Carbon dioxide (IR bands 4.26 and 14.99 µm), IKAROS, Nichols radiometer, Tau Ceti.
// KIT press release 029/2025 and Science 388, 180 (2025): KATRIN neutrino mass below 0.45 eV (90% CL).
export const WAVES = {
	eV: 1.602176634e-19, // J (exact)
	rydberg: 10_973_731.568157, // 1/m (CODATA 2022, R∞)
	hydrogenIonization: 13.6, // eV (rounded; hcR∞ = 13.606 eV)
	soundAir20: 343, soundAir0: 331, soundWater: 1480, soundSeaWater: 1540, soundSteel: 5960, soundHelium: 965, // m/s
	hearingLow: 20, hearingHigh: 20_000, // Hz
	visibleShort: 400e-9, visibleLong: 750e-9, // m (OpenStax: about 400 to 750 nm)
	microwaveOven: 2.45e9, // Hz
	nWater: 1.33, nGlass: 1.5, nDiamond: 2.419,
	// Work functions, eV (OpenStax Table 6.1)
	phiNa: 2.46, phiAl: 4.08, phiZn: 4.31, phiFe: 4.5, phiCu: 4.7, phiAg: 4.73, phiPt: 6.35,
	// Spectral lines (air wavelengths, m)
	hAlpha: 656.279e-9, hBeta: 486.135e-9, hGamma: 434.0472e-9, hDelta: 410.1734e-9, balmerLimit: 364.50682e-9,
	naD1: 589.592e-9, naD2: 588.995e-9, heD3: 587.5618e-9,
	co2Stretch: 4.26e-6, co2Bend: 14.99e-6, // m
	// IKAROS solar sail (JAXA, 2010)
	ikarosArea: 196, ikarosMass: 310, ikarosForce: 1.12e-3, ikarosDv: 400, // m², kg, N, m/s by Aug 2013
	nicholsHull: 0.006, // agreement with theory, 1901
	katrinLimit: 0.45, // eV
	tauCetiRV: -16.68e3, // m/s, systemic radial velocity (approaching)
	tauCetiSignal: 0.3, // m/s, smallest planet-candidate signals (Feng 2017)
	tauCetiE: { period: 168, a: 0.552 }, // days, au (Part 4)
	// BOOK (fan guides: readifyai Petrova line, Petrovascope and Astrophage pages; Looper). Approximate.
	petrova: 25.984e-6, // m, the Petrova wavelength
	astrophageSpeed: 0.92, // fraction of c
	co2SignatureBook: [4.26e-6, 18.31e-6], // m, the reader guide's figures for Venus's CO₂ "signature"
};

// Part 8 (thermal radiation and stars). Checked October 2026.
// CODATA 2022: Wien displacement constant b = 2.897 771 955 × 10⁻³ m K (exact from h, c, k).
// Wikipedia infoboxes: Tau Ceti (5320 ± 40 K, 0.793 ± 0.004 R☉, 0.488 ± 0.010 L☉, 0.800 M☉, 8–10 Gyr, rotation 46 d,
// debris disk > 10× the Solar System's dust, habitable zone 0.55–1.16 au); Sirius A (9845 K, 1.7144 R☉, 24.74 L☉);
// Proxima Centauri (2992 K, 0.1542 R☉, 0.001567 L☉); CMB 2.72548 K; Draper point 798 K (1847).
// Solar irradiance: about 1361 W/m², ~0.1% peak-to-peak over a solar cycle, ±3.4% over the orbit, 1365.4 → 1360.9 (2011).
// Habitable zone of the Sun (Kopparapu 2013 conservative): 0.99–1.67 au. Sun: main-sequence life about 10 Gyr, age 4.6 Gyr.
export const STARS = {
	wienB: 2.897771955e-3, // m K
	cmbT: 2.72548, // K
	draperT: 798, // K
	tauCeti: { T: 5320, R: 0.793, L: 0.488, M: 0.8, age: [8, 10], rotationDays: 46, hz: [0.55, 1.16] },
	sirius: { T: 9845, R: 1.7144, L: 24.74, M: 2.063, ly: 8.61 },
	proxima: { T: 2992, R: 0.1542, L: 0.001567, M: 0.1221, ly: 4.2465 },
	tsiCycle: 0.001, // fraction, peak-to-peak
	tsiOld: 1365.4, tsiNew: 1360.9, // W/m²
	sunHZ: [0.99, 1.67], // au
	sunLifeGyr: 10, sunAgeGyr: 4.6,
	courseTauCetiL: 0.52, // the value used throughout the course so far (upper end of published estimates)
};

// Part 9 (mass–energy). Checked October 2026.
// NIST atomic masses (Atomic Weights and Isotopic Compositions): ¹H 1.007 825 032 23 u, ²H 2.014 101 778 12 u,
// ³H 3.016 049 2779 u, ⁴He 4.002 603 254 13 u. CODATA 2022: neutron 1.008 664 916 06 u, u = 931.494 103 72 MeV/c²,
// electron 0.510 998 950 69 MeV. Wikipedia "Energy density" table (specific energies, MJ/kg): antimatter 89 875 517 874,
// D–T fusion 337 387 388, uranium fission 80 620 000, hydrogen 141.86 HHV / 119.93 LHV, gasoline 46.4, kerosene 43,
// natural gas 53.6, fat 38, coal (anthracite) 26–33, wood 18.0, ethanol 30, TNT 4.184, Li-ion 0.36–0.875.
// Wikipedia "Mass–energy equivalence": Einstein 1905; a kilogram standard gains ~1.5 pg per °C.
export const MASSENERGY = {
	mH: 1.00782503223, mD: 2.01410177812, mT: 3.0160492779, mHe4: 4.00260325413, mn: 1.00866491606, // u
	uMeV: 931.49410372, // MeV per u
	MeV: 1.602176634e-13, // J
	electronMeV: 0.51099895069,
	spec: { antimatter: 89875517874e6, dtFusion: 337387388e6, uranium: 80620000e6, h2: 141.86e6, h2LHV: 119.93e6, gasoline: 46.4e6, kerosene: 43e6, natGas: 53.6e6, fat: 38e6, coal: [26e6, 33e6], wood: 18.0e6, ethanol: 30e6, tnt: 4.184e6, liion: [0.36e6, 0.875e6] }, // J/kg
};

// Part 10 (special relativity). Checked October 2026.
// OpenStax University Physics Vol. 3 ch. 5 (postulates, simultaneity, time dilation incl. muon example 0.950c, 2.20 µs →
// 7.05 µs, length contraction, Lorentz transformation, velocity addition, Doppler, momentum, energy). Wikipedia:
// Michelson–Morley (1887, expected ~0.4 fringe, observed < 0.02), Galileo's ship (1632), Hafele–Keating (1971:
// east −59 ± 10 ns measured, −40 ± 23 predicted; west +273 ± 7 measured, +275 ± 21 predicted; kinematic parts −184 / +96),
// GPS error analysis (orbital speed 3874 m/s, −7.2 µs/day special, +45.8 general, +38.6 net), Muon (2.1969811 µs,
// 105.658 MeV, ~10 000 per m² per minute at sea level, Rossi–Hall 1941). CERN: LHC 6.8 TeV per proton (2022–).
// CODATA: proton 938.272 088 943 MeV. BOOK (Wikipedia plot summary): the Eridians don't understand relativity, so
// Blip-A carries enough fuel for both ships; Rocky spent 46 years at Tau Ceti.
export const REL = {
	mmExpected: 0.4, mmObserved: 0.02, mmArm: 11, // fringes, fringes, m (effective arm length)
	muonLife: 2.1969811e-6, muonMeV: 105.6583755, muonFluxPerM2Min: 10000,
	gpsSpeed: 3874, gpsSR: 7.2, gpsGR: 45.8, gpsNet: 38.6, // m/s, µs/day
	hkEast: { meas: -59, pred: -40, kin: -184 }, hkWest: { meas: 273, pred: 275, kin: 96 }, // ns
	lhcTeV: 6.8, protonMeV: 938.27208943,
	rockyYears: 46,
};
export const SOUND = {
	atm: 101_325, // Pa, standard atmosphere (exact, conventional)
	// Air at 20 °C and 1 atm (Wikipedia "Density of air", table of speed, density and acoustic impedance)
	air20: { v: 343.21, rho: 1.2041, Z: 413.3 }, air0: { v: 331.3, rho: 1.2923 },
	mAir: 28.9652, // u, mean molecular mass of dry air (molar mass 0.0289652 kg/mol, same page)
	// Adiabatic index γ (Wikipedia "Heat capacity ratio" table, 15–20 °C)
	gammaAir: 1.4, gammaHe: 1.66, gammaXe: 1.66, gammaAr: 1.67, gammaCO2: 1.3, gammaNH3: 1.31, gammaH2: 1.41,
	gammaClementDesormes: 1.35, // 1819 measurement used by Laplace
	newtonSpeed: 298, // m/s (979 ft/s, Principia 1687; Wikipedia "Speed of sound")
	// Molecular masses, u (standard atomic weights)
	mHe: 4.0026, mXe: 131.29, mNH3: 17.031, mCO2: 44.009, mH2: 2.016,
	// OpenStax Univ. Phys. Vol. 1 Table 17.1: speeds of sound, m/s (gases at 0 °C, liquids at 20 °C)
	vCO2: 259, vO2: 316, vHe: 965, vH2: 1290, vEthanol: 1160, vMercury: 1450, vTissue: 1540,
	vWaterFresh: 1480, vRubber: 54, vPolyethylene: 920, vMarble: 3810, vPyrex: 5640, vLead: 1960, vAl: 5120, vSteel: 5960,
	// OpenStax Univ. Phys. Vol. 1 Table 12.1: elastic moduli, Pa
	BWater: 2.2e9, YSteel: 20e10, BSteel: 16e10, YAl: 7.0e10, YCrownGlass: 6.0e10, BMercury: 2.5e10,
	rhoSteel: 7850, rhoAl: 2700, rhoPyrex: 2230, rhoMercury: 13_600, // kg/m³ (Pyrex: Wikipedia "Borosilicate glass")
	// OpenStax §17.3: hearing threshold and pain, W/m²; eardrum ~1 cm²; pitch discrimination 0.3%; ear most sensitive 2–5 kHz
	I0: 1e-12, Ipain: 1, eardrum: 1e-4, pitchJnd: 0.003,
	a4: 440, // Hz, ISO 16 standard pitch
	// Animal echolocation (Wikipedia): bat calls 11–212 kHz, aerial hawkers 20–60 kHz, calls 3 to 50 ms
	batLow: 11e3, batHigh: 212e3,
	// Medical ultrasound (Wikipedia): 1–6 MHz deep organs, 7–18 MHz superficial
	usLow: 1e6, usHigh: 18e6,
	// BOOK: Rocky's notes fall within human hearing, several at once (LitCharts ch. 10); Grace uses a waveform-analysis
	// program and an Excel spreadsheet (LitCharts ch. 11); Eridians "see" with sound, perhaps passive sonar (LitCharts ch. 11).
	// MODEL (our assumptions): xenonite treated as Pyrex-like glass; Erid air pure ammonia at 210 °C and 29 atm (THERMAL).
};

// Part 12 (pressure, gases and materials). Checked October 2026.
// CODATA: R = N_A k exactly. NASA NSSDCA fact sheets (Earth, Venus, Mars): surface pressure, composition by volume,
// scale height, mean molecular weight. OpenStax Univ. Phys. Vol. 1 §14.1–14.4 (pressure, depth, barometer, Pascal,
// Archimedes) and §12.3–12.4 (Table 12.1 moduli, stress, strain, elasticity and plasticity); Vol. 2 §2.1 (gas laws).
// Wikipedia: Mount Everest (summit 33.7 kPa, West 1999; height 8849 m), Oxygen toxicity (CNS limit 1.4–1.6 bar; air
// below 56 m exceeds 1.4 bar), Apollo 1 (pad test 16.7 psi pure O₂, flight 5 psi), Extravehicular Mobility Unit
// (4.3 psi pure O₂), Magdeburg hemispheres (1654, ~50 cm, 30 horses), Ultimate tensile strength (table), Cylinder stress.
export const PRESSURE = {
	R: 8.31446261815324, // J/(mol K), exact (= N_A k)
	psi: 6894.757, // Pa
	bar: 1e5, // Pa
	mmHg: 133.322, // Pa
	earth: { P: 101_400, N2: 0.7808, O2: 0.2095, Ar: 0.00934, CO2: 420e-6, H: 8.5e3, M: 28.97, rho: 1.217, T: 288 },
	venus: { P: 92e5, CO2: 0.965, N2: 0.035, H: 15.9e3, M: 43.45, rho: 65, T: 737, g: 8.87 },
	mars: { P: 636, CO2: 0.951, N2: 0.0259, Ar: 0.0194, O2: 0.0016, H: 11.0e3, M: 43.49, T: 214, g: 3.73 },
	mN2: 28.014, mO2: 31.998, mAr: 39.948, // g/mol (standard atomic weights)
	everestP: 33.7e3, everestH: 8849, // Pa, m
	apolloPad: 16.7, apolloFlight: 5, emu: 4.3, // psi, pure oxygen
	oxToxLow: 1.4e5, oxToxHigh: 1.6e5, oxToxAirDepth: 56, // Pa, Pa, m
	magdeburgD: 0.5, magdeburgHorses: 30, // m
	// Tensile strengths, Pa (Wikipedia "Ultimate tensile strength" table): yield / ultimate, density kg/m³
	steelA36: { yield: 250e6, uts: 400e6, utsHigh: 550e6, rho: 7800 },
	al6061: { yield: 241e6, uts: 300e6, rho: 2700 },
	glassAnnealed: { uts: 41e6, rho: 2530 },
	glassFibreOptic: 4100e6,
	kevlar: { uts: 2920e6, rho: 1440 },
	carbonFibre: { uts: 4137e6, rho: 1750 },
	spiderSilk: { uts: 1000e6, rho: 1300 },
	hair: { uts: 200e6, rho: 1320 },
	bone: { uts: 130e6, rho: 1600 },
	concrete: { uts: 2e6 },
	graphene: 130e9,
	// Young's moduli, Pa (OpenStax Table 12.1)
	Y: { steel: 20e10, al: 7.0e10, glass: 6.0e10, bone: 1.6e10, hair: 1.0e10, spider: 3.0e10, concrete: 2.0e10, copper: 11e10 },
	// BOOK (reader sources, flagged in the chapters): the Hail Mary at 40% of Earth's pressure (ch. 7, quoted on
	// moviemistakes.com; elsewhere "0.33 atmospheres" and "one-fifth atmosphere"); Rocky's bead model 1 : 29.
	hailMaryAtm: 0.4,
	// BOOK (readifyai fan wiki): Astrophage breed where the pressure is 0.02 atm, with 3.5% N₂ on Venus and 8% on
	// Threeworld; xenonite holds 29 atm as flat panels; the sampling chain is 10 km of 5 cm links (Wikipedia: 10 km).
	breedAtm: 0.02, threeworldN2: 0.08, chainLength: 10e3,
	// MODEL: xenonite partition 2.0 m², 1.0 cm thick (Parts 6 and 11); Erid air 29 atm, 483.15 K; Grace's side 0.40 atm.
	panelArea: 2.0, panelThickness: 0.01,
	issMass: 419_725, // kg (Wikipedia "International Space Station", as in Part 5)
};

// Part 13 (atoms, radiation and particles). Checked October 2026.
// NIST CODATA 2022 (physics.nist.gov/cuu): electron, proton, neutron masses, ε₀, atomic mass unit; e and N_A exact.
// NIST Atomic Weights and Isotopic Compositions: ¹⁶O, ⁵⁶Fe, ²³⁸U, ³⁵Cl/³⁷Cl masses and abundances.
// Wikipedia "Ionization energies of the elements (data page)" (CRC values, eV). Wikipedia "Xenon": isotopes, 5.894 g/L,
// Bartlett 1962. Geiger–Marsden: about 1 in 8000 alphas reflected (1909); nucleus at least 10 000× smaller (1911).
// OpenStax University Physics Vol. 3 §10.1: nuclear radius r₀A^(1/3), r₀ = 1.2 fm.
// Half-lives (Wikipedia isotope pages): ¹⁴C 5700 yr (1.2 ppt, 14 decays/min/g), ²³⁸U 4.463 Gyr (α 4.270 MeV, 8 α + 6 β to
// ²⁰⁶Pb), ⁴⁰K 1.248 Gyr (0.0117%, 16.7 mg in a 70 kg body), ³H 12.32 yr (18.6 keV, mean 5.7 keV), ¹³¹I 8.0252 d.
// NIST XCOM mass attenuation coefficients (cm²/g): lead and water at 0.1, 0.5, 1, 2 MeV. PDG Atomic and Nuclear Properties:
// nuclear interaction lengths (g/cm²) water 83.3, air 90.1, aluminium 107.2, lead 199.6; minimum dE/dx water 1.981 MeV cm²/g.
// Dose: ICRP 103 weighting factors (Wikipedia "Equivalent dose"); 5.5% fatal-cancer risk per Sv, public limit 1 mSv/yr
// (Wikipedia "Sievert"); acute radiation syndrome bands (Wikipedia); background 2.4 mSv/yr world, 6.24 US, cosmic 0.39,
// K-40 0.17, chest X-ray 20 µSv, CT 1–20 mSv (Wikipedia "Background radiation"); Curiosity RAD 1.84 mSv/day in cruise,
// 0.64 on Mars's surface (Hassler/Zeitlin et al. 2013, via Space.com and SwRI).
// Cosmic rays (Wikipedia): 90% protons, 9% helium, 1% heavier; Hess 1912 to 5300 m. Local Interstellar Cloud 0.3 atoms/cm³.
// Neutrinos (Wikipedia): 6.5 × 10¹⁰ solar neutrinos per cm² per s; Δm²₃₂ 2.51 × 10⁻³ eV²; Δm²₂₁ 7.4 × 10⁻⁵ eV²; cosmology
// sum below 0.12 eV; Cowan–Reines 1956 (5 × 10¹³ /cm²/s, about 3 per hour, σ = 6.3 × 10⁻⁴⁴ cm²); SN 1987A 25 neutrinos,
// 168 000 ly, 2–3 h before the light; Super-Kamiokande 50 220 t; IceCube about 1 km³, 1450–2450 m deep.
// BOOK (Looper, Everyman Commentary, readifyai reader wiki): Rocky one of 23 Eridians; the rest died of radiation sickness;
// Rocky's workshop beside the Astrophage tanks; Erid protected by a strong magnetic field; the Hail Mary's hull holds a 1 mm
// Astrophage slurry layer; Astrophage stores energy as neutrino pairs made by colliding protons, held by its "super
// cross-sectional" membrane; Komorov's cell gained 17 ng from 1.5 MJ.
export const PARTICLES = {
	e: 1.602176634e-19, me: 9.1093837139e-31, mp: 1.67262192595e-27, mn: 1.67492750056e-27, // C, kg
	eps0: 8.8541878188e-12, u: 1.66053906892e-27, G: 6.6743e-11,
	r0: 1.2e-15, // m
	ion: { H: 13.59844, He: 24.58738, Li: 5.39171, C: 11.2603, N: 14.53414, O: 13.61806, Ne: 21.5646, Na: 5.13908, Ar: 15.75962, K: 4.34066, Kr: 13.99961, Xe: 12.1298, Cs: 3.8939 }, // eV
	xeIsotopes: [[124, 0.095], [126, 0.089], [128, 1.91], [129, 26.4], [130, 4.07], [131, 21.2], [132, 26.9], [134, 10.4], [136, 8.86]], // A, %
	xeWeight: 131.293, xeGasDensity: 5.894, // g/mol, kg/m³
	mO16: 15.99491461957, mFe56: 55.93493633, mU238: 238.0507884, mCl35: 34.968852682, mCl37: 36.965902602, cl35: 0.7576, // u
	rutherfordFraction: 1 / 8000,
	halfLife: { C14: 5700, U238: 4.463e9, U235: 7.04e8, K40: 1.248e9, H3: 12.32, I131: 8.0252 / 365.25 }, // years
	c14ppt: 1.2e-12, c14dpm: 14, k40BodyMass: 0.0167e-3, u238Alpha: 4.27, h3Q: 18.6, h3Mean: 5.7, c14Max: 156, c14Mean: 49, // kg, MeV, keV
	muLead: { 0.1: 5.549, 0.5: 0.1614, 1: 0.07102, 2: 0.04606 }, muWater: { 0.1: 0.1707, 0.5: 0.09687, 1: 0.07072, 2: 0.04942 }, // cm²/g
	rhoLead: 11.35, // g/cm³
	lambdaInt: { water: 83.3, air: 90.1, al: 107.2, lead: 199.6 }, dEdxWater: 1.981, // g/cm², MeV cm²/g
	wR: { photon: 1, electron: 1, proton: 2, alpha: 20 }, riskPerSv: 0.055,
	background: { world: 2.4, us: 6.24, cosmic: 0.39, k40: 0.17, chestXray: 0.02, ct: [1, 20] }, // mSv
	marsCruise: 1.84e-3, marsSurface: 0.64e-3, // Sv/day
	ismDensity: 0.3, // atoms/cm³
	solarNuFlux: 6.5e10, dm32: 2.51e-3, dm21: 7.4e-5, nuMassSum: 0.12, // /cm²/s, eV², eV², eV
	crFlux: 5e13, crSigma: 6.3e-44, crRate: 3, // /cm²/s, cm², per hour
	sn1987a: { count: 25, ly: 168000 }, superK: 50220, // t
	// BOOK
	eridians: 23, slurryMm: 1, komorovJ: 1.5e6, komorovNg: 17,
};
