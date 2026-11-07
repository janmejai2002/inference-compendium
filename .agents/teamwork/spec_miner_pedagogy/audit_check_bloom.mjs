import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

const VALID_BLOOM_LEVELS = new Set(['recall', 'apply', 'explain', 'transfer', 'judge']);

console.log("=== CHECK & ANSWERS BLOOM AUDIT ===");
for (const c of ctx.chapters) {
  if (!c.file || !fs.existsSync(c.file)) continue;
  const raw = fs.readFileSync(c.file, 'utf8');
  const { content: body } = matter(raw);

  const checkMatch = body.match(/:::\s*check\b[^\n]*\n([\s\S]*?):::/);
  const ansMatch = body.match(/:::\s*answers\b[^\n]*\n([\s\S]*?):::/);

  if (!checkMatch) {
    console.log(`[Ch ${c.n}] ${c.id}: MISSING CHECK BLOCK`);
    continue;
  }
  if (!ansMatch) {
    console.log(`[Ch ${c.n}] ${c.id}: MISSING ANSWERS BLOCK`);
    continue;
  }

  const qLines = checkMatch[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));
  const aLines = ansMatch[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));

  const bloomTags = [...checkMatch[1].matchAll(/<span class="lvl">([^<]+)<\/span>/g)].map(m => m[1].trim().toLowerCase());

  const issues = [];
  if (qLines.length !== aLines.length) {
    issues.push(`Q count (${qLines.length}) != A count (${aLines.length})`);
  }
  if (bloomTags.length !== qLines.length) {
    issues.push(`Bloom tags count (${bloomTags.length}) != Q count (${qLines.length})`);
  }
  for (const tag of bloomTags) {
    if (!VALID_BLOOM_LEVELS.has(tag)) {
      issues.push(`Invalid bloom tag "${tag}" (valid: recall, apply, explain, transfer, judge)`);
    }
  }

  if (issues.length > 0) {
    console.log(`[Ch ${c.n}] ${c.id}:`);
    for (const iss of issues) console.log(`   - ${iss}`);
  } else {
    console.log(`[Ch ${c.n}] ${c.id}: PERFECT CHECK/ANSWERS (${qLines.length} Qs, tags: [${bloomTags.join(', ')}])`);
  }
}
