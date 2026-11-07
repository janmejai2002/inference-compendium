import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== AI PRODUCT LIFECYCLE ===');
for (const item of math['ai-product-lifecycle.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}

console.log('=== PRODUCT ARCHITECTURE & ECONOMICS ===');
for (const item of math['product-architecture-economics.md']) {
  console.log(`[Line ${item.line}] (${item.type}): ${item.content}`);
}
