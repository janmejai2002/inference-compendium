import katex from 'katex';

const oldRegex = /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g;
const newRegex = /(?<=^|[\s(])\$(?!\$)((?:\\\$|[^\$\n])+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g;

const testStr = 'Pure token break-even is $Q^* = \\frac{C_{\\text{write}} - C_{\\text{read}}}{C_{\\text{uncached}} - C_{\\text{read}}} = \\frac{\\$3.75 - \\$0.30}{\\$3.00 - \\$0.30} = \\frac{\\$3.45}{\\$2.70} \\approx \\mathbf{1.28\\text{ queries}}$.';

console.log('--- OLD REGEX MATCH ---');
const oldMatches = [...testStr.matchAll(oldRegex)];
console.log(`Matched: ${oldMatches.length}`);

console.log('--- NEW REGEX MATCH ---');
const newMatches = [...testStr.matchAll(newRegex)];
console.log(`Matched: ${newMatches.length}`);
if (newMatches.length > 0) {
  console.log('Extracted math:', newMatches[0][1]);
  try {
    const rendered = katex.renderToString(newMatches[0][1].trim(), { displayMode: false });
    console.log('KaTeX render SUCCESS! Length:', rendered.length);
  } catch (err) {
    console.log('KaTeX render error:', err.message);
  }
}
