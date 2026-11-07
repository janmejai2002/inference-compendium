import fs from 'node:fs';

const f2 = fs.readFileSync('dist/ch/finance-casebook.html', 'utf8');
const idx = f2.indexOf('fig-finance-casebook-taxonomy');
console.log('Index of fig-finance-casebook-taxonomy:', idx);
if (idx !== -1) {
  console.log(f2.substring(idx - 50, idx + 400));
  const endIdx = f2.indexOf('</figure>', idx);
  console.log('Figure end slice:', f2.substring(endIdx - 200, endIdx + 9));
}
