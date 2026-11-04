# Dispatch for worker_m4

- **Milestone**: M4 - Final Release: 100% E2E Pass, Build, PDF, Packaging & Commit
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m4\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Exclusive Write Ownership**:
  - `book.yml`
  - `STATUS.md`
  - `editions/INFERENCE-v4-finance-draft.pdf`
  - Git repository state / release commit
- **Tasks**:
  1. **Update `book.yml`**:
     Change line 5 from:
     ```yaml
     edition: 2027 · Draft 0.3 (Product Track)
     ```
     to:
     ```yaml
     edition: 2027 · Draft 0.4 (Finance Track)
     ```
  2. **Update `STATUS.md`**:
     Document the completion of the v4 Finance & Banking Track (Part VI):
     - All 4 chapters published:
       - Chapter 22: Algorithmic Underwriting & Credit Risk
       - Chapter 23: Financial Copilots & Deal Diligence
       - Chapter 24: Financial Crime, Fraud & RBI FREE-AI
       - Chapter 25: Finance Casebook: Eight Worked Problems
     - Total chapters in compendium: 28 chapters across Parts 0–VI + Inserts (Part VII).
     - Full 4-tier E2E test suite in `test/e2e-fin.mjs` passing 100%.
  3. **Build & Test Verification**:
     - Run `npm run check` -> verify 0 errors.
     - Run `npm run build` -> verify all 28 chapters compile cleanly.
     - Run `node test/e2e-fin.mjs` -> verify 46/46 tests pass with 0 failures, 0 pending (100% PASS).
  4. **Production PDF Generation & Export**:
     - Run `node scripts/build.mjs && node scripts/pdf.mjs` (or `npm run pdf`). Note: if screenshot captures take long, `node scripts/pdf.mjs --no-shots` or standard `node scripts/pdf.mjs` produces `dist/INFERENCE.pdf`.
     - Confirm `dist/INFERENCE.pdf` exists and is a valid PDF (~480+ pages).
     - Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v4-finance-draft.pdf`.
  5. **Git Release Commit**:
     - Verify git status.
     - Stage all tracked changes and new track files (`git add content/ book.yml STATUS.md test/ editions/ scripts/`).
     - Commit cleanly with exact commit message:
       `feat(finance): complete v4 finance track and integrate into compendium`
     - Verify `git status` shows a clean working tree.
  6. Write `changes.md` and deliver `handoff.md` in your working directory.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-04T16:58:23Z
You are worker_m4, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m4\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_m4\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundaries:
- book.yml
- STATUS.md
- editions/INFERENCE-v4-finance-draft.pdf
- Git commit execution

Your task:
1. Update book.yml: Change edition to "2027 · Draft 0.4 (Finance Track)".
2. Update STATUS.md: Document completion of Part VI (Finance & Banking Track, chapters 22-25, 28 total chapters).
3. Run verification:
   - npm run check (assert 0 errors)
   - npm run build (assert all 28 chapters compile)
   - node test/e2e-fin.mjs (assert 46/46 tests pass, 100%)
4. Generate production PDF:
   - Run npm run pdf (or node scripts/build.mjs && node scripts/pdf.mjs --no-shots if faster) to generate dist/INFERENCE.pdf (~480+ pages).
   - Ensure destination folder editions/ exists, and copy dist/INFERENCE.pdf to editions/INFERENCE-v4-finance-draft.pdf.
5. Commit to git:
   - Stage all project changes (content/, book.yml, STATUS.md, test/, editions/, scripts/).
   - Execute git commit with exact message:
     feat(finance): complete v4 finance track and integrate into compendium
   - Verify git status is clean.
6. Write changes.md and deliver handoff.md in your working directory.
When finished, notify me using send_message.
