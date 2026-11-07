import { loadBook, renderChapter } from '../scripts/lib/render.mjs';

async function main() {
  const ctx = await loadBook();
  const testCases = [
    '$10M',
    '$0.30/1M',
    '\\$3.75',
    '₹20',
    '$50 billion',
    'priced between $10 and $20',
    'costs $10M and yields $20M',
    'fee is $0.30/1M tokens',
    'from $100 to $200',
    'it is $5 vs $10',
    'at $2.50 per unit',
    'cost is $0.0048 per call',
    'Real math: $E=mc^2$ works',
    'Matrix math: $\\mathbf{W}x + b$',
    'Inline math with fraction: $\\frac{a}{b}$',
    'Display math: $$\\sum_{i=1}^n x_i$$',
    'Edge currency: $10-$20',
    'Unmatched dollar: $10M only',
    'Multiple currencies: $10M in Q1, $20M in Q2, and $30M in Q3'
  ];

  console.log('Testing currency edge cases in renderChapter:\n');
  for (const tc of testCases) {
    const dummyChapter = { id: 'test', n: '99', title: 'Test', body: tc, track: 'foundations', part: { n: 'I', id: 'p1' } };
    const { prose: html } = renderChapter(dummyChapter, ctx, 'web');
    const ledeMatch = html.match(/<p class="lede">([\s\S]*?)<\/p>/);
    const content = ledeMatch ? ledeMatch[1].trim() : html;
    const hasKatex = content.includes('class="katex"');
    const hasKatexError = content.includes('class="katex-error"') || content.includes('class="math-raw"');
    console.log(`Input:   "${tc}"`);
    console.log(`Output:  ${content}`);
    console.log(`KaTeX:   ${hasKatex ? 'TRIGGERED' : 'none'} ${hasKatexError ? '(! ERROR !)' : ''}`);
    console.log('--------------------------------------------------');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
