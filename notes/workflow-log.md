# Workflow log

Agents append what they notice (see `.claude/skills/workflow-scout/SKILL.md`). Newest at the bottom. Mark lines `→ built <name>` once a tool exists.

## 2026-10-31 · setup
- friction: `pip install` into C:\Python313 fails (not writable, user site missing) → built `npm run browser:setup` (repo-local .venv)
- friction: Camoufox search results still include SEO rewrites of studies (e.g. a "stories" site restating the HBS/BCG paper) → rule added to `source-hunt`
- seen: B&W proofing by eye after every design change → built `npm run proof:bw`

## 2026-10-31 · toc session 1
- friction: `agent-reach linkedin jobs` fails, "Port 9222 belongs to an unmanaged browser" (another debug browser holds the port). LinkedIn's public guest endpoints (`/jobs-guest/jobs/api/seeMoreJobPostings/search`, `/jobs-guest/jobs/api/jobPosting/<id>`) work with plain HTTP, no login → wrote scratch `li_scrape.py` + `li_analyse.py`; candidate: `npm run jd-scan` script that archives JDs as evidence and reports AI-ask rates by track.
- friction: Reddit blocks curl (.json) and Camoufox (old.reddit login wall, new reddit JS challenge). `agent-reach reddit` not added. Student-demand signal must come from the editors, not the web.
- friction: WebFetch times out on mckinsey.com and 403s on openai.com; `browse.py read` worked for McKinsey.
- seen: AI-news search results are dominated by aggregator "AI agents news this week" sites with conflicting model names → rule: model/release facts only from lab blogs or release notes (candidate line for docs/SOURCES.md).
- seen: raw "AI" keyword rate in JDs (29%) overstates real asks (22%): recruitment disclaimers + company blurbs + sister-brand reposts. Built a classifier in `notes/toc/evidence/li_asks.py` (scratch, ~95% precision on a 20-row audit). Candidate: promote scrape+classify to `scripts/jd-scan.py` + `npm run jd-scan` so the scan can be re-run each term for a trend line.
- friction: Windows Python prints cp1252 by default; set PYTHONIOENCODING=utf-8 for any script that prints JD text.
- seen: user opened DISCUSSION.md in Notepad mid-session; held edits to avoid a save clash. Rule idea: agent writes long findings to research-*.md, DISCUSSION.md stays short so concurrent edits are rare.
- rule (user, 2026-10-31): orchestrator stays lean; heavy reading goes to sub-agents (sonnet) and Gemini Flash via `agy`; agents write to disk, return ≤12-line receipts. → built `notes/toc/AGENT-BRIEF.md` (shared brief, so prompts don't repeat context). Candidate: promote to a `research-agent` skill if it's reused next session.
- seen: YouTube search-based candidates skew to tutorial channels (Simplilearn, Krish Naik); only 2/41 EMBED. Channel-seeded queries (run v2) should raise yield; candidate: a maintained `seed-channels.yml`.
- tool: `agy -p ... --json-schema schema.json --mode plan --output-format json` with cwd = transcript folder = reliable structured scoring, ~75 s/video, ~30k tokens of the user's Gemini quota each.
- friction: yt-dlp subtitle fetch hits HTTP 429 when asking for all languages; use `--sub-langs en,en-orig` + `--sleep-subtitles`. Indian channels (Apna College, CampusX) often have no English captions → ERROR; need a Hindi path (NotebookLM ingests YouTube directly).
- seen: session restart killed 3 background jobs; scripts lived in the temp scratchpad → copied pipeline + results into `notes/toc/evidence/videos/` and `evidence/`. Still a candidate: `scripts/research/` + npm entries (needs approval, see PLAN-next.md §B).
- seen: Gemini synthesis (agy, Flash High) had 3 factual errors in 220 lines; sub-agent ✓ claims never spot-checked → verifier pass proposed (PLAN-next.md §B1).
- user: edits notes in Zed/Notepad mid-session; Git Bash eats backslashes in `! zed notes\toc\...` → use forward slashes.
