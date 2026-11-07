import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

for (const id of ['your-documents', 'creative-at-scale', 'synthetic-audiences-and-attribution', 'agentic-ux-and-interfaces', 'ai-casebook']) {
  const p = path.join('content', 'chapters', `${id}.md`);
  const raw = fs.readFileSync(p, 'utf8');
  const { content: body } = matter(raw);
  const lenses = [...body.matchAll(/:::\s*lens\b([^\n]*)/g)].map(m => m[1].trim());
  const cases = [...body.matchAll(/:::\s*case\b([^\n]*)/g)].map(m => m[1].trim());
  console.log(`\n=== ${id} ===`);
  console.log(`lenses (${lenses.length}):`, lenses);
  console.log(`cases (${cases.length}):`, cases);
  console.log(`has 2026:`, body.includes('2026'));
}
