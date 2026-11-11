import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { serve } from '../scripts/lib/serve.mjs';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

console.log('=== STEP 1: SVG Coordinate Check ===');
const svgFiles = fs.readdirSync(path.join(ROOT, 'content', 'figures')).filter(f => f.endsWith('.svg'));
let svgCoordIssues = 0;
for (const f of svgFiles) {
  const content = fs.readFileSync(path.join(ROOT, 'content', 'figures', f), 'utf8');
  const vbMatch = content.match(/viewBox=["']\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*["']/);
  if (!vbMatch) {
    console.log(`[${f}] Warning: No viewBox found!`);
    continue;
  }
  const [, minX, minY, vbWidth, vbHeight] = vbMatch.map(Number);
  const textMatches = [...content.matchAll(/<text[^>]*\sx=["']([\d.]+)["'][^>]*\sy=["']([\d.]+)["'][^>]*>([\s\S]*?)<\/text>/g)];
  for (const m of textMatches) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    const txt = m[3].replace(/<[^>]+>/g, '').trim();
    if (x > vbWidth || y > vbHeight || x < minX || y < minY) {
      console.log(`[${f}] Text coordinate out of bounds: "${txt.slice(0, 30)}" at (${x}, ${y}) vs viewBox ${minX} ${minY} ${vbWidth} ${vbHeight}`);
      svgCoordIssues++;
    }
  }
}
console.log(`SVG coordinate check completed. Issues found: ${svgCoordIssues}\n`);

console.log('=== STEP 2: Playwright Render Audit (print.html & Web chapters) ===');
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
  // Audit print.html (Paged.js book layout)
  console.log('Loading print.html in Chromium...');
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.emulateMedia({ media: 'print' });
  await page.goto(`${server.url}/print.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__pagedDone === true, null, { timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);

  console.log('Checking pages for diagram and text overflow...');
  const pageAudit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.pagedjs_page');
    const results = [];

    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const pageBox = p.querySelector('.pagedjs_pagebox');
      const pageArea = p.querySelector('.pagedjs_area');
      const pageContent = p.querySelector('.pagedjs_page_content');
      const figures = p.querySelectorAll('.fig');
      const svgs = p.querySelectorAll('.fig svg');
      const tables = p.querySelectorAll('table');
      const blocks = p.querySelectorAll('.blk');

      if (!pageContent) return;

      const contentRect = pageContent.getBoundingClientRect();
      const areaRect = pageArea ? pageArea.getBoundingClientRect() : contentRect;

      // Check all elements on this page to see if any child overflows the pageContent or pageArea vertically
      const allChildren = pageContent.querySelectorAll('*');
      const overflows = [];

      allChildren.forEach(child => {
        // Skip tags that don't render layout directly
        if (['style', 'script', 'g', 'path', 'rect', 'line', 'text', 'tspan', 'circle', 'defs', 'clipPath'].includes(child.tagName.toLowerCase())) return;
        const rect = child.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Vertical overflow: element extends below the page content boundary by more than 2px
        const bottomDelta = rect.bottom - contentRect.bottom;
        if (bottomDelta > 3) {
          overflows.push({
            tag: child.tagName,
            className: child.className,
            textSample: (child.innerText || child.textContent || '').trim().slice(0, 40),
            bottomDelta: Math.round(bottomDelta)
          });
        }
      });

      // Also check SVG rendered dimensions vs container
      const svgIssues = [];
      svgs.forEach(svg => {
        const svgRect = svg.getBoundingClientRect();
        const parentRect = svg.parentElement.getBoundingClientRect();
        if (svgRect.width > parentRect.width + 2) {
          svgIssues.push({
            type: 'svg-width-overflow',
            svgWidth: Math.round(svgRect.width),
            parentWidth: Math.round(parentRect.width)
          });
        }
        // Check if SVG text elements are visually overflowing SVG
        const texts = svg.querySelectorAll('text');
        texts.forEach(t => {
          const tRect = t.getBoundingClientRect();
          if (tRect.right > svgRect.right + 2 || tRect.left < svgRect.left - 2) {
            svgIssues.push({
              type: 'text-outside-svg',
              text: t.textContent.trim().slice(0, 30),
              tRight: Math.round(tRect.right),
              svgRight: Math.round(svgRect.right)
            });
          }
        });
      });

      if (figures.length > 0 || overflows.length > 0 || svgIssues.length > 0) {
        results.push({
          page: pageNum,
          hasFigure: figures.length > 0,
          figCount: figures.length,
          overflowCount: overflows.length,
          overflows: overflows.slice(0, 5), // top 5
          svgIssues: svgIssues
        });
      }
    });

    return results;
  });

  console.log(`\n=== AUDIT RESULTS FOR PRINT PAGES (${pageAudit.length} candidate pages inspected) ===`);
  const problemPages = pageAudit.filter(p => p.overflowCount > 0 || p.svgIssues.length > 0);
  console.log(`Total pages with vertical overflow or SVG issues: ${problemPages.length}`);
  for (const p of problemPages) {
    console.log(`\nPage ${p.page} (Figures: ${p.figCount}):`);
    if (p.overflows.length > 0) {
      console.log(`  Vertical overflows (${p.overflowCount} elements):`);
      p.overflows.forEach(o => {
        console.log(`    - <${o.tag} class="${o.className}"> delta=${o.bottomDelta}px: "${o.textSample}"`);
      });
    }
    if (p.svgIssues.length > 0) {
      console.log(`  SVG issues:`, p.svgIssues);
    }
  }

} finally {
  await browser.close();
  await server.close();
}
