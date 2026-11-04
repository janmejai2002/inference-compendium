# Changes Record — worker_ch3 (Chapter 24)

## File Modified
- `content/chapters/financial-crime-fraud-and-rbi-free-ai.md` (Created/Authored)

## Summary of Changes
1. **Frontmatter**:
   - `id: financial-crime-fraud-and-rbi-free-ai`
   - `title: "Financial crime, fraud, and the regulatory boundary: RBI FREE-AI, AML, and explainability"`
   - `deck: "Mule accounts and real-time transaction laundering on UPI, the base rate fallacy in fraud alerts, RBI FREE-AI governance principles, SEBI algorithmic trading safeguards, and DPDP financial data sovereignty."`
   - `level: Zero to one`
   - `part: p6`
   - `track: finance`
   - `tracks: [finance]`
   - `status: published`
   - `order: 24`
   - `prereq: [judging-output, models-that-act]`
   - `hook: "In 45 minutes, a coordinated cyber-syndicate routes ₹120 crore through 8,000 mule accounts across 12 digital payment apps. Legacy rules flag 15%; Graph AI identifies 88%—while generating 40,000 false alarms."`
   - 4 Bloom-taxonomy objectives starting with bold verbs (`**Expose**`, `**Analyze**`, `**Deconstruct**`, `**Synthesize**`).
   - `keywords: fraud detection, base rate fallacy, mule account detection, RBI FREE-AI, graph neural networks, suspicious transaction report, DPDP localization`
   - `audio: false`

2. **13-Part Pedagogical Arc**:
   - **Opener & Lede**: Grounded in an actual ₹120 crore corporate compromise moving through 8,000 mule accounts in 45 minutes across Indian retail banking rails (UPI, IMPS).
   - **Core Thesis**: Highlighted using Mayer signaling (`==...==`).
   - **Principle Block**: `::: principle The base rate dilemma and asymmetric loss` with 5 foundational steps.
   - **The Base Rate Fallacy Section**: Bayes' theorem mathematical formulation and proof showing how a 99% accurate model operating in a 0.01% fraud prevalence environment collapses to 0.98% posterior precision. Includes a 2x2 confusion matrix table for 40M daily transactions.
   - **Asymmetric Loss Modeling**: Formulation of operational loss function $\mathcal{L}(\theta) = C_{\text{FP}} \cdot \text{FPR}(\theta) \cdot (1 - \pi) + C_{\text{FN}} \cdot (1 - \text{TPR}(\theta)) \cdot \pi$ and derivation of optimal decision boundary $\theta^*$.
   - **Concept 1**: `::: concept The base rate fallacy in fraud detection` (Plain words, Analogy, Misconception).
   - **Mule Networks & Graph Anomaly Section**: Graph representation of payment systems as dynamic multigraphs $G = (V,E,\mathcal{T})$, spatial-temporal GNN message passing formulation, cyclic transaction loops ($A \to B \to C \to A$), liquidity velocity $R_{\text{velocity}}$, and the RBI MuleHunter.AI initiative expanding to 21 commercial banks.
   - **Concept 2**: `::: concept Mule accounts and graph topology` (Plain words, Analogy, Misconception).
   - **Figure Embedding**: `{{figure aml-fraud-detection-funnel ...}}`.
   - **The 5-Stage Screening Funnel**: Streaming ingress $\to$ Heuristic velocity filters $\to$ In-memory GNN anomaly engine $\to$ Calibrated Bayesian filter $\to$ Generative AI STR narrative dossier synthesis $\to$ Statutory Principal Officer sign-off under PMLA Section 12.
   - **Stat Block**: `::: stat 0.98% & 98.4%` with source citations `<span class="src">Sources: [@rbi-dev-reg-policies-2024-12]; [@npci-upi-procedural-guidelines-2024]</span>`.
   - **RBI FREE-AI Regulatory Governance**: Detailed analysis of the 2025 FREE-AI report and the 7 Sutras (Fairness, Accountability, Transparency, Resilience, Consumer Protection, Privacy, Ethical Enablement), accompanied by a GFM compliance table.
   - **Concept 3**: `::: concept The RBI FREE-AI framework` (Plain words, Analogy, Misconception).
   - **Data Sovereignty & Algorithmic Trading**: DPDP Act 2023 Section 16, RBI 2018 Payment Data Storage Directive (cross-border payload restrictions), and SEBI algorithmic trading directives / Circular CIR/P/2019/26 quarterly AI reporting.
   - **Worked Case**: `::: case Illustrative · Real-time UPI mule ring detection at an Indian payment gateway` (40M tx/day, ₹50 crore attack, GNN containment preserving ₹43.5 crore, 0.004% FPR).
   - **Three Lenses**: `::: lens finance`, `::: lens consulting`, `::: lens strategy`.
   - **Interview Room**: `::: interview Defending an adverse action model before the RBI regulator`.
   - **Try It**: `::: try Calibrating a fraud detection decision threshold under asymmetric loss` (Zero code; Excel / Claude / ChatGPT exercise).
   - **Recommended Media Cards**: `{{read rbi-free-ai-2025}}` and `{{read sebi-algo-trading-consultation-2021}}`.
   - **Check Yourself**: 5 Bloom-tagged questions (`recall`, `explain`, `apply`, `transfer`, `judge`).
   - **Reverse Answers**: 5 corresponding rigorous mathematical and regulatory answers.
   - **Recap**: `::: recap The night-before page` with exactly 5 numbered lines.

3. **Invariants Enforced**:
   - Highlight count: exactly 6 highlights (`==...==`), compliant with [4..8] bound.
   - Stat block count: exactly 1, with plain text header (no LaTeX `$`).
   - Plain text headers across all `::: concept`, `::: case`, `::: stat` blocks (zero escaped HTML tag leaks).
   - GFM markdown tables with proper alignments.
   - High-integrity anti-ai-writing tone (zero banned clichés, bursty sentence structures, empirical Indian banking specifics).
