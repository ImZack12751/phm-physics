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
- Home page: the per-chapter progress table sits in a collapsible panel (closed by default, state in localStorage `phm-dash-open`), with a skip link to the roadmap. The hero ship's position and angle are computed from the route's Bézier curve in `overrides/Hero.astro` (`SHIP_T`), so it always sits on the line to Tau Ceti.
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
| C.4 | Area under curves | `calculus/area-under-curves` | 0.9, C.2 | written, awaiting review |
| C.5 | Integrals | `calculus/integrals` | C.4, C.3 | written, awaiting review |
| C.6 | The fundamental theorem of calculus | `calculus/fundamental-theorem` | C.5 | written, awaiting review |

**Part 1 · Motion**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 1.1 | Position, velocity and acceleration | `part-1/kinematics` | C.3, C.6, 0.7 | written, awaiting review |
| 1.2 | The equations of motion | `part-1/equations-of-motion` | 1.1, C.5 | written, awaiting review |
| 1.3 | Free fall | `part-1/free-fall` | 1.2 | written, awaiting review |
| 1.4 | Measuring g | `part-1/measuring-g` | 1.3, 0.9, 0.3, C.3 | written, awaiting review |

**Part 2 · Forces**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 2.1 | Newton’s laws | `part-2/newtons-laws` | 1.1, 1.2, 1.3, 0.7 | written, awaiting review |
| 2.2 | Mass vs weight | `part-2/mass-and-weight` | 2.1, 1.3 | written, awaiting review |
| 2.3 | Apparent weight in accelerating ships | `part-2/apparent-weight` | 2.2, 2.1, 1.1 | written, awaiting review |
| 2.4 | Pendulums and simple harmonic motion | `part-2/pendulums-shm` | 2.1, 2.3, C.3, 0.6, 1.4 | written, awaiting review |

**Part 3 · Circular motion and artificial gravity**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 3.1 | Angular speed | `part-3/angular-speed` | 0.6, 1.1, C.3 | written, awaiting review |
| 3.2 | Centripetal acceleration | `part-3/centripetal-acceleration` | 3.1, 2.1, 0.7, 2.4 | written, awaiting review |
| 3.3 | Designing spin gravity | `part-3/spin-gravity` | 3.2, 2.3, 1.4, 2.4 | written, awaiting review |
| 3.4 | The Coriolis effect | `part-3/coriolis` | 3.3, 3.2, 1.1, C.5 | written, awaiting review |

**Part 4 · Gravitation and orbits**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 4.1 | Newton’s law of gravitation | `part-4/gravitation` | 3.2, 0.5, 2.2, 2.1 | written, awaiting review |
| 4.2 | Orbital speed | `part-4/orbital-speed` | 4.1, 3.2, 2.3, 3.1 | written, awaiting review |
| 4.3 | Kepler’s laws | `part-4/keplers-laws` | 4.2, 0.9, 0.7 | written, awaiting review |
| 4.4 | Escape velocity | `part-4/escape-velocity` | 4.3, 1.2, C.6 | written, awaiting review |
| 4.5 | Finding a planet’s mass from an orbit | `part-4/planet-mass-from-orbit` | 4.3, 1.4, 0.4 | written, awaiting review |
| 4.6 | Orbital manoeuvring | `part-4/orbital-manoeuvring` | 4.4, 4.3, 0.7 | written, awaiting review |

**Part 5 · Energy and momentum**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 5.1 | Work as an integral | `part-5/work` | 2.1, 0.7, C.5, C.6, 4.1 | written, awaiting review |
| 5.2 | Kinetic and potential energy | `part-5/kinetic-potential-energy` | 5.1, 1.2, 4.4, C.3 | written, awaiting review |
| 5.3 | Power | `part-5/power` | 5.1, 5.2, C.3 | written, awaiting review |
| 5.4 | Conservation laws | `part-5/conservation-laws` | 5.2, 5.3, 2.1, 4.6 | written, awaiting review |
| 5.5 | Momentum | `part-5/momentum` | 2.1, 5.4, C.5, 0.7 | written, awaiting review |
| 5.6 | Thrust | `part-5/thrust` | 5.5, 5.3, 2.1, 2.3 | written, awaiting review |
| 5.7 | The Tsiolkovsky rocket equation | `part-5/rocket-equation` | 5.6, C.5, 0.8, 4.6 | written, awaiting review |

**Part 6 · Thermal physics and climate**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 6.1 | Temperature and heat | `part-6/temperature-heat` | 0.3, 5.2, 5.4, 5.5 | written, awaiting review |
| 6.2 | Specific and latent heat | `part-6/specific-latent-heat` | 6.1, 5.4, 0.9, 5.3 | written, awaiting review |
| 6.3 | Heat transfer | `part-6/heat-transfer` | 6.1, 6.2, 0.8, C.3, 5.3 | written, awaiting review |
| 6.4 | Planetary energy balance and albedo | `part-6/energy-balance` | 6.3, 0.5, 6.2, C.3, 4.3 | written, awaiting review |
| 6.5 | The greenhouse effect | `part-6/greenhouse-effect` | 6.4, 6.3, 0.8, 6.1 | written, awaiting review |
| 6.6 | Feedback loops | `part-6/feedback-loops` | 6.4, 6.5, 6.2, 0.9 | written, awaiting review |

**Part 7 · Waves and light**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 7.1 | Wave properties | `part-7/wave-properties` | 2.4, 3.2, 0.6, 0.7, 5.2, 0.5 | written, awaiting review |
| 7.2 | c = fλ and the EM spectrum | `part-7/em-spectrum` | 7.1, 0.1, 0.2, 0.8, 0.6, 1.1 | written, awaiting review |
| 7.3 | Photons | `part-7/photons` | 7.2, 5.2, 5.3, 0.1, 0.9, 6.1 | written, awaiting review |
| 7.4 | The momentum of light and photon propulsion | `part-7/photon-propulsion` | 7.3, 5.5, 5.6, 5.7, 0.5, 4.1 | written, awaiting review |
| 7.5 | Spectroscopy | `part-7/spectroscopy` | 7.3, 7.2, 7.1, 0.6, 5.5, 4.3 | written, awaiting review |

**Part 8 · Thermal radiation and stars**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 8.1 | Blackbody radiation and Wien’s law | `part-8/blackbody-wien` | 7.3, 7.2, 6.3, 6.1, C.3, 0.8 | written, awaiting review |
| 8.2 | The Stefan–Boltzmann law and luminosity | `part-8/stefan-boltzmann` | 8.1, 6.3, C.5, 0.5, 5.3, C.3 | written, awaiting review |
| 8.3 | The inverse-square law and the solar constant | `part-8/solar-constant` | 8.2, 0.5, 6.4, 4.3, 0.6, 7.3 | written, awaiting review |
| 8.4 | The Sun vs Tau Ceti | `part-8/sun-vs-tau-ceti` | 8.3, 8.2, 8.1, 4.5, 7.5, 0.8 | written, awaiting review |

**Part 9 · Mass–energy**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 9.1 | E = mc² | `part-9/mass-energy` | 7.4, 5.5, 3.3, 5.3, 6.2, 0.1 | written, awaiting review |
| 9.2 | Energy density: chemical to Astrophage | `part-9/energy-density` | 9.1, 5.7, 5.6, 5.2, 0.8, 6.4 | written, awaiting review |

**Part 10 · Special relativity**

| # | Chapter | Path | Prerequisites | Status |
|---|---|---|---|---|
| 10.1 | The postulates of relativity | `part-10/postulates` | 1.2, 0.7, 2.1, 2.3, 7.2, 7.1 | written, awaiting review |
| 10.2 | Time dilation and the light clock | `part-10/time-dilation` | 10.1, 0.6, 0.8, 1.1, 4.2, 0.1 | written, awaiting review |
| 10.3 | The Lorentz factor | `part-10/lorentz-factor` | 10.2, 5.2, 5.5, 9.1, C.2, C.3 | written, awaiting review |
| 10.4 | Length contraction | `part-10/length-contraction` | 10.2, 10.3, 0.1, 1.1, 0.6 | written, awaiting review |
| 10.5 | Velocity addition | `part-10/velocity-addition` | 10.4, 10.2, 0.7, 0.8, 7.5, 7.4 | written, awaiting review |
| 10.6 | Ship time vs Earth time | `part-10/ship-time-earth-time` | 10.5, 5.7, 1.2, 2.3, C.5, C.3 | written, awaiting review |

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
304 terms.

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
| Riemann sum | `riemann-sum` | C.4 |
| Sigma notation (Σ) | `sigma-notation` | C.4 |
| Trapezoid rule | `trapezoid-rule` | C.4 |
| Signed area | `signed-area` | C.4 |
| Integral (definite) | `integral` | C.5 |
| Integrand | `integrand` | C.5 |
| Limits of integration | `limits-of-integration` | C.5 |
| Antiderivative | `antiderivative` | C.5 |
| Indefinite integral | `indefinite-integral` | C.5 |
| Constant of integration (C) | `constant-of-integration` | C.5 |
| Initial condition | `initial-condition` | C.5 |
| Accumulation function | `accumulation-function` | C.6 |
| Fundamental theorem of calculus | `fundamental-theorem` | C.6 |
| Average value (of a function) | `average-value` | C.6 |
| Reference frame | `reference-frame` | 1.1 |
| Position (x) | `position` | 1.1 |
| Instantaneous velocity | `instantaneous-velocity` | 1.1 |
| Speed | `speed` | 1.1 |
| Uniform acceleration | `uniform-acceleration` | 1.2 |
| Kinematic equations ("suvat") | `kinematic-equations` | 1.2 |
| Flip-and-burn | `flip-and-burn` | 1.2 |
| Free fall | `free-fall` | 1.3 |
| Acceleration due to gravity (g) | `acceleration-due-to-gravity` | 1.3 |
| Air resistance | `air-resistance` | 1.3 |
| Terminal velocity | `terminal-velocity` | 1.3 |
| Projectile | `projectile` | 1.3 |
| Uncertainty | `uncertainty` | 1.4 |
| Fractional uncertainty | `fractional-uncertainty` | 1.4 |
| Random error | `random-error` | 1.4 |
| Systematic error | `systematic-error` | 1.4 |
| Mean | `mean` | 1.4 |
| Standard deviation | `standard-deviation` | 1.4 |
| Period (T) | `period` | 1.4 |
| Force | `force` | 2.1 |
| Newton (N) | `newton` | 2.1 |
| Net force | `net-force` | 2.1 |
| Inertia | `inertia` | 2.1 |
| Free-body diagram | `free-body-diagram` | 2.1 |
| Weight (W) | `weight` | 2.1 |
| Normal force (N) | `normal-force` | 2.1 |
| Tension (T) | `tension` | 2.1 |
| Equilibrium | `equilibrium` | 2.1 |
| Mass (m) | `mass` | 2.2 |
| Inertial mass | `inertial-mass` | 2.2 |
| Gravitational mass | `gravitational-mass` | 2.2 |
| Gravitational field strength (g) | `gravitational-field-strength` | 2.2 |
| Apparent weight | `apparent-weight` | 2.3 |
| Weightlessness | `weightlessness` | 2.3 |
| Equivalence principle | `equivalence-principle` | 2.3 |
| G-force | `g-force` | 2.3 |
| Restoring force | `restoring-force` | 2.4 |
| Hooke’s law | `hookes-law` | 2.4 |
| Spring constant (k) | `spring-constant` | 2.4 |
| Simple harmonic motion (SHM) | `simple-harmonic-motion` | 2.4 |
| Amplitude (A) | `amplitude` | 2.4 |
| Angular frequency (ω) | `angular-frequency` | 2.4 |
| Frequency (f) | `frequency` | 2.4 |
| Hertz (Hz) | `hertz` | 2.4 |
| Angular displacement (θ) | `angular-displacement` | 3.1 |
| Angular speed (ω) | `angular-speed` | 3.1 |
| Revolutions per minute (rpm) | `revolutions-per-minute` | 3.1 |
| Tangential speed | `tangential-speed` | 3.1 |
| Uniform circular motion | `uniform-circular-motion` | 3.1 |
| Centripetal acceleration | `centripetal-acceleration` | 3.2 |
| Centripetal force | `centripetal-force` | 3.2 |
| Centrifugal force | `centrifugal-force` | 3.2 |
| Artificial gravity | `artificial-gravity` | 3.3 |
| Gravity gradient | `gravity-gradient` | 3.3 |
| Centre of mass | `centre-of-mass` | 3.3 |
| Coriolis effect | `coriolis-effect` | 3.4 |
| Spinward and antispinward | `spinward` | 3.4 |
| Foucault pendulum | `foucault-pendulum` | 3.4 |
| Law of universal gravitation | `law-of-gravitation` | 4.1 |
| Gravitational constant (G) | `gravitational-constant` | 4.1 |
| Shell theorem | `shell-theorem` | 4.1 |
| Orbit | `orbit` | 4.2 |
| Geostationary orbit | `geostationary-orbit` | 4.2 |
| Tidal effect | `tidal-effect` | 4.2 |
| Ellipse | `ellipse` | 4.3 |
| Semi-major axis (a) | `semi-major-axis` | 4.3 |
| Eccentricity (e) | `eccentricity` | 4.3 |
| Perihelion and aphelion | `perihelion` | 4.3 |
| Escape velocity | `escape-velocity` | 4.4 |
| Burn | `burn` | 4.6 |
| Delta-v (Δv) | `delta-v` | 4.6 |
| Vis-viva equation | `vis-viva` | 4.6 |
| Hohmann transfer | `hohmann-transfer` | 4.6 |
| Work | `work` | 5.1 |
| Joule (J) | `joule` | 5.1 |
| Kinetic energy | `kinetic-energy` | 5.2 |
| Work–energy theorem | `work-energy-theorem` | 5.2 |
| Potential energy | `potential-energy` | 5.2 |
| Conservative force | `conservative-force` | 5.2 |
| Mechanical energy | `mechanical-energy` | 5.2 |
| Power | `power` | 5.3 |
| Kilowatt-hour (kWh) | `kilowatt-hour` | 5.3 |
| Efficiency (η) | `efficiency` | 5.3 |
| Thermal energy | `thermal-energy` | 5.4 |
| Closed system | `closed-system` | 5.4 |
| Conservation of energy | `conservation-of-energy` | 5.4 |
| Bound orbit | `bound-orbit` | 5.4 |
| Momentum | `momentum` | 5.5 |
| Impulse | `impulse` | 5.5 |
| Conservation of momentum | `conservation-of-momentum` | 5.5 |
| Elastic collision | `elastic-collision` | 5.5 |
| Inelastic collision | `inelastic-collision` | 5.5 |
| Propellant | `propellant` | 5.6 |
| Thrust | `thrust` | 5.6 |
| Exhaust speed (v_e) | `exhaust-velocity` | 5.6 |
| Specific impulse (I_sp) | `specific-impulse` | 5.6 |
| Tsiolkovsky rocket equation | `rocket-equation` | 5.7 |
| Mass ratio | `mass-ratio` | 5.7 |
| Temperature | `temperature` | 6.1 |
| Thermal equilibrium | `thermal-equilibrium` | 6.1 |
| Zeroth law of thermodynamics | `zeroth-law` | 6.1 |
| Boltzmann constant (k) | `boltzmann-constant` | 6.1 |
| Root-mean-square speed | `rms-speed` | 6.1 |
| Internal energy | `internal-energy` | 6.1 |
| Heat | `heat` | 6.1 |
| Calorie | `calorie` | 6.1 |
| First law of thermodynamics | `first-law` | 6.1 |
| Thermal expansion | `thermal-expansion` | 6.1 |
| Specific heat (c) | `specific-heat` | 6.2 |
| Heat capacity | `heat-capacity` | 6.2 |
| Calorimetry | `calorimetry` | 6.2 |
| Phase change | `phase-change` | 6.2 |
| Latent heat (L) | `latent-heat` | 6.2 |
| Conduction | `conduction` | 6.3 |
| Convection | `convection` | 6.3 |
| Thermal radiation | `thermal-radiation` | 6.3 |
| Thermal conductivity (k) | `thermal-conductivity` | 6.3 |
| Newton’s law of cooling | `newtons-law-of-cooling` | 6.3 |
| Stefan–Boltzmann constant (σ) | `stefan-boltzmann-constant` | 6.3 |
| Emissivity (e) | `emissivity` | 6.3 |
| Equilibrium temperature | `equilibrium-temperature` | 6.4 |
| Albedo | `albedo` | 6.4 |
| Greenhouse effect | `greenhouse-effect` | 6.5 |
| Greenhouse gas | `greenhouse-gas` | 6.5 |
| Radiative forcing | `radiative-forcing` | 6.5 |
| Feedback | `feedback` | 6.6 |
| Planck response | `planck-response` | 6.6 |
| Feedback factor (f) | `feedback-factor` | 6.6 |
| Climate sensitivity | `climate-sensitivity` | 6.6 |
| Tipping point | `tipping-point` | 6.6 |
| Hysteresis | `hysteresis` | 6.6 |
| Wave | `wave` | 7.1 |
| Medium (of a wave) | `medium` | 7.1 |
| Transverse wave | `transverse-wave` | 7.1 |
| Longitudinal wave | `longitudinal-wave` | 7.1 |
| Wavelength (λ) | `wavelength` | 7.1 |
| Wave speed (v) | `wave-speed` | 7.1 |
| Wavenumber (k) | `wavenumber` | 7.1 |
| Phase | `phase` | 7.1 |
| Superposition | `superposition` | 7.1 |
| Interference | `interference` | 7.1 |
| Standing wave | `standing-wave` | 7.1 |
| Electric charge | `electric-charge` | 7.2 |
| Electric field | `electric-field` | 7.2 |
| Electromagnetic wave | `electromagnetic-wave` | 7.2 |
| Speed of light (c) | `speed-of-light` | 7.2 |
| Electromagnetic spectrum | `electromagnetic-spectrum` | 7.2 |
| Infrared | `infrared` | 7.2 |
| Refractive index (n) | `refractive-index` | 7.2 |
| Refraction | `refraction` | 7.2 |
| Snell’s law | `snells-law` | 7.2 |
| Total internal reflection | `total-internal-reflection` | 7.2 |
| Photoelectric effect | `photoelectric-effect` | 7.3 |
| Photon | `photon` | 7.3 |
| Planck constant (h) | `planck-constant` | 7.3 |
| Electronvolt (eV) | `electronvolt` | 7.3 |
| Work function (φ) | `work-function` | 7.3 |
| Wave–particle duality | `wave-particle-duality` | 7.3 |
| Radiation pressure | `radiation-pressure` | 7.4 |
| Solar sail | `solar-sail` | 7.4 |
| Photon rocket | `photon-rocket` | 7.4 |
| Dispersion | `dispersion` | 7.5 |
| Spectrum | `spectrum` | 7.5 |
| Emission spectrum | `emission-spectrum` | 7.5 |
| Absorption spectrum | `absorption-spectrum` | 7.5 |
| Energy level | `energy-level` | 7.5 |
| Doppler effect | `doppler-effect` | 7.5 |
| Radial-velocity method | `radial-velocity` | 7.5 |
| Blackbody | `blackbody` | 8.1 |
| Planck’s law | `plancks-law` | 8.1 |
| Wien’s displacement law | `wiens-law` | 8.1 |
| Ultraviolet catastrophe | `ultraviolet-catastrophe` | 8.1 |
| Stefan–Boltzmann law | `stefan-boltzmann-law` | 8.2 |
| Effective temperature | `effective-temperature` | 8.2 |
| Habitable zone | `habitable-zone` | 8.3 |
| Angular radius | `angular-radius` | 8.3 |
| Main sequence | `main-sequence` | 8.4 |
| Metallicity | `metallicity` | 8.4 |
| Mass–energy equivalence (E = mc²) | `mass-energy-equivalence` | 9.1 |
| Rest energy | `rest-energy` | 9.1 |
| Mass defect | `mass-defect` | 9.1 |
| Antimatter | `antimatter` | 9.1 |
| Specific energy | `specific-energy` | 9.2 |
| Energy density | `energy-density` | 9.2 |
| Inertial frame | `inertial-frame` | 10.1 |
| Principle of relativity | `principle-of-relativity` | 10.1 |
| Postulates of special relativity | `postulates-of-relativity` | 10.1 |
| Event | `event` | 10.1 |
| Relativity of simultaneity | `relativity-of-simultaneity` | 10.1 |
| Time dilation | `time-dilation` | 10.2 |
| Proper time (τ) | `proper-time` | 10.2 |
| Lorentz factor (γ) | `lorentz-factor` | 10.2 |
| Twin paradox | `twin-paradox` | 10.2 |
| Relativistic momentum | `relativistic-momentum` | 10.3 |
| Relativistic energy | `relativistic-energy` | 10.3 |
| Length contraction | `length-contraction` | 10.4 |
| Proper length (L₀) | `proper-length` | 10.4 |
| Lorentz transformation | `lorentz-transformation` | 10.5 |
| Relativistic velocity addition | `velocity-addition` | 10.5 |
| Rapidity (φ) | `rapidity` | 10.5 |
| Hyperbolic functions | `hyperbolic-functions` | 10.5 |
| Relativistic Doppler shift | `relativistic-doppler` | 10.5 |
| Proper acceleration | `proper-acceleration` | 10.6 |
<!-- /AUTO:glossary -->

---

## 7. Formulas so far

Source of truth: `src/data/formulas.mjs`.

<!-- AUTO:formulas -->
176 formulas.

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
| Riemann sums and the trapezoid rule | `riemann-sum` | C.4 | `\Delta x = \dfrac{b - a}{n} \qquad \text{area} \approx \sum_{k=1}^{n} f(x_{k})\,\Delta x \qquad T_{n} = \dfrac{L_{n} + R_{n}}{2}` |
| Sums of whole numbers and squares | `sum-formulas` | C.4 | `\sum_{k=1}^{n} k = \dfrac{n(n + 1)}{2} \qquad \sum_{k=1}^{n} k^{2} = \dfrac{n(n + 1)(2n + 1)}{6}` |
| Area under a parabola | `area-parabola` | C.4 | `\text{area under } x^{2} \text{ from 0 to } b = \dfrac{b^{3}}{3}` |
| The definite integral | `definite-integral` | C.5 | `\int_{a}^{b} f(x)\,dx = \lim_{n \to \infty} \sum_{k=1}^{n} f(x_{k})\,\Delta x` |
| Properties of definite integrals | `integral-properties` | C.5 | `\int_{a}^{b} [c\,f + g]\,dx = c\int_{a}^{b} f\,dx + \int_{a}^{b} g\,dx \qquad \int_{a}^{b} + \int_{b}^{c} = \int_{a}^{c} \qquad \int_{b}^{a} = -\int_{a}^{b}` |
| Basic antiderivatives | `antiderivative-rules` | C.5 | `\int x^{n}\,dx = \dfrac{x^{n+1}}{n + 1} + C \;(n \neq -1) \qquad \int \dfrac{1}{x}\,dx = \ln x + C \qquad \int e^{kx}\,dx = \dfrac{e^{kx}}{k} + C \qquad \int \cos kx\,dx = \dfrac{\sin kx}{k} + C \qquad \int \sin kx\,dx = -\dfrac{\cos kx}{k} + C` |
| Derivative of the natural logarithm | `ln-derivative` | C.5 | `\dfrac{d}{dx}\ln x = \dfrac{1}{x}` |
| Motion with constant acceleration | `constant-acceleration` | C.5 | `v = v_{0} + at \qquad x = x_{0} + v_{0}t + \tfrac{1}{2}at^{2}` |
| The fundamental theorem of calculus | `ftc` | C.6 | `\dfrac{d}{dx}\int_{a}^{x} f(t)\,dt = f(x) \qquad \int_{a}^{b} f(x)\,dx = \Big[F(x)\Big]_{a}^{b} = F(b) - F(a)` |
| Net change from a rate | `net-change` | C.6 | `\int_{a}^{b} \dfrac{dQ}{dt}\,dt = Q(b) - Q(a) \qquad \Delta x = \int_{t_{1}}^{t_{2}} v\,dt \qquad \Delta v = \int_{t_{1}}^{t_{2}} a\,dt` |
| Average value of a function | `average-value` | C.6 | `\bar{f} = \dfrac{1}{b - a}\int_{a}^{b} f(x)\,dx` |
| Displacement, velocity, speed and acceleration | `kinematics-definitions` | 1.1 | `\Delta x = x_{2} - x_{1} \qquad v = \dfrac{dx}{dt} \qquad \text{speed} = \|v\| \qquad a = \dfrac{dv}{dt}` |
| Velocity in two dimensions | `velocity-2d` | 1.1 | `\mathbf{v} = \left(\dfrac{dx}{dt}, \dfrac{dy}{dt}\right) \qquad \|\mathbf{v}\| = \sqrt{v_{x}^{2} + v_{y}^{2}}` |
| The equations of motion (constant acceleration) | `suvat` | 1.2 | `v = u + at \qquad s = ut + \tfrac{1}{2}at^{2} \qquad s = \tfrac{1}{2}(u + v)t \qquad v^{2} = u^{2} + 2as \qquad s = vt - \tfrac{1}{2}at^{2}` |
| Flip-and-burn trip | `flip-and-burn` | 1.2 | `t_{\text{trip}} = 2\sqrt{\dfrac{d}{a}} \qquad v_{\text{peak}} = \sqrt{ad}` |
| Free fall | `free-fall` | 1.3 | `t = \sqrt{\dfrac{2h}{g}} \qquad v = \sqrt{2gh} \qquad t_{\text{top}} = \dfrac{u}{g} \qquad h_{\text{max}} = \dfrac{u^{2}}{2g}` |
| Horizontal launch | `horizontal-launch` | 1.3 | `x = ut \qquad y = h - \tfrac{1}{2}gt^{2} \qquad \text{range} = u\sqrt{\dfrac{2h}{g}}` |
| g from a timed drop | `g-from-drop` | 1.4 | `g = \dfrac{2h}{t^{2}} \qquad \dfrac{\Delta g}{g} \approx \dfrac{\Delta h}{h} + 2\,\dfrac{\Delta t}{t}` |
| Uncertainty of a power law | `uncertainty-power` | 1.4 | `y = kx^{n} \;\Rightarrow\; \dfrac{\Delta y}{y} \approx n\,\dfrac{\Delta x}{x}` |
| Mean and its uncertainty | `mean-standard-error` | 1.4 | `\bar{x} = \dfrac{1}{N}\sum_{k=1}^{N} x_{k} \qquad s = \sqrt{\dfrac{1}{N - 1}\sum_{k=1}^{N}(x_{k} - \bar{x})^{2}} \qquad \Delta\bar{x} \approx \dfrac{s}{\sqrt{N}}` |
| Period of a pendulum | `pendulum-period` | 1.4 | `T = 2\pi\sqrt{\dfrac{L}{g}} \qquad g = \dfrac{4\pi^{2}L}{T^{2}}` |
| Newton’s second law | `newtons-second-law` | 2.1 | `\mathbf{F}_{\text{net}} = m\mathbf{a} \qquad 1\ \text{N} = 1\ \text{kg·m/s}^{2}` |
| Newton’s third law | `newtons-third-law` | 2.1 | `\mathbf{F}_{\text{A on B}} = -\mathbf{F}_{\text{B on A}}` |
| Terminal velocity (drag ∝ v²) | `terminal-velocity` | 2.1 | `ma = mg - bv^{2} \qquad v_{\text{t}} = \sqrt{\dfrac{mg}{b}}` |
| Weight | `weight` | 2.2 | `W = mg \qquad \dfrac{W_{2}}{W_{1}} = \dfrac{g_{2}}{g_{1}} \qquad 1\ \text{N/kg} = 1\ \text{m/s}^{2}` |
| Mass from a push | `mass-from-push` | 2.2 | `m = \dfrac{F}{a}` |
| Apparent weight and apparent gravity | `apparent-weight` | 2.3 | `N = m(g + a) \qquad g_{\text{eff}} = g + a \qquad \mathbf{g}_{\text{eff}} = \mathbf{g} - \mathbf{a}` |
| G-force | `g-force` | 2.3 | `n = \dfrac{g_{\text{eff}}}{9.81\ \text{m/s}^{2}} = \dfrac{N}{m \times 9.81\ \text{m/s}^{2}}` |
| Hooke’s law | `hookes-law` | 2.4 | `F = -kx` |
| Simple harmonic motion | `shm` | 2.4 | `a = -\omega^{2}x \;\Rightarrow\; x = A\cos(\omega t) \qquad v_{\text{max}} = A\omega \qquad a_{\text{max}} = A\omega^{2}` |
| Period, frequency and angular frequency | `shm-period` | 2.4 | `T = \dfrac{2\pi}{\omega} \qquad f = \dfrac{1}{T} \qquad \omega = 2\pi f` |
| Mass on a spring | `mass-spring` | 2.4 | `T = 2\pi\sqrt{\dfrac{m}{k}} \qquad m = \dfrac{kT^{2}}{4\pi^{2}}` |
| Pendulum period for wider swings | `pendulum-large-swing` | 2.4 | `T \approx 2\pi\sqrt{\dfrac{L}{g}}\left(1 + \dfrac{\theta_{0}^{2}}{16}\right)` |
| Angular speed, period and rpm | `angular-speed` | 3.1 | `\omega = \dfrac{d\theta}{dt} \qquad \omega = \text{rpm} \times \dfrac{2\pi}{60} \qquad T = \dfrac{2\pi}{\omega} \qquad f = \dfrac{1}{T}` |
| Speed around a circle | `tangential-speed` | 3.1 | `s = r\theta \qquad v = \omega r = \dfrac{2\pi r}{T}` |
| Centripetal acceleration and force | `centripetal` | 3.2 | `a = \dfrac{v^{2}}{r} = \omega^{2}r \qquad \mathbf{a} = -\omega^{2}\mathbf{r} \qquad F = \dfrac{mv^{2}}{r} = m\omega^{2}r` |
| Spin gravity design | `spin-gravity` | 3.3 | `g_{\text{eff}} = \omega^{2}r \qquad r = \dfrac{g}{\omega^{2}} \qquad v = \sqrt{gr} \qquad \dfrac{\Delta g}{g} = \dfrac{\Delta r}{r}` |
| Two masses spinning on a cable | `two-masses-cable` | 3.3 | `m_{1}r_{1} = m_{2}r_{2} \qquad r_{1} = L\,\dfrac{m_{2}}{m_{1} + m_{2}} \qquad T = m_{1}\omega^{2}r_{1}` |
| Coriolis effects in a spinning habitat | `coriolis` | 3.4 | `g_{\text{felt}} = \dfrac{(\omega r \pm u)^{2}}{r} \approx \omega^{2}r \pm 2\omega u \qquad a_{\text{C}} = 2\omega v \qquad x \approx \tfrac{2}{3}\omega h t` |
| Coriolis on Earth and Foucault’s pendulum | `foucault` | 3.4 | `a_{\text{C}} = 2\Omega v\sin\phi \qquad T_{\text{F}} = \dfrac{T_{\text{sidereal}}}{\sin\phi}` |
| Newton’s law of gravitation | `gravitation` | 4.1 | `F = \dfrac{GMm}{r^{2}} \qquad G = 6.674 \times 10^{-11}\ \text{N·m}^{2}/\text{kg}^{2}` |
| Gravitational field strength | `field-strength` | 4.1 | `g = \dfrac{GM}{r^{2}} \qquad M = \dfrac{gR^{2}}{G} \qquad g(r) = g_{\text{surface}}\left(\dfrac{R}{r}\right)^{2} \qquad g = \tfrac{4}{3}\pi G\rho R \qquad \dfrac{\Delta g}{g} \approx -2\,\dfrac{\Delta r}{r}` |
| Circular orbits | `orbital-speed` | 4.2 | `v = \sqrt{\dfrac{GM}{r}} \qquad T = 2\pi\sqrt{\dfrac{r^{3}}{GM}} \qquad \omega = \sqrt{\dfrac{GM}{r^{3}}} \qquad r = \left(\dfrac{GMT^{2}}{4\pi^{2}}\right)^{1/3}` |
| Lowest (skimming) orbit | `low-orbit` | 4.2 | `v_{\text{low}} = \sqrt{gR} \qquad T_{\text{low}} = 2\pi\sqrt{\dfrac{R}{g}}` |
| Shape of an elliptical orbit | `ellipse-orbit` | 4.3 | `r_{\text{p}} = a(1 - e) \qquad r_{\text{a}} = a(1 + e) \qquad a = \dfrac{r_{\text{p}} + r_{\text{a}}}{2} \qquad e = \dfrac{r_{\text{a}} - r_{\text{p}}}{r_{\text{a}} + r_{\text{p}}}` |
| Kepler’s second law at the turning points | `equal-areas` | 4.3 | `r_{\text{p}}v_{\text{p}} = r_{\text{a}}v_{\text{a}} \qquad \dfrac{v_{\text{p}}}{v_{\text{a}}} = \dfrac{1 + e}{1 - e}` |
| Kepler’s third law | `kepler-third` | 4.3 | `T^{2} = \dfrac{4\pi^{2}}{GM}\,a^{3} \qquad T_{\text{years}}^{2} = \dfrac{a_{\text{au}}^{3}}{M/M_{\odot}}` |
| Speed while climbing against gravity | `climbing-speed` | 4.4 | `v^{2} = v_{0}^{2} - 2GM\left(\dfrac{1}{R} - \dfrac{1}{r}\right) \qquad \dfrac{1}{r_{\text{max}}} = \dfrac{1}{R} - \dfrac{v_{0}^{2}}{2GM}` |
| Escape velocity | `escape-velocity` | 4.4 | `v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}} = \sqrt{2gR} = \sqrt{2}\,v_{\text{circ}} \qquad v_{\infty} = \sqrt{v_{0}^{2} - v_{\text{esc}}^{2}}` |
| Mass from an orbit | `mass-from-orbit` | 4.5 | `M = \dfrac{4\pi^{2}a^{3}}{GT^{2}} \qquad M = \dfrac{v^{2}r}{G} \qquad \dfrac{\Delta M}{M} \approx 3\,\dfrac{\Delta r}{r} + 2\,\dfrac{\Delta T}{T}` |
| Radius and density from orbit | `density-clock` | 4.5 | `\sin\dfrac{\theta}{2} = \dfrac{R}{R + h} \qquad T_{\text{low}} = \sqrt{\dfrac{3\pi}{G\rho}}` |
| Vis-viva equation | `vis-viva` | 4.6 | `v^{2} - \dfrac{2GM}{r} = \text{constant} \qquad v^{2} = GM\left(\dfrac{2}{r} - \dfrac{1}{a}\right)` |
| Hohmann transfer | `hohmann` | 4.6 | `\Delta v_{1} = v_{1}\left(\sqrt{\dfrac{2r_{2}}{r_{1} + r_{2}}} - 1\right) \qquad \Delta v_{2} = v_{2}\left(1 - \sqrt{\dfrac{2r_{1}}{r_{1} + r_{2}}}\right) \qquad t = \pi\sqrt{\dfrac{a_{\text{t}}^{3}}{GM}} \qquad \phi = 180° - \omega_{2}t` |
| Work | `work` | 5.1 | `W = Fd\cos\theta \qquad W = \int_{x_{1}}^{x_{2}} F\,dx` |
| Work on a spring and against gravity | `work-spring-lift` | 5.1 | `W = \tfrac{1}{2}k\left(x_{2}^{2} - x_{1}^{2}\right) \qquad W = GMm\left(\dfrac{1}{r_{1}} - \dfrac{1}{r_{2}}\right)` |
| Kinetic energy and the work–energy theorem | `kinetic-energy` | 5.2 | `K = \tfrac{1}{2}mv^{2} \qquad W_{\text{net}} = \tfrac{1}{2}mv^{2} - \tfrac{1}{2}mu^{2}` |
| Potential energies | `potential-energy` | 5.2 | `U = mgh \qquad U = \tfrac{1}{2}kx^{2} \qquad U = -\dfrac{GMm}{r} \qquad F = -\dfrac{dU}{dx}` |
| Power | `power` | 5.3 | `P = \dfrac{dW}{dt} \qquad P = Fv \qquad \eta = \dfrac{P_{\text{useful}}}{P_{\text{in}}}` |
| Mass-to-light drive | `light-drive` | 5.3 | `P = \dot{m}c^{2} \qquad F = \dfrac{P}{c} = \dot{m}c \qquad \dfrac{Fv}{P} = \dfrac{v}{c}` |
| Energy conservation with friction | `energy-conservation` | 5.4 | `K_{1} + U_{1} = K_{2} + U_{2} + fd` |
| Energy of an orbit | `orbit-energy` | 5.4 | `E = -\dfrac{GMm}{2a} \qquad K = -E,\ U = 2E \ (\text{circular})` |
| Momentum and impulse | `momentum` | 5.5 | `\vec{p} = m\vec{v} \qquad \vec{F} = \dfrac{d\vec{p}}{dt} \qquad \vec{J} = \int \vec{F}\,dt = \Delta\vec{p} \qquad p_{\text{light}} = \dfrac{E}{c}` |
| Collisions | `collisions` | 5.5 | `m_{1}u_{1} + m_{2}u_{2} = m_{1}v_{1} + m_{2}v_{2} \qquad v_{1} = \dfrac{m_{1} - m_{2}}{m_{1} + m_{2}}u_{1},\ v_{2} = \dfrac{2m_{1}}{m_{1} + m_{2}}u_{1}` |
| Thrust | `thrust` | 5.6 | `F = \dot{m}v_{\text{e}} \qquad I_{\text{sp}} = \dfrac{v_{\text{e}}}{g_{0}} \qquad P = \tfrac{1}{2}Fv_{\text{e}}` |
| Light drive at constant acceleration | `light-thrust` | 5.6 | `F = \dot{m}c \qquad \dot{m} = \dfrac{ma}{c}` |
| Tsiolkovsky rocket equation | `rocket-equation` | 5.7 | `\Delta v = v_{\text{e}}\ln\dfrac{m_{0}}{m_{\text{f}}} \qquad \dfrac{m_{0}}{m_{\text{f}}} = e^{\Delta v/v_{\text{e}}}` |
| Fuel use at constant acceleration | `constant-acceleration-burn` | 5.7 | `m(t) = m_{0}\,e^{-at/v_{\text{e}}} \qquad t = \dfrac{v_{\text{e}}}{a}\ln\dfrac{m_{0}}{m_{\text{f}}}` |
| Temperature and molecular motion | `kinetic-temperature` | 6.1 | `\overline{KE} = \tfrac{3}{2}kT \qquad v_{\text{rms}} = \sqrt{\dfrac{3kT}{m}}` |
| First law of thermodynamics | `first-law` | 6.1 | `\Delta U = Q - W` |
| Thermal expansion | `thermal-expansion` | 6.1 | `\Delta L = \alpha L\,\Delta T` |
| Heat to warm an object | `specific-heat` | 6.2 | `Q = mc\,\Delta T` |
| Heat for a phase change | `latent-heat` | 6.2 | `Q = mL` |
| Final temperature of a mixture | `mixing-temperature` | 6.2 | `T = \dfrac{m_{1}c_{1}T_{1} + m_{2}c_{2}T_{2}}{m_{1}c_{1} + m_{2}c_{2}}` |
| Conduction through a slab | `conduction` | 6.3 | `P = \dfrac{kA\,\Delta T}{d} \qquad P = \dfrac{A\,\Delta T}{d_{1}/k_{1} + d_{2}/k_{2}}` |
| Newton’s law of cooling | `newton-cooling` | 6.3 | `T = T_{\text{s}} + (T_{0} - T_{\text{s}})\,e^{-t/\tau}` |
| Thermal radiation | `thermal-radiation` | 6.3 | `P = e\sigma AT^{4} \qquad P_{\text{net}} = e\sigma A\left(T^{4} - T_{\text{s}}^{4}\right)` |
| Planet’s equilibrium temperature | `equilibrium-temperature` | 6.4 | `T_{\text{e}} = \left[\dfrac{S(1 - \alpha)}{4\sigma}\right]^{1/4}` |
| Sensitivity to sunlight and albedo | `balance-sensitivity` | 6.4 | `\dfrac{\Delta T}{T} \approx \dfrac{1}{4}\dfrac{\Delta S}{S} \qquad \dfrac{\Delta T}{T} \approx -\dfrac{1}{4}\dfrac{\Delta\alpha}{1 - \alpha}` |
| Climate response time | `climate-response-time` | 6.4 | `\tau = \dfrac{C}{4\sigma T^{3}}` |
| One-layer greenhouse model | `one-layer-greenhouse` | 6.5 | `T_{\text{s}} = T_{\text{e}}\left(\dfrac{2}{2 - \varepsilon}\right)^{1/4} \qquad \sigma T_{\text{s}}^{4} = (n + 1)\,\sigma T_{\text{e}}^{4}` |
| Forcing from carbon dioxide | `co2-forcing` | 6.5 | `\Delta F = 5.35\ \text{W/m}^{2} \times \ln\dfrac{C}{C_{0}}` |
| Feedback gain | `feedback-gain` | 6.6 | `\Delta T = \dfrac{\Delta T_{0}}{1 - f} = \dfrac{\Delta F}{\lambda_{0} - \sum\lambda_{i}} \qquad f = \dfrac{\sum\lambda_{i}}{\lambda_{0}}` |
| Response time with feedbacks | `feedback-response-time` | 6.6 | `\tau = \dfrac{C}{\lambda_{0} - \sum\lambda_{i}}` |
| Wave speed | `wave-speed` | 7.1 | `v = f\lambda = \dfrac{\lambda}{T}` |
| Travelling wave | `travelling-wave` | 7.1 | `y = A\cos(kx - \omega t) \qquad k = \dfrac{2\pi}{\lambda} \qquad \omega = 2\pi f \qquad v = \dfrac{\omega}{k}` |
| Waves on a string, and energy | `string-wave-speed` | 7.1 | `v = \sqrt{\dfrac{F_{\text{T}}}{\mu}} \qquad P \propto A^{2}` |
| Interference and standing waves | `interference` | 7.1 | `\text{constructive: } \Delta = m\lambda \qquad \text{destructive: } \Delta = \left(m + \tfrac{1}{2}\right)\lambda \qquad \text{node spacing} = \dfrac{\lambda}{2}` |
| Electromagnetic waves | `c-f-lambda` | 7.2 | `c = f\lambda \qquad c = 299\,792\,458\ \text{m/s}` |
| Light in a material | `refractive-index` | 7.2 | `n = \dfrac{c}{v} \qquad \lambda_{\text{medium}} = \dfrac{\lambda}{n}` |
| Snell’s law and the critical angle | `snell` | 7.2 | `n_{1}\sin\theta_{1} = n_{2}\sin\theta_{2} \qquad \sin\theta_{\text{c}} = \dfrac{1}{n}` |
| Photon energy | `photon-energy` | 7.3 | `E = hf = \dfrac{hc}{\lambda} \qquad E_{\text{eV}} = \dfrac{1240}{\lambda_{\text{nm}}} \qquad 1\ \text{eV} = 1.602 \times 10^{-19}\ \text{J}` |
| Photoelectric equation | `photoelectric` | 7.3 | `K_{\text{max}} = hf - \varphi \qquad f_{0} = \dfrac{\varphi}{h} \qquad \lambda_{0} = \dfrac{hc}{\varphi}` |
| Photons per second | `photon-rate` | 7.3 | `N = \dfrac{P}{hf} = \dfrac{P\lambda}{hc}` |
| Momentum of light | `photon-momentum` | 7.4 | `p = \dfrac{E}{c} = \dfrac{h}{\lambda} \qquad F = \dfrac{P}{c}` |
| Radiation pressure and the sail number | `radiation-pressure` | 7.4 | `F = \dfrac{kIA}{c} \qquad \beta = \dfrac{kLA}{4\pi cGMm}` |
| Diffraction grating | `grating` | 7.5 | `d\sin\theta = m\lambda` |
| Spectral lines from energy levels | `energy-levels` | 7.5 | `\dfrac{hc}{\lambda} = E_{\text{upper}} - E_{\text{lower}} \qquad E_{n} = -\dfrac{13.6\ \text{eV}}{n^{2}} \qquad \dfrac{1}{\lambda} = R\left(\dfrac{1}{n_{1}^{2}} - \dfrac{1}{n_{2}^{2}}\right)` |
| Doppler shift and a star’s wobble | `doppler` | 7.5 | `\dfrac{\Delta\lambda}{\lambda} = \dfrac{v}{c} \qquad v_{\star} = \dfrac{m_{\text{p}}}{M_{\star}}\,v_{\text{p}}` |
| Planck’s law | `planck-law` | 8.1 | `B_{\lambda}(T) = \dfrac{2hc^{2}}{\lambda^{5}}\,\dfrac{1}{e^{hc/\lambda kT} - 1}` |
| Wien’s displacement law | `wien` | 8.1 | `\lambda_{\text{max}} = \dfrac{b}{T} \qquad b = \dfrac{hc}{4.965\,k} = 2.898 \times 10^{-3}\ \text{m·K} \qquad E_{\text{peak}} = 4.965\,kT` |
| Stefan–Boltzmann law | `stefan-boltzmann` | 8.2 | `\dfrac{P}{A} = \sigma T^{4} \qquad \sigma = \dfrac{2\pi^{5}k^{4}}{15c^{2}h^{3}} = 5.670 \times 10^{-8}\ \text{W/(m}^{2}\text{K}^{4})` |
| Luminosity of a star | `luminosity` | 8.2 | `L = 4\pi R^{2}\sigma T^{4} \qquad \dfrac{L}{L_{\odot}} = \left(\dfrac{R}{R_{\odot}}\right)^{2}\left(\dfrac{T}{T_{\odot}}\right)^{4} \qquad \dfrac{\Delta L}{L} \approx 4\,\dfrac{\Delta T}{T}` |
| Starlight at a distance | `starlight-flux` | 8.3 | `S = \dfrac{L}{4\pi d^{2}} = \sigma T^{4}\left(\dfrac{R}{d}\right)^{2} \qquad L = 4\pi d^{2}S \qquad T = \left(\dfrac{S}{\sigma}\right)^{1/4}\sqrt{\dfrac{d}{R}}` |
| Planet temperature from its star | `planet-temperature-from-star` | 8.3 | `T_{\text{e}} = T_{\star}\,(1 - \alpha)^{1/4}\sqrt{\dfrac{R_{\star}}{2d}}` |
| Comparing stars | `comparing-stars` | 8.4 | `\dfrac{\Delta L}{L} \approx 4\,\dfrac{\Delta T}{T} + 2\,\dfrac{\Delta R}{R} \qquad t_{\text{life}} \approx 10\ \text{Gyr} \times \dfrac{M/M_{\odot}}{L/L_{\odot}}` |
| Cells needed to dim a star | `dimming-shell` | 8.4 | `N = \dfrac{4fr^{2}}{a^{2}}` |
| Mass–energy equivalence | `mass-energy` | 9.1 | `E = mc^{2} \qquad \Delta m = \dfrac{\Delta E}{c^{2}} \qquad c^{2} = 8.988 \times 10^{16}\ \text{J/kg}` |
| Energy from a mass defect | `mass-defect` | 9.1 | `Q = (m_{\text{before}} - m_{\text{after}})\,c^{2} \qquad 1\ \text{u}\times c^{2} = 931.5\ \text{MeV}` |
| Specific energy and the exhaust limit | `exhaust-limit` | 9.2 | `\varepsilon = \dfrac{E}{m} \qquad u = \rho\,\varepsilon \qquad v_{\text{e,max}} = \sqrt{2\varepsilon}` |
| Fuel for a change of speed | `fuel-for-dv` | 9.2 | `m_{\text{fuel}} = m_{\text{f}}\left(e^{\Delta v/v_{\text{e}}} - 1\right)` |
| Galilean transformation | `galilean` | 10.1 | `x' = x - vt \qquad t' = t \qquad u' = u - v` |
| Michelson–Morley expected shift | `michelson-morley` | 10.1 | `\Delta t \approx \dfrac{L}{c}\,\beta^{2} \qquad \text{fringe shift} = \dfrac{2L\beta^{2}}{\lambda}` |
| Time dilation | `time-dilation` | 10.2 | `\Delta t = \gamma\,\Delta\tau \qquad \gamma = \dfrac{1}{\sqrt{1 - v^{2}/c^{2}}} \qquad \Delta t - \Delta\tau \approx \tfrac{1}{2}\beta^{2}t` |
| Decay of fast particles | `dilated-decay` | 10.2 | `\dfrac{N}{N_{0}} = e^{-t/(\gamma\tau_{0})}` |
| Relativistic momentum and energy | `relativistic-momentum-energy` | 10.3 | `p = \gamma mv \qquad E = \gamma mc^{2} \qquad K = (\gamma - 1)mc^{2} \qquad E^{2} = (pc)^{2} + (mc^{2})^{2}` |
| The Lorentz factor at low and high speed | `gamma-approx` | 10.3 | `\gamma \approx 1 + \tfrac{1}{2}\beta^{2}\ (\beta \ll 1) \qquad \beta = \sqrt{1 - 1/\gamma^{2}} \qquad 1 - \beta \approx \dfrac{1}{2\gamma^{2}}\ (\gamma \gg 1)` |
| Length contraction | `length-contraction` | 10.4 | `L = \dfrac{L_{0}}{\gamma} \qquad t_{\text{Earth}} = \dfrac{L_{0}}{v} \qquad \tau_{\text{ship}} = \dfrac{L_{0}}{\gamma v}` |
| Lorentz transformation | `lorentz-transformation` | 10.5 | `x' = \gamma(x - vt) \qquad t' = \gamma\left(t - \dfrac{vx}{c^{2}}\right)` |
| Velocity addition and rapidity | `velocity-addition` | 10.5 | `u = \dfrac{u' + v}{1 + u'v/c^{2}} \qquad \beta = \tanh\varphi \qquad \varphi_{u} = \varphi_{1} + \varphi_{2} \qquad e^{2\varphi} = \dfrac{1 + \beta}{1 - \beta}` |
| Relativistic Doppler shift and photon rocket | `relativistic-doppler-rocket` | 10.5 | `\dfrac{\lambda_{\text{obs}}}{\lambda_{\text{emit}}} = \sqrt{\dfrac{1 + \beta}{1 - \beta}} = e^{\varphi} \qquad \dfrac{m_{0}}{m} = e^{\varphi} = \sqrt{\dfrac{1 + \beta}{1 - \beta}}` |
| Constant proper acceleration | `constant-proper-acceleration` | 10.6 | `\varphi = \dfrac{a\tau}{c} \qquad v = c\tanh\varphi \qquad t = \dfrac{c}{a}\sinh\varphi \qquad x = \dfrac{c^{2}}{a}\left(\cosh\varphi - 1\right)` |
| Relativistic flip-and-burn | `relativistic-flip-and-burn` | 10.6 | `\cosh\varphi_{\text{max}} = 1 + \dfrac{ad}{2c^{2}} \qquad \tau = \dfrac{2c}{a}\varphi_{\text{max}} \qquad t = \dfrac{2c}{a}\sinh\varphi_{\text{max}} \qquad \dfrac{m_{0}}{m} = e^{2\varphi_{\text{max}}}` |
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
- Integral results to reuse: ∫₉²⁰ D dt = 27.34 %·yr (average dimming 2.49%); the ship's first day at 1.5 g gives 1.270 × 10⁶ m/s (0.42% c) and 0.367 au; the probe v = 0.6t² covers 200 m in 10 s. C.5 already derives v = v₀ + at and x = x₀ + v₀t + ½at² (formula `constant-acceleration`), so Part 1.2 should build on it rather than re-derive it from scratch.
- Part 1 book figures (reader summary, trangnkp.substack.com): table drop 0.91 m in 0.348 s → 15.0 m/s²; pendulum 346 swings in 10 min (T = 1.734 s), unchanged on a deck 4.5 m lower. The novel's string length isn't used; 1.12 m is our assumption consistent with 1.5 g. Moon g 1.62, Mars 3.73 (NASA). Reaction times 0.2–0.3 s (two cited studies). Newtonian flip-and-burn to Tau Ceti at 1.5 g: 5.55 yr, peak 4.29c (set up for Part 10).
- Part 2 figures: Dimitri's Astrophage test about 60,000 N for 100 µs from about 20 µg; fuel display 20,862 kg at 6.043 g/s (reader summary). Erid "just over double" Earth's gravity (/Film) → we use 2.0 g. ISS altitude g = 8.67 m/s², 88% (OpenStax §13.2). Shuttle crew up to 3 g (NASA NTRS 19940019731). MICROSCOPE equivalence test ~10⁻¹⁵ (PRL 129, 121102). Our assumptions, stated in the chapters: Grace 80 kg, loaded ship 2.5 × 10⁶ kg, Rocky 100 kg, mass-meter chair 600 N/m and 12.0 kg. No source found that the oscillating mass meter flew on Skylab, so the chapters don't claim it.
- Part 3 figures: Grace's imagined centrifuge 700 m, 88 m/s (reader summary; 88 m/s doesn't match 1.5 g at 700 m, which needs ~101 m/s, and the chapters say so). Our two-deck criterion gives r ≥ 777 m, 1.31 rpm, 107 m/s. Centrifuge structure (two sections on cables, used from ch. 16; runaway spin later) from LitCharts. The cable length "up to 104 m" is fan-wiki only (unconfirmed). **Model centrifuge used throughout Part 3** (`SPIN` in `constants.mjs`): crew section 2.0 × 10⁵ kg and rear 6.0 × 10⁵ kg (assumed) on 104 m → crew floor 78 m, rear 26 m, ω = 0.3546 rad/s (3.39 rpm, T = 17.7 s), crew speed 27.66 m/s, 1 g crew / 0.33 g rear, cable tension 1.96 × 10⁶ N; a 1 m drop lands 10.8 cm antispinward. Comfort: 1970s 1–2 rpm; Globus & Hall (2017) up to 4 rpm (56 m) and 6 rpm (25 m). Gemini 11: 30 m tether (NASA). Earth sidereal day 23.9345 h, Ω = 7.2921 × 10⁻⁵ rad/s. Foucault: 1851, 67 m, 28 kg, Paris 31.8 h (Wikipedia). Runaway spin (10 m, 20 rpm) is our illustration. Physiology g-tolerance numbers were left out because no source could be opened.
- Part 4 figures (`GRAV` and `ADRIAN` in `constants.mjs`): G = 6.674 30 × 10⁻¹¹ (CODATA 2022). NASA fact sheets for GM, masses, radii, escape speeds, orbits and densities of Earth, Moon, Mars, Venus, Jupiter, Sun; Phobos 9378 km / 0.31891 d; Io 421 800 km / 1.769138 d. ISS 370–460 km (we use 400 km); GEO 42 164 km. Tau Ceti 0.800 M☉ (Korolik 2023). **Adrian = Tau Ceti e** (Wikipedia, Feng et al. 2017): ~168 d, 0.552 au, minimum mass 3.93 M⊕; later studies say it may not exist, and the chapters say so. **Our model Adrian:** 3.93 M⊕ (2.347 × 10²⁵ kg), radius 1.5 R⊕ (9557 km, ASSUMED), g = 17.15 m/s² (1.75 g), ρ = 6420 kg/m³, v_esc 18.1 km/s; Hail Mary parked 300 km up (r = 9857 km, v = 12.6 km/s, T = 81.87 min). Escape from Tau Ceti at Adrian's orbit 50.7 km/s (Adrian moves 35.9). Plot facts from Wikipedia's novel page: 10 km xenonite chain, beetles carry results home, probe sent to Venus, Grace rescues Rocky from the stranded Blip-A. No source confirmed a "decaying orbit" at Adrian or any book figure for Adrian's mass/orbit, so the chapters don't claim them; all manoeuvres at Adrian (200 km lowering, 10° phasing in 3 laps) are our illustrations. Kepler's 8′ discrepancy (Astronomia nova), Halley's comet, Venus Express 153-day cruise (ESA), Mars windows every 26 months, Michell's 1783 dark stars all sourced in the chapters.
- Part 5 figures (`ENERGY` in `constants.mjs`). Book (reader summary trangnkp.substack.com, Goodreads highlights, Nick Frass's Substack): display 20,862 kg at 6.043 g/s (Grace: ~40 days); drive power 540 TW (Grace's E = mc²); Dimitri 1.8 × 10⁹ J, ~20 µg, 60,000 N for 100 µs (obeys F = P/c and p = E/c exactly); a manoeuvre "will consume 130 kilograms of fuel"; ~2 × 10⁶ kg of fuel; trip "at least three years" of ship time. Real: RS-25 514.49 kg/s, 4.436 km/s, 2279 kN vac; SRB 2.63 km/s; NSTAR 92 mN / 2.3 kW, ion exhausts 20–50 km/s (we use 30); Deep Space 1 486 kg launch, 73.4 kg Xe, 4.3 km/s; world energy 19.6 TW (2021); human ~100 W; ISS 419,725 kg; TNT 4.184 MJ/kg. **Our inference (5.6):** if 6.043 g/s holds 1.5 g with light exhaust, the ship is 1.23 × 10⁵ kg at the reading and ~1.02 × 10⁵ kg empty; the course uses **1.0 × 10⁵ kg empty** (and ~1.2 × 10⁵ kg in 5.4/5.5 examples). Assumed: Grace 200 kg with suit, Blip-A 5.0 × 10⁵ kg, 3.0 m deck height.
- **Fuel question answered (5.7):** the 6 g/s is a late-trip rate; holding 1.5 g needs ṁ = ma/c (103 g/s at launch), so fuel decays as e^(−at/c) and the 20,862 kg lasts 43.8 days, not 40. On the ship's clock (exact for a photon rocket), R = 21 buys only 1.97 yr at 1.5 g; 3.75 yr needs R = 333 (3.3 × 10⁷ kg fuel), and even 3 yr needs R = 104. The chapters say the novel's budget doesn't quite add up for 1.5 g throughout. Part 10 should revisit this with relativity (a coast phase changes the numbers).
- Part 6 figures (`THERMAL` in `constants.mjs`). Real: k, N_A exact, σ = 5.670 374 419 × 10⁻⁸ (CODATA); OpenStax Vol. 2 tables (specific heats: water 4186, ice 2090, steam 2020, air 1015, Al 900, glass 840, iron 452, Cu 387; latent heats 334 / 2256 kJ/kg, ammonia 332 / 1370 kJ/kg, boils −33.4 °C; conductivities Cu 390 … air 0.023; α steel 12, Al 25 × 10⁻⁶; skin emissivity 0.97 and the 99 W example); ice 917 kg/m³; atmosphere 5.1 × 10¹⁸ kg; NASA Bond albedo / black-body / mean T: Earth 0.294 / 254.0 / 288 K, Venus 0.77 / 226.6 / 737 K (92 bar), Mars 0.250 / 209.8 / 214 K; NASA energy budget 340 W/m², 29% reflected, surface 117% (398), back 100% (340); albedos (Wikipedia): ocean 0.06, sand 0.40, sea ice 0.5–0.7, snow 0.8; ECS 3 °C (2.5–4), 3.7 W/m² per doubling, about 1 °C no-feedback, 0.8 K per W/m²; ΔF = 5.35 ln(C/C₀) (Myhre 1998); CO₂ 280 → 421 ppm (NOAA 2022); methane 1911.8 ppb (2022), 722 (1750), GWP 84/28, lifetime about 12 yr, forcing about 0.5 W/m²; feedbacks (AR6 via Wikipedia) Planck about −3.8, water vapour about +1.8, surface albedo +0.35, clouds +0.42 (−0.10 to +0.94); LGM −6 °C, Tambora 0.4–0.7 °C, faint young Sun 70%, Budyko runaway when ice reaches 30° of the equator; 40 Eridani A 0.78 M☉, 0.40 L☉, 42-day signal (likely stellar activity) → "Erid" orbit 0.218 au, 11 490 W/m², T_e 434 K. Book: Astrophage's 96.415 °C set point (excess energy → mass, deficit → infrared; RI article); Erid 210 °C, 29 atm ammonia, melting tape measure, heat felt through the xenonite wall (/Film); Antarctic operation 241 bombs, 50 m deep, 3 km apart, methane breaks down in about 10 years, nearby ocean cools about 1 degree; Sahara blackpanels about 2 × 10¹² m² (a quarter of the Sahara); Leclerc: 3.5 billion dead within 19 years (readifyai reader guide, flagged as unofficial); ice age within thirty years (Wikipedia); 10% dimming → "terminal ice age" (RI). Our results: Earth T_e 255 K; dimming 1/5/10% → −0.64/−3.3/−6.6 K without feedbacks, −1.9/−9.6/−19 K with 0.8 K per W/m²; response time 3.5 yr (no feedback) and 10.6 yr (with), for 100 m of ocean; one-layer ε = 0.77 for Earth, 0.70 for Erid; Venus needs about 111 opaque layers. **Toy climate model (6.6, figure TwoClimates and sim SnowballLab):** α(T) = 0.4417 − 0.1583 tanh((T − 254.42)/20), emission 240.2 + 1.58(T − 288) W/m², C = 4.19 × 10⁸ J/(m² K); equilibria 226 / 252 / 288 K at today's Sun; tips to snowball at about 6% dimming (labelled as a toy, not a forecast). Our assumptions: xenonite conducting like glass, partition 2.0 m² × 1 cm, panel emissivity 0.9, coffee τ = 20 min, radiator 5 kW, blackpanel albedo 0.05.
- Part 7 figures (`WAVES` in `constants.mjs`). Real: eV exact, R∞ (CODATA); OpenStax speeds of sound (343 m/s air at 20 °C, 1480 water), hearing 20 Hz–20 kHz, visible about 400–750 nm, microwave oven 2.45 GHz, n water 1.33 / diamond 2.419 (glass about 1.5, Wikipedia), work functions (Na 2.46 … Pt 6.35 eV); Balmer lines 656.279/486.135/434.0472/410.1734 nm, limit 364.5 nm; Na D 588.995/589.592, He D3 587.5618 (Fraunhofer lines); He and Hg lines from NIST strong-line tables; CO₂ bands 4.26 and 14.99 µm; IKAROS 196 m², 310 kg, 1.12 mN, about 400 m/s by 2013; Nichols–Hull 1901 within 0.6%; KATRIN 2025 neutrino mass below 0.45 eV; Tau Ceti radial velocity −16.68 km/s, planet signals down to 30 cm/s; Webb CO₂ on WASP-39 b (2022). Book (reader guides, flagged): Petrova wavelength 25.984 µm, Petrovascope sees only that wavelength (metal plate blocks the star), Astrophage up to 0.92 c, Venus's CO₂ "signature" 4.26 and 18.31 µm (the 18.31 doesn't match a strong real band; the chapter says so), a Petrova photon equals one neutrino's mass-energy; Rocky speaks in chords (LitCharts). Our results: Petrova f = 11.54 THz, photon 7.645 × 10⁻²¹ J = 0.0477 eV, **within 0.11% of ³⁄₂kT at 96.415 °C** (our observation, stated as possibly coincidental); drive 7.06 × 10³⁴ photons/s, F = 1.80 MN, ship 1.22 × 10⁵ kg at 1.5 g; sunlight pressure 4.54 µPa; β for a mirror floats below 1.53 g/m²; our model Astrophage cell (water density) β = 0.115; Adrian's tug on Tau Ceti 0.53 m/s. Our assumptions: Rocky's 440 Hz note, centrifuge cable 10 kg/m (kink 443 m/s), IKAROS film density 1400 kg/m³. The rocket equation with vₑ = c gives a mass ratio of 2.51 for 0.92 c; the relativistic value 4.90 is quoted ahead of Part 10.
- Part 8 figures (`STARS` in `constants.mjs`). Real: Wien b = 2.897 771 955 × 10⁻³ m K (CODATA); CMB 2.72548 K; Draper point 798 K (1847); incandescent lamps about 2400 K (Wikipedia "Color temperature"); Stefan 1879 / Boltzmann 1884, Stefan's Sun estimate about 5700 K; Planck 1900. **Tau Ceti (Wikipedia infobox): 5320 ± 40 K, 0.793 ± 0.004 R☉, 0.488 ± 0.010 L☉, 0.800 M☉, 8–10 Gyr, [Fe/H] −0.50, rotation 46 d, debris disc > 10× the Solar System's, HZ 0.55–1.16 au.** R²T⁴ gives only 0.454 ± 0.018 L☉; the course's earlier 0.52 is kept for continuity and 8.4 discusses the 0.45–0.52 spread (Adrian's T_e 282–292 K). Sirius A 9845 K, 1.7144 R☉, 24.74 L☉, 8.61 ly; Proxima 2992 K, 0.1542 R☉, 0.001567 L☉; 40 Eridani A 5126 K, 0.804 R☉, 0.40 L☉. Solar irradiance: about 1361 W/m², 0.1% over a solar cycle, ±3.4% over the orbit, 2011 revision 1365.4 → 1360.9; Sun's HZ 0.99–1.67 au (Kopparapu 2013); Sun 4.6 Gyr old with 4–7 Gyr to go (we use ~10 Gyr total). Our results: Wien iteration x = 4.9651; a 5772 K blackbody is 42% visible, 12% UV, 44% IR; Astrophage's 369.6 K thermal peak 7.84 µm vs the Petrova line's 111.5 K; 1% dimming by cooling = 14.5 K; Astrophage eating 1% of the Sun = 3.83 × 10²⁴ W = 4.26 × 10⁷ kg/s; Sun's T from Earth (S, d/R = 215) = 5772 K; Tau Ceti's light at Earth 1.25 × 10⁻⁹ W/m² (0.52 L☉), about 5 × 10⁴ visible photons/s into a 7 mm pupil; Kepler mass from Adrian 0.795 M☉; cells to dim a star N = 4fr²/a² (our model cell: 4 × 10¹⁴ kg at the Sun's surface, 1.9 × 10¹⁹ kg at 1 au). Assumed: 0.1% of the drive power as waste heat (radiator 9.5 km² at 1000 K).
- Part 9 figures (`MASSENERGY` in `constants.mjs`). NIST atomic masses (¹H, ²H, ³H, ⁴He), CODATA neutron mass, 931.494 MeV/u, electron 0.511 MeV; Wikipedia "Energy density" table (Li-ion 0.36–0.875, TNT 4.184, wood 18, fat 38, gasoline 46.4 MJ/kg and 34.2 MJ/L, hydrogen 141.86 MJ/kg, uranium fission 80.62 TJ/kg, D–T 337.4 TJ/kg, antimatter 90 PJ/kg); kilogram prototype +1.5 pg per °C (Wikipedia "Mass–energy equivalence"). **E = mc² is derived in 9.1 from p = E/c and the centre of mass (Einstein's light-in-a-box), with no relativity.** Results: 4 ¹H → ⁴He loses 0.712% (26.7 MeV), D–T 17.6 MeV (reproduces the table's 337 TJ/kg); Sun loses 4.26 × 10⁹ kg/s and fuses 6.0 × 10¹¹ kg/s of hydrogen; ~6880 kg/yr of matter would power the world; the 2 × 10⁶ kg fuel = 290 years of world energy = 3.9 × 10¹⁵ kg of petrol = a 12.6 m cube at water density (assumed); ideal exhaust √(2ε): H₂/O₂ 5.6 km/s (RS-25 reaches 79%), fission 4.2% c, D–T 8.7% c; at 0.1c a chemical rocket needs a mass ratio of 10²⁹³⁵. Sahara breeder farm at an assumed 250 W/m² with perfect conversion: ~0.5 t/day, 11 years for the fuel (2.1 years even at 1361 W/m² all day).

---

## 9. Session log

- **Session 1 (2026-10-05).** Built the site frame (Astro 7 + Starlight, KaTeX, overrides), the space theme (starfield, glass, hero, animations), all site features (sidebar by Part, progress tracking, glossary with tooltips, formula sheet, physics map, print stylesheet, Ask Claude with selection button, /raw/ markdown export), the verification and check scripts, the GitHub Actions deploy workflow, the README, and all of Part 0 (0.1 to 0.10, 119 practice problems, 10 simulations, 21 diagrams). Part 0 is marked `review`, waiting for the author's feedback on depth, style and difficulty. **Next session:** apply the review feedback, then start Part 0.5 with C.1 Rates of change.
- **Session 1b (2026-10-05).** Redesigned the UI to be more mature and formal: serif display type, one gold accent, hairline panels, numbered sections, a navigation-chart hero and a calmer starfield. Added collapsible sidebars and focus mode. Pushed to GitHub.
- **Session 2 (2026-10-05).** Found a deploy bug: re-running an *old* Actions run redeployed old code over newer code. The workflow now refuses to deploy any commit that isn't the tip of `main`. Wrote the first half of Part 0.5: C.1 Rates of change, C.2 Slopes of curves and limits, C.3 Derivatives and simple rules (33 practice problems, 3 simulations, 6 diagrams). They define velocity and acceleration as derivatives, ready for Part 1. Diagram labels that sit over lines use the `halo` class. Redesigned the UI again at the author's request (more detailed, space-themed and fun; see Style rules). **Next:** C.4 Area under curves, C.5 Integrals, C.6 The fundamental theorem.
- **Session 3 (2026-10-07).** Finished Part 0.5: C.4 Area under curves (Riemann sums, sigma notation, trapezoid rule, signed area, exact parabola area via the sum of squares), C.5 Integrals (notation and properties, antiderivatives and + C, initial conditions, d/dx ln x = 1/x, constant-acceleration equations), C.6 The fundamental theorem (area-so-far function, both parts, net change, average value). 36 practice problems, 3 simulations (RiemannSum, AntiderivativeFamily, AccumulationSim) and 6 diagrams. **Next:** Part 1, starting with 1.1 Position, velocity and acceleration.
- **Session 4 (2026-10-08).** Wrote Part 1: 1.1 Position, velocity and acceleration, 1.2 The equations of motion, 1.3 Free fall, 1.4 Measuring g (48 practice problems, 4 simulations: MotionGraphs, FlipBurnPlanner, DropLab, GLab; 8 diagrams). Made the home-page progress table collapsible and put the hero ship exactly on its route. **Next:** Part 2, starting with 2.1 Newton's laws (equivalence of the 1.5 g ship and gravity is set up in 1.1 Example 5; the pendulum's 2π is promised in 2.4).
- **Session 5 (2026-10-09).** Wrote Part 2: 2.1 Newton's laws (forces, the three laws, free-body diagrams, terminal velocity with drag bv²), 2.2 Mass vs weight (inertial and gravitational mass, scales vs balances, measuring mass in orbit), 2.3 Apparent weight (N = m(g + a), weightlessness as free fall, the equivalence principle, g-forces, g_eff = g − a), 2.4 Pendulums and SHM (Hooke's law, a = −ω²x, derivation of T = 2π√(L/g), mass on a spring, large-swing correction). 48 practice problems, 4 simulations (DragFall, WeighingLab, ApparentWeight, PendulumLab) and 8 diagrams. All of Part 1's promises to Part 2 are kept. Tooling note: the Bash heredocs in this environment halve backslashes, so write files containing LaTeX with the Write/Edit tools. **Next:** Part 3, starting with 3.1 Angular speed (2.3 Problem 12 and 1.4 set up the two-deck spin test).
- **Session 6 (2026-10-09).** Wrote Part 3: 3.1 Angular speed (radians, ω, rpm, period, v = ωr, tangent velocity), 3.2 Centripetal acceleration (a = v²/r = ω²r two ways, the SHM shadow, centripetal force as a role, centrifugal force as fictitious, Newton's Moon test), 3.3 Designing spin gravity (g = ω²r, r = g/ω², gradient h/r, comfort limits, two masses on a cable and the centre of mass, Grace's two-deck test), 3.4 The Coriolis effect (exact drop geometry, running spinward/antispinward, a = 2ωv, drift ⅔ωht by integration, Earth, Foucault, the sink myth). 48 practice problems, 4 simulations (SpinRate, CircularMotion, SpinGravityDesigner, CoriolisLab) and 8 diagrams. Fixed a check-browser hang: an animation that rebuilt SVG elements every frame kept the page from reaching network idle, so animated sims must create elements once and update attributes per frame. If `npm run preview` says a server is already running, use `npx astro preview stop` first. **Next:** Part 4, starting with 4.1 Newton's law of gravitation (3.2 Example 3 sets up the Moon test; 3.2 Problem 11 previews the 84-minute low orbit).
- **Session 7 (2026-10-13).** Wrote Part 4: 4.1 Newton's law of gravitation (F = GMm/r² from the Moon test, G and Cavendish, the shell theorem, g = GM/r², weighing Earth, g with height, g = 4/3 πGρR), 4.2 Orbital speed (Newton's cannon, orbit as free fall, v = √(GM/r) two ways, T = 2π√(r³/GM), skimming and geostationary orbits, tidal pull on a hanging probe), 4.3 Kepler's laws (ellipse anatomy, Newton's geometric proof of equal areas, r_p v_p = r_a v_a, T² = a³ and T² = a³/M for other stars), 4.4 Escape velocity (derived without energy: Δ(v²) = 2aΔr summed as an integral, √2 × circular speed, r_max, v∞, escaping a star from a planet's orbit, Michell's dark stars), 4.5 Finding a planet's mass from an orbit (M = 4π²a³/GT², radius from angular size, the density clock T = √(3π/Gρ), ΔM/M = 3Δr/r + 2ΔT/T), 4.6 Orbital manoeuvring (v² − 2GM/r constant along any path via the along-path component, vis-viva derived, Hohmann transfers, lead angle, phasing orbits, drag speeds satellites up). 72 practice problems, 6 simulations (GravityExplorer, OrbitCannon, KeplerOrbit, EscapeLauncher, WeighPlanet, HohmannPlanner) and 14 diagrams. Tooling note: registering several chapters as `review` before their files exist breaks the build (Starlight sidebar), so mark unwritten ones `planned` until written. **Next:** Part 5, starting with 5.1 Work as an integral (4.4 and 4.6 promise that Part 5 recasts v² − 2GM/r = constant as energy conservation and proves escape speed is direction-independent; 4.6 says Part 5 shows how fuel sets delta-v).
- **Session 8 (2026-10-13).** Wrote Part 5: 5.1 Work as an integral (W = Fd cos θ, zero work at right angles, W = ∫F dx as area, springs ½kx², lifting GMm(1/r₁ − 1/r₂), Dimitri's huge force doing 0.036 J), 5.2 Kinetic and potential energy (work–energy theorem via ∫mv dv, U = mgh, ½kx², −GMm/r, F = −dU/dx, v² − 2GM/r recast as energy, escape speed direction-independent, as promised in 4.4), 5.3 Power (P = dW/dt = Fv, kWh, efficiency, P = ṁc² = 543 TW, F = P/c discovered from Dimitri's figures, only v/c of a light drive's power goes into motion), 5.4 Conservation laws (energy bookkeeping, friction → thermal, E = −GMm/2a, K = −E and U = 2E, the drag paradox explained, angular momentum = Kepler II, Noether), 5.5 Momentum (p = mv, F = dp/dt, impulse, conservation and recoil, elastic/inelastic collisions, p = E/c), 5.6 Thrust (F = ṁv_e, I_sp, P/F = v_e/2 vs c, F = ṁc, ṁ = ma/c, the ship's mass inferred from the fuel display), 5.7 The Tsiolkovsky rocket equation (derivation, tyranny of the exponential, staging, m = m₀e^(−at/v_e), 43.8 not 40 days, the trip's fuel budget checked). 70 practice problems, 7 simulations (WorkArea, EnergyLaunch, DrivePower, EnergyTrack, CollisionLab, ThrustLab, RocketEquation) and 14 diagrams. All of Part 4's promises to Part 5 are kept. Tooling note: Python heredocs in Bash also mangle backslashes (\t, \D), so edit LaTeX with the Edit tool or a Python file written with Write. **Next:** Part 6, starting with 6.1 Temperature and heat (5.4 promises Part 6 measures the warming that friction causes).
- **Session 9 (2026-10-13).** Wrote Part 6: 6.1 Temperature and heat (temperature as jiggling, thermal equilibrium and the zeroth law, pressure from molecular collisions, ⟨KE⟩ = 3/2 kT and v_rms, why absolute zero exists (promised in 0.3 and the glossary), heat vs internal energy, Joule and the calorie, the first law, thermal expansion), 6.2 Specific and latent heat (Q = mcΔT, mixing, Q = mL, heating curves, the friction warming promised in 5.4, melting Antarctic ice, the ocean's heat capacity), 6.3 Heat transfer (conduction and layered walls, convection, Newton's law of cooling, P = eσAT⁴ and net radiation, heat in space, Rocky's hot xenonite wall), 6.4 Planetary energy balance and albedo (S/4, T_e = 255 K, sensitivity ΔT/T = ¼ ΔS/S, the forecast dimming as promised in 0.5, the Sahara blackpanels, response time, Venus, Adrian, Erid), 6.5 The greenhouse effect (short waves in and long waves out, why N₂ and O₂ don't absorb, one-layer and many-layer models, forcing 5.35 ln(C/C₀), cancelling the dimming, why methane, Venus and Erid), 6.6 Feedback loops (Planck response, feedback factor and gain 1/(1 − f), water vapour, ice–albedo and clouds, sensitivity 3 °C, the dimming with feedbacks, tipping points, snowball Earth, hysteresis, faint young Sun). 72 practice problems, 6 simulations (GasBox, HeatingLab, WallHeatFlow, PlanetThermostat, GreenhouseSim, SnowballLab) and 12 diagrams. The Stefan–Boltzmann law is introduced in 6.3 as a measured law; Part 8 (8.1–8.2) should derive its context (blackbody, Wien) and use it for stars rather than introduce it from scratch. **Next:** Part 7, starting with 7.1 Wave properties (6.5 says Part 8 explains why hotter objects glow at shorter wavelengths; 6.2 says Part 9 covers c² as energy per kilogram).
- **Session 10 (2026-10-14).** Wrote Part 7: 7.1 Wave properties (transverse and longitudinal, λ, A, T, f, v = fλ, y = A cos(kx − ωt), v = √(F_T/μ) derived from circular motion in the pulse's frame, P ∝ A², superposition, interference, standing waves; tension written F_T to avoid clashing with the period), 7.2 c = fλ and the EM spectrum (Young, fields as the medium, Maxwell, Rømer/Fizeau/1983 metre, the spectrum, Petrova line and Petrovascope, n = c/v, Snell's law derived from crests, total internal reflection), 7.3 Photons (photoelectric facts, E = hf, eV and 1240 eV·nm, K = hf − φ as Millikan's line, photons per second, what one photon can do, duality, h defines the kilogram (promised in 0.2), the Petrova photon ≈ ³⁄₂kT coincidence and the KATRIN check), 7.4 Momentum of light and photon propulsion (Feynman's qvB argument for F = P/c, as promised in 5.3 and 5.5; p = h/λ and Compton; absorb vs reflect; radiation pressure; IKAROS; β independent of distance; sunlight can't blow Astrophage away; photon vs chemical rockets), 7.5 Spectroscopy (dispersion, gratings d sin θ = mλ, Kirchhoff's three spectra, Fraunhofer and helium, energy levels and hydrogen's Balmer lines, molecular IR fingerprints and Webb, Doppler Δλ/λ = v/c, radial-velocity wobble of Tau Ceti from Adrian). 61 practice problems, 5 simulations (WaveMachine, SpectrumExplorer, PhotoelectricLab, SolarSailLab, SpectrumLab) and 17 diagrams. Electric charge and electric field are now glossary terms (7.2); magnetic forces (qvB) are stated, not derived, and point to Part 14. Tooling note: a range slider with `step="any"` is fine for the browser check (it falls back to step 1). One run of `check:browser` crashed with a timeout while screenshots ran at the same time; it passed when run alone. **Next:** Part 8, starting with 8.1 Blackbody radiation and Wien's law (6.5 and 7.2 promise that Part 8 explains why hotter objects glow at shorter wavelengths; 7.3 says thermal glow is broad, unlike Astrophage's single line). Part 10 should revisit 7.4 Problem 11 (Astrophage's relativistic mass ratio 4.90) and the relativistic Doppler shift promised in 7.5.
- **Session 11 (2026-10-14).** Wrote Part 8: 8.1 Blackbody radiation and Wien's law (glowing colours and the Draper point, the cavity blackbody, the ultraviolet catastrophe, Planck's law with the photon-cost argument, Wien's law derived by setting the derivative to zero and iterating x = 5(1 − e⁻ˣ), star colours, why Astrophage's single line is not thermal; promised in 6.5 and 7.2), 8.2 The Stefan–Boltzmann law and luminosity (T⁴ from the squeeze-and-stretch of Planck's curve, σ = 2π⁵k⁴/15c²h³ via a change of variable with the pure-number integral π⁴/15 quoted, L = 4πR²σT⁴, star radii, ΔL/L ≈ 4ΔT/T, the power Astrophage eats, the drive's waste heat; promised in 6.3), 8.3 The inverse-square law and the solar constant (cavity radiometers, solar cycle and orbital swing, S = σT⁴(R/d)², the Sun's temperature from Earth, T_e = T★(1 − α)^¼√(R★/2d), L = 4πd²S, the habitable zone, how faint Tau Ceti is), 8.4 The Sun vs Tau Ceti (comparison table, colours, the 0.454 vs 0.488 vs 0.52 luminosity spread and its uncertainty, Kepler mass from Adrian, M/L lifetimes, metallicity and the debris disc, habitable zones, Adrian's sky, cells needed to dim a star, why Taumoeba matters). 48 practice problems, 4 simulations (BlackbodyLab, StarBuilder, StarlightLab, StarCompare) and 12 diagrams. Fixed a Part 7 bug found on the way: SpectrumExplorer's colour swatch was invisible because scoped Astro styles don't reach elements created with `innerHTML`; such styles must be `<style is:global>` (BlackbodyLab too). **Next:** Part 9, starting with 9.1 E = mc² (5.3 and 7.3 have used E = mc² and promised Part 9 explains it; 8.2 has Astrophage turning 3.8 × 10²⁴ W into 4.3 × 10⁷ kg/s).
- **Session 12 (2026-10-14).** Wrote Part 9: 9.1 E = mc² (Einstein's light-in-a-box derivation from p = E/c and the fixed centre of mass, mass as a form of energy, rest energy, why c² hides everyday mass changes, mass defects in fusion, antimatter and PET, the Sun's mass loss, the novel's Dimitri test and drive checked; promised in 5.3, 5.4 and 6.2), 9.2 Energy density: chemical to Astrophage (specific energy vs energy density, the three-step ladder chemical/nuclear/mass–energy, the exhaust limit √(2ε), the rocket equation at 0.1c for each drive, Astrophage as a battery, the fuel in petrol, breeding the fuel on the Sahara). 24 practice problems, 2 simulations (LightBox, FuelCalculator) and 5 diagrams. Fixed a number-format bug in several Part 8/9 sims: `x.toPrecision(3)` prints values of 1000 and up as "1.00e+3", so the shared `sci` helpers now use `toPrecision(Math.max(3, e + 1))`. **Next:** Part 10, starting with 10.1 The postulates of relativity (9.2 and the fuel calculator quote the relativistic photon-rocket mass ratio √((1 + β)/(1 − β)) and say Part 10 derives it; 7.4 Problem 11 and 7.5 also point ahead; 5.7 says Part 10 should revisit the fuel budget with a coast phase).
- **Session 13 (2026-10-14).** Wrote Part 10 (special relativity): 10.1 Postulates (Galileo's ship, Michelson–Morley expected 0.4 fringe derived, simultaneity), 10.2 Time dilation (light clock, muons, GPS 7.2 µs/day, Hafele–Keating), 10.3 Lorentz factor (γ ≈ 1 + β²/2, p = γmv, E = γmc², E² = (pc)² + (mc²)²), 10.4 Length contraction, 10.5 Velocity addition (Lorentz transformation derived, rapidity and hyperbolic functions, relativistic Doppler, photon-rocket ratio √((1+β)/(1−β)) as promised in 7.4/9.2), 10.6 Ship time vs Earth time (φ = aτ/c; 1.5 g flip-and-burn to Tau Ceti: 3.89 yr aboard, 13.14 yr on Earth, 0.995c, mass ratio 416 vs the novel's ~21; novel's fuel with a coast: 0.909c, 6.6 yr aboard; Grace's 17 missing years reproduced; Eridians' Newtonian over-fuelling ×9). 72 problems, 6 sims (SimultaneityLab, LightClockSim, GammaExplorer, ContractionLab, VelocityAdder, TripPlanner), 12 diagrams. `REL` constants added. **Not yet done:** `check:browser` timed out once on navigation (not investigated; rerun it, and if it repeats suspect one of the animated Part 10 sims blocking network idle), and the Part 10 diagrams/sims have not been screenshotted. **Next:** finish those checks, then Part 11 (sound).
