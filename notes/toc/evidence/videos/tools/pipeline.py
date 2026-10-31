"""Video pipeline: candidates -> metadata gates -> transcripts -> Gemini Flash scoring (agy) -> EMBED/DISTIL/DROP.
Usage: python pipeline.py <queries.txt> <outdir> [per_concept_cap]
queries.txt lines: concept_id|search query
"""
import json, os, re, subprocess, sys, time, math, concurrent.futures as cf

HERE = os.path.dirname(os.path.abspath(__file__))
OFFICIAL = re.compile(r"anthropic|openai|google deepmind|google for developers|google cloud|microsoft|nvidia|ibm technology|stanford|mit |harvard|wharton|mckinsey|boston consulting|bcg|bain|y combinator|a16z|andreessen|deeplearning\.?ai|world economic forum|financial times|the economist|bloomberg|cnbc|wall street journal|wsj|reuters|hbr|harvard business review|reserve bank|nasscom|mint|economic times|et now|cnbc-tv18", re.I)
FAST = {"agents", "cost_economics", "ai_business", "ai_work", "evaluation"}
BOOK_DATE = 20261031
W = {"watchability": .25, "clarity": .20, "concept_fit": .20, "business_relevance": .15, "density": .10, "authority": .10}

def run(cmd, timeout=120):
    try:
        return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=timeout).stdout
    except subprocess.TimeoutExpired:
        return ""

def search(q, n=8):
    out = run(["agent-reach", "youtube", "search", q, "--limit", str(n)])
    try:
        return [i["raw"]["id"] for i in json.loads(out)["items"]]
    except Exception:
        return []

def meta(vid):
    out = run(["yt-dlp", "-j", "--skip-download", f"https://www.youtube.com/watch?v={vid}"])
    try:
        d = json.loads(out)
    except Exception:
        return None
    return {k: d.get(k) for k in ["id", "title", "channel", "channel_follower_count", "channel_is_verified", "upload_date",
                                  "view_count", "like_count", "duration", "language", "webpage_url"]}

def gates(m, concept):
    why = []
    subs, views = m.get("channel_follower_count") or 0, m.get("view_count") or 0
    official = bool(OFFICIAL.search(m.get("channel") or ""))
    if not (subs >= 100_000 or (official and m.get("channel_is_verified"))): why.append("G1 channel")
    if not (views >= 100_000 or (official and views >= 20_000)): why.append("G2 reach")
    ud = int(m.get("upload_date") or 0)
    age_months = (BOOK_DATE // 10000 - ud // 10000) * 12 + (BOOK_DATE // 100 % 100 - ud // 100 % 100)
    if concept in FAST and age_months > 18: why.append("G3 stale")
    if (m.get("language") or "en")[:2] not in ("en", "hi"): why.append("G6 language")
    dur = m.get("duration") or 0
    if dur < 150: why.append("too short")
    if dur > 5400: why.append("too long")
    m["official"], m["age_months"] = official, age_months
    return why

def transcript(vid, d):
    txt = os.path.join(d, f"{vid}.txt")
    if os.path.exists(txt):
        return txt
    run(["yt-dlp", "--skip-download", "--write-auto-subs", "--write-subs", "--sub-langs", "en,en-orig,en-US,en-GB",
         "--sub-format", "vtt", "--sleep-subtitles", "2", "-o", os.path.join(d, vid), f"https://www.youtube.com/watch?v={vid}"], 180)
    vtts = sorted(f for f in os.listdir(d) if f.startswith(vid) and f.endswith(".vtt"))
    if not vtts:
        return None
    run([sys.executable, "-I", os.path.join(HERE, "vtt2txt.py"), os.path.join(d, vtts[0]), txt])
    return txt if os.path.exists(txt) else None

def score(m, txt, d):
    prompt = open(os.path.join(HERE, "prompt.txt"), encoding="utf-8").read()
    md = f'title "{m["title"]}", channel {m["channel"]} ({m["channel_follower_count"]} subscribers), {m["view_count"]} views, {round((m["duration"] or 0)/60)} min, uploaded {m["upload_date"]}'
    prompt = prompt.replace("TRANSCRIPT_FILE", os.path.basename(txt)).replace("METADATA", md)
    for attempt in range(2):
        out = subprocess.run(["agy", "-p", prompt, "--model", "gemini-3.8-flash-medium", "--json-schema", os.path.join(HERE, "schema.json"),
                              "--output-format", "json", "--mode", "plan"], capture_output=True, text=True, encoding="utf-8",
                             errors="replace", cwd=d, timeout=600).stdout
        try:
            j = json.loads(out[out.index("{"):])
            r = j.get("structured_output") or j.get("result") or j.get("response")
            if isinstance(r, str):
                r = json.loads(r[r.index("{"):r.rindex("}") + 1])
            if isinstance(r, dict) and "watchability" in r:
                return r
        except Exception:
            pass
        time.sleep(5)
    return None

def decide(m, s):
    w = sum(s[k] * v for k, v in W.items())
    s["weighted"] = round(w, 2)
    if s.get("is_pitch"): return "DROP"
    if s["watchability"] >= 4 and s["clarity"] >= 4 and w >= 3.8 and not s["accuracy_flags"]: return "EMBED?"
    if s["authority"] >= 4 and s["concept_fit"] >= 3: return "DISTIL"
    if w >= 3.5: return "DISTIL"
    return "DROP"

def main():
    qfile, outdir = sys.argv[1], sys.argv[2]
    cap = int(sys.argv[3]) if len(sys.argv) > 3 else 8
    subs_dir = os.path.join(outdir, "transcripts"); os.makedirs(subs_dir, exist_ok=True)
    res_path = os.path.join(outdir, "videos.jsonl")
    done = {}
    if os.path.exists(res_path):
        for l in open(res_path, encoding="utf-8"):
            r = json.loads(l); done[r["id"]] = r
    cands = {}
    for line in open(qfile, encoding="utf-8"):
        if "|" not in line or line.startswith("#"): continue
        concept, q = [x.strip() for x in line.split("|", 1)]
        for vid in search(q):
            cands.setdefault(vid, concept)
    print(f"candidates: {len(cands)}", flush=True)
    metas = {}
    with cf.ThreadPoolExecutor(4) as ex:
        for vid, m in zip(cands, ex.map(meta, cands)):
            if m: metas[vid] = m
    passed = {}
    with open(os.path.join(outdir, "gated.jsonl"), "w", encoding="utf-8") as g:
        for vid, m in metas.items():
            m["concept_query"] = cands[vid]; m["gate_fail"] = gates(m, cands[vid])
            g.write(json.dumps(m, ensure_ascii=False) + "\n")
            if not m["gate_fail"]: passed[vid] = m
    by = {}
    for m in passed.values(): by.setdefault(m["concept_query"], []).append(m)
    todo = []
    for c, ms in by.items():
        ms.sort(key=lambda m: -(m["view_count"] or 0) * math.log10(max(m["channel_follower_count"] or 10, 10)) / max(1, (m["age_months"] or 1)) ** 0.3)
        todo += ms[:cap]
    todo = [m for m in todo if m["id"] not in done]
    print(f"metadata ok: {len(metas)}, passed gates: {len(passed)}, to score: {len(todo)}", flush=True)
    def work(m):
        txt = transcript(m["id"], subs_dir)
        if not txt: return m, None, "no transcript"
        return m, score(m, txt, subs_dir), None
    with open(res_path, "a", encoding="utf-8") as fo, cf.ThreadPoolExecutor(3) as ex:
        for m, s, err in ex.map(work, todo):
            r = dict(m)
            if s:
                r["scores"] = s; r["decision"] = decide(m, s)
            else:
                r["decision"] = "ERROR"; r["error"] = err or "scoring failed"
            fo.write(json.dumps(r, ensure_ascii=False) + "\n"); fo.flush()
            print(f'{r["decision"]:7} {r["concept_query"]:15} {(r.get("scores") or {}).get("weighted","-")!s:5} {r["channel"][:22]:22} {r["title"][:60]}', flush=True)

if __name__ == "__main__":
    main()
