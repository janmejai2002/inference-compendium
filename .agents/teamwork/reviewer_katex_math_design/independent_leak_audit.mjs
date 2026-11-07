import fs from 'node:fs';
import path from 'node:path';

const distCh = path.resolve('dist', 'ch');
const files = fs.readdirSync(distCh).filter(f => f.endsWith('.html'));

const latexCommands = [
  'frac', 'mathbf', 'mathit', 'mathrm', 'text', 'sum', 'prod', 'to', 'times',
  'alpha', 'beta', 'theta', 'sigma', 'approx', 'le', 'ge', 'in', 'forall',
  'exists', 'sqrt', 'partial', 'nabla', 'cdot', 'int', 'mu', 'lambda', 'gamma',
  'Delta', 'epsilon', 'left', 'right', 'over', 'begin', 'end'
];

let totalLeaks = 0;
const report = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(distCh, file), 'utf8');

  // Strip scripts, styles, pre, code
  let clean = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<pre[\s\S]*?<\/pre>/gi, '')
    .replace(/<code[\s\S]*?<\/code>/gi, '');

  // Strip mathml annotations (where raw LaTeX source is intentionally embedded as metadata)
  clean = clean.replace(/<annotation encoding="application\/x-tex">[\s\S]*?<\/annotation>/gi, '');

  // Check for latex commands outside of mathml annotation
  // A raw leak would look like \frac{...} or \mathbf{...} or \to in regular text
  // Note: KaTeX itself uses class names, but does NOT emit raw backslash commands into HTML text nodes except possibly in aria-label or annotations.
  
  // Strip all HTML tags
  const textOnly = clean.replace(/<[^>]+>/g, ' ');

  for (const cmd of latexCommands) {
    const regex = new RegExp(`\\\\${cmd}\\b`, 'g');
    const matches = textOnly.match(regex);
    if (matches) {
      // Exclude Windows file paths like \text or similar if any
      totalLeaks += matches.length;
      report.push({ file, cmd, count: matches.length });
    }
  }

  // Also check for unrendered math: e.g. $something$ where something is not just a currency number
  // Match $...$ where the inner part has letters and no spaces or math operators
  const dollarPairs = textOnly.match(/(?<=^|\s)\$([a-zA-Z_\\^][^$\n]*?)\$(?=\s|[.,;:!?]|$)/g);
  if (dollarPairs) {
    for (const dp of dollarPairs) {
      // Exclude simple currency like $10 or $50M
      if (!/^\$\s*\d+/.test(dp)) {
        console.log(`Potential unrendered dollar math in ${file}: "${dp}"`);
        totalLeaks++;
      }
    }
  }
}

console.log('--- INDEPENDENT LEAK AUDIT RESULTS ---');
console.log('Total files checked:', files.length);
console.log('Total LaTeX command leaks found:', totalLeaks);
if (report.length > 0) {
  console.log('Details:', JSON.stringify(report, null, 2));
} else {
  console.log('Zero raw LaTeX commands found in user-facing text across all 28 chapters!');
}
