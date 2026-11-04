# Test Suite Ready: INFERENCE v3 Product Management (PM) Track

**Status:** READY & VERIFIED  
**Runner:** `node test/e2e-pm.mjs`  
**Infrastructure Specification:** `TEST_INFRA.md`  
**Date:** 2026-11-03  

---

## 1. Executive Summary

The automated E2E test suite for the **INFERENCE v3 Product Management (PM) Track** has been designed, implemented, and verified at `test/e2e-pm.mjs`.

The suite provides comprehensive opaque-box verification across all 12 planned features (F01–F12) and all 4 project milestones (M1–M4), adhering strictly to the **4-Tier Test Architecture**:
- **Tier 1 (Feature Coverage)**: 12 tests validating primary sources ingestion, domain policies, glossary terms, TOC structure, book configuration, chapter frontmatter, SVG figures, linter execution, and PDF release packaging.
- **Tier 2 (Boundary & Corner Cases)**: 28 tests enforcing pedagogical density invariants across all 4 PM chapters:
  - Skim highlights: exactly 4 to 8 highlights (`==...==`) per chapter
  - Stat block: exactly 1 (`::: stat`) per chapter with lining numbers
  - Media cards: 1 to 3 (`{{read/paper/watch/listen ...}}`) per chapter
  - Retrieval practice: 4 to 6 check questions ending in `<span class="lvl">...</span>` paired with `::: answers`
  - Night-before recap: exactly 5 numbered lines in `::: recap`
  - Escaped HTML tag leak prevention: zero `&lt;span...&gt;` leaks in rendered prose
  - Anti-AI writing style guard: zero banned machine cliché tropes
- **Tier 3 (Cross-Feature Combinations & Referential Integrity)**: 4 tests validating bidirectional links between chapter prose citations/glossary references and canonical registries (`content/sources.yml`, `content/glossary.yml`, `content/figures/`, `content/toc.yml`). Auto-increments chapter numbers to 18, 19, 20, 21.
- **Tier 4 (Real-World Workload & Compilation Pipeline)**: 2 tests executing full build compilation (`node scripts/build.mjs`) and validating final PDF delivery (`editions/INFERENCE-v3-product-draft.pdf`).

Total Test Suite Inventory: **46 distinct test assertions**.

---

## 2. Current Baseline Verification Results

Executing against the repository at Milestone 1 completion:

```powershell
node test/e2e-pm.mjs --milestone=M1
```
**Result**:
- Total Executed: 6
- **Passed**: 6 (100% PASS)
- Failed: 0
- Pending: 0
- Duration: 0.29s

```powershell
node test/e2e-pm.mjs --progressive
```
**Result**:
- Total Executed: 46
- **Passed**: 8 (M1 features, TOC numbering, linter gate, HTML/CSS build compilation)
- **Pending**: 38 (Downstream M2/M3 chapter authoring and M4 PDF export milestones)
- Failed: 0
- Duration: 1.59s

---

## 3. How to Execute the Test Suite

```powershell
# 1. Run complete E2E test suite (standard strict mode)
node test/e2e-pm.mjs

# 2. Run progressive gating mode (completed milestones pass, unreached milestones pend)
node test/e2e-pm.mjs --progressive

# 3. Gate Milestone 1 (Registries & Configuration)
node test/e2e-pm.mjs --milestone=M1

# 4. Gate Milestone 2 (Foundation PM Chapters 18 & 19)
node test/e2e-pm.mjs --milestone=M2

# 5. Gate Milestone 3 (Advanced PM Chapters 20 & 21)
node test/e2e-pm.mjs --milestone=M3

# 6. Gate Milestone 4 (Verification & PDF Release)
node test/e2e-pm.mjs --milestone=M4

# 7. Run specific tiers (e.g. Tier 1 & Tier 2)
node test/e2e-pm.mjs --tier=1,2

# 8. Output machine-readable JSON for CI integration
node test/e2e-pm.mjs --json
```

---

## 4. Verification & Gate Certification

- **Test Integrity**: Zero facade tests. Every test executes real logic and asserts exact boundary contracts.
- **Progressive Testability**: Downstream worker agents can run `node test/e2e-pm.mjs --progressive` to verify incremental progress without false negatives.
- **Readiness**: The test suite is certified ready for continuous verification across Milestones M2, M3, and M4.
