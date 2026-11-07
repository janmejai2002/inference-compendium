import fs from 'node:fs';
import path from 'node:path';

const audit = JSON.parse(fs.readFileSync(path.join('.agents', 'teamwork', 'spec_miner_pedagogy', 'audit_full.json'), 'utf8'));

console.log("=== SENTENCE CADENCE & BURSTINESS AUDIT ===");
console.log("Chapter".padEnd(42) + "Words".padEnd(8) + "MeanLen".padEnd(10) + "StdevLen (Burstiness)".padEnd(24) + "Burstiness Ratio");
console.log("-".repeat(95));

for (const ch of audit) {
  const ratio = ch.meanLen > 0 ? (ch.stdevLen / ch.meanLen).toFixed(2) : "0.00";
  console.log(
    `[Ch ${ch.n}] ${ch.id}`.padEnd(42) +
    `${ch.words}`.padEnd(8) +
    `${ch.meanLen}`.padEnd(10) +
    `${ch.stdevLen}`.padEnd(24) +
    `${ratio}`
  );
}
