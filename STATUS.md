# Status

_Last updated 2026-11-03, clean magazine-grade front cover & web design restored per DESIGN.md._

## Where we are
- **Edition: v1 Draft complete.** All 16 planned units (00 through 13 plus Inserts A and B) are fully drafted, verified with cross-model plan checks (Claude Sonnet 4.6 via `agy`), and linted with zero errors (`check: 0 errors`).
- **Front Cover & First Page:** Restored to the clean, authentic, magazine-grade design language specified in `docs/DESIGN.md`:
  - **Wordmark & Identity:** Giant title `INFERENCE.` with cobalt `#8593FF` full stop.
  - **Byline & Authors:** Prominently attributes Janmejai Singh Minhas ([LinkedIn](https://linkedin.com/in/janmejai) · [GitHub](https://github.com/janmejai2002)) & Chaitanya Sharma ([LinkedIn](https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/) · [GitHub](https://github.com/chaitanya-sharma)) with links in byline and colophon.
  - **Attention Matrix:** Clean mathematical causal self-attention matrix over *"Will AI replace the analyst or make the analyst ?"* with opacity-shaded cells on the lower triangle and subtle mask dots on the upper triangle (no intrusive System 2 overlays or text clutter).
  - **Purpose Statement:** One clear sentence explaining why the compendium exists: *"Every B-school recruiter now asks about AI. Most compendiums still don't teach it. This one starts from first principles and ends in the interview room."*
  - **Live Edition QR:** High-resolution SVG QR code linking to the live GitHub Pages edition (`https://janmejai2002.github.io/inference-compendium/`).
- **Authors & Co-creators:** Janmejai Singh Minhas & Chaitanya Sharma.
- **Title & Edition:** `INFERENCE` · `2027 · Draft 0.1`.
- **Book metrics:** 252 pages, 55,200 total words, 40 media cards, 54 glossary terms.
- **Pipeline & Deployment:** Working cleanly. Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable table of contents. Automated GitHub Pages workflow (`.github/workflows/deploy.yml`) continuously deploys to `https://janmejai2002.github.io/inference-compendium/` on every push to `main`.
- **Live Edition QR:** Interactive and printable SVG QR code added to the front cover and back cover pointing to the live online edition.
- **Milestone snapshot:** `editions/INFERENCE-v1-draft.pdf` (7.17 MB, 252 pages) generated and committed.
- **Proofing:** Full B&W proof rendered to `dist/pages-bw/` via `npm run proof:bw`.
- **Sources:** 131 sources registered in `content/sources.yml`, 118 verified (13 unverified).

## Chapter inventory (16/16 draft)
| # | ID | Title | Status | Words | Media |
|---|---|---|---|---|---|
| 00 | `ai-in-one-sitting` | AI in one sitting | draft | 4,282 | 3 |
| 01 | `kinds-of-ai` | Not all AI is ChatGPT | draft | 3,285 | 2 |
| 02 | `next-word-machine` | A model predicts the next word | draft | 3,503 | 3 |
| 03 | `confidently-wrong` | Why models are confidently wrong | draft | 3,370 | 3 |
| 04 | `delegation-brief` | A prompt is a delegation brief | draft | 3,234 | 3 |
| 05 | `your-documents` | Giving the model your documents | draft | 3,475 | 3 |
| 06 | `models-that-act` | Agents: models that act, and how they break | draft | 3,428 | 3 |
| 07 | `judging-output` | Judging AI output is the job now | draft | 3,519 | 3 |
| 08 | `who-pays` | Who pays for AI, and how much? | draft | 3,583 | 3 |
| 09 | `pilots-stall` | Why enterprise AI pilots stall | draft | 4,069 | 3 |
| 10 | `work-changes` | How AI changes knowledge work | draft | 3,762 | 3 |
| 11 | `consulting-firm` | What AI does to a consulting firm | draft | 3,944 | 3 |
| 12 | `ai-casebook` | The INFERENCE AI casebook | draft | 7,701 | 3 |
| 13 | `interview-room` | The interview room | draft | 4,598 | 3 |
| A | `state-of-play` | State of play, November 2026 | draft | 1,562 | 1 |
| B | `india-briefing` | India briefing | draft | 1,819 | 2 |

## Collaboration & access
- Co-editor `chaitanya-sharma` invited 2026-11-01 with write access to the GitHub repository.

## Open issues and editorial checklist
The 13 unverified sources to be opened and verified before final publication:
1. `3b1b-neural-network`: Grant Sanderson 3B1B YouTube video (check timestamps/marks).
2. `wolfram-chatgpt`: Stephen Wolfram essay on ChatGPT.
3. `hbs-jagged-frontier`: HBS Working Paper 24-013 (working paper version; journal version `dellacqua-jagged-orgsci` is verified).
4. `mollick-centaurs`: Ethan Mollick Centaurs essay.
5. `stanford-ai-index`: Stanford AI Index 2025 general report (2026 takeaways `stanford-ai-index-2026-takeaways` is verified).
6. `hbr-simple-economics-machine-intelligence`: Agrawal, Gans, Goldfarb (HBR 2016).
7. `anthropic-project-vend`: Anthropic Project Vend research report.
8. `willison-lethal-trifecta`: Simon Willison blog post on the lethal trifecta.
9. `ibm-agent-skills`: IBM Technology video on agent skills.
10. `hbr-ideacast-sternfels`: HBR IdeaCast episode 1060 (listen to full audio to confirm Sternfels quotes directly).
11. `epoch-inference-price-trends`: Epoch AI analysis on inference price trends.
12. `boyle-big-tech-debt`: Patrick Boyle video on Big Tech debt.
13. `sarvam-bulbul-v4-flash`: Sarvam AI Bulbul V4 Flash announcement blog post.
