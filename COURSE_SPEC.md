# COURSE_SPEC: The Physics of Project Hail Mary

**Read this file at the start of every session instead of rereading old chapters. Update it at the end of every session** (`npm run spec` regenerates the three AUTO sections; edit the hand-written sections yourself).

A free, permanently online course that teaches physics from absolute zero, using the physics in Andy Weir's *Project Hail Mary* as motivation and as the source of worked problems. The learner is a beginner, comfortable with school algebra, basic trigonometry, logarithms and introductory high-school physics. Every concept is built from the ground up. **Nothing may rely on an idea that hasn't been explained earlier in the course or defined in the glossary.**

- Live site: https://imzack12751.github.io/phm-physics/
- Repository: https://github.com/ImZack12751/phm-physics

---

## 1. Session workflow

**Every session**

1. Read this file.
2. Write **one chapter per session**. Never rewrite a finished chapter from scratch. Edit chapters surgically with targeted changes.
3. Before marking a chapter done, run all of these:
   - `npm run verify`: every numerical answer in every chapter is recomputed (`scripts/verify/<n>-<slug>.mjs`, one per chapter, using shared constants in `scripts/verify/constants.mjs`).
   - `npm run build` then `npm run check`: no KaTeX errors, no broken internal links or anchors, no caret notation in prose or raw markdown, and all `/raw/*.md` files are present.
   - `npm run preview` (in a second terminal) then `npm run check:browser`: no console errors, every simulation renders and responds to its controls, Ask Claude buttons build the right prompt, the selection button appears, tooltips open, and nothing scrolls sideways on a 390 px phone.
   - Check that every term used is defined earlier or in the glossary. `<Term id>` fails the build for unknown ids, but you must still judge whether a word needs a `<Term>`.
   - Look at every diagram and simulation (`node scripts/shot-elements.mjs <path>/ <outdir>`), checking that labels don't overlap and point at the right thing.
4. `npm run spec`, then update the "Session log" and any hand-written section below.
5. Commit and push to `main`. GitHub Actions rebuilds and deploys.

**Adding a chapter (mechanics):** see README.md → "Adding a chapter".

---

## 2. Style rules

**Tech**

- Astro 7 + Starlight 0.42, chapters in MDX. KaTeX via `remark-math` + `rehype-katex` (configured through `unified()` in `astro.config.mjs`, because Astro 7's default Markdown engine doesn't run remark plugins).
- All maths uses proper notation: `$9.81\ \text{m/s}^{2}$`. **Never** caret notation like m/s^2 in prose, alt text or descriptions (use Unicode superscripts such as m/s² outside maths). `npm run check` enforces this.
- Units are upright (`\text{m}`), with a thin space between number and unit (`\ `). Quantities are italic. Carry units on every line of a calculation.
- **No maths in headings** (it breaks the TOC, anchor labels and Ask Claude section paths).
- MDX pitfalls: never write a bare `<` or `{` in prose (put inequalities inside `$…$`), and no blank lines inside JSX blocks.
- Simulations are self-contained `.astro` components with vanilla-TS `<script>`s and no backend. Every simulation root needs `class="sim …"` plus `data-title` and `data-description` (used by /raw/ and Ask Claude).
- Progress lives in localStorage only (`phm-progress-v1`).

**Design**

- A rich "Project Hail Mary mission console" look. It has a living backdrop: coloured nebulae, a parallax starfield with spiked bright stars, Tau Ceti glowing in the corner, and the red Petrova line with Astrophage drifting along it. Panels are HUD-style with corner brackets. Chapter sections get glowing numbered badges (01–10). Accents are Tau Ceti gold (`--gold`), Eridian teal (`--teal`), Astrophage infrared (`--infra`) and violet (`--violet`). Examples are teal, problems gold, and fact-check boxes violet. Text must always sit on a dark veil (no light-on-light or dark-on-dark), including inside diagrams. The light theme and print are plain and high-contrast.
- Fonts: Michroma (site title, hero), Exo 2 (headings, buttons), Inter (body), IBM Plex Mono (labels, readouts), self-hosted via @fontsource.
- Fun touches: an animated *Hail Mary* on the home page, and a star-burst with a "mission log" toast when a chapter is marked complete (`scripts/problems.ts`).
- Collapsible sidebars: header buttons and the keys `[` `]` `\` hide navigation, page contents, or both (focus mode). The state is stored on `<html data-nav data-toc>` and restored before paint (`overrides/ThemeProvider.astro`, `overrides/SocialIcons.astro`, `scripts/layout.ts`, edge tabs in `overrides/SkipLink.astro`).
- Every animation stops under `prefers-reduced-motion`.
- Diagrams are hand-written inline SVG in `src/components/diagrams/<part>/Name.astro`, wrapped in `<Figure caption alt>`. They are simple and schematic, never decorative. Compute coordinates in the frontmatter so labels line up. Labels must not overlap and must point at the right part. Use the palette classes from `src/styles/components.css`: text `t-sm t-lg t-b t-mid t-end t-it`, strokes `s-fg s-muted s-grid s-amber s-sky s-green s-rose s-violet` with `w1 w2 w3 dash`, fills `f-…` and `f-…-soft`. Diagram and simulation panels are always dark, and switch to dark-on-white ink in print.
- Each diagram needs a full text description in `alt` (screen readers and /raw/ markdown) and a caption.
- Glossary terms in chapters: `<Term id="…">word</Term>` gives a hover or tap tooltip.
- The site must work on phones (the browser check enforces no sideways scroll). It must also print cleanly to PDF: print reveals all solutions, hides interactive bits and uses a white palette.

**Writing**

- Clear, flowing prose. Analogies first, formalism second. Derive every formula step by step. Calculus only after Part 0.5.
- Describe book scenes **in our own words**. Never quote the novel beyond a few words. The book's numbers are flagged as the novel's figures and treated as approximate.
- Cite credible references for every factual claim and constant (OpenStax, NIST CODATA, IAU, NASA NSSDCA fact sheets, BIPM, HyperPhysics, Feynman Lectures, BioNumbers…). Don't rely on memory: check the value and the URL (curl it). Store verified values in `scripts/verify/constants.mjs`.
- Spoiler policy: the course discusses the whole novel (there is a warning on Start here).

---

## 3. Chapter template (every chapter follows this exactly)

Frontmatter: `title`, `description`. Import line:
`import { Term, Prereqs, Figure, Example, Problem, Solution, RealVsBook } from '../../../components/course';`

1. `## The scene`: briefly, the moment in the book that needs this physics (own words).
2. `## Prerequisites`: `<Prereqs notes={{ slug: 'why' }} />`. The list comes from `curriculum.mjs`.
3. `## The concept`: explained from zero with `###` subsections and `<Figure>` diagrams.
4. `## Formulas`: every formula derived step by step, with `###` per derivation.
5. `## Worked examples`: `<Example n={1} title="…" book>`, built on book scenarios, with full solutions and units on every line. Usually 4 or 5.
6. `## Real physics vs. book physics`: `<RealVsBook>` with three bold-led paragraphs: **Established science.** **Weir's inventions.** **How realistic are the numbers?**
7. `## Interactive simulation`: at least one wherever it genuinely helps (`src/components/sims/`), plus a "things to try" line.
8. `## Practice set`: 8 to 15 `<Problem n level="easy|medium|challenging" book>` blocks, each containing a `<Solution>` with the full worked answer. Mix book-based and general problems, from easy to challenging.
9. `## Summary`: bullet key ideas, then **Formulas from this chapter** in display maths. Add new terms to `src/data/glossary.mjs` and new formulas to `src/data/formulas.mjs`.
10. `## Sources`: every factual claim and constant, with links.

The chapter footer ("mark complete", problem count), Ask Claude buttons and the raw-markdown copy are all automatic.

---

## 4. Site features (where they live)

| Feature | Files |
|---|---|
| Curriculum, order, prerequisites, status (single source of truth) | `src/data/curriculum.mjs` |
| Sidebar grouped by Part | built from curriculum in `astro.config.mjs` |
| Progress (sidebar bar, ticks, home dashboard, problem checkboxes) | `src/scripts/progress.ts`, `overrides/Sidebar.astro`, `course/ProgressDashboard.astro`, `scripts/problems.ts` |
| Glossary page and tooltips | `src/data/glossary.mjs`, `course/GlossaryList.astro`, `course/Term.astro`, `scripts/tooltips.ts` |
| Formula sheet | `src/data/formulas.mjs`, `course/FormulaSheet.astro` |
| Physics map (auto-layout DAG plus table) | `course/PhysicsMap.astro` |
| Ask Claude (heading, example and problem buttons, selection button) | `src/scripts/ask-claude.ts`. `CLAUDE_LINK` is in `course.config.mjs` |
| /raw/<slug>.md plain-markdown export | `src/integrations/raw-markdown.mjs` (runs after build) |
| Space theme, starfield, hero chart, reveal animations | `src/styles/space.css`, `space/Starfield.astro`, `overrides/Hero.astro`, `overrides/SkipLink.astro`, `scripts/reveal.ts` |
| Collapsible sidebars / focus mode | `overrides/SocialIcons.astro`, `scripts/layout.ts`, `overrides/ThemeProvider.astro` |
| Print stylesheet | `src/styles/print.css`, `scripts/print.ts` |
| Base-path links in Markdown (`/part-0/x/` → `/phm-physics/part-0/x/`) | `src/plugins/rehype-base-links.mjs` |
| Deploy | `.github/workflows/deploy.yml` (runs `npm run build:ci`) |

Numbering: Part 0 chapters are 0.1 to 0.10. **Part 0.5 (calculus) uses the code "C"** (C.1 to C.6) so that "0.5" isn't ambiguous. Other parts use their number (1.1, 2.3 …).

---

## 5. Curriculum and status

Teaching order follows logical dependency, not plot order. Planned chapters have empty prerequisites until they are written. Fill them in from this table's logic when writing.

<!-- AUTO:curriculum -->
**Part 0 · Maths toolkit**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 0.1 | Scientific notation | `part-0/scientific-notation` | – | written, awaiting review |
| 0.2 | SI units and prefixes | `part-0/si-units` | 0.1 | written, awaiting review |
| 0.3 | Handling units | `part-0/unit-handling` | 0.2 | written, awaiting review |
| 0.4 | Rearranging formulas | `part-0/rearranging-formulas` | 0.3 | written, awaiting review |
| 0.5 | Ratios, proportionality and the inverse-square law | `part-0/ratios-proportionality` | 0.4 | written, awaiting review |
| 0.6 | Trigonometry refresher | `part-0/trigonometry` | 0.4 | written, awaiting review |
| 0.7 | Vectors | `part-0/vectors` | 0.6 | written, awaiting review |
| 0.8 | Exponentials and logarithms | `part-0/exponentials-logarithms` | 0.1, 0.4 | written, awaiting review |
| 0.9 | Reading and making graphs | `part-0/graphs` | 0.5, 0.8 | written, awaiting review |
| 0.10 | Order-of-magnitude estimation | `part-0/estimation` | 0.3, 0.5 | written, awaiting review |

**Part 0.5 · Calculus from scratch**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| C.1 | Rates of change | `calculus/rates-of-change` | 0.9, 0.7 | written, awaiting review |
| C.2 | Slopes of curves and limits | `calculus/slopes-and-limits` | C.1 | written, awaiting review |
| C.3 | Derivatives and simple rules | `calculus/derivatives` | C.2, 0.8, 0.6 | written, awaiting review |
| C.4 | Area under curves | `calculus/area-under-curves` | – | planned |
| C.5 | Integrals | `calculus/integrals` | – | planned |
| C.6 | The fundamental theorem of calculus | `calculus/fundamental-theorem` | – | planned |

**Part 1 · Motion**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 1.1 | Position, velocity and acceleration | `part-1/kinematics` | – | planned |
| 1.2 | The equations of motion | `part-1/equations-of-motion` | – | planned |
| 1.3 | Free fall | `part-1/free-fall` | – | planned |
| 1.4 | Measuring g | `part-1/measuring-g` | – | planned |

**Part 2 · Forces**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 2.1 | Newton’s laws | `part-2/newtons-laws` | – | planned |
| 2.2 | Mass vs weight | `part-2/mass-and-weight` | – | planned |
| 2.3 | Apparent weight in accelerating ships | `part-2/apparent-weight` | – | planned |
| 2.4 | Pendulums and simple harmonic motion | `part-2/pendulums-shm` | – | planned |

**Part 3 · Circular motion and artificial gravity**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 3.1 | Angular speed | `part-3/angular-speed` | – | planned |
| 3.2 | Centripetal acceleration | `part-3/centripetal-acceleration` | – | planned |
| 3.3 | Designing spin gravity | `part-3/spin-gravity` | – | planned |
| 3.4 | The Coriolis effect | `part-3/coriolis` | – | planned |

**Part 4 · Gravitation and orbits**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 4.1 | Newton’s law of gravitation | `part-4/gravitation` | – | planned |
| 4.2 | Orbital speed | `part-4/orbital-speed` | – | planned |
| 4.3 | Kepler’s laws | `part-4/keplers-laws` | – | planned |
| 4.4 | Escape velocity | `part-4/escape-velocity` | – | planned |
| 4.5 | Finding a planet’s mass from an orbit | `part-4/planet-mass-from-orbit` | – | planned |
| 4.6 | Orbital manoeuvring | `part-4/orbital-manoeuvring` | – | planned |

**Part 5 · Energy and momentum**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 5.1 | Work as an integral | `part-5/work` | – | planned |
| 5.2 | Kinetic and potential energy | `part-5/kinetic-potential-energy` | – | planned |
| 5.3 | Power | `part-5/power` | – | planned |
| 5.4 | Conservation laws | `part-5/conservation-laws` | – | planned |
| 5.5 | Momentum | `part-5/momentum` | – | planned |
| 5.6 | Thrust | `part-5/thrust` | – | planned |
| 5.7 | The Tsiolkovsky rocket equation | `part-5/rocket-equation` | – | planned |

**Part 6 · Thermal physics and climate**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 6.1 | Temperature and heat | `part-6/temperature-heat` | – | planned |
| 6.2 | Specific and latent heat | `part-6/specific-latent-heat` | – | planned |
| 6.3 | Heat transfer | `part-6/heat-transfer` | – | planned |
| 6.4 | Planetary energy balance and albedo | `part-6/energy-balance` | – | planned |
| 6.5 | The greenhouse effect | `part-6/greenhouse-effect` | – | planned |
| 6.6 | Feedback loops | `part-6/feedback-loops` | – | planned |

**Part 7 · Waves and light**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 7.1 | Wave properties | `part-7/wave-properties` | – | planned |
| 7.2 | c = fλ and the EM spectrum | `part-7/em-spectrum` | – | planned |
| 7.3 | Photons | `part-7/photons` | – | planned |
| 7.4 | The momentum of light and photon propulsion | `part-7/photon-propulsion` | – | planned |
| 7.5 | Spectroscopy | `part-7/spectroscopy` | – | planned |

**Part 8 · Thermal radiation and stars**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 8.1 | Blackbody radiation and Wien’s law | `part-8/blackbody-wien` | – | planned |
| 8.2 | The Stefan–Boltzmann law and luminosity | `part-8/stefan-boltzmann` | – | planned |
| 8.3 | The inverse-square law and the solar constant | `part-8/solar-constant` | – | planned |
| 8.4 | The Sun vs Tau Ceti | `part-8/sun-vs-tau-ceti` | – | planned |

**Part 9 · Mass–energy**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 9.1 | E = mc² | `part-9/mass-energy` | – | planned |
| 9.2 | Energy density: chemical to Astrophage | `part-9/energy-density` | – | planned |

**Part 10 · Special relativity**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 10.1 | The postulates of relativity | `part-10/postulates` | – | planned |
| 10.2 | Time dilation and the light clock | `part-10/time-dilation` | – | planned |
| 10.3 | The Lorentz factor | `part-10/lorentz-factor` | – | planned |
| 10.4 | Length contraction | `part-10/length-contraction` | – | planned |
| 10.5 | Velocity addition | `part-10/velocity-addition` | – | planned |
| 10.6 | Ship time vs Earth time | `part-10/ship-time-earth-time` | – | planned |

**Part 11 · Sound**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 11.1 | Sound as pressure waves | `part-11/pressure-waves` | – | planned |
| 11.2 | Frequency and pitch | `part-11/frequency-pitch` | – | planned |
| 11.3 | The speed of sound in different media | `part-11/speed-of-sound` | – | planned |
| 11.4 | Harmonics and chords | `part-11/harmonics-chords` | – | planned |
| 11.5 | Echolocation | `part-11/echolocation` | – | planned |

**Part 12 · Pressure, gases and materials**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 12.1 | Pressure: F = PA | `part-12/pressure` | – | planned |
| 12.2 | The gas laws | `part-12/gas-laws` | – | planned |
| 12.3 | Partial pressure | `part-12/partial-pressure` | – | planned |
| 12.4 | Forces on walls between atmospheres | `part-12/pressure-walls` | – | planned |
| 12.5 | Stress and strength | `part-12/stress-strength` | – | planned |

**Part 13 · Atoms, radiation and particles**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 13.1 | Atomic structure | `part-13/atomic-structure` | – | planned |
| 13.2 | Isotopes | `part-13/isotopes` | – | planned |
| 13.3 | Ionizing radiation | `part-13/ionizing-radiation` | – | planned |
| 13.4 | Cosmic rays and shielding | `part-13/cosmic-rays-shielding` | – | planned |
| 13.5 | Neutrinos | `part-13/neutrinos` | – | planned |

**Part 14 · Astronomy and scale**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 14.1 | Light-years and stellar distances | `part-14/light-years` | – | planned |
| 14.2 | Planetary atmospheres | `part-14/planetary-atmospheres` | – | planned |
| 14.3 | Magnetic fields | `part-14/magnetic-fields` | – | planned |
| 14.4 | Sidebar: base-6 numbers | `part-14/base-six` | – | planned |
<!-- /AUTO:curriculum -->

Brief biology and chemistry sidebars are added only where the plot's physics depends on them.

---

## 6. Glossary terms so far

Source of truth: `src/data/glossary.mjs`.

<!-- AUTO:glossary -->
87 terms.

| Term | id | First chapter |
|---|---|---|
| Exponent | `exponent` | 0.1 |
| Power of ten | `power-of-ten` | 0.1 |
| Scientific notation | `scientific-notation` | 0.1 |
| Coefficient (in scientific notation) | `coefficient` | 0.1 |
| Significant figures | `significant-figures` | 0.1 |
| E notation | `e-notation` | 0.1 |
| Light-year (ly) | `light-year` | 0.1 |
| Astrophage | `astrophage` | 0.1 |
| Tau Ceti | `tau-ceti` | 0.1 |
| Petrova line | `petrova-line` | 0.1 |
| Rocky | `rocky` | 0.2 |
| Hail Mary (the ship) | `hail-mary` | 0.2 |
| Unit | `unit` | 0.2 |
| SI (International System of Units) | `si` | 0.2 |
| Base unit | `base-unit` | 0.2 |
| Derived unit | `derived-unit` | 0.2 |
| Second (s) | `second` | 0.2 |
| Metre (m) | `metre` | 0.2 |
| Kilogram (kg) | `kilogram` | 0.2 |
| Prefix (SI) | `prefix` | 0.2 |
| Litre (L) | `litre` | 0.2 |
| Tonne (t) | `tonne` | 0.2 |
| Astronomical unit (au) | `astronomical-unit` | 0.2 |
| Conversion factor | `conversion-factor` | 0.3 |
| Kelvin (K) | `kelvin` | 0.3 |
| Absolute zero | `absolute-zero` | 0.3 |
| Dimension | `dimension` | 0.3 |
| Dimensional analysis | `dimensional-analysis` | 0.3 |
| Equation | `equation` | 0.4 |
| Variable | `variable` | 0.4 |
| Subject (of a formula) | `subject-of-formula` | 0.4 |
| Inverse operation | `inverse-operation` | 0.4 |
| Density (ρ) | `density` | 0.4 |
| Ratio | `ratio` | 0.5 |
| Direct proportion (y ∝ x) | `direct-proportion` | 0.5 |
| Inverse proportion (y ∝ 1/x) | `inverse-proportion` | 0.5 |
| Constant of proportionality | `constant-of-proportionality` | 0.5 |
| Inverse-square law | `inverse-square-law` | 0.5 |
| Luminosity (L) | `luminosity` | 0.5 |
| Intensity (of light) | `intensity` | 0.5 |
| Solar constant | `solar-constant` | 0.5 |
| Watt (W) | `watt` | 0.5 |
| Degree (angle) | `degree-angle` | 0.6 |
| Radian (rad) | `radian` | 0.6 |
| Sine (sin) | `sine` | 0.6 |
| Cosine (cos) | `cosine` | 0.6 |
| Tangent (tan) | `tangent` | 0.6 |
| Unit circle | `unit-circle` | 0.6 |
| Small-angle approximation | `small-angle-approximation` | 0.6 |
| Parallax | `parallax` | 0.6 |
| Scalar | `scalar` | 0.7 |
| Vector | `vector` | 0.7 |
| Magnitude | `magnitude` | 0.7 |
| Displacement | `displacement` | 0.7 |
| Velocity | `velocity` | 0.7 |
| Resultant | `resultant` | 0.7 |
| Component (of a vector) | `component` | 0.7 |
| Unit vector | `unit-vector` | 0.7 |
| Relative velocity | `relative-velocity` | 0.7 |
| Exponential growth | `exponential-growth` | 0.8 |
| Exponential decay | `exponential-decay` | 0.8 |
| Doubling time (T) | `doubling-time` | 0.8 |
| Half-life | `half-life` | 0.8 |
| e (Euler’s number) | `eulers-number` | 0.8 |
| Logarithm | `logarithm` | 0.8 |
| Natural logarithm (ln) | `natural-logarithm` | 0.8 |
| Logarithmic scale | `log-scale` | 0.8 |
| Independent variable | `independent-variable` | 0.9 |
| Dependent variable | `dependent-variable` | 0.9 |
| Gradient (slope) | `gradient` | 0.9 |
| Intercept | `intercept` | 0.9 |
| Interpolation | `interpolation` | 0.9 |
| Extrapolation | `extrapolation` | 0.9 |
| Order of magnitude | `order-of-magnitude` | 0.10 |
| Fermi problem | `fermi-problem` | 0.10 |
| Geometric mean | `geometric-mean` | 0.10 |
| Rate of change | `rate-of-change` | C.1 |
| Average rate of change | `average-rate` | C.1 |
| Secant line | `secant-line` | C.1 |
| Acceleration | `acceleration` | C.1 |
| Tangent line | `tangent-line` | C.2 |
| Local linearity | `local-linearity` | C.2 |
| Difference quotient | `difference-quotient` | C.2 |
| Limit | `limit` | C.2 |
| Derivative | `derivative` | C.3 |
| Differentiation | `differentiation` | C.3 |
| Second derivative | `second-derivative` | C.3 |
<!-- /AUTO:glossary -->

---

## 7. Formulas so far

Source of truth: `src/data/formulas.mjs`.

<!-- AUTO:formulas -->
54 formulas.

| Formula | id | First chapter | LaTeX |
|---|---|---|---|
| Multiplying powers of ten | `pow10-multiply` | 0.1 | `10^{m} \times 10^{n} = 10^{m+n}` |
| Dividing powers of ten | `pow10-divide` | 0.1 | `\dfrac{10^{m}}{10^{n}} = 10^{m-n}` |
| Zero and negative exponents | `pow10-zero-negative` | 0.1 | `10^{0} = 1 \qquad 10^{-n} = \dfrac{1}{10^{n}}` |
| Power of a power | `pow10-power` | 0.1 | `\left(10^{m}\right)^{n} = 10^{mn}` |
| Multiplying in scientific notation | `sci-multiply` | 0.1 | `(a \times 10^{m})(b \times 10^{n}) = (ab) \times 10^{m+n}` |
| Dividing in scientific notation | `sci-divide` | 0.1 | `\dfrac{a \times 10^{m}}{b \times 10^{n}} = \dfrac{a}{b} \times 10^{m-n}` |
| Adding in scientific notation | `sci-add` | 0.1 | `a \times 10^{n} + b \times 10^{n} = (a+b) \times 10^{n}` |
| Square root in scientific notation | `sci-sqrt` | 0.1 | `\sqrt{a \times 10^{2m}} = \sqrt{a} \times 10^{m}` |
| Removing a prefix | `prefix-remove` | 0.2 | `x\ (\text{prefix})\square = x \times 10^{p}\ \square` |
| Changing prefix | `prefix-change` | 0.2 | `x\ (10^{p}\text{-prefix})\square = x \times 10^{\,p-q}\ (10^{q}\text{-prefix})\square` |
| Prefixes on squared and cubed units | `prefix-power` | 0.2 | `1\ (\text{prefix})\square^{\,k} = 10^{pk}\ \square^{\,k}` |
| Accepted non-SI units | `accepted-units` | 0.2 | `1\ \text{L} = 10^{-3}\ \text{m}^{3} \qquad 1\ \text{t} = 10^{3}\ \text{kg} \qquad 1\ \text{au} = 149\,597\,870\,700\ \text{m}` |
| Conversion factor | `conversion-factor` | 0.3 | `1\ \text{A} = k\ \text{B} \;\Rightarrow\; x\ \text{A} \times \dfrac{k\ \text{B}}{1\ \text{A}} = kx\ \text{B}` |
| Converting squared and cubed units | `conversion-squared` | 0.3 | `x\ \text{A}^{2} = k^{2}x\ \text{B}^{2} \qquad x\ \text{A}^{3} = k^{3}x\ \text{B}^{3}` |
| Celsius and kelvin | `celsius-kelvin` | 0.3 | `T_{\text{K}} = T_{°\text{C}} + 273.15` |
| Celsius and Fahrenheit | `celsius-fahrenheit` | 0.3 | `T_{°\text{F}} = \tfrac{9}{5}\,T_{°\text{C}} + 32 \qquad T_{°\text{C}} = \tfrac{5}{9}\left(T_{°\text{F}} - 32\right)` |
| Dimension rules | `dimension-rules` | 0.3 | `[AB] = [A][B] \qquad \left[\dfrac{A}{B}\right] = \dfrac{[A]}{[B]} \qquad [A+B] = [A] = [B]` |
| The three forms of y = x/z | `three-forms` | 0.4 | `y = \dfrac{x}{z} \iff x = yz \iff z = \dfrac{x}{y}` |
| Density | `density` | 0.4 | `\rho = \dfrac{m}{V}` |
| The fall formula, rearranged | `fall-rearranged` | 0.4 | `h = \tfrac{1}{2}gt^{2} \;\Rightarrow\; g = \dfrac{2h}{t^{2}}, \quad t = \sqrt{\dfrac{2h}{g}}` |
| Direct and inverse proportion | `proportion` | 0.5 | `y \propto x \iff y = kx \qquad\quad y \propto \dfrac{1}{x} \iff y = \dfrac{k}{x}` |
| Ratio method for a power law | `ratio-method` | 0.5 | `y = kx^{n} \;\Rightarrow\; \dfrac{y_{2}}{y_{1}} = \left(\dfrac{x_{2}}{x_{1}}\right)^{n}` |
| Inverse-square law for light | `inverse-square` | 0.5 | `I = \dfrac{L}{4\pi r^{2}} \qquad \dfrac{I_{2}}{I_{1}} = \left(\dfrac{r_{1}}{r_{2}}\right)^{2}` |
| Sine, cosine and tangent | `soh-cah-toa` | 0.6 | `\sin\theta = \dfrac{\text{opp}}{\text{hyp}} \qquad \cos\theta = \dfrac{\text{adj}}{\text{hyp}} \qquad \tan\theta = \dfrac{\text{opp}}{\text{adj}} = \dfrac{\sin\theta}{\cos\theta}` |
| Pythagoras’ theorem and the identity | `pythagoras` | 0.6 | `a^{2} + b^{2} = c^{2} \qquad \sin^{2}\theta + \cos^{2}\theta = 1` |
| Degrees and radians | `radians` | 0.6 | `360° = 2\pi\ \text{rad} \qquad 1\ \text{rad} \approx 57.30°` |
| Arc length and angular size | `arc-length` | 0.6 | `s = r\theta \qquad \theta \approx \dfrac{D}{d}` |
| Small-angle approximation | `small-angle` | 0.6 | `\sin\theta \approx \tan\theta \approx \theta \qquad \cos\theta \approx 1 - \tfrac{\theta^{2}}{2}` |
| Parallax distance | `parallax-distance` | 0.6 | `d = \dfrac{1\ \text{au}}{\tan p} \approx \dfrac{1\ \text{au}}{p}` |
| Components of a vector | `vector-components` | 0.7 | `A_{x} = A\cos\theta \qquad A_{y} = A\sin\theta` |
| Magnitude and direction from components | `vector-magnitude` | 0.7 | `A = \sqrt{A_{x}^{2} + A_{y}^{2}} \qquad \theta = \tan^{-1}\!\left(\dfrac{A_{y}}{A_{x}}\right)` |
| Adding, subtracting and scaling vectors | `vector-add` | 0.7 | `\mathbf{A} \pm \mathbf{B} = (A_{x} \pm B_{x},\ A_{y} \pm B_{y}) \qquad k\mathbf{A} = (kA_{x},\ kA_{y})` |
| Relative velocity | `relative-velocity` | 0.7 | `\mathbf{v}_{\text{rel}} = \mathbf{v}_{2} - \mathbf{v}_{1}` |
| Exponent rules for any base | `exponent-rules` | 0.8 | `a^{m}a^{n} = a^{m+n} \quad \dfrac{a^{m}}{a^{n}} = a^{m-n} \quad (a^{m})^{n} = a^{mn} \quad a^{1/n} = \sqrt[n]{a}` |
| Exponential growth and decay | `exp-growth` | 0.8 | `N = N_{0}\,2^{t/T} \qquad N = N_{0}\left(\tfrac{1}{2}\right)^{t/t_{1/2}} \qquad N = N_{0}\,e^{kt}` |
| Doubling time and growth rate | `doubling-rate` | 0.8 | `T = \dfrac{\ln 2}{k} \approx \dfrac{0.693}{k}` |
| Definition of a logarithm | `log-definition` | 0.8 | `\log_{b}x = y \iff b^{y} = x` |
| Laws of logarithms | `log-laws` | 0.8 | `\log(xy) = \log x + \log y \quad \log\dfrac{x}{y} = \log x - \log y \quad \log x^{n} = n\log x \quad \log_{b}x = \dfrac{\ln x}{\ln b}` |
| Time to grow by a factor | `time-to-grow` | 0.8 | `t = T\log_{2}\!\left(\dfrac{N}{N_{0}}\right) = T\,\dfrac{\ln(N/N_{0})}{\ln 2}` |
| Straight line, gradient and intercept | `straight-line` | 0.9 | `y = mx + c \qquad m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_{2} - y_{1}}{x_{2} - x_{1}} \qquad c = y_{1} - mx_{1}` |
| Linearising exponentials and power laws | `linearising` | 0.9 | `y = Ae^{kx} \Rightarrow \ln y = \ln A + kx \qquad y = kx^{n} \Rightarrow \log y = \log k + n\log x` |
| Order of magnitude | `order-of-magnitude` | 0.10 | `10^{\,\text{round}(\log_{10}x)} \qquad \text{boundary: } \sqrt{10} \approx 3.16` |
| Geometric mean of bounds | `geometric-mean` | 0.10 | `g = \sqrt{ab}` |
| Combining error factors in a product | `error-factors` | 0.10 | `\text{worst case } f^{\,n} \qquad \text{typical} \approx f^{\sqrt{n}}` |
| Average rate of change | `average-rate` | C.1 | `\dfrac{\Delta y}{\Delta x} = \dfrac{y(b) - y(a)}{b - a}` |
| Average velocity and acceleration | `average-velocity-acceleration` | C.1 | `v_{\text{avg}} = \dfrac{\Delta x}{\Delta t} \qquad a_{\text{avg}} = \dfrac{\Delta v}{\Delta t}` |
| Average rate of kt² | `average-rate-squared` | C.1 | `d = kt^{2} \;\Rightarrow\; \dfrac{\Delta d}{\Delta t} = k(t_{1} + t_{2})` |
| Slope at a point (definition of the derivative) | `derivative-definition` | C.2 | `f'(a) = \lim_{h \to 0} \dfrac{f(a + h) - f(a)}{h}` |
| Tangent line and linear approximation | `tangent-approx` | C.2 | `y = f(a) + f'(a)(x - a) \qquad f(a + h) \approx f(a) + f'(a)\,h` |
| A key limit | `sinx-over-x` | C.2 | `\lim_{x \to 0} \dfrac{\sin x}{x} = 1 \qquad \lim_{h \to 0} \dfrac{e^{h} - 1}{h} = 1` |
| Power, constant-multiple and sum rules | `power-rule` | C.3 | `\dfrac{d}{dx}x^{n} = nx^{n-1} \qquad \dfrac{d}{dx}[c\,f + g] = c\,f' + g' \qquad \dfrac{d}{dx}c = 0` |
| Derivatives of eˣ, sin and cos | `exp-trig-derivatives` | C.3 | `\dfrac{d}{dx}e^{x} = e^{x} \qquad \dfrac{d}{dx}\sin x = \cos x \qquad \dfrac{d}{dx}\cos x = -\sin x` |
| Scaling rule | `scaling-rule` | C.3 | `\dfrac{d}{dx}f(kx) = k\,f'(kx) \qquad \dfrac{d}{dt}e^{kt} = ke^{kt}` |
| Velocity and acceleration as derivatives | `velocity-acceleration` | C.3 | `v = \dfrac{dx}{dt} \qquad a = \dfrac{dv}{dt} = \dfrac{d^{2}x}{dt^{2}}` |
<!-- /AUTO:formulas -->

---

## 8. Verified reference values

All constants and book figures used so far, each with its source, are in `scripts/verify/constants.mjs`. Highlights:

- c = 299 792 458 m/s (exact). Standard gravity 9.806 65 m/s² (conventional). au = 149 597 870 700 m (IAU 2012). ly = c × Julian year = 9.4607 × 10¹⁵ m.
- Sun: L = 3.828 × 10²⁶ W, R = 695 700 km, mass 1.9884 × 10³⁰ kg, irradiance at 1 au 1361 W/m² (NASA NSSDCA, 2024).
- Earth: mass 5.9722 × 10²⁴ kg, mean radius 6371 km, orbital speed 29.78 km/s. Moon: distance 384 400 km.
- Planet irradiance (NASA): Mercury 9082.7, Venus 2601.3, Mars 586.2, Jupiter 50.26, Saturn 14.82 W/m².
- Tau Ceti: parallax 273.8097 ± 0.1701 mas (SIMBAD/Gaia) → 11.912 ly. Luminosity 0.49 to 0.52 L☉ (we use 0.52, and say so).
- **Book figures (approximate, from the novel via reader guides and the Royal Institution article):** Astrophage 10 µm across, held at 96.415 °C. The *Hail Mary* accelerates at 1.5 g. Ship time about 3.75 yr, Earth time about 13 yr. Fuel about 2 × 10⁶ kg. Engines burn about 6 g/s. Dimming forecast: about 1% in about 9 yr and 5% in about 20 yr.
- Calculus examples reuse the ship at 1.5 g as d = 7.35t² m (v = 14.7t m/s) and the dimming model D = 2^((t−9)/4.737) %, with dD/dt = 0.1463·D per year.
- Open question for Part 5: is 2 × 10⁶ kg of fuel at 6 g/s consistent with the trip's duration (2 × 10⁶ / 0.006 s ≈ 10.6 yr of continuous burn, compared with about 3.75 yr of ship time)? Check against the novel, which may have several drives, before relying on it.

---

## 9. Session log

- **Session 1 (2026-10-05).** Built the site frame (Astro 7 + Starlight, KaTeX, overrides), the space theme (starfield, glass, hero, animations), all site features (sidebar by Part, progress tracking, glossary with tooltips, formula sheet, physics map, print stylesheet, Ask Claude with selection button, /raw/ markdown export), the verification and check scripts, the GitHub Actions deploy workflow, the README, and all of Part 0 (0.1 to 0.10, 119 practice problems, 10 simulations, 21 diagrams). Part 0 is marked `review`, waiting for the author's feedback on depth, style and difficulty. **Next session:** apply the review feedback, then start Part 0.5 with C.1 Rates of change.
- **Session 1b (2026-10-05).** Redesigned the UI to be more mature and formal: serif display type, one gold accent, hairline panels, numbered sections, a navigation-chart hero and a calmer starfield. Added collapsible sidebars and focus mode. Pushed to GitHub.
- **Session 2 (2026-10-05).** Found a deploy bug: re-running an *old* Actions run redeployed old code over newer code. The workflow now refuses to deploy any commit that isn't the tip of `main`. Wrote the first half of Part 0.5: C.1 Rates of change, C.2 Slopes of curves and limits, C.3 Derivatives and simple rules (33 practice problems, 3 simulations, 6 diagrams). They define velocity and acceleration as derivatives, ready for Part 1. Diagram labels that sit over lines use the `halo` class. Redesigned the UI again at the author's request (more detailed, space-themed and fun; see Style rules). **Next:** C.4 Area under curves, C.5 Integrals, C.6 The fundamental theorem.
