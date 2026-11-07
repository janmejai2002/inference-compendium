import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const sources = yaml.load(fs.readFileSync('content/sources.yml', 'utf8'));
const toc = yaml.load(fs.readFileSync('content/toc.yml', 'utf8'));
const chaptersDir = 'content/chapters';

const unverifiedIds = [
  '3b1b-neural-network', 'wolfram-chatgpt', 'hbs-jagged-frontier', 'mollick-centaurs',
  'stanford-ai-index', 'hbr-simple-economics-machine-intelligence', 'anthropic-project-vend',
  'willison-lethal-trifecta', 'ibm-agent-skills', 'hbr-ideacast-sternfels',
  'epoch-inference-price-trends', 'boyle-big-tech-debt', 'sarvam-bulbul-v4-flash',
  'google-meridian', 'meta-robyn', 'unilever-digital-twins', 'argyle-out-of-one-many',
  'horton-homo-silicus', 'brand-llm-market-research', 'asci-genai-guidelines',
  'openai-evals-framework', 'anthropic-context-caching', 'anthropic-prompt-engineering-interactive',
  'google-gemini-long-context', 'cagan-transformed-ai', 'cagan-svpg-ai-risk',
  'zheng-judging-llm-as-judge', 'card-moran-newell-psychology-hci'
];

const results = {};

for (const id of unverifiedIds) {
  results[id] = {
    meta: sources[id],
    citations: []
  };
}

const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    for (const id of unverifiedIds) {
      if (line.includes(id)) {
        // extract surrounding context (3 lines before and after)
        const start = Math.max(0, idx - 2);
        const end = Math.min(lines.length - 1, idx + 2);
        const contextLines = lines.slice(start, end + 1).map((l, i) => `${start + i + 1}: ${l}`).join('\n');
        results[id].citations.push({
          file,
          line: idx + 1,
          context: contextLines
        });
      }
    }
  });
}

fs.writeFileSync('.agents/teamwork/spec_miner_citations/citations_map.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved detailed citations_map.json');
