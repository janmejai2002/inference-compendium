import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook, ROOT } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

const arcResults = [];

for (const c of ctx.chapters) {
  const filepath = c.file;
  if (!filepath || !fs.existsSync(filepath)) {
    arcResults.push({ id: c.id, n: c.n, exists: false });
    continue;
  }

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data: fm, content: body } = matter(raw);

  // 1. Core Hook & Opening Vignette
  const hasFmHook = !!(fm.hook && String(fm.hook).trim());
  const openerMatch = body.match(/##\s+([^\n]+)\n+([\s\S]*?)(?=\n##|\n:::|\n==)/);
  const openerTitle = openerMatch ? openerMatch[1].trim() : "";
  const openerText = openerMatch ? openerMatch[2].trim() : "";
  const hasVignette = openerText.length > 50;

  // 2. Historical & Intuitive Genesis
  // Does it start from familiar / intuitive grounding?
  const hasGenesis = openerText.length > 100;

  // 3. Mathematical & Conceptual Formalization
  const principles = [...body.matchAll(/:::\s*principle\b([^\n]*)\n([\s\S]*?):::/g)];
  const displayMath = [...body.matchAll(/\$\$([\s\S]+?)\$\$/g)];
  const hasMathOrFormalization = principles.length > 0 || displayMath.length > 0;

  // 4. Architecture / Engineering Blueprint
  const concepts = [...body.matchAll(/:::\s*concept\b([^\n]*)\n([\s\S]*?):::/g)];
  const figures = [...body.matchAll(/\{\{\s*(?:figure|figure-wide)\s+([^}]+)\}\}/g)];
  const hasArchitecture = concepts.length > 0 || figures.length > 0;

  // 5. Real-World Failure Mode / War Story
  const myths = [...body.matchAll(/:::\s*myth\b[\s\S]*?:::/g)];
  const stats = [...body.matchAll(/:::\s*stat\b([^\n]*)\n([\s\S]*?):::/g)];
  const hasFailureMode = myths.length > 0 || stats.length > 0 || /failure|hack|leak|breach|hallucinat|stall|collapse|risk|crash|loss/i.test(body);

  // 6. Modern Implementation & Code / Diagram
  const hasImplementation = figures.length > 0 || body.includes('```');

  // 7. Benchmarks & Trade-off Matrix
  const cases = [...body.matchAll(/:::\s*case\b([^\n]*)\n([\s\S]*?):::/g)];
  const tables = [...body.matchAll(/\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)+/g)];
  const hasTradeoffOrCase = cases.length > 0 || tables.length > 0;

  // 8. Frontier Developments & 2026+ Outlook
  const lenses = [...body.matchAll(/:::\s*lens\b([^\n]*)\n([\s\S]*?):::/g)];
  const has2026 = body.includes('2026') || body.includes('frontier');

  // 9. MBA "Try it" Prompt (strictly NO CODE for business candidates)
  const tryBlock = body.match(/:::\s*try\b([^\n]*)\n([\s\S]*?):::/);
  let tryEvaluation = "missing";
  let tryCodeCheck = "clean";
  if (tryBlock) {
    const tryContent = tryBlock[2];
    const codeBlocks = [...tryContent.matchAll(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g)];
    let realCodeFound = false;
    for (const [_, lang, code] of codeBlocks) {
      const l = (lang || '').trim().toLowerCase();
      if (['python', 'py', 'javascript', 'js', 'bash', 'sh', 'sql', 'r', 'typescript', 'ts'].includes(l)) {
        realCodeFound = true;
        tryCodeCheck = `code_${l}`;
      } else if (/\b(def\s+\w+\(|import\s+\w+|function\s+\w+\(|const\s+\w+\s*=|let\s+\w+\s*=)/.test(code)) {
        realCodeFound = true;
        tryCodeCheck = "code_heuristic";
      }
    }
    tryEvaluation = realCodeFound ? "has_code_violation" : "valid_prompt";
  }

  // 10. Highlighted Thesis Statement (==...==)
  const highlights = [...body.matchAll(/==([^=]+)==/g)].map(m => m[1].trim());
  const hasHighlightedThesis = highlights.length > 0;
  const firstHighlight = highlights.length > 0 ? highlights[0] : "";

  // 11. Media Card / Curated Artifacts
  const mediaCards = [...body.matchAll(/\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/g)].map(m => m[1].trim());

  // 12. Check Questions with Explicit Answers
  const checkBlock = body.match(/:::\s*check\b[^\n]*\n([\s\S]*?):::/);
  const answersBlock = body.match(/:::\s*answers\b[^\n]*\n([\s\S]*?):::/);
  const checkQuestions = checkBlock ? checkBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l)) : [];
  const bloomLevels = checkBlock ? [...checkBlock[1].matchAll(/<span class="lvl">([a-zA-Z]+)<\/span>/g)].map(m => m[1].toLowerCase()) : [];
  const answerItems = answersBlock ? answersBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l)) : [];
  const checkAnswersMatch = checkQuestions.length > 0 && checkQuestions.length === answerItems.length;

  // 13. 5-Line Night-Before Recap
  const recapBlock = body.match(/:::\s*recap\b[^\n]*\n([\s\S]*?):::/);
  const recapLines = recapBlock ? recapBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l)) : [];
  const recapValid = recapLines.length === 5;

  arcResults.push({
    id: c.id,
    n: c.n,
    part: c.part?.id,
    title: fm.title || c.title,
    words: (body.match(/\b\w+\b/g) || []).length,
    elements: {
      1: { name: "Core Hook & Vignette", pass: hasFmHook && hasVignette, hook: fm.hook, vignetteTitle: openerTitle },
      2: { name: "Historical / Intuitive Genesis", pass: hasGenesis },
      3: { name: "Mathematical / Conceptual Formalization", pass: hasMathOrFormalization, count: principles.length, displayMath: displayMath.length },
      4: { name: "Architecture / Engineering Blueprint", pass: hasArchitecture, concepts: concepts.length, figures: figures.length },
      5: { name: "Real-World Failure Mode / War Story", pass: hasFailureMode, myths: myths.length, stats: stats.length },
      6: { name: "Modern Implementation & Code / Diagram", pass: hasImplementation, figures: figures.length },
      7: { name: "Benchmarks & Trade-off Matrix", pass: hasTradeoffOrCase, cases: cases.length, tables: tables.length },
      8: { name: "Frontier & 2026+ Outlook", pass: lenses.length > 0 && has2026, lenses: lenses.length },
      9: { name: "MBA Try it Prompt (No Code)", pass: tryEvaluation === "valid_prompt", eval: tryEvaluation, codeCheck: tryCodeCheck },
      10: { name: "Highlighted Thesis (==...==)", pass: hasHighlightedThesis, count: highlights.length, firstHighlight: firstHighlight.slice(0, 80) + "..." },
      11: { name: "Media Card / Curated Artifacts", pass: mediaCards.length > 0, count: mediaCards.length, cards: mediaCards },
      12: { name: "Check Questions & Answers", pass: checkAnswersMatch && checkQuestions.length >= 4, qCount: checkQuestions.length, aCount: answerItems.length, bloom: bloomLevels },
      13: { name: "5-Line Night-Before Recap", pass: recapValid, lineCount: recapLines.length }
    }
  });
}

fs.writeFileSync(
  path.join(ROOT, '.agents', 'teamwork', 'spec_miner_pedagogy', 'arc_audit.json'),
  JSON.stringify(arcResults, null, 2),
  'utf8'
);

console.log("Arc Audit Complete across 28 chapters:");
for (const ch of arcResults) {
  const failed = [];
  for (let i = 1; i <= 13; i++) {
    if (!ch.elements[i].pass) {
      failed.push(`E${i}(${ch.elements[i].name})`);
    }
  }
  console.log(`[Ch ${ch.n}] ${ch.id.padEnd(38)} -> Failed ${failed.length}/13: ${failed.join(', ') || 'ALL PASS'}`);
}

