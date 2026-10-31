# TOC discussion — living notes

*Last session: 2026-11-01, session 1 closed: research done, v1 structure accepted; next step /toc-compile then the v1 build.*

Research write-ups: [market \& recruiters](research-market-2026-10.md) · [LinkedIn JDs](research-jd-linkedin-2026-10.md) · raw evidence in [evidence/](evidence/)

## Decided

* **Purpose: a one-stop guide to the AI part of any management interview process**, for anyone in management, not only B-school students. Dense enough for placement prep, and a book anyone in management wants to keep reading from page one. — editors, 2026-10-31
* **Shape: a mandatory foundation section first** that builds the whole base of AI understanding, then business use cases and track material. — editors, 2026-10-31
* **Technical floor: Excel only, zero code.** Readers may never have written a line of code. No notebooks, no Python appendix. (JD data shows Python in 33% of AI-*role* JDs; we explain what it's for, never teach it.) — editors, 2026-10-31
* **v1 = foundations + consulting track**, soft-launched to a few batchmates for review; other tracks follow in later editions. — editors, 2026-10-31
* **Interview evidence:** seniors' actual questions are unknown; the editors' position is that the knowledge is what lets students answer, whatever the question. So the book is built from the job (JDs, recruiter reports) more than from question lists. — editors, 2026-10-31
* **Video sourcing pipeline:** YouTube candidates scored with a rubric (Gemini 3.8 Flash via `agy` reads transcripts, NotebookLM distils knowledge across videos); only established, legitimate channels; every embedded video must be worth the watch. Rubric in [research-video-rubric.md](research-video-rubric.md). — editors, 2026-10-31

* **Accepted the recommendations in [PLAN-next.md](PLAN-next.md) §A** ("go ahead"): 10-page opener; ch 1 = kinds of AI; zero code but optional no-code Try-its; responsible AI woven through + India briefing; one cost+stack chapter; jobs framed as "how the work changes"; an INFERENCE AI casebook as the consulting centrepiece; one book, track parts per edition. Still open: batchmate-review deadline; interview-questions form. — editors, 2026-11-01

## Leaning towards

* **Thesis: the test has moved from "do you know about AI" to "can you direct AI and judge its output".** Backed by McKinsey's Lilli interview pilot ("prompt the AI, review its output, and apply judgment"), BCG AI at Work 2026 (47% spend more time managing and directing AI than doing the task), Deloitte India (AI already screens 72% of campus resumes). What would kill it: the editors' seniors report Indian interviews still ask only definitional "what is GenAI" questions. Even then the thesis holds for the job; the book would just add a definitions layer.
* **Teach what doesn't change; date-stamp what does.** The frontier changed names 4+ times in Sep–Oct 2026 (Gemini 4 Argon, GPT-6 Sol/Luna/Terra, Claude Mythos/Fable 5.1). A printed book can't track that. Proposal: concepts in chapters, a one-page "State of play, Oct 2026" insert that the web edition replaces each term.
* **One core book with a lens per track inside every chapter** (already the pedagogy) **plus a reading path per track**, not six supplements. Saves \~40% duplication. JD data (Oct 2026): non-product tracks ask much the same things (use AI tools, find use cases, drive adoption) at 15–25%; product is different (59%, builds AI products). So lenses hold for most tracks, and product may need its own part later.
* **Foundations (Part I, mandatory) = the old Parts I + II merged**, ordered by the dependency chain the JDs also use: model → training → cost → prompting → RAG → agents → judging output. Readable in one weekend (~7 chapters × 6 pages). Then Part II "AI in business" (stack, ROI gap, rules, work), Part III "Consulting" for v1, Part IV interview room. To confirm: is a 40-page mandatory core too long for the "anyone opens page one" reader? Option: a 10-page "AI in one sitting" opener that the full core expands.
* **Cut regulation to a section, not a chapter** (DPDP Act in 0–1% of JDs); keep RBI FREE-AI inside the finance lens.
* **An India layer as a spine, not a garnish:** RBI FREE-AI (finance), DPDP Act, IndiaAI Mission, Indian usage data (Anthropic: India #2 by volume, 45% software tasks), Indian recruiter JDs.

## Session 1 research findings (sub-agents, 2026-11-01) — to discuss, nothing decided

- **Casebooks under-prepare students for AI.** 7 IIM/ISB/BITSoM casebooks (2025–26), ~518 cases: ~2% core AI, ~6% incl. automation/digital. Where AI appears: M&A/due diligence of AI firms, "convince the client to adopt AI", sizing ChatGPT usage. None asks how models work or what inference costs; only ISB has an AI primer. Accenture is the clearest asker. Set against 35% of consulting-firm JDs asking about AI, **the consulting track's edge is a set of AI cases and guesstimates no casebook has.** [research-casebooks-2025-26.md](research-casebooks-2025-26.md)
- **Consulting evidence is mixed on the "pyramid collapse".** Big Four UK cut graduate intake (KPMG −29%, Deloitte −18%); MBB say flat or up (BCG "not reduced our junior intake", Bain grads +25%). Stronger story: **fees moving to outcomes** (McKinsey ~25% outcome-based; BCG variable fees on ¾ of its largest AI cases). Jagged-frontier paper (Org Science 2026): +12.2% tasks, 25.1% faster, quality +32% (not 40%), −19 pp outside the frontier. India primary evidence is weak. [research-consulting-ai.md](research-consulting-ai.md)
- **The canon adds three things our draft lacks:** a "kinds of AI" opener (ML vs GenAI, which tool fits which problem; 7 of 12 curricula start there; consulting cases on churn and forecasting rest on it); responsible AI woven through every chapter (most common topic, 9/12) rather than one regulation section; Excel-level data literacy (error rates, base rates). It confirms "judge and defend AI output" as the spine. **Question for editors: zero code, but are no-code builds (a custom GPT, a simple agent) allowed?** The newest required courses (Yale, HBS) have managers build. [research-canon.md](research-canon.md)
- **Foundations distilled from 12 vetted videos** (NotebookLM `inference-found`): sources contradict each other on prompting (Mollick: tricks are obsolete; Anthropic: structure helps), so frame it as delegation with a checklist. Fine-tuning is defined two ways (knowledge vs alignment). Evaluating open-ended output is thin and needs other sources. [research-foundations-distilled.md](research-foundations-distilled.md)

- **Gemini cross-file synthesis** ([synthesis-gemini-2026-11-01.md](synthesis-gemini-2026-11-01.md), Flash High via agy, reviewed by Claude). Useful additions: agent security (prompt injection, tool poisoning) is missing from the agents chapter; change management is the most-asked business skill in AI JDs (42%) and deserves more than a mention inside the ROI chapter; cost/tokens may be a section inside the model chapter rather than its own chapter; the jobs chapter should not frame juniors' jobs as collapsing. **Review corrections:** it says casebooks contain no AI cases (wrong: ~12 core, ~30 adjacent); it reopens the zero-code decision (settled; only no-code is open); its "AI stack is weak" verdict ignores casebook demand (AI due diligence, data centres, cloud cases).

## Open questions

* What is the book *for*: crack the interview, do the job in year one, or both? (editors) - answered.
* Which tracks are in v1, and is there a "general management / chief of staff / AI-PM" track? Deloitte names "AI/Digital PM" as a top-10-campus role. (editors) - first track to cover is consulting 
* Technical floor: can we assume Excel only, or a reader willing to run a Python notebook? (editors) - only reading no technical part , these would be non engineering people assume who have zero idea about coding too , so yeah assume excel 
* What AI questions did your seniors actually get in summers / finals 2025–26? Online write-ups are nearly empty. **Highest-value evidence we don't have.** (editors + friend) - dont really know , the thing is the knowledge will help students answer 
* Placement calendar: when must v1 be in students' hands (summers prep is roughly Sep–Nov for first-years)? (editors) - v1 im planning consulting to launch as v1 with just my few batchmates to get review but we will keep building for all the other domains as well. 
* Does McKinsey's AI interview exist in India yet? (seniors at MBB) - idk 

## Candidate structure (v1, accepted 2026-11-01 — ready for /toc-compile)

Each line: id — title as a claim — promise — tracks (v1 lens: consulting; others later). ~6 A4 pages per chapter unless noted.

Opener
0. ai-in-one-sitting — AI in one sitting — the whole of Part I in 10 pages; doubles as the night-before recap — all (10 pp)

Part I — Foundations (mandatory)
1. kinds-of-ai — Not all AI is ChatGPT — predictive ML vs generative models; which tool fits which business problem (churn, scoring, forecasting vs text) — all
2. next-word-machine — A model predicts the next word — next-token prediction, parameters, why scale matters; tokens and context as the reader's first cost intuition — all
3. confidently-wrong — Why models are confidently wrong — pretraining, fine-tuning, RLHF, hallucination; bias enters at training (responsible-AI thread starts here) — all
4. delegation-brief — A prompt is a delegation brief — instructions, context, examples, iteration; structure as a checklist, not tricks — all
5. your-documents — Giving the model your documents — RAG and embeddings in plain words; why "ChatGPT on our data" is hard; privacy at retrieval — all
6. models-that-act — Agents: models that act, and how they break — tools, multi-step work, skills, failure rates; prompt injection and tool security — all
7. judging-output — Judging AI output is the job now — evals, error rates, base rates, false positives, human in the loop; the prompt → review → challenge → decide protocol — all

Part II — AI in business
8. who-pays — Who pays for intelligence — inference cost, chips, data centres, clouds, labs, apps; AI company valuations and the debt behind the boom — consulting, finance
9. pilots-stall — Why AI pilots stall — the ROI gap (McKinsey 2026: 89% use, 37% see EBIT impact); change management, workflow redesign, adoption — consulting, ops, HR
10. work-changes — How the work changes — what the evidence on jobs actually says (split, not collapse); entry-level shifts; India's position — all

Part III — Consulting (v1 track)
11. consulting-firm — What AI does to a consulting firm — jagged frontier study, Lilli and agents, outcome-based fees, the pyramid debate — consulting
12. ai-casebook — The INFERENCE AI casebook — ~10 cases + ~10 guesstimates built on casebook patterns (AI due diligence, adoption pitch, use-case mapping, sizing usage), each with a model answer — consulting (~20 pp)
13. interview-room — The interview room — being screened by AI, AI-assisted case rounds, the questions to expect and how to answer them — consulting

Inserts (short, dated, replaced each term)
- state-of-play — State of play, Nov 2026 — current frontier models and products, with dates
- india-briefing — India briefing — DPDP Act, RBI FREE-AI, IndiaAI Mission, Indian usage data (2 pp)

Threads across chapters: responsible AI (bias ch3, privacy ch5, security ch6, accountability ch7); no-code "Try it" exercises (Custom GPT / Gemini Gem / NotebookLM), never code.

## Evidence log

Full lines with links in the research files. Headline items:

* \[A] Deloitte India Campus Workforce Trends 2026 (27 Aug 2026). (opened ✓)
* \[A] BCG AI at Work 2026 press release (3 Jun 2026). (opened ✓)
* \[A] McKinsey chart "AI job losses fall short of forecasts" (3 Sep 2026), from State of AI 2026 (25 Aug 2026). (opened ✓ via Camoufox)
* \[B] Fortune on McKinsey's Lilli interview pilot (14 Jan 2026); primary is HBR IdeaCast "Where McKinsey—and Consulting—Go From Here" (6 Jan 2026). (Fortune opened ✓, podcast not yet)
* \[A] Stanford HAI AI Index 2026 takeaways (13 Apr 2026). (opened ✓)
* \[A] Anthropic Economic Index India Brief (16 Feb 2026). (opened ✓)
* \[A] Google AI updates Sept 2026 (2 Oct 2026). (opened ✓)
* \[A] RBI FREE-AI report (13 Aug 2025). (snippet)
* \[signal] LinkedIn India MBA-track JDs, Oct 2026: see JD research file.

## Parked / out of scope

* Model-by-model comparisons (which chatbot is best) — dated within weeks; at most a dated insert.
* Coding/ML engineering — readers are non-technical; we teach reasoning about models, not building them.

