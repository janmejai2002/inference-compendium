# Plan: open questions and research harness
_Written 2026-11-01, end of session 1. My recommendations; nothing is decided until the editors say so. Answer inline (like DISCUSSION.md) and I'll move the outcomes into DISCUSSION.md._

## A. Open questions, with my recommendation

| # | Question | Options | My call | Why |
|---|---|---|---|---|
| 1 | Front door for the "anyone opens page one" reader | (a) straight into ch 1 · (b) 10-page **"AI in one sitting"** opener, then the full foundations | **(b)** | A 40-page mandatory wall loses casual readers; the opener also works as the night-before recap for the whole of Part I |
| 2 | "Kinds of AI" (predictive ML vs generative) | (a) skip, start at LLMs · (b) half-chapter · (c) full ch 1 | **(c) ch 1** | 7/12 curricula open there; consulting cases (churn, credit scoring, forecasting) are ML, not GenAI; it stops readers thinking AI = ChatGPT |
| 3 | No-code building | (a) read only · (b) optional "Try it" with no-code tools (Custom GPT / Gemini Gem / NotebookLM) | **(b)** | Zero code stays. The pedagogy already has a try-it prompt; Yale and HBS now make managers build, and building is where people feel agents fail |
| 4 | Responsible AI | (a) chapter · (b) woven through every chapter + 2-page India briefing (DPDP, RBI FREE-AI, IndiaAI) | **(b)** | Most common curriculum topic (9/12), AACSB says embed it; JDs barely ask for the law itself (DPDP 0–1%) |
| 5 | Cost / tokens / AI stack | (a) separate chapters · (b) one chapter **"Who pays for intelligence"** | **(b)** | Casebooks ask about AI due diligence, data centres, cloud; the canon rarely teaches cost; one chapter is the differentiator without the bloat |
| 6 | Jobs chapter framing | (a) "entry-level squeeze" · (b) "how the work changes" with the split evidence | **(b)** | Evidence is split (Big Four UK cut intake, MBB flat or up); overclaiming would hurt credibility with the very readers who will check |
| 7 | Consulting track's centrepiece | (a) concept chapters only · (b) **an INFERENCE AI casebook**: ~10 cases + ~10 guesstimates | **(b)** | ~2% of ~518 casebook cases are AI vs 35% of consulting JDs asking about AI. Nobody else has this. Built from the patterns casebooks show: AI due diligence, adoption pitch, use-case mapping, sizing usage |
| 8 | Real interview questions | (a) go without · (b) a 2-minute form for batchmates and seniors | **(b)** | The weakest pillar, and the best "we studied the market" proof. I'd build it as a page that stores answers (needs your OK) |
| 9 | McKinsey-style AI interview in India? | unknown | Prepare for it anyway | Teach a protocol (prompt, review, challenge, decide) that works whether or not the round exists |
| 10 | Packaging | (a) one book · (b) core + track booklets | **(a) one book**, track parts added per edition | Matches "v1 = foundations + consulting" |
| 11 | Deadline for the batchmate review | — | **Need your date** | It sets how many chapters v1 can hold |

### Draft structure if you accept the calls above (v1, ~14 units)
- **Opener:** AI in one sitting (10 pp)
- **Part I · Foundations (mandatory):** 1 Not all AI is ChatGPT (kinds of AI) · 2 A model predicts the next word · 3 Why models are confidently wrong (training, hallucination, bias) · 4 A prompt is a delegation brief · 5 Giving the model your documents (RAG) · 6 Agents: models that act, and how they break (incl. security) · 7 Judging AI output (evals, error rates, base rates)
- **Part II · AI in business:** 8 Who pays for intelligence (cost + stack) · 9 Why AI pilots stall (ROI gap + change management) · 10 How the work changes (jobs, India)
- **Part III · Consulting:** 11 What AI does to a consulting firm (jagged frontier, Lilli, outcome fees) · 12 The INFERENCE AI casebook · 13 The interview room (AI screening, AI-assisted rounds)
- **Inserts:** State of play, Nov 2026 (replaced each term) · India briefing

## B. Research harness: what to change

From the editor's "Harness Engineering" notebook (abb8429a…), the patterns that fit a research team of two editors + agents, and the ones I'd skip.

### Adopt
1. **Creator–verifier, cross-model.** Every research file gets a verifier pass by a *different* model (Gemini Flash via agy checks Sonnet's work; Sonnet checks Gemini's). It re-opens 5 random ✓ claims per file plus every number that enters DISCUSSION.md, and logs a hit rate in `evidence/verify-log.md`. Below 90% → re-check the whole file. *(Today: 0 agent claims spot-checked; Gemini's synthesis had 3 errors in 220 lines.)*
2. **One claims ledger** ("virtual memory" pattern): `notes/toc/evidence/claims.jsonl`, one row per fact: id, claim, exact number, source URL, tier, opened date, page snapshot path, verified_by, used_in. Research files and DISCUSSION.md cite claim ids, so a number is fixed in one place. A page snapshot (text) is saved for every ✓ source: proof that survives link rot.
3. **Checkpointed, detached jobs.** Move the scrapers and the video pipeline from the temp scratchpad into `scripts/research/` (with `npm run jd-scan`, `npm run video-scan`). Each stage writes its output and a `run.json` manifest (stages done, counts), so a restart resumes at the last finished stage. Launch long jobs detached from Claude Code so a restart doesn't kill them. *(Today a restart killed 3 jobs.)*
4. **Calibrate the cheap scorer.** You rate 12 videos (2 minutes each from the shortlist); I measure agreement with Flash per metric and adjust the prompt and weights until it tracks you. Add audience signals Flash can't see: likes per view, views per subscriber. *(Watchability is 25% of the score and is currently judged from the transcript alone.)*
5. **A decision ledger, not a growing notes file.** DISCUSSION.md becomes ≤ 2 pages: Decided / Open (each with options + recommendation, as in section A) / an index of research files. Findings live in research files, not in DISCUSSION.md.
6. **One agy session per batch.** Feed all transcripts through one `agy` session (`--input-format stream-json`) instead of one process per video: one bootstrap instead of ~25k tokens of overhead per video.

### Skip (built for production coding agents, not for us)
- Post-training calibration (RLCD / Brier-score training): we can't retrain Gemini; plain calibration against your ratings does the job.
- A fast "System 1" router model (ModernBERT etc.): our volume is hundreds of items, not millions.
- Prompt-prefix ordering for KV-cache hits: worth it at API scale; agy and Claude Code already cache.

### Order
1. Verifier pass on the 6 research files (an agent run, ~1 hour, no approval needed beyond "go").
2. Casebook PDFs kept out of git (`.gitignore`), then a first commit of session 1's notes.
3. Claims ledger + page snapshots, built while the verifier runs.
4. Move scripts into the repo (needs your OK: it touches `scripts/`, which the TOC phase normally leaves alone).
5. Calibration set (needs 25 minutes of you).
6. Interview-questions form (needs your OK to publish a page).
