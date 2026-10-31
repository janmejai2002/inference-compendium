"""Camoufox reader for source research: real-browser fetches that ordinary
web fetch can't do (JS pages, bot walls, paywall previews, publisher sites).

  .venv/Scripts/python scripts/browse.py read <url> [--max 6000]
  .venv/Scripts/python scripts/browse.py search "<query>" [--n 8]
  .venv/Scripts/python scripts/browse.py shot <url> <out.png>

Prints one JSON object. `read` returns the facts a sources.yml entry needs
(final URL, title, author, date, site) plus the main text, truncated to --max
characters so it stays cheap in an agent's context. Setup: npm run browser:setup
"""
import argparse
import json
import sys
from urllib.parse import quote_plus

from camoufox.sync_api import Camoufox

META_JS = """() => {
  const m = (sel) => { const e = document.querySelector(sel); return e ? (e.content || e.getAttribute('datetime') || e.textContent || '').trim() : null; };
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch { return null; } }).flat().filter(Boolean);
  const pick = (k) => { for (const o of ld) { const g = o['@graph'] || [o]; for (const x of g) if (x && x[k]) return x[k]; } return null; };
  const author = m('meta[name="author"]') || m('meta[property="article:author"]') || (() => { const a = pick('author'); return a ? [].concat(a).map(x => x.name || x).join(', ') : null; })();
  const date = m('meta[property="article:published_time"]') || m('meta[name="citation_publication_date"]') || m('meta[name="date"]') || pick('datePublished') || m('time[datetime]');
  const root = document.querySelector('article') || document.querySelector('main') || document.body;
  return {
    title: m('meta[property="og:title"]') || document.title,
    site: m('meta[property="og:site_name"]'),
    author, date,
    description: m('meta[name="description"]') || m('meta[property="og:description"]'),
    text: (root.innerText || '').replace(/\\n{3,}/g, '\\n\\n').trim(),
  };
}"""


def browser():
    return Camoufox(headless=True, humanize=False, i_know_what_im_doing=True)


def read(url, limit):
    with browser() as b:
        p = b.new_page()
        resp = p.goto(url, wait_until="domcontentloaded", timeout=45000)
        p.wait_for_timeout(1500)
        info = p.evaluate(META_JS)
        info["status"] = resp.status if resp else None
        info["final_url"] = p.url
    full = len(info["text"])
    info["text"] = info["text"][:limit]
    info["truncated"] = full > limit
    return info


def search(query, n):
    with browser() as b:
        p = b.new_page()
        p.goto("https://html.duckduckgo.com/html/?q=" + quote_plus(query), timeout=45000)
        rows = p.evaluate("""() => [...document.querySelectorAll('.result')].map(r => ({
          title: r.querySelector('.result__a')?.innerText?.trim(),
          url: r.querySelector('.result__a')?.href,
          snippet: r.querySelector('.result__snippet')?.innerText?.trim(),
        })).filter(r => r.url)""")
    return {"query": query, "results": rows[:n]}


def shot(url, out):
    with browser() as b:
        p = b.new_page(viewport={"width": 1280, "height": 1600})
        p.goto(url, wait_until="domcontentloaded", timeout=45000)
        p.wait_for_timeout(1500)
        p.screenshot(path=out)
    return {"url": url, "saved": out}


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("read"); r.add_argument("url"); r.add_argument("--max", type=int, default=6000)
    s = sub.add_parser("search"); s.add_argument("query"); s.add_argument("--n", type=int, default=8)
    h = sub.add_parser("shot"); h.add_argument("url"); h.add_argument("out")
    a = ap.parse_args()
    try:
        res = read(a.url, a.max) if a.cmd == "read" else search(a.query, a.n) if a.cmd == "search" else shot(a.url, a.out)
    except Exception as e:  # report, don't crash the agent's loop
        res = {"error": f"{type(e).__name__}: {e}"}
    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False))


if __name__ == "__main__":
    main()
