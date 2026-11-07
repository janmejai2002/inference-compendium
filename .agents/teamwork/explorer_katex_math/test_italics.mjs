import { loadBook, renderChapter } from '../../../scripts/lib/render.mjs';

async function test() {
  const ctx = await loadBook();
  const c = ctx.chapters.find(x => x.id === 'product-casebook');
  const rendered = renderChapter(c, ctx, 'web');
  const lines = rendered.html.split('\n');
  const match = lines.find(l => l.includes('Pure token break-even'));
  console.log('HTML OF LINE 347:');
  console.log(match);
}

test().catch(console.error);
