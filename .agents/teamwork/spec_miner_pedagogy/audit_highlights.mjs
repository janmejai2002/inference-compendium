import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

console.log("=== HIGHLIGHTS (SKIM LAYER) AUDIT ===");
for (const c of ctx.chapters) {
  if (!c.file || !fs.existsSync(c.file)) continue;
  const raw = fs.readFileSync(c.file, 'utf8');
  const { content: body } = matter(raw);

  const highlights = [...body.matchAll(/==([^=]+)==/g)].map(m => m[1].trim());

  // Find line number of first highlight
  let firstLine = -1;
  const firstMatch = body.match(/==([^=]+)==/);
  if (firstMatch) {
    firstLine = body.slice(0, firstMatch.index).split('\n').length;
  }

  // Check if first highlight is in lede (before second H2)
  const h2Matches = [...body.matchAll(/^##\s+/gm)];
  const secondH2Index = h2Matches.length > 1 ? h2Matches[1].index : (h2Matches.length === 1 ? h2Matches[0].index : body.length);
  const firstHighlightInLede = firstMatch && firstMatch.index < secondH2Index;

  console.log(`[Ch ${c.n}] ${c.id.padEnd(38)}: ${highlights.length} highlights (line ${firstLine}, in lede: ${firstHighlightInLede})`);
  if (highlights.length < 4 || highlights.length > 12) {
    console.log(`   * NOTE: highlight count is ${highlights.length} (target 4-8)`);
  }
}
