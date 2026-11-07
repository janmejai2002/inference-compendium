import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const sources = yaml.load(fs.readFileSync('content/sources.yml', 'utf8'));
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

console.log(`Total unverified checked: ${unverifiedIds.length}`);

for (const [idx, id] of unverifiedIds.entries()) {
  const s = sources[id];
  console.log(`\n--- [${idx+1}] ${id} ---`);
  if (!s) {
    console.log('NOT FOUND in sources.yml');
  } else {
    console.log(yaml.dump({ [id]: s }));
  }
}
