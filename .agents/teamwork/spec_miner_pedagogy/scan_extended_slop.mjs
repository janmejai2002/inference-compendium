import fs from 'node:fs';
import path from 'node:path';

const ROOT = "C:\\Users\\Janmejai\\compendium";
const CHAPTERS_DIR = path.join(ROOT, 'content', 'chapters');

const EXTENDED_SLOP = [
  // A. Legacy & Significance Inflation
  { tag: "testament", re: /\btestament\b/i },
  { tag: "stark reminder", re: /\bstark reminder\b/i },
  { tag: "crucial", re: /\bcrucial\b/i },
  { tag: "pivotal", re: /\bpivotal\b/i },
  { tag: "vital", re: /\bvital\b/i },
  { tag: "key role", re: /\bkey role\b/i },
  { tag: "instrumental role", re: /\binstrumental role\b/i },
  { tag: "marks a shift", re: /\bmarks? a shift\b/i },
  { tag: "turning point", re: /\bturning point\b/i },
  { tag: "sets the stage", re: /\bsets? the stage\b/i },
  { tag: "paves the way", re: /\bpaves? the way\b/i },
  { tag: "evolving landscape", re: /\b(?:evolving|shifting)\s+landscape\b/i },
  { tag: "rapidly evolving", re: /\brapidly evolving\b/i },
  { tag: "fast-evolving", re: /\bfast-evolving\b/i },
  { tag: "indelible mark", re: /\bindelible mark\b/i },
  { tag: "deeply rooted", re: /\bdeeply rooted\b/i },
  { tag: "delve", re: /\bdelv(?:e|es|ed|ing)\b/i },
  
  // B. Trailing participial clauses
  { tag: "trailing -ing", re: /,\s+(?:underscoring|highlighting|reflecting|ensuring|demonstrating|fostering|encompassing|cultivating|offering|showcasing|signaling|bridging|mirroring)\b/i },
  
  // C. Melodrama & Dichotomy Cliches
  { tag: "high-stakes world", re: /\bhigh-stakes world\b/i },
  { tag: "not a question of if", re: /\bnot a question of if\b/i },
  { tag: "it is not simply", re: /\bit is not simply\b/i },
  { tag: "consider the case of", re: /\bconsider the case of\b/i },
  { tag: "lesson is unequivocal", re: /\blesson is unequivocal\b/i },
  { tag: "reality is sobering", re: /\breality is sobering\b/i },
  { tag: "at the end of the day", re: /\bat the end of the day\b/i },
  { tag: "double-edged", re: /\bdouble-edged\b/i },
  { tag: "game-changing", re: /\bgame-changing\b/i },
  { tag: "transformative", re: /\btransformative\b/i },
  { tag: "unprecedented", re: /\bunprecedented\b/i },
  { tag: "important to remember", re: /\bimportant to remember\b/i },
  { tag: "beacon", re: /\bbeacon\b/i },
  { tag: "tapestry", re: /\btapestry\b/i },
  { tag: "supercharge", re: /\bsupercharge\b/i },
  { tag: "seamlessly", re: /\bseamlessly\b/i },
  { tag: "harness the power", re: /\bharness(?:ing)? the power\b/i },
  { tag: "delve into", re: /\bdelve into\b/i }
];

const files = fs.readdirSync(CHAPTERS_DIR).filter(f => f.endsWith('.md')).sort();

const allMatches = [];

for (const file of files) {
  const p = path.join(CHAPTERS_DIR, file);
  const text = fs.readFileSync(p, 'utf8');
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // skip frontmatter deck/title or bibliography urls if any
    for (const pat of EXTENDED_SLOP) {
      const match = line.match(pat.re);
      if (match) {
        allMatches.push({
          file,
          lineNum: i + 1,
          tag: pat.tag,
          match: match[0],
          lineText: line.trim()
        });
      }
    }
  }
}

console.log(`Found ${allMatches.length} total matches across ${files.length} chapter files.`);
const byTag = {};
const byFile = {};
for (const m of allMatches) {
  byTag[m.tag] = (byTag[m.tag] || 0) + 1;
  byFile[m.file] = (byFile[m.file] || 0) + 1;
}

console.log("\nMatches by Tag:", byTag);
console.log("\nMatches by File:", byFile);

fs.writeFileSync(
  path.join('.agents', 'teamwork', 'spec_miner_pedagogy', 'slop_inventory.json'),
  JSON.stringify(allMatches, null, 2),
  'utf8'
);
