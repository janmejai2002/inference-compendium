import fs from 'node:fs';
import path from 'node:path';
import { loadBook, renderChapter, ROOT } from '../../../scripts/lib/render.mjs';

async function scanAllFailures() {
  const ctx = await loadBook();
  const chapters = ctx.chapters.filter(c => c.file);

  const failures = [];

  for (const c of chapters) {
    const raw = fs.readFileSync(c.file, 'utf8');
    const lines = raw.split('\n');
    const rendered = renderChapter(c, ctx, 'web');
    const html = rendered.html;

    // For every line in raw markdown, check if it had an intended inline math or display math
    // that failed to be rendered in html (i.e. literal $...$ or \frac or \mathbf appeared in html)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Check for raw LaTeX commands on this line
      if (line.includes('\\frac') || line.includes('\\mathbf') || line.includes('\\text{') || line.includes('\\approx') || line.includes('\\le') || line.includes('\\ge') || line.includes('\\sum') || line.includes('\\cdot')) {
        // Did this raw command leak into the rendered html?
        // Check a distinctive snippet
        const matches = line.match(/\\[a-zA-Z]+(?:\{[^}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+)?/g);
        if (matches) {
          for (const m of matches) {
            // Check if m appears in rendered.html outside of code/pre/katex
            // Simple check: does rendered.html contain m where it's not inside katex or code?
            const cleanedHtml = html
              .replace(/<pre[\s\S]*?<\/pre>/g, '')
              .replace(/<code[\s\S]*?<\/code>/g, '')
              .replace(/<annotation[\s\S]*?<\/annotation>/g, '');
            if (cleanedHtml.includes(m)) {
              failures.push({
                chapter: c.id,
                line: lineNum,
                command: m,
                lineText: line.trim()
              });
              break;
            }
          }
        }
      }
    }
  }

  console.log(`Found ${failures.length} lines with leaking LaTeX!`);
  for (const f of failures) {
    console.log(`[${f.chapter}:${f.line}] (${f.command}): ${f.lineText}`);
  }
}

scanAllFailures().catch(console.error);
