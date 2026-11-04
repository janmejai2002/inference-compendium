# Project: INFERENCE v3 Expansion (Product Management Track)

## Architecture
- **Language / Runtime**: Node.js (ESM), Markdown-It, KaTeX, Paged.js, Playwright.
- **Master Registries**:
  - `book.yml`: Global book metadata, track tokens, publisher, edition string.
  - `content/toc.yml`: Hierarchical table of contents defining parts, chapter order, tracks, and metadata.
  - `content/sources.yml`: Canonical bibliography with Tier A/B/C authority ratings, metadata, and QR codes.
  - `content/source-policy.yml`: Domain authority whitelist and tier ceilings.
  - `content/glossary.yml`: Lexicon of technical definitions rendered as margin sidenotes and backmatter index.
- **Content Engine**:
  - `content/chapters/*.md`: Structured chapter prose with YAML frontmatter and custom container callouts.
  - `content/figures/*.svg`: Inline semantic vector graphics referenced by chapters.
- **Build & Verification Pipelines**:
  - `scripts/check.mjs`: Offline referential integrity validator (TOC, sources, policy, syntax, escaped HTML leaks).
  - `scripts/build.mjs`: Multi-target compiler generating HTML, CSS, JS, and Paged.js print spreads.
  - `scripts/pdf.mjs`: Headless Chromium PDF renderer generating `dist/INFERENCE.pdf`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | F01: Primary Sources Ingestion | Ingest OpenAI Evals, Anthropic Prompt Eng & Caching, Google Gemini Long-Context, Marty Cagan SVPG, Zheng et al., Card-Moran-Newell into `content/sources.yml`. | M1 | Survey 3 / Request |
| 2 | F02: Domain Policy Allowlist | Register `svpg.com` in `content/source-policy.yml` under Tier B to satisfy linter domain check. | M1 | Survey 1 & 3 |
| 3 | F03: Glossary Ingestion | Append `eval-harness`, `synthetic-evals`, `latency-budget`, `context-caching`, `model-routing`, `agentic-ux` to `content/glossary.yml`. | M1 | Survey 3 / Request |
| 4 | F04: TOC Part V Insertion | Add Part V (`id: p5`, `n: V`, `title: Product Management`, `track: product`) with 4 chapters to `content/toc.yml`; shift Inserts to Part VI (`id: p6`). | M1 | Survey 1 & 3 |
| 5 | F05: Book Config Update | Bump `book.yml` edition to `"2027 · Draft 0.3 (Product Track)"`. | M1 | Survey 1 / Request |
| 6 | F06: Chapter 18 Authoring | Draft `content/chapters/ai-product-lifecycle.md` adhering strictly to `docs/PEDAGOGY.md` and `docs/AUTHORING.md`. | M2 | Survey 2 & 3 |
| 7 | F07: Chapter 19 Authoring | Draft `content/chapters/product-architecture-economics.md` with latency budgets, context caching cost models, routing, build vs buy. | M2 | Survey 2 & 3 |
| 8 | F08: Chapter 20 Authoring | Draft `content/chapters/agentic-ux-and-interfaces.md` with ambient UI, proactive HUDs, conversational vs canvas, human-in-the-loop. | M3 | Survey 2 & 3 |
| 9 | F09: Chapter 21 Authoring | Draft `content/chapters/product-casebook.md` with 8 fully-worked quantitative PM cases and estimation problems. | M3 | Survey 2 & 3 |
| 10 | F10: Accompanying SVG Figures | Author vector diagrams in `content/figures/` for the PM chapters. | M2, M3 | Survey 1 & 2 |
| 11 | F11: Editorial & Verification Gate | Run `npm run check` (0 errors), `npm run build`, and `npm run pdf`. | M4 | Survey 1 / Request |
| 12 | F12: Release Packaging & Commit | Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v3-product-draft.pdf`, update `STATUS.md`, and commit. | M4 | Survey 1 / Request |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Registries & Configuration | `content/sources.yml`, `content/source-policy.yml`, `content/glossary.yml`, `content/toc.yml`, `book.yml` | none | DONE |
| M2 | Foundation PM Chapters | `content/chapters/ai-product-lifecycle.md`, `content/chapters/product-architecture-economics.md`, accompanying SVG figures | M1 | DONE |
| M3 | Advanced PM Chapters & Casebook | `content/chapters/agentic-ux-and-interfaces.md`, `content/chapters/product-casebook.md`, accompanying SVG figures | M1, M2 | DONE |
| M4 | Verification, Release & Commit | `npm run check`, `npm run build`, `npm run pdf`, copy to `editions/`, update `STATUS.md`, git commit | M2, M3 | IN_PROGRESS |

## Interface Contracts
### M1 Registries ↔ M2/M3 Chapter Authoring
- `content/sources.yml` keys (`openai-evals-framework`, `anthropic-context-caching`, `anthropic-prompt-engineering-interactive`, `google-gemini-long-context`, `cagan-transformed-ai`, `cagan-svpg-ai-risk`, `zheng-judging-llm-as-judge`, `card-moran-newell-psychology-hci`) must exactly match citations `[@source-id]` and media cards `{{paper source-id}}` in chapters.
- `content/glossary.yml` keys (`eval-harness`, `synthetic-evals`, `latency-budget`, `context-caching`, `model-routing`, `agentic-ux`) must exactly match `[[term-id]]` references in chapters.
- `content/toc.yml` chapter IDs (`ai-product-lifecycle`, `product-architecture-economics`, `agentic-ux-and-interfaces`, `product-casebook`) must exactly match chapter filenames and frontmatter `id`.
- Track ID must be `product` (styled with CSS token `--t-product: #7438E0`).

### M2/M3 Chapters ↔ M4 Verification Pipeline
- Chapter syntax must have zero escaped HTML tag leaks: no KaTeX math ($math$) or raw HTML inside block titles (`::: principle`, `::: case`, `::: stat`, etc.).
- Exactly 4–8 highlights (`==...==`) per chapter.
- Exactly 1 stat block (`::: stat <value>`) per chapter with lining-nums.
- Exactly 1–3 media cards (`{{watch/read/paper/listen id}}`) per chapter.
- Exactly 4–6 check questions ending with `<span class="lvl">...</span>` paired with `::: answers` rotated 180 degrees.
- Exactly 5 numbered lines in `::: recap The night-before page`.
- `npm run check` must pass with 0 errors.

## Code Layout
- Exclusive file boundaries:
  - M1 Worker: `content/sources.yml`, `content/source-policy.yml`, `content/glossary.yml`, `content/toc.yml`, `book.yml`.
  - M2 Worker: `content/chapters/ai-product-lifecycle.md`, `content/chapters/product-architecture-economics.md`, `content/figures/ai-product-lifecycle.svg`, `content/figures/product-architecture-economics.svg`.
  - M3 Worker: `content/chapters/agentic-ux-and-interfaces.md`, `content/chapters/product-casebook.md`, `content/figures/agentic-ux-and-interfaces.svg`, `content/figures/product-casebook.svg`.
  - M4 Worker: `STATUS.md`, `editions/INFERENCE-v3-product-draft.pdf`, git commit.
