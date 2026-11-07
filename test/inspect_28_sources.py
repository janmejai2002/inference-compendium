import yaml
import sys

sys.stdout.reconfigure(encoding='utf-8')

# The 28 sources listed in STATUS.md:
target_keys = [
    "3b1b-neural-network",
    "wolfram-chatgpt",
    "hbs-jagged-frontier",
    "mollick-centaurs",
    "stanford-ai-index",
    "hbr-simple-economics-machine-intelligence",
    "anthropic-project-vend",
    "willison-lethal-trifecta",
    "ibm-agent-skills",
    "hbr-ideacast-sternfels",
    "epoch-inference-price-trends",
    "boyle-big-tech-debt",
    "sarvam-bulbul-v4-flash",
    "google-meridian",
    "meta-robyn",
    "unilever-digital-twins",
    "argyle-out-of-one-many",
    "horton-homo-silicus",
    "brand-llm-market-research",
    "asci-genai-guidelines",
    "openai-evals-framework",
    "anthropic-context-caching",
    "anthropic-prompt-engineering-interactive",
    "google-gemini-long-context",
    "cagan-transformed-ai",
    "cagan-svpg-ai-risk",
    "zheng-judging-llm-as-judge",
    "card-moran-newell-psychology-hci",
]

with open("content/sources.yml", "r", encoding="utf-8") as f:
    sources = yaml.safe_load(f)

print(f"Total sources in yml: {len(sources)}")
print(f"Checking {len(target_keys)} target sources:")

found = 0
missing = []
for k in target_keys:
    if k in sources:
        found += 1
        src = sources[k]
        print(f"\n[{k}] (verified: {src.get('verified')}, tier: {src.get('tier')})")
        print(f"  Title: {src.get('title')}")
        print(f"  Creator: {src.get('creator')}")
        print(f"  Publisher: {src.get('publisher')}")
        print(f"  Year: {src.get('year')}")
        print(f"  URL: {src.get('url')}")
    else:
        missing.append(k)

print(f"\nFound {found} / {len(target_keys)}. Missing: {missing}")
