// npm run dev: build, serve dist/ at http://127.0.0.1:4321, rebuild and live-reload on every save.
import fs from 'node:fs';
import path from 'node:path';

process.env.COMPENDIUM_DEV = '1';
const { build } = await import('./build.mjs');
const { serve } = await import('./lib/serve.mjs');
const { ROOT } = await import('./lib/render.mjs');

await build();
const s = await serve(path.join(ROOT, 'dist'), 4321);
console.log(`dev: ${s.url}   design book: ${s.url}/design.html   print preview: ${s.url}/print.html`);

let t;
const rebuild = () => {
  clearTimeout(t);
  t = setTimeout(async () => { try { await build(); s.reload(); } catch (e) { console.error(e.message); } }, 150);
};
for (const dir of ['content', 'design']) fs.watch(path.join(ROOT, dir), { recursive: true }, rebuild);
fs.watch(path.join(ROOT, 'book.yml'), rebuild);
