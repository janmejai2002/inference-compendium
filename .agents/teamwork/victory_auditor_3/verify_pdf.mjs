import fs from 'node:fs';
import path from 'node:path';

const pdfPath = 'C:\\Users\\Janmejai\\compendium\\editions\\INFERENCE-v4-finance-draft.pdf';
const distPdfPath = 'C:\\Users\\Janmejai\\compendium\\dist\\INFERENCE.pdf';

console.log('--- INDEPENDENT PDF VERIFICATION ---');
if (!fs.existsSync(pdfPath)) {
  console.error(`FATAL: PDF does not exist at ${pdfPath}`);
  process.exit(1);
}

const stats = fs.statSync(pdfPath);
console.log(`File: ${pdfPath}`);
console.log(`Size: ${stats.size} bytes (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);

const fd = fs.openSync(pdfPath, 'r');
const headBuf = Buffer.alloc(1024);
fs.readSync(fd, headBuf, 0, 1024, 0);

const tailSize = Math.min(stats.size, 16384);
const tailBuf = Buffer.alloc(tailSize);
fs.readSync(fd, tailBuf, 0, tailSize, stats.size - tailSize);
fs.closeSync(fd);

const header = headBuf.toString('utf8', 0, 32);
console.log(`Header: ${JSON.stringify(header)}`);
if (!header.startsWith('%PDF-')) {
  console.error('FATAL: Invalid PDF header');
  process.exit(1);
}

const tail = tailBuf.toString('binary');
const hasEof = tail.includes('%%EOF');
console.log(`Trailer has %%EOF: ${hasEof}`);
if (!hasEof) {
  console.error('FATAL: Missing %%EOF marker');
  process.exit(1);
}

// Search for Page count in PDF catalog/Pages object
// /Type /Pages ... /Count 498
const rawTailAndHead = headBuf.toString('utf8') + ' ... ' + tailBuf.toString('utf8');
const countMatch = tail.match(/\/Count\s+(\d+)/);
if (countMatch) {
  console.log(`Pages /Count matched: ${countMatch[1]} pages`);
} else {
  console.log('Could not find /Count in tail, scanning buffer...');
}

// Check full file buffer for key chapter strings or PDF markers
const fullBuf = fs.readFileSync(pdfPath);
console.log(`Read ${fullBuf.length} bytes into memory.`);

// Check for uncompressed or metadata text
const stringsToFind = [
  'INFERENCE',
  'Finance',
  'Algorithmic',
  'Underwriting'
];

for (const s of stringsToFind) {
  const found = fullBuf.includes(Buffer.from(s, 'utf8'));
  console.log(`Contains "${s}": ${found}`);
}

// Compare with dist/INFERENCE.pdf
if (fs.existsSync(distPdfPath)) {
  const distStats = fs.statSync(distPdfPath);
  console.log(`dist/INFERENCE.pdf size: ${distStats.size} bytes`);
  const isMatch = distStats.size === stats.size && fullBuf.equals(fs.readFileSync(distPdfPath));
  console.log(`Matches dist/INFERENCE.pdf exactly (byte-for-byte): ${isMatch}`);
}

console.log('PDF verification successfully passed!');
