import fs from 'node:fs';
import path from 'node:path';

const chaptersWithHeavyMath = [
  'ai-in-one-sitting.md',
  'judging-output.md',
  'who-pays.md',
  'ai-casebook.md',
  'creative-at-scale.md',
  'synthetic-audiences-and-attribution.md',
  'marketing-casebook.md',
  'ai-product-lifecycle.md',
  'product-architecture-economics.md',
  'product-casebook.md',
  'algorithmic-underwriting-and-credit-risk.md',
  'financial-copilots-and-deal-diligence.md',
  'financial-crime-fraud-and-rbi-free-ai.md',
  'finance-casebook.md'
];

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');

console.log('Extracting all formulas and numerical calculations...');

const mathAudit = {};

for (const file of chaptersWithHeavyMath) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');
  const items = [];

  let inDisplay = false;
  let displayBuffer = [];
  let displayStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (line.includes('$$')) {
      const parts = line.split('$$');
      if (parts.length === 3) {
        // Single line display math
        items.push({
          line: lineNum,
          type: 'display-single',
          content: parts[1].trim()
        });
      } else if (!inDisplay) {
        inDisplay = true;
        displayStart = lineNum;
        displayBuffer = [parts[1] || ''];
      } else {
        inDisplay = false;
        displayBuffer.push(parts[0] || '');
        items.push({
          line: displayStart,
          type: 'display-multi',
          content: displayBuffer.join('\n').trim()
        });
        displayBuffer = [];
      }
      continue;
    }

    if (inDisplay) {
      displayBuffer.push(line);
      continue;
    }

    // Inline math with arithmetic or equations
    const inlineMath = [...line.matchAll(/\$([^\$\n]+)\$/g)];
    for (const m of inlineMath) {
      const inner = m[1].trim();
      if (inner.includes('=') || inner.includes('\\approx') || inner.includes('\\times') || inner.includes('\\to') || inner.includes('\\le') || inner.includes('\\ge')) {
        items.push({
          line: lineNum,
          type: 'inline-equation',
          content: inner
        });
      }
    }
  }

  mathAudit[file] = items;
}

fs.writeFileSync(
  path.join(ROOT, '.agents/teamwork/explorer_katex_math/math_audit.json'),
  JSON.stringify(mathAudit, null, 2)
);

console.log('Math audit saved. Counts per chapter:');
for (const [f, items] of Object.entries(mathAudit)) {
  console.log(`- ${f}: ${items.length} equations/calculations`);
}
