// npm run new -- <chapter-id>
// Scaffolds content/chapters/<id>.md from content/templates/chapter.md for a chapter already in toc.yml.
import fs from 'node:fs';
import path from 'node:path';
import { loadBook, ROOT } from './lib/render.mjs';

const id = process.argv[2];
if (!id) { console.error('usage: npm run new -- <chapter-id>   (the id must already be in content/toc.yml)'); process.exit(1); }
const ctx = await loadBook();
const c = ctx.chapters.find((x) => x.id === id);
if (!c) { console.error(`"${id}" is not in content/toc.yml. Add it there first.`); process.exit(1); }
const file = path.join(ROOT, 'content', 'chapters', `${id}.md`);
if (fs.existsSync(file)) { console.error(`${path.relative(ROOT, file)} already exists.`); process.exit(1); }
const tpl = fs.readFileSync(path.join(ROOT, 'content', 'templates', 'chapter.md'), 'utf8')
  .replaceAll('{{ID}}', id).replaceAll('{{TITLE}}', c.title).replaceAll('{{TRACK}}', c.track);
fs.writeFileSync(file, tpl);
console.log(`created ${path.relative(ROOT, file)} (chapter ${c.n}, track ${c.track})`);
