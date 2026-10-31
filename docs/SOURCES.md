# Source policy

The book's credibility is its sources. A student should be able to trace every claim to a name they recognise.

## Tiers

- **A, primary or originator.** Peer-reviewed papers, working papers from named universities (HBS, NBER), arXiv papers from known labs, official lab and company research or engineering posts, government and regulator publications (RBI, MeitY, NITI Aayog, OECD), Stanford HAI AI Index, and talks or explainers by the people who built the thing (Karpathy, 3Blue1Brown on maths).
- **B, established analysis.** HBR, MIT Sloan Management Review, MIT Technology Review, The Economist, FT, McKinsey Global Institute, BCG Henderson Institute, Bain, Stratechery, Benedict Evans, Ethan Mollick (One Useful Thing), Mint, The Ken, ET Prime.
- **C, admitted with a reason.** Anything else that is genuinely the best explanation available. The reason goes in `why`.
- **Never.** SEO listicles, "Top 10 AI tools" posts, content farms, AI-generated summaries, unsourced Medium posts, vendor landing pages, LinkedIn influencer posts, screenshots of tweets.

The domain allowlist is `content/source-policy.yml`; `npm run check` enforces it. On platforms (YouTube, Substack), the tier comes from the creator, not the platform.

## Quoting numbers

Quote the original, not coverage of it. If a news article says "a McKinsey survey found...", find the McKinsey report and cite that. Write the number exactly as the source states it, with its year.

## Verification

`verified: false` until someone has opened the URL and confirmed title, author, year, and every timestamp, number or quote taken from it. Unverified sources are fine while drafting; `npm run check` lists them, and none may remain at `final` status.

## Videos

Prefer the creator's own channel. Give `minutes`, and `marks` (timestamps) when only part of the video matters. Say what to skip.
