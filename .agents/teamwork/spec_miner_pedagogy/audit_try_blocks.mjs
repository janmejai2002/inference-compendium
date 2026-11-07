import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

console.log("=== TRY BLOCK AUDIT (MBA NO-CODE VERIFICATION) ===");
for (const c of ctx.chapters) {
  if (!c.file || !fs.existsSync(c.file)) continue;
  const raw = fs.readFileSync(c.file, 'utf8');
  const { content: body } = matter(raw);

  const tryMatch = body.match(/:::\s*try\b([^\n]*)\n([\s\S]*?):::/);
  if (!tryMatch) {
    console.log(`[Ch ${c.n}] ${c.id}: NO TRY BLOCK`);
    continue;
  }

  const title = tryMatch[1].trim();
  const content = tryMatch[2];
  const fenced = [...content.matchAll(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g)];

  const languages = fenced.map(m => m[1].trim());
  const promptSamples = fenced.map(m => m[2].trim().slice(0, 100).replace(/\n/g, ' '));

  console.log(`[Ch ${c.n}] ${c.id}: "${title}"`);
  console.log(`   Languages: [${languages.join(', ')}]`);
  console.log(`   Prompt preview: "${promptSamples[0] || 'NO FENCED PROMPT'}"`);
}
