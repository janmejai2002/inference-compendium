import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== ALGORITHMIC UNDERWRITING ===');
for (const item of math['algorithmic-underwriting-and-credit-risk.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}

console.log('=== FINANCIAL COPILOTS ===');
for (const item of math['financial-copilots-and-deal-diligence.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
