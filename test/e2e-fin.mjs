#!/usr/bin/env node
// test/e2e-fin.mjs
// Comprehensive Opaque-Box E2E Test Suite for INFERENCE v4 Finance & Banking (FIN) Track
// 
// Methodology: 4-Tier Test Architecture
// - Tier 1: Feature Coverage (F01–F12 verification across M1–M4)
// - Tier 2: Boundary & Corner Cases (pedagogical density invariants, escaped HTML tag leak prevention, math syntax)
// - Tier 3: Cross-Feature Combinations & Referential Integrity (sources, glossary, figures, TOC, tracks, numbering)
// - Tier 4: Real-World Workload & Compilation (linter check, HTML/CSS build, PDF generation)
//
// Usage:
//   node test/e2e-fin.mjs                    # Run complete 4-tier E2E suite
//   node test/e2e-fin.mjs --tier=1           # Run only Tier 1 (Feature Coverage)
//   node test/e2e-fin.mjs --tier=1,2         # Run Tiers 1 and 2
//   node test/e2e-fin.mjs --milestone=M1     # Run only Milestone 1 tests
//   node test/e2e-fin.mjs --progressive      # Progressive mode: unreached milestones marked PENDING
//   node test/e2e-fin.mjs --json             # Output structured JSON results
//   node test/e2e-fin.mjs --bail             # Stop on first assertion failure
//   node test/e2e-fin.mjs --verbose          # Extended diagnostic output

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

export const FINANCE_SOURCES = [
  'bis-ml-credit-risk-2021',
  'bcbs-basel-irb-2017',
  'jpmorgan-docllm-2024',
  'jpmorgan-llm-finance-2023',
  'morgan-stanley-openai-2023',
  'ifrs-9-ecl-standard-2014',
  'sebi-algo-trading-consultation-2021',
  'sebi-ai-ml-reporting-2019',
  'meity-dpdp-act-2023',
  'rbi-storage-payment-data-2018',
  'rbi-digital-lending-guidelines-2022',
  'lundberg-lee-shap-2017',
  'ribeiro-lime-2016',
  'npci-upi-procedural-guidelines-2024'
];

export const FINANCE_GLOSSARY_TERMS = [
  'credit-underwriting-engine',
  'probability-of-default',
  'loss-given-default',
  'exposure-at-default',
  'expected-credit-loss',
  'financial-spreading',
  'rbi-free-ai',
  'mule-account-detection',
  'explainable-ai-finance',
  'shap-attribution',
  'virtual-data-room',
  'base-rate-fallacy'
];

export const FINANCE_GLOSSARY_ALIASES = [
  'pd',
  'lgd',
  'ead',
  'ecl',
  'shap',
  'vdr'
];

export const FINANCE_CHAPTER_IDS = [
  'algorithmic-underwriting-and-credit-risk',
  'financial-copilots-and-deal-diligence',
  'financial-crime-fraud-and-rbi-free-ai',
  'finance-casebook'
];

export const FINANCE_FIGURES = [
  'credit-underwriting-stack.svg',
  'financial-copilot-architecture.svg',
  'aml-fraud-detection-funnel.svg'
];

export const BANNED_AI_TROPES = [
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

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--tier=')) {
    const raw = arg.split('=')[1];
    options.tiers = new Set(raw.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n)));
  } else if ((arg === '-t' || arg === '--tier') && args[i + 1]) {
    const raw = args[++i];
    options.tiers = new Set(raw.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n)));
  } else if (arg.startsWith('--milestone=') || arg.startsWith('-m=')) {
    options.milestone = arg.split('=')[1].toUpperCase();
  } else if ((arg === '-m' || arg === '--milestone') && args[i + 1]) {
    options.milestone = args[++i].toUpperCase();
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
INFERENCE v4 Finance & Banking Track — E2E Test Suite Runner
Usage: node test/e2e-fin.mjs [options]

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
  title: 'Canonical Finance Primary Sources Ingestion in content/sources.yml',
  fn: async (assert) => {
    const sources = readYamlSafe('content/sources.yml');
    assert.ok(sources, 'content/sources.yml must exist and be valid YAML');

    const missing = [];
    for (const id of FINANCE_SOURCES) {
      if (!sources[id]) {
        missing.push(id);
      }
    }

    if (missing.length > 0) {
      assert.pending(`Missing ${missing.length} of ${FINANCE_SOURCES.length} finance sources in content/sources.yml (M1): ${missing.slice(0, 3).join(', ')}...`);
    }

    for (const id of FINANCE_SOURCES) {
      const s = sources[id];
      assert.ok(s.type, `Source "${id}" missing required field "type"`);
      assert.ok(
        ['paper', 'article', 'book', 'report', 'video', 'podcast'].includes(s.type),
        `Source "${id}" has invalid type "${s.type}"`
      );
      assert.ok(s.title && s.title.trim().length > 0, `Source "${id}" missing "title"`);
      assert.ok(s.creator && s.creator.trim().length > 0, `Source "${id}" missing "creator"`);
      assert.ok(s.publisher && s.publisher.trim().length > 0, `Source "${id}" missing "publisher"`);
      assert.ok(typeof s.year === 'number' && s.year >= 1980 && s.year <= 2030, `Source "${id}" year must be valid number, got ${s.year}`);
      assert.ok(s.url && /^https?:\/\//.test(s.url), `Source "${id}" must have valid HTTP/HTTPS URL, got "${s.url}"`);
      assert.ok(['A', 'B'].includes(s.tier), `Source "${id}" tier must be A or B, got "${s.tier}"`);
      assert.ok(s.why && s.why.trim().length >= 10, `Source "${id}" missing descriptive "why" annotation`);
    }

    // Specific authority checks
    assert.equal(sources['bis-ml-credit-risk-2021'].tier, 'A', 'BIS ML Credit Risk paper must be Tier A');
    assert.equal(sources['ifrs-9-ecl-standard-2014'].tier, 'A', 'IFRS 9 ECL standard must be Tier A');
    assert.equal(sources['jpmorgan-docllm-2024'].tier, 'A', 'J.P. Morgan DocLLM paper must be Tier A');
    assert.equal(sources['meity-dpdp-act-2023'].tier, 'A', 'MeitY DPDP Act must be Tier A');
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
    assert.ok(Array.isArray(policy.A), 'policy.A must be an array');
    
    const requiredDomains = ['bis.org', 'ifrs.org', 'jpmorgan.com', 'morganstanley.com', 'npci.org.in'];
    for (const d of requiredDomains) {
      assert.ok(policy.A.includes(d), `Domain "${d}" must be registered under Tier A in content/source-policy.yml`);
    }
  }
});

// F03: Finance Technical Glossary Ingestion
testCase({
  id: 'T1.3',
  tier: 1,
  milestone: 'M1',
  feature: 'F03',
  title: 'Finance Technical Glossary Ingestion in content/glossary.yml',
  fn: async (assert) => {
    const glossary = readYamlSafe('content/glossary.yml');
    assert.ok(glossary, 'content/glossary.yml must exist');

    const missing = [];
    for (const termId of FINANCE_GLOSSARY_TERMS) {
      if (!glossary[termId]) {
        missing.push(termId);
      }
    }

    if (missing.length > 0) {
      assert.pending(`Missing ${missing.length} of ${FINANCE_GLOSSARY_TERMS.length} finance terms in content/glossary.yml (M1): ${missing.slice(0, 3).join(', ')}...`);
    }

    for (const termId of FINANCE_GLOSSARY_TERMS) {
      const g = glossary[termId];
      assert.ok(g.term && g.term.trim().length > 0, `Glossary "${termId}" missing term string`);
      assert.ok(g.def && g.def.trim().length >= 25, `Glossary "${termId}" definition must be informative (>=25 chars)`);
    }

    // Acronym aliases verification
    for (const a of FINANCE_GLOSSARY_ALIASES) {
      assert.ok(glossary[a], `Acronym alias "${a}" must exist in content/glossary.yml`);
      assert.ok(glossary[a].def && glossary[a].def.trim().length >= 25, `Acronym alias "${a}" definition must be informative`);
    }
  }
});

// F04: TOC Part VI Placement & Part VII Reorganization
testCase({
  id: 'T1.4',
  tier: 1,
  milestone: 'M2',
  feature: 'F04',
  title: 'TOC Part VI (Finance & Banking) and Part VII (Inserts) Structure',
  fn: async (assert) => {
    const toc = readYamlSafe('content/toc.yml');
    assert.ok(toc && Array.isArray(toc.parts), 'content/toc.yml must define parts array');

    const p6 = toc.parts.find((p) => p.id === 'p6');
    assert.ok(p6, 'Part with id "p6" must exist in toc.yml');
    assert.equal(p6.n, 'VI', 'Part p6 must have numeral n: "VI"');
    assert.equal(p6.title, 'Finance & Banking', 'Part p6 title must be "Finance & Banking"');
    assert.equal(p6.track, 'finance', 'Part p6 track must be "finance"');
    assert.ok(Array.isArray(p6.chapters), 'Part p6 must define chapters array');
    assert.equal(p6.chapters.length, 4, 'Part p6 must contain exactly 4 chapters');

    const chapterIds = p6.chapters.map((c) => c.id);
    assert.deepEqual(chapterIds, FINANCE_CHAPTER_IDS, 'Part p6 chapter IDs must match expected 4 Finance chapters in order');

    // Check Part VII shifted
    const p7 = toc.parts.find((p) => p.id === 'p7');
    assert.ok(p7, 'Part with id "p7" must exist in toc.yml');
    assert.equal(p7.n, 'VII', 'Part p7 must have numeral n: "VII"');
    assert.equal(p7.title, 'Inserts', 'Part p7 title must be "Inserts"');
  }
});

// F05: Book Configuration & Edition Bump in book.yml
testCase({
  id: 'T1.5',
  tier: 1,
  milestone: 'M4',
  feature: 'F13',
  title: 'Book Config Edition Bump in book.yml',
  fn: async (assert) => {
    const book = readYamlSafe('book.yml');
    assert.ok(book, 'book.yml must exist');
    assert.ok(Array.isArray(book.tracks), 'book.yml tracks must be an array');
    const finTrack = book.tracks.find((t) => t.id === 'finance');
    assert.ok(finTrack, 'book.yml tracks must include finance track');
    assert.equal(finTrack.name, 'Finance', 'Finance track name must be "Finance"');

    if (book.edition !== '2027 · Draft 0.4 (Finance Track)') {
      assert.pending('book.yml edition not bumped to "2027 · Draft 0.4 (Finance Track)" yet (M4 release)');
    }
  }
});

// F06: Chapter 22 Authoring
testCase({
  id: 'T1.6',
  tier: 1,
  milestone: 'M3',
  feature: 'F07',
  title: 'Chapter 22 (algorithmic-underwriting-and-credit-risk.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('algorithmic-underwriting-and-credit-risk');
    if (!ch) assert.pending('content/chapters/algorithmic-underwriting-and-credit-risk.md not authored yet (M3)');

    assert.equal(ch.data.id, 'algorithmic-underwriting-and-credit-risk', 'Frontmatter id must be "algorithmic-underwriting-and-credit-risk"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 22 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 22 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('finance'), 'Chapter 22 tracks must include "finance"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 22 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 22 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 22 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F07: Chapter 23 Authoring
testCase({
  id: 'T1.7',
  tier: 1,
  milestone: 'M3',
  feature: 'F08',
  title: 'Chapter 23 (financial-copilots-and-deal-diligence.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('financial-copilots-and-deal-diligence');
    if (!ch) assert.pending('content/chapters/financial-copilots-and-deal-diligence.md not authored yet (M3)');

    assert.equal(ch.data.id, 'financial-copilots-and-deal-diligence', 'Frontmatter id must be "financial-copilots-and-deal-diligence"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 23 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 23 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('finance'), 'Chapter 23 tracks must include "finance"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 23 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 23 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 23 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F08: Chapter 24 Authoring
testCase({
  id: 'T1.8',
  tier: 1,
  milestone: 'M3',
  feature: 'F09',
  title: 'Chapter 24 (financial-crime-fraud-and-rbi-free-ai.md) Existence and Frontmatter',
  fn: async (assert) => {
    const ch = readChapterSafe('financial-crime-fraud-and-rbi-free-ai');
    if (!ch) assert.pending('content/chapters/financial-crime-fraud-and-rbi-free-ai.md not authored yet (M3)');

    assert.equal(ch.data.id, 'financial-crime-fraud-and-rbi-free-ai', 'Frontmatter id must be "financial-crime-fraud-and-rbi-free-ai"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 24 missing title');
    assert.ok(ch.data.deck && ch.data.deck.length > 0, 'Chapter 24 missing deck');
    assert.ok(Array.isArray(ch.data.tracks) && ch.data.tracks.includes('finance'), 'Chapter 24 tracks must include "finance"');
    assert.ok(ch.data.hook && ch.data.hook.length > 0, 'Chapter 24 missing hook');
    assert.ok(Array.isArray(ch.data.objectives), 'Chapter 24 objectives must be an array');
    assert.ok(ch.data.objectives.length >= 3 && ch.data.objectives.length <= 4, `Chapter 24 objectives count must be 3-4, got ${ch.data.objectives.length}`);
    for (const obj of ch.data.objectives) {
      assert.match(obj, /^\*\*[A-Z][a-z]+\*\*/, `Objective "${obj}" must start with bold Bloom verb (**Verb**)`);
    }
  }
});

// F09: Chapter 25 Authoring & 8 Quantitative Cases
testCase({
  id: 'T1.9',
  tier: 1,
  milestone: 'M3',
  feature: 'F10',
  title: 'Chapter 25 (finance-casebook.md) and 8 Quantitative Cases & Guesstimates',
  fn: async (assert) => {
    const ch = readChapterSafe('finance-casebook');
    if (!ch) assert.pending('content/chapters/finance-casebook.md not authored yet (M3)');

    assert.equal(ch.data.id, 'finance-casebook', 'Frontmatter id must be "finance-casebook"');
    assert.ok(ch.data.title && ch.data.title.length > 0, 'Chapter 25 missing title');

    // Casebook must contain cases and quantitative estimations
    const cases = (ch.body.match(/:::\s*case\b/g) || []).length;
    assert.ok(cases >= 4, `Chapter 25 must contain at least 4 detailed strategic cases/guesstimates, found ${cases}`);

    // Check presence of quantitative calculations (math / currency / metrics)
    const hasKaTeX = /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(ch.body);
    assert.ok(hasKaTeX, 'Chapter 25 must contain KaTeX quantitative formulas');
  }
});

// F10: Accompanying SVG Figures
testCase({
  id: 'T1.10',
  tier: 1,
  milestone: 'M2',
  feature: 'F05',
  title: 'Accompanying SVG Figures in content/figures/',
  fn: async (assert) => {
    let missing = 0;
    for (const fig of FINANCE_FIGURES) {
      const p = path.join(ROOT, 'content', 'figures', fig);
      if (!fs.existsSync(p)) {
        missing++;
      } else {
        const content = fs.readFileSync(p, 'utf8');
        assert.ok(content.includes('<svg'), `Figure "${fig}" must contain valid SVG root`);
      }
    }
    if (missing > 0) {
      assert.pending(`${missing} of ${FINANCE_FIGURES.length} Finance SVG figures not authored yet (M2)`);
    }
  }
});

// F11: Editorial & Linter Gate
testCase({
  id: 'T1.11',
  tier: 1,
  milestone: 'M4',
  feature: 'F15',
  title: 'Offline Referential Linter (scripts/check.mjs) Passes with 0 Errors',
  fn: async (assert) => {
    try {
      const stdout = execSync('node scripts/check.mjs', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
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
  feature: 'F17',
  title: 'Release Packaging & Draft PDF Publication in editions/',
  fn: async (assert) => {
    const pdfPath = path.join(ROOT, 'editions', 'INFERENCE-v4-finance-draft.pdf');
    const statusPath = path.join(ROOT, 'STATUS.md');

    assert.ok(fs.existsSync(statusPath), 'STATUS.md must exist');
    const statusContent = fs.readFileSync(statusPath, 'utf8');
    if (!/Draft 0\.4|Finance Track|Part VI/i.test(statusContent)) {
      assert.pending('STATUS.md has not been updated for v4 Finance Track yet (M4 release)');
    }

    if (!fs.existsSync(pdfPath)) {
      assert.pending('editions/INFERENCE-v4-finance-draft.pdf not published yet (M4 release milestone)');
    }

    const stat = fs.statSync(pdfPath);
    assert.ok(stat.size > 200000, `INFERENCE-v4-finance-draft.pdf size (${stat.size} bytes) must exceed 200KB`);
  }
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES (Pedagogy, Invariants & Syntax)
// 28 Tests: 7 tests per chapter across the 4 Finance Chapters
// ============================================================================

for (const chId of FINANCE_CHAPTER_IDS) {
  testCase({
    id: `T2.1-${chId}`,
    tier: 2,
    milestone: 'M3',
    feature: 'F11',
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
    milestone: 'M3',
    feature: 'F11',
    title: `Boundary: Stat block count [exactly 1] and no math in header in ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const stats = (ch.body.match(/:::\s*stat\b/g) || []).length;
      assert.equal(stats, 1, `Chapter ${chId} must contain exactly 1 "::: stat" block, found ${stats}`);

      const statHeaderMatch = ch.body.match(/:::\s*stat\s+([^\n]+)/);
      assert.ok(statHeaderMatch, `Chapter ${chId} stat block must have a header value`);
      assert.notMatch(
        statHeaderMatch[1],
        /\$/,
        `Stat header in ${chId} contains LaTeX math symbol ($). Stat headers must be plain text to prevent escaped HTML tag leaks.`
      );
    }
  });

  testCase({
    id: `T2.3-${chId}`,
    tier: 2,
    milestone: 'M3',
    feature: 'F11',
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
    milestone: 'M3',
    feature: 'F11',
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
    milestone: 'M3',
    feature: 'F11',
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
    milestone: 'M3',
    feature: 'F11',
    title: `Escaped HTML tag leak prevention in rendered prose for ${chId}.md`,
    fn: async (assert) => {
      const ch = readChapterSafe(chId);
      if (!ch) assert.pending(`Chapter ${chId}.md not authored yet`);

      const { loadBook, renderChapter } = await import('../scripts/lib/render.mjs');
      const ctx = await loadBook();
      const targetChapter = ctx.chapters.find((x) => x.id === chId);
      assert.ok(targetChapter, `Chapter ${chId} must be loaded in book context`);

      const rendered = renderChapter(targetChapter, ctx, 'print');
      assert.equal(rendered.problems.length, 0, `Render problems encountered in ${chId}: ${rendered.problems.join('; ')}`);

      // Check for escaped HTML tag leakage (&lt;span...&gt;)
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
    milestone: 'M3',
    feature: 'F11',
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
// TIER 3: CROSS-FEATURE COMBINATIONS & REFERENTIAL INTEGRITY (4 Tests)
// ============================================================================

testCase({
  id: 'T3.1',
  tier: 3,
  milestone: 'M3',
  feature: 'F02/F07-F10',
  title: 'Citation ↔ Source Registry Bidirectional Integrity',
  fn: async (assert) => {
    const sources = readYamlSafe('content/sources.yml');
    assert.ok(sources, 'content/sources.yml must exist');

    let authoredCount = 0;
    const citedInFin = new Set();

    for (const chId of FINANCE_CHAPTER_IDS) {
      const ch = readChapterSafe(chId);
      if (ch) {
        authoredCount++;
        // Citations [@source-id]
        const inlineCites = ch.body.match(/\[@([\w-]+)\]/g) || [];
        for (const cite of inlineCites) {
          const sId = cite.slice(2, -1);
          assert.ok(sources[sId], `Citation [@${sId}] in ${chId}.md does not exist in content/sources.yml`);
          citedInFin.add(sId);
        }
        // Media cards {{... id}}
        const mediaCards = ch.body.match(/^\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/gm) || [];
        for (const m of mediaCards) {
          const sId = m.replace(/^\{\{\s*\w+\s+/, '').replace(/\s*\}\}$/, '').trim();
          assert.ok(sources[sId], `Media card source "${sId}" in ${chId}.md does not exist in content/sources.yml`);
          citedInFin.add(sId);
        }
      }
    }

    if (authoredCount === 0) {
      assert.pending('Finance chapters not authored yet (M3)');
    }

    if (authoredCount === 4) {
      // Once all chapters are written, verify all canonical Finance sources are cited
      for (const sId of FINANCE_SOURCES) {
        assert.ok(citedInFin.has(sId), `Canonical Finance source "${sId}" is registered but never cited across Part VI chapters`);
      }
    }
  }
});

testCase({
  id: 'T3.2',
  tier: 3,
  milestone: 'M3',
  feature: 'F03/F07-F10',
  title: 'Glossary Link ↔ Glossary Registry Bidirectional Integrity',
  fn: async (assert) => {
    const glossary = readYamlSafe('content/glossary.yml');
    assert.ok(glossary, 'content/glossary.yml must exist');

    let authoredCount = 0;
    const termsInFin = new Set();

    for (const chId of FINANCE_CHAPTER_IDS) {
      const ch = readChapterSafe(chId);
      if (ch) {
        authoredCount++;
        const matches = ch.body.match(/\[\[([\w-]+)(?:\|[^\]]+)?\]\]/g) || [];
        for (const m of matches) {
          const termId = m.slice(2, -2).split('|')[0].trim();
          assert.ok(glossary[termId], `Glossary reference [[${termId}]] in ${chId}.md does not exist in content/glossary.yml`);
          termsInFin.add(termId);
        }
      }
    }

    if (authoredCount === 0) {
      assert.pending('Finance chapters not authored yet (M3)');
    }

    if (authoredCount === 4) {
      for (const termId of FINANCE_GLOSSARY_TERMS) {
        assert.ok(termsInFin.has(termId), `Finance glossary term "${termId}" is defined but never linked in Part VI chapters`);
      }
    }
  }
});

testCase({
  id: 'T3.3',
  tier: 3,
  milestone: 'M2',
  feature: 'F05/F07-F10',
  title: 'Figure Embeds ↔ Figure Asset Filesystem Integrity',
  fn: async (assert) => {
    let authoredCount = 0;
    for (const chId of FINANCE_CHAPTER_IDS) {
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
      assert.pending('Finance chapters not authored yet (M3)');
    }
  }
});

testCase({
  id: 'T3.4',
  tier: 3,
  milestone: 'M2',
  feature: 'F04/F06',
  title: 'Chapter Numbering Propagation & Auto-Increment Sequence',
  fn: async (assert) => {
    const { loadBook } = await import('../scripts/lib/render.mjs');
    const ctx = await loadBook();

    // Verify Chapter 21 is product-casebook
    const ch21 = ctx.chapters.find((c) => c.n === '21');
    assert.ok(ch21, 'Chapter 21 must exist in book context');
    assert.equal(ch21.id, 'product-casebook', 'Chapter 21 must be product-casebook');

    // Verify Chapters 22–25 exist in sequential order
    const finChapters = ctx.chapters.filter((c) => FINANCE_CHAPTER_IDS.includes(c.id));
    assert.equal(finChapters.length, 4, 'Must load all 4 Finance chapters in context');

    assert.equal(finChapters[0].n, '22', 'algorithmic-underwriting-and-credit-risk must be Chapter 22');
    assert.equal(finChapters[1].n, '23', 'financial-copilots-and-deal-diligence must be Chapter 23');
    assert.equal(finChapters[2].n, '24', 'financial-crime-fraud-and-rbi-free-ai must be Chapter 24');
    assert.equal(finChapters[3].n, '25', 'finance-casebook must be Chapter 25');

    // Verify Inserts retain A and B
    const insertA = ctx.chapters.find((c) => c.id === 'state-of-play');
    assert.ok(insertA, 'state-of-play insert must exist');
    assert.equal(insertA.n, 'A', 'state-of-play must maintain chapter letter A');

    const insertB = ctx.chapters.find((c) => c.id === 'india-briefing');
    assert.ok(insertB, 'india-briefing insert must exist');
    assert.equal(insertB.n, 'B', 'india-briefing must maintain chapter letter B');

    // Verify howToRead contains finance track
    assert.ok(ctx.trackById['finance'], 'ctx.trackById must define "finance" track');
  }
});

// ============================================================================
// TIER 4: REAL-WORLD COMPILATION & WORKLOAD (Build & PDF Pipeline)
// ============================================================================

testCase({
  id: 'T4.1',
  tier: 4,
  milestone: 'M4',
  feature: 'F15',
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
    assert.ok(indexHtml.includes('Finance &amp; Banking') || indexHtml.includes('Finance & Banking'), 'dist/index.html must contain "Finance & Banking"');

    const printHtml = fs.readFileSync(distPrint, 'utf8');
    assert.ok(printHtml.includes('Finance'), 'dist/print.html must contain Finance track reading path');
  }
});

testCase({
  id: 'T4.2',
  tier: 4,
  milestone: 'M4',
  feature: 'F17',
  title: 'v4 PDF Edition Generation & Layout Validation',
  fn: async (assert) => {
    const pdfPath = path.join(ROOT, 'editions', 'INFERENCE-v4-finance-draft.pdf');

    if (!fs.existsSync(pdfPath)) {
      assert.pending('editions/INFERENCE-v4-finance-draft.pdf not compiled yet (M4 release milestone)');
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
  console.log(`${c.bold}E2E Test Suite Summary: INFERENCE v4 Finance & Banking Track${c.reset}`);
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
