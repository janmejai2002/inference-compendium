# Dispatch for test_writer_e2e

- **Track**: E2E Testing Track
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\test_writer_e2e\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Inputs**: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_1\handoff.md, report.md, and `test/e2e-pm.mjs`
- **Exclusive Write Ownership**:
  - `test/e2e-fin.mjs`
  - `TEST_INFRA.md`
  - `TEST_READY.md`
- **Objective**:
  1. Create `test/e2e-fin.mjs` as a comprehensive, opaque-box, requirement-driven test suite mirroring `test/e2e-pm.mjs`:
     - 4-tier systematic testing architecture:
       - Tier 1: Feature Coverage (TOC, Part VI chapters presence, sources in sources.yml and source-policy.yml, glossary definitions and aliases, 3 SVG figures, build.mjs finance reading path)
       - Tier 2: Boundary & Corner Cases (13-part arc density per chapter: highlight bounds [4..8], media card counts [1..3], check question bounds [4..6], stat count == 1, recap lines == 5, no escaped HTML tag leaks, no KaTeX in stat/concept headers, casebook 8 cases present)
       - Tier 3: Cross-Feature Combinations & Referential Integrity (all 4 finance chapters cite registered sources [@...], reference glossary terms [[...]], and embed corresponding figures {{figure ...}}; sources in registry are cited in the track; terms in registry are referenced in the track; book.yml edition check)
       - Tier 4: Real-World Scenarios & Full Publication Pipeline (runs dry-run check `node scripts/check.mjs`, runs build `node scripts/build.mjs`, asserts 28 compiled chapters in `dist/`, verifies navigation in `dist/index.html` and `dist/print.html`)
     - Support CLI flags: `--tier=N`, `--bail`, `--json`, `--verbose`.
     - Progressive verification: ensure Tier 1/2 tests pass progressively as milestones complete.
  2. Create `TEST_INFRA.md` at project root using the standard template documenting the test architecture, 4 tiers, feature inventory mapping, and pass/fail criteria.
  3. Verify that `node test/e2e-fin.mjs` runs cleanly (even if chapter-dependent tests fail prior to M3).
  4. Publish `TEST_READY.md` when the test infrastructure is complete and validated.
  5. Write `changes.md` and `handoff.md` in your working directory.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## 2026-11-04T15:48:37Z

You are test_writer_e2e, a teamwork_test_writer.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\test_writer_e2e\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\test_writer_e2e\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundaries:
- test/e2e-fin.mjs
- TEST_INFRA.md
- TEST_READY.md

Your inputs:
Read C:\Users\Janmejai\compendium\.agents\teamwork\explorer_1\handoff.md, report.md, and examine test/e2e-pm.mjs.

Your task:
1. Create test/e2e-fin.mjs implementing the comprehensive 4-tier, 46-test architecture designed in explorer_1/report.md:
   - Tier 1: Feature Coverage (TOC, Part VI chapters presence, sources in sources.yml and source-policy.yml, glossary definitions and aliases, 3 SVG figures, build.mjs finance reading path)
   - Tier 2: Boundary & Corner Cases (13-part arc density per chapter: highlight bounds [4..8], media card counts [1..3], check question bounds [4..6], stat count == 1, recap lines == 5, no escaped HTML tag leaks, no KaTeX in stat/concept headers, casebook 8 cases present)
   - Tier 3: Cross-Feature Combinations & Referential Integrity (all 4 finance chapters cite registered sources, reference glossary terms, and embed corresponding figures; sources in registry cited; terms in registry referenced; book.yml edition check)
   - Tier 4: Real-World Scenarios & Full Publication Pipeline (runs dry-run check node scripts/check.mjs, runs build node scripts/build.mjs, asserts 28 compiled chapters in dist/, verifies navigation in dist/index.html and dist/print.html)
   - CLI flags: --tier=N, --bail, --json, --verbose. Ensure progressive execution works cleanly.
2. Create TEST_INFRA.md at project root using the standard template documenting the test architecture, 4 tiers, feature inventory mapping, and pass/fail criteria.
3. Test running node test/e2e-fin.mjs --tier=1 (or full test runner) to verify syntax and functionality.
4. Publish TEST_READY.md at project root signaling that the test infrastructure is complete and operational.
5. Write changes.md and handoff.md in your working directory.
When finished, notify me using send_message.
