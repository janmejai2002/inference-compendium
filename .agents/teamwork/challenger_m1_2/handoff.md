# Milestone 1 Challenger 2 Report: Schema & URL Stress-Testing

- **Milestone**: Milestone 1 (Registries & Configuration)
- **Agent**: Milestone 1 Challenger 2 (`teamwork_challenger`, critic / specialist)
- **Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\challenger_m1_2\`
- **Recipient**: Orchestrator (`63749ac4-d84d-4275-8f32-53b3635ebc8a`)
- **Date**: 2026-11-03
- **Verdict**: `REQUEST_CHANGES`

---

## 1. Observation

### A. Source Schema & Types Check
Direct inspection of `content/sources.yml` lines 1613–1700 confirmed 8 new entries:
1. `openai-evals-framework`: `type: article`, `tier: A`, `year: 2024`
2. `anthropic-context-caching`: `type: article`, `tier: A`, `year: 2024`
3. `anthropic-prompt-engineering-interactive`: `type: article`, `tier: A`, `year: 2025`
4. `google-gemini-long-context`: `type: paper`, `tier: A`, `year: 2024`
5. `cagan-transformed-ai`: `type: book`, `tier: B`, `year: 2024`
6. `cagan-svpg-ai-risk`: `type: article`, `tier: B`, `year: 2024`
7. `zheng-judging-llm-as-judge`: `type: paper`, `tier: A`, `year: 2023`
8. `card-moran-newell-psychology-hci`: `type: book`, `tier: A`, `year: 1983`

All 8 entries match allowed schema types (`article`, `paper`, `book` from allowed set `{'paper', 'article', 'video', 'report', 'book', 'podcast'}` defined in `scripts/lib/render.mjs:18-19`).
All required fields (`type`, `title`, `creator`, `publisher`, `year`, `url`, `tier`, `why`, `verified`) are present.

### B. Live Empirical URL Probing & Reachability
Live network probes were executed using Python's `urllib`, `curl.exe`, CrossRef API, and DOI resolvers:

1. **`openai-evals-framework`** (`https://github.com/openai/evals`):
   - Command: `curl.exe -I -s "https://github.com/openai/evals"`
   - Result: `HTTP/1.1 200 OK`
2. **`anthropic-context-caching`** (`https://www.anthropic.com/news/prompt-caching`):
   - Command: `curl.exe -I -s "https://www.anthropic.com/news/prompt-caching"`
   - Result: `HTTP/1.1 308 Permanent Redirect` -> `Location: https://claude.com/blog/prompt-caching`
3. **`anthropic-prompt-engineering-interactive`** (`https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview`):
   - Command: `curl.exe -I -s "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"`
   - Result: `HTTP/1.1 301 Moved Permanently` -> `Location: https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview`
4. **`google-gemini-long-context`** (`https://arxiv.org/abs/2403.05530`):
   - Command: `curl.exe -I -s "https://arxiv.org/abs/2403.05530"`
   - Result: `HTTP/1.1 200 OK`
5. **`cagan-transformed-ai`** (`https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/`):
   - Command: `curl.exe -I -s "https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/"`
   - Result: `HTTP/1.1 200 OK`
6. **`zheng-judging-llm-as-judge`** (`https://arxiv.org/abs/2306.05685`):
   - Command: `curl.exe -I -s "https://arxiv.org/abs/2306.05685"`
   - Result: `HTTP/1.1 200 OK`
7. **`card-moran-newell-psychology-hci`** (`https://www.taylorfrancis.com/books/mono/10.1201/9780203736067/psychology-human-computer-interaction-stuart-card-thomas-moran-allen-newell`):
   - Command: `curl.exe -s -o NUL -w "%{http_code}" "https://api.crossref.org/works/10.1201/9780203736067"`
   - Result: `404` (doi.org returns HTTP 404 Not Found)
   - CrossRef Query for genuine registered DOI `10.1201/9780203736166`:
     - Command: `curl.exe -s "https://api.crossref.org/works/10.1201/9780203736166"`
     - Result: `HTTP/1.1 200 OK`, Title: `The Psychology of Human-Computer Interaction`, registered URL: `https://doi.org/10.1201/9780203736166` resolving to `https://www.taylorfrancis.com/books/mono/10.1201/9780203736166/psychology-human-computer-interaction-stuart-card`
8. **`cagan-svpg-ai-risk`** (`https://www.svpg.com/ai-and-product-management/`):
   - Command: `curl.exe -I -s "https://www.svpg.com/ai-and-product-management/"`
   - Result:
     ```
     HTTP/1.1 301 Moved Permanently
     Location: https://www.svpg.com/
     ```
     WordPress redirects the nonexistent slug directly to the SVPG root domain home page.
   - Genuine canonical SVPG article for the four product risks: `https://www.svpg.com/four-big-risks/` (HTTP 200).

### C. Glossary Terms Formatting
Direct inspection of `content/glossary.yml` lines 207–232 confirmed 6 new terms:
- `eval-harness` (`term: Evaluation harness (Eval harness)`)
- `synthetic-evals` (`term: Synthetic evaluations`)
- `latency-budget` (`term: Latency budget`)
- `context-caching` (`term: Context caching`)
- `model-routing` (`term: Model routing`)
- `agentic-ux` (`term: Agentic UX`)

Automated parser validation confirmed:
- Keys strictly adhere to `^[a-z0-9-]+$`
- Each entry contains exactly `term` and `def`
- No unescaped characters, no raw HTML tag leaks (`<span...`), valid UTF-8 em-dash (`—`)
- Initial capital letters and trailing periods present.

### D. Git Diff Verification
- Command: `git diff --stat`
  ```
   book.yml                  |  2 +-
   content/glossary.yml      | 25 +++++++++++++
   content/source-policy.yml |  2 ++
   content/sources.yml       | 89 +++++++++++++++++++++++++++++++++++++++++++++++
   content/toc.yml           | 31 +++++++++++++++++
   5 files changed, 148 insertions(+), 1 deletion(-)
  ```
- Command: `git diff --unified=0`
  Only 1 line in the entire repository was deleted/replaced:
  `-edition: 2027 · Draft 0.2 (Marketing Track)`
  `+edition: 2027 · Draft 0.3 (Product Track)`
  All other 147 lines are strictly additive. No lines in v1 or v2 chapters, registries, or inserts were deleted.

---

## 2. Logic Chain

1. **Schema Compliance**: The 8 source entries in `content/sources.yml` and 6 glossary terms in `content/glossary.yml` satisfy all schema and linter rules defined in `scripts/check.mjs` and `scripts/lib/render.mjs`.
2. **Git Diff Line Integrity**: The changes are strictly additive, maintaining backward compatibility for Parts I through IV and the Inserts section.
3. **URL Typo in `card-moran-newell-psychology-hci`**:
   The URL supplied by worker_m1 contains DOI `10.1201/9780203736067`. CrossRef and DOI.org empirically confirm that this DOI does not exist (returns 404). The authentic DOI registered with CrossRef for Card, Moran, and Newell (1983) is `10.1201/9780203736166`. Leaving the typo in place will print a broken QR code and non-resolving link in the book.
4. **Dead Link Redirect in `cagan-svpg-ai-risk`**:
   The URL `https://www.svpg.com/ai-and-product-management/` does not exist on SVPG; the server returns a 301 redirecting to `https://www.svpg.com/`. Readers following this link or scanning its QR code land on the generic SVPG home page rather than Cagan's discussion of the four product risks. The canonical SVPG article is `https://www.svpg.com/four-big-risks/`.

---

## 3. Caveats

- `npm run check` exits cleanly with 0 errors and 61 warnings. The 17 new warnings are expected (8 draft sources marked `verified: false` and cited nowhere until M2/M3 chapters are written).
- The 2 Anthropic URLs (`https://www.anthropic.com/news/prompt-caching` and `https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview`) successfully redirect (308 and 301) to their target content on `claude.com` and `platform.claude.com`. While updating them to their canonical URLs is good practice, they are functional and non-blocking.

---

## 4. Conclusion & Required Changes

**Verdict**: `REQUEST_CHANGES`

Milestone 1 is functionally strong, clean, and strictly additive, but cannot be approved with two broken / redirecting URLs in the canonical bibliography.

### Required Actions for Worker M1:

1. **Fix `card-moran-newell-psychology-hci` URL in `content/sources.yml`**:
   Change line 1696 from:
   ```yaml
   url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736067/psychology-human-computer-interaction-stuart-card-thomas-moran-allen-newell
   ```
   to:
   ```yaml
   url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736166/psychology-human-computer-interaction-stuart-card
   ```
   *(or `https://doi.org/10.1201/9780203736166`)*

2. **Fix `cagan-svpg-ai-risk` URL in `content/sources.yml`**:
   Change line 1674 from:
   ```yaml
   url: https://www.svpg.com/ai-and-product-management/
   ```
   to the authentic canonical article URL:
   ```yaml
   url: https://www.svpg.com/four-big-risks/
   ```

3. *(Optional / Recommended)* Update Anthropic redirects to canonical destinations:
   - Line 1630: `https://claude.com/blog/prompt-caching`
   - Line 1641: `https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview`

Once items 1 and 2 are applied, Milestone 1 will be 100% verified and ready for immediate approval.

---

## 5. Verification Method

To verify the defects and their fixes:

1. **Verify DOI 404 vs 200**:
   ```powershell
   curl.exe -s -o NUL -w "%{http_code}" "https://api.crossref.org/works/10.1201/9780203736067"
   # Output: 404 (Worker M1's current URL)

   curl.exe -s -o NUL -w "%{http_code}" "https://api.crossref.org/works/10.1201/9780203736166"
   # Output: 200 (Authentic DOI)
   ```

2. **Verify SVPG 301 Home Redirect vs 200 Article**:
   ```powershell
   curl.exe -I -s "https://www.svpg.com/ai-and-product-management/"
   # Output: Location: https://www.svpg.com/ (Redirects to home page)

   curl.exe -I -s "https://www.svpg.com/four-big-risks/"
   # Output: HTTP/1.1 200 OK (Authentic Article)
   ```

3. **Verify Linter**:
   ```powershell
   npm run check
   ```
   Confirm 0 errors.
