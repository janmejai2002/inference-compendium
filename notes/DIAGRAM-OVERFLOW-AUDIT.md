# INFERENCE — Diagram & SVG Overflow Remediation Index
_Generated 2026-11-11 following an automated Playwright Chromium bounding-box audit of all 498 pages in `dist/print.html`._

---

## Executive Summary

The automated render audit discovered that **18 of the 26 architectural diagrams (`.fig svg`)** suffer from horizontal text overflow.

### Root Cause Analysis
1. **Typography & Font Metrics:** In `design/components.css`, `.fig svg text` defaults to `var(--f-mono)` (IBM Plex Mono). Monospace fonts allocate ~0.6em width per character.
2. **Column Constraint Mismatch:** Many diagrams follow a two-column layout (`viewBox="0 0 640 H"`), placing a 240–270px card on the right column starting at $x \approx 350-380$.
3. **Unbroken Character Counts:** Single lines of descriptive text containing 48–72 characters require 290–430px of horizontal space. When placed at $x=362$, these text elements extend to $x=650-800$, overshooting both the card boundary ($x \approx 620$) and the SVG canvas ($x=640$), bleeding into the page margin rail and overlapping margin notes.
4. **CSS Overflow Default:** SVG elements default to `overflow: visible`, allowing unclipped text glyphs to bleed into page margins.

---

## Global Architectural Safeguard (Item 0)

- **File:** [`design/components.css`](file:///C:/Users/Janmejai/compendium/design/components.css)
- **Fix:** Add `overflow: hidden;` to `.fig-art svg` to defensively clip any edge bleed at the container box, while refactoring all inner text strings to fit within bounds.

```css
.fig-art svg, .fig-art img { display: block; width: 100%; height: auto; overflow: hidden; }
```

---

## The 18 Target Diagrams & Itemized Fixes

| # | Page | Chapter | Figure ID & File | Overflowing Elements | Action Required |
|---|---|---|---|---|---|
| **01** | **92** | `models-that-act` | [`models-that-act-trifecta.svg`](file:///C:/Users/Janmejai/compendium/content/figures/models-that-act-trifecta.svg) | Table header "At 95% / step" (+4px); footer lines (+78px, +83px) | Tighten column headers; split footer sentences into concise 38-char lines. |
| **02** | **108** | `judging-output` | [`judging-output-protocol.svg`](file:///C:/Users/Janmejai/compendium/content/figures/judging-output-protocol.svg) | Precision footnote lines (+3px, +48px) | Wrap 52-char base-rate summary into two concise lines under 42 chars. |
| **03** | **120** | `who-pays` | [`who-pays-value-chain.svg`](file:///C:/Users/Janmejai/compendium/content/figures/who-pays-value-chain.svg) | Header "Financial Reality" (+13px); source citation (+116px) | Shorten header to "Financial State"; split citation across 2 lines. |
| **04** | **138** | `pilots-stall` | [`pilots-stall-funnel.svg`](file:///C:/Users/Janmejai/compendium/content/figures/pilots-stall-funnel.svg) | Card A description line 2 (+27px) | Tighten text from 55 chars to 44 chars ("collapse sign-off tiers, and restructure handoffs."). |
| **05** | **169** | `consulting-firm` | [`consulting-firm-pyramid.svg`](file:///C:/Users/Janmejai/compendium/content/figures/consulting-firm-pyramid.svg) | Partner, Pod & Associate card descriptions (+31px, +6px, +21px) | Scale font-size to 8pt and tighten phrasing to stay within width 250px. |
| **06** | **183** | `ai-casebook` | [`ai-casebook-taxonomy.svg`](file:///C:/Users/Janmejai/compendium/content/figures/ai-casebook-taxonomy.svg) | Step 3 subtitle (+5px) | Shorten subtitle to "API bill vs. GPU-hours (₹65/hr IndiaAI rate)". |
| **07** | **212** | `interview-room` | [`interview-room-funnel.svg`](file:///C:/Users/Janmejai/compendium/content/figures/interview-room-funnel.svg) | Rubric cards A, B, C, D descriptions (+22px, +22px, +14px, +18px) | Shorten each card subtitle to $\le 45$ chars and set font-size 8pt. |
| **08** | **231** | `creative-at-scale` | [`creative-scale-pipeline.svg`](file:///C:/Users/Janmejai/compendium/content/figures/creative-scale-pipeline.svg) | Feedback annotation at auction (+18px) | Re-align label position to $x=420$ or wrap into 2 lines. |
| **09** | **247** | `synthetic-audiences-and-attribution` | [`mmm-attribution-pyramid.svg`](file:///C:/Users/Janmejai/compendium/content/figures/mmm-attribution-pyramid.svg) | Right tier labels (+5px, +28px, +32px) | Move right-column anchor labels inward ($x=530$) and reduce font size. |
| **10** | **278** | `marketing-casebook` | [`marketing-casebook-taxonomy.svg`](file:///C:/Users/Janmejai/compendium/content/figures/marketing-casebook-taxonomy.svg) | Right taxonomy case cards (+31px, +27px, +10px, +10px) | Wrap long case metric lines (e.g. "1.2B impressions...", "₹60Cr budget...") into two lines. |
| **11** | **317** | `ai-product-lifecycle` | [`ai-product-lifecycle.svg`](file:///C:/Users/Janmejai/compendium/content/figures/ai-product-lifecycle.svg) | Rollback trigger & canary summary (+23px, +14px, +4px, +71px) | Split 60-char canary telemetry sentences into two distinct lines. |
| **12** | **334** | `product-architecture-economics` | [`product-architecture-economics.svg`](file:///C:/Users/Janmejai/compendium/content/figures/product-architecture-economics.svg) | Routing metric cards & rule footer (+5px, +5px, +4px, +23px) | Tighten spend/latency summary strings and wrap bottom rule. |
| **13** | **349** | `agentic-ux-and-interfaces` | [`agentic-ux-and-interfaces.svg`](file:///C:/Users/Janmejai/compendium/content/figures/agentic-ux-and-interfaces.svg) | Ambient HUD descriptions & warning footers (+17px, +25px, +40px, +42px, +47px) | Shorten 62-char strings to $\le 42$ chars across the control gates. |
| **14** | **362** | `product-casebook` | [`product-casebook.svg`](file:///C:/Users/Janmejai/compendium/content/figures/product-casebook.svg) | Case 1 card header (+11px) | Shorten to "Card-Moran-Newell 1.0s · Speculative 160 TPS". |
| **15** | **387** | `algorithmic-underwriting-and-credit-risk` | [`credit-underwriting-stack.svg`](file:///C:/Users/Janmejai/compendium/content/figures/credit-underwriting-stack.svg) | Unstructured doc extraction bullets (+10px, +37px, +71px, +25px, +7px) | Wrap bulleted list items (e.g. circular invoicing, graph checks) into two lines. |
| **16** | **406** | `financial-copilots-and-deal-diligence` | [`financial-copilot-architecture.svg`](file:///C:/Users/Janmejai/compendium/content/figures/financial-copilot-architecture.svg) | Provenance bounding box tag (+1px) | Nudge $x$-coordinate from 515 to 495. |
| **17** | **423** | `financial-crime-fraud-and-rbi-free-ai` | [`aml-fraud-detection-funnel.svg`](file:///C:/Users/Janmejai/compendium/content/figures/aml-fraud-detection-funnel.svg) | Regulatory FREE-AI checklist bullets (+2px, +10px, +37px, +64px, +40px, +11px) | Shorten bullet points and reformat into two lines per bullet. |
| **18** | **443** | `finance-casebook` | [`finance-casebook-taxonomy.svg`](file:///C:/Users/Janmejai/compendium/content/figures/finance-casebook-taxonomy.svg) | Case cards 1–4 problem descriptions (+55px, +47px, +43px, +19px) | Wrap long case descriptors into concise two-line subtitles. |

---

## Status & Verification

- **Commit `81939f8`:** Completed Items 1 through 7 (`models-that-act`, `judging-output`, `who-pays`, `pilots-stall`, `consulting-firm`, `ai-casebook`, `interview-room`).
- **Current Session:**
  - Added `overflow: hidden;` to `.fig-art svg, .fig-art img` in `design/components.css`.
  - Completed surgical fixes for Items 8 through 18 (`creative-scale-pipeline`, `mmm-attribution-pyramid`, `marketing-casebook-taxonomy`, `ai-product-lifecycle`, `product-architecture-economics`, `agentic-ux-and-interfaces`, `product-casebook`, `credit-underwriting-stack`, `financial-copilot-architecture`, `aml-fraud-detection-funnel`, `finance-casebook-taxonomy`).
  - Audited using Playwright (`node test/inspect_figures.mjs`):
    ```
    Audited 26 figures across all pages.
    Figures with text overflowing SVG boundary: 0
    ```
  - **Result:** 0 overflows remaining across all 26 figures in the compendium.
