import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { serve } from '../scripts/lib/serve.mjs';

const DIST = path.join(process.cwd(), 'dist');

async function launch() {
  const tries = [{}, { channel: 'chrome' }, { channel: 'msedge' }];
  for (const opt of tries) {
    try { return await chromium.launch(opt); } catch (e) {}
  }
  throw new Error('No Chromium found.');
}

const server = await serve(DIST);
const browser = await launch();

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.emulateMedia({ media: 'print' });
  await page.goto(`${server.url}/print.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__pagedDone === true, null, { timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);

  const figuresInfo = await page.evaluate(() => {
    const pages = document.querySelectorAll('.pagedjs_page');
    const res = [];
    pages.forEach((p, idx) => {
      const pNum = idx + 1;
      const figures = p.querySelectorAll('.fig');
      figures.forEach(fig => {
        const figId = fig.id;
        const svg = fig.querySelector('svg');
        if (!svg) return;
        const svgRect = svg.getBoundingClientRect();
        const viewBox = svg.getAttribute('viewBox');
        
        // Find texts overflowing
        const texts = svg.querySelectorAll('text');
        const overflowingTexts = [];
        texts.forEach(t => {
          const tRect = t.getBoundingClientRect();
          if (tRect.right > svgRect.right + 1) {
            overflowingTexts.push({
              text: t.textContent.trim(),
              overflowPx: Math.round(tRect.right - svgRect.right),
              x: t.getAttribute('x'),
              y: t.getAttribute('y'),
              fontSize: t.getAttribute('font-size')
            });
          }
        });

        res.push({
          page: pNum,
          figId,
          viewBox,
          isWide: fig.classList.contains('wide'),
          overflowCount: overflowingTexts.length,
          overflowingTexts
        });
      });
    });
    return res;
  });

  console.log(`Audited ${figuresInfo.length} figures across all pages.`);
  const withOverflow = figuresInfo.filter(f => f.overflowCount > 0);
  console.log(`Figures with text overflowing SVG boundary: ${withOverflow.length}\n`);

  for (const f of withOverflow) {
    console.log(`\n======================================================`);
    console.log(`Page ${f.page} | Figure ID: ${f.figId} (wide: ${f.isWide}, viewBox: ${f.viewBox})`);
    console.log(`Overflowing text count: ${f.overflowCount}`);
    f.overflowingTexts.forEach((ot, i) => {
      console.log(`  [${i+1}] (+${ot.overflowPx}px) x=${ot.x} y=${ot.y} font-size=${ot.fontSize}`);
      console.log(`      "${ot.text}"`);
    });
  }
} finally {
  await browser.close();
  await server.close();
}
