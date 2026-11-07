import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:\\Users\\Janmejai\\compendium';
const files = [
  'content/chapters/algorithmic-underwriting-and-credit-risk.md',
  'content/chapters/financial-copilots-and-deal-diligence.md',
  'content/chapters/financial-crime-fraud-and-rbi-free-ai.md',
  'content/chapters/finance-casebook.md'
];

console.log('--- CHAPTER SIZE & METRIC AUDIT ---');
for (const rel of files) {
  const full = path.join(ROOT, rel);
  const text = fs.readFileSync(full, 'utf8');
  const lines = text.split('\n').length;
  const words = text.trim().split(/\s+/).length;
  const bytes = Buffer.byteLength(text, 'utf8');
  console.log(`${path.basename(rel).padEnd(46)} | Lines: ${String(lines).padStart(4)} | Words: ${String(words).padStart(5)} | Bytes: ${String(bytes).padStart(6)}`);
}
