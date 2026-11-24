# Status

_Last updated 2026-11-23, HR & People Track (Part VIII, Chapters 30–33) authored, verified, and compiled into the publication pipeline with zero errors and zero SVG overflows._

## Where we are
- **Edition: 2027 · Edition 1.0 (Release Candidate — v6 HR & People Edition).** All 36 planned units (Chapters 00 through 33 plus Inserts A and B across Parts 0 through IX) are fully drafted, verified, and linted with zero errors (`check: 0 errors, 17 warnings`).
- **Web Edition 2.0:**
  - **Interactive Placement Track Filter:** Home page now has instantaneous filter pills for `All Tracks (36)`, `Foundations (8)`, `Consulting (13)`, `Marketing (4)`, `Product (4)`, `Operations (4)`, `Finance (4)`, and `HR & People (4)`.
  - **Real-Time Live Search:** Fast in-memory search bar filters chapters, topics, and cases without page reloads.
  - **Pedagogy & Reading Guide:** The "Three ways to read this book" (The night before / The week before / Every day) guide is featured on the web home page.
  - **Theme Switcher:** Topbar toggle for Dark / Light / Auto mode with `localStorage` persistence and zero-flicker boot script.
  - **In-Chapter Quick Switcher:** Seamless chapter jump `<select>` in topbar so readers don't need to exit back to contents.
  - **SVG Rendering & Zero Overflow:** All 34 SVG figures pass automated headless Chromium geometry audits with zero text overflows (`test/inspect_figures.mjs`).
- **Front Cover & First Page:** Restored to the clean, authentic, magazine-grade design language specified in `docs/DESIGN.md`:
  - **Wordmark & Identity:** Giant title `INFERENCE.` with cobalt `#8593FF` full stop.
  - **Byline & Authors:** Prominently attributes Janmejai Singh Minhas ([LinkedIn](https://linkedin.com/in/janmejai) · [GitHub](https://github.com/janmejai2002)) & Chaitanya Sharma ([LinkedIn](https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/) · [GitHub](https://github.com/chaitanya-sharma)) with links in byline and colophon.
  - **Attention Matrix:** Clean mathematical causal self-attention matrix over *"Will AI replace the analyst or make the analyst ?"* with opacity-shaded cells on the lower triangle and subtle mask dots on the upper triangle (no intrusive System 2 overlays or text clutter).
  - **Purpose Statement:** One clear sentence explaining why the compendium exists: *"Every B-school recruiter now asks about AI. Most compendiums still don't teach it. This one starts from first principles and ends in the interview room."*
  - **Live Edition QR:** High-resolution SVG QR code linking to the live GitHub Pages edition (`https://janmejai2002.github.io/inference-compendium/`).
- **Authors & Co-creators:** Janmejai Singh Minhas & Chaitanya Sharma.
- **Title & Edition:** `INFERENCE` · `2027 · Edition 1.0 (Release Candidate)`.
- **Book metrics:** 36 units, 150,033 total words, 84 media cards, 116 glossary terms.
- **Pipeline & Deployment:** Working cleanly. Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable table of contents.
- **Sources:** 178 sources registered in `content/sources.yml`, 178 verified (0 unverified). All citations independently verified with live URL audits and primary publisher records.

## Chapter inventory (36/36 published)
| # | ID | Title | Status | Words | Media |
|---|---|---|---|---|---|
| 00 | `ai-in-one-sitting` | AI in one sitting | published | 4,301 | 3 |
| 01 | `kinds-of-ai` | Not all AI is ChatGPT | published | 3,276 | 2 |
| 02 | `next-word-machine` | A model predicts the next word | published | 3,533 | 3 |
| 03 | `confidently-wrong` | Why models are confidently wrong | published | 3,370 | 3 |
| 04 | `delegation-brief` | A prompt is a delegation brief | published | 3,234 | 3 |
| 05 | `your-documents` | Giving the model your documents | published | 3,471 | 3 |
| 06 | `models-that-act` | Agents: models that act, and how they break | published | 3,433 | 3 |
| 07 | `judging-output` | Judging AI output is the job now | published | 3,501 | 3 |
| 08 | `who-pays` | Who pays for AI, and how much? | published | 3,577 | 3 |
| 09 | `pilots-stall` | Why enterprise AI pilots stall | published | 4,029 | 3 |
| 10 | `work-changes` | How AI changes knowledge work | published | 3,762 | 3 |
| 11 | `consulting-firm` | What AI does to a consulting firm | published | 3,995 | 3 |
| 12 | `ai-casebook` | The INFERENCE AI casebook | published | 7,708 | 3 |
| 13 | `interview-room` | The interview room | published | 4,597 | 3 |
| 14 | `creative-at-scale` | Creative at scale: production, localization, and agency economics | published | 3,757 | 3 |
| 15 | `synthetic-audiences-and-attribution` | Synthetic panels, MMM, and modern marketing measurement | published | 3,847 | 2 |
| 16 | `brand-safety-boundary` | The brand safety boundary: hallucinations, IP, and consumer trust | published | 4,266 | 2 |
| 17 | `marketing-casebook` | The Marketing AI casebook & interview room | published | 4,608 | 2 |
| 18 | `ai-product-lifecycle` | AI product lifecycle: evals, drift, and golden datasets | published | 2,700 | 3 |
| 19 | `product-architecture-economics` | Product architecture & economics: latency budgets, caching, and model routing | published | 3,070 | 3 |
| 20 | `agentic-ux-and-interfaces` | Agentic UX: ambient HUDs, canvas workspaces, and human-in-the-loop | published | 3,312 | 3 |
| 21 | `product-casebook` | The Product AI casebook & interview room | published | 3,564 | 3 |
| 22 | `algorithmic-underwriting-and-credit-risk` | Algorithmic Underwriting & Credit Risk | published | 4,308 | 2 |
| 23 | `financial-copilots-and-deal-diligence` | Financial Copilots & Deal Diligence | published | 3,665 | 1 |
| 24 | `financial-crime-fraud-and-rbi-free-ai` | Financial Crime, Fraud & RBI FREE-AI | published | 5,241 | 2 |
| 25 | `finance-casebook` | Finance Casebook: Eight Worked Problems | published | 8,673 | 2 |
| 26 | `predictive-maintenance-and-industrial-ai` | Predictive Maintenance, Industrial IoT & Digital Twins | published | 4,866 | 1 |
| 27 | `supply-chain-planning-and-autonomous-replenishment` | Supply Chain Planning & Demand Sensing | published | 4,814 | 2 |
| 28 | `warehouse-automation-and-physical-ai` | Warehouse Automation, Computer Vision & Physical AI | published | 4,574 | 1 |
| 29 | `operations-casebook` | Operations Casebook: Eight Worked Problems | published | 5,181 | 1 |
| 30 | `ai-in-hiring` | AI in Hiring: Screening, Embeddings & Audits | published | 3,115 | 2 |
| 31 | `workforce-planning-and-skills` | Workforce Planning: Task Exposure & Reskilling | published | 4,059 | 2 |
| 32 | `hr-copilots-and-people-analytics` | HR Copilots, People Analytics & Surveillance | published | 3,669 | 2 |
| 33 | `hr-casebook` | HR Casebook: Worked Problems & Guesstimates | published | 5,154 | 1 |
| A | `state-of-play` | State of play, November 2026 | published | 1,562 | 1 |
| B | `india-briefing` | India briefing | published | 1,823 | 2 |

## Collaboration & access
- Co-editor `chaitanya-sharma` invited 2026-11-01 with write access to the GitHub repository.

## Open issues and editorial checklist
- [x] **Source Verification:** 178/178 sources in `content/sources.yml` are 100% verified (`verified: true`, 0 unverified). All citations independently confirmed live with primary publisher records.
- [x] **Publication Status Promotion:** Promoted all 36 units in `content/toc.yml` and frontmatter to `published` for the final 2027 v1.0 release candidate.
- [x] **HR & People Track (v6):** Fully authored and integrated Part VIII (Chapters 30–33) covering AI in hiring, task exposure & workforce planning, HR copilots & surveillance limits, and the HR casebook.
- [ ] **Physical Print Proofing:** Run `npm run proof:bw` to inspect Paged.js page-breaks and typographic hygiene prior to commercial hard-copy print run.
