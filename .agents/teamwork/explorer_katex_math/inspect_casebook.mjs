import fs from 'node:fs';

const content = fs.readFileSync('content/chapters/product-casebook.md', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('\\mathbf{$') || line.includes('\\frac{$3.75') || line.includes('1.28\\text{ queries}')) {
    console.log(`Line ${i + 1}: ${line}`);
  }
}
