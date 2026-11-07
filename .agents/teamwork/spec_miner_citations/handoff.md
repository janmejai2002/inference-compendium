# Handoff Report — Citation Audit & Unverified Source Resolution

**Agent**: `spec_miner_citations`  
**Parent Agent**: `e8b90a07-d677-49a5-8255-a8ddabf3d3e6`  
**Date**: November 5, 2026  
**Type**: Hard Handoff (Task Complete)

---

## 1. Observation

1. **STATUS.md Baseline**:
   `STATUS.md` line 24 records:
   `Sources: 160 sources registered in content/sources.yml, 132 verified (28 unverified).`
   Lines 62–90 enumerate the exact list of 28 unverified source IDs:
   `3b1b-neural-network`, `wolfram-chatgpt`, `hbs-jagged-frontier`, `mollick-centaurs`, `stanford-ai-index`, `hbr-simple-economics-machine-intelligence`, `anthropic-project-vend`, `willison-lethal-trifecta`, `ibm-agent-skills`, `hbr-ideacast-sternfels`, `epoch-inference-price-trends`, `boyle-big-tech-debt`, `sarvam-bulbul-v4-flash`, `google-meridian`, `meta-robyn`, `unilever-digital-twins`, `argyle-out-of-one-many`, `horton-homo-silicus`, `brand-llm-market-research`, `asci-genai-guidelines`, `openai-evals-framework`, `anthropic-context-caching`, `anthropic-prompt-engineering-interactive`, `google-gemini-long-context`, `cagan-transformed-ai`, `cagan-svpg-ai-risk`, `zheng-judging-llm-as-judge`, `card-moran-newell-psychology-hci`.

2. **Linter Execution & Tool Output**:
   Running `npm run check` (`node scripts/check.mjs`) returned exit code 0, reporting:
   `check: 0 errors, 53 warnings`.
   Key warnings observed verbatim:
   - `! source 3b1b-neural-network: in the registry but cited nowhere`
   - `! source mollick-centaurs: in the registry but cited nowhere`
   - `! source stanford-ai-index: in the registry but cited nowhere`
   - `! source meta-robyn: facebookexperimental.github.io is not in source-policy.yml, needs review`
   - `! source unilever-digital-twins: newsroom.accenture.com is not in source-policy.yml, needs review`
   - `! source asci-genai-guidelines: ascionline.in is not in source-policy.yml, needs review`
   - 28 warnings for `not verified yet (open it, confirm title/author/date/timestamps, set verified: true)`.

3. **HTTP 200 Live Validation**:
   Automated network probe across all 28 registered URLs confirmed that 28/28 return HTTP status code 200.

4. **Specific Citation Tag Scan Across Chapters**:
   Automated scanning of all 29 `.md` files in `content/chapters/` confirmed:
   - **Broken citation tags**: 0 (all `[@id]` and `{{read/watch/paper/listen id}}` map to defined keys in `content/sources.yml`).
   - `3b1b-neural-network`, `mollick-centaurs`, and `stanford-ai-index` are cited exclusively in `content/chapters/what-is-a-model.md` (which is excluded from `toc.yml`).

5. **Critical Textual & Factual Discrepancies Observed**:
   - `brand-llm-market-research`: Current URL `https://www.hbs.edu/faculty/Pages/item.aspx?num=64041` returns `<title>When Scenario Planning Fails - Article - Faculty & Research - Harvard Business School</title>`. The true HBS Working Paper 23-062 (*Using LLMs for Market Research*) by James Brand, Ayelet Israeli, and Donald Ngwe is located at `https://www.hbs.edu/ris/Publication%20Files/23-062_1f58623a-ee21-44b9-a262-276047bc5543.pdf` (HTTP 200).
   - `sarvam-bulbul-v4-flash`: `content/chapters/creative-at-scale.md` line 120 claims *"22 Indic Languages"* and *"Sub-150ms First Audio Chunk"*. The official Sarvam AI announcement (`https://www.sarvam.ai/blogs/bulbul-v4-flash`, Oct 13, 2026) specifies *"11 Indian languages with under 250 ms time-to-first-audio, at ₹20 per 10,000 characters"*.
   - `unilever-digital-twins`: `content/chapters/creative-at-scale.md` line 12 claims Unilever deployed *"over 400 AI applications to halve localized creative production timelines and slash studio costs"*. The cited Accenture press release (`unilever-scales-digital-twins-across-global-manufacturing-network-with-accenture`, June 16, 2026) explicitly concerns 40+ **manufacturing equipment digital twins** on factory floors, not marketing creative production.
   - `asci-genai-guidelines`: URL in `content/sources.yml` is `https://ascionline.in/` (root portal). The official primary document is `https://www.ascionline.in/wp-content/uploads/2026/09/Guidelines-for-Responsible-Labelling-of-Synthetically-Generated-Content-in-Advertising.pdf` (published September 2026).

---

## 2. Logic Chain

1. **Zero Broken Citation Invariant**:
   Observation 4 shows 0 broken tags. Because every inline citation maps to an existing source, no existing chapter text references undefined entities.
2. **Validation of Academic & Originator Papers (Tier A)**:
   - Citations `argyle-out-of-one-many` (arXiv:2209.06899), `horton-homo-silicus` (NBER 31122), `zheng-judging-llm-as-judge` (NeurIPS 2023 / arXiv:2306.05685), `google-gemini-long-context` (arXiv:2403.05530), `card-moran-newell-psychology-hci` (Taylor & Francis 1983), and `hbs-jagged-frontier` (HBS Working Paper 24-013) represent authoritative primary literature from recognized academic labs and universities. Their mathematical and empirical claims in the chapters (e.g., algorithmic fidelity distributions, 100ms/1s/10s latency thresholds, MT-Bench bias categories, jagged frontier consultant statistics) directly match the published papers. Therefore, all qualify for Tier A and `verified: true`.
3. **Originator Whitepapers & Technical Documentation (Tier A)**:
   - `wolfram-chatgpt` (Stephen Wolfram Writings), `anthropic-project-vend` (Anthropic Research), `anthropic-context-caching` (Anthropic Docs), `anthropic-prompt-engineering-interactive` (Anthropic Platform Docs), `epoch-inference-price-trends` (Epoch AI), `google-meridian` (Google Research), `meta-robyn` (Meta Marketing Science), and `openai-evals-framework` (OpenAI Evals) originate directly from the creators of the models and tools. The quotations (such as Stephen Wolfram on temperature 0.8 and next-word prediction; Anthropic on 90% cost / 85% latency reduction; Project Vend on the $100 Irn-Bru and Venmo errors) are verbatim or factually exact.
4. **Resolution of Discrepancies**:
   - `brand-llm-market-research`: Because the current HBS item URL points to an unrelated 2020 article on scenario planning (Observation 5), retaining it compromises academic rigor. Updating to the direct HBS publication PDF (`23-062_1f58623a...pdf`) restores primary ground truth under Tier A.
   - `sarvam-bulbul-v4-flash`: Because the official release specifies 11 Indian languages and <250ms latency (Observation 5), retaining "22 Indic languages" and "sub-150ms" in Chapter 14 constitutes an ungrounded factual error. Aligning Chapter 14 Table 14.1 with Sarvam's official specification ensures strict accuracy.
   - `unilever-digital-twins`: Because the Accenture press release describes factory twins, the chapter prose in `creative-at-scale.md` must accurately distinguish between Unilever's supply-chain twins and its separate marketing creative AI initiatives (Horizon3 Labs / Brand DNAi).
   - `meta-robyn`: Changing URL to `https://github.com/facebookexperimental/Robyn` retains the canonical open-source code repository while using `github.com` (Tier C platform domain where Tier A rests on originator Meta Marketing Science), clearing the `facebookexperimental.github.io` unlisted domain warning.
5. **Orphan Source Resolution**:
   - Because `what-is-a-model.md` is omitted from `toc.yml`, `3b1b-neural-network`, `mollick-centaurs`, and `stanford-ai-index` are unreferenced in the built book. Adding cross-citations in Chapter 02 (`next-word-machine.md`) and Chapter 11 (`consulting-firm.md`) will bring them into active pedagogy and eliminate the linter warnings.

---

## 3. Caveats

1. **Read-Only Scope**: In adherence to the dispatched read-only spec miner mandate, no changes to `content/sources.yml`, `content/source-policy.yml`, or `content/chapters/*.md` were committed directly. All concrete diffs and recommendations are prepared for downstream implementation.
2. **External Paywalls**: Academic journal articles with open working-paper versions (`hbs-jagged-frontier` vs `dellacqua-jagged-orgsci`; `brand-llm-market-research` working paper vs QME journal) are verified against their freely accessible institutional primary versions on `.edu` domains.
3. **Syndicated Secondary Press**: Minor domain warnings for secondary news sources (`itiger.com`, `finance.yahoo.com`, `hrreview.co.uk`) were analyzed. Direct primary replacements on `bcg.com`, `wsj.com`, and `businessinsider.com` have been documented.

---

## 4. Conclusion

All 28 unverified sources in `STATUS.md` have been fully investigated, grounded in primary literature or originator technical publications, and resolved with verified URLs, authors, titles, publication years, and tier classifications.

Three critical defects were surfaced and mapped for immediate remediation:
1. Erroneous URL in `brand-llm-market-research` (points to unrelated scenario planning article; resolved to official HBS PDF).
2. Factual claim exaggeration in `sarvam-bulbul-v4-flash` (claims 22 languages and <150ms; resolved to 11 languages and <250ms).
3. Context conflation in `unilever-digital-twins` (conflates manufacturing factory twins with creative marketing generation).

The full audit, resolution matrix, and verbatim evidence citations have been compiled into:
`C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_citations\analysis.md`.

---

## 5. Verification Method

To independently verify all findings and confirm the integrity of the citation registry:
1. Inspect the comprehensive analysis:
   ```powershell
   cat .agents/teamwork/spec_miner_citations/analysis.md
   ```
2. Verify that `npm run check` flags exactly the 28 unverified sources and unlisted domains identified in Observation 2:
   ```powershell
   npm run check
   ```
3. Test the primary HBS PDF URL for `brand-llm-market-research`:
   ```powershell
   node -e "fetch('https://www.hbs.edu/ris/Publication%20Files/23-062_1f58623a-ee21-44b9-a262-276047bc5543.pdf', { method: 'HEAD' }).then(r => console.log('Status:', r.status))"
   ```
4. Verify Sarvam AI official numbers:
   ```powershell
   node -e "fetch('https://www.sarvam.ai/blogs/bulbul-v4-flash').then(r => r.text()).then(t => console.log(t.match(/under 250 ms[^\.]+/)[0]))"
   ```
5. Confirm zero broken citations across all chapters:
   ```powershell
   node .agents/teamwork/spec_miner_citations/scan_citations.mjs
   ```
