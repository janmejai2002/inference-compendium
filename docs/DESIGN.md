# Design system

The live reference is the design book: `npm run pdf`, then open `dist/design.html`. This file records the decisions and the reasons for them.

## Identity

- **Idea:** a working study book. Highlighter marks carry a skim layer, the outer rail holds notes the way students annotate margins, colour thumb tabs let you flip to your placement track. The cover is an attention matrix, the real mechanism inside a language model.
- **One loud colour:** cobalt `#2337E6`. Highlighter yellow `#FFE45C` means only "remember this".
- **Track colours** (`--t-*` in `design/tokens.css`) appear only on thumb tabs, lens blocks, chips and part openers.

## Type

| Role | Face | Notes |
|---|---|---|
| Display, labels | Archivo (variable width 62–125) | Headlines condensed (`font-stretch` 62–80%), kickers expanded (118%) and letter-spaced |
| Reading text | Literata (optical sizes) | Body 1rem web / 9.7pt print, line-height 1.6 / 1.47 |
| Data | IBM Plex Mono | Timestamps, section numbers, citations, QR captions |

All sizes are rem, so print.css rescales the whole system by changing `html { font-size }`.

## Page (print)

A4, mirrored margins: inner 20, text column 128, gap 6, rail 44, outer 12 (mm); top 20, foot 24. Running heads: book title on left pages, chapter title on right pages. Folios in the outer corner. Part openers are full-bleed left pages facing the chapter opener on the right. The night-before page always starts a new page. Thumb tabs step down the outer edge by track order.

## Rules for changes

- Change colours and type only in `design/tokens.css`.
- Components must work in three places: web reader (light and dark), print, design book. Check all three with `npm run pdf` and `npm run dev`.
- Paged.js only applies `page:` and `break-*` rules reliably on plain class selectors (`.opener-page`, not `.print .opener-page`).
- Figures use the SVG classes listed in `docs/AUTHORING.md`, never hard-coded colours.
