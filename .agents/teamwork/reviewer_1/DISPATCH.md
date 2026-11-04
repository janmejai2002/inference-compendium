# Dispatch for reviewer_1

- **Role**: Pedagogical & Technical Reviewer
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\reviewer_1\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Task**:
  1. Review the 4 newly authored Part VI chapters in `content/chapters/`:
     - `algorithmic-underwriting-and-credit-risk.md`
     - `financial-copilots-and-deal-diligence.md`
     - `financial-crime-fraud-and-rbi-free-ai.md`
     - `finance-casebook.md`
  2. Verify strict adherence to `docs/PEDAGOGY.md` and `docs/AUTHORING.md`:
     - 13-part pedagogical arc
     - Plain-text container headers (no LaTeX math in `::: stat` or `::: concept` header lines)
     - Exactly 4–8 highlighted thesis statements (`==...==`) per chapter
     - Single stat block per chapter with `<span class="src">`
     - Exactly 5 numbered lines in `::: recap The night-before page`
     - 4–6 check questions with inverted answers
     - "Try it" prompts have zero code for MBA candidates
  3. Run verification commands:
     - `npm run check`
     - `npm run build`
     - `node test/e2e-fin.mjs --progressive`
  4. Write `review.md` and `handoff.md` with explicit verdict: `APPROVE` or `REQUEST_CHANGES`.


## 2026-11-04T16:22:18Z
You are reviewer_1, a teamwork_reviewer.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\reviewer_1\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\reviewer_1\DISPATCH.md before starting work.

Your objective:
Conduct a rigorous pedagogical and editorial review of the 4 Part VI chapters (chapters 22, 23, 24, 25):
1. Verify 13-part arc, plain-text headers, highlights [4..8], single stat block with source, 5 check questions/answers, 5-line night-before recap, and zero-code Try It prompts.
2. Run npm run check, npm run build, and node test/e2e-fin.mjs --progressive.
3. Write review.md and deliver a self-contained handoff.md with your explicit verdict: APPROVE or REQUEST_CHANGES.
When finished, notify me using send_message.
