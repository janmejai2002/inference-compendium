import fs from 'node:fs';

const catalog = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/all_code_blocks.json', 'utf8'));

console.log('Inspecting other-text code blocks:');
const other = catalog.filter(c => c.type === 'other-text');
console.log(`Count: ${other.length}`);
for (const item of other) {
  console.log(`[${item.chapter}:${item.startLine}] ${item.preview}`);
}
