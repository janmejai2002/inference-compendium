# Status

_Last updated 2026-10-31, setup session (2): name confirmed, B&W proofing, research tools, project skills._

## Where we are
- **Pipeline: working.** Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable contents, design book. `npm run pdf` takes ~5 s.
- **Design: v0.1 decided.** Identity, type, colour, page grid, 14 teaching components, 4 social stills. See `dist/design.html` and `docs/DESIGN.md`.
- **Content: one sample chapter** (`what-is-a-model`, marked `sample: true`) exists to exercise every component. The TOC in `content/toc.yml` is a **placeholder**.
- **Sources: 6 in the registry, 0 verified.** Run `/verify-sources` before relying on any of them.
- First edition snapshot: `editions/INFERENCE-design-0.1.pdf`.

## Next
1. **TOC discussion** (`/toc` in Claude Code here). Open-ended, research-backed, builds nothing; state lives in `notes/toc/DISCUSSION.md`. Run as many sessions as needed, then `/toc-compile`.
2. Invite the co-editor to the GitHub repo once we have their username.
3. Verify the six sample sources (`/verify-sources`).
4. Then one `/chapter <id>` session per chapter.

## Open questions for the editors
- Name: **INFERENCE**, confirmed 2026-10-31.
- One book vs core book + track supplements; target length. (For the TOC discussion.)
- Who else contributes, and does everyone work through pull requests?
- Print: campus shops mostly print **B&W**; online editions stay colour. Design unchanged, proofed with `npm run proof:bw` (see docs/DESIGN.md).

## Design backlog
- An "advance organiser" chapter map on the opener page (the empty middle of the opener page is reserved for it).
- Motion versions of the social stills.
- Web edition: per-chapter OG images for link previews.
