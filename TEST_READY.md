# Test Suite Ready: INFERENCE v4 Finance & Banking (FIN) Track

**Status:** READY & VERIFIED  
**Runner:** `node test/e2e-fin.mjs`  
**Infrastructure Specification:** `TEST_INFRA.md`  
**Date:** 2026-11-04  

---

## 1. Executive Summary

The automated E2E test suite for the **INFERENCE v4 Finance & Banking Track (Part VI)** has been designed, implemented, and verified at `test/e2e-fin.mjs`.

The suite provides comprehensive opaque-box verification across all planned features (F01–F18) and all 4 project milestones (M1–M4), adhering strictly to the **4-Tier Test Architecture**:
- **Tier 1 (Feature Coverage)**: 12 tests validating primary canonical sources ingestion (`content/sources.yml`), domain policy allowlists (`content/source-policy.yml`), glossary terms and acronym aliases (`content/glossary.yml`), TOC Part VI structure (`content/toc.yml`), book configuration (`book.yml`), chapter frontmatters, SVG figures (`content/figures/`), linter execution (`scripts/check.mjs`), and PDF release packaging (`editions/`).
- **Tier 2 (Boundary & Corner Cases)**: 28 tests enforcing pedagogical density invariants across all 4 Finance chapters:
  - Skim highlights: exactly 4 to 8 highlights (`==...==`) per chapter (Mayer signaling principle)
  - Stat block: exactly 1 (`::: stat`) per chapter with plain text headers (zero LaTeX math in headers to prevent escaped HTML tag leakage)
  - Media cards: 1 to 3 (`{{read/paper/watch/listen ...}}`) per chapter
  - Retrieval practice: 4 to 6 check questions ending in `<span class="lvl">...</span>` paired with `::: answers`
  - Night-before recap: exactly 5 numbered lines in `::: recap`
  - Escaped HTML tag leak prevention: zero `&lt;span...&gt;` leaks in rendered prose outside code blocks
  - Anti-AI writing style guard: zero banned machine cliché tropes
- **Tier 3 (Cross-Feature Combinations & Referential Integrity)**: 4 tests validating bidirectional links between chapter prose citations/glossary references and canonical registries (`content/sources.yml`, `content/glossary.yml`, `content/figures/`, `content/toc.yml`). Auto-increments chapter numbers to 22, 23, 24, 25, preserves Inserts A & B, and confirms `'finance'` path in `howToRead`.
- **Tier 4 (Real-World Workload & Compilation Pipeline)**: 2 tests executing full build compilation (`node scripts/build.mjs`) and validating final PDF delivery (`editions/INFERENCE-v4-finance-draft.pdf`).

Total Test Suite Inventory: **46 distinct test assertions**.

---

## 2. Current Baseline Verification Results

Executing against the repository at current milestone state:

```powershell
node test/e2e-fin.mjs --milestone=M1
```
**Result**:
- Total Executed: 3
- **Passed**: 3 (100% PASS)
- Failed: 0
- Pending: 0
- Duration: 0.01s

```powershell
node test/e2e-fin.mjs --progressive
```
**Result**:
- Total Executed: 46
- **Passed**: 8 (M1 sources, M1 policy, M1 glossary, M2 TOC Part VI, M2 SVG figures, M4 linter check, M2 chapter numbering, M4 build compilation)
- **Pending**: 38 (Downstream M3 chapter authoring and M4 PDF export milestones)
- Failed: 0
- Duration: 1.34s

---

## 3. How to Execute the Test Suite

```powershell
# 1. Run complete E2E test suite (standard strict mode)
node test/e2e-fin.mjs

# 2. Run progressive gating mode (completed milestones pass, unreached milestones pend)
node test/e2e-fin.mjs --progressive

# 3. Gate Milestone 1 (Sources, Policy & Glossary Registries)
node test/e2e-fin.mjs --milestone=M1

# 4. Gate Milestone 2 (Part VI TOC Structure, Figures & Build Path)
node test/e2e-fin.mjs --milestone=M2 --progressive

# 5. Gate Milestone 3 (Finance Chapter Authoring & Pedagogy)
node test/e2e-fin.mjs --milestone=M3 --progressive

# 6. Gate Milestone 4 (Release Packaging & Compilation)
node test/e2e-fin.mjs --milestone=M4

# 7. Run specific tiers (e.g. Tier 1 & Tier 2)
node test/e2e-fin.mjs --tier=1,2

# 8. Output machine-readable JSON for CI integration
node test/e2e-fin.mjs --json
```

---

## 4. Verification & Gate Certification

- **Test Integrity**: Zero facade tests. Every test executes real logic and asserts exact boundary contracts.
- **Progressive Testability**: Downstream worker agents can run `node test/e2e-fin.mjs --progressive` to verify incremental progress without false negatives.
- **Readiness**: The test suite is certified ready for continuous verification across Milestones M2, M3, and M4.
