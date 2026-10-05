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
	moonDistance: 3.844e8, // m (semimajor axis of orbit)
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
};
