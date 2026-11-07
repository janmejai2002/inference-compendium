import fs from 'node:fs';
import { loadBook, renderChapter } from '../../../scripts/lib/render.mjs';

async function test() {
  const ctx = await loadBook();
  const chapters = ctx.chapters.filter(c => c.file);

  const leaks = [];

  for (const c of chapters) {
    const rendered = renderChapter(c, ctx, 'print');
    let html = rendered.html;

    // Strip pre, code, formula divs, and katex spans
    html = html.replace(/<pre[\s\S]*?<\/pre>/g, '');
    html = html.replace(/<code[\s\S]*?<\/code>/g, '');
    html = html.replace(/<div class="formula"[\s\S]*?<\/div>/g, '');
    html = html.replace(/<span class="katex"[\s\S]*?<\/span>\s*<\/span>\s*<\/span>/g, '');
    // In case any katex span remains:
    html = html.replace(/<span class="katex"[\s\S]*?<\/span>/g, '');

    // Now look for raw LaTeX commands in the remaining prose:
    const rawLatex = html.match(/\\[a-zA-Z]{2,}(?:\{[^}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+)/g);
    if (rawLatex) {
      const filtered = rawLatex.filter(x => !x.startsWith('\\Users') && !x.startsWith('\\n') && !x.startsWith('\\t'));
      if (filtered.length > 0) {
        leaks.push({
          chapter: c.id,
          matches: filtered
        });
      }
    }
  }

  console.log('Real LaTeX leaks outside math/code/formula blocks:', leaks.length);
  if (leaks.length > 0) {
    console.log(JSON.stringify(leaks, null, 2));
  }
}

test().catch(console.error);
