# Handoff Report: Survey Agent 3 (Product Management Canon, Sources & Casebook Architecture)

**Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_survey_3\`  
**Target File**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_survey_3\pm_domain_report.md`  
**Handoff Type**: Hard (Task Complete)

---

## 1. Observation

1. **Schema & Policy Enforcements**:
   - In `content/sources.yml` (lines 10–36, 1550–1613), entries require `type`, `title`, `creator`, `publisher`, `year`, `url`, `tier`, `why`, and `verified: false`.
   - In `scripts/check.mjs` (lines 26–40), sources are validated against domain allowlist in `content/source-policy.yml`. Line 38 enforces:
     `if (RANK[s.tier] < RANK[dt]) errors.push(\`source ${id}: declared tier ${s.tier}, but ${hostOf(s.url)} is tier ${dt}\`);`
   - In `scripts/check.mjs` (line 51), rendered HTML is scanned for escaped tag leaks:
     `if (/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/.test(textWithoutCode)) { errors.push(\`${c.id}: contains escaped HTML tag leak (&lt;span...&gt;) in rendered prose\`); }`
     This strictly forbids putting raw KaTeX math ($math$) into block headers like `::: case Title ($N^*$)`.
   - Running `npm run check` synchronously exited with code 0 (`0 errors, 44 warnings`).
2. **Glossary Architecture**:
   - `content/glossary.yml` (lines 1–207) requires `term` and `def`. First use in each chapter (`[[term-id]]`) automatically populates the margin rail.
3. **Pedagogy & Chapter Completeness**:
   - `docs/PEDAGOGY.md` (lines 21–36) and `docs/AUTHORING.md` (lines 20–55) mandate that chapters contain: frontmatter (`id`, `title`, `deck`, `hook`, `objectives`), 4–8 skim highlights (`==...==`), media cards (`{{read id}}`, `{{paper id}}`), concept cards, principle derivations, stat blocks, case studies, interview room, try-it-yourself, check yourself (`::: check` with Bloom tags `<span class="lvl">...</span>`), upside-down answers (`::: answers`), and a 5-line night-before recap (`::: recap`).
4. **Existing Casebook Precedent**:
   - `content/chapters/marketing-casebook.md` (705 lines) demonstrates the standard: 4 strategic cases followed by 4 quantitative guesstimates/estimation problems with complete mathematical derivations ($$...$$), tables, unit economics, and operational recommendations.

---

## 2. Logic Chain

1. **Schema Compliance**:
   - *Premise*: `scripts/check.mjs` validates every declared tier against `content/source-policy.yml`.
   - *Inference*: To avoid build errors or warnings, all 8 PM primary sources (OpenAI Evals, Anthropic Context Caching & Prompt Engineering, Google Gemini Long-Context, Marty Cagan SVPG, Zheng et al., Card-Moran-Newell) must use allowed domains (`openai.com`, `anthropic.com`, `blog.google`, `arxiv.org`, `svpg.com`, etc.) or have clear creator credentials for platform domains.
2. **Pedagogical Integrity**:
   - *Premise*: MBA students preparing for senior PM and consulting rounds need actionable mathematical reasoning, not hand-waving buzzwords.
   - *Inference*: Chapter outlines and casebook problems must walk from first principles to unit economics (TTFT, TPS, KV cache hit rate, Cohen's kappa $\kappa$, sample size $n$, TCO crossover volume $V^*$).
3. **Escaped HTML Tag Prevention**:
   - *Premise*: `renderInline` in container headers escapes HTML entities if KaTeX spans are generated.
   - *Inference*: All block container titles must be plain text (e.g., `::: case Enterprise RAG vs Long-Context Caching`) and keep mathematical symbols inside the block body.
4. **Casebook Completeness**:
   - *Premise*: The user request specifies 8 fully-worked quantitative PM cases and estimation problems.
   - *Inference*: Structuring the casebook as 4 Strategic PM Cases (LegalTech RAG vs Caching, FinTech Model Cascade, HealthTech Eval Harness/Drift, CRM Agentic HUD) + 4 Quantitative PM Guesstimates (Autonomous Coding Agent Latency Budget, E-Commerce Prompt Caching Break-Even, Hospital Medical Coding TCO Build vs Buy, CI/CD Statistical Eval Sizing) provides 100% coverage of core PM archetypes.

---

## 3. Caveats

1. **Downstream Source Verification**: All new sources in `pm_domain_report.md` are marked `verified: false`. When downstream agents append them to `content/sources.yml`, they will emit verification warnings during `npm run check` until URLs and citations are independently opened and verified as true. This is standard per `docs/SOURCES.md`.
2. **Read-Only Investigation Scope**: Per agent instructions, no files outside `.agents/teamwork/explorer_survey_3/` were edited. Implementation of `content/sources.yml`, `content/glossary.yml`, `content/toc.yml`, `book.yml`, and `content/chapters/*.md` is reserved for subsequent planning and authoring phases.

---

## 4. Conclusion

The Product Management track survey is complete, fully specified, and documented in:
`C:\Users\Janmejai\compendium\.agents\teamwork\explorer_survey_3\pm_domain_report.md`.

The report provides:
1. Exact YAML blocks for 8 primary sources in `content/sources.yml`.
2. Exact YAML blocks for 6 glossary terms (`eval-harness`, `synthetic-evals`, `latency-budget`, `context-caching`, `model-routing`, `agentic-ux`) in `content/glossary.yml`.
3. Comprehensive pedagogical outlines for the 4 chapters (`ai-product-lifecycle.md`, `product-architecture-economics.md`, `agentic-ux-and-interfaces.md`, `product-casebook.md`).
4. Full mathematical models, formulas, parameters, and tipping points for all 8 quantitative problems in `product-casebook.md`.
5. Exact TOC and `book.yml` configuration updates.

---

## 5. Verification Method

To independently verify the survey findings and artifacts:
1. **Inspect Report Content**:
   - View `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_survey_3\pm_domain_report.md` to confirm complete primary source YAML, glossary definitions, chapter outlines, and all 8 worked mathematical problems.
2. **Verify Tool & Build Hygiene**:
   - Run `npm run check` in terminal to confirm baseline consistency (0 errors).
3. **Verify Compliance with Pedagogical Standards**:
   - Cross-reference the chapter structure in `pm_domain_report.md` against `docs/PEDAGOGY.md` and `docs/AUTHORING.md`.
