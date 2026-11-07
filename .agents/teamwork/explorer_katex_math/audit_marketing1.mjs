import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== CREATIVE AT SCALE ===');
for (const item of math['creative-at-scale.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}

console.log('=== SYNTHETIC AUDIENCES & ATTRIBUTION ===');
for (const item of math['synthetic-audiences-and-attribution.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
