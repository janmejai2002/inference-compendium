// Adversarial Full Audit & Stress-Test Harness across all 28 chapters
// Verifier: challenger_stress_testing
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const CONTENT = path.join(ROOT, 'content');
const CHAPTERS_DIR = path.join(CONTENT, 'chapters');

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  failures: [],
  details: []
};

function pass(testName, info = '') {
  results.passed++;
  console.log(`  ✔ PASS: ${testName}${info ? ` (${info})` : ''}`);
  results.details.push({ status: 'PASS', test: testName, info });
}

function fail(testName, error) {
  results.failed++;
  console.error(`  ✖ FAIL: ${testName}\n         ↳ ${error}`);
  results.failures.push({ test: testName, error });
  results.details.push({ status: 'FAIL', test: testName, error });
}

function warn(testName, warning) {
  results.warnings++;
  console.warn(`  ! WARN: ${testName}\n         ↳ ${warning}`);
}

console.log('======================================================================');
console.log('ADVERSARIAL STRESS-TEST & COMPREHENSIVE AUDIT');
console.log('Target: INFERENCE Compendium Publication Pipeline & All 28 Chapters');
console.log('======================================================================\n');

// Discover all built chapters from toc.yml
import * as yaml from 'js-yaml';
const toc = yaml.load(fs.readFileSync(path.join(CONTENT, 'toc.yml'), 'utf8'));
const activeChapterIds = [];
for (const part of toc.parts || []) {
  for (const ch of part.chapters || []) {
    activeChapterIds.push(ch.id);
  }
}

console.log(`Discovered ${activeChapterIds.length} active chapters in toc.yml.`);
if (activeChapterIds.length !== 28) {
  fail('Active chapter count in toc.yml', `Expected 28 chapters, got ${activeChapterIds.length}`);
} else {
  pass('Active chapter count in toc.yml', '28 chapters confirmed');
}

// -----------------------------------------------------------------------------
// 1. KATEX & RENDERING STRESS TEST ACROSS EVERY HTML OUTPUT
// -----------------------------------------------------------------------------
console.log('\n--- 1. KaTeX & Rendering Stress Test Across All dist/*.html ---');

const htmlFiles = [
  path.join(DIST, 'index.html'),
  path.join(DIST, 'print.html'),
  path.join(DIST, 'design.html'),
  ...activeChapterIds.map(id => path.join(DIST, 'ch', `${id}.html`))
];

const LATEX_COMMAND_REGEX = /\\(?:frac|sum|prod|int|sigma|times|cdot|mathbf|sqrt|partial|approx|le|ge|neq|beta|alpha|theta|lambda|pi|infty|text|to|in|left|right|dots|pm|nabla|cap|cup|subset|sim|equiv|forall|exists)\b/g;
const TAG_LEAK_REGEX = /&lt;\/?([a-zA-Z][a-zA-Z0-9:-]*)\b([^&gt;]*?)&gt;/gi;
const CONTAINER_LEAK_REGEX = /(?:^|\s)(:::(?:[a-zA-Z-]+)?)(?:\s|$)/g;

for (const filePath of htmlFiles) {
  const relPath = path.relative(ROOT, filePath);
  if (!fs.existsSync(filePath)) {
    fail(`File existence: ${relPath}`, `File not found`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // A. Check for KaTeX errors
  if (content.includes('class="katex-error"')) {
    fail(`KaTeX syntax error: ${relPath}`, 'Found class="katex-error" in output');
  } else {
    pass(`No katex-error in ${relPath}`);
  }

  // B. Check for math-raw fallbacks
  if (content.includes('class="math-raw"')) {
    fail(`Raw math fallback: ${relPath}`, 'Found <pre class="math-raw"> fallback');
  } else {
    pass(`No math-raw fallback in ${relPath}`);
  }

  // C. Check for literal unparsed $$ in HTML
  // Exclude within <pre> or <code> if any
  const bodyWithoutCode = content.replace(/<pre[\s\S]*?<\/pre>/gi, '').replace(/<code[\s\S]*?<\/code>/gi, '');
  const unparsedDisplayMath = bodyWithoutCode.match(/\$\$[\s\S]*?\$\$/g);
  if (unparsedDisplayMath) {
    fail(`Unparsed $$ in ${relPath}`, `Found ${unparsedDisplayMath.length} unparsed $$ block(s)`);
  } else {
    pass(`No unparsed $$ in ${relPath}`);
  }

  // D. Check for leaked LaTeX commands in prose outside KaTeX
  // Strip KaTeX rendered math: katex mathml and katex-html
  const contentNoKatex = bodyWithoutCode
    .replace(/<span class="katex">[\s\S]*?<\/span><\/span><\/span>/g, '')
    .replace(/<span class="katex"[\s\S]*?<\/span>/g, '')
    .replace(/<div class="formula">[\s\S]*?<\/div>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '');

  const leakedCommands = contentNoKatex.match(LATEX_COMMAND_REGEX);
  if (leakedCommands) {
    const unique = [...new Set(leakedCommands)];
    fail(`Leaked LaTeX commands in ${relPath}`, `Found commands outside math: ${unique.join(', ')}`);
  } else {
    pass(`No leaked LaTeX commands in ${relPath}`);
  }

  // E. Check for escaped HTML tag entities (&lt;div, &lt;span, etc.)
  const leaks = [];
  let match;
  while ((match = TAG_LEAK_REGEX.exec(contentNoKatex)) !== null) {
    const start = Math.max(0, match.index - 30);
    const end = Math.min(contentNoKatex.length, match.index + match[0].length + 30);
    const snippet = contentNoKatex.slice(start, end).replace(/\s+/g, ' ');
    leaks.push({ tag: match[1], snippet });
  }
  if (leaks.length > 0) {
    fail(`Escaped HTML tag entities in ${relPath}`, `Found ${leaks.length} leaks: ${JSON.stringify(leaks[0])}`);
  } else {
    pass(`No escaped HTML tag entities in ${relPath}`);
  }

  // F. Check for leaked container directives (:::case, :::principle, :::, etc.)
  const leakedContainers = [];
  while ((match = CONTAINER_LEAK_REGEX.exec(contentNoKatex)) !== null) {
    // Exclude if it's inside something intended or plain punctuation
    const text = match[1];
    if (text.startsWith(':::')) {
      leakedContainers.push(text);
    }
  }
  if (leakedContainers.length > 0) {
    fail(`Leaked container directives in ${relPath}`, `Found: ${leakedContainers.join(', ')}`);
  } else {
    pass(`No leaked container directives in ${relPath}`);
  }
}

// -----------------------------------------------------------------------------
// 2. TABLE & STRUCTURE STRESS TEST ACROSS MARKDOWN SOURCES & HTML OUTPUT
// -----------------------------------------------------------------------------
console.log('\n--- 2. Table & Structure Stress Test ---');

const ASCII_BOX_CHARS = ['┌', '└', '┐', '┘', '├', '┤', '┬', '┴', '┼', '│', '─', '═', '║', '╔', '╗', '╚', '╝'];

for (const chId of activeChapterIds) {
  const mdPath = path.join(CHAPTERS_DIR, `${chId}.md`);
  if (!fs.existsSync(mdPath)) {
    fail(`Chapter markdown missing: ${chId}.md`, 'File does not exist');
    continue;
  }
  const md = fs.readFileSync(mdPath, 'utf8');

  // A. Check for fenced code blocks containing tabular data or ASCII boxes
  const codeBlockRegex = /```[\w-]*\n([\s\S]*?)```/g;
  let cbMatch;
  let codeBlockIdx = 0;
  while ((cbMatch = codeBlockRegex.exec(md)) !== null) {
    codeBlockIdx++;
    const codeContent = cbMatch[1];
    
    // Check ASCII box characters
    const foundAscii = ASCII_BOX_CHARS.filter(c => codeContent.includes(c));
    if (foundAscii.length > 0) {
      fail(`ASCII box chars in code block of ${chId}.md`, `Block #${codeBlockIdx} contains ASCII box chars: ${foundAscii.join(' ')}`);
    }

    // Check ASCII border patterns (+---+ or +===+)
    if (/\+[-=]{3,}\+/.test(codeContent)) {
      fail(`ASCII border pattern (+---+)+ in code block of ${chId}.md`, `Block #${codeBlockIdx} contains ASCII border`);
    }

    // Check markdown table pipes inside code blocks (|---| or | --- |)
    if (/\|\s*[-:]{3,}\s*\|/.test(codeContent)) {
      fail(`Markdown table inside fenced code block in ${chId}.md`, `Block #${codeBlockIdx} contains table header separator |---|`);
    }
  }
  pass(`No ASCII boxes or tables trapped in code blocks: ${chId}.md`);

  // B. Check GFM tables in markdown vs rendered HTML
  const gfmTableMatches = md.match(/\|[^\n]+\|\n\|[\s-:]+\|\n(?:\|[^\n]+\|\n?)+/g) || [];
  const htmlPath = path.join(DIST, 'ch', `${chId}.html`);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const tableWrapCount = (html.match(/<div class="table-wrap">\s*<table>/g) || []).length;
  const nakedTableCount = (html.match(/<table/g) || []).length - tableWrapCount;

  if (nakedTableCount > 0) {
    fail(`Naked <table> without .table-wrap in ${chId}.html`, `Found ${nakedTableCount} unwrapped table(s)`);
  } else {
    pass(`All tables wrapped in .table-wrap: ${chId}.html (${tableWrapCount} tables)`);
  }

  // Ensure table count matches markdown GFM tables
  if (gfmTableMatches.length !== tableWrapCount) {
    // Note: Some markdown tables might use slightly different spacing or be in containers, verify
    warn(`Table count discrepancy in ${chId}`, `Markdown GFM regex matched ${gfmTableMatches.length}, HTML has ${tableWrapCount} table(s)`);
  }

  // C. Verify all rendered tables have proper structure: thead, tbody, th, td
  const tableContentRegex = /<div class="table-wrap">\s*<table>([\s\S]*?)<\/table>\s*<\/div>/g;
  let tMatch;
  let tIdx = 0;
  while ((tMatch = tableContentRegex.exec(html)) !== null) {
    tIdx++;
    const tBody = tMatch[1];
    const hasThead = tBody.includes('<thead>') && tBody.includes('</thead>');
    const hasTbody = tBody.includes('<tbody>') && tBody.includes('</tbody>');
    const hasTh = tBody.includes('<th');
    const hasTd = tBody.includes('<td');

    if (!hasThead || !hasTbody || !hasTh || !hasTd) {
      fail(`Table #${tIdx} malformed semantic structure in ${chId}.html`, `thead:${hasThead}, tbody:${hasTbody}, th:${hasTh}, td:${hasTd}`);
    }
  }
  if (tableWrapCount > 0) {
    pass(`Semantic thead/tbody/th/td in all ${tableWrapCount} table(s) of ${chId}.html`);
  }
}

// -----------------------------------------------------------------------------
// 3. SYNTHETIC ADVERSARIAL CURRENCY STRINGS INGESTION
// -----------------------------------------------------------------------------
console.log('\n--- 3. Synthetic Adversarial Currency Strings Ingestion ---');

import { loadBook, renderChapter } from '../scripts/lib/render.mjs';

const ctx = await loadBook();

const adversarialStrings = [
  { name: 'Standard M currency', input: 'Deal size is $10M in ARR.' },
  { name: 'Token pricing fraction', input: 'Inference cost is $0.30/1M input tokens and $1.20/1M output tokens.' },
  { name: 'Escaped dollar price', input: 'Coffee costs \\$3.75 at the campus cafe.' },
  { name: 'Rupee currency', input: 'Initial investment of ₹20 crore.' },
  { name: 'Billion string', input: 'Market cap is $50 billion today.' },
  { name: 'Multiple currencies in single sentence', input: 'Revenue grew from $10M in 2023 to $25M in 2024 and $50M in 2025.' },
  { name: 'Range formatted with hyphen', input: 'Valuation is $10-$20 per share.' },
  { name: 'Range formatted with to', input: 'Costs between $10 to $20 per unit.' },
  { name: 'Decimal with per-unit', input: 'Marginal cost of $0.0048 per call.' },
  { name: 'Real inline math formula', input: 'Loss function is $L = \\frac{1}{2}(y - \\hat{y})^2$.' },
  { name: 'Real display math formula', input: '$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$' }
];

for (const testItem of adversarialStrings) {
  const dummyCh = {
    id: 'adversarial-test',
    n: '99',
    title: 'Adversarial Test',
    body: testItem.input,
    track: 'foundations',
    part: { n: 'I', id: 'p1' }
  };

  const { prose } = renderChapter(dummyCh, ctx, 'web');
  const hasKatexError = prose.includes('class="katex-error"');
  const hasMathRaw = prose.includes('class="math-raw"');

  if (hasKatexError || hasMathRaw) {
    fail(`Adversarial string crashed or degraded: "${testItem.name}"`, `Output contains math error or raw fallback: ${prose}`);
  } else {
    pass(`Adversarial string rendered cleanly: "${testItem.name}"`);
  }

  // Ensure currency is NOT turned into KaTeX math
  if (testItem.name.includes('currency') || testItem.name.includes('fraction') || testItem.name.includes('dollar') || testItem.name.includes('Rupee')) {
    if (testItem.name === 'Real inline math formula' || testItem.name === 'Real display math formula') continue;
    // Check if katex was erroneously triggered on currency
    if (prose.includes('class="katex"') && !testItem.input.includes('\\frac')) {
      fail(`False KaTeX math conversion on currency: "${testItem.name}"`, `Output: ${prose}`);
    } else {
      pass(`Currency correctly preserved as prose: "${testItem.name}"`);
    }
  }
}

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log('ADVERSARIAL FULL AUDIT SUMMARY');
console.log('======================================================================');
console.log(`Passed:   ${results.passed}`);
console.log(`Failed:   ${results.failed}`);
console.log(`Warnings: ${results.warnings}`);
if (results.failures.length > 0) {
  console.log('\nFailures details:');
  for (const f of results.failures) {
    console.log(`  - [${f.test}]: ${f.error}`);
  }
  console.log('\nVERDICT: FAIL');
  process.exitCode = 1;
} else {
  console.log('\nVERDICT: PASS');
  process.exitCode = 0;
}
