import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Searching for \\$ across all chapters...');

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('\\$')) {
      console.log(`${file}:${i + 1}: ${line}`);
    }
  }
}
