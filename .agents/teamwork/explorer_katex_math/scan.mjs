import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import matter from 'gray-matter';

const ROOT = path.resolve('C:/Users/Janmejai/compendium');
const chaptersDir = path.join(ROOT, 'content', 'chapters');

const chapterFiles = fs.readdirSync(chaptersDir)
  .filter(f => f.endsWith('.md'))
  .sort();

console.log(`Auditing ${chapterFiles.length} chapter files...`);

const results = {
  katexBlockErrors: [],
  katexInlineErrors: [],
  delimiterIssues: [],
  currencyLeaks: [],
  asciiTables: [],
  rawLatexLeaks: [],
  mathStats: {}
};

for (const file of chapterFiles) {
  const filePath = path.join(chaptersDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: body } = matter(rawContent);

  const lines = rawContent.split('\n');
  const fileStats = {
    displayMathCount: 0,
    inlineMathCount: 0,
    currencyCount: 0,
    asciiTableBlocks: 0
  };

  // 1. Check for fenced code blocks containing ASCII tables
  let inCodeBlock = false;
  let codeBlockStart = -1;
  let codeBlockLines = [];
  let codeBlockLang = '';

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const matchFence = line.match(/^```(\w*)/);
    if (matchFence) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockStart = lineNum;
        codeBlockLang = matchFence[1];
        codeBlockLines = [];
      } else {
        // Closing fence
        inCodeBlock = false;
        const codeText = codeBlockLines.join('\n');
        // Check if codeText looks like an ASCII table
        // Pattern 1: +---+---+ or +===+===+
        // Pattern 2: box-drawing chars ┌ ─ ┬ ┐ │ ├ ┼ ┤ └ ┴ ┘
        // Pattern 3: repeated lines of | col | col | inside a code block
        const isBoxTable = /^\s*(\+[-=+]+\+|\+[–—+]+\+)/m.test(codeText) ||
                           /[┌┬┐├┼┤└┴┘]/.test(codeText) ||
                           (/^\s*\|.*\|\s*$/m.test(codeText) && codeBlockLines.filter(l => /^\s*\|.*\|\s*$/.test(l)).length >= 3);

        // Disregard if it's explicitly code or prompt or diagram (e.g., mermaid, tree, prompt, python, json)
        // BUT if it's an ASCII table presenting tabular data, record it!
        if (isBoxTable) {
          results.asciiTables.push({
            file,
            startLine: codeBlockStart,
            endLine: lineNum,
            lang: codeBlockLang,
            preview: codeBlockLines.slice(0, 5).join('\n')
          });
          fileStats.asciiTableBlocks++;
        }
      }
    } else if (inCodeBlock) {
      codeBlockLines.push(line);
    }
  });

  // 2. Scan for Display Math $$...$$
  // Let's find all $$ occurrences and check line numbers and KaTeX compilation
  const displayMathRegex = /\$\$([\s\S]+?)\$\$/g;
  let dMatch;
  while ((dMatch = displayMathRegex.exec(body)) !== null) {
    fileStats.displayMathCount++;
    const math = dMatch[1];
    const startIndex = dMatch.index;
    const lineNumber = body.substring(0, startIndex).split('\n').length;

    // Check delimiter spacing
    // Rule: block math MUST use $$...$$ with appropriate linebreaks or strict syntax
    // Let's check if math starts or ends with weird spacing or syntax errors
    try {
      katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: true,
        strict: 'warn'
      });
    } catch (err) {
      results.katexBlockErrors.push({
        file,
        line: lineNumber,
        math: math.trim(),
        error: err.message
      });
    }

    // Check for potential markdown swallowed chars inside block math
    // e.g. unescaped * or _ if placed inside something markdown might touch
  }

  // Check for unclosed $$
  const dollarPairCount = (body.match(/\$\$/g) || []).length;
  if (dollarPairCount % 2 !== 0) {
    results.delimiterIssues.push({
      file,
      issue: `Odd number of $$ delimiters (${dollarPairCount}), indicating an unclosed display math block.`
    });
  }

  // 3. Scan for Inline Math and Currency Leaks
  // Let's inspect line-by-line
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Skip inside fenced code blocks
    // Also skip comments or frontmatter
    // Let's look for single $ that are not $$
    const dollarMatches = [...line.matchAll(/(?<!\$)\$(?!\$)/g)];
    if (dollarMatches.length > 0) {
      // Check pairs or singletons
      // Look for space after opening or before closing $ math
      const invalidSpaceMatch = line.match(/\$\s+[^\$]+\$|\$[^\$]+\s+\$/);
      if (invalidSpaceMatch) {
        // Could it be currency? e.g. "$ 50" or something?
        results.delimiterIssues.push({
          file,
          line: lineNum,
          match: invalidSpaceMatch[0],
          issue: 'Inline math delimiter has leading or trailing whitespace ($ math $ or $math $)'
        });
      }

      // Check currency leak patterns: e.g. "$10 to $20" or "$X and $Y"
      // If render.mjs regex is:
      // /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g
      // Test render.mjs regex on this line!
      const renderRegex = /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g;
      let rMatch;
      while ((rMatch = renderRegex.exec(line)) !== null) {
        const full = rMatch[0];
        const inner = rMatch[1];
        // Check if currency check passes
        const isPlainCurrency = /^\d+(?:\.\d+)?\s*(?:billion|million|k|trillion|percent|%|per\s+million)?$/i.test(inner.trim());
        if (isPlainCurrency) {
          fileStats.currencyCount++;
        } else {
          fileStats.inlineMathCount++;
          // Test KaTeX compilation with throwOnError: true
          try {
            katex.renderToString(inner.trim(), {
              displayMode: false,
              throwOnError: true,
              strict: 'warn'
            });
          } catch (e) {
            results.katexInlineErrors.push({
              file,
              line: lineNum,
              math: inner,
              error: e.message
            });
          }

          // Check if this looks like accidentally captured prose between two dollar figures!
          // e.g. "$100 million in ARR to $200" or "$15 per seat and $20"
          if (/\b(?:and|or|to|for|with|per|in|of|from)\b/i.test(inner) && /\d/.test(inner)) {
            results.currencyLeaks.push({
              file,
              line: lineNum,
              text: full,
              captured: inner,
              issue: 'Likely prose/currency range accidentally captured as inline math'
            });
          }
        }
      }
    }

    // Check for raw LaTeX commands in text without $ delimiters
    // e.g., \frac, \sigma, \alpha, \lambda, \mu, \sum, \approx, \text{...}
    const rawLatexMatch = line.match(/(?<![\$\\])\\(?:frac|sqrt|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|sigma|tau|phi|omega|sum|prod|int|approx|neq|leq|geq|times|cdot|in|notin|subset|forall|exists|mathcal|mathbf|text)\b/);
    if (rawLatexMatch && !line.includes('$') && !line.startsWith('```') && !line.startsWith('import ') && !line.startsWith('//')) {
      results.rawLatexLeaks.push({
        file,
        line: lineNum,
        match: rawLatexMatch[0],
        lineContent: line.trim()
      });
    }
  });

  results.mathStats[file] = fileStats;
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync(path.join(ROOT, '.agents/teamwork/explorer_katex_math/scan_results.json'), JSON.stringify(results, null, 2));
