// Adversarial Rendering & Pipeline Verification Suite
// Challenger: challenger_1
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const CONTENT = path.join(ROOT, 'content');

const results = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
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
  results.errors.push({ test: testName, error });
  results.details.push({ status: 'FAIL', test: testName, error });
}

function warn(testName, warning) {
  console.warn(`  ! WARN: ${testName}\n         ↳ ${warning}`);
  results.warnings.push({ test: testName, warning });
}

console.log('======================================================================');
console.log('ADVERSARIAL STRESS-TEST & RENDERING AUDIT');
console.log('Target: INFERENCE v4 Finance & Banking Track (Part VI)');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. ESCAPED HTML TAG LEAKS AUDIT
// -----------------------------------------------------------------------------
console.log('--- 1. Escaped HTML Tag Leaks ---');
const partVIChapterIds = [
  'algorithmic-underwriting-and-credit-risk',
  'financial-copilots-and-deal-diligence',
  'financial-crime-fraud-and-rbi-free-ai',
  'finance-casebook'
];

const htmlFilesToCheck = [
  ...partVIChapterIds.map(id => path.join(DIST, 'ch', `${id}.html`)),
  path.join(DIST, 'index.html'),
  path.join(DIST, 'print.html')
];

for (const filePath of htmlFilesToCheck) {
  const relPath = path.relative(ROOT, filePath);
  if (!fs.existsSync(filePath)) {
    fail(`File existence: ${relPath}`, `File does not exist`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Strip pre and code tags to check prose
  const proseOnly = content.replace(/<pre[\s\S]*?<\/pre>/gi, '').replace(/<code[\s\S]*?<\/code>/gi, '');

  // Look for leaked HTML tag entities
  // Examples: &lt;span, &lt;div, &lt;math, &lt;table, &lt;p, &lt;a, &lt;h1-6, &lt;aside, &lt;header, etc.
  const tagLeakRegex = /&lt;\/?([a-zA-Z][a-zA-Z0-9:-]*)\b([^&gt;]*?)&gt;/gi;
  const leaks = [];
  let match;
  while ((match = tagLeakRegex.exec(proseOnly)) !== null) {
    const start = Math.max(0, match.index - 40);
    const end = Math.min(proseOnly.length, match.index + match[0].length + 40);
    const snippet = proseOnly.slice(start, end).replace(/\s+/g, ' ');
    leaks.push({ tag: match[1], full: match[0], snippet });
  }

  if (leaks.length > 0) {
    fail(`Escaped HTML Tag Leaks in ${relPath}`, `Found ${leaks.length} escaped tag leak(s): ${JSON.stringify(leaks[0])}`);
  } else {
    pass(`No Escaped HTML Tag Leaks in ${relPath}`, `${content.length} bytes checked`);
  }

  // Also check if there are raw unescaped math tags or katex-error elements
  if (content.includes('class="katex-error"')) {
    fail(`KaTeX Error in ${relPath}`, `Found class="katex-error" indicating syntax error in LaTeX formula`);
  } else {
    pass(`Zero KaTeX Syntax Errors in ${relPath}`);
  }

  // Check for raw fallback <pre class="math-raw">
  if (content.includes('class="math-raw"')) {
    fail(`Raw Unparsed Math Fallback in ${relPath}`, `Found <pre class="math-raw"> rendering fallback`);
  } else {
    pass(`No raw math fallbacks in ${relPath}`);
  }
}

// -----------------------------------------------------------------------------
// 2. KATEX FORMULA SYNTAX & RENDERING RIGOR
// -----------------------------------------------------------------------------
console.log('\n--- 2. KaTeX Mathematical Formulas Audit ---');

for (const chId of partVIChapterIds) {
  const mdPath = path.join(CONTENT, 'chapters', `${chId}.md`);
  const htmlPath = path.join(DIST, 'ch', `${chId}.html`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Count display formulas in markdown
  const displayMathMatches = mdContent.match(/\$\$([\s\S]+?)\$\$/g) || [];
  // Count rendered formula divs in HTML
  const formulaDivMatches = htmlContent.match(/<div class="formula">/g) || [];

  if (displayMathMatches.length !== formulaDivMatches.length) {
    fail(`Display math count in ${chId}`, `Markdown has ${displayMathMatches.length} display formulas ($$...$$), but HTML has ${formulaDivMatches.length} formula divs`);
  } else {
    pass(`Display math count in ${chId}`, `${displayMathMatches.length} display formulas rendered`);
  }

  // Check for unparsed $$ in HTML
  // Literal $$ indicates broken display math or double currency escape ($$1.50)
  const dollarDollarIndex = htmlContent.indexOf('$$');
  if (dollarDollarIndex !== -1) {
    const snippet = htmlContent.slice(Math.max(0, dollarDollarIndex - 30), Math.min(htmlContent.length, dollarDollarIndex + 50)).replace(/\s+/g, ' ');
    fail(`Unparsed $$ in HTML: ${chId}`, `Found literal $$ at char ${dollarDollarIndex}: "${snippet}"`);
  } else {
    pass(`No literal $$ in HTML: ${chId}`);
  }

  // Check for LaTeX commands leaking into HTML outside katex spans
  const latexCommandRegex = /\\(?:frac|sum|prod|int|sigma|times|cdot|mathbf|sqrt|partial|approx|le|ge|neq|beta|alpha|theta|lambda|pi|infty|text)\b/g;
  const htmlNoKatex = htmlContent.replace(/<span class="katex">[\s\S]*?<\/span><\/span><\/span>/g, '')
                                  .replace(/<span class="katex"[\s\S]*?<\/span>/g, '')
                                  .replace(/<pre[\s\S]*?<\/pre>/g, '')
                                  .replace(/<code[\s\S]*?<\/code>/g, '');
  const leakedCommands = htmlNoKatex.match(latexCommandRegex);
  if (leakedCommands) {
    const uniqueCommands = [...new Set(leakedCommands)];
    fail(`Leaked LaTeX commands in prose: ${chId}`, `Found unparsed commands outside math: ${uniqueCommands.join(', ')}`);
  } else {
    pass(`No leaked LaTeX commands in prose: ${chId}`);
  }

  // Check that katex markup contains valid MathML and HTML representation
  const katexSpanCount = (htmlContent.match(/<span class="katex">/g) || []).length;
  const mathmlCount = (htmlContent.match(/<math\b[^>]*xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/g) || []).length;
  if (katexSpanCount > 0 && mathmlCount === 0) {
    fail(`MathML accessibility in ${chId}`, `Found ${katexSpanCount} KaTeX spans but 0 MathML elements`);
  } else {
    pass(`KaTeX MathML completeness in ${chId}`, `${katexSpanCount} formulas with MathML`);
  }
}

// -----------------------------------------------------------------------------
// 3. GFM TABLE SEMANTICS & WRAPPER AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 3. GFM Tables Structure & Semantics Audit ---');

for (const chId of partVIChapterIds) {
  const mdPath = path.join(CONTENT, 'chapters', `${chId}.md`);
  const htmlPath = path.join(DIST, 'ch', `${chId}.html`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Find GFM tables in markdown: lines starting with | followed by header separator |--
  const mdTableRegex = /(?:^|\n)(\|[^\n]+\|\n\|[\s:-|-]+\|\n(?:\|[^\n]+\|\n?)+)/g;
  const mdTables = mdContent.match(mdTableRegex) || [];

  // Find rendered tables in HTML
  const htmlTables = htmlContent.match(/<div class="table-wrap"><table>[\s\S]*?<\/table><\/div>/g) || [];

  if (mdTables.length !== htmlTables.length) {
    fail(`Table count mismatch in ${chId}`, `Markdown contains ${mdTables.length} GFM tables, but rendered HTML contains ${htmlTables.length} table-wraps`);
  } else {
    pass(`Table count match in ${chId}`, `${mdTables.length} tables verified`);
  }

  // Ensure each rendered table has <thead>, <tbody>, <th>, <td>
  let malformedTables = 0;
  for (const tableHtml of htmlTables) {
    const hasThead = /<thead>[\s\S]*?<\/thead>/.test(tableHtml);
    const hasTbody = /<tbody>[\s\S]*?<\/tbody>/.test(tableHtml);
    const hasTh = /<th\b/.test(tableHtml);
    const hasTd = /<td\b/.test(tableHtml);
    if (!hasThead || !hasTbody || !hasTh || !hasTd) {
      malformedTables++;
    }
  }

  if (malformedTables > 0) {
    fail(`Semantic table structure in ${chId}`, `${malformedTables} table(s) missing semantic thead/tbody/th/td`);
  } else {
    pass(`Semantic table structure in ${chId}`, `All ${htmlTables.length} tables have thead, tbody, th, td`);
  }

  // Verify no tables are trapped inside <pre><code> (looking for table separator lines inside code blocks)
  const codeBlocks = htmlContent.match(/<pre><code>[\s\S]*?<\/code><\/pre>/g) || [];
  let trappedTables = 0;
  for (const b of codeBlocks) {
    if (/\|\s*---+\s*\|/.test(b)) {
      trappedTables++;
    }
  }
  if (trappedTables > 0) {
    fail(`Tables inside code block in ${chId}`, `Found ${trappedTables} markdown table separator(s) trapped inside <pre><code>`);
  } else {
    pass(`No tables trapped in code blocks in ${chId}`);
  }
}

// -----------------------------------------------------------------------------
// 4. VECTOR SVG FIGURES VALIDITY & EMBED AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 4. Vector SVG Figures Validity & Embeds ---');

const figures = [
  'credit-underwriting-stack.svg',
  'financial-copilot-architecture.svg',
  'aml-fraud-detection-funnel.svg'
];

for (const fig of figures) {
  const figPath = path.join(CONTENT, 'figures', fig);
  if (!fs.existsSync(figPath)) {
    fail(`Figure existence: ${fig}`, `Figure file not found at ${figPath}`);
    continue;
  }

  const svgContent = fs.readFileSync(figPath, 'utf8');

  // Check valid SVG root tag
  const hasOpeningSvg = /<svg\b[^>]*>/i.test(svgContent);
  const hasClosingSvg = /<\/svg>/i.test(svgContent);
  if (!hasOpeningSvg || !hasClosingSvg) {
    fail(`SVG structure in ${fig}`, `Missing proper <svg> or </svg> tags`);
  } else {
    pass(`SVG root tags in ${fig}`);
  }

  // Check xmlns
  if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
    fail(`SVG namespace in ${fig}`, `Missing xmlns="http://www.w3.org/2000/svg"`);
  } else {
    pass(`SVG namespace in ${fig}`);
  }

  // Check viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/i);
  if (!viewBoxMatch) {
    fail(`SVG viewBox in ${fig}`, `Missing viewBox attribute for responsive scaling`);
  } else {
    pass(`SVG viewBox in ${fig}`, `viewBox="${viewBoxMatch[1]}"`);
  }

  // Check XML syntax outside comments: no unescaped ampersands in text or attributes
  const svgNoComments = svgContent.replace(/<!--[\s\S]*?-->/g, '');
  const unescapedAmp = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g;
  const ampMatches = svgNoComments.match(unescapedAmp);
  if (ampMatches) {
    fail(`Unescaped ampersand in ${fig}`, `Found ${ampMatches.length} raw unescaped '&' characters outside comments, which violates XML validity`);
  } else {
    pass(`XML character escaping in ${fig}`, `No unescaped ampersands outside comments`);
  }

  // Check embed in rendered HTML
  const figId = fig.replace('.svg', '');
  const foundInPrint = fs.readFileSync(path.join(DIST, 'print.html'), 'utf8').includes(`id="fig-${figId}"`);
  if (!foundInPrint) {
    fail(`Figure embed in dist/print.html: ${figId}`, `Figure not found embedded in dist/print.html`);
  } else {
    pass(`Figure embed in dist/print.html: ${figId}`);
  }
}

// -----------------------------------------------------------------------------
// 5. NAVIGATION, COVER & TRACK FILTER INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 5. Navigation, Cover & Track Filter Integrity ---');

const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// Check Part VI in TOC
if (!indexHtml.includes('Finance &amp; Banking') && !indexHtml.includes('Finance & Banking')) {
  fail('Part VI in index.html TOC', 'Could not find "Finance & Banking" in dist/index.html TOC');
} else {
  pass('Part VI in index.html TOC');
}

// Check all 4 chapters in index.html
for (const chId of partVIChapterIds) {
  if (!indexHtml.includes(`href="ch/${chId}.html"`)) {
    fail(`Chapter link in index.html: ${chId}`, `Missing href="ch/${chId}.html"`);
  } else {
    pass(`Chapter link in index.html: ${chId}`);
  }
}

// Check data-track="finance"
const financeTrackRows = (indexHtml.match(/data-track="finance"/g) || []).length;
if (financeTrackRows < 4) {
  fail('Track filter attribute', `Expected at least 4 rows with data-track="finance", found ${financeTrackRows}`);
} else {
  pass('Track filter attribute', `Found ${financeTrackRows} rows tagged data-track="finance"`);
}

// Check howToRead finance track pill
if (!indexHtml.includes('data-track-filter="finance"') && !indexHtml.includes('Finance')) {
  warn('Finance track filter button', 'Check if finance track filter pill is registered');
} else {
  pass('Finance track filter button present');
}

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log('AUDIT SUMMARY');
console.log('======================================================================');
console.log(`Passed:   ${results.passed}`);
console.log(`Failed:   ${results.failed}`);
console.log(`Warnings: ${results.warnings.length}`);
console.log(`Verdict:  ${results.failed === 0 ? 'APPROVE' : 'REQUEST_CHANGES'}`);
console.log('======================================================================');

if (results.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
