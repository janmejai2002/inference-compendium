# Dispatch for worker_m1

- **Milestone**: M1 - Primary Source Canon & Registry Ingestion
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m1\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Inputs**: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_2\handoff.md and report.md
- **Exclusive Write Ownership**:
  - `content/source-policy.yml`
  - `content/sources.yml`
  - `content/glossary.yml`
- **Objective**:
  1. Update `content/source-policy.yml`: append `bis.org`, `ifrs.org`, `jpmorgan.com`, `morganstanley.com`, `npci.org.in` under `A:`.
  2. Update `content/sources.yml`: append the 14 canonical finance primary sources (BIS, BCBS, J.P. Morgan, Morgan Stanley, IFRS 9, SEBI, MeitY DPDP, RBI localization, RBI digital lending, SHAP, LIME, NPCI UPI) exactly as specified in `spec_miner_2/handoff.md` with verified URLs, citations, media types, tier A, and why-notes.
  3. Update `content/glossary.yml`: append all 25 finance terminology entries and acronym aliases as specified in `spec_miner_2/handoff.md`.
  4. Run verification command `npm run check` (offline linter).
  5. Write `changes.md` and `handoff.md` in your working directory.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## 2026-11-04T15:48:18Z
You are worker_m1, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m1\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_m1\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundaries:
- content/source-policy.yml
- content/sources.yml
- content/glossary.yml

Your inputs:
Read C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_2\handoff.md and report.md. They contain exact YAML payloads.

Your task:
1. Update content/source-policy.yml: append bis.org, ifrs.org, jpmorgan.com, morganstanley.com, and npci.org.in under A:.
2. Update content/sources.yml: append the 14 canonical finance primary sources exactly as specified in spec_miner_2/handoff.md with verified URLs, citations, media types, tier A, and why-notes.
3. Update content/glossary.yml: append all 25 finance terminology entries and acronym aliases as specified in spec_miner_2/handoff.md.
4. Run npm run check to verify that no source, policy, or glossary lint errors are introduced.
5. Write changes.md and handoff.md in your working directory.
When finished, notify me using send_message.
