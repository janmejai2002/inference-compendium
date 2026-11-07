import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Auditing block math delimiter linebreaks and inline text collisions...');

const inlineDisplayMath = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('$$')) {
      // Check if there is non-whitespace text before the opening $$ or after closing $$
      // Match pattern where $$ is preceded by non-whitespace (not $) or followed by non-whitespace
      const beforeMatch = line.match(/^([^\$]*)\$\$/);
      if (beforeMatch && beforeMatch[1].trim().length > 0 && !beforeMatch[1].trim().startsWith('-') && !beforeMatch[1].trim().match(/^\d+\./)) {
        inlineDisplayMath.push({
          file,
          line: i + 1,
          issue: 'Text before display math $$ on same line',
          content: line.trim()
        });
      }

      // Check text after closing $$
      const afterMatch = line.match(/\$\$([^\$]+)$/);
      if (afterMatch && afterMatch[1].trim().length > 0) {
        inlineDisplayMath.push({
          file,
          line: i + 1,
          issue: 'Text after display math $$ on same line',
          content: line.trim()
        });
      }
    }
  }
}

console.log(`Found ${inlineDisplayMath.length} display math linebreak issues:`);
console.log(JSON.stringify(inlineDisplayMath, null, 2));
