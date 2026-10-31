// Content linter. Offline by default.
//   npm run check          structure, sources, glossary, pedagogy completeness
//   npm run check:links    also fetches every source URL
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { loadBook, renderChapter, ROOT } from './lib/render.mjs';

const ctx = await loadBook();
const policy = yaml.load(fs.readFileSync(path.join(ROOT, 'content', 'source-policy.yml'), 'utf8'));
const errors = [], warns = [];
const RANK = { A: 1, B: 2, C: 3 };

// TOC
const ids = new Set();
for (const c of ctx.chapters) {
  if (ids.has(c.id)) errors.push(`toc: duplicate chapter id "${c.id}"`);
  ids.add(c.id);
  if (!ctx.trackById[c.track]) errors.push(`toc: chapter "${c.id}" has unknown track "${c.track}"`);
}
for (const f of fs.readdirSync(path.join(ROOT, 'content', 'chapters'))) {
  if (f.endsWith('.md') && !ids.has(f.slice(0, -3))) warns.push(`chapters/${f} is not in toc.yml, so it is not built`);
}

// Sources
const hostOf = (url) => url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
const domainTier = (url) => {
  const host = hostOf(url);
  for (const t of ['A', 'B', 'C']) if ((policy[t] || []).some((d) => host === d || host.endsWith(`.${d}`))) return t;
  return null;
};
for (const [id, s] of Object.entries(ctx.sources)) {
  for (const k of ['type', 'title', 'creator', 'publisher', 'year', 'url', 'tier', 'why']) if (!s[k]) errors.push(`source ${id}: missing "${k}"`);
  if (!RANK[s.tier]) errors.push(`source ${id}: tier must be A, B or C`);
  const dt = domainTier(s.url || '');
  if (!dt) warns.push(`source ${id}: ${hostOf(s.url || '')} is not in source-policy.yml, needs review`);
  else if (dt === 'C' && RANK[s.tier] < 3) warns.push(`source ${id}: platform domain, tier ${s.tier} rests on the creator (${s.creator}). Confirm they are an originator.`);
  else if (RANK[s.tier] < RANK[dt]) errors.push(`source ${id}: declared tier ${s.tier}, but ${hostOf(s.url)} is tier ${dt}`);
  if (!s.verified) warns.push(`source ${id}: not verified yet (open it, confirm title/author/date/timestamps, set verified: true)`);
}

// Chapters
const cited = new Set();
for (const c of ctx.chapters.filter((x) => x.file)) {
  const r = renderChapter(c, ctx, 'print');
  r.problems.forEach((p) => errors.push(`${c.id}: ${p}`));
  r.cited.forEach((x) => cited.add(x));
  for (const k of ['title', 'deck', 'hook', 'objectives']) if (!c[k]) warns.push(`${c.id}: front matter missing "${k}"`);
  if (!/::: recap/.test(c.body)) warns.push(`${c.id}: no night-before recap`);
  if (!/::: check/.test(c.body)) warns.push(`${c.id}: no Check yourself block`);
  if (/::: check/.test(c.body) && !/::: answers/.test(c.body)) warns.push(`${c.id}: Check yourself has no answers block`);
  if (!/==[^=]+==/.test(c.body)) warns.push(`${c.id}: no highlighted skim lines`);
  if (c.sample) warns.push(`${c.id}: marked sample: true (design sample, replace before release)`);
}
for (const id of Object.keys(ctx.sources)) if (!cited.has(id)) warns.push(`source ${id}: in the registry but cited nowhere`);

if (process.argv.includes('--links')) {
  await Promise.all(Object.entries(ctx.sources).map(async ([id, s]) => {
    try {
      const r = await fetch(s.url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compendium link check)' }, signal: AbortSignal.timeout(15000) });
      if (r.status >= 400) errors.push(`link ${id}: HTTP ${r.status} ${s.url}`);
    } catch (e) { warns.push(`link ${id}: ${e.name} ${s.url}`); }
  }));
}

errors.forEach((e) => console.log(`  x ${e}`));
warns.forEach((w) => console.log(`  ! ${w}`));
console.log(`check: ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
