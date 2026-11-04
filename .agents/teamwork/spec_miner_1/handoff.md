# Handoff Report: Specification Mining for v4 Finance Track (Part VI)

**Agent:** `spec_miner_1` (teamwork_spec_miner)  
**Recipient:** `parent` (`a5372a48-229a-4fc5-8650-1b7734794c36`)  
**Task:** Specification Mining for v4 Finance & Banking Track (Part VI)  
**Deliverable Path:** `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`  

---

## 1. Observation

1. **Mission Brief & Requirements:**
   - In `prompts/06-v4-finance-build.md` (lines 10–72), Part VI (Finance & Banking) is defined with 4 chapters:
     1. `algorithmic-underwriting-and-credit-risk` (prereqs: `[kinds-of-ai, your-documents]`)
     2. `financial-copilots-and-deal-diligence` (prereqs: `[delegation-brief, judging-output]`)
     3. `financial-crime-fraud-and-rbi-free-ai` (prereqs: `[judging-output, models-that-act]`)
     4. `finance-casebook` (prereqs: `[algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]`)
   - Lines 39–72 require adding Part VI to `content/toc.yml` before Inserts, shifting Inserts from `p6` / `VI` to `p7` / `VII`.
   - Lines 111–143 require three specific vector SVG figures in `content/figures/`:
     - `credit-underwriting-stack.svg`
     - `financial-copilot-architecture.svg`
     - `aml-fraud-detection-funnel.svg`
   - Lines 133–143 specify eight quantitative finance cases/guesstimates for `finance-casebook.md`:
     - Case 1: Commercial SME Lending (GSTN statement parsing on ₹10,000 Cr book)
     - Case 2: Private Equity M&A Due Diligence (₹1,500 Cr ARR SaaS acquisition)
     - Case 3: Retail Wealth Management (hybrid robo-advisory economics on ₹40,000 Cr AUM)
     - Case 4: Fraud & AML Operations (false-positive optimization on 250M monthly transactions)
     - Guesstimate 1: Sizing 3-year TCO for on-premise private AI cluster vs cloud API
     - Guesstimate 2: Estimating financial value of automated debt covenant monitoring
     - Guesstimate 3: Valuation impact of AI-driven back-office automation on a mid-sized NBFC
     - Guesstimate 4: Quantifying the capital buffer required for algorithmic trading liquidity shocks

2. **Pedagogical Invariants:**
   - In `docs/PEDAGOGY.md` (lines 21–36) and `docs/AUTHORING.md` (lines 41–55), the mandatory 13-part arc is defined: Opener, Lede, First principles (`::: principle`), Concepts (`::: concept`), Figure (`{{figure id | Caption | Source}}`), Evidence (`::: stat` with `<span class="src">`), Worked case (`::: case Illustrative · ...`), Lenses (`::: lens track`), Interview room (`::: interview`), Try it (`::: try`), Media cards (`{{read/watch/paper ...}}`), Check yourself (`::: check`) + Answers (`::: answers`), Night-before recap (`::: recap The night-before page`).
   - Line 40 of `docs/PEDAGOGY.md` mandates: "One highlight per section, 4–8 per chapter. If everything is highlighted, nothing is."
   - `prompts/06-v4-finance-build.md` line 33 mandates: "Non-technical MBA placement candidate audience. 'Try it' prompts must use zero code (web interfaces, Custom GPTs, Gemini Gems, Claude Projects, Excel formulas)."

3. **Compiler and Linter Invariants:**
   - In `scripts/check.mjs` lines 27–40, source domains are verified against `content/source-policy.yml`. Domains `bis.org` and `ifrs.org` are NOT currently present in `content/source-policy.yml`.
   - In `scripts/check.mjs` lines 50–53:
     `if (/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/.test(textWithoutCode))` triggers a fatal error if escaped HTML tags leak into prose.
   - In `scripts/lib/render.mjs` lines 158–184, KaTeX processes display math (`$$...$$`) and inline math (`$math$`), while skipping plain numbers followed by currency or percent (`$50 billion`, `$3.00`).
   - In `scripts/lib/render.mjs` line 154, `render.mjs` automatically strips literal `∴` in `::: principle` because CSS `::before` injects the symbol.
   - In `book.yml` line 27, the finance track is pre-registered: `{ id: finance, name: Finance, short: FIN }`. Line 5 lists `edition: 2027 · Draft 0.3 (Product Track)`.

4. **TOC & Chapter Counts:**
   - As observed via node script execution: current `content/toc.yml` has 24 chapters across 7 parts (p0..p6).
   - Adding 4 chapters in Part VI brings the compendium to exactly 28 chapters, matching the requirement: "`npm run build` compiles all 28 chapters in < 500 ms".

---

## 2. Logic Chain

1. From Observation 1, the track scope is precisely bounded: 4 chapters, 3 SVG figures, 8 quantitative cases, and Part VI/Part VII TOC reorganization.
2. From Observation 2 and 3, any violation of pedagogical density (such as highlights outside [4..8], stat blocks $\ne 1$, media cards outside [1..3], check questions outside [4..6], or recap lines $\ne 5$) will fail automated regression tests.
3. From Observation 3, placing KaTeX math in container block headers (`::: concept ...`, `::: case ...`) causes `md.renderInline` to escape HTML tags (`<` to `&lt;`), causing `scripts/check.mjs` to fail. Therefore, headers must remain strictly plaintext, while math is kept in block bodies.
4. From Observation 3, `content/source-policy.yml` must be updated with `bis.org` and `ifrs.org` under Tier A, otherwise `scripts/check.mjs` will flag missing policy domains for canonical BIS and IFRS sources.
5. From Observation 4, the build and compilation targets 28 chapters, compiling into an updated HTML web distribution and a unified A4 publication PDF (`editions/INFERENCE-v4-finance-draft.pdf`).

---

## 3. Caveats

1. **Domain Policy Tiering:** While `bis.org` and `ifrs.org` are primary international standard-setters (qualifying as Tier A), `jpmorgan.com` could be treated as Tier B or Tier A depending on whether J.P. Morgan AI Research papers are hosted on `arxiv.org` (Tier A) or `jpmorgan.com`. The recommendation in `report.md` uses `arxiv.org` for J.P. Morgan AI research to guarantee unquestioned Tier A status.
2. **Casebook Scope:** `finance-casebook.md` contains 8 quantitative problems (4 full strategic cases + 4 quantitative estimation models). Due to the extensive calculations, its word count is expected to be ~3,500–5,000 words, exceeding regular chapter targets (~2,000–3,500 words), consistent with existing casebooks (`product-casebook.md` and `marketing-casebook.md`).

---

## 4. Conclusion

All specifications, architectural boundaries, pedagogical rules, mathematical equations, SVG visual layouts, and test criteria for the v4 Finance & Banking Track (Part VI) have been fully mined and documented in `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`. The downstream implementation agents (Researcher, Author, Auditor, Build Engineer) have an exhaustive, verifiable roadmap.

---

## 5. Verification Method

To verify the mined specifications and system state:
1. **Inspect Report:** Open and review `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md` (opened in Zed).
2. **Validate Current Linter Baseline:**
   ```powershell
   node scripts/check.mjs
   ```
   (Confirm current 24 chapters pass cleanly with 0 errors).
3. **Verify Chapter Count Baseline:**
   ```powershell
   node -e "import('js-yaml').then(y => { const fs = require('node:fs'); const t = y.load(fs.readFileSync('content/toc.yml', 'utf8')); let c = 0; t.parts.forEach(p => c += p.chapters.length); console.log('Current chapters:', c); });"
   ```
   (Confirms current 24 chapters; post-build will equal 28).
