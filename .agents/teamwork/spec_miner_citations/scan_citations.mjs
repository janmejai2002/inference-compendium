import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const sources = yaml.load(fs.readFileSync('content/sources.yml', 'utf8'));
const chaptersDir = 'content/chapters';
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

const unverifiedIds = new Set([
  '3b1b-neural-network', 'wolfram-chatgpt', 'hbs-jagged-frontier', 'mollick-centaurs',
  'stanford-ai-index', 'hbr-simple-economics-machine-intelligence', 'anthropic-project-vend',
  'willison-lethal-trifecta', 'ibm-agent-skills', 'hbr-ideacast-sternfels',
  'epoch-inference-price-trends', 'boyle-big-tech-debt', 'sarvam-bulbul-v4-flash',
  'google-meridian', 'meta-robyn', 'unilever-digital-twins', 'argyle-out-of-one-many',
  'horton-homo-silicus', 'brand-llm-market-research', 'asci-genai-guidelines',
  'openai-evals-framework', 'anthropic-context-caching', 'anthropic-prompt-engineering-interactive',
  'google-gemini-long-context', 'cagan-transformed-ai', 'cagan-svpg-ai-risk',
  'zheng-judging-llm-as-judge', 'card-moran-newell-psychology-hci'
]);

const citationsFound = {}; // sourceId -> list of { file, line, type, text }
const brokenCitations = []; // { file, line, id, type }
const allCitations = new Set();

for (const id of unverifiedIds) {
  citationsFound[id] = [];
}

for (const file of files) {
  const filePath = path.join(chaptersDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check {{watch/read/paper/listen/media id}}
    const mediaRegex = /\{\{\s*(watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}/g;
    let m;
    while ((m = mediaRegex.exec(line)) !== null) {
      const type = m[1];
      const id = m[2];
      allCitations.add(id);
      if (!sources[id]) {
        brokenCitations.push({ file, lineNum, id, type: `{{${type} ${id}}}` });
      }
      if (unverifiedIds.has(id)) {
        citationsFound[id].push({
          file,
          lineNum,
          type: `{{${type} ${id}}}`,
          snippet: line.trim()
        });
      }
    }

    // Check [@source-id]
    const citeRegex = /\[@([\w-]+)\]/g;
    let c;
    while ((c = citeRegex.exec(line)) !== null) {
      const id = c[1];
      allCitations.add(id);
      if (!sources[id]) {
        brokenCitations.push({ file, lineNum, id, type: `[@${id}]` });
      }
      if (unverifiedIds.has(id)) {
        citationsFound[id].push({
          file,
          lineNum,
          type: `[@${id}]`,
          snippet: line.trim()
        });
      }
    }
  });
}

console.log('=== CITATION INTEGRITY SCAN ===');
console.log(`Broken citations found: ${brokenCitations.length}`);
if (brokenCitations.length > 0) {
  console.log(JSON.stringify(brokenCitations, null, 2));
}

console.log('\n=== UNVERIFIED SOURCES USAGE ===');
for (const [id, occurrences] of Object.entries(citationsFound)) {
  console.log(`\nSource: ${id} (${occurrences.length} references)`);
  if (occurrences.length === 0) {
    console.log('  *** UNREFERENCED IN ALL CHAPTERS ***');
  } else {
    for (const occ of occurrences) {
      console.log(`  - [${occ.file}:${occ.lineNum}] ${occ.type}`);
      console.log(`    Context: ${occ.snippet}`);
    }
  }
}
