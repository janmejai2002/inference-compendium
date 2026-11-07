import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

console.log('Checking for unpaired single $ delimiters...');

const unpaired = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    // Remove display math $$...$$
    const withoutDisplay = line.replace(/\$\$[\s\S]*?\$\$/g, '');
    // Count remaining single dollars that are not escaped
    // In our regex: (?<![\\])\$
    const singleDollars = [...withoutDisplay.matchAll(/(?<!\\)\$/g)];
    if (singleDollars.length % 2 !== 0) {
      // It has an odd number of $ on this line!
      // Is it plain currency like "$50 million" or "$10"?
      // Let's check each dollar
      let mathDollars = 0;
      let currencyDollars = 0;
      // If there's an odd number of dollars, let's see why:
      unpaired.push({
        file,
        line: i + 1,
        dollarCount: singleDollars.length,
        text: line.trim()
      });
    }
  }
}

console.log(`Found ${unpaired.length} lines with odd number of $ signs:`);
for (const u of unpaired) {
  console.log(`[${u.file}:${u.line}] (${u.dollarCount} $ signs): ${u.text}`);
}
