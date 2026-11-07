import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

for (const id of ['pilots-stall', 'work-changes', 'consulting-firm', 'ai-casebook', 'your-documents', 'creative-at-scale', 'synthetic-audiences-and-attribution', 'agentic-ux-and-interfaces']) {
  const p = path.join('content', 'chapters', `${id}.md`);
  const raw = fs.readFileSync(p, 'utf8');
  const { data: fm, content: body } = matter(raw);
  console.log(`\n=== ${id} ===`);
  console.log(`hook:`, fm.hook);
  console.log(`objectives:`, fm.objectives);
  const first10Lines = body.split('\n').slice(0, 15).join('\n');
  console.log(`Opener:\n${first10Lines}`);
}
