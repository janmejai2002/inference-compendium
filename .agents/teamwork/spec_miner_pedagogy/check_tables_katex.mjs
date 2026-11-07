import fs from 'node:fs';
import path from 'node:path';

const ROOT = "C:\\Users\\Janmejai\\compendium";
const CHAPTERS_DIR = path.join(ROOT, 'content', 'chapters');

const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.md')).sort();

console.log("=== TABLE & KATEX AUDIT ===");
for (const file of files) {
  const p = path.join(CHAPTERS_DIR, file);
  const text = fs.readFileSync(p, 'utf8');

  // Check for code blocks with ascii tables
  const codeBlocks = [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)];
  for (const [_, code] of codeBlocks) {
    if (/^\s*\+[-+]+\+\s*$/m.test(code) || /\|[-=]{3,}\|/m.test(code)) {
      console.log(`[ASCII TABLE DETECTED] in ${file}:\n${code.slice(0, 150)}...\n`);
    }
  }

  // Check for raw unescaped math leaks like $...$ inside container titles
  const containerHeaderMathLeaks = [...text.matchAll(/:::\s*\w+\s+[^\n]*\$[^\n]+\$/g)];
  if (containerHeaderMathLeaks.length > 0) {
    console.log(`[MATH IN CONTAINER HEADER] in ${file}:`, containerHeaderMathLeaks.map(m => m[0]));
  }

  // Check for double dollar balance
  const ddCount = (text.match(/\$\$/g) || []).length;
  if (ddCount % 2 !== 0) {
    console.log(`[UNBALANCED $$] in ${file}: count is ${ddCount}`);
  }
}
console.log("Table & KaTeX audit complete.");
