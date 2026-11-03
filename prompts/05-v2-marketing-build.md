# v2 Build: Marketing & Brand Strategy Track (End-to-End Teamwork Execution)

> **How to use:** Run the `/teamwork` command in Antigravity or Claude Code with the prompt below, or launch directly in the terminal:
> ```powershell
> agy --model gemini-4-argon -p "Follow prompts/05-v2-marketing-build.md to build and integrate the v2 Marketing Track end to end."
> ```

---

## Mission Brief

You are building **v2 of INFERENCE**, expanding the compendium to include the complete **Marketing & Brand Strategy Track (`MKT`)**. 
v1 established the Foundations (Chapters 00–07) and Consulting (Chapters 08–13, Inserts A–B). Your objective is to design, research, author, verify, and compile **Part IV: Marketing & Brand Strategy** into the publication pipeline with zero errors, producing an updated web edition and a print-ready PDF.

---

## 1. Governance & Constraints (Zero Violations)

1. **Pedagogical Standard:** Every chapter must strictly follow [`docs/PEDAGOGY.md`](../docs/PEDAGOGY.md) and [`docs/AUTHORING.md`](../docs/AUTHORING.md).
   - Mandatory 13-part chapter arc: Opener (`hook`, `objectives`), Lede with highlighted thesis (`==...==`), First principles (`::: principle`), Concepts (`::: concept`), Scale/complication with SVG figure, Cited evidence, Worked case (`::: case Illustrative · ...`), Domain lenses (`::: lens ...`), Interview room question + strong structure (`::: interview ...`), Try it prompt (`::: try ...`), Watch/Read cards (`{{watch ...}}` / `{{read ...}}`), Check yourself with upside-down answers (`::: check ...` + `::: answers`), Night-before page (`::: recap The night-before page`).
2. **Evidence & Truth:** Follow [`docs/SOURCES.md`](../docs/SOURCES.md).
   - Every single statistic, case study, or vendor claim must exist in [`content/sources.yml`](../content/sources.yml) with an assigned Tier (`A` or `B`) and be cited inline (`[@id]`) or as a media card.
   - Any scenario without a primary source citation must be explicitly labeled `Illustrative`.
   - Never cite AI-generated SEO slop or unverified corporate press releases as Tier A.
3. **Prose & Anti-AI Standard:** Apply [`anti-ai-writing`](C:/Users/Janmejai/.claude/skills/anti-ai-writing/SKILL.md).
   - Zero empty rhetorical flourishes ("delve", "testament", "tapestry", "fast-paced world").
   - Concrete Indian and global business context (HUL, ITC, Nykaa, Flipkart, Swiggy, Meta, Google, Unilever, Coca-Cola).
   - High perplexity, sharp active verbs, short punchy topic sentences.
4. **Rendering & Math Discipline:**
   - All equations (ROAS, CAC, pLTV, Bayes MMM formulas) must use standard LaTeX math (`$$...$$` for display, `$p$` for inline) to render via KaTeX.
   - All comparison grids must use standard GitHub Flavored Markdown tables (`| ... |`). Never use fenced code blocks for tables.
5. **No Code in Chapters:** Non-technical MBA placement candidate audience. "Try it" prompts must use zero code (web interfaces, Custom GPTs, Gemini Gems, Claude Projects).

---

## 2. Table of Contents: Part IV (Marketing & Brand Strategy)

Append the following Part to [`content/toc.yml`](../content/toc.yml):

```yaml
  - id: p4
    n: IV
    title: Marketing & Brand Strategy
    track: marketing
    deck: Generative creative at scale, synthetic consumer panels, modern attribution, and the brand safety frontier.
    chapters:
      - id: creative-at-scale
        title: Creative at scale: production, localization, and agency economics
        deck: Virtual studios, localized video across 22 Indic languages, the collapse of digital asset marginal cost, and the agency retainer model.
        tracks: [marketing]
        prereq: [next-word-machine, kinds-of-ai]
        status: draft
      - id: synthetic-audiences-and-attribution
        title: Synthetic panels, MMM, and modern marketing measurement
        deck: LLMs as focus groups, algorithmic homophily traps, Bayesian Media Mix Modeling (Meridian & Robyn), and predictive customer lifetime value.
        tracks: [marketing]
        prereq: [judging-output, creative-at-scale]
        status: draft
      - id: brand-safety-boundary
        title: The brand safety boundary: hallucinations, IP, and consumer trust
        deck: Trademark liabilities, toxic synthetic outputs, deepfake brand hijacking, ASCI regulatory guidelines, and consumer backlash.
        tracks: [marketing]
        prereq: [confidently-wrong, judging-output]
        status: draft
      - id: marketing-casebook
        title: The Marketing AI casebook & interview room
        deck: Eight end-to-end marketing cases and estimation problems across FMCG, D2C, E-commerce, and Quick-Commerce, each with a model answer.
        tracks: [marketing]
        prereq: [creative-at-scale, synthetic-audiences-and-attribution, brand-safety-boundary]
        status: draft
```

---

## 3. Teamwork Subagent Orchestration Plan

The execution decomposes into four autonomous, synchronized agent roles:

```
[Agent 1: Canon & Source Researcher]
       │ (appends sources.yml & glossary.yml)
       ▼
[Agent 2: Chapter Author & Drafter]
       │ (drafts content/chapters/*.md & updates toc.yml)
       ▼
[Agent 3: Editorial Auditor & Anti-Slop Filter]
       │ (verifies citations, KaTeX math, tables, prose)
       ▼
[Agent 4: Build Engineer & PDF Verifier]
       │ (runs check, builds web & 250+ page PDF, updates editions/)
       ▼
[Final Git Commit & Push]
```

### Agent 1: Canon & Primary Source Researcher
- **Tasks:**
  1. Ingest primary sources across modern AI marketing:
     - Unilever's 500+ AI applications & virtual digital twins (Priya Nair / GTC 2025 / Accenture).
     - Meta Robyn and Google Meridian Bayesian Media Mix Modeling (MMM) technical papers.
     - Synthetic consumer research validity studies (Stanford / Columbia / Harvard Business School on LLM personas).
     - Advertising Standards Council of India (ASCI) guidelines on GenAI advertising, synthetic influencers, and disclosure mandates.
     - Sarvam AI Bulbul V4 & Indic localization benchmarks across Tier 2/3 consumer vernaculars.
  2. Append all new entries cleanly to [`content/sources.yml`](../content/sources.yml) with exact URLs, authors, publication years, media types (`article`, `paper`, `video`), tiers (`A` or `B`), and a clear `why:` note.
  3. Append key marketing terms to [`content/glossary.yml`](../content/glossary.yml):
     - `media-mix-modeling`, `synthetic-personas`, `predictive-ltv`, `creative-fatigue`, `algorithmic-bias-ads`, `asci-guidelines`, `brand-safety-guardrails`.

### Agent 2: Chapter Author & Drafter
- **Tasks:**
  Draft the four Part IV chapters in [`content/chapters/`](../content/chapters/):
  1. `creative-at-scale.md`:
     - **Hook:** Why FMCG giants can produce 10,000 localized video variants for the cost of one Mumbai studio shoot—and why 90% of them get zero engagement.
     - **First Principles:** The collapse of digital asset marginal cost ($C_{\text{asset}} \to 0$) and the resulting shift from creative production scarcity to creative selection judgment.
     - **Concepts:** Virtual studios, dynamic creative optimization (DCO), prompt-to-video latency.
     - **Figure:** `content/figures/creative-scale-pipeline.svg` (Prompt & Seed Asset $\to$ Diffusion/LoRA $\to$ Indic Voice $\to$ Brand Safety Gate $\to$ Ad Network).
     - **Case:** HUL / D2C personal care brand revamping its regional Diwali ad campaign across 6 Indian states using generative localization.
     - **Interview:** *"A leading apparel brand wants to fire its creative agency and generate all ad creatives using Midjourney and Runway. Walk me through your advice to the CMO."*
  2. `synthetic-audiences-and-attribution.md`:
     - **Hook:** Can a language model tell you if a ₹49 shampoo sachet will sell in rural Bihar before you ship a single unit?
     - **First Principles:** Synthetic consumer panels: when LLM personas reflect statistical demographic priors and where algorithmic homophily creates catastrophic false confidence.
     - **Concepts:** Bayesian MMM vs cookie-based multi-touch attribution (MTA), synthetic focus group testing, predictive churn modeling.
     - **Figure:** `content/figures/mmm-attribution-pyramid.svg`.
     - **Case:** Quick-commerce platform (Blinkit / Zepto style) evaluating dynamic discount elasticity using predictive customer lifetime value.
     - **Interview:** *"The marketing team says synthetic AI focus groups approved our new luxury car positioning. As the Brand Director, do you greenlight the launch? What do you probe?"*
  3. `brand-safety-boundary.md`:
     - **Hook:** One unauthorized hallucinated discount code or insensitive cultural prompt can erase ₹100 crore in brand equity in twenty minutes.
     - **First Principles:** The asymmetry of brand trust: years to accumulate, milliseconds to destroy through stochastic generation.
     - **Concepts:** Prompt jailbreaking in public chatbots, copyright liability on training data (Getty vs Stability AI), synthetic influencer ethics, ASCI regulatory compliance.
     - **Case:** National bank's conversational AI recommending competitors or offering hallucinated credit card waivers.
     - **Interview:** *"Design a brand-safety architecture for an enterprise chatbot deployed across WhatsApp to 5 million retail banking customers."*
  4. `marketing-casebook.md`:
     - Author 8 complete, original cases and guesstimates:
       - *Case 1:* FMCG Tier 2/3 Indic voice-first conversational commerce strategy.
       - *Case 2:* D2C cosmetic brand: Agency Retainer vs In-House AI Creative Engine.
       - *Case 3:* E-Commerce marketplace dynamic coupon personalization unit economics.
       - *Case 4:* Telecom churn reduction: Predictive ML vs Generative retention outreach.
       - *Guesstimate 1:* Sizing the annual compute and API cost to personalize ad creatives for 20 million Indian e-commerce shoppers.
       - *Guesstimate 2:* Media mix budget allocation for an omnichannel retail brand adopting Bayesian MMM.
       - *Guesstimate 3:* Cost and throughput of running 1,000 synthetic consumer focus groups vs traditional physical FGDs in metro India.
       - *Guesstimate 4:* Economic impact of creative fatigue on digital ad ROAS.

### Agent 3: Editorial Auditor & Anti-Slop Filter
- **Tasks:**
  1. Review every drafted chapter against `anti-ai-writing` standards. Strip any passive voice, generic filler, or repetitive metaphors.
  2. Verify all math formulas render cleanly with KaTeX (`$$...$$` and `$math$`). Ensure no raw ASCII code-box tables exist.
  3. Check that every chapter contains at least 4–8 highlighted sentences (`==...==`), 1–3 media cards, 1 pull quote or stat block, 4–6 check questions with answers, and an authentic 5-line night-before recap.
  4. Run `npm run check` and ensure **0 errors**.

### Agent 4: Build Engineer & PDF Verifier
- **Tasks:**
  1. Update [`book.yml`](../book.yml) edition to `2027 · Draft 0.2 (Marketing Track)`.
  2. Run `npm run build` and verify that all chapters compile to `dist/ch/*.html`.
  3. Run `npm run pdf` to generate the complete updated PDF.
  4. Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v2-marketing-draft.pdf`.
  5. Update [`STATUS.md`](../STATUS.md) with word counts, new chapters, and source verification notes.
  6. Git commit: `feat(marketing): complete v2 marketing track and integrate into compendium`.

---

## 4. Verification & Stop Conditions

The teamwork run is only complete when:
- `npm run check` reports **0 errors**.
- `npm run build` compiles all chapters in `< 500 ms`.
- `npm run pdf` successfully outputs the unified PDF without timeouts.
- All new chapters appear in `dist/index.html` navigation and cover tabs.
- Clean git status with changes committed and pushed.
