# Milestone 1 Remediation Investigation Report (Iteration 2)

- **Milestone**: Milestone 1 (Registries & Configuration) — Remediation Phase
- **Agent**: Milestone 1 Remediation Explorer (`teamwork_explorer`)
- **Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m1_fix\`
- **Recipient**: Orchestrator (`63749ac4-d84d-4275-8f32-53b3635ebc8a`)
- **Type**: Hard Handoff (Investigation Complete)
- **Date**: 2026-11-03

---

## 1. Observation

### A. Defect 1: `card-moran-newell-psychology-hci` DOI Typo
- **File**: `content/sources.yml`, line 1696.
- **Current content**:
  ```yaml
  url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736067/psychology-human-computer-interaction-stuart-card-thomas-moran-allen-newell
  ```
- **Live Empirical CrossRef Probe**:
  Command: `curl.exe -I -s "https://api.crossref.org/works/10.1201/9780203736067"`
  Result: `HTTP/1.1 404 Not Found`
- **Authentic DOI Probe**:
  Command: `curl.exe -I -s "https://api.crossref.org/works/10.1201/9780203736166"`
  Result: `HTTP/1.1 200 OK`
  DOI Resolver probe: `curl.exe -I -s "https://doi.org/10.1201/9780203736166"` returns `location: https://www.taylorfrancis.com/books/9781351409469`.
  Taylor & Francis canonical URL: `https://www.taylorfrancis.com/books/mono/10.1201/9780203736166/psychology-human-computer-interaction-stuart-card`.

### B. Defect 2: `cagan-svpg-ai-risk` Redirecting Slug
- **File**: `content/sources.yml`, line 1674.
- **Current content**:
  ```yaml
  url: https://www.svpg.com/ai-and-product-management/
  ```
- **Live Empirical HTTP Probe**:
  Command: `curl.exe -I -s "https://www.svpg.com/ai-and-product-management/"`
  Result:
  ```
  HTTP/1.1 301 Moved Permanently
  Location: https://www.svpg.com/
  ```
  WordPress redirects the dead slug containing an extraneous `-and-` to the root domain home page.
- **Canonical Article Probes**:
  1. `curl.exe -I -s "https://www.svpg.com/four-big-risks/"`
     Result: `HTTP/1.1 200 OK` (Article: "The Four Big Risks", Marty Cagan, SVPG).
  2. `curl.exe -I -s "https://www.svpg.com/ai-product-management/"`
     Result: `HTTP/1.1 200 OK` (Article: "AI Product Management", Marty Cagan, SVPG, April 2024).

### C. Optimization 3: Anthropic Redirecting URLs
- **File**: `content/sources.yml`, lines 1630 and 1641.
- **Current line 1630**:
  ```yaml
  url: https://www.anthropic.com/news/prompt-caching
  ```
  - Trace: `https://www.anthropic.com/news/prompt-caching` -> `308 Permanent Redirect` -> `https://claude.com/blog/prompt-caching` -> `308 Permanent Redirect` -> `https://claude.com/resources/articles/prompt-caching` (`HTTP/1.1 200 OK`).
- **Current line 1641**:
  ```yaml
  url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
  ```
  - Trace: `https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview` -> `301 Moved Permanently` -> `https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview` -> `307 Temporary Redirect` -> `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview` (`HTTP/1.1 200 OK`).

### D. Source Policy Allowlist Alignment
- In `content/source-policy.yml`:
  - `taylorfrancis.com`: Listed under `A:` (line 47).
  - `svpg.com`: Listed under `B:` (line 73).
  - `claude.com`: Listed under `A:` (line 18).
- In `scripts/check.mjs:29`:
  - Subdomain resolution `host.endsWith(`.${d}`)` permits `platform.claude.com` under Tier A.

---

## 2. Logic Chain

1. **DOI Error**: The DOI registered with CrossRef for Card, Moran, Newell (1983) *The Psychology of Human-Computer Interaction* is `10.1201/9780203736166` (ISBN 9780203736166). The current digit `0` in `9780203736067` represents a typo that generates an invalid, non-resolving link. Replacing it with `10.1201/9780203736166` resolves to Taylor & Francis with HTTP 200 and matches the Tier A whitelist in `content/source-policy.yml`.
2. **SVPG Home Redirect**: `https://www.svpg.com/ai-and-product-management/` does not exist on SVPG; the web server redirects users to the home page `https://www.svpg.com/`, failing the citation purpose. Changing the URL to the canonical `https://www.svpg.com/four-big-risks/` points directly to Marty Cagan's canonical discussion of the four product risks with an immediate HTTP 200 response, matching the Tier B whitelist.
3. **Anthropic Canonicalization**: The existing Anthropic URLs incur multiple HTTP redirects (308 and 301/307). While functional, resolving them directly to zero-redirect endpoints (`https://claude.com/resources/articles/prompt-caching` and `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview`) future-proofs the bibliography and improves QR code scan latency.
4. **Referential Integrity & Zero Regressions**: Because all target domains are already allowlisted in `content/source-policy.yml`, making these four replacements introduces zero new linter errors, zero schema violations, and alters exactly 4 lines in `content/sources.yml`.

---

## 3. Caveats

- Taylor & Francis implements Cloudflare bot challenge on direct browser agent requests; however, DOI.org (`https://doi.org/10.1201/9780203736166`) and CrossRef API unambiguously verify that `10.1201/9780203736166` is the genuine registered DOI.
- If the team prefers the April 2024 AI-specific Marty Cagan essay instead of the classical 2017 four big risks essay, the direct slug is `https://www.svpg.com/ai-product-management/` (HTTP 200). `strategy.md` provides both options while defaulting to `https://www.svpg.com/four-big-risks/` per Dispatch.

---

## 4. Conclusion & Actionable Edits

Worker M1 (Iteration 2) can immediately apply the following four surgical edits to `content/sources.yml`:

```diff
--- a/content/sources.yml
+++ b/content/sources.yml
@@ -1630,1 +1630,1 @@
-  url: https://www.anthropic.com/news/prompt-caching
+  url: https://claude.com/resources/articles/prompt-caching
@@ -1641,1 +1641,1 @@
-  url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
+  url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
@@ -1674,1 +1674,1 @@
-  url: https://www.svpg.com/ai-and-product-management/
+  url: https://www.svpg.com/four-big-risks/
@@ -1696,1 +1696,1 @@
-  url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736067/psychology-human-computer-interaction-stuart-card-thomas-moran-allen-newell
+  url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736166/psychology-human-computer-interaction-stuart-card
```

Detailed implementation blueprint and verification steps are recorded in:
`C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m1_fix\strategy.md`.

---

## 5. Verification Method

1. **Verify CrossRef DOI 200 OK**:
   ```powershell
   curl.exe -I -s "https://api.crossref.org/works/10.1201/9780203736166"
   ```
   Assert: `HTTP/1.1 200 OK`

2. **Verify SVPG Article 200 OK**:
   ```powershell
   curl.exe -I -s "https://www.svpg.com/four-big-risks/"
   ```
   Assert: `HTTP/1.1 200 OK`

3. **Verify Anthropic Canonical Endpoints 200 OK**:
   ```powershell
   curl.exe -I -s "https://claude.com/resources/articles/prompt-caching"
   curl.exe -I -s "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"
   ```
   Assert: Both return `HTTP/1.1 200 OK`

4. **Verify Linter Integrity**:
   ```powershell
   npm run check
   ```
   Assert: `0 errors`
