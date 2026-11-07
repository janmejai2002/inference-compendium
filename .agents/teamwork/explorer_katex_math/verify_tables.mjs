import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Verifying table formats across all chapters...');

let totalGfmTables = 0;
const tableSummary = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');
  let gfmCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for GFM table separator row: |---|---| or |:---|---:| etc.
    if (/^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/.test(line)) {
      gfmCount++;
      totalGfmTables++;
    }
  }
  tableSummary[file] = gfmCount;
}

console.log(`Total GFM tables found: ${totalGfmTables}`);
console.log(JSON.stringify(tableSummary, null, 2));
