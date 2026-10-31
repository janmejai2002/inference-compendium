"""Second pass: count only AI mentions that ask something of the CANDIDATE.
Drops recruitment disclaimers ("we may use AI to screen") and company blurbs ("X is an AI-first company"),
and dedupes JDs reposted with identical text. Usage: python li_asks.py <in.jsonl> <out_prefix> <label> [audit_n]
"""
import json, re, sys, csv, hashlib, random, collections

AI = re.compile(r"(?-i:\bA\.?I\b)|artificial intelligence|gen ?ai|generative|\bLLMs?\b|large language model|agentic|chatgpt|copilot|prompt engineering", re.I)
SENT = re.compile(r"[^.\n•▪;]+")
DISCLAIMER = re.compile(r"(recruit|hiring|screen\w*|applications?|candidates?|interview)\b.{0,80}\b(AI|artificial intelligence)|(AI|artificial intelligence).{0,80}\b(recruit\w*|hiring|screen\w*|applications?|interview)", re.I)
BLURB = re.compile(r"\b(we are|we're|is an?|is the|leading|leader in|pioneer|our (clients|mission|platform|portfolio)|founded|headquartered|powered by our|helping (the world|brands|businesses|organi[sz]ations)|we (use|build|leverage|harness)|builds|enables enterprises)\b", re.I)
ASK = re.compile(r"\b(you|your|experience|experienced|knowledge|proficien\w*|familiar\w*|exposure|understand\w*|abilit\w*|skills?|use|using|leverag\w*|driv\w*|identif\w*|implement\w*|champion\w*|apply\w*|build\w*|develop\w*|lead\w*|work with|preferred|must|should|comfortable|review\w*|evaluat\w*|deploy\w*|integrat\w*|automat\w*|scop\w*|prioriti\w*|translat\w*|adopt\w*|explor\w*|hands[- ]on|fluen\w*|litera\w*|curio\w*)\b", re.I)

KIND = {  # what the ask is about (applied to ask sentences only)
    "use_ai_tools": r"(AI|gen ?ai|AI[- ]powered|AI[- ]enabled|AI[- ]driven|AI[- ]assisted)\s+(tools?|assistants?|platforms?)|chatgpt|copilot|gemini|claude\b|prompt|AI fluen|AI litera|review\w* AI|AI[- ]supported outputs",
    "drive_ai_adoption": r"adopt\w*|transformation|use[- ]cases?|identify\w*.{0,40}opportunit|automation of|automat\w+.{0,30}(AI|process)|roadmap|strategy|champion",
    "build_ai_product": r"AI[- ]?(powered |driven |enabled |native )?(products?|features?|solutions?)|\bLLM\b|\bRAG\b|evals?\b|model|fine[- ]tun|agents?\b|agentic",
    "governance_risk": r"responsible|ethic|governance|risk|bias|fairness|privacy|complian|regulat|limitations",
}
KIND = {k: re.compile(v, re.I) for k, v in KIND.items()}

def classify(desc):
    asks, kinds, dropped = [], set(), collections.Counter()
    for s in SENT.findall(desc):
        s = s.strip()
        if len(s) < 20 or not AI.search(s):
            continue
        if DISCLAIMER.search(s):
            dropped["disclaimer"] += 1; continue
        if BLURB.search(s) and not re.search(r"\byou\b|\byour\b|experience|knowledge|skills?", s, re.I):
            dropped["blurb"] += 1; continue
        if ASK.search(s):
            asks.append(s[:350])
            kinds |= {k for k, p in KIND.items() if p.search(s)}
        else:
            dropped["other"] += 1
    return asks, kinds, dropped

def main():
    src, prefix, label = sys.argv[1], sys.argv[2], sys.argv[3]
    audit_n = int(sys.argv[4]) if len(sys.argv) > 4 else 0
    rows, seen = [], set()
    for l in open(src, encoding="utf-8"):
        r = json.loads(l)
        h = hashlib.md5(re.sub(r"\W+", "", r["description"].lower())[:3000].encode()).hexdigest()
        if h in seen:
            continue
        seen.add(h); rows.append(r)
    drops = collections.Counter()
    for r in rows:
        r["asks"], r["kinds"], d = classify(r["description"])
        drops += d
    by = collections.defaultdict(list)
    for r in rows:
        by[r["track"]].append(r)
    kinds = list(KIND)
    out = [f"# {label}\n",
           f"{len(rows)} unique postings (identical reposts removed). An AI mention counts only if it asks something of the candidate; "
           f"dropped sentences: {dict(drops)}. Classifier: `li_asks.py`.\n",
           "| track | n | asks anything about AI | use AI tools | drive AI adoption | build AI product | governance/risk |",
           "|---|---|---|---|---|---|---|"]
    for t, rs in sorted(by.items()) + [("ALL", rows)]:
        n = len(rs); a = sum(bool(r["asks"]) for r in rs)
        out.append(f"| {t} | {n} | **{100*a/n:.0f}%** ({a}) | " + " | ".join(f"{100*sum(k in r['kinds'] for r in rs)/n:.0f}%" for k in kinds) + " |")
    out.append("\n## Every candidate-facing AI ask, by track (verbatim, linked)\n")
    for t, rs in sorted(by.items()):
        hits = [r for r in rs if r["asks"]]
        out.append(f"\n### {t} ({len(hits)} postings)\n")
        for r in hits:
            out.append(f"- **{r['title']}**, {r['company']}, posted {r['posted']} ([JD]({r['url']})): " + " / ".join(f"“{s}”" for s in r["asks"][:2]))
    open(prefix + ".md", "w", encoding="utf-8").write("\n".join(out) + "\n")
    with open(prefix + ".csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["track", "title", "company", "posted", "ai_ask", *kinds, "first_ask", "url"])
        for r in rows:
            w.writerow([r["track"], r["title"], r["company"], r["posted"], int(bool(r["asks"])), *[int(k in r["kinds"]) for k in kinds], (r["asks"] or [""])[0], r["url"]])
    print("\n".join(out[:4 + len(by) + 1]))
    if audit_n:
        random.seed(7)
        for r in random.sample([r for r in rows if r["asks"]], audit_n):
            print(f"\nAUDIT+ [{r['track']}] {r['title']} | {r['company']}\n   {r['asks'][0][:220]}")

if __name__ == "__main__":
    main()
