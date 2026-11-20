// design/og/inference-og.png: the 1200×630 social card (og:image / twitter:image), rendered from book.yml + design/tokens.css.
// Committed, not built on every run (needs a browser + Google Fonts). Re-run after a title/edition/track change:
//   npm run og
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import * as yaml from 'js-yaml';
import { ROOT, esc } from './lib/render.mjs';
import { OG_IMAGE } from './lib/seo.mjs';

const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));
const tokens = fs.readFileSync(path.join(ROOT, 'design', 'tokens.css'), 'utf8');
const tracks = [['Foundations', 'foundations'], ['Consulting', 'consulting'], ['Marketing', 'marketing'], ['Product', 'product'],
  ['Operations', 'operations'], ['Finance', 'finance']];
const host = book.online_url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Literata:opsz,wght@7..72,400..700&family=IBM+Plex+Mono:wght@500&display=block">
<style>${tokens}
html,body{margin:0;width:1200px;height:630px;background:var(--paper);color:var(--ink);overflow:hidden}
.card{box-sizing:border-box;width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;
  border-left:28px solid var(--accent)}
.kicker{font:500 22px var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.word{font-family:var(--f-display);font-weight:850;font-stretch:75%;font-size:176px;line-height:.86;letter-spacing:-.01em;margin:0}
.word span{color:var(--accent)}
.sub{font:500 40px/1.2 var(--f-text);color:var(--ink-2);margin-top:22px}
.sub mark{background:linear-gradient(transparent 55%,var(--marker) 55%);color:inherit;padding:0 .1em}
.chips{display:flex;gap:10px;flex-wrap:nowrap}
.chip{font:650 17px var(--f-display);font-stretch:100%;text-transform:uppercase;letter-spacing:.05em;padding:7px 12px;border:2px solid currentColor}
.foot{display:flex;justify-content:space-between;align-items:baseline;font:500 20px var(--f-mono);color:var(--ink-3);white-space:nowrap}
</style></head><body><div class="card">
<div class="kicker">${esc(book.edition)}</div>
<div><h1 class="word">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
<div class="sub">${esc(book.subtitle).replace(/AI/, '<mark>AI</mark>')}</div></div>
<div class="chips">${tracks.map(([n, k]) => `<span class="chip" style="color:var(--t-${k})">${n}</span>`).join('')}</div>
<div class="foot"><span>Free · source-traced · interview-ready</span><span>${esc(host)}</span></div>
</div></body></html>`;

const browser = await (async () => {
  for (const opt of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) { try { return await chromium.launch(opt); } catch {} }
  throw new Error('No Chromium found. Run `npx playwright install chromium` or install Chrome.');
})();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const out = path.join(ROOT, 'design', OG_IMAGE);
fs.mkdirSync(path.dirname(out), { recursive: true });
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(`wrote ${path.relative(ROOT, out)} (${fs.statSync(out).size} bytes)`);
