import { loadBook, renderChapter } from '../../../scripts/lib/render.mjs';

async function test() {
  const ctx = await loadBook();
  const c = ctx.chapters.find(x => x.id === 'product-casebook');
  const rendered = renderChapter(c, ctx, 'web');
  
  // Find where line 347 content is
  const lines = rendered.html.split('\n');
  const matches = lines.filter(l => l.includes('Pure token break-even') || l.includes('mathbf') || l.includes('1.28'));
  console.log('RENDERED OUTPUT FOR PRODUCT CASEBOOK:');
  console.log(matches.join('\n'));
}

test().catch(console.error);
