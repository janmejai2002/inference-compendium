"""Scrape LinkedIn public (guest, no login) job postings for MBA-track roles in India.
Usage: python li_scrape.py <out.jsonl> <queries.txt> [pages]
queries.txt lines: track|keywords
"""
import json, re, sys, time, html, urllib.request, urllib.parse, datetime, os

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
            with urllib.request.urlopen(req, timeout=25) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:
            code = getattr(e, "code", None)
            time.sleep(4 * (i + 1) if code == 429 else 2)
    return None

def strip(s):
    s = re.sub(r"<br\s*/?>|</(p|li|div|h\d)>", "\n", s)
    s = re.sub(r"<li>", "• ", s)
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\n\s*\n+", "\n", html.unescape(s)).strip()

def search(keywords, pages):
    out = []
    for p in range(pages):
        q = urllib.parse.urlencode({"keywords": keywords, "location": "India", "f_TPR": "r2592000", "start": p * 10})
        h = get("https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?" + q)
        if not h:
            break
        cards = h.split('<li>')[1:]
        if not cards:
            break
        for c in cards:
            m = re.search(r'jobPosting:(\d+)', c)
            if not m:
                continue
            def f(pat):
                x = re.search(pat, c, re.S)
                return strip(x.group(1)) if x else ""
            out.append({"id": m.group(1),
                        "title": f(r'base-search-card__title">(.*?)</h3>'),
                        "company": f(r'base-search-card__subtitle">(.*?)</h4>'),
                        "location": f(r'job-search-card__location">(.*?)</span>'),
                        "posted": (re.search(r'datetime="([^"]+)"', c) or [None, ""])[1]})
        time.sleep(1.2)
    return out

def posting(jid):
    h = get(f"https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{jid}")
    if not h:
        return None
    d = re.search(r'show-more-less-html__markup[^>]*>(.*?)</div>', h, re.S)
    crit = dict((strip(a), strip(b)) for a, b in re.findall(
        r'description__job-criteria-subheader">(.*?)</h3>.*?description__job-criteria-text[^>]*>(.*?)</span>', h, re.S))
    return {"description": strip(d.group(1)) if d else "", "criteria": crit}

def main():
    out, qfile = sys.argv[1], sys.argv[2]
    pages = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    seen = set()
    if os.path.exists(out):
        for line in open(out, encoding="utf-8"):
            seen.add(json.loads(line)["id"])
    with open(out, "a", encoding="utf-8") as fo:
        for line in open(qfile, encoding="utf-8"):
            if not line.strip() or line.startswith("#"):
                continue
            track, kw = [x.strip() for x in line.split("|", 1)]
            cards = search(kw, pages)
            n = 0
            for c in cards:
                if c["id"] in seen:
                    continue
                seen.add(c["id"])
                p = posting(c["id"])
                time.sleep(1.0)
                if not p or not p["description"]:
                    continue
                c.update(p)
                c.update({"track": track, "query": kw,
                          "url": f"https://www.linkedin.com/jobs/view/{c['id']}/",
                          "fetched": datetime.datetime.now().isoformat(timespec="seconds")})
                fo.write(json.dumps(c, ensure_ascii=False) + "\n"); fo.flush()
                n += 1
            print(f"{track:12} {kw:45} cards={len(cards)} saved={n}", flush=True)

if __name__ == "__main__":
    main()
