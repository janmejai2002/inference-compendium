# Status

_Last updated 2026-11-03, v1 build completed: all 14 units + 2 inserts drafted and verified._

## Where we are
- **Edition: v1 Draft complete.** All 16 planned units (00 through 13 plus Inserts A and B) are fully drafted, verified with cross-model plan checks (Claude Sonnet 4.6 via `agy`), and linted with zero errors (`check: 0 errors`).
- **Book metrics:** 250 pages, 55,200 total words, 40 media cards, 54 glossary terms.
- **Pipeline:** Working cleanly. Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable table of contents.
- **Milestone snapshot:** `editions/INFERENCE-v1-draft.pdf` (7.79 MB, 250 pages) generated and committed.
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
