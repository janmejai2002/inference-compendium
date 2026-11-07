import fs from 'node:fs';
import path from 'node:path';

const inventory = JSON.parse(fs.readFileSync(path.join('.agents', 'teamwork', 'spec_miner_pedagogy', 'slop_inventory.json'), 'utf8'));

console.log("=== EXACT SLOP & PARTICIPLE INVENTORY ===");
for (const item of inventory) {
  console.log(`\nFile: ${item.file}:${item.lineNum}`);
  console.log(`Tag: [${item.tag}] -> Match: "${item.match}"`);
  console.log(`Text: ${item.lineText}`);
}
