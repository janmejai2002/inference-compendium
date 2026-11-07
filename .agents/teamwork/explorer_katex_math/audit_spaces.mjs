import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

console.log('Auditing delimiter whitespace issues ($ math $ or $math $)...');

const spaceIssues = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line contains $ followed immediately by space AND closed by $
    // Make sure it's not a fenced code block
    if (line.startsWith('```')) continue;
    
    // Pattern: $ followed by space, some chars, then $
    const matchOpenSpace = line.match(/(?<=^|[\s(])\$\s+([^\$\n]+?)\$(?=[\s,.;:!?)\]]|$)/);
    if (matchOpenSpace) {
      spaceIssues.push({
        file,
        line: i + 1,
        type: 'leading-space',
        match: matchOpenSpace[0],
        inner: matchOpenSpace[1],
        fullLine: line.trim()
      });
    }

    // Pattern: $ followed by some chars, then space followed by $
    const matchCloseSpace = line.match(/(?<=^|[\s(])\$([^\$\n]+?)\s+\$(?=[\s,.;:!?)\]]|$)/);
    if (matchCloseSpace) {
      spaceIssues.push({
        file,
        line: i + 1,
        type: 'trailing-space',
        match: matchCloseSpace[0],
        inner: matchCloseSpace[1],
        fullLine: line.trim()
      });
    }
  }
}

console.log(`Found ${spaceIssues.length} space issues in delimiters:`);
for (const iss of spaceIssues) {
  console.log(`[${iss.file}:${iss.line}] (${iss.type}): "${iss.match}"`);
}
