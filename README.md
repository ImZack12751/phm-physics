# The Physics of Project Hail Mary

A free course that teaches physics from absolute zero, using the physics in Andy Weir's novel *Project Hail Mary* as motivation and as the source of worked problems. It is a fully static site (Astro + Starlight), hosted free on GitHub Pages.

**Live site:** https://imzack12751.github.io/phm-physics/

- Every chapter follows the same ten-part template: scene, prerequisites, concept, derived formulas, worked examples, real physics vs. book physics, interactive simulation, practice set with hidden solutions, summary and sources.
- Site features: a sidebar grouped by Part, progress tracking (localStorage only), a glossary with hover/tap tooltips, a cumulative formula sheet, a dependency "Physics map", a print stylesheet, and an animated dark space theme.
- **Ask Claude** buttons on every section, worked example and practice problem, and on selected text. They copy a self-contained prompt and open Claude. The site never calls an AI API.
- A plain-markdown copy of every chapter is published at `/raw/<chapter-slug>.md`.

The full style guide, chapter template, curriculum status and lists of glossary terms and formulas are in **[COURSE_SPEC.md](COURSE_SPEC.md)**.

---

## Running it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev        # live-reloading dev server at http://localhost:4321/phm-physics/
```

`npm run dev` doesn't generate the `/raw/*.md` files, because they are made after a full build. To see the finished site exactly as it will be published:

```bash
npm run build      # builds into dist/ and writes dist/raw/*.md
npm run preview    # serves dist/ at http://localhost:4321/phm-physics/
```

## Checks

| Command | What it does |
|---|---|
| `npm run verify` | Recomputes every number printed in every chapter (`scripts/verify/`) |
| `npm run check` | After a build: KaTeX errors, broken internal links and anchors, caret notation, missing raw markdown |
| `npm run check:browser` | With `npm run preview` running: console errors, every simulation responds, Ask Claude prompts, selection button, tooltips, no sideways scrolling on phones (uses your installed Chrome or Edge through puppeteer-core; set `CHROME_PATH` if it isn't found) |
| `npm run spec` | Regenerates the curriculum, glossary and formula tables in COURSE_SPEC.md |
| `npm run build:ci` | verify, then build, then check. This is what the deploy workflow runs |

## Project layout

```
course.config.mjs              course name, CLAUDE_LINK, GitHub user/repo (site URL and base path)
astro.config.mjs               Starlight setup, KaTeX, sidebar built from the curriculum
COURSE_SPEC.md                 style rules, template, curriculum status, glossary and formula lists
src/
  content/docs/                pages; chapters live in part-0/, calculus/, part-1/ …
  data/curriculum.mjs          chapter order, numbering, prerequisites, status (single source of truth)
  data/glossary.mjs            every glossary term
  data/formulas.mjs            every formula on the formula sheet
  components/course/           Term, Figure, Example, Problem, Solution, RealVsBook, Prereqs, map, dashboard…
  components/diagrams/<part>/  hand-written SVG diagrams
  components/sims/             interactive simulations
  components/overrides/        Starlight component overrides (theme, sidebar, hero, page title…)
  integrations/raw-markdown.mjs  writes dist/raw/*.md after each build
  scripts/                     client scripts: Ask Claude, progress, tooltips, print, reveal
  styles/                      theme, components, space theme, print
scripts/                       verify/, check-site, check-browser, update-spec, screenshot helpers
.github/workflows/deploy.yml   GitHub Pages deployment
```

## Adding a chapter

1. **Register it.** In `src/data/curriculum.mjs`, find the chapter's entry, fill in its `prereqs` (slugs of earlier chapters) and change `status: 'planned'` to `'review'` (or `'done'`). The sidebar, physics map, prerequisites box, progress tracker, Ask Claude prompts and `/raw/` export all pick it up automatically.
2. **Write it** at `src/content/docs/<part dir>/<slug>.mdx`. For example, `calculus/rates-of-change.mdx` for C.1. Copy the structure of any Part 0 chapter. It must follow the ten-section template in COURSE_SPEC.md. Start with:

   ```mdx
   ---
   title: Rates of change
   description: One sentence for search engines and link previews.
   ---

   import { Term, Prereqs, Figure, Example, Problem, Solution, RealVsBook } from '../../../components/course';
   ```

   - Glossary words: `<Term id="gradient">gradient</Term>` (the id must exist in `src/data/glossary.mjs`, or the build fails).
   - Diagrams: put the SVG in `src/components/diagrams/<part>/Name.astro`, then `<Figure caption="…" alt="full description"><Name /></Figure>`.
   - Worked examples: `<Example n={1} title="…" book>…</Example>`.
   - Problems: `<Problem n={1} level="easy" book>statement <Solution>full worked answer</Solution></Problem>`.
   - Links to other pages: write site-absolute paths such as `[Vectors](/part-0/vectors/)`. The base path is added automatically.
   - Maths: `$…$` inline, `$$…$$` display. Units go in `\text{…}` with a `\ ` space, as in `$9.81\ \text{m/s}^{2}$`.
3. **Glossary and formulas.** Add new terms to `src/data/glossary.mjs` and new formulas to `src/data/formulas.mjs`, both tagged with the chapter's slug.
4. **Verify the numbers.** Add `scripts/verify/<number>-<slug>.mjs` (copy an existing one). It must recompute every number the chapter prints.
5. **Check:** `npm run verify && npm run build && npm run check`, then `npm run preview` and, in a second terminal, `npm run check:browser`.
6. **Update the spec:** `npm run spec`, and add a line to the session log in COURSE_SPEC.md.
7. **Commit and push to `main`.** The site redeploys by itself.

## How deployment works

`.github/workflows/deploy.yml` runs on every push to `main` (or manually from the Actions tab):

1. **build:** checks out the repository, then the official `withastro/action` installs dependencies and runs `npm run build:ci`, which verifies all numbers, builds the site and checks it. If any check fails, the build stops and the live site is left unchanged. Otherwise it uploads `dist/` as a Pages artifact.
2. **deploy:** `actions/deploy-pages` publishes the artifact to GitHub Pages.

The site's URL and base path come from `course.config.mjs` (`GITHUB_USER`, `REPO_NAME`). If you rename the repository, change `REPO_NAME` there; nothing else is hard-coded.

### First-time setup

1. Create an empty **public** repository on GitHub called `phm-physics` (no README, licence or .gitignore).
2. From this folder:

   ```bash
   git remote add origin https://github.com/ImZack12751/phm-physics.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to go green (about two minutes). If the first run started before step 3, re-run it.

GitHub Pages is free for public repositories, so the site stays online at no cost.

## Ask Claude: using your own Claude Project

The Ask Claude buttons open whatever `CLAUDE_LINK` is set to in `course.config.mjs`. It defaults to `https://claude.ai/new`. To send every question into a Claude Project (for example, one whose instructions say "you are tutoring me through this course"), paste the Project's URL there and push. Nothing else needs changing.

The prompt contains the course name, the chapter and section, the passage or problem (with maths as readable LaTeX), the URL of the chapter's `/raw/` markdown copy, the list of earlier chapters, and an instruction to explain from the ground up using only ideas from this chapter and earlier ones.

## Credits

A non-commercial teaching project, not affiliated with Andy Weir or his publishers. Book scenes are described in our own words. Physical constants and data come from NIST, the IAU, NASA, BIPM and the other sources cited in each chapter.
