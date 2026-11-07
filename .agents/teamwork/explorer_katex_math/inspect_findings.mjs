import fs from 'node:fs';

const r = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/deep_audit_results.json', 'utf8'));

console.log('=== UNRENDERED LATEX IN HTML ===');
console.log(JSON.stringify(r.unrenderedLatexInHtml, null, 2));

console.log('=== ASCII TABLES IN FENCED CODE BLOCKS ===');
console.log(JSON.stringify(r.asciiTables, null, 2));
