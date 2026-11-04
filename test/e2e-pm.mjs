#!/usr/bin/env node
// test/e2e-pm.mjs
// Comprehensive Opaque-Box E2E Test Suite for INFERENCE v3 Product Management (PM) Track
// 
// Methodology: 4-Tier Test Architecture
// - Tier 1: Feature Coverage (F01–F12 verification across M1–M4)
// - Tier 2: Boundary & Corner Cases (pedagogical density invariants, escaped HTML tag leak prevention, math syntax)
// - Tier 3: Cross-Feature Combinations & Referential Integrity (sources, glossary, figures, TOC, tracks)
// - Tier 4: Real-World Workload & Compilation (linter check, HTML/CSS build, PDF generation)
//
// Usage:
//   node test/e2e-pm.mjs                    # Run complete 4-tier E2E suite
//   node test/e2e-pm.mjs --tier=1           # Run only Tier 1 (Feature Coverage)
//   node test/e2e-pm.mjs --tier=1,2         # Run Tiers 1 and 2
//   node test/e2e-pm.mjs --milestone=M1     # Run only Milestone 1 tests
//   node test/e2e-pm.mjs --progressive      # Progressive mode: unreached milestones marked PENDING
//   node test/e2e-pm.mjs --json             # Output structured JSON results
//   node test/e2e-pm.mjs --bail             # Stop on first assertion failure

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import * as yaml from 'js-yaml';
import matter from 'gray-matter';

// ---------------------------------------------------------------- Constants & Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..');

const PM_SOURCES = [
  'openai-evals-framework',
  'anthropic-context-caching',
  'anthropic-prompt-engineering-interactive',
  'google-gemini-long-context',
  'cagan-transformed-ai',
  'cagan-svpg-ai-risk',
  'zheng-judging-llm-as-judge',
  'card-moran-newell-psychology-hci'
];

const PM_GLOSSARY_TERMS = [
  'eval-harness',
  'synthetic-evals',
  'latency-budget',
  'context-caching',
  'model-routing',
  'agentic-ux'
];

const PM_CHAPTER_IDS = [
  'ai-product-lifecycle',
  'product-architecture-economics',
  'agentic-ux-and-interfaces',
  'product-casebook'
];

const PM_FIGURES = [
  'ai-product-lifecycle.svg',
  'product-architecture-economics.svg',
  'agentic-ux-and-interfaces.svg',
  'product-casebook.svg'
];

const BANNED_AI_TROPES = [
  /\bin today'?s (?:fast-paced|rapidly evolving|digital) world\b/i,
  /\bdelve(?:s|d)? into\b/i,
  /\ba testament to\b/i,
  /\bbeacon of\b/i,
  /\btapestry of\b/i,
  /\bgame-?changer\b/i,
  /\bplethora of\b/i,
  /\bit is (?:important|crucial|essential) to remember that\b/i,
  /\bnot only .* but also\b/i,
  /\bseamlessly integrat(?:e|es|ed|ing)\b/i
];

// ---------------------------------------------------------------- CLI Option Parsing
const args = process.argv.slice(2);
const options = {
  tiers: null,         // Set of numbers e.g. new Set([1, 2])
  milestone: null,     // string e.g. 'M1', 'M2', 'M3', 'M4'
  progressive: false,  // boolean
  json: false,         // boolean
  bail: false,         // boolean
  verbose: false       // boolean
};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    const raw = arg.split('=')[1];
    options.tiers = new Set(raw.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n)));
  } else if (arg === '-t' && args[args.indexOf(arg) + 1]) {
    const raw = args[args.indexOf(arg) + 1];
    options.tiers = new Set(raw.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n)));
  } else if (arg.startsWith('--milestone=') || arg.startsWith('-m=')) {
    options.milestone = arg.split('=')[1].toUpperCase();
  } else if ((arg === '-m' || arg === '--milestone') && args[args.indexOf(arg) + 1]) {
    options.milestone = args[args.indexOf(arg) + 1].toUpperCase();
  } else if (arg === '--progressive') {
    options.progressive = true;
  } else if (arg === '--json') {
    options.json = true;
  } else if (arg === '--bail') {
    options.bail = true;
  } else if (arg === '--verbose' || arg === '-v') {
    options.verbose = true;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
INFERENCE v3 Product Management Track — E2E Test Suite Runner
Usage: node test/e2e-pm.mjs [options]

Options:
  --tier=<1,2,3,4>     Filter tests by tier (comma-separated or single)
  --milestone=<M1..M4> Filter tests by milestone tag
  --progressive        Progressive gating: unreached milestones reported as PENDING
  --json               Output test results as structured JSON
  --bail               Halt immediately on first test failure
  --verbose, -v        Print extended diagnostic details
  --help, -h           Show this help message
`);
}

// ---------------------------------------------------------------- ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const c = options.json
  ? Object.fromEntries(Object.keys(colors).map((k) => [k, '']))
  : colors;

// ---------------------------------------------------------------- Test Harness State
const suiteState = {
  tests: [],
  startTime: Date.now(),
  passed: 0,
  failed: 0,
  pending: 0
};

const registeredQueue = [];

/**
 * Register a test case definition to be executed by runSuite.
 * @param {object} def
 *   id: string (e.g. 'T1.1')
 *   tier: number (1..4)
 *   milestone: string ('M1'..'M4')
 *   feature: string (e.g. 'F01')
 *   title: string
 *   fn: async function(assert)
 */
function testCase(def) {
  registeredQueue.push(def);
}

async function executeTestCase(def) {
  // Check tier filter
  if (options.tiers && !options.tiers.has(def.tier)) return;
  // Check milestone filter
  if (options.milestone && def.milestone !== options.milestone) return;

  const testRecord = {
    id: def.id,
    tier: def.tier,
    milestone: def.milestone,
    feature: def.feature,
    title: def.title,
    status: 'UNKNOWN',
    durationMs: 0,
    errors: [],
    pendingReason: null
  };

  const start = Date.now();

  const assert = {
    ok(condition, message) {
      if (!condition) {
        throw new Error(message || 'Assertion failed (expected truthy condition)');
      }
    },
    equal(actual, expected, message) {
      if (actual !== expected) {
        throw new Error(`${message || 'Assertion failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      }
    },
    deepEqual(actual, expected, message) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) {
        throw new Error(`${message || 'Assertion failed'}: expected ${e}, got ${a}`);
      }
    },
    match(str, regex, message) {
      if (!regex.test(str)) {
        throw new Error(`${message || 'Regex match failed'}: "${str}" does not match ${regex}`);
      }
    },
    notMatch(str, regex, message) {
      if (regex.test(str)) {
        throw new Error(`${message || 'Regex unexpected match'}: "${str}" unexpectedly matched ${regex}`);
      }
    },
    pending(reason) {
      const err = new Error(reason || 'Test pending prerequisite completion');
      err.isPending = true;
      throw err;
    }
  };

  try {
    await def.fn(assert);
    testRecord.status = 'PASSED';
    suiteState.passed++;
  } catch (err) {
    if (err.isPending && options.progressive) {
      testRecord.status = 'PENDING';
      testRecord.pendingReason = err.message;
      suiteState.pending++;
    } else {
      testRecord.status = 'FAILED';
      testRecord.errors.push(err.message || String(err));
      suiteState.failed++;
    }
  }

  testRecord.durationMs = Date.now() - start;
  suiteState.tests.push(testRecord);

  if (!options.json) {
    printTestResult(testRecord);
  }

  if (testRecord.status === 'FAILED' && options.bail) {
    if (!options.json) {
      console.log(`\n${c.red}${c.bold}Execution halted (--bail specified)${c.reset}`);
    }
    summarizeAndExit();
  }
}

function printTestResult(t) {
  let badge;
  if (t.status === 'PASSED') {
    badge = `${c.green}✔ PASS${c.reset}`;
  } else if (t.status === 'PENDING') {
    badge = `${c.yellow}○ PEND${c.reset}`;
  } else {
    badge = `${c.red}✖ FAIL${c.reset}`;
  }

  const meta = `${c.dim}[${t.id} | Tier ${t.tier} | ${t.milestone} | ${t.feature}]${c.reset}`;
  console.log(`  ${badge} ${meta} ${t.title} ${c.dim}(${t.durationMs}ms)${c.reset}`);

  if (t.status === 'FAILED') {
    for (const e of t.errors) {
      console.log(`         ${c.red}↳ Error: ${e}${c.reset}`);
    }
  } else if (t.status === 'PENDING') {
    console.log(`         ${c.yellow}↳ Pending: ${t.pendingReason}${c.reset}`);
  }
}

// ---------------------------------------------------------------- Helper Functions
function readYamlSafe(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    return yaml.load(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    throw new Error(`YAML parse error in ${relPath}: ${e.message}`);
  }
}

function readChapterSafe(chapterId) {
  const full = path.join(ROOT, 'content', 'chapters', `${chapterId}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  return {
    fullPath: full,
    raw,
    data: parsed.data,
    body: parsed.content
  };
}

// ============================================================================
// TIER 1: FEATURE COVERAGE (F01–F12 across Milestones M1–M4)
// ============================================================================

// F01: Primary Sources Ingestion
testCase({
  id: 'T1.1',
  tier: 1,
  milestone: 'M1',
  feature: 'F01',
  title: 'Canonical PM Primary Sources Ingestion in content/sources.yml',
  fn: async (assert) => {
    const sources = readYamlSafe('content/sources.yml');
    assert.ok(sources, 'content/sources.yml must exist and be valid YAML');

    for (const id of PM_SOURCES) {
      assert.ok(sources[id], `PM source "${id}" must exist in content/sources.yml`);
      const s = sources[id];
      assert.ok(s.type, `Source "${id}" missing required field "type"`);
      assert.ok(['paper', 'article', 'book', 'report', 'video', 'podcast'].includes(s.type), `Source "${id}" has invalid type "${s.type}"`);
      assert.ok(s.title && s.title.trim().length > 0, `Source "${id}" missing "title"`);
      assert.ok(s.creator && s.creator.trim().length > 0, `Source "${id}" missing "creator"`);
      assert.ok(s.publisher && s.publisher.trim().length > 0, `Source "${id}" missing "publisher"`);
      assert.ok(typeof s.year === 'number' && s.year >= 1980 && s.year <= 2030, `Source "${id}" year must be valid number, got ${s.year}`);
      assert.ok(s.url && /^https?:\/\//.test(s.url), `Source "${id}" must have valid HTTP/HTTPS URL, got "${s.url}"`);
      assert.ok(['A', 'B'].includes(s.tier), `Source "${id}" tier must be A or B, got "${s.tier}"`);
      assert.ok(s.why && s.why.trim().length > 10, `Source "${id}" missing descriptive "why" annotation`);
    }

    // Specific authority checks
    assert.equal(sources['openai-evals-framework'].tier, 'A', 'OpenAI Evals must be Tier A');
    assert.equal(sources['anthropic-context-caching'].tier, 'A', 'Anthropic Context Caching must be Tier A');
    assert.equal(sources['google-gemini-long-context'].tier, 'A', 'Gemini Long-Context must be Tier A');
    assert.equal(sources['cagan-transformed-ai'].tier, 'B', 'Marty Cagan Transformed must be Tier B');
  }
});

// F02: Domain Policy Allowlist
testCase({
  id: 'T1.2',
  tier: 1,
  milestone: 'M1',
  feature: 'F02',
  title: 'Domain Policy Allowlist in content/source-policy.yml',
  fn: async (assert) => {
    const policy = readYamlSafe('content/source-policy.yml');
    assert.ok(policy, 'content/source-policy.yml must exist');
    assert.ok(Array.isArray(policy.B), 'policy.B must be an array');
    assert.ok(policy.B.includes('svpg.com'), 'svpg.com must be registered under Tier B in source-policy.yml');
    
    // Check taylorfrancis.com under Tier A
    assert.ok(Array.isArray(policy.A), 'policy.A must be an array');
    assert.ok(policy.A.includes('taylorfrancis.com'), 'taylorfrancis.com must be registered under Tier A in source-policy.yml');
  }
});

// F03: Technical Glossary Ingestion
testCase({
  id: 'T1.3',
  tier: 1,
  milestone: 'M1',
  feature: 'F03',
  title: 'PM Glossary Ingestion in content/glossary.yml',
  fn: async (assert) => {
    const glossary = readYamlSafe('content/glossary.yml');
    assert.ok(glossary, 'content/glossary.yml must exist');

    for (const termId of PM_GLOSSARY_TERMS) {
      assert.ok(glossary[termId], `PM term "${termId}" must exist in content/glossary.yml`);
      const g = glossary[termId];
      assert.ok(g.term && g.term.trim().length > 0, `Glossary "${termId}" missing term string`);
      assert.ok(g.def && g.def.trim().length >= 25, `Glossary "${termId}" definition must be informative (>=25 chars)`);
    }
  }
});

// F04: TOC Part V Insertion & Part VI Reorganization
testCase({
  id: 'T1.4',
  tier: 1,
  milestone: 'M1',
  feature: 'F04',
  title: 'TOC Part V (Product Management) and Part VI (Inserts) Structure',
  fn: async (assert) => {
    const toc = readYamlSafe('content/toc.yml');
    assert.ok(toc && Array.isArray(toc.parts), 'content/toc.yml must define parts array');

    const p5 = toc.parts.find((p) => p.id === 'p5');
    assert.ok(p5, 'Part with id "p5" must exist in toc.yml');
    assert.equal(p5.n, 'V', 'Part p5 must have numeral n: "V"');
    assert.equal(p5.title, 'Product Management', 'Part p5 title must be "Product Management"');
    assert.equal(p5.track, 'product', 'Part p5 track must be "product"');
    assert.ok(Array.isArray(p5.chapters), 'Part p5 must define chapters array');
    assert.equal(p5.chapters.length, 4, 'Part p5 must contain exactly 4 chapters');

    const chapterIds = p5.chapters.map((c) => c.id);
    assert.deepEqual(chapterIds, PM_CHAPTER_IDS, 'Part p5 chapter IDs must match expected 4 PM chapters in order');

    // Check Part VI shifted
    const p6 = toc.parts.find((p) => p.id === 'p6');
    assert.ok(p6, 'Part with id "p6" must exist in toc.yml');
    assert.equal(p6.n, 'VI', 'Part p6 must have numeral n: "VI"');
    assert.equal(p6.title, 'Inserts', 'Part p6 title must be "Inserts"');
  }
});

// F05: Book Configuration & Edition Bump
testCase({
  id: 'T1.5',
  tier: 1,
  milestone: 'M1',
  feature: 'F05',
  title: 'Book Config Edition Bump in book.yml',
  fn: async (assert) => {
    const book = readYamlSafe('book.yml');
    assert.ok(book, 'book.yml must exist');
    assert.equal(book.edition, '2027 · Draft 0.3 (Product Track)', 'book.yml edition must be bumped to "2027 · Draft 0.3 (Product Track)"');
    assert.ok(Array.isArray(book.tracks), 'book.yml tracks must be an array');
    const productTrack = book.tracks.find((t) => t.id === 'product');
    assert.ok(productTrack, 'book.yml tracks must include product track');
    assert.equal(productTrack.name, 'Product', 'Product track name must be "Product"');
  }
});

// F06: Chapter 18 Authoring
testCase({
  id: 'T1.6',
  tier: 1,
  milestone: 'M2',
  feature: 'F06',
  title: 'Chapter 18 (ai-product-lifecycle.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('ai-product-lifecycle');
    if (!ch) assert.pending('content/chapters/ai-product-lifecycle.md not authored yet (M2)');

    assert.equal(ch.data.id, 'ai-product-lifecycle', 'Frontmatter id must be "ai-product-lifecycle"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 18 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 18 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('product'), 'Chapter 18 tracks must include "product"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 18 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 18 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 18 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F07: Chapter 19 Authoring
testCase({
  id: 'T1.7',
  tier: 1,
  milestone: 'M2',
  feature: 'F07',
  title: 'Chapter 19 (product-architecture-economics.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('product-architecture-economics');
    if (!ch) assert.pending('content/chapters/product-architecture-economics.md not authored yet (M2)');

    assert.equal(ch.data.id, 'product-architecture-economics', 'Frontmatter id must be "product-architecture-economics"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 19 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 19 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('product'), 'Chapter 19 tracks must include "product"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 19 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 19 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 19 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F08: Chapter 20 Authoring
testCase({
  id: 'T1.8',
  tier: 1,
  milestone: 'M3',
  feature: 'F08',
  title: 'Chapter 20 (agentic-ux-and-interfaces.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('agentic-ux-and-interfaces');
    if (!ch) assert.pending('content/chapters/agentic-ux-and-interfaces.md not authored yet (M3)');

    assert.equal(ch.data.id, 'agentic-ux-and-interfaces', 'Frontmatter id must be "agentic-ux-and-interfaces"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 20 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 20 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('product'), 'Chapter 20 tracks must include "product"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 20 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 20 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 20 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F09: Chapter 21 Authoring & 8 Quantitative Cases
testCase({
  id: 'T1.9',
  tier: 1,
  milestone: 'M3',
  feature: 'F09',
  title: 'Chapter 21 (product-casebook.md) and 8 Quantitative Cases & Guesstimates',
  fn: async (assert) => {
    const ch = readChapterSafe('product-casebook');
    if (!ch) assert.pending('content/chapters/product-casebook.md not authored yet (M3)');

    assert.equal(ch.data.id, 'product-casebook', 'Frontmatter id must be "product-casebook"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 21 missing title');

    // Casebook must contain cases and quantitative estimations
    const cases = (ch.body.match(/:::\s*case\b/g) || []).length;
    assert.ok(cases >= 4, `Chapter 21 must contain at least 4 detailed strategic cases, found ${cases}`);

    // Check presence of quantitative calculations (math / currency / metrics)
    const hasKaTeX = /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(ch.body);
    assert.ok(hasKaTeX, 'Chapter 21 must contain KaTeX quantitative formulas');
  }
});

// F10: Accompanying SVG Figures
testCase({
  id: 'T1.10',
  tier: 1,
  milestone: 'M2',
  feature: 'F10',
  title: 'Accompanying SVG Figures in content/figures/',
  fn: async (assert) => {
    let missing = 0;
    for (const fig of PM_FIGURES) {
      const p = path.join(ROOT, 'content', 'figures', fig);
      if (!fs.existsSync(p)) {
        missing++;
      } else {
        const content = fs.readFileSync(p, 'utf8');
        assert.ok(content.includes('<svg'), `Figure "${fig}" must contain valid SVG root`);
      }
    }
    if (missing > 0) {
      assert.pending(`${missing} of 4 PM SVG figures not authored yet (M2/M3)`);
    }
  }
});

// F11: Editorial & Linter Gate
testCase({
  id: 'T1.11',
  tier: 1,
  milestone: 'M4',
  feature: 'F11',
  title: 'Offline Referential Linter (scripts/check.mjs) Passes with 0 Errors',
  fn: async (assert) => {
    try {
      const stdout = execSync('node scripts/check.mjs', { cwd: ROOT, encoding: 'utf8' });
      assert.ok(stdout.includes('0 errors'), 'scripts/check.mjs must pass with 0 errors');
    } catch (err) {
      throw new Error(`scripts/check.mjs failed with exit code ${err.status}:\n${err.stdout || err.stderr}`);
    }
  }
});

// F12: Release Packaging Readiness
testCase({
  id: 'T1.12',
  tier: 1,
  milestone: 'M4',
  feature: 'F12',
  title: 'Release Packaging & Draft PDF Publication in editions/',
  fn: async (assert) => {
    const pdfPath = path.join(ROOT, 'editions', 'INFERENCE-v3-product-draft.pdf');
    const statusPath = path.join(ROOT, 'STATUS.md');

    assert.ok(fs.existsSync(statusPath), 'STATUS.md must exist');
    const statusContent = fs.readFileSync(statusPath, 'utf8');
    if (!/Draft 0\.3|Product Track|Part V/i.test(statusContent)) {
      assert.pending('STATUS.md has not been updated for v3 Product Track yet (M4 release)');
    }

    if (!fs.existsSync(pdfPath)) {
      assert.pending('editions/INFERENCE-v3-product-draft.pdf not published yet (M4 release milestone)');
    }

    const stat = fs.statSync(pdfPath);
    assert.ok(stat.size > 200000, `INFERENCE-v3-product-draft.pdf size (${stat.size} bytes) must exceed 200KB`);
  }
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES (Pedagogy, Invariants & Syntax)
// ============================================================================

for (const chId of PM_CHAPTER_IDS) {
  testCase({
    id: `T2.1-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Boundary: Highlights count [4..8] in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const highlights = (ch.body.match(/==[^=]+==/g) || []).length;
      assert.ok(
        highlights >= 4 && highlights <= 8,
        `Chapter ${chId} must contain 4–8 highlights (==...==) for Mayer signaling, found ${highlights}`
      );
    }
  });

  testCase({
    id: `T2.2-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Boundary: Stat block count [exactly 1] in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const stats = (ch.body.match(/:::\s*stat\b/g) || []).length;
      assert.equal(stats, 1, `Chapter ${chId} must contain exactly 1 "::: stat" block, found ${stats}`);
    }
  });

  testCase({
    id: `T2.3-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Boundary: Media cards count [1..3] in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const mediaCards = (ch.body.match(/^\{\{\s*(watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/gm) || []).length;
      assert.ok(
        mediaCards >= 1 && mediaCards <= 3,
        `Chapter ${chId} must contain 1–3 media cards ({{read/paper/watch/listen ...}}), found ${mediaCards}`
      );
    }
  });

  testCase({
    id: `T2.4-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Boundary: Check questions count [4..6] & inverted answers in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      assert.ok(/:::\s*check\b/.test(ch.body), `Chapter ${chId} missing "::: check" block`);
      assert.ok(/:::\s*answers\b/.test(ch.body), `Chapter ${chId} missing "::: answers" block`);

      const questions = (ch.body.match(/<span\s+class="lvl">(?:recall|apply|explain|transfer|judge)<\/span>/g) || []).length;
      assert.ok(
        questions >= 4 && questions <= 6,
        `Chapter ${chId} must have 4–6 check questions ending with <span class="lvl">...</span>, found ${questions}`
      );
    }
  });

  testCase({
    id: `T2.5-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Boundary: Night-before recap [exactly 5 numbered lines] in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const match = ch.body.match(/:::\s*recap[^\n]*\n([\s\S]*?)\n:::/);
      assert.ok(match, `Chapter ${chId} missing "::: recap The night-before page" block`);

      const lines = match[1].split('\n').filter((l) => /^\s*\d+\.\s+/.test(l));
      assert.equal(lines.length, 5, `Recap block in ${chId} must contain exactly 5 numbered lines, found ${lines.length}`);
    }
  });

  testCase({
    id: `T2.6-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Escaped HTML tag leak prevention in rendered prose for ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      // Dynamic import of render module
      const { loadBook, renderChapter } = await import('../scripts/lib/render.mjs');
      const ctx = await loadBook();
      const targetChapter = ctx.chapters.find((x) => x.id === chId);
      assert.ok(targetChapter, `Chapter ${chId} must be loaded in book context`);

      const rendered = renderChapter(targetChapter, ctx, 'print');
      assert.equal(rendered.problems.length, 0, `Render problems encountered in ${chId}: ${rendered.problems.join('; ')}`);

      // Check for escaped HTML tag leakage
      const textWithoutCode = rendered.html.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
      assert.notMatch(
        textWithoutCode,
        /&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/,
        `Escaped HTML tag leak detected in rendered prose for chapter ${chId}`
      );
    }
  });

  testCase({
    id: `T2.7-${chId}`,
    tier: 2,
    milestone: chId.includes('lifecycle') || chId.includes('economics') ? 'M2' : 'M3',
    feature: 'F06-F09',
    title: `Anti-AI Writing Style Guard in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      for (const regex of BANNED_AI_TROPES) {
        assert.notMatch(ch.body, regex, `Found forbidden AI cliché (${regex}) in ${chId}.md`);
      }
    }
  });
}

// ============================================================================
// TIER 3: CROSS-FEATURE COMBINATIONS & REFERENTIAL INTEGRITY
// ============================================================================

testCase({
  id: 'T3.1',
  tier: 3,
  milestone: 'M2',
  feature: 'F01/F06-F09',
  title: 'Citation ↔ Source Registry Bidirectional Integrity',
  fn: async (assert) => {
    const sources = readYamlSafe('content/sources.yml');
    assert.ok(sources, 'content/sources.yml must exist');

    let authoredCount = 0;
    const citedInPM = new Set();

    for (const chId of PM_CHAPTER_IDS) {
      const ch = readChapterSafe(chId);
      if (ch) {
        authoredCount++;
        // Citations [@source-id]
        const inlineCites = ch.body.match(/\[@([\w-]+)\]/g) || [];
        for (const c of inlineCites) {
          const sId = c.slice(2, -1);
          assert.ok(sources[sId], `Citation [@${sId}] in ${chId}.md does not exist in content/sources.yml`);
          citedInPM.add(sId);
        }
        // Media cards {{... id}}
        const mediaCards = ch.body.match(/^\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/gm) || [];
        for (const m of mediaCards) {
          const sId = m.replace(/^\{\{\s*\w+\s+/, '').replace(/\s*\}\}$/, '').trim();
          assert.ok(sources[sId], `Media card source "${sId}" in ${chId}.md does not exist in content/sources.yml`);
          citedInPM.add(sId);
        }
      }
    }

    if (authoredCount === 0) {
      assert.pending('PM chapters not authored yet (M2/M3)');
    }

    if (authoredCount === 4) {
      // Once all chapters are written, verify all 8 PM sources are cited
      for (const sId of PM_SOURCES) {
        assert.ok(citedInPM.has(sId), `Canonical PM source "${sId}" is registered but never cited across PM chapters`);
      }
    }
  }
});

testCase({
  id: 'T3.2',
  tier: 3,
  milestone: 'M2',
  feature: 'F03/F06-F09',
  title: 'Glossary Link ↔ Glossary Registry Bidirectional Integrity',
  fn: async (assert) => {
    const glossary = readYamlSafe('content/glossary.yml');
    assert.ok(glossary, 'content/glossary.yml must exist');

    let authoredCount = 0;
    const termsInPM = new Set();

    for (const chId of PM_CHAPTER_IDS) {
      const ch = readChapterSafe(chId);
      if (ch) {
        authoredCount++;
        const matches = ch.body.match(/\[\[([\w-]+)(?:\|[^\]]+)?\]\]/g) || [];
        for (const m of matches) {
          const termId = m.slice(2, -2).split('|')[0].trim();
          assert.ok(glossary[termId], `Glossary reference [[${termId}]] in ${chId}.md does not exist in content/glossary.yml`);
          termsInPM.add(termId);
        }
      }
    }

    if (authoredCount === 0) {
      assert.pending('PM chapters not authored yet (M2/M3)');
    }

    if (authoredCount === 4) {
      for (const termId of PM_GLOSSARY_TERMS) {
        assert.ok(termsInPM.has(termId), `PM glossary term "${termId}" is defined but never linked in PM chapters`);
      }
    }
  }
});

testCase({
  id: 'T3.3',
  tier: 3,
  milestone: 'M2',
  feature: 'F10/F06-F09',
  title: 'Figure Embeds ↔ Figure Asset Filesystem Integrity',
  fn: async (assert) => {
    let authoredCount = 0;
    for (const chId of PM_CHAPTER_IDS) {
      const ch = readChapterSafe(chId);
      if (ch) {
        authoredCount++;
        const figures = ch.body.match(/^\{\{\s*(?:figure|figure-wide)\s+([^}]+)\}\}/gm) || [];
        for (const f of figures) {
          const raw = f.replace(/^\{\{\s*(?:figure|figure-wide)\s+/, '').replace(/\s*\}\}$/, '');
          const figId = raw.split('|')[0].trim();
          const svgPath = path.join(ROOT, 'content', 'figures', `${figId}.svg`);
          assert.ok(fs.existsSync(svgPath), `Figure "${figId}" referenced in ${chId}.md does not exist at content/figures/${figId}.svg`);
        }
      }
    }

    if (authoredCount === 0) {
      assert.pending('PM chapters not authored yet (M2/M3)');
    }
  }
});

testCase({
  id: 'T3.4',
  tier: 3,
  milestone: 'M1',
  feature: 'F04/F05',
  title: 'Chapter Numbering Propagation & Auto-Increment Sequence',
  fn: async (assert) => {
    const { loadBook } = await import('../scripts/lib/render.mjs');
    const ctx = await loadBook();

    // Verify Chapter 17 is marketing-casebook
    const ch17 = ctx.chapters.find((c) => c.n === '17');
    assert.ok(ch17, 'Chapter 17 must exist');
    assert.equal(ch17.id, 'marketing-casebook', 'Chapter 17 must be marketing-casebook');

    // Verify Chapters 18–21 exist in sequential order
    const pmChapters = ctx.chapters.filter((c) => PM_CHAPTER_IDS.includes(c.id));
    assert.equal(pmChapters.length, 4, 'Must load all 4 PM chapters in context');

    assert.equal(pmChapters[0].n, '18', 'ai-product-lifecycle must be Chapter 18');
    assert.equal(pmChapters[1].n, '19', 'product-architecture-economics must be Chapter 19');
    assert.equal(pmChapters[2].n, '20', 'agentic-ux-and-interfaces must be Chapter 20');
    assert.equal(pmChapters[3].n, '21', 'product-casebook must be Chapter 21');

    // Verify Inserts retain A and B
    const insertA = ctx.chapters.find((c) => c.id === 'state-of-play');
    assert.ok(insertA, 'state-of-play insert must exist');
    assert.equal(insertA.n, 'A', 'state-of-play must maintain chapter letter A');

    const insertB = ctx.chapters.find((c) => c.id === 'india-briefing');
    assert.ok(insertB, 'india-briefing insert must exist');
    assert.equal(insertB.n, 'B', 'india-briefing must maintain chapter letter B');
  }
});

// ============================================================================
// TIER 4: REAL-WORLD COMPILATION & WORKLOAD (Build & PDF Pipeline)
// ============================================================================

testCase({
  id: 'T4.1',
  tier: 4,
  milestone: 'M4',
  feature: 'F11',
  title: 'HTML & CSS Compilation via scripts/build.mjs',
  fn: async (assert) => {
    try {
      execSync('node scripts/build.mjs', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
    } catch (err) {
      throw new Error(`Build failed:\n${err.stdout || err.stderr}`);
    }

    const distIndex = path.join(ROOT, 'dist', 'index.html');
    const distPrint = path.join(ROOT, 'dist', 'print.html');

    assert.ok(fs.existsSync(distIndex), 'dist/index.html must be generated');
    assert.ok(fs.existsSync(distPrint), 'dist/print.html must be generated');

    const indexHtml = fs.readFileSync(distIndex, 'utf8');
    assert.ok(indexHtml.includes('Product Management'), 'dist/index.html must contain "Product Management"');
  }
});

testCase({
  id: 'T4.2',
  tier: 4,
  milestone: 'M4',
  feature: 'F12',
  title: 'v3 PDF Edition Generation & Layout Validation',
  fn: async (assert) => {
    const pdfPath = path.join(ROOT, 'editions', 'INFERENCE-v3-product-draft.pdf');

    if (!fs.existsSync(pdfPath)) {
      assert.pending('editions/INFERENCE-v3-product-draft.pdf not compiled yet (M4 release milestone)');
    }

    const stat = fs.statSync(pdfPath);
    assert.ok(stat.size > 200000, `Generated PDF (${stat.size} bytes) must exceed 200KB`);

    // Verify PDF Magic Bytes %PDF
    const fd = fs.openSync(pdfPath, 'r');
    const buf = Buffer.alloc(4);
    fs.readSync(fd, buf, 0, 4, 0);
    fs.closeSync(fd);
    assert.equal(buf.toString('utf8'), '%PDF', 'PDF file must begin with %PDF header');
  }
});

async function runSuite() {
  for (const def of registeredQueue) {
    await executeTestCase(def);
  }
  summarizeAndExit();
}

runSuite().catch((err) => {
  console.error('Fatal test suite crash:', err);
  process.exit(1);
});

function summarizeAndExit() {
  const total = suiteState.tests.length;
  const durationSec = ((Date.now() - suiteState.startTime) / 1000).toFixed(2);

  if (options.json) {
    const resultObj = {
      timestamp: new Date().toISOString(),
      durationSeconds: parseFloat(durationSec),
      total,
      passed: suiteState.passed,
      failed: suiteState.failed,
      pending: suiteState.pending,
      success: suiteState.failed === 0,
      tests: suiteState.tests
    };
    console.log(JSON.stringify(resultObj, null, 2));
    process.exit(suiteState.failed === 0 ? 0 : 1);
  }

  console.log(`\n${c.bold}═════════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`${c.bold}E2E Test Suite Summary: INFERENCE v3 Product Management Track${c.reset}`);
  console.log(`${c.bold}═════════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`  Total Executed : ${c.bold}${total}${c.reset}`);
  console.log(`  Passed         : ${c.green}${c.bold}${suiteState.passed}${c.reset}`);
  console.log(`  Failed         : ${suiteState.failed > 0 ? c.red : c.dim}${c.bold}${suiteState.failed}${c.reset}`);
  console.log(`  Pending        : ${suiteState.pending > 0 ? c.yellow : c.dim}${c.bold}${suiteState.pending}${c.reset}`);
  console.log(`  Duration       : ${durationSec}s`);
  console.log(`═════════════════════════════════════════════════════════════════════`);

  if (suiteState.failed === 0) {
    if (suiteState.pending > 0) {
      console.log(`${c.yellow}${c.bold}✔ ALL ACTIVE TESTS PASSED (${suiteState.pending} tests pending downstream milestones)${c.reset}\n`);
    } else {
      console.log(`${c.green}${c.bold}✔ ALL TESTS PASSED (100% Milestone Completion)${c.reset}\n`);
    }
    process.exit(0);
  } else {
    console.log(`${c.red}${c.bold}✖ TEST SUITE FAILED WITH ${suiteState.failed} FAILURE(S)${c.reset}\n`);
    process.exit(1);
  }
}
