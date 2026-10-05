// Regenerates the AUTO sections of COURSE_SPEC.md from the data files, so the spec's
// curriculum status, glossary list and formula list can never drift from the site.
//   npm run spec
import { readFileSync, writeFileSync } from 'node:fs';
import { parts, chapters, chapterBySlug } from '../src/data/curriculum.mjs';
import { glossary } from '../src/data/glossary.mjs';
import { formulas } from '../src/data/formulas.mjs';

const FILE = 'COURSE_SPEC.md';
let spec = readFileSync(FILE, 'utf8');

const statusLabel = { planned: 'planned', review: 'written, awaiting review', done: 'done' };
const curriculum = parts
	.map((p) => {
		const rows = p.chapters.map((c, i) => {
			const ch = chapterBySlug[c.slug];
			const pre = c.prereqs.map((s) => chapterBySlug[s].number).join(', ') || '–';
			return `| ${ch.number} | ${c.title} | \`${p.dir}/${c.slug}\` | ${pre} | ${statusLabel[c.status]} |`;
		});
		return [`**${p.label}**`, '', '| # | Chapter | Path | Prerequisites | Status |', '|---|---|---|---|---|', ...rows].join('\n');
	})
	.join('\n\n');

const gl = Object.entries(glossary)
	.map(([id, g]) => ({ id, ...g }))
	.sort((a, b) => chapters.findIndex((c) => c.slug === a.chapter) - chapters.findIndex((c) => c.slug === b.chapter));
const glossaryTable = ['| Term | id | First chapter |', '|---|---|---|', ...gl.map((g) => `| ${g.term} | \`${g.id}\` | ${chapterBySlug[g.chapter]?.number ?? '–'} |`)].join('\n');

const formulaTable = [
	'| Formula | id | First chapter | LaTeX |',
	'|---|---|---|---|',
	...formulas.map((f) => `| ${f.name} | \`${f.id}\` | ${chapterBySlug[f.chapter].number} | \`${f.tex.replace(/\|/g, '\\|')}\` |`),
].join('\n');

function replace(name, body) {
	const re = new RegExp(`(<!-- AUTO:${name} -->)[\\s\\S]*?(<!-- /AUTO:${name} -->)`);
	if (!re.test(spec)) throw new Error(`COURSE_SPEC.md is missing the AUTO:${name} markers`);
	spec = spec.replace(re, `$1\n${body}\n$2`);
}
replace('curriculum', curriculum);
replace('glossary', `${gl.length} terms.\n\n${glossaryTable}`);
replace('formulas', `${formulas.length} formulas.\n\n${formulaTable}`);
writeFileSync(FILE, spec);
console.log(`✓ COURSE_SPEC.md updated: ${chapters.length} chapters, ${gl.length} glossary terms, ${formulas.length} formulas.`);
