import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== MARKETING CASEBOOK (SAMPLE OF KEY EQUATIONS) ===');
const items = math['marketing-casebook.md'];
for (let i = 0; i < items.length; i += 3) {
  const item = items[i];
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
