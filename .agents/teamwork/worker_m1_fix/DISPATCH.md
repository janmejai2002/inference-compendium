# DISPATCH: Milestone 1 Remediation Worker (Iteration 2)

- Identity: teamwork_worker
- Working Directory: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m1_fix\
- Authoritative User Request: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md (MANDATORY: read this first!)
- Scope Document: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator_1\PROJECT.md
- Remediation Strategy: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m1_fix\strategy.md

## Exclusive File Ownership
You exclusively own and may edit:
- `content/sources.yml`

DO NOT touch any other file.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Tasks
Apply the 4 surgical URL fixes to `content/sources.yml`:
1. Line ~1696: Update `card-moran-newell-psychology-hci` URL to `https://www.taylorfrancis.com/books/mono/10.1201/9780203736166/psychology-human-computer-interaction-stuart-card`.
2. Line ~1674: Update `cagan-svpg-ai-risk` URL to `https://www.svpg.com/four-big-risks/`.
3. Line ~1630: Update `anthropic-context-caching` URL to `https://claude.com/resources/articles/prompt-caching`.
4. Line ~1641: Update `anthropic-prompt-engineering-interactive` URL to `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview`.

## Verification Requirement
1. Run `npm run check` and confirm 0 errors.
2. Run `node test/e2e-pm.mjs --milestone=M1` and confirm 6/6 pass.
3. Deliver `handoff.md` with full execution outputs and notify orchestrator.
