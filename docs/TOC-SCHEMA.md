# content/toc.yml schema

`content/toc.yml` drives the build: contents page, part openers, thumb tabs, reading paths and `npm run status`. Written by `/toc-compile` (from `notes/toc/DISCUSSION.md`) or `/toc-import` (from another chat).

```yaml
parts:
  - id: p1                 # short, stable
    n: I                   # roman numeral shown on the part opener
    title: How the machine thinks
    track: foundations     # one of: foundations consulting marketing product operations finance hr strategy
    deck: One-line promise of the part.
    chapters:
      - id: what-is-a-model          # kebab-case, stable forever (it becomes the filename)
        title: What is a model, really?
        deck: One-sentence promise.
        track: foundations           # optional; defaults to the part's track
        tracks: [consulting, marketing]   # other lenses
        prereq: []                   # chapter ids
        questions:                   # interview questions this chapter equips for
          - "..."
        seed_sources:                # candidates for the chapter session, not yet verified
          - { title: "...", url: "...", tier: A }
        status: planned              # planned | drafting | review | final
```

Rules:
- Chapter ids never change once a chapter file exists. Retitle freely; keep the id.
- `prereq` must only point backwards in reading order.
- The sample chapter `what-is-a-model` may be kept, moved, renamed (title only) or dropped.
