---
name: source-hunt
description: Find, open and vet sources for INFERENCE (videos, articles, papers, recruiter and interview evidence) with Camoufox and Agent Reach. Use whenever a TOC or chapter session needs evidence, a source, a timestamp, or a check that a number is real.
---

# Source hunt

The book lives or dies on sources a student recognises. This is the tool ladder and the bar. Policy and tiers: `docs/SOURCES.md` (read it once per session).

## Tool ladder (cheapest first, stop when you have what you need)

| Need | Tool |
|---|---|
| Find candidates | built-in WebSearch, then `.venv/Scripts/python scripts/browse.py search "<query>"` (Camoufox, DuckDuckGo) when results are thin or blocked |
| Read an article, report page or paper landing page | built-in WebFetch; if it fails, is JS-only or bot-walled: `.venv/Scripts/python scripts/browse.py read <url> --max 6000` |
| See a page as a human would (charts, paywall preview) | `.venv/Scripts/python scripts/browse.py shot <url> <scratchpad>/x.png`, then Read the image |
| YouTube: title, channel, date, length | `agent-reach youtube read <url>` |
| YouTube: what is said at which minute (for `marks`) | `agent-reach youtube subtitle <url> --lang en,en-orig`; grep the text, don't paste it whole |
| What students and interviewers actually report | `agent-reach reddit search "<query>"` (r/Indian_Academia, r/MBA, r/IndianMBA), `agent-reach web search` |
| What recruiters ask for in roles | `agent-reach linkedin jobs "<role> AI" --location India` then `linkedin read <url>` |
| Code, datasets, model cards | `agent-reach github search` / `github read` |

If `.venv` is missing, run `npm run browser:setup` (one time). If `agent-reach` is not on PATH (another machine), skip it and say so. Agent Reach is read-only; never log in or post on the user's behalf.

## The bar

- **Cite the originator.** News says "McKinsey found X": open the McKinsey report and cite that. Write numbers exactly as the source states them, with the year.
- **Signal is not evidence.** Reddit threads, interview write-ups, LinkedIn JDs and InsideIIM-style posts tell us *what to cover*. They are never cited as fact in the book. Label them `signal` in notes.
- **Reject on sight:** SEO listicles, AI-written summaries, "Top N tools", aggregator rewrites of a study (search results routinely include one, e.g. a "stories" site restating the HBS/BCG paper), vendor landing pages.
- **Open before you trust.** Search snippets lie about dates and numbers. A source is `verified: true` only after you opened it and checked title, author, date and every number or timestamp used.

## Output

In a discussion session, log what you found in `notes/` (see the session's prompt), one line each:
`- [A] Title, Creator, Year. URL. Why it matters. (opened ✓ / snippet only)`

In a chapter session, add entries to `content/sources.yml` in its existing format and run `npm run check`.

Keep context lean: request `--max 3000` first, widen only if the part you need was cut.
