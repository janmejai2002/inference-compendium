# Status

_Last updated 2026-10-31, setup session._

## Where we are
- **Pipeline: working.** Markdown → web edition, A4 print book (Paged.js), PDF with bookmarks and clickable contents, design book. `npm run pdf` takes ~5 s.
- **Design: v0.1 decided.** Identity, type, colour, page grid, 14 teaching components, 4 social stills. See `dist/design.html` and `docs/DESIGN.md`.
- **Content: one sample chapter** (`what-is-a-model`, marked `sample: true`) exists to exercise every component. The TOC in `content/toc.yml` is a **placeholder**.
- **Sources: 6 in the registry, 0 verified.** Run `/verify-sources` before relying on any of them.
- First edition snapshot: `editions/INFERENCE-design-0.1.pdf`.

## Next
1. **TOC session** (`/toc`, or paste `prompts/01-toc-session.md` into a new chat). Phase 1 = it interviews you.
2. Name: confirm or replace the working title "INFERENCE" (`book.yml`).
3. Verify the six sample sources (`/verify-sources`).
4. Then one `/chapter <id>` session per chapter.

## Open questions for the editors
- Final name; one book vs core book + track supplements; target length.
- Who else contributes, and does everyone work through pull requests?
- Print: will the campus shop print colour, or must the book work in black and white? (Thumb tabs and highlights are designed to survive B&W.)

## Design backlog
- An "advance organiser" chapter map on the opener page (the empty middle of the opener page is reserved for it).
- Motion versions of the social stills.
- Web edition: per-chapter OG images for link previews.
