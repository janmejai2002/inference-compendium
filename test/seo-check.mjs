// E1 discoverability check over dist/ (run after `npm run build`):  node test/seo-check.mjs
// Files exist · every sitemap URL maps to a built file · each page has canonical + og:image · every JSON-LD block parses and
// carries the properties Google's Book / FAQPage rich results need · og image is a 1200×630 PNG. Exit 1 on any failure.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));
const base = book.online_url.replace(/\/?$/, '/');
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (f) => fs.readFileSync(path.join(DIST, f), 'utf8');

for (const f of ['sitemap.xml', 'robots.txt', 'rss.xml']) ok(fs.existsSync(path.join(DIST, f)), `missing dist/${f}`);

// sitemap ↔ dist
const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
ok(locs.length > 1, 'sitemap has no chapter URLs');
for (const u of locs) {
  ok(u.startsWith(base), `sitemap URL outside online_url: ${u}`);
  const rel = decodeURIComponent(u.slice(base.length)) || 'index.html';
  ok(fs.existsSync(path.join(DIST, rel)), `sitemap URL has no built file: ${u}`);
}
ok(/Sitemap: \S+sitemap\.xml/.test(read('robots.txt')), 'robots.txt lacks a Sitemap line');
const items = (read('rss.xml').match(/<item>/g) || []).length;
ok(items === locs.filter((u) => /\/ch\//.test(u)).length, `rss items (${items}) ≠ chapter URLs in the sitemap`);

// pages + JSON-LD
// Pages = what the sitemap lists (the build writes into an uncleaned dist/, so old files can linger locally; CI starts clean).
const pages = locs.filter((u) => u.endsWith('.html') || u === base).map((u) => u.slice(base.length) || 'index.html');
const orphans = fs.readdirSync(path.join(DIST, 'ch')).filter((f) => f.endsWith('.html') && !pages.includes(`ch/${f}`));
if (orphans.length) console.log(`note: not in the sitemap (stale local build output?): ${orphans.join(', ')}`);
const types = {}; let faqQs = 0;
const need = {
  Book: ['name', 'author', 'url', 'hasPart'],
  Chapter: ['name', 'url', 'isPartOf'],
  FAQPage: ['mainEntity'],
};
for (const p of pages) {
  const html = read(p);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  ok(canon === base + (p === 'index.html' ? '' : p), `${p}: canonical ${canon}`);
  ok(/<meta property="og:image" content="https:[^"]+\.png"/.test(html), `${p}: no og:image`);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  ok(blocks.length === 1, `${p}: ${blocks.length} JSON-LD blocks`);
  for (const [, raw] of blocks) {
    let doc; try { doc = JSON.parse(raw); } catch (e) { fails.push(`${p}: JSON-LD does not parse: ${e.message}`); continue; }
    ok(doc['@context'] === 'https://schema.org', `${p}: @context`);
    for (const node of doc['@graph'] || [doc]) {
      const t = node['@type']; types[t] = (types[t] || 0) + 1;
      for (const k of need[t] || []) ok(node[k] !== undefined && node[k] !== '' && !(Array.isArray(node[k]) && !node[k].length), `${p}: ${t}.${k} missing`);
      for (const [k, v] of Object.entries(node)) ok(v !== '' && v !== null, `${p}: ${t}.${k} is empty`);
      if (t === 'FAQPage') for (const q of node.mainEntity) {
        faqQs++;
        ok(q['@type'] === 'Question' && q.name?.length > 10 && q.acceptedAnswer?.['@type'] === 'Answer' && q.acceptedAnswer.text?.length > 20, `${p}: weak FAQ entry "${q.name}"`);
      }
    }
  }
}

// og image: PNG signature + IHDR size
const og = path.join(DIST, 'og', 'inference-og.png');
if (!fs.existsSync(og)) fails.push('missing dist/og/inference-og.png');
else {
  const b = fs.readFileSync(og);
  ok(b.subarray(1, 4).toString() === 'PNG' && b.readUInt32BE(16) === 1200 && b.readUInt32BE(20) === 630, 'og image is not a 1200×630 PNG');
}

console.log(`pages ${pages.length} · sitemap URLs ${locs.length} · rss items ${items} · JSON-LD types ${JSON.stringify(types)} · FAQ questions ${faqQs}`);
if (fails.length) { console.log(`FAIL (${fails.length})\n- ` + fails.slice(0, 40).join('\n- ')); process.exit(1); }
console.log('PASS');
