import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== FINANCIAL CRIME & RBI FREE-AI ===');
for (const item of math['financial-crime-fraud-and-rbi-free-ai.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}

console.log('=== FINANCE CASEBOOK (SAMPLE) ===');
const items = math['finance-casebook.md'];
for (let i = 0; i < items.length; i += 3) {
  const item = items[i];
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
