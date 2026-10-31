# v1 build: TOC → every chapter → PDF, in one session

> **How to use.** New chat in this folder, type `/build-v1` (add notes after it). It runs end to end without stopping for approval: every chapter lands at `status: draft` for the editors to review. It stops only for the blockers listed at the end.

You are the editor-in-chief and **orchestrator** for the v1 edition of INFERENCE: the opener, Part I (foundations), Part II (AI in business), Part III (consulting) and two inserts, as accepted in `notes/toc/DISCUSSION.md` → "Candidate structure (v1)". You plan, delegate, check and assemble. Sub-agents do the reading and drafting; you keep your own context lean.

## 0. Load (only these)
`CLAUDE.md`, `STATUS.md`, `notes/toc/DISCUSSION.md` (Decided + Candidate structure v1), `docs/TOC-SCHEMA.md`, `docs/PEDAGOGY.md`, `docs/AUTHORING.md`, `docs/SOURCES.md`, `notes/toc/AGENT-BRIEF.md` (the pattern for briefing agents). Run `npm run status`. Don't read the research files yourself; agents do.

## 1. Compile the TOC (the `/toc-compile` job, without stopping)
Write `content/toc.yml` and `docs/TOC-RATIONALE.md` from the v1 structure. The ids in DISCUSSION.md are the ids. For v1, every chapter's primary track lens is **consulting**. Keep `what-is-a-model` as the design sample outside the v1 TOC (`sample: true`); its good material can be reused in `next-word-machine`. Seed each chapter's `interview` questions and `sources` from the research files (below). `npm run check && npm run build`, commit `toc: v1 structure (14 units + 2 inserts)`.

## 2. Write the build brief once
Create `notes/build/BRIEF.md` (≤ 1 page) that every agent reads first: readers (non-technical, Excel at most, zero code; consulting placement prep, and anyone in management), the thesis (*direct AI and judge its output*), house rules from CLAUDE.md (every outside fact sourced in `content/sources.yml`; constructed examples labelled `Illustrative`; no invented specifics about real firms or people; the style rules, Indian context where natural), threads (responsible AI: bias ch3, privacy ch5, security ch6, accountability ch7; no-code "Try it" only), and where evidence lives:
- `notes/toc/research-market-2026-10.md`, `research-jd-linkedin-2026-10.md`, `research-consulting-ai.md`, `research-canon.md`, `research-casebooks-2025-26.md`, `research-foundations-distilled.md`, `synthesis-gemini-2026-11-01.md` (unreviewed draft: trust only what another file confirms).
- Raw proof: `notes/toc/evidence/` (JDs with URLs, casebook extracts in `casebooks/raw/`, scored videos in `videos/`).
- Videos: scored lists `evidence/videos/videos-run1-foundations.jsonl`, `videos-run2-seeded.jsonl` (decision `EMBED?` = Watch-card candidate, `DISTIL` = use knowledge/cite with timestamp). Rubric: `notes/toc/research-video-rubric.md`. To score more: `evidence/videos/tools/pipeline.py` (Gemini 3.8 Flash via `agy`). NotebookLM notebook alias `inference-found` holds the 12 vetted foundation videos: `nlm query notebook inference-found "<question>"`.

## 3. Research packets (parallel, Sonnet)
One sub-agent per chapter (`model: "sonnet"`), all launched at once. Each writes `notes/build/<id>-packet.md`: the 6–10 facts the chapter needs, each with source, tier, exact number and year, **re-opened and checked today**; 1–2 Watch and 1–2 Read candidates (videos only from the scored lists or channels meeting the rubric gates; check `marks` timestamps in the transcript with `agent-reach youtube subtitle`); 3 interview questions drawn from JD asks and casebook patterns (never claimed as "asked at firm X" unless a source says so); one Indian business example with a source, or marked `Illustrative`. Agents return ≤ 10-line receipts. Heavy reading goes to Gemini Flash via `agy` (see AGENT-BRIEF.md).

## 4. Draft in dependency waves (chapter agents, default model)
Each chapter agent follows `prompts/02-chapter-session.md` **in autonomous mode**: it does not stop for approval after step 2, it reads only its own packet plus the `recap` blocks of its prerequisites, adds its sources to `content/sources.yml` (`verified: true` only for what it re-opened), writes the chapter at `status: draft`, and must leave `npm run check` clean for its file. Waves (each waits for the previous wave's recaps):
1. `kinds-of-ai`, `next-word-machine`
2. `confidently-wrong`, `delegation-brief`, `your-documents`
3. `models-that-act`, `judging-output`, `who-pays`
4. `pilots-stall`, `work-changes`, `consulting-firm`
5. `ai-casebook`, `interview-room`, `state-of-play`, `india-briefing`
6. `ai-in-one-sitting` (written last: it compresses Part I)

`ai-casebook`: ~10 cases + ~10 guesstimates, original and labelled `Illustrative`, built on the *patterns* in the casebook research (AI due diligence, adoption pitch, use-case mapping, sizing usage); never copy casebook text. `state-of-play`: dated; model names only from labs' own pages.

## 5. Check each wave before the next
- **Cross-model verifier:** for each chapter, Gemini Flash via `agy` (a different model from the writer) checks every number and quote against `content/sources.yml` and the packet, and lists mismatches; fix them.
- **Prose filter:** run the `anti-ai-writing` skill over each chapter (house style: plain, specific, no em-dash asides, no "not X but Y").
- `npm run check`; commit per wave: `ch <id>, <id>: draft`.

## 6. Ship
Run the `/ship` job: `npm run check`, `npm run pdf`, look at the page images of every chapter opener and every Watch/Read card, `npm run proof:bw` and spot-check 3 pages, update `STATUS.md` (what's draft, unverified sources count, open issues per chapter), save `editions/INFERENCE-v1-draft.pdf`, commit `v1 draft: 14 units + 2 inserts`. Log friction in `notes/workflow-log.md` (workflow-scout).

## Report
≤ 25 lines: chapters done, pages, sources (verified / unverified), Watch cards with channels, what each chapter still needs from the editors, and your top workflow suggestion.

## Stop and ask only if
`npm run pdf` fails twice for the same reason; a chapter can't meet the source rule without inventing a fact; NotebookLM or agy auth fails after `nlm-relogin.sh`; or your context passes ~60%: then finish the current wave, commit, write `notes/build/RESUME.md` (what's done, what's next) and stop. A fresh `/build-v1 resume` picks up from it.
