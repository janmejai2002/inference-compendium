import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { loadBook, ROOT } from '../../../scripts/lib/render.mjs';

const ctx = await loadBook();

const BANNED_PATTERNS = [
  { name: "stands as a testament", re: /\bstands? as a testament\b/i },
  { name: "serves as a stark reminder", re: /\bserves? as a stark reminder\b/i },
  { name: "testament to", re: /\btestament to\b/i },
  { name: "crucial role", re: /\bplays? a crucial role\b/i },
  { name: "pivotal role", re: /\bplays? a pivotal role\b/i },
  { name: "vital role", re: /\bplays? a vital role\b/i },
  { name: "key role", re: /\bplays? a key role\b/i },
  { name: "instrumental role", re: /\bplays? an instrumental role\b/i },
  { name: "crucial", re: /\bcrucial\b/i },
  { name: "pivotal", re: /\bpivotal\b/i },
  { name: "vital", re: /\bvital\b/i },
  { name: "marks a shift", re: /\bmarks? a shift\b/i },
  { name: "pivotal turning point", re: /\b(?:marks? a )?pivotal turning point\b/i },
  { name: "sets the stage for", re: /\bsets? the stage for\b/i },
  { name: "paves the way for", re: /\bpaves? the way for\b/i },
  { name: "evolving landscape", re: /\b(?:shapes the )?(?:rapidly |ever-)?(?:shifting|evolving) landscape\b/i },
  { name: "rapidly evolving", re: /\brapidly evolving\b/i },
  { name: "leaves an indelible mark", re: /\bleaves? an indelible mark\b/i },
  { name: "deeply rooted in", re: /\bdeeply rooted in\b/i },
  { name: "delve/delving", re: /\bdelv(?:e|es|ed|ing)\b/i },
  { name: "in the high-stakes world of", re: /\bin the high-stakes world of\b/i },
  { name: "not a question of if, but when", re: /\bnot a question of if,? but when\b/i },
  { name: "it is not simply X; it is Y", re: /\bit is not simply [^;.\n]+;? it is\b/i },
  { name: "consider the case of", re: /\bconsider the case of\b/i },
  { name: "lesson is unequivocal", re: /\b(?:the )?lesson is unequivocal\b/i },
  { name: "reality is sobering", re: /\b(?:the )?reality is sobering\b/i },
  { name: "at the end of the day", re: /\bat the end of the day\b/i },
  { name: "double-edged sword", re: /\bdouble-edged(?: sword)?\b/i },
  { name: "game-changing", re: /\bgame-changing\b/i },
  { name: "transformative", re: /\btransformative\b/i },
  { name: "unprecedented", re: /\bunprecedented\b/i },
  { name: "featured in prominent", re: /\bfeatured in prominent\b/i },
  { name: "widely profiled", re: /\bwidely profiled\b/i },
  { name: "leading industry expert", re: /\bleading industry expert\b/i },
  { name: "garnered widespread attention", re: /\bgarnered widespread attention\b/i },
  { name: "maintains an active presence in", re: /\bmaintains an active presence in\b/i }
];

const TRAILING_ING_PATTERN = /,\s+(?:underscoring|highlighting|reflecting|ensuring|demonstrating|fostering|encompassing|cultivating|offering|showcasing|signaling|bridging|mirroring)\b/gi;

const results = [];

for (const c of ctx.chapters) {
  const filepath = c.file;
  if (!filepath || !fs.existsSync(filepath)) {
    results.push({
      id: c.id,
      n: c.n,
      title: c.title,
      part: c.part?.id,
      exists: false
    });
    continue;
  }

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data: fm, content: body } = matter(raw);

  // Word count in body
  const words = (body.match(/\b\w+\b/g) || []).length;

  // Blocks
  const principles = [...body.matchAll(/:::\s*principle\b(.*)/g)].map(m => m[1].trim());
  const concepts = [...body.matchAll(/:::\s*concept\b(.*)/g)].map(m => m[1].trim());
  const cases = [...body.matchAll(/:::\s*case\b(.*)/g)].map(m => m[1].trim());
  const lenses = [...body.matchAll(/:::\s*lens\b(.*)/g)].map(m => m[1].trim());
  const interviews = [...body.matchAll(/:::\s*interview\b(.*)/g)].map(m => m[1].trim());
  const myths = [...body.matchAll(/:::\s*myth\b/g)];
  const stats = [...body.matchAll(/:::\s*stat\b(.*)/g)].map(m => m[1].trim());
  const pulls = [...body.matchAll(/:::\s*pull\b/g)];
  const tries = [...body.matchAll(/:::\s*try\b(.*)/g)].map(m => m[1].trim());
  const checks = [...body.matchAll(/:::\s*check\b(.*)/g)].map(m => m[1].trim());
  const answers = [...body.matchAll(/:::\s*answers\b/g)];
  const recaps = [...body.matchAll(/:::\s*recap\b(.*)/g)].map(m => m[1].trim());

  // Figures and media
  const figures = [...body.matchAll(/\{\{\s*(?:figure|figure-wide)\s+([^}]+)\}\}/g)].map(m => m[1].trim());
  const mediaCards = [...body.matchAll(/\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/g)].map(m => m[1].trim());
  const highlights = [...body.matchAll(/==([^=]+)==/g)].map(m => m[1].trim());
  const cites = [...body.matchAll(/\[@([\w-]+)\]/g)].map(m => m[1].trim());
  const sidenotes = [...body.matchAll(/\^\[((?:[^[\]]|\[[^\]]*\])*)\]/g)].map(m => m[1].trim());
  const glossary = [...body.matchAll(/\[\[([^\]]+)\]\]/g)].map(m => m[1].trim());

  // Recap lines check
  let recapLines = [];
  const recapBlock = body.match(/:::\s*recap\b[^\n]*\n([\s\S]*?):::/);
  if (recapBlock) {
    recapLines = recapBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));
  }

  // Check questions & Bloom levels
  let checkQuestions = [];
  let bloomLevels = [];
  const checkBlock = body.match(/:::\s*check\b[^\n]*\n([\s\S]*?):::/);
  if (checkBlock) {
    checkQuestions = checkBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));
    bloomLevels = [...checkBlock[1].matchAll(/<span class="lvl">([a-zA-Z]+)<\/span>/g)].map(m => m[1].toLowerCase());
  }

  // Answers count
  let answerItems = [];
  const answerBlock = body.match(/:::\s*answers\b[^\n]*\n([\s\S]*?):::/);
  if (answerBlock) {
    answerItems = answerBlock[1].split('\n').filter(l => /^\s*\d+\.\s*/.test(l));
  }

  // Try block inspection: check if try contains programming code vs prompt
  let tryHasCode = false;
  let tryCodeLanguages = [];
  let tryPromptText = "";
  const tryBlock = body.match(/:::\s*try\b[^\n]*\n([\s\S]*?):::/);
  if (tryBlock) {
    tryPromptText = tryBlock[1];
    const codeBlocks = [...tryBlock[1].matchAll(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g)];
    for (const [_, lang, codeContent] of codeBlocks) {
      const cleanLang = (lang || '').trim().toLowerCase();
      if (['python', 'py', 'javascript', 'js', 'bash', 'sh', 'sql', 'r'].includes(cleanLang)) {
        tryHasCode = true;
        tryCodeLanguages.push(cleanLang);
      } else if (/\b(def |import |return |function\(|const |let |var |console\.log)\b/.test(codeContent)) {
        tryHasCode = true;
        tryCodeLanguages.push(`heuristic:${cleanLang || 'none'}`);
      }
    }
  }

  // KaTeX checks
  const displayMath = [...body.matchAll(/\$\$([\s\S]+?)\$\$/g)].map(m => m[1].trim());
  const inlineMath = [...body.matchAll(/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g)].map(m => m[1].trim());

  // Slop detection
  const slopFindings = [];
  for (const pat of BANNED_PATTERNS) {
    const matches = [...body.matchAll(new RegExp(pat.re, 'gi'))];
    for (const m of matches) {
      const lineNo = body.slice(0, m.index).split('\n').length;
      slopFindings.push({
        name: pat.name,
        match: m[0],
        line: lineNo
      });
    }
  }

  const trailingIngs = [];
  const ingMatches = [...body.matchAll(new RegExp(TRAILING_ING_PATTERN, 'gi'))];
  for (const m of ingMatches) {
    const lineNo = body.slice(0, m.index).split('\n').length;
    trailingIngs.push({
      match: m[0],
      line: lineNo
    });
  }

  // Sentence burstiness calculation
  const proseLines = body.split('\n').filter(l => {
    const s = l.trim();
    if (!s) return false;
    if (s.startsWith(':::') || s.startsWith('{{') || s.startsWith('#') || s.startsWith('|') || s.startsWith('```')) return false;
    if (/^\d+\.\s*/.test(s) || s.startsWith('- ') || s.startsWith('* ')) return false;
    return true;
  });
  const sentences = [];
  for (const line of proseLines) {
    const sList = line.split(/(?<=[.!?])\s+/);
    for (const s of sList) {
      const w = (s.match(/\b\w+\b/g) || []).length;
      if (w >= 3) sentences.push(w);
    }
  }
  const meanLen = sentences.length ? sentences.reduce((a, b) => a + b, 0) / sentences.length : 0;
  const variance = sentences.length > 1 ? sentences.reduce((a, b) => a + Math.pow(b - meanLen, 2), 0) / (sentences.length - 1) : 0;
  const stdevLen = Math.sqrt(variance);

  // Frontmatter fields check
  const fmMissing = [];
  for (const req of ['id', 'title', 'deck', 'hook', 'objectives', 'tracks']) {
    if (!fm[req] || (Array.isArray(fm[req]) && fm[req].length === 0)) {
      fmMissing.push(req);
    }
  }

  // Callout nesting and balance
  const calloutLines = body.split('\n').map((l, i) => ({ text: l.trim(), line: i + 1 })).filter(x => x.text.startsWith(':::'));
  let balance = 0;
  const calloutIssues = [];
  for (const cLine of calloutLines) {
    if (cLine.text === ':::') {
      balance -= 1;
      if (balance < 0) {
        calloutIssues.push(`Unexpected closing ::: at line ${cLine.line}`);
      }
    } else {
      balance += 1;
    }
  }
  if (balance !== 0) {
    calloutIssues.push(`Unbalanced callouts: net balance is ${balance}`);
  }

  results.push({
    id: c.id,
    n: c.n,
    title: fm.title || c.title,
    deck: fm.deck || c.deck,
    part: c.part?.id,
    partTitle: c.part?.title,
    track: c.track,
    words,
    exists: true,
    fmMissing,
    fm,
    blocks: {
      principles: principles.length,
      concepts: concepts.length,
      cases: cases.length,
      lenses: lenses.length,
      interviews: interviews.length,
      myths: myths.length,
      stats: stats.length,
      pulls: pulls.length,
      tries: tries.length,
      checks: checks.length,
      answers: answers.length,
      recaps: recaps.length
    },
    recapLinesCount: recapLines.length,
    checkQuestionsCount: checkQuestions.length,
    bloomLevels,
    answerItemsCount: answerItems.length,
    tryHasCode,
    tryCodeLanguages,
    figuresCount: figures.length,
    mediaCardsCount: mediaCards.length,
    highlightsCount: highlights.length,
    citesCount: cites.length,
    sidenotesCount: sidenotes.length,
    glossaryCount: glossary.length,
    displayMathCount: displayMath.length,
    inlineMathCount: inlineMath.length,
    slopCount: slopFindings.length,
    slopFindings,
    trailingIngsCount: trailingIngs.length,
    trailingIngs,
    meanLen: Math.round(meanLen * 10) / 10,
    stdevLen: Math.round(stdevLen * 10) / 10,
    calloutIssues
  });
}

fs.writeFileSync(
  path.join(ROOT, '.agents', 'teamwork', 'spec_miner_pedagogy', 'audit_full.json'),
  JSON.stringify(results, null, 2),
  'utf8'
);

console.log(`Audited ${results.length} chapters.`);
let totalSlop = 0;
let totalTrailingIngs = 0;
for (const r of results) {
  totalSlop += r.slopCount || 0;
  totalTrailingIngs += r.trailingIngsCount || 0;
  const issues = [];
  if (r.fmMissing.length) issues.push(`FM: [${r.fmMissing.join(', ')}]`);
  if (!r.blocks.recaps) issues.push('NO RECAP');
  else if (r.recapLinesCount !== 5) issues.push(`Recap ${r.recapLinesCount}/5`);
  if (!r.blocks.checks) issues.push('NO CHECK');
  if (!r.blocks.answers) issues.push('NO ANSWERS');
  if (r.blocks.checks && r.blocks.answers && r.checkQuestionsCount !== r.answerItemsCount) issues.push(`Q/A mismatch ${r.checkQuestionsCount}!= ${r.answerItemsCount}`);
  if (!r.highlightsCount) issues.push('NO HIGHLIGHTS');
  if (!r.blocks.tries) issues.push('NO TRY');
  else if (r.tryHasCode) issues.push(`TRY HAS CODE (${r.tryCodeLanguages.join(',')})`);
  if (!r.blocks.principles) issues.push('NO PRINCIPLE');
  if (!r.blocks.concepts) issues.push('NO CONCEPT');
  if (!r.blocks.cases) issues.push('NO CASE');
  if (!r.blocks.interviews) issues.push('NO INTERVIEW');
  if (!r.figuresCount) issues.push('NO FIG');
  if (!r.mediaCardsCount) issues.push('NO MEDIA');
  if (r.slopCount) issues.push(`${r.slopCount} slop`);
  if (r.trailingIngsCount) issues.push(`${r.trailingIngsCount} trailing -ing`);
  if (r.calloutIssues.length) issues.push(`Callouts: ${r.calloutIssues.join('; ')}`);
  
  const status = issues.length ? `ISSUES: ${issues.join(' | ')}` : 'PERFECT COMPLIANCE';
  console.log(`[Ch ${r.n}] ${r.id.padEnd(38)} (${String(r.words).padStart(4)}w) -> ${status}`);
}

console.log(`\nTotals: ${totalSlop} banned slop instances, ${totalTrailingIngs} trailing participial clauses across all chapters.`);
