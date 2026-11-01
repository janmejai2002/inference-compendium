# Why the v1 table of contents looks like this

Compiled 2026-11-01 from `notes/toc/DISCUSSION.md` (Decided + Candidate structure v1). Evidence lives in `notes/toc/research-*.md`.

## The thesis that orders everything
The test has moved from "do you know about AI" to "can you direct AI and judge its output". So the foundations end on judging output (ch 7), business chapters explain why that skill decides ROI, and the consulting part puts it to work in cases and interviews.

## Shape
- **Opener (00), 10 pages.** Part I compressed for the reader who opens page one and nothing else; doubles as the night-before recap. Written last.
- **Part I, Foundations (01–07), mandatory and in order.** Follows the dependency chain the JDs also use: kinds of AI → model → training and failure → prompting → documents (RAG) → agents → judging output. Ch 1 is "kinds of AI" because 7 of 12 curricula start there and consulting cases on churn and forecasting rest on predictive ML, not chatbots.
- **Part II, AI in business (08–10).** One cost-and-stack chapter (casebooks ask AI due diligence, data-centre and cloud cases); the ROI gap with change management at its centre (the most-asked business skill in AI JDs, 42%); jobs framed as "how the work changes", since the evidence shows a split, not a collapse.
- **Part III, Consulting (11–13).** The v1 track. The AI casebook is the centrepiece: 7 IIM/ISB/BITSoM casebooks hold ~2% core-AI cases while 35% of consulting-firm JDs ask about AI.
- **Inserts A–B.** Dated pages. Model names change monthly, so concepts live in chapters and the current frontier lives on a page the web edition replaces each term. India gets its own two pages plus a spine through the chapters.

## Threads
Responsible AI is woven through rather than isolated: bias (ch 3), privacy (ch 5), security (ch 6), accountability (ch 7). "Try it" exercises are no-code only (Custom GPT, Gemini Gem, NotebookLM). Zero code anywhere.

## Lenses
Every chapter carries a consulting lens in v1. Other tracks (marketing, product, operations, finance, HR) arrive in later editions as lenses and reading paths, not as separate books; product may need its own part.

## Out of scope for v1
Model-by-model comparisons (only on the dated insert); coding and ML engineering; regulation as a full chapter (DPDP and RBI FREE-AI sit in the India briefing and the finance lens).

## Kept aside
`content/chapters/what-is-a-model.md` stays as the design sample (`sample: true`), outside the TOC. Its good material may be reused in `next-word-machine`.
