import fs from 'node:fs';
import path from 'node:path';

const file = 'content/chapters/synthetic-audiences-and-attribution.md';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('\\beta_m') || line.includes('\\alpha_m') || line.includes('\\frac')) {
    console.log(`Line ${i + 1}: ${line}`);
  }
}
