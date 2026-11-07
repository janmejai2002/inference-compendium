import { loadBook, renderChapter } from '../../../scripts/lib/render.mjs';

async function test() {
  const ctx = await loadBook();
  const c = ctx.chapters.find(x => x.id === 'ai-casebook');
  const rendered = renderChapter(c, ctx, 'web');
  
  // Check if any <pre><code> contains "class=\"formula\"" or "katex"
  const preBlocks = rendered.html.match(/<pre><code>[\s\S]*?<\/code><\/pre>/g) || [];
  console.log(`Total <pre><code> blocks in ai-casebook: ${preBlocks.length}`);
  for (const b of preBlocks) {
    if (b.includes('formula') || b.includes('katex')) {
      console.log('WARNING: Formula got captured in a code block!');
      console.log(b.slice(0, 150));
    }
  }
}

test().catch(console.error);
