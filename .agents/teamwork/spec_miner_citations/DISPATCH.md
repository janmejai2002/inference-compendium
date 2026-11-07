## 2026-11-05T10:32:57Z
You are spec_miner_citations, a specialized read-only specification and source investigator.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_citations\
Your parent orchestrator is: e8b90a07-d677-49a5-8255-a8ddabf3d3e6

MANDATORY FIRST STEP:
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md completely before starting any work.

YOUR MISSION:
Audit the book's citation state with a focus on resolving the 28 unverified sources recorded in STATUS.md in accordance with docs/SOURCES.md tier policy:
1. Read STATUS.md to extract all unverified sources, notes, and citations marked unverified or pending.
2. Read docs/SOURCES.md to understand the strict citation tier policy (Tier A vs Tier B, verification rules, allowed domain policy in content/source-policy.yml).
3. Read content/sources.yml and content/source-policy.yml to map existing entries, schema, and current definitions.
4. Scan all 28 chapters in content/chapters/*.md to find where each unverified source is cited (e.g. [@source-id] or {{read source-id}}), and what specific claims rely on them.
5. For each of the 28 unverified sources:
   - Identify whether a genuine primary source exists (arXiv, official proceedings, institutional publication, corporate whitepaper from original researchers, official docs).
   - If a genuine primary source exists and its domain is allowed or eligible under docs/SOURCES.md, specify the exact verified URL, authors, title, year, tier (A/B), and why-annotation.
   - If a claim cannot be grounded in primary literature or was hallucinated/misattributed, recommend precise claim refinement or replacement with a real primary citation.
6. Check for any missing citation references across chapters (e.g. broken [@citation-id] tags that do not exist in content/sources.yml).

OUTPUT REQUIREMENTS:
- Write your comprehensive audit and resolution map to C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_citations\analysis.md.
- Write your structured handoff to C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_citations\handoff.md following Handoff Protocol (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
- Send a completion message via send_message to e8b90a07-d677-49a5-8255-a8ddabf3d3e6 when finished.
Do not modify any source code or chapters directly. This is a read-only survey.
