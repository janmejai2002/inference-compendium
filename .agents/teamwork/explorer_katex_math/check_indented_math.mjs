import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Checking all display math blocks for indentation or list nesting...');

const listMath = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('$$')) {
      const leadingSpaces = line.match(/^(\s*)/)[1].length;
      if (leadingSpaces > 0) {
        listMath.push({
          file,
          line: i + 1,
          leadingSpaces,
          text: line.trim()
        });
      }
    }
  }
}

console.log(`Found ${listMath.length} indented display math lines:`);
console.log(JSON.stringify(listMath.slice(0, 20), null, 2));
