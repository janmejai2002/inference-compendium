# Handoff Report: Milestone 3 Specification Mining (`spec_miner_m3`)

**Agent Identity:** `teamwork_spec_miner` (`spec_miner_m3`)  
**Roles:** Specification Miner, Teamwork Specialist  
**Working Directory:** `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\`  
**Target Milestone:** Milestone 3 (Advanced PM Chapters & Casebook)  
**Deliverables Produced:**
- `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\spec_checklist.md`
- `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\handoff.md`  
**Recipient:** Orchestrator (`63749ac4-d84d-4275-8f32-53b3635ebc8a`)  
**Date:** 2026-11-04  

---

## 1. Observation

### 1.1 Test Runner Contracts in `test/e2e-pm.mjs`
Direct inspection of `test/e2e-pm.mjs` lines 477–547, 596–731, and 737–883 establishes the following exact assertions:
- **T1.8 (Chapter 20 Frontmatter, lines 479–500):**
  - Requires `content/chapters/agentic-ux-and-interfaces.md` to exist.
  - Frontmatter assertions: `ch.data.id === 'agentic-ux-and-interfaces'`, non-empty `title`, non-empty `deck`, non-empty `hook`.
  - `ch.data.tracks` must be an array including `'product'`.
  - `ch.data.objectives` must be an array of length 3–4, with each item matching `/^\*\*[A-Z][a-z]+\*\*/` (bold Bloom verb).
- **T1.9 (Chapter 21 Authoring & 8 Quantitative Cases, lines 503–524):**
  - Requires `content/chapters/product-casebook.md` to exist.
  - Frontmatter assertions: `ch.data.id === 'product-casebook'`, non-empty `title`.
  - Case count assertion (line 516):
    ```javascript
    const cases = (ch.body.match(/:::\s*case\b/g) || []).length;
    assert.ok(cases >= 4, `Chapter 21 must contain at least 4 detailed strategic cases, found ${cases}`);
    ```
    *(Direct observation: Cases MUST be wrapped in `::: case` blocks, not markdown headers).*
  - Mathematical calculation assertion (line 520):
    ```javascript
    const hasKaTeX = /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(ch.body);
    assert.ok(hasKaTeX, 'Chapter 21 must contain KaTeX quantitative formulas');
    ```
- **T1.10 (Accompanying SVG Figures, lines 527–547):**
  - Requires `content/figures/agentic-ux-and-interfaces.svg` and `content/figures/product-casebook.svg` to exist and contain `<svg` root.
- **T2.1 to T2.7 (Boundary & Corner Invariants):**
  - Highlights: 4–8 per chapter (`==...==`).
  - Stat blocks: Exactly 1 per chapter (`::: stat <value>`) with lining numerals.
  - Media cards: 1–3 per chapter (`{{read/paper/watch/listen id}}`).
  - Check questions: 4–6 questions ending with `<span class="lvl">recall|apply|explain|transfer|judge</span>` in `::: check`, paired with `::: answers` inverted container.
  - Night-before recap: Exactly 5 numbered lines (`^\s*\d+\.\s+`) in `::: recap The night-before page`.
  - Escaped HTML tag leak prevention: Zero matches for `/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/`.
  - Anti-AI tropes: Zero matches for `BANNED_AI_TROPES` (e.g. `delve`, `tapestry`, `game-changer`, `plethora`, `seamlessly integrate`, `not only ... but also`).
- **T3.1 & T3.2 (Bidirectional Registry Integrity):**
  - When all 4 chapters are authored, all 8 PM sources in `content/sources.yml` and all 6 PM glossary terms in `content/glossary.yml` must be cited/linked across the PM chapters.

### 1.2 Registry Delta Audit: Sources and Glossary Coverage
Execution of Node AST analysis over existing M2 chapters (`ai-product-lifecycle.md` and `product-architecture-economics.md`) revealed:
```
=== ai-product-lifecycle ===
  Source cited: openai-evals-framework, cagan-transformed-ai, cagan-svpg-ai-risk, zheng-judging-llm-as-judge
  Glossary linked: eval-harness, synthetic-evals
=== product-architecture-economics ===
  Source cited: anthropic-context-caching, google-gemini-long-context, card-moran-newell-psychology-hci
  Glossary linked: latency-budget, context-caching, model-routing
```
- **PM Source Gap:** `anthropic-prompt-engineering-interactive` is the single source among the 8 PM canonical sources not yet cited in Ch 18 or 19. It **MUST be cited in Chapter 20 or Chapter 21** to satisfy `T3.1`.
- **PM Glossary Gap:** `agentic-ux` is the single glossary term among the 6 PM terms not yet linked in Ch 18 or 19. It **MUST be linked (`[[agentic-ux]]`) in Chapter 20** to satisfy `T3.2`.

### 1.3 Milestone 2 Failure Modes & Remediations
Review of M2 review and audit logs (`reviewer_m2_1/handoff.md:51-69`, `reviewer_m2_final/handoff.md:14-44`, `auditor_m2_final/handoff.md:29-57`):
- In `ai-product-lifecycle.md:131`, compound citation `[@cagan-transformed-ai; @cagan-svpg-ai-risk]` leaked verbatim unparsed into `dist/print.html`.
- In `product-architecture-economics.md:73`, compound citation `[@anthropic-context-caching; @google-gemini-long-context]` leaked verbatim unparsed into `dist/print.html`.
- Root cause: Regex `/\[@([\w-]+)\]/g` in `scripts/lib/render.mjs:197` rejects semicolons and spaces.
- Resolution: Discrete single brackets `[@source-1] [@source-2]`.

### 1.4 Container Math Leak Mechanism
Inspection of `scripts/lib/render.mjs` lines 158–184 and 81–96:
- `preprocess()` replaces `$math$` with `<span class="katex">...</span>`.
- `simple()` in markdown-it passes `info` (container title) through `md.renderInline(info)`.
- `md.renderInline` escapes `<span` to `&lt;span class="katex"&gt;`.
- `scripts/check.mjs:51` explicitly fails on `/&lt;(?:span|div|math...)/`.

### 1.5 Current E2E Progressive Test Run
Execution of `node test/e2e-pm.mjs --progressive`:
- 27 passed, 0 failed, 19 pending (19 pending checks correspond to M3 and M4 deliverables).

---

## 2. Logic Chain

1. **Prerequisite Gating:** Progressive test execution confirms that Milestones 1 and 2 are 100% clean (27 tests passing, 0 errors). Milestone 3 is unblocked.
2. **Contract Traceability:** `content/toc.yml` Part V establishes the exact titles, decks, tracks, and prerequisites for Chapters 20 and 21. Any deviation in frontmatter causes `T1.8` or `T1.9` to fail.
3. **Cross-Feature Registry Coupling:**
   - Test `T3.1` tests bidirectional citation coverage. Because M2 cited 7 of 8 sources, M3 worker authoring Chapter 20 or 21 must cite `anthropic-prompt-engineering-interactive`.
   - Test `T3.2` tests bidirectional glossary coverage. Because M2 linked 5 of 6 terms, M3 worker authoring Chapter 20 must link `[[agentic-ux]]`.
4. **Structural Assertion Constraints:**
   - In `product-casebook.md`, using standard markdown headers (`### Case 1`) will fail `T1.9` because line 516 specifically evaluates `body.match(/:::\s*case\b/g).length >= 4`. The 4 strategic cases must be encapsulated in `::: case` container blocks.
   - Using KaTeX math in container titles triggers escaped HTML entity leaks (`&lt;span...&gt;`), which fails `scripts/check.mjs` and `T2.6`. Titles must be plain text.
   - Semicolon-separated citations fail `render.mjs:197` regex, leaking unparsed markdown into output and failing `T3.1`. All citations must be discrete single brackets.
5. **Conclusion:** Delivering `spec_checklist.md` with these explicit rules equips workers, reviewers, and auditors with an unambiguous verification matrix, preventing redundant repair loops during M3 authoring.

---

## 3. Caveats

- **Read-Only Mining:** As Spec Miner, no production chapters (`content/chapters/*.md`) or figures (`content/figures/*.svg`) were modified or created. Deliverables are strictly metadata and specifications in `.agents/teamwork/spec_miner_m3/`.
- **Pre-existing Linter Warnings:** `npm run check` currently emits 54 warnings concerning registry domain reviews in v1/v2 legacy files. These warnings are pre-existing and do not affect M3 authoring.

---

## 4. Conclusion

Milestone 3 specification mining is complete and verified against the authoritative codebase and test harness. The authoritative guide `spec_checklist.md` has been delivered to `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\spec_checklist.md`.

**Key Specifications Codified for M3 Workers:**
1. **Chapter 20 (`agentic-ux-and-interfaces.md`):** Frontmatter matching TOC; mandatory link to `[[agentic-ux]]`; mandatory citation of `card-moran-newell-psychology-hci` and `anthropic-prompt-engineering-interactive`; 4–8 highlights; 1 stat block (`1.2s vs 8.4s`); 4–6 check questions + inverted answers; exactly 5-line recap.
2. **Chapter 21 (`product-casebook.md`):** Frontmatter matching TOC; at least 4 strategic cases wrapped in `::: case <Title>` blocks; 4 quantitative estimation problems; KaTeX formulas in body only (NO math in container titles); 1 stat block; 4–8 highlights; 4–6 check questions + answers; exactly 5-line recap.
3. **Figures 20.1 & 21.1:** 640x330 vector SVGs using semantic theme classes (`paper`, `wash`, `acc`, `acc-s`, `rule-s`, `ink`, `t-display`), downward-pointing process arrowheads, and dual-panel layouts.
4. **Zero-Tolerance Invariants:** Discrete single-bracket citations (`[@a] [@b]`), no math in container titles, no escaped HTML tag leaks, zero banned AI tropes.

---

## 5. Verification Method

To independently verify the findings in this report and the accuracy of `spec_checklist.md`:

1. **Verify Test Runner Invariant Assertions:**
   ```powershell
   node -e "
   import fs from 'node:fs';
   const code = fs.readFileSync('test/e2e-pm.mjs', 'utf8');
   console.log('T1.8 present:', code.includes('T1.8'));
   console.log('T1.9 case regex:', code.includes('/:::\\s*case\\b/g'));
   console.log('T2.6 escaped leak regex:', code.includes('&lt;(?:span|div|math'));
   "
   ```
   *Expected:* All three checks output `true`.

2. **Verify Registry Gap Analysis:**
   ```powershell
   node -e "
   import fs from 'node:fs';
   const ch18 = fs.readFileSync('content/chapters/ai-product-lifecycle.md', 'utf8');
   const ch19 = fs.readFileSync('content/chapters/product-architecture-economics.md', 'utf8');
   console.log('anthropic-prompt-eng cited in M2:', (ch18 + ch19).includes('anthropic-prompt-engineering-interactive'));
   console.log('agentic-ux linked in M2:', (ch18 + ch19).includes('[[agentic-ux'));
   "
   ```
   *Expected:* Both checks output `false` (proving that M3 is strictly required to include them).

3. **Verify Progressive Test Suite State:**
   ```powershell
   node test/e2e-pm.mjs --progressive
   ```
   *Expected:* `27 passed, 0 failed, 19 pending`.

4. **Inspect Generated Spec Checklist:**
   ```powershell
   Get-Content .agents/teamwork/spec_miner_m3/spec_checklist.md -TotalCount 40
   ```
