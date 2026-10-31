"""Analyse scraped JDs: what kind of AI does each ask for? Writes a markdown report + CSV index.
Usage: python li_analyse.py <in.jsonl> <out_prefix> <label>
"""
import json, re, sys, csv, collections

CATS = {
    "any_ai":      r"\bA\.?I\b|artificial intelligence|gen ?ai|generative|machine learning|\bLLMs?\b|large language model|agentic|\bAI[- ]?(agents?|tools?)\b",
    "genai":       r"gen ?ai|generative|\bLLMs?\b|large language model|chatgpt|copilot|gemini|claude\b|prompt",
    "use_tools":   r"(use|using|leverag\w*|proficien\w*|familiar\w*|comfortable|hands[- ]on)[^.\n]{0,60}(AI tools|AI[- ]powered tools|gen ?ai tools|chatgpt|copilot|gemini|claude\b|LLMs?)|AI[- ]first|AI[- ]native|AI fluen\w*|AI litera\w*|prompt(ing| engineering)",
    "agentic":     r"agentic|AI agents?|autonomous agents?|multi[- ]agent",
    "build_ai_product": r"AI(-| )?(powered|driven|enabled|native)? (products?|features?)|LLM[- ]based|\bRAG\b|retrieval[- ]augmented|evals?\b|evaluation of (models|AI)|model (performance|accuracy)|fine[- ]tun\w*",
    "ai_strategy": r"AI (strategy|transformation|adoption|roadmap|use[- ]cases?|opportunit\w+|initiatives?)|(identify|scope|prioriti\w+)[^.\n]{0,40}use[- ]cases?",
    "responsible": r"responsible AI|AI governance|AI (ethics|risk|regulation|policy)|(algorithmic|model|AI) bias|bias in (AI|models?|algorithms?)|hallucinat\w*|EU AI Act|DPDP",
    "ml_ds":       r"machine learning|data scien\w+|predictive (model\w*|analytics)|\bML\b|forecasting model",
    "automation":  r"automat\w+|\bRPA\b|low[- ]code|no[- ]code|workflow tools",
    "analytics":   r"\bSQL\b|python|power ?bi|tableau|advanced excel|\bdata analy\w+|dashboards?",
}
FLAGS = {k: re.compile(v, re.I if k != "any_ai" else 0) for k, v in CATS.items()}
FLAGS["any_ai"] = re.compile(CATS["any_ai"].replace(r"\bA\.?I\b", r"(?-i:\bA\.?I\b)"), re.I)
MBA = re.compile(r"\bMBA\b|PGDM|PGP\b|post[- ]?graduat\w+ (degree|diploma) in (management|business)|business school|B-school|Tier[- ]?1", re.I)
AISENT = re.compile(r"[^.\n•]*(?:(?-i:\bAI\b)|artificial intelligence|gen ?ai|generative|LLM|agentic|AI agents?)[^.\n•]*", re.I)

def main():
    src, prefix, label = sys.argv[1], sys.argv[2], sys.argv[3]
    rows = [json.loads(l) for l in open(src, encoding="utf-8")]
    by = collections.defaultdict(list)
    for r in rows:
        d = r["title"] + "\n" + r["description"]
        r["flags"] = {k: bool(p.search(d)) for k, p in FLAGS.items()}
        r["mba"] = bool(MBA.search(d))
        r["ai_lines"] = [s.strip() for s in AISENT.findall(r["description"]) if 25 < len(s.strip()) < 400][:4]
        by[r["track"]].append(r)
    keys = list(CATS)
    with open(prefix + ".csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["track", "title", "company", "location", "posted", "mba_mentioned", *keys, "url", "fetched"])
        for r in rows:
            w.writerow([r["track"], r["title"], r["company"], r["location"], r["posted"], r["mba"],
                        *[int(r["flags"][k]) for k in keys], r["url"], r["fetched"]])
    out = [f"# {label}\n", f"Source file: `{src.split('/')[-1]}`; {len(rows)} postings; fetched {min(r['fetched'] for r in rows)[:10]} to {max(r['fetched'] for r in rows)[:10]}.\n",
           "Percent of postings whose title+description match each category (regexes in the analysis script, saved alongside).\n"]
    def table(groups, title):
        out.append(f"\n## {title}\n")
        out.append("| track | n | " + " | ".join(keys) + " |")
        out.append("|---|---|" + "---|" * len(keys))
        for t, rs in groups:
            n = len(rs)
            out.append(f"| {t} | {n} | " + " | ".join(f"{100*sum(r['flags'][k] for r in rs)/n:.0f}%" for k in keys) + " |")
    groups = sorted(by.items()) + [("ALL", rows)]
    table(groups, "All postings")
    mb = [(t, [r for r in rs if r["mba"]]) for t, rs in groups]
    table([(t, rs) for t, rs in mb if rs], "Only postings that mention MBA/PGDM/B-school")
    out.append("\n## Companies (top 40 by postings)\n")
    out.append(", ".join(f"{c} ({n})" for c, n in collections.Counter(r["company"] for r in rows).most_common(40)))
    out.append("\n\n## What the AI lines actually say (sample per track, with links)\n")
    for t, rs in sorted(by.items()):
        out.append(f"\n### {t}\n")
        for r in [r for r in rs if r["ai_lines"]][:14]:
            out.append(f"- **{r['title']}**, {r['company']} ([JD]({r['url']})): " + " / ".join(f"“{s}”" for s in r["ai_lines"][:2]))
    open(prefix + ".md", "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("\n".join(out[:2 + 2 * (len(groups) + 4)]))

if __name__ == "__main__":
    main()
