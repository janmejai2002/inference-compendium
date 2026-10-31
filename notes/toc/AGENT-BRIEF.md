# Brief for research sub-agents (INFERENCE TOC phase)

You are helping research **INFERENCE**, a print + web compendium on AI for management readers: Indian MBA students preparing for placements (v1 = foundations + **consulting** track), and anyone in management. Readers are non-technical (Excel at most, zero code). Today is 2026-10-31.

## Rules
- **Discussion phase: build nothing.** Don't touch `content/`, `scripts/`, `design/`, `dist/`. Write only the output file named in your task (under `notes/toc/`), plus raw evidence under `notes/toc/evidence/<your-topic>/`.
- **Source tiers** (full policy `docs/SOURCES.md`): [A] primary/originator (papers, firm's own report, regulator, lab blog); [B] established analysis (HBR, MIT SMR, FT, Economist, Mint, The Ken, MGI, BCG Henderson); [signal] what students/recruiters say (casebooks, Reddit, JDs): tells us what to cover, never cited as fact. **Never:** SEO listicles, "top N" posts, AI-written summaries, aggregator rewrites, vendor landing pages.
- **Cite the originator.** If news says "McKinsey found X", open McKinsey's page. Mark every line **✓ opened** or **~ snippet only**. Quote numbers exactly with their year.
- One line per item: `- [A] Title, Creator, date. URL. What it tells the book (numbers). (✓/~)`

## Tools (cheapest first)
- WebSearch / WebFetch.
- Pages that block fetch: `C:/Users/Janmejai/compendium/.venv/Scripts/python C:/Users/Janmejai/compendium/scripts/browse.py read <url> --max 4000` (Camoufox).
- YouTube metadata/subtitles: `agent-reach youtube read|search|subtitle`.
- Documents to text: `markitdown <file>`. Put downloads in their own fresh folder; never execute downloaded files.
- Cheap bulk reading: Gemini 3.8 Flash via `agy -p "<prompt>" --model gemini-3.8-flash-medium --mode plan --output-format json` run with `cwd` set to the folder holding the file; ask it to read a file by name. Use it to digest long documents, so you don't read them yourself.
- NotebookLM: `nlm` CLI (if auth fails run `bash C:/Users/Janmejai/.local/bin/nlm-relogin.sh`).
- Reddit is blocked (login wall); LinkedIn data already collected.

## Return
When done, reply in **≤ 12 lines**: file written, counts, the 3–5 findings that would change the table of contents, and what you couldn't open. The orchestrator reads your file only if needed.
