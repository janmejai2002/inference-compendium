// One-screen project status: cheaper for an agent than opening files.
import { loadBook, readingTimes, words } from './lib/render.mjs';

const ctx = await loadBook();
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`${ctx.book.title} · ${ctx.book.edition}`);
console.log(pad('#', 4) + pad('id', 28) + pad('status', 12) + pad('track', 13) + pad('words', 7) + pad('min', 5) + 'media');
for (const c of ctx.chapters) {
  const media = c.file ? (c.body.match(/\{\{\s*(watch|read|paper|listen|media)\s/g) || []).length : 0;
  console.log(pad(c.n, 4) + pad(c.id, 28) + pad(c.status || 'planned', 12) + pad(c.track, 13)
    + pad(c.file ? words(c.body) : '-', 7) + pad(c.file ? readingTimes(c).full : '-', 5) + (c.file ? media : '-'));
}
const src = Object.values(ctx.sources);
console.log(`sources: ${src.length} (${src.filter((s) => s.verified).length} verified) · glossary: ${Object.keys(ctx.glossary).length} terms`);
