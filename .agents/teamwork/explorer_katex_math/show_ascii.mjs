import fs from 'node:fs';

const r = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/deep_audit_results.json', 'utf8'));

for (let i = 0; i < r.asciiTables.length; i++) {
  const t = r.asciiTables[i];
  console.log(`=== ITEM ${i + 1}: ${t.chapter} (${t.file}:${t.startLine}-${t.endLine}) ===`);
  const lines = fs.readFileSync(t.file, 'utf8').split('\n').slice(t.startLine - 1, t.endLine);
  console.log(lines.join('\n'));
  console.log('\n----------------------------------------\n');
}
