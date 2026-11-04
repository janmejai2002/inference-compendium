# Dispatch for worker_ch2

- **Role**: Chapter 2 Author (Financial Copilots & Deal Diligence)
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch2\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Reference Material**:
  - `prompts/06-v4-finance-build.md` § Chapter 2
  - `docs/PEDAGOGY.md` & `docs/AUTHORING.md`
  - `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`
  - `test/e2e-fin.mjs` (Tier 1 & Tier 2 tests for chapter 23)
  - Exemplar chapter: `content/chapters/your-documents.md` or `foundation-models-and-frontier-architectures.md`
- **Exclusive Write Ownership**:
  - `content/chapters/financial-copilots-and-deal-diligence.md`
- **Detailed Specifications**:
  1. **Frontmatter**:
     - `id: financial-copilots-and-deal-diligence`
     - `title: "Financial Copilots & Deal Diligence"`
     - `part: p6`
     - `track: finance`
     - `status: published`
     - `order: 23`
     - `prereqs: [delegation-brief, judging-output]`
     - `objectives`: 3 Bloom-taxonomy bullets (e.g. Architect a zero-tolerance financial document ingestion pipeline; Reconcile automated financial spreading against audited filings; Implement cell-level audit lineage and deterministic execution sandboxes).
     - `keywords`: financial spreading, virtual data room, cell-level audit lineage, deterministic sandbox, covenant monitoring, Morgan Stanley, J.P. Morgan DocLLM
     - `audio: false`
  2. **Content & Core Themes**:
     - The Zero-Tolerance Invariant: Why consumer LLM hallucination rates (3-5%) represent catastrophic failure in investment banking and credit committee memos.
     - VDR Ingestion & Layout Awareness: Multi-modal document understanding (DocLLM, spatially grounded chunking for multi-column tables, scanned 10-K footnotes, debt indentures).
     - Automated Financial Spreading: Mapping varied chart of accounts into standardized financial models (EBITDA reconciliations, working capital adjustments, debt schedules).
     - Deterministic Execution Sandbox: LLMs write formulaic code (Python/Excel formulas) rather than performing token-level mental arithmetic; code executes in an isolated sandbox.
     - Cell-Level Audit Lineage: Bounding-box coordinate provenance linking every cell in an Excel model directly back to the exact source filing page.
     - Figure embedding: `{{figure financial-copilot-architecture | Financial Copilot Architecture for Deal Diligence | J.P. Morgan AI Research & Morgan Stanley Case Studies}}`
     - Primary source citations: `[@jpmorgan-docllm-2024]`, `[@jpmorgan-llm-finance-2023]`, `[@morgan-stanley-openai-2023]`. Media card: `{{paper jpmorgan-docllm-2024}}`.
     - Glossary terms linked: `[[financial-spreading]]`, `[[virtual-data-room|VDR]]`, `[[cell-level-audit-lineage]]`, `[[deterministic-sandbox]]`, `[[covenant-monitoring]]`.
  3. **Strict Pedagogical Invariants**:
     - 13-part arc: Opener, Lede, `::: principle`, `::: concept`, Figure, `::: stat`, `::: case`, `::: lens`, `::: interview`, `::: try`, media card, `::: check` + `::: answers`, `::: recap`.
     - Exactly 4–8 highlighted sentences with `==...==`.
     - Stat block: Exactly 1. Header MUST be plain text (e.g. `::: stat 100,000 research reports` or `::: stat 99.4% precision`), with `<span class="src">...</span>`. NO LaTeX math in header line.
     - Try it: Zero code for MBA candidate audience (prompt for Custom GPT / Claude Project / Excel formula to spread an income statement).
     - Recap spread: Exactly 5 numbered lines in `::: recap The night-before page`.
     - Check yourself: 4–6 numbered questions, and corresponding answers.
     - Tables: GFM markdown tables, no code blocks for tables.
  4. **Verification**:
     - Run `node test/e2e-fin.mjs --tier=2` and `npm run check`.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-04T16:08:01Z
[Message] timestamp=2026-11-04T16:08:01Z sender=a5372a48-229a-4fc5-8650-1b7734794c36 priority=MESSAGE_PRIORITY_HIGH content=You are worker_ch2, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch2\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch2\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundary:
- content/chapters/financial-copilots-and-deal-diligence.md

Your task:
Author the complete, rigorous, publication-grade chapter content/chapters/financial-copilots-and-deal-diligence.md strictly following the specifications in DISPATCH.md, docs/PEDAGOGY.md, and docs/AUTHORING.md:
- Complete frontmatter with objectives, keywords, audio: false, order: 23.
- Full 13-part arc: Opener, Lede, ::: principle, ::: concept, {{figure financial-copilot-architecture ...}}, ::: stat, ::: case, ::: lens, ::: interview, ::: try (no-code), media card, ::: check + ::: answers, ::: recap (5 numbered lines).
- Highlight bounds: 4 to 8 highlighted sentences using ==...==.
- Plain-text headers in all ::: concept and ::: stat blocks (NO LaTeX math in header line).
- Core concepts: VDR ingestion, DocLLM layout awareness, automated spreading, deterministic execution sandboxes, cell-level audit lineage.
- Standard GFM markdown tables (no code blocks for tables).
- Cross-link glossary terms [[financial-spreading]], [[virtual-data-room|VDR]], [[cell-level-audit-lineage]], [[deterministic-sandbox]], [[covenant-monitoring]], etc.
- Cite sources [@jpmorgan-docllm-2024], [@jpmorgan-llm-finance-2023], [@morgan-stanley-openai-2023]. Media card: {{paper jpmorgan-docllm-2024}}.
- Anti-ai-writing: Concrete, human, authoritative voice; no machine cliches.
- Run node test/e2e-fin.mjs --tier=2 or npm run check to verify your chapter.
- Write changes.md and handoff.md in your working directory.
When finished, notify me using send_message.
