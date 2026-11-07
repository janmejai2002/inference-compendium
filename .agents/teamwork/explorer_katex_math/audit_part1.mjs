import fs from 'node:fs';

const math = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_katex_math/math_audit.json', 'utf8'));

console.log('=== AI IN ONE SITTING ===');
console.log(JSON.stringify(math['ai-in-one-sitting.md'], null, 2));

console.log('=== JUDGING OUTPUT ===');
console.log(JSON.stringify(math['judging-output.md'], null, 2));
