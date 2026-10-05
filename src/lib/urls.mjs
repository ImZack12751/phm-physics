// URL helpers that respect the site's base path (e.g. /phm-physics/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** url('glossary/') -> '/phm-physics/glossary/' */
export const url = (p = '') => `${base}/${String(p).replace(/^\//, '')}`;

/** URL path of a curriculum chapter object. */
export const chapterUrl = (ch) => url(`${ch.id}/`);
