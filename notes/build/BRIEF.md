# v1 build brief (every agent reads this first)

**INFERENCE** is a print + web AI compendium. Repo: `C:/Users/Janmejai/compendium`. Today: 2026-11-01.

**Readers.** Indian MBA students preparing for consulting placements, and anyone in management. Non-technical: Excel at most, zero code. Smart, short of time.
**Thesis.** The test has moved from "do you know about AI" to *can you direct AI and judge its output*. Every chapter serves that.
**Plan.** `content/toc.yml` (your chapter's entry: deck, prereqs). Why: `docs/TOC-RATIONALE.md`. v1 lens on every chapter: **consulting**.

## House rules (from CLAUDE.md, non-negotiable)
1. Every outside fact has a source in `content/sources.yml`, cited `[@id]` or as a `{{watch id}}`/`{{read id}}` card. Never a statistic without one. Quote the originator, not coverage. Exact number + year. `verified: true` only if *you* opened the URL today and checked title, author, date and every number/timestamp you use.
2. No invented specifics. Constructed examples are labelled `Illustrative`. Never attribute a number, quote or decision to a real company or person without a source. Never say "asked at firm X" unless a source says so.
3. Style: plain, direct, specific. No "delve", no "in today's fast-paced world", no em-dash asides, no rhetorical "not X, but Y". Indian business context where natural, never forced. Rupees and Indian firms where it fits.
4. Tiers (`docs/SOURCES.md`, allowlist `content/source-policy.yml`): A primary, B established analysis, C platform with a reason. Never SEO listicles, vendor landing pages, AI summaries, LinkedIn posts.

## Threads
Responsible AI: bias (ch3 confidently-wrong), privacy (ch5 your-documents), security (ch6 models-that-act), accountability (ch7 judging-output). "Try it" blocks are no-code only (ChatGPT/Claude/Gemini chat, Custom GPT, Gemini Gem, NotebookLM). Never code.

## Where the evidence lives (read only what your chapter needs; grep first)
- `notes/toc/research-market-2026-10.md`, `research-jd-linkedin-2026-10.md`, `research-consulting-ai.md`, `research-canon.md`, `research-casebooks-2025-26.md`, `research-foundations-distilled.md`.
- `notes/toc/synthesis-gemini-2026-11-01.md` is an unreviewed draft: trust only what another file confirms.
- Raw proof: `notes/toc/evidence/` (JDs with URLs, casebook extracts in `casebooks/raw/`, scored videos in `videos/`).
- Videos: `notes/toc/evidence/videos/videos-run1-foundations.jsonl`, `videos-run2-seeded.jsonl` (`EMBED?` = Watch-card candidate, `DISTIL` = cite with timestamp). Rubric: `notes/toc/research-video-rubric.md`. Only established, legitimate channels.

## Tools (cheapest first)
- WebSearch / WebFetch (load via ToolSearch `select:WebSearch,WebFetch`).
- Pages that block fetch: `C:/Users/Janmejai/compendium/.venv/Scripts/python C:/Users/Janmejai/compendium/scripts/browse.py read <url> --max 4000`.
- YouTube: `agent-reach youtube read|search|subtitle <url>` (check every timestamp you cite in the transcript).
- Heavy reading → Gemini Flash: `agy -p "<prompt>" --model gemini-3.8-flash-medium --mode plan --output-format json`, run with cwd = folder holding the file; ask it to read the file by name.
- NotebookLM: `nlm query notebook inference-found "<question>"` (12 vetted foundation videos). Auth fails → `bash C:/Users/Janmejai/.local/bin/nlm-relogin.sh` once; if still failing, skip and say so.

## Shared files: avoid clobbering other agents
Several agents work at once. **Never rewrite `content/sources.yml`, `content/glossary.yml` or `content/toc.yml` whole.** Add entries only by appending with one bash heredoc (`cat >> content/sources.yml <<'EOF'`), after `grep -n "^<id>:" content/sources.yml` shows the id is free; if another agent already added the same source, reuse its id. Don't edit or delete others' entries. Don't touch `toc.yml` or `STATUS.md` (the orchestrator does).

## Return
A receipt of ≤ 10 lines. Your full work goes to the file named in your task.

## Corrections found in the research packets (override the research files)
- **Lilli interview quote.** "Prompt the AI, review its output, and apply judgment" is CaseBasix (a prep firm) as reported by Fortune (14 Jan 2026); McKinsey did not comment. Never attribute it to McKinsey. McKinsey's own notice on AI-assisted interviews (updated 27 Oct 2026) is the primary for what McKinsey says.
- **Deloitte India 72%** = 72% of 257 surveyed organisations use AI for resume screening. NOT "AI screens 72% of campus resumes".
- **McKinsey State of AI 2026 (25 Aug 2026):** 37% report EBIT impact; ~6% high performers. The "89% use AI" figure was not found on McKinsey's page: don't use it.
- **Jagged frontier (Organization Science 2026):** +12.2% tasks, 25.1% faster, quality +32% (never 40%), 19 percentage points less likely to be correct outside the frontier. Existing ids: `hbs-jagged-frontier` (2023 WP), `dellacqua-jagged-orgsci` (journal).
- **McKinsey agents:** 20,000 (Sternfels, FT 14 Jan 2026), not 25,000. Big Four UK intake cuts rest on a tier-C source (HR Review): "as reported", never as firm statements.
- **MIT NANDA 95%:** preliminary, method questioned; cite via Fortune with that caveat or not at all.
- **YAML:** always wrap `title:` and `why:` values in double quotes when appending to sources.yml (an unquoted colon broke the registry once).
- **Allowlist** is updated for all domains the packets used. YouTube subtitle fetches (agent-reach) are rate-limited; use `yt-dlp` auto-captions to check marks, or leave the video `verified: false`.
- **Model names (Nov 2026):** Claude Fable 5.1 and Claude Mythos 5.1 are ONE model under two access tiers (1 Sep 2026); Opus/Sonnet/Haiku 5.5 are newer. OpenAI: GPT-6 Astra is the frontier (3 Sep); Sol/Luna/Terra are GPT-6/6.1 tiers. Google: Gemini 4 Argon (13 Oct). In chapters, avoid model names except where the point needs one; the `state-of-play` insert owns them.
- **NotebookLM** appears in Google's help pages as "Gemini Notebook" (rename seen 16 Jul 2026, snippet only). Write "NotebookLM (now listed by Google as Gemini Notebook)" at first mention.

## NotebookLM (auth restored 2026-11-01; query with `nlm query notebook <id> "<question>"`)
Use these to check explanations and find which original source says what. A NotebookLM answer is an AI summary: **never cite it**; cite the original source it points to, after opening it.
- `175d3ad1-ff59-419c-901f-ccf3715be822` INFERENCE Foundations (12 vetted videos; alias `inference-found`): every Part I chapter and the opener.
- `a9cb0efc-c9b6-49a8-8812-53df9633f433` B-School AI Tooling Research Bank (35 sources): delegation-brief, judging-output, interview-room, ai-casebook.
- `923dd45c-1a9a-4147-875a-afc7ae853647` Security and Governance of Multi-Agent AI Systems (54) and `444adb37-fcf6-4f74-b838-9b952429cf54` LLM Prompt Injection survey (97): models-that-act.
- `ed7b9ed6-b9ae-4f37-af87-a1094fce0b8e` Case Comps Decks (59): ai-casebook, for structure patterns only; never copy text.
Auth expires again → `bash C:/Users/Janmejai/.local/bin/nlm-relogin.sh` (needs a notebooklm.google.com tab open in Brave); if it fails, skip and say so.
