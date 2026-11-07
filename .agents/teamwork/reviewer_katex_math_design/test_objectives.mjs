import { loadBook, renderChapter } from '../../../scripts/lib/render.mjs';

async function main() {
  const ctx = await loadBook();
  let found = 0;
  for (const ch of ctx.chapters.filter(c => c.file)) {
    for (const o of (ch.objectives || [])) {
      if (o.includes('$')) {
        found++;
        console.log(`\nChapter: ${ch.id}`);
        console.log(`Objective raw: ${o}`);
        const r = renderChapter(ch, ctx, 'web');
        const openerMatch = r.html.match(/<header class="opener"[\s\S]*?<\/header>/);
        if (openerMatch) {
          const hasKatex = openerMatch[0].includes('class="katex"');
          const hasUnrendered = openerMatch[0].includes('$\\') || openerMatch[0].includes('$Q');
          console.log(`Opener contains rendered katex: ${hasKatex}`);
          console.log(`Opener contains unrendered dollar/latex: ${hasUnrendered}`);
        }
      }
    }
  }
  console.log(`\nTotal objectives with math: ${found}`);
}

main().catch(console.error);
