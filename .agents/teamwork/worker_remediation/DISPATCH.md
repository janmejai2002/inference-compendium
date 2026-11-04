# Dispatch for worker_remediation

- **Role**: Remediation & Quality Engineer
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_remediation\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Remediation Blueprint**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_remediation\report.md`
- **Exclusive Write Ownership**:
  - `content/glossary.yml`
  - `content/chapters/algorithmic-underwriting-and-credit-risk.md`
  - `content/chapters/finance-casebook.md`
- **Objective**:
  1. Apply all surgical edits specified in `explorer_remediation/report.md` § 3:
     - Edit 1.1 & 1.2: `content/glossary.yml` (replace LaTeX math delimiters with plain unicode in definitions for `loss-given-default`, `lgd`, `expected-credit-loss`, `ecl`).
     - Edit 2.1: `content/chapters/algorithmic-underwriting-and-credit-risk.md` (correct line 179 credit loss calculation to ₹228.00 Cr).
     - Edit 3.1: `content/chapters/finance-casebook.md` (Case 2 EBITDA bridge).
     - Edit 3.2: `content/chapters/finance-casebook.md` (Case 3 sensitivity table header, headcount, and cells).
     - Edit 3.3: `content/chapters/finance-casebook.md` (Case 4 sensitivity table row shifts).
     - Edit 3.4: `content/chapters/finance-casebook.md` (Guesstimate 1 Capex currency delimiters, domestic endpoint pricing, 10x order-of-magnitude fix: ₹9.792 Cr/yr, ₹29.38 Cr 3-yr TCO, ₹4.96 Cr savings, 16.63M queries/mo crossover volume, and sensitivity table).
     - Edit 3.5: `content/chapters/finance-casebook.md` (Guesstimate 3 P/E valuation sensitivity table).
     - Edit 3.6: `content/chapters/finance-casebook.md` (Guesstimate 4 1.40% margin call demand and sensitivity table).
  2. Run the verification commands:
     - `node test/adversarial-challenger.mjs` (must pass 68/68, 0 failed, verdict: APPROVE)
     - `python test/verify_math_part_vi.py` (must pass with 0 critical errors)
     - `npm run check` (0 errors)
     - `npm run build` (all 28 chapters compiled)
     - `node test/e2e-fin.mjs --progressive` (all 43 active tests passed)
  3. Write `changes.md` and deliver `handoff.md`.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
