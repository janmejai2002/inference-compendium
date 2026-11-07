Review everything about the whole book so far critically with a council of specialized review agents and do the relevant improvements across the 28 chapters of INFERENCE — The AI Compendium.

Working directory: C:\Users\Janmejai\compendium
Integrity mode: development

## Requirements

### R1. Critical Defect Remediation & Citation Verification
Prioritize and resolve all critical defects across the 28 chapters of the compendium:
- Hunt and verify primary sources for the 28 unverified sources recorded in `STATUS.md` in accordance with `docs/SOURCES.md` tier policy; replace or refine any claims that cannot be grounded in primary literature.
- Eliminate all KaTeX formatting and rendering leakages (enforcing strict `$$...$$` block and `$math$` inline syntax).
- Verify mathematical correctness and enforce math invariants across all chapters.

### R2. Council Review Across Pedagogy, Voice, and Formatting
Form an adversarial council of specialized review agents to audit the entire book and implement surgical refinements:
- Verify chapter structures against the 13-part chapter arc defined in `docs/PEDAGOGY.md`.
- Ensure adherence to editorial voice and anti-ai writing standards (concrete voice, high perplexity, no AI slop).
- Enforce typography, design rules (`docs/DESIGN.md`), and standard GFM tables (no fenced ASCII tables).

### R3. Quality Assurance and Git Delivery
Validate the complete repository state:
- Ensure 0 errors on `npm run check`.
- Verify successful compilation of `npm run build` and `npm run pdf`.
- Update `STATUS.md` to reflect audited chapters, resolved citations, and remaining work.
- Deliver all verified improvements as direct commit(s) on the current working branch, leaving a clean working tree.

## Verification Resources
- `docs/PEDAGOGY.md`: 13-part chapter arc standard
- `docs/AUTHORING.md`: Chapter authoring guidelines
- `docs/SOURCES.md`: Citation tier policy and source verification rules
- `docs/DESIGN.md`: Typography, formatting, and rendering standards
- Build scripts: `npm run check`, `npm run build`, `npm run pdf`

## Acceptance Criteria

### Verification & Build
- [ ] `npm run check` passes with 0 errors
- [ ] `npm run build` completes successfully with 0 build errors
- [ ] `npm run pdf` produces the compiled PDF output without fatal build errors

### Critical Defects & Integrity
- [ ] KaTeX syntax errors and formatting leaks are eliminated across all chapters
- [ ] Mathematical calculations, formulas, and invariants across all chapters are verified correct
- [ ] The 28 unverified sources in `STATUS.md` are audited, with primary sources verified or ungrounded claims refined
- [ ] Tables conform to standard GFM table format with no fenced ASCII tables
- [ ] Editorial tone aligns with anti-ai writing standards and docs/PEDAGOGY.md guidelines

### Project Tracking & Version Control
- [ ] `STATUS.md` is updated with audit outcomes and resolved source statuses
- [ ] All improvements are committed to the current working branch with a clean working tree
