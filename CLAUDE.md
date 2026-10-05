# Project notes for Claude

This repository is the course website "The Physics of Project Hail Mary".

- **Start every session by reading `COURSE_SPEC.md`.** It holds the style rules, the chapter template, the curriculum status, and the glossary and formula lists. Don't reread old chapters to rediscover conventions.
- Write one chapter per session. Edit finished chapters surgically, never rewrite them.
- Before marking a chapter done: `npm run verify`, `npm run build`, `npm run check`, then `npm run preview` (in the background) plus `npm run check:browser`, and look at each diagram/simulation with `node scripts/shot-elements.mjs <path>/ <outdir>`.
- At the end of a session: `npm run spec`, update the session log in COURSE_SPEC.md, commit and push to `main` (GitHub Actions deploys).
- Never create accounts or handle credentials on the user's behalf. If git or gh needs authentication, tell the user what to run.

## Dev server

Prefer `npm run build && npm run preview` for checks (the dev server doesn't generate `/raw/*.md`). Run long-lived servers in the background.
