import fs from 'node:fs';
import path from 'node:path';

const audit = JSON.parse(fs.readFileSync(path.join('.agents', 'teamwork', 'spec_miner_pedagogy', 'audit_full.json'), 'utf8'));

console.log("=== SLOP FINDINGS ===");
for (const ch of audit) {
  if (ch.slopFindings && ch.slopFindings.length > 0) {
    console.log(`\n--- [${ch.n}] ${ch.id} ---`);
    for (const s of ch.slopFindings) {
      console.log(`  Line ${s.line}: [${s.name}] "${s.match}"`);
    }
  }
}

console.log("\n=== TRAILING -ING FINDINGS ===");
for (const ch of audit) {
  if (ch.trailingIngs && ch.trailingIngs.length > 0) {
    console.log(`\n--- [${ch.n}] ${ch.id} ---`);
    for (const ing of ch.trailingIngs) {
      console.log(`  Line ${ing.line}: "${ing.match}"`);
    }
  }
}

console.log("\n=== TRY BLOCK IN MARKETING-CASEBOOK ===");
const mkt = audit.find(x => x.id === 'marketing-casebook');
if (mkt) {
  console.log(`tryHasCode: ${mkt.tryHasCode}, languages: ${JSON.stringify(mkt.tryCodeLanguages)}`);
}

