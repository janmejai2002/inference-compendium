import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook, ROOT } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

const VALID_TRACKS = new Set(Object.keys(ctx.trackById));
console.log("Valid tracks:", [...VALID_TRACKS]);

const BLOOM_VERBS = new Set([
  'define', 'identify', 'describe', 'recognize', 'recall', 'state', 'list', 'name', 'match',
  'explain', 'summarize', 'paraphrase', 'classify', 'clarify', 'contrast', 'distinguish', 'interpret',
  'apply', 'execute', 'implement', 'solve', 'calculate', 'demonstrate', 'operate',
  'analyze', 'deconstruct', 'compare', 'differentiate', 'diagnose', 'examine', 'audit',
  'evaluate', 'judge', 'critique', 'assess', 'defend', 'validate', 'justify', 'score',
  'create', 'design', 'construct', 'formulate', 'develop', 'architect', 'structure', 'synthesize', 'recommend', 'master', 'categorise', 'categorize'
]);

const fmAudit = [];

for (const c of ctx.chapters) {
  if (!c.file || !fs.existsSync(c.file)) continue;
  const raw = fs.readFileSync(c.file, 'utf8');
  const { data: fm } = matter(raw);

  const issues = [];

  // ID match
  if (fm.id !== c.id) {
    issues.push(`id mismatch: fm="${fm.id}" vs toc="${c.id}"`);
  }

  // Title
  if (!fm.title) issues.push("missing title");

  // Deck
  if (!fm.deck) issues.push("missing deck");

  // Level
  if (!fm.level) issues.push("missing level");

  // Tracks
  if (!fm.tracks || !Array.isArray(fm.tracks) || fm.tracks.length === 0) {
    issues.push("missing or non-array tracks");
  } else {
    for (const t of fm.tracks) {
      if (!VALID_TRACKS.has(t)) {
        issues.push(`invalid track "${t}"`);
      }
    }
  }

  // Hook
  if (!fm.hook || !String(fm.hook).trim()) {
    issues.push("missing hook");
  }

  // Objectives
  if (!fm.objectives || !Array.isArray(fm.objectives) || fm.objectives.length < 3) {
    issues.push(`objectives count is ${fm.objectives ? fm.objectives.length : 0} (expected 3-4)`);
  } else {
    for (let i = 0; i < fm.objectives.length; i++) {
      const obj = String(fm.objectives[i]).trim();
      const match = obj.match(/^\*\*([a-zA-Z]+)\*\*/);
      if (!match) {
        issues.push(`objective ${i + 1} does not start with bold verb: "${obj.slice(0, 30)}..."`);
      } else {
        const verb = match[1].toLowerCase();
        if (!BLOOM_VERBS.has(verb)) {
          issues.push(`objective ${i + 1} verb "**${match[1]}**" not recognized as Bloom verb`);
        }
      }
    }
  }

  fmAudit.push({
    id: c.id,
    n: c.n,
    title: fm.title,
    tracks: fm.tracks,
    objCount: fm.objectives ? fm.objectives.length : 0,
    issues
  });
}

console.log("=== FRONTMATTER AUDIT RESULTS ===");
let totalFmIssues = 0;
for (const item of fmAudit) {
  if (item.issues.length > 0) {
    totalFmIssues += item.issues.length;
    console.log(`[Ch ${item.n}] ${item.id}:`);
    for (const iss of item.issues) {
      console.log(`   - ${iss}`);
    }
  } else {
    console.log(`[Ch ${item.n}] ${item.id}: PERFECT FRONTMATTER (${item.tracks.join(', ')}, ${item.objCount} objectives)`);
  }
}

console.log(`\nTotal Frontmatter Issues: ${totalFmIssues}`);
