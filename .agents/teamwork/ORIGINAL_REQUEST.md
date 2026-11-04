# Original User Request

## Parameters

[skip-interview]
How this run was launched; not part of the task.

## Initial Request — 2026-11-03 08:07:52 UTC

You are executing the v3 expansion of INFERENCE for the Product Management Track (PM) end-to-end.

    Integrity: Strictly additive as Part V (keep existing v1 Foundations/Consulting and v2 Marketing chapters and registries untouched).

    1. Canon & Primary Sources:
       - Ingest primary sources: OpenAI Evals framework, Anthropic Prompt Engineering & Context Caching technical papers, Google Gemini
       Long-Context system design papers, Marty Cagan / Silicon Valley Product Group AI PM frameworks.
       - Append to content/sources.yml (Tier A/B, types, URLs).
       - Append PM glossary terms to content/glossary.yml (eval-harness, synthetic-evals, latency-budget, context-caching, model-routing,
       agentic-ux).

    2. Table of Contents & Chapter Authoring:
       - Add Part V: Product Management to content/toc.yml (track: product).
       - Draft 4 chapters adhering strictly to docs/PEDAGOGY.md and docs/AUTHORING.md:
         a) ai-product-lifecycle.md: Evals as product specs, golden test suites, LLM-as-a-judge, drift.
         b) product-architecture-economics.md: Latency budgets, context caching cost models, routing, build vs buy.
         c) agentic-ux-and-interfaces.md: Ambient UI, proactive HUDs, conversational vs canvas, human-in-the-loop.
         d) product-casebook.md: 8 fully-worked quantitative PM cases and estimation problems.

    3. Editorial & Verification:
       - Enforce anti-ai-writing, KaTeX math ($$...$$ and $math$), and standard GFM pipe tables.
       - 4-8 highlights (==...==), 1-3 media cards, 1 stat block (plain numbers/lining-nums only), 4-6 check questions + upside-down answers, and
       5-line recap.
       - Update book.yml edition to "2027 · Draft 0.3 (Product Track)".
       - Run npm run check (0 errors), npm run build, and npm run pdf.
       - Copy dist/INFERENCE.pdf to editions/INFERENCE-v3-product-draft.pdf, update STATUS.md, and commit:
         `feat(product): complete v3 product track and integrate into compendium`
