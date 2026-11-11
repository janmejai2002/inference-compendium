# Status

_Last updated 2026-11-11, Operations & Supply Chain Track (Part VII, Chapters 26–29) authored, verified, and compiled into the publication pipeline with zero errors and zero SVG overflows._

## Where we are
- **Edition: 2027 · Edition 1.0 (Release Candidate — v5 Operations Edition).** All 32 planned units (Chapters 00 through 29 plus Inserts A and B across Parts 0 through VIII) are fully drafted, verified with cross-model plan checks, and linted with zero errors (`check: 0 errors`).
- **Web Edition 2.0:**
  - **Interactive Placement Track Filter:** Home page now has instantaneous filter pills for `All Tracks (32)`, `Foundations (8)`, `Consulting (13)`, `Marketing (4)`, `Product (4)`, `Operations (4)`, and `Finance (4)`.
  - **Real-Time Live Search:** Fast in-memory search bar filters chapters, topics, and cases without page reloads.
  - **Pedagogy & Reading Guide:** The "Three ways to read this book" (The night before / The week before / Every day) guide is featured on the web home page.
  - **Theme Switcher:** Topbar toggle for Dark / Light / Auto mode with `localStorage` persistence and zero-flicker boot script.
  - **In-Chapter Quick Switcher:** Seamless chapter jump `<select>` in topbar so readers don't need to exit back to contents.
  - **SVG Rendering & Zero Overflow:** All 30 SVG figures pass automated headless Chromium geometry audits with zero text overflows (`test/inspect_figures.mjs`).
  - **Dynamic PDF Delivery:** Download PDF button serves the complete 580-page v5 operations draft (`INFERENCE-v5-operations-draft.pdf`, 14.99 MB).
- **Front Cover & First Page:** Restored to the clean, authentic, magazine-grade design language specified in `docs/DESIGN.md`:
  - **Wordmark & Identity:** Giant title `INFERENCE.` with cobalt `#8593FF` full stop.
  - **Byline & Authors:** Prominently attributes Janmejai Singh Minhas ([LinkedIn](https://linkedin.com/in/janmejai) · [GitHub](https://github.com/janmejai2002)) & Chaitanya Sharma ([LinkedIn](https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/) · [GitHub](https://github.com/chaitanya-sharma)) with links in byline and colophon.
  - **Attention Matrix:** Clean mathematical causal self-attention matrix over *"Will AI replace the analyst or make the analyst ?"* with opacity-shaded cells on the lower triangle and subtle mask dots on the upper triangle (no intrusive System 2 overlays or text clutter).
  - **Purpose Statement:** One clear sentence explaining why the compendium exists: *"Every B-school recruiter now asks about AI. Most compendiums still don't teach it. This one starts from first principles and ends in the interview room."*
  - **Live Edition QR:** High-resolution SVG QR code linking to the live GitHub Pages edition (`https://janmejai2002.github.io/inference-compendium/`).
- **Authors & Co-creators:** Janmejai Singh Minhas & Chaitanya Sharma.
- **Title & Edition:** `INFERENCE` · `2027 · Edition 1.0 (Release Candidate)`.
- **Book metrics:** 580 pages, 134,036 total words, 77 media cards, 108 glossary terms.
- **Pipeline & Deployment:** Working cleanly. Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable table of contents. Automated GitHub Pages workflow (`.github/workflows/deploy.yml`) continuously deploys to `https://janmejai2002.github.io/inference-compendium/` on every push to `main`.
- **Live Edition QR:** Interactive and printable SVG QR code added to the front cover and back cover pointing to the live online edition.
- **Milestone snapshots:**
  - `editions/INFERENCE-v5-operations-draft.pdf` (14.99 MB, 580 pages) generated and committed.
  - `editions/INFERENCE-v4-finance-draft.pdf` (12.34 MB, 498 pages) preserved.
  - `editions/INFERENCE-v3-product-draft.pdf` (10.38 MB, 408 pages) preserved.
  - `editions/INFERENCE-v2-marketing-draft.pdf` (8.99 MB, 338 pages) preserved.
  - `editions/INFERENCE-v1-draft.pdf` (7.17 MB, 252 pages) preserved.
- **Proofing:** Full B&W proof rendered to `dist/pages-bw/` via `npm run proof:bw`.
- **Sources:** 170 sources registered in `content/sources.yml`, 170 verified (0 unverified). All 32 target citations independently verified with live URL audits and primary publisher records.

## Chapter inventory (32/32 published)
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
| A | `state-of-play` | State of play, November 2026 | published | 1,562 | 1 |
| B | `india-briefing` | India briefing | published | 1,823 | 2 |

## Collaboration & access
- Co-editor `chaitanya-sharma` invited 2026-11-01 with write access to the GitHub repository.

## Open issues and editorial checklist
- [x] **Source Verification:** 170/170 sources in `content/sources.yml` are 100% verified (`verified: true`, 0 unverified). All 32 target citations independently confirmed live with primary publisher records.
- [x] **Publication Status Promotion:** Promoted all 32 units in `content/toc.yml` and frontmatter to `published` for the final 2027 v1.0 release candidate.
- [x] **Operations & Supply Chain Track (v5):** Fully authored and integrated Part VII (Chapters 26–29) covering predictive maintenance, demand sensing, warehouse robotics, and the operations casebook.
- [ ] **Physical Print Proofing:** Run `npm run proof:bw` to inspect Paged.js page-breaks and typographic hygiene prior to commercial hard-copy print run.
- [ ] **Future Placement Tracks (Post-v1.0):** Authoring HR & People (HR) track as outlined in `book.yml`.
