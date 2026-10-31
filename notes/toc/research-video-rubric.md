# Video rubric: what earns a Watch card

_Drafted 2026-10-31 (session 1). Decides, for every candidate YouTube video, one of: **EMBED** (a Watch card in the book), **DISTIL** (we use its knowledge and may cite it, but don't send the reader to it) or **DROP**._

## Pipeline (who does what)

| Stage | Tool | Why this tool |
|---|---|---|
| 1. Candidates | `agent-reach youtube search` per concept, plus a seed list of known channels | free, returns views + duration |
| 2. Metadata gates | `yt-dlp` (via Agent Reach): channel subscribers, upload date, views, likes, duration, language | deterministic, no model needed |
| 3. Per-video scoring | **Gemini 3.8 Flash via `agy -p`** reads the full transcript from disk, returns JSON against this rubric | transcripts never enter Claude's context; Flash is cheap and runs on the editor's quota |
| 4. Cross-video distillation | **NotebookLM** notebook per Part, shortlisted videos as sources; `nlm query` per chapter concept, with citations | synthesis across 30–50 videos with source-grounded citations, at no token cost to the session |
| 5. Decision | script combines gates + scores → EMBED / DISTIL / DROP; one editor pass on the EMBED list | humans approve what goes in print |

## Hard gates (fail one → not EMBED)

| Gate | Rule |
|---|---|
| G1 Legitimate channel | ≥100k subscribers, **or** an official institution (AI lab, university, major publisher, consulting firm, regulator) with a verified channel. No faceless AI-voice channels, no course-sellers' funnels. |
| G2 Proven reach | ≥100k views, or ≥20k for official/primary channels (a lab's own launch talk). Views relative to channel size are a tiebreaker. |
| G3 Fresh enough | Durable concepts (how a model works): any date. Fast-moving topics (agents, products, market data): posted ≤ 18 months ago. |
| G4 Accurate | Flash flags any claim that is wrong or outdated; any flag → editor checks before EMBED. |
| G5 Not a pitch | No vendor demo or course funnel as the main content. Sponsor reads are fine. |
| G6 Language | English, or Hindi/Hinglish with good captions (a plus for Indian readers). |

## Scores (1–5, Flash scores, editor spot-checks)

| Metric | Weight | 5 looks like |
|---|---|---|
| **Watchability** (infotainment) | 25% | Story, visuals and pacing; a tired student finishes it and tells a friend |
| **Clarity for non-technical** | 20% | No code, no maths beyond school; jargon explained the first time |
| **Concept fit** | 20% | Teaches exactly one chapter concept from first principles, not a tour of ten |
| **Business relevance** | 15% | Links the idea to decisions, money, work or an interview answer |
| **Density** | 10% | High insight per minute; no 3-minute intros |
| **Authority** | 10% | Creator built the thing or is the primary source (Karpathy on LLMs, a lab on its own model) |

Plus **Durability** (1–5): will this still be right in two years? Used to choose between near-ties and to label the card "dated" if needed.

## Decision rule

- **EMBED** if all gates pass, Watchability ≥ 4, Clarity ≥ 4, weighted score ≥ 3.8, **and** it is the best or second-best video for its concept. Max 2 Watch cards per chapter (the pedagogy's Watch/Read box), with `marks` (timestamps) when only part of a video matters.
- **DISTIL** if Authority ≥ 4 and Concept fit ≥ 3 but it fails Watchability, Clarity or length (typical: a 2-hour podcast with one brilliant 6-minute stretch). Its knowledge goes into the NotebookLM notebook and the chapter; we may cite it with a timestamp.
- **DROP** otherwise.

## Seed channels (established; to extend)

Mechanism: 3Blue1Brown, Andrej Karpathy, Welch Labs, Computerphile, IBM Technology, Google DeepMind, Anthropic, OpenAI.
Business and explainers: CNBC, Bloomberg Originals, WSJ, Vox, ColdFusion, Wendover/Real Engineering-style explainers, Y Combinator, a16z, Lenny's Podcast, Stanford GSB, HBR, McKinsey, BCG.
India: Think School, Mint, CNBC-TV18, Nikhil Kamath (WTF is…), ET Now.
