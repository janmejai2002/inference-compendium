# Status

_Last updated 2026-11-04, Product Management Track (Part V) complete and integrated per DESIGN.md and original request._

## Where we are
- **Edition: v3 Product Management Track Draft complete.** All 24 planned units (Chapters 00 through 21 plus Inserts A and B) are fully drafted, verified with cross-model plan checks, and linted with zero errors (`check: 0 errors`).
- **Front Cover & First Page:** Restored to the clean, authentic, magazine-grade design language specified in `docs/DESIGN.md`:
  - **Wordmark & Identity:** Giant title `INFERENCE.` with cobalt `#8593FF` full stop.
  - **Byline & Authors:** Prominently attributes Janmejai Singh Minhas ([LinkedIn](https://linkedin.com/in/janmejai) · [GitHub](https://github.com/janmejai2002)) & Chaitanya Sharma ([LinkedIn](https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/) · [GitHub](https://github.com/chaitanya-sharma)) with links in byline and colophon.
  - **Attention Matrix:** Clean mathematical causal self-attention matrix over *"Will AI replace the analyst or make the analyst ?"* with opacity-shaded cells on the lower triangle and subtle mask dots on the upper triangle (no intrusive System 2 overlays or text clutter).
  - **Purpose Statement:** One clear sentence explaining why the compendium exists: *"Every B-school recruiter now asks about AI. Most compendiums still don't teach it. This one starts from first principles and ends in the interview room."*
  - **Live Edition QR:** High-resolution SVG QR code linking to the live GitHub Pages edition (`https://janmejai2002.github.io/inference-compendium/`).
- **Authors & Co-creators:** Janmejai Singh Minhas & Chaitanya Sharma.
- **Title & Edition:** `INFERENCE` · `2027 · Draft 0.3 (Product Track)`.
- **Book metrics:** 408 pages, 88,145 total words, 65 media cards, 67 glossary terms.
- **Pipeline & Deployment:** Working cleanly. Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable table of contents. Automated GitHub Pages workflow (`.github/workflows/deploy.yml`) continuously deploys to `https://janmejai2002.github.io/inference-compendium/` on every push to `main`.
- **Live Edition QR:** Interactive and printable SVG QR code added to the front cover and back cover pointing to the live online edition.
- **Milestone snapshots:**
  - `editions/INFERENCE-v3-product-draft.pdf` (10.38 MB, 408 pages) generated and committed.
  - `editions/INFERENCE-v2-marketing-draft.pdf` (8.99 MB, 338 pages) preserved.
  - `editions/INFERENCE-v1-draft.pdf` (7.17 MB, 252 pages) preserved.
- **Proofing:** Full B&W proof rendered to `dist/pages-bw/` via `npm run proof:bw`.
- **Sources:** 146 sources registered in `content/sources.yml`, 118 verified (28 unverified).

## Chapter inventory (24/24 draft)
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
| 08 | `who-pays` | Who pays for AI, and how much? | draft | 3,577 | 3 |
| 09 | `pilots-stall` | Why enterprise AI pilots stall | draft | 4,069 | 3 |
| 10 | `work-changes` | How AI changes knowledge work | draft | 3,762 | 3 |
| 11 | `consulting-firm` | What AI does to a consulting firm | draft | 3,944 | 3 |
| 12 | `ai-casebook` | The INFERENCE AI casebook | draft | 7,701 | 3 |
| 13 | `interview-room` | The interview room | draft | 4,598 | 3 |
| 14 | `creative-at-scale` | Creative at scale: production, localization, and agency economics | draft | 3,678 | 3 |
| 15 | `synthetic-audiences-and-attribution` | Synthetic panels, MMM, and modern marketing measurement | draft | 3,847 | 2 |
| 16 | `brand-safety-boundary` | The brand safety boundary: hallucinations, IP, and consumer trust | draft | 4,266 | 2 |
| 17 | `marketing-casebook` | The Marketing AI casebook & interview room | draft | 4,605 | 2 |
| 18 | `ai-product-lifecycle` | AI product lifecycle: evals, drift, and golden datasets | draft | 2,717 | 3 |
| 19 | `product-architecture-economics` | Product architecture & economics: latency budgets, caching, and model routing | draft | 3,028 | 3 |
| 20 | `agentic-ux-and-interfaces` | Agentic UX: ambient HUDs, canvas workspaces, and human-in-the-loop | draft | 3,312 | 3 |
| 21 | `product-casebook` | The Product AI casebook & interview room | draft | 3,564 | 3 |
| A | `state-of-play` | State of play, November 2026 | draft | 1,562 | 1 |
| B | `india-briefing` | India briefing | draft | 1,819 | 2 |

## Collaboration & access
- Co-editor `chaitanya-sharma` invited 2026-11-01 with write access to the GitHub repository.

## Open issues and editorial checklist
The 28 unverified sources to be opened and verified before final publication:
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
14. `google-meridian`: Google Marketing Science Meridian Bayesian MMM open-source documentation.
15. `meta-robyn`: Meta Open Source Robyn Marketing Mix Modeling documentation.
16. `unilever-digital-twins`: Unilever virtual digital twins & AI application deployment press release.
17. `argyle-out-of-one-many`: Argyle et al. (Political Analysis, 2023) "Out of One, Many: Using Language Models to Simulate Human Samples".
18. `horton-homo-silicus`: John J. Horton (NBER, 2023) "Large Language Models as Simulated Economic Agents: What Can We Learn from Homo Silicus?".
19. `brand-llm-market-research`: Brand et al. (Harvard Business School / Working Paper, 2023) "Using LLMs for Market Research".
20. `asci-genai-guidelines`: Advertising Standards Council of India (ASCI) GenAI advertising and influencer guidelines.
21. `openai-evals-framework`: OpenAI Evals evaluation framework documentation and repository.
22. `anthropic-context-caching`: Anthropic Context Caching developer guide and pricing models.
23. `anthropic-prompt-engineering-interactive`: Anthropic interactive prompt engineering tutorials and system prompt benchmarks.
24. `google-gemini-long-context`: Google DeepMind Gemini 1.5/2.0/4 long-context architecture paper and needle-in-a-haystack analysis.
25. `cagan-transformed-ai`: Marty Cagan / Silicon Valley Product Group "Transformed: Moving to the Product Operating Model with AI".
26. `cagan-svpg-ai-risk`: Marty Cagan / SVPG essays on the four core product risks (value, usability, feasibility, viability) applied to GenAI.
27. `zheng-judging-llm-as-judge`: Zheng et al. (NeurIPS, 2023) "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena".
28. `card-moran-newell-psychology-hci`: Card, Moran, & Newell (1983) "The Psychology of Human-Computer Interaction" (keystroke-level model and latency perception thresholds).
