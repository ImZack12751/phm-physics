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
