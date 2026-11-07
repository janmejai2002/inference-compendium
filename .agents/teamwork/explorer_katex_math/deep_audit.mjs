import fs from 'node:fs';
import path from 'node:path';
import { loadBook, renderChapter, ROOT } from '../../../scripts/lib/render.mjs';
import katex from 'katex';

async function run() {
  const ctx = await loadBook();
  const chapters = ctx.chapters.filter(c => c.file);

  const report = {
    renderedKatexErrors: [],
    unrenderedLatexInHtml: [],
    escapedHtmlTagLeaks: [],
    asciiTables: [],
    mathDelimitersWithSpaces: [],
    currencyMathCollisions: [],
    allFormulas: []
  };

  console.log(`Auditing ${chapters.length} loaded chapters...`);

  for (const c of chapters) {
    const rawContent = fs.readFileSync(c.file, 'utf8');
    const lines = rawContent.split('\n');

    // 1. Audit Rendered Output via renderChapter
    const rendered = renderChapter(c, ctx, 'print');
    const html = rendered.html;

    // Check for KaTeX errors in rendered HTML
    if (html.includes('katex-error')) {
      const errorMatches = [...html.matchAll(/<span class="katex-error"[^>]*title="([^"]*)"[^>]*>([\s\S]*?)<\/span>/g)];
      for (const m of errorMatches) {
        report.renderedKatexErrors.push({
          chapter: c.id,
          title: m[1],
          raw: m[2]
        });
      }
    }

    // Check for escaped HTML tag leak
    const textWithoutCode = html.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
    const tagLeak = textWithoutCode.match(/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,40}&gt;/g);
    if (tagLeak) {
      report.escapedHtmlTagLeaks.push({
        chapter: c.id,
        matches: tagLeak
      });
    }

    // Check for raw unrendered LaTeX in rendered prose (outside code/pre)
    // E.g. \frac{, \sum_{, \text{, \alpha, \sigma
    const latexInProse = textWithoutCode.match(/\\[a-zA-Z]+(?:\{[^}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+)/g);
    if (latexInProse) {
      // Filter out legitimate things like \n or file paths if any leaked into prose
      const filtered = latexInProse.filter(cmd => !cmd.startsWith('\\n') && !cmd.startsWith('\\Users') && !cmd.startsWith('\\t'));
      if (filtered.length > 0) {
        report.unrenderedLatexInHtml.push({
          chapter: c.id,
          matches: filtered
        });
      }
    }

    // 2. Line-by-line inspection of raw markdown file
    let inFence = false;
    let fenceStart = -1;
    let fenceLang = '';
    let fenceLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Handle code fences
      const fenceMatch = line.match(/^```(\w*)/);
      if (fenceMatch) {
        if (!inFence) {
          inFence = true;
          fenceStart = lineNum;
          fenceLang = fenceMatch[1];
          fenceLines = [];
        } else {
          inFence = false;
          // Check fenceLines for ASCII tables
          const blockText = fenceLines.join('\n');
          // Box drawing or ASCII table structure:
          // Check if lines have multiple +---+ or |---| or box chars and are presenting structured tabular rows/columns
          const hasBorder = /^\s*(\+[-=+]+\+|\+[–—+]+\+)/m.test(blockText);
          const hasBoxChars = /[┌┬┐├┼┤└┴┘║═]/.test(blockText);
          const hasPipes = fenceLines.filter(l => /^\s*\|.*\|\s*$/.test(l)).length >= 3;

          // Check if it's an ASCII table rather than code/prompt/flowchart
          if ((hasBorder || hasBoxChars || hasPipes) && !fenceLang.match(/^(python|bash|sh|json|yaml|yml|javascript|sql)/)) {
            // Further verify if it has tabular rows/columns
            // Look for table-like headers or data rows
            report.asciiTables.push({
              chapter: c.id,
              file: path.relative(ROOT, c.file),
              startLine: fenceStart,
              endLine: lineNum,
              lang: fenceLang,
              preview: fenceLines.slice(0, 8).join('\n')
            });
          }
        }
        continue;
      }

      if (inFence) {
        fenceLines.push(line);
        continue;
      }

      // Check for inline math whitespace issues
      // Strict rule: $math$ MUST have no leading space after opening $ and no trailing space before closing $
      // e.g. "$ math$" or "$math $" or "$ math $"
      // Also ensure it's not currency like "$100"
      const inlineMathSpacingMatch = line.match(/(?<=^|[\s(])\$(?:\s+[^\$\n]+|[^\$\n]+\s+)\$(?=[\s,.;:!?)\]]|$)/g);
      if (inlineMathSpacingMatch) {
        for (const m of inlineMathSpacingMatch) {
          // If it's pure currency like "$ 100", still bad practice
          report.mathDelimitersWithSpaces.push({
            chapter: c.id,
            line: lineNum,
            matched: m,
            lineContent: line.trim()
          });
        }
      }

      // Check if any $...$ contains currency and gets accidentally parsed as KaTeX math
      // In render.mjs:
      // /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g
      const inlineRegex = /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g;
      let im;
      while ((im = inlineRegex.exec(line)) !== null) {
        const full = im[0];
        const inner = im[1];
        const isPlainCurrency = /^\d+(?:\.\d+)?\s*(?:billion|million|k|trillion|percent|%|per\s+million)?$/i.test(inner.trim());
        if (!isPlainCurrency) {
          // It's processed as KaTeX
          report.allFormulas.push({
            chapter: c.id,
            line: lineNum,
            type: 'inline',
            raw: inner.trim()
          });

          // Check if this math contains raw ₹ symbol
          if (inner.includes('₹')) {
            // KaTeX doesn't have font metrics for ₹ in math mode!
          }
        }
      }
    }

    // Check display math $$...$$
    const displayMathRegex = /\$\$([\s\S]+?)\$\$/g;
    let dm;
    while ((dm = displayMathRegex.exec(rawContent)) !== null) {
      const math = dm[1];
      const lineNum = rawContent.substring(0, dm.index).split('\n').length;
      report.allFormulas.push({
        chapter: c.id,
        line: lineNum,
        type: 'display',
        raw: math.trim()
      });
    }
  }

  fs.writeFileSync(
    path.join(ROOT, '.agents/teamwork/explorer_katex_math/deep_audit_results.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('--- AUDIT SUMMARY ---');
  console.log(`Rendered KaTeX Errors: ${report.renderedKatexErrors.length}`);
  console.log(`Escaped HTML Tag Leaks: ${report.escapedHtmlTagLeaks.length}`);
  console.log(`Unrendered LaTeX in HTML: ${report.unrenderedLatexInHtml.length}`);
  console.log(`ASCII Tables in Fenced Code: ${report.asciiTables.length}`);
  console.log(`Math Delimiters with Spaces: ${report.mathDelimitersWithSpaces.length}`);
  console.log(`Total Formulas Extracted: ${report.allFormulas.length}`);
}

run().catch(console.error);
