// Runs every chapter's verification script:  npm run verify
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
let failed = 0;
for (const f of readdirSync(dir).filter((f) => /^(\d|c\.)/i.test(f) && f.endsWith('.mjs')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
	const mod = await import(pathToFileURL(path.join(dir, f)).href);
	failed += mod.default();
}
if (failed) {
	console.log(`\n${failed} value(s) disagree.`);
	process.exit(1);
}
console.log('\nAll chapter numbers verified.');
