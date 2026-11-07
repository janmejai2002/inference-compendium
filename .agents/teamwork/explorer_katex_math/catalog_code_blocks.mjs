import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

console.log('Cataloging all fenced code blocks across all 28 chapters...');

const catalog = [];

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
        const text = codeLines.join('\n');
        
        // Determine type of code block
        let type = 'unknown';
        if (['python', 'bash', 'sh', 'sql', 'json', 'yaml', 'javascript'].includes(lang)) {
          type = `code-${lang}`;
        } else if (text.includes('System Prompt') || text.includes('User:') || text.includes('Prompt:') || text.includes('Role:')) {
          type = 'prompt';
        } else if (text.includes('──►') || text.includes('───') || text.includes('┌─') || text.includes('│') || text.includes('▼') || text.includes('▲')) {
          // Check if diagram or table
          if (/^\s*(\+[-=+]+\+|\+[–—+]+\+)/m.test(text) || (text.includes('┌') && text.includes('┼'))) {
            type = 'ascii-table-candidate';
          } else {
            type = 'ascii-diagram-or-flowchart';
          }
        } else if (text.includes('├──') || text.includes('└──')) {
          type = 'ascii-tree-or-hierarchy';
        } else {
          type = 'other-text';
        }

        catalog.push({
          chapter: file.replace('.md', ''),
          startLine: codeStart,
          endLine: i + 1,
          lang: lang || '(none)',
          type,
          lineCount: codeLines.length,
          preview: codeLines.slice(0, 3).join(' \\ ')
        });
      }
    } else if (inCode) {
      codeLines.push(line);
    }
  }
}

console.log(`Total fenced code blocks across all chapters: ${catalog.length}`);
fs.writeFileSync(
  path.join(ROOT, '.agents/teamwork/explorer_katex_math/all_code_blocks.json'),
  JSON.stringify(catalog, null, 2)
);

const typeCounts = {};
for (const item of catalog) {
  typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
}
console.log('Breakdown by type:');
console.log(JSON.stringify(typeCounts, null, 2));
