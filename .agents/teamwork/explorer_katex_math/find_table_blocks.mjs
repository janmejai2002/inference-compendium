import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Searching for ASCII tables across all chapters...');

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');
  let inCode = false;
  let codeStart = 0;
  let codeLines = [];
  let lang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^```(\w*)/);
    if (m) {
      if (!inCode) {
        inCode = true;
        codeStart = i + 1;
        codeLines = [];
        lang = m[1];
      } else {
        inCode = false;
        // Check codeLines for tables
        // An ASCII table typically has header row, separator row (+---+ or |---|), data rows
        const hasTableBorder = codeLines.some(l => /^\s*\+[-+]+\+\s*$/.test(l));
        const hasPipeRows = codeLines.filter(l => /^\s*\|.*\|\s*$/.test(l)).length >= 3;
        if (hasTableBorder || (hasPipeRows && !lang.includes('mermaid'))) {
          console.log(`Found table-like block in ${file}:${codeStart}-${i+1} (lang: ${lang})`);
          console.log(codeLines.slice(0, 6).join('\n'));
          console.log('---');
        }
      }
    } else if (inCode) {
      codeLines.push(line);
    }
  }
}
