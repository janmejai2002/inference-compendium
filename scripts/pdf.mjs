// dist/print.html → Paged.js → Chromium → dist/<TITLE>.pdf
// Also screenshots every page to dist/pages/ and writes dist/pages/pages.json
// (what each page contains), which the design book uses to show real spreads.
//   node scripts/pdf.mjs            PDF + page images
//   node scripts/pdf.mjs --no-shots PDF only (faster)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import * as yaml from 'js-yaml';
import { ROOT } from './lib/render.mjs';
import { build } from './build.mjs';
import { serve } from './lib/serve.mjs';

const DIST = path.join(ROOT, 'dist');
const shots = !process.argv.includes('--no-shots');

async function launch() {
  const tries = [{}, { channel: 'chrome' }, { channel: 'msedge' }];
  for (const opt of tries) {
    try { return await chromium.launch(opt); } catch (e) { /* try the next browser */ }
  }
  throw new Error('No Chromium found. Run `npx playwright install chromium` or install Chrome.');
}

const book = yaml.load(fs.readFileSync(path.join(ROOT, 'book.yml'), 'utf8'));
const t0 = Date.now();
const server = await serve(DIST);
const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 1.6, viewport: { width: 1000, height: 1300 } });
page.on('console', (m) => { if (m.type() === 'error') console.warn('  console:', m.text()); });
await page.emulateMedia({ media: 'print' });
await page.goto(`${server.url}/print.html`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__pagedDone === true, null, { timeout: 120000 });
await page.evaluate(() => document.fonts.ready);

const out = path.join(DIST, `${book.title}.pdf`);
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });

const info = await page.evaluate(() => [...document.querySelectorAll('.pagedjs_page')].map((p, i) => {
  const has = (s) => !!p.querySelector(s);
  const role = has('.cover') ? 'cover' : has('.backcover') ? 'backcover' : has('#how-to-read') ? 'how-to-read'
    : has('#paths') ? 'contents' : has('.part-opener') ? 'part' : has('.opener') ? 'opener' : has('#glossary') ? 'glossary'
    : has('#sources') ? 'sources' : has('.blk-recap') ? 'recap' : p.classList.contains('pagedjs_blank_page') || !p.querySelector('.pagedjs_page_content *') ? 'blank' : 'body';
  const blocks = ['principle', 'concept', 'case', 'lens', 'interview', 'myth', 'try', 'check', 'pull', 'stat'].filter((b) => has(`.blk-${b}`));
  if (has('.media')) blocks.push('media'); if (has('.fig')) blocks.push('figure'); if (has('.answers')) blocks.push('answers');
  return { n: i + 1, side: p.classList.contains('pagedjs_left_page') ? 'left' : 'right', role, blocks };
}));

if (shots) {
  const dir = path.join(DIST, 'pages');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const els = await page.$$('.pagedjs_page');
  for (let i = 0; i < els.length; i++) {
    const bb = await els[i].boundingBox();
    await page.screenshot({ fullPage: true, clip: { x: bb.x, y: bb.y, width: bb.width, height: bb.width * 297 / 210 }, path: path.join(dir, `p-${String(i + 1).padStart(3, '0')}.jpg`), type: 'jpeg', quality: 84 });
  }
  fs.writeFileSync(path.join(dir, 'pages.json'), JSON.stringify(info, null, 1));
}
await browser.close();
await server.close();
const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`pdf: ${info.length} pages, ${kb} KB → dist/${path.basename(out)} in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
console.log('pages: ' + info.map((p) => `${p.n}:${p.role}`).join('  '));
if (shots) { await build(); }   // rebuild so the design book picks up the new page images
