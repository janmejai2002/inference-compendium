import fs from 'node:fs';

const pdfPath = 'C:\\Users\\Janmejai\\compendium\\editions\\INFERENCE-v4-finance-draft.pdf';
const buf = fs.readFileSync(pdfPath);
const text = buf.toString('latin1');

// Match /Type /Pages ... /Count N
const pagesRegex = /\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/g;
let m;
const counts = [];
while ((m = pagesRegex.exec(text)) !== null) {
  counts.push(parseInt(m[1], 10));
}

console.log('Pages counts found in document structure:', counts);
const rootCount = Math.max(...counts);
console.log(`Maximum /Count (Total PDF Pages): ${rootCount}`);
