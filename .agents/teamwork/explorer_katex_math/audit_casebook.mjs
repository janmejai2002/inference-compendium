import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== AI CASEBOOK ===');
for (const item of math['ai-casebook.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
