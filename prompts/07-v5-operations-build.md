# v5 Build: Operations & Supply Chain Track (End-to-End Execution Prompt)

> **How to run:**
> 1. Type `/clear` in chat.
> 2. Run:
>    ```
>    /goal Execute the full end-to-end build of the Operations & Supply Chain Track (Part VII, Chapters 26–29) following all specifications, governance rules, and verification checklists in prompts/07-v5-operations-build.md. Research sources, author chapters and SVG figures, update content/toc.yml, content/sources.yml, glossary.yml, and book.yml, run npm run check and test/inspect_figures.mjs, re-compile the publication PDF, snapshot to editions/, and commit and push to main.
>    ```

---

## Mission Brief

You are building **v5 of INFERENCE**, expanding the compendium to include the complete **Operations & Supply Chain Track (`OPS`)**.
- v1 established Foundations (Parts 0 & I) and Consulting (Parts II & III);
- v2 delivered Marketing & Brand Strategy (Part IV);
- v3 delivered Product Management (Part V);
- v4 delivered Finance & Banking (Part VI).

Your objective is to design, research, author, verify, and compile **Part VII: Operations & Supply Chain** into the publication pipeline with zero errors, producing an updated web edition, an updated A4 print edition, and a verified publication PDF.

---

## 1. Table of Contents Specification: Part VII (Operations & Supply Chain)

Add Part VII to [`content/toc.yml`](../content/toc.yml) before Inserts (shifting Inserts to Part VIII):

```yaml
  - id: p7
    n: VII
    title: Operations & Supply Chain
    track: operations
    deck: Predictive maintenance, probabilistic demand sensing, warehouse robotics, and the operations casebook.
    chapters:
      - id: predictive-maintenance-and-industrial-ai
        title: "Predictive maintenance, industrial IoT, and digital twins: from reactive downtime to remaining useful life"
        deck: "Sensor fusion, acoustic and vibration telemetry, Weibull hazard rate modeling, remaining useful life (RUL) estimation, and OEE optimization in heavy manufacturing and plant operations."
        tracks: [operations]
        prereq: [kinds-of-ai, your-documents]
        status: draft
      - id: supply-chain-planning-and-autonomous-replenishment
        title: "Supply chain planning & demand sensing: dampening the bullwhip effect with probabilistic models"
        deck: "Hierarchical time-series forecasting, cracking multi-echelon inventory safety stocks, real-time demand sensing vs. legacy SAP/ERP batch runs, multimodal logistics optimization (PM GatiShakti), and cold-chain integrity."
        tracks: [operations, strategy]
        prereq: [next-word-machine, pilots-stall]
        status: draft
      - id: warehouse-automation-and-physical-ai
        title: "Warehouse automation, computer vision, and physical AI: dark stores, AMRs, and quality gates"
        deck: "Automated optical inspection (AOI) on high-speed lines, Autonomous Mobile Robots (AMRs) and SLAM navigation, dark store picking ergonomics in quick-commerce (Blinkit/Zepto), and human-robot collaboration."
        tracks: [operations]
        prereq: [models-that-act, judging-output]
        status: draft
      - id: operations-casebook
        title: "The Operations AI casebook & interview room"
        deck: "Eight fully-worked quantitative operations cases and guesstimates covering plant downtime ROI, dark store micro-fulfillment economics, multi-echelon safety stock sizing, AOI computer vision quality gates, and automated logistics routing."
        tracks: [operations]
        prereq: [predictive-maintenance-and-industrial-ai, supply-chain-planning-and-autonomous-replenishment, warehouse-automation-and-physical-ai]
        status: draft
```

And update `book.yml` if necessary to ensure `operations` track styling and filters are activated.

---

## 2. Governance & Constraints (Zero Violations)

1. **Pedagogical Standard:** Every chapter must strictly follow [`docs/PEDAGOGY.md`](../docs/PEDAGOGY.md) and [`docs/AUTHORING.md`](../docs/AUTHORING.md).
   - Mandatory 13-part chapter arc:
     - Opener (`hook`, `objectives`)
     - Lede with highlighted thesis (`==...==`)
     - First principles (`::: principle`)
     - Concepts (`::: concept`)
     - Scale/complication with SVG figure (`::: figure ...` linking to `content/figures/<id>.svg`)
     - Cited evidence
     - Worked case (`::: case Illustrative · ...`)
     - Domain lenses (`::: lens ...`)
     - Interview room question + strong structure (`::: interview ...`)
     - Try it prompt (`::: try ...`) (Zero code! No terminal commands or Python for candidates)
     - Watch/Read cards (`{{watch ...}}` / `{{read ...}}`)
     - Check yourself with upside-down answers (`::: check ...` + `::: answers`)
     - Night-before page (`::: recap The night-before page`)
2. **Evidence & Truth:** Follow [`docs/SOURCES.md`](../docs/SOURCES.md).
   - Every single statistic, case study, formula, or benchmark must exist in [`content/sources.yml`](../content/sources.yml) with an assigned Tier (`A` or `B`) and be cited inline (`[@id]`) or as a media card.
   - Any scenario without a primary source citation must be explicitly labeled `Illustrative`.
   - Ingest primary canonical sources: World Economic Forum (WEF) Global Lighthouse Network studies, McKinsey Manufacturing & Supply Chain Operations research, Amazon Robotics / Kiva warehouse telemetry, PM GatiShakti National Master Plan logistics reports, IEEE Industrial Electronics papers on RUL, and ASCM/APICS benchmarks.
3. **Prose & Anti-AI Standard:** Apply [`anti-ai-writing`](C:/Users/Janmejai/.claude/skills/anti-ai-writing/SKILL.md).
   - Zero generic AI buzzwords ("delve", "testament", "tapestry", "game changer", "revolutionize").
   - Concrete Indian and global industrial contexts (Tata Steel Kalinganagar, Maruti Suzuki Manesar, Mahindra Chakan, Reliance Retail, Blinkit dark stores, Zepto, Amazon Fulfilment Centres, Maersk, Foxconn, Siemens Amberg).
   - High perplexity, sharp active verbs, short punchy topic sentences.
4. **Rendering & Math Discipline:**
   - All equations (Overall Equipment Effectiveness $OEE = Availability \times Performance \times Quality$, Weibull hazard function $h(t)$, Mean Time Between Failures $MTBF$, Safety Stock $SS = Z \times \sqrt{L \sigma_D^2 + D^2 \sigma_L^2}$, Economic Order Quantity $EOQ$, Pick cycle-time bounds) must use standard LaTeX math (`$$...$$` for display, `$p$` for inline) to render via KaTeX.
   - All comparison grids must use standard Markdown tables (`| ... |`). Never use fenced code blocks for tables.
5. **Diagram Overflow Prevention (Strict):**
   - Each new SVG created in `content/figures/` (`predictive-maintenance-architecture.svg`, `supply-chain-replenishment-funnel.svg`, `warehouse-robotics-spatial-ai.svg`, `operations-casebook-taxonomy.svg`) must strictly adhere to the `viewBox="0 0 640 H"` layout rules.
   - Keep right-column text starting at $x \ge 350$ under 45 characters per line, font-size $\le 8.5\text{pt}$, and test with `node test/inspect_figures.mjs` to ensure **0 overflows**.

---

## 3. Detailed Chapter Blueprints

### Chapter 26: Predictive Maintenance, Industrial IoT, and Digital Twins (`predictive-maintenance-and-industrial-ai`)
- **Core Thesis:** ==Unplanned industrial downtime is not an unavoidable cost of manufacturing; it is an information failure caused by treating continuous sensor streams as discrete maintenance logs.==
- **Key Concepts:**
  - Acoustic and vibration frequency spectra: FFT (Fast Fourier Transform) anomaly detection before thermal degradation occurs.
  - Remaining Useful Life (RUL) estimation using Weibull hazard curves and survival analysis.
  - Overall Equipment Effectiveness (OEE): Decomposing Availability, Performance, and Quality losses.
  - Digital twins vs. static SCADA: Synchronous state simulation vs. passive alarm dashboards.
- **Worked Case:** Tata Steel Kalinganagar blast furnace hot-strip mill vibration monitoring preventing a ₹14.8 Cr bearing seizure.
- **SVG Diagram:** `content/figures/predictive-maintenance-architecture.svg` (Edge IoT ingestion → Vibration FFT/Acoustic encoder → RUL Weibull engine → Automated work order trigger).

### Chapter 27: Supply Chain Planning & Demand Sensing (`supply-chain-planning-and-autonomous-replenishment`)
- **Core Thesis:** ==The bullwhip effect is amplified by batch planning cycles; foundation models convert disparate external signals into continuous probabilistic demand sensing that compresses working capital.==
- **Key Concepts:**
  - Multi-echelon inventory optimization (MEIO): Calculating safety stock when lead times and demand distributions are both stochastic.
  - The Bullwhip Effect (Forrester Effect): How order batching, price fluctuations, and rationing games multiply variance up the supply chain.
  - Demand Sensing vs. Demand Forecasting: Ingesting high-frequency real-time signals (weather, footfalls, hyper-local search, festivals) vs. monthly autoregressive ERP models.
  - Indian Logistics & Infrastructure: PM GatiShakti multi-modal routing, ONDC logistics layer, FASTag toll telemetry, and cold-chain temperature excursion alerts.
- **Worked Case:** FMCG distributor supply chain across 1,400 tier-2/tier-3 cities in India, slashing inventory holding days from 42 to 24 days while maintaining a 98.5% fill rate.
- **SVG Diagram:** `content/figures/supply-chain-replenishment-funnel.svg` (Macro external demand signals → Hierarchical time-series transformer → MEIO safety stock allocator → ERP execution).

### Chapter 28: Warehouse Automation, Computer Vision, and Physical AI (`warehouse-automation-and-physical-ai`)
- **Core Thesis:** ==Physical AI in operations is bounded not by compute or sensor resolution, but by spatial coordination, edge latency, and human-in-the-loop ergonomics.==
- **Key Concepts:**
  - Autonomous Mobile Robots (AMRs) vs. Automated Guided Vehicles (AGVs): Natural feature SLAM (Simultaneous Localization and Mapping) vs. fixed floor magnets.
  - Dark Store Micro-Fulfillment: The mathematical mechanics of sub-10-minute quick commerce (Blinkit, Zepto, Instamart) — zoning, picking paths, batched order consolidation, and dispatch staging.
  - Automated Optical Inspection (AOI): High-speed line computer vision defect detection, false rejection rate (Type I error) vs. customer escape rate (Type II error) trade-offs.
  - Ergonomics & Physical Safety: Cobots, pick-to-light HUDs, and the limits of warehouse labor augmentation.
- **Worked Case:** High-speed packaging line defect inspection in automotive electronics running at 1,200 parts/minute with sub-5ms edge inference.
- **SVG Diagram:** `content/figures/warehouse-robotics-spatial-ai.svg` (Inbound unloading → AMR fleet coordination → Vision QA inspection gate → Dynamic pick & pack staging).

### Chapter 29: The Operations AI Casebook & Interview Room (`operations-casebook`)
- **Core Format:** Eight worked quantitative problems with recruiter evaluation rubrics and model answers.
- **The 4 Strategic Cases:**
  1. *Automotive OEM Predictive Maintenance:* Sizing the ROI of acoustic sensors across 42 robotic weld stations (unplanned downtime cost ₹1.8 Lakh/minute).
  2. *Quick-Commerce Dark Store Optimization:* Redesigning dark store picking topology and safety stock buffers for 1,200 SKUs under 8-minute delivery constraints.
  3. *Chemical Process Plant Yield Optimization:* Multi-variable batch reactor optimization with Bayesian parameter tuning to reduce energy consumption by 14%.
  4. *Cold-Chain Pharmaceutical Logistics:* Real-time temperature excursion monitoring and dynamic rerouting across 3,000 vaccine distribution routes.
- **The 4 Quantitative Guesstimates:**
  1. *AMR Fleet Sizing:* Sizing the robotic fleet needed to handle 150,000 daily order picks in a 400,000 sq ft fulfillment center.
  2. *Defect Inspection Computer Vision TCO:* Comparing edge cameras ($12k/line) vs. manual visual inspection labor over a 3-year horizon.
  3. *Safety Stock Working Capital Savings:* Calculating working capital released by cutting lead-time standard deviation by 35% across a ₹500 Cr inventory base.
  4. *Logistics Route Dynamic Dispatch Savings:* Fuel and turnaround time savings from dynamic route clustering vs. fixed static milk runs.
- **Interview Room:** McKinsey Operations / Amazon Pathways / Kearney recruiter question bank with high-scoring vs. mediocre response breakdowns.
- **SVG Diagram:** `content/figures/operations-casebook-taxonomy.svg` (The 4 strategic operational cases on the left, 4 quantitative estimation models on the right).

---

## 4. Verification & Release Checklist

After authoring and integrating the 4 chapters:
1. `npm run check` passes with **0 errors**.
2. Run `node test/inspect_figures.mjs` to verify **0 overflows** across all SVG figures.
3. Run `node scripts/pdf.mjs --no-shots` (or `npm run pdf`) to generate the complete compiled PDF.
4. Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v5-operations-draft.pdf`.
5. Update `STATUS.md` with the new chapter count (32/32 published), word counts, and page metrics.
6. Commit all changes:
   ```powershell
   git add content/ chapters/ design/ editions/ notes/ prompts/ STATUS.md
   git commit -m "feat(ops): add Operations & Supply Chain Track (Part VII, Chapters 26-29) end-to-end"
   git push origin main
   ```
