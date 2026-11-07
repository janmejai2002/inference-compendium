import fs from 'node:fs';
import path from 'node:path';

const chaptersDir = path.resolve('content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

let violations = [];

const boxChars = /[┌┐└┘├┤┬┴┼│─]/;
const asciiBorders = /(?:\+[-=+]+\+|\|[-=+]+\|)/;

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');

  // Match all fenced code blocks
  const codeBlocks = content.match(/```[^\n]*\n[\s\S]*?```/g) || [];

  codeBlocks.forEach((block, idx) => {
    // Check if the block has box characters or ascii border patterns
    const hasBox = boxChars.test(block);
    const hasBorder = asciiBorders.test(block);

    // Also check if block has lines that look like a table
    const lines = block.split('\n').filter(l => !l.startsWith('```'));
    const pipeCount = lines.filter(l => (l.match(/\|/g) || []).length >= 2).length;
    const isPipeTableInCode = pipeCount >= 2;

    if (hasBox || hasBorder || isPipeTableInCode) {
      violations.push({
        file,
        blockIdx: idx,
        hasBox,
        hasBorder,
        isPipeTableInCode,
        preview: lines.slice(0, 5).join('\n')
      });
    }
  });
}

console.log('--- SCAN FOR FENCED ASCII ART TABLES ---');
console.log('Total chapters scanned:', files.length);
console.log('Fenced code blocks with ASCII art / table patterns:', violations.length);

if (violations.length > 0) {
  console.log('Violations found:');
  console.log(JSON.stringify(violations, null, 2));
} else {
  console.log('ZERO fenced ASCII art tables or tabular code blocks exist across the book!');
}
