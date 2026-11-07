import urllib.request
import urllib.error
import ssl
import sys
import yaml
import time

sys.stdout.reconfigure(encoding='utf-8')

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

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print(f"Testing {len(target_keys)} URLs...")
results = []

for k in target_keys:
    src = sources[k]
    url = src.get('url')
    print(f"Testing [{k}]: {url}")
    status = None
    err_msg = ""
    start_t = time.time()
    try:
        req = urllib.request.Request(url, headers=headers)
        # First try GET with a stream to only read first few KB
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            status = resp.status
            head_data = resp.read(2048)
            content_sample = head_data.decode('utf-8', errors='ignore')
    except urllib.error.HTTPError as e:
        status = e.code
        err_msg = str(e)
    except Exception as e:
        status = "ERR"
        err_msg = str(e)
    
    elapsed = round(time.time() - start_t, 2)
    print(f"  -> Status: {status} ({elapsed}s) {err_msg}")
    results.append({
        'key': k,
        'url': url,
        'status': status,
        'error': err_msg,
        'title': src.get('title'),
        'creator': src.get('creator'),
        'year': src.get('year')
    })

print("\n=== SUMMARY OF URL CHECKS ===")
ok_count = 0
fail_count = 0
for r in results:
    s = r['status']
    # 200, 301, 302, 403 (some anti-bot like Cloudflare/Akamai block automated python UA but exist)
    if s == 200 or s in (301, 302, 307, 308):
        print(f"PASS: {r['key']} -> {s}")
        ok_count += 1
    elif s in (403, 429):
        print(f"BOT_CHALLENGE / BLOCKED (403/429): {r['key']} -> {s} ({r['url']})")
        ok_count += 1 # HTTP server answered, URL exists
    else:
        print(f"FAIL: {r['key']} -> {s}: {r['error']} ({r['url']})")
        fail_count += 1

print(f"\nTotal OK / Resolving: {ok_count}, Failed: {fail_count}")
