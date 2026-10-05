// Single place for site-wide settings. Imported by astro.config.mjs and by client scripts.

/** Course name, used in the site title, page titles and "Ask Claude" prompts. */
export const COURSE_NAME = 'The Physics of Project Hail Mary';

/**
 * Where the "Ask Claude about this" button sends you after copying the prompt.
 * Replace with your Claude Project's URL (e.g. https://claude.ai/project/xxxxxxxx)
 * if you want every question to land inside that Project.
 */
export const CLAUDE_LINK = 'https://claude.ai/new';

/** GitHub Pages location. SITE is the origin, BASE is the repository name. */
export const GITHUB_USER = 'ImZack12751';
export const REPO_NAME = 'phm-physics';
export const SITE = `https://${GITHUB_USER.toLowerCase()}.github.io`;
export const BASE = `/${REPO_NAME}`;
