import fs from 'node:fs';
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

async function checkLink(id) {
  const s = sources[id];
  if (!s || !s.url) return { id, error: 'No URL' };
  try {
    const res = await fetch(s.url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(12000)
    });
    const status = res.status;
    const finalUrl = res.url;
    let title = '';
    try {
      const text = await res.text();
      const m = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (m) title = m[1].trim();
    } catch (e) {
      // ignore
    }
    return { id, status, originalUrl: s.url, finalUrl, title };
  } catch (err) {
    return { id, error: err.message, originalUrl: s.url };
  }
}

console.log('Testing 28 URLs...');
const results = [];
for (const id of unverifiedIds) {
  const r = await checkLink(id);
  results.push(r);
  console.log(`[${r.status || 'ERR'}] ${id}: ${r.error || r.title || r.finalUrl}`);
}

fs.writeFileSync('.agents/teamwork/spec_miner_citations/link_results.json', JSON.stringify(results, null, 2), 'utf8');
