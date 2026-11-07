import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Finding all occurrences of ₹ inside math delimiters across all chapters...');

let count = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line contains $...$ or $$...$$ with ₹
    if (line.includes('₹') && line.includes('$')) {
      // Check if ₹ is inside $
      const mathMatches = [...line.matchAll(/\$([^\$\n]+)\$/g)];
      for (const m of mathMatches) {
        if (m[1].includes('₹')) {
          count++;
          console.log(`[${file}:${i + 1}] ${m[0]}`);
        }
      }
    }
  }
}
console.log(`Total inline math instances with ₹: ${count}`);
