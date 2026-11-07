// Build every output from content/:
//   dist/index.html            home: cover + contents (web)
//   dist/ch/<id>.html          one web page per written chapter
//   dist/print.html            the whole book, paged by Paged.js (open in a browser = print preview)
//   dist/design.html           the design book (see scripts/lib/specimen.mjs)
// `npm run pdf` then turns print.html into dist/INFERENCE.pdf.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadBook, renderChapter, attentionMatrix, esc, readingTimes } from './lib/render.mjs';
import { buildSpecimen } from './lib/specimen.mjs';

const DIST = path.join(ROOT, 'dist');
const DEV = process.env.COMPENDIUM_DEV === '1';
const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap';
const CSS = ['tokens', 'components', 'web', 'print', 'specimen'];

function copyAssets() {
  fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
  for (const f of CSS) fs.copyFileSync(path.join(ROOT, 'design', `${f}.css`), path.join(DIST, 'css', `${f}.css`));
  // Copy KaTeX CSS & fonts for mathematical formulas
  const katexDist = path.join(ROOT, 'node_modules', 'katex', 'dist');
  if (fs.existsSync(katexDist)) {
    fs.copyFileSync(path.join(katexDist, 'katex.min.css'), path.join(DIST, 'css', 'katex.min.css'));
    const fontSrc = path.join(katexDist, 'fonts');
    const fontDst = path.join(DIST, 'css', 'fonts');
    if (fs.existsSync(fontSrc)) {
      fs.mkdirSync(fontDst, { recursive: true });
      for (const font of fs.readdirSync(fontSrc)) {
        fs.copyFileSync(path.join(fontSrc, font), path.join(fontDst, font));
      }
    }
  }
  fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'node_modules', 'pagedjs', 'dist', 'paged.polyfill.js'), path.join(DIST, 'js', 'paged.polyfill.js'));
}

const devReload = DEV ? `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>` : '';

export function shell({ title, css, body, rel = '', bodyClass = '', extraHead = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<script>
try {
  var t = localStorage.getItem('theme');
  if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${rel}css/katex.min.css">
${css.map((c) => `<link rel="stylesheet" href="${rel}css/${c}.css">`).join('\n')}
${extraHead}
</head>
<body class="${bodyClass}">
${body}
${devReload}
</body>
</html>
`;
}

// ---------------------------------------------------------------- shared fragments
export function getAuthors(book) {
  if (Array.isArray(book.authors) && book.authors.length) return book.authors;
  if (book.author) return [{ name: book.author, linkedin: book.linkedin, github: book.github }];
  return [
    { name: 'Janmejai Singh Minhas', linkedin: 'https://linkedin.com/in/janmejai', github: 'https://github.com/janmejai2002' },
    { name: 'Chaitanya Sharma', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/', github: 'https://github.com/chaitanya-sharma' }
  ];
}

export function formatAuthors(book, { format = 'text' } = {}) {
  const list = getAuthors(book);
  if (format === 'names') {
    return list.map((a) => esc(a.name)).join(' & ');
  }
  if (format === 'meta') {
    return list.map((a) => a.name).join(', ');
  }
  if (format === 'print-links') {
    return list.map((a) => `<b>${esc(a.name)}</b> (<a href="${esc(a.linkedin)}" style="color:inherit;text-decoration:none;">LinkedIn</a> · <a href="${esc(a.github)}" style="color:inherit;text-decoration:none;">GitHub</a>)`).join(' & ');
  }
  return list.map((a) => `<b>${esc(a.name)}</b> (<a href="${esc(a.linkedin)}" target="_blank" rel="noopener">LinkedIn</a> · <a href="${esc(a.github)}" target="_blank" rel="noopener">GitHub</a>)`).join(' & ');
}

function contents(ctx, { print = false, rel = '' } = {}) {
  return ctx.toc.parts.map((p) => `<section class="toc-part" style="--part: var(--t-${p.track})">
  <div class="toc-part-h"><span class="toc-part-n">${esc(p.n)}</span><span class="toc-part-t">${esc(p.title)}</span>${p.deck ? `<p class="toc-part-d">${esc(p.deck)}</p>` : ''}</div>
  <div class="toc-list">${p.chapters.map((c) => {
    const written = !!c.file;
    const meta = written ? `${readingTimes(c).full} min` : '';
    const inner = `<span class="n">${c.n}</span><span class="t">${esc(c.title)}${c.deck && !print ? `<span class="d">${esc(c.deck)}</span>` : ''}</span><span class="m">${meta}</span>`;
    if (!written) return `<div class="toc-row planned" data-track="${c.track}">${inner}</div>`;
    return `<a class="toc-row" data-track="${c.track}" data-tracks="${[c.track, ...(c.tracks || [])].join(' ')}" href="${print ? `#ch-${c.id}` : `${rel}ch/${c.id}.html`}">${inner}</a>`;
  }).join('')}</div>
</section>`).join('\n');
}

function coverHtml(ctx) {
  const { book } = ctx;
  const qrHtml = book.online_qr ? `
  <a class="cover-qr" href="${esc(book.online_url)}" style="color:inherit;text-decoration:none;">
    <div class="qr-box">${book.online_qr}</div>
    <div class="qr-meta">
      <span class="qr-kicker">Live edition</span>
      <span class="qr-url">Scan or tap to read online</span>
    </div>
  </a>` : '';
  return `<section class="cover">
  <div class="masthead"><span>${esc(book.title)} · ${esc(book.subtitle)}</span><span>${esc(book.edition)}</span></div>
  <h1 class="title">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
  <div class="byline">Curated & compiled by ${formatAuthors(book, { format: 'print-links' })}</div>
  <div class="matrix">${attentionMatrix(book.cover_sentence, { cell: 46, font: 12 })}</div>
  <div class="tracks">${book.tracks.map((t) => `<div class="track-tab"><span class="track-name">${esc(t.name)}</span><span class="track-bar" style="background: var(--t-${t.id})"></span></div>`).join('')}</div>
  <p class="sub">${esc(book.back_blurb)}</p>
  ${qrHtml}
  <div class="foot"><span>${esc(book.edition)}</span><span>${esc(book.license)}</span></div>
</section>`;
}

function howToRead(ctx) {
  const { book } = ctx;
  const paths = ['consulting', 'marketing', 'product', 'finance'].map((t) => {
    const tr = ctx.trackById[t];
    const list = ctx.chapters.filter((c) => c.track === t || c.track === 'foundations' || (c.tracks || []).includes(t));
    return `<div class="path"><span class="chip" style="--chip: var(--t-${t})">${esc(tr.name)}</span><ol>${list.map((c) => `<li>${c.n} · ${esc(c.title)}</li>`).join('')}</ol></div>`;
  }).join('');
  return `<section class="front" id="how-to-read">
  <div class="kicker">Before you begin · Curated by ${formatAuthors(book, { format: 'names' })}</div>
  <h1>Three ways to read this book</h1>
  <p class="intro">This compendium is dense on purpose. It is also built so that you never have to read all of it at once. Pick the speed that matches how much time is left before your interview.</p>
  <div class="speeds">
    <div class="speed"><span class="kicker">The night before</span><p class="t">Skim</p><p>Read only the <mark>highlighted lines</mark> and the yellow <b>night-before page</b> at the end of each chapter. About ten minutes a chapter.</p></div>
    <div class="speed"><span class="kicker">The week before</span><p class="t">Study</p><p>Read the full text. Ideas are built from first principles, so read chapters in order the first time. Notes and definitions sit in the outer margin.</p></div>
    <div class="speed"><span class="kicker">Every day</span><p class="t">Practise</p><p>Answer <b>Check yourself</b> without looking, then run the <b>Try it yourself</b> prompts in a real AI tool. Recall beats rereading.</p></div>
  </div>
  <div class="kicker" style="margin-bottom:3mm">What the blocks mean</div>
  <div class="legend">
    <div class="item"><span class="k" style="color:var(--accent)">∴ First principles</span><p>An idea derived step by step from things you already know. Graph paper means: work it through, don't memorise it.</p></div>
    <div class="item"><span class="k">Concept card</span><p>One term, in plain words, with an analogy and the most common misconception.</p></div>
    <div class="item"><span class="k">Case</span><p>A business decision worked end to end. Marked <i>Illustrative</i> when it is constructed for teaching.</p></div>
    <div class="item"><span class="k" style="color:var(--t-marketing)">■ Field lens</span><p>The same idea through one placement track. The colour matches the thumb tab on the page edge.</p></div>
    <div class="item"><span class="k">● Interview room</span><p>A question you could be asked, what it tests, and the structure of a strong answer.</p></div>
    <div class="item"><span class="k">Watch · Read</span><p>Curated outside material from named, primary sources. Scan the QR code on the printed page.</p></div>
  </div>
</section>
<section class="front" id="paths">
  <div class="kicker">Contents</div>
  <h1>What's inside</h1>
  <div class="toc-print">${contents(ctx, { print: true })}</div>
  <div class="kicker" style="margin:9mm 0 3mm">Reading paths by placement track</div>
  <div class="paths">${paths}</div>
</section>`;
}

function partOpener(p, ctx) {
  return `<section class="part-opener" style="--part: var(--t-${p.track})" id="part-${p.id}">
  <div class="pn">${esc(p.n)}</div>
  <div class="k">Part ${esc(p.n)}</div>
  <h1>${esc(p.title)}</h1>
  ${p.deck ? `<p>${esc(p.deck)}</p>` : ''}
  <ul>${p.chapters.map((c) => `<li><span>${c.n}</span>${esc(c.title)}</li>`).join('')}</ul>
</section>`;
}

function backMatter(ctx, cited, terms) {
  const g = [...terms].sort((a, b) => ctx.glossary[a].term.localeCompare(ctx.glossary[b].term));
  const gloss = g.map((id) => `<div><dt id="g-${id}">${esc(ctx.glossary[id].term)}</dt><dd>${esc(ctx.glossary[id].def)}</dd></div>`).join('');
  const src = [...cited].map((id) => ctx.sources[id]).map((s) => `<li><span class="tier">${esc(s.tier)}</span><span><b>${esc(s.title)}</b><br>${esc(s.creator)} · ${esc(s.publisher)} · ${esc(s.year)}<br><span class="u">${esc(s.url)}</span></span><span class="qr">${s.qr}</span></li>`).join('');
  const { book } = ctx;
  return `<section class="back" id="glossary">
  <div class="kicker">Back matter</div>
  <h1>Glossary</h1>
  <p class="intro">Every term defined in the margins, in one place. Learn these words well enough to explain them to a non-technical interviewer in one sentence each.</p>
  <dl class="gloss">${gloss}</dl>
</section>
<section class="back back-cont" id="sources">
  <h1>Sources</h1>
  <p class="intro">Every outside source in this edition, with its tier. <b>A</b> is a primary source or originator, <b>B</b> is established editorial or analysis, <b>C</b> is admitted with a stated reason. No SEO listicles, no unsourced posts. Rules in the repository's SOURCES.md.</p>
  <ol class="src-index">${src}</ol>
  <div class="colophon" style="margin-top:9mm">
    <div class="kicker" style="margin-bottom:2mm">Colophon</div>
    <p>Compiled and edited by ${formatAuthors(book, { format: 'print-links' })}. Set in Archivo, Literata and IBM Plex Mono. Written in Markdown, laid out with Paged.js, rendered by Chromium. ${esc(book.edition)}. ${esc(book.license)}</p>
  </div>
</section>
<section class="backcover">
  <p class="blurb">${esc(book.back_blurb)}</p>
  ${book.online_qr ? `
  <a class="backcover-qr" href="${esc(book.online_url)}" style="color:inherit;text-decoration:none;">
    <div class="qr-box">${book.online_qr}</div>
    <div class="qr-meta">
      <span class="qr-kicker">Live edition</span>
      <span class="qr-url">janmejai2002.github.io/inference-compendium</span>
    </div>
  </a>` : ''}
  <div class="fine"><span>${esc(book.title)}${esc(book.title_accent || '')} ${esc(book.subtitle)} · Curated by ${formatAuthors(book, { format: 'print-links' })}</span><span>${esc(book.edition)}</span></div>
</section>`;
}

// ---------------------------------------------------------------- pages
function webChapter(c, ctx, i, written) {
  const r = renderChapter(c, ctx, 'web');
  const prev = written[i - 1], next = written[i + 1];
  const body = `<header class="topbar" style="--track: var(--t-${c.track})">
  <a class="wordmark" href="../index.html">${esc(ctx.book.title)}<span>${esc(ctx.book.title_accent || '')}</span></a>
  <span class="where">${c.n} · ${esc(c.title)}</span>
  <div class="ch-select-wrap">
    <select class="ch-select" aria-label="Jump to chapter" onchange="if(this.value) location.href=this.value">
      <option value="">Jump to chapter...</option>
      ${written.map((w) => `<option value="${w.id}.html"${w.id === c.id ? ' selected' : ''}>${w.n} · ${esc(w.title)}</option>`).join('')}
    </select>
  </div>
  <button class="mode" id="skim" aria-pressed="false" title="Show only the highlighted skim layer (Key: S)">Skim</button>
  <button class="mode" id="theme-toggle" aria-label="Toggle theme" title="Toggle dark/light mode (Key: T)">Theme</button>
  <nav><a href="../index.html#contents">Contents</a><a href="../design.html">Design</a><a href="../print.html">Print</a></nav>
  <span class="progress" id="progress"></span>
</header>
<main class="read">
${r.html}
<nav class="pager">${prev ? `<a href="${prev.id}.html"><span>Previous</span>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="${next.id}.html"><span>Next</span>${esc(next.title)}</a>` : ''}</nav>
<footer class="ch-foot" style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--rule); font-family: var(--f-mono); font-size: 0.8rem; color: var(--ink-3); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
  <span>${esc(ctx.book.title)} · ${esc(ctx.book.edition)}</span>
  <span>Curated & compiled by ${formatAuthors(ctx.book, { format: 'html-links' })}</span>
</footer>
</main>
<script>
(() => {
  const b = document.getElementById('skim'), p = document.getElementById('progress'), tb = document.getElementById('theme-toggle');
  const setSkim = (on) => { document.body.classList.toggle('skim', on); if (b) b.setAttribute('aria-pressed', on); try { localStorage.setItem('skim', on ? '1' : ''); } catch (e) {} };
  if (b) {
    b.addEventListener('click', () => setSkim(!document.body.classList.contains('skim')));
    try { if (localStorage.getItem('skim')) setSkim(true); } catch (e) {}
  }
  const setTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    if (tb) tb.textContent = t === 'dark' ? 'Light' : 'Dark';
  };
  const curTheme = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (tb) {
    tb.textContent = curTheme === 'dark' ? 'Light' : 'Dark';
    tb.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }
  addEventListener('scroll', () => { const h = document.documentElement; if (p) p.style.width = (100 * h.scrollTop / (h.scrollHeight - h.clientHeight)) + '%'; }, { passive: true });
  addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 's' || e.key === 'S') { if (b) b.click(); }
    else if (e.key === 't' || e.key === 'T') { if (tb) tb.click(); }
  });
})();
</script>`;
  return {
    html: shell({
      title: `${c.title} · ${ctx.book.title}`,
      css: ['tokens', 'components', 'web'],
      body,
      rel: '../',
      extraHead: `
<meta name="author" content="${esc(formatAuthors(ctx.book, { format: 'meta' }))}">
<meta name="description" content="${esc(c.deck || ctx.book.subtitle)}">
<meta property="og:title" content="${esc(c.title)} · ${esc(ctx.book.title)}">
<meta property="og:description" content="${esc(c.deck || ctx.book.subtitle)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary">
`
    }),
    r
  };
}

function home(ctx) {
  const { book } = ctx;
  const writtenCount = ctx.chapters.filter((c) => c.file).length;
  const body = `<header class="topbar"><a class="wordmark" href="index.html">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></a><span class="where">${esc(book.edition)}</span>
<button class="mode" id="theme-toggle" aria-label="Toggle theme" title="Toggle dark/light mode (Key: T)">Theme</button>
<nav><a href="#contents">Chapters</a><a href="#how-to-read">Guide</a><a href="design.html">Design book</a><a href="print.html">Print preview</a><a class="btn primary" style="padding:0.4em 0.8em;font-size:0.75rem;" href="${esc(book.title)}.pdf" download>PDF (498p)</a></nav></header>
<section class="home-hero">
  <div>
    <div class="kicker">${esc(book.edition)}</div>
    <h1>${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
    <p class="sub">${esc(book.subtitle)}. ${esc(book.back_blurb)}</p>
    <div class="byline" style="margin: 1.2rem 0; font-family: var(--f-mono); font-size: 0.85rem; color: var(--ink-2);">
      Curated & compiled by ${formatAuthors(book, { format: 'html-links' })}
    </div>
    <div class="hero-stats">
      <span>${writtenCount} Chapters</span>
      <span>4 Placement Tracks</span>
      <span>160 Sources</span>
      <span>498 Pages</span>
      <span>Free & Open Source</span>
    </div>
    <div class="actions" style="margin-top: 1.4rem;"><a class="btn primary" href="#contents">Start reading</a><a class="btn" href="${esc(book.title)}.pdf" download>Download PDF</a><a class="btn" href="#how-to-read">Reading guide</a><a class="btn" href="design.html">Design book</a></div>
  </div>
  <div class="matrix">${attentionMatrix(book.cover_sentence, { cell: 40, fg: 'var(--accent)', label: 'var(--ink-2)', mask: 'var(--rule)', font: 12 })}</div>
</section>
<section class="home-guide" id="how-to-read">
  <div class="kicker">Pedagogy &amp; Strategy</div>
  <h2 style="font-family: var(--f-display); font-weight: 850; font-size: var(--s-h2); margin: 0.4rem 0 0.8rem; letter-spacing: -0.01em;">Three ways to read this book</h2>
  <p style="color: var(--ink-2); max-width: 44rem; margin: 0 0 1.2rem; font-size: var(--s-body); line-height: 1.5;">This compendium is dense on purpose. Pick the speed that matches how much time is left before your interview room.</p>
  <div class="guide-card-grid">
    <div class="guide-card">
      <div class="kicker">The night before</div>
      <h3>Skim layer (10 min/ch)</h3>
      <p>Read only the highlighted lines and the yellow <b>night-before recap</b> at the end of each chapter. Turn on the <b>Skim</b> toggle at the top of any chapter.</p>
    </div>
    <div class="guide-card">
      <div class="kicker">The week before</div>
      <h3>Study progression</h3>
      <p>Read the full text in order. Ideas build from first principles—parameters to tokens to RAG to agent security. Marginal notes provide immediate definitions.</p>
    </div>
    <div class="guide-card">
      <div class="kicker">Every day</div>
      <h3>Practice &amp; retrieval</h3>
      <p>Answer <b>Check yourself</b> without looking at answers, then run the <b>Try it yourself</b> prompts in real tools. Active recall beats passive rereading.</p>
    </div>
  </div>
</section>
<div class="toc-toolbar">
  <div class="track-filters" role="tablist" aria-label="Filter chapters by track">
    <button class="filter-tab active" data-filter="all" role="tab" aria-selected="true">All Tracks <span class="badge">${writtenCount}</span></button>
    <button class="filter-tab" data-filter="foundations" role="tab" aria-selected="false" style="--tab-c: var(--t-foundations)">Foundations <span class="badge">8</span></button>
    <button class="filter-tab" data-filter="consulting" role="tab" aria-selected="false" style="--tab-c: var(--t-consulting)">Consulting <span class="badge">13</span></button>
    <button class="filter-tab" data-filter="marketing" role="tab" aria-selected="false" style="--tab-c: var(--t-marketing)">Marketing <span class="badge">4</span></button>
    <button class="filter-tab" data-filter="product" role="tab" aria-selected="false" style="--tab-c: var(--t-product)">Product <span class="badge">4</span></button>
    <button class="filter-tab" data-filter="finance" role="tab" aria-selected="false" style="--tab-c: var(--t-finance)">Finance <span class="badge">4</span></button>
  </div>
  <div class="toc-search-box">
    <input type="search" id="toc-search" placeholder="Search chapters, cases, topics..." autocomplete="off">
  </div>
</div>
<main class="home-toc" id="contents">${contents(ctx)}</main>
<footer class="home-foot" style="margin: 4rem auto 2rem; max-width: 1200px; padding: 2.5rem 1.5rem 0; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; flex-wrap:wrap; gap:1rem; font-family: var(--f-mono); font-size: 0.8rem; color: var(--ink-3);">
  <div>
    <b>${esc(book.title)}</b> · ${esc(book.edition)} · ${esc(book.license)}
  </div>
  <div>
    Curated & compiled by ${formatAuthors(book, { format: 'html-links' })}
  </div>
</footer>
<script>
(() => {
  const tb = document.getElementById('theme-toggle');
  const setTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    if (tb) tb.textContent = t === 'dark' ? 'Light' : 'Dark';
  };
  const curTheme = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (tb) {
    tb.textContent = curTheme === 'dark' ? 'Light' : 'Dark';
    tb.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  // Interactive track filter & search
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('toc-search');
  const rows = document.querySelectorAll('.toc-row');
  const parts = document.querySelectorAll('.toc-part');

  let activeTrack = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    rows.forEach((row) => {
      const rowTrack = row.dataset.track || '';
      const rowTracks = (row.dataset.tracks || '').split(' ');
      const matchTrack = activeTrack === 'all' || rowTrack === activeTrack || rowTracks.includes(activeTrack);
      const text = row.textContent.toLowerCase();
      const matchSearch = !searchQuery || text.includes(searchQuery);
      const visible = matchTrack && matchSearch;
      row.classList.toggle('hidden', !visible);
    });

    parts.forEach((part) => {
      const visibleRows = part.querySelectorAll('.toc-row:not(.hidden)');
      part.classList.toggle('hidden', visibleRows.length === 0);
    });
  };

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeTrack = tab.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
})();
</script>`;
  return shell({
    title: `${book.title} — ${book.subtitle}`,
    css: ['tokens', 'components', 'web'],
    body,
    extraHead: `
<meta name="author" content="${esc(formatAuthors(book, { format: 'meta' }))}">
<meta name="description" content="${esc(book.subtitle)}. ${esc(book.back_blurb)}">
<meta property="og:title" content="${esc(book.title)} · ${esc(book.subtitle)}">
<meta property="og:description" content="${esc(book.subtitle)}. ${esc(book.back_blurb)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
`
  });
}

function printBook(ctx) {
  const cited = new Set(), terms = new Set(), problems = [];
  const parts = ctx.toc.parts.map((p) => {
    const chs = p.chapters.filter((c) => c.file).map((c) => {
      const r = renderChapter(c, ctx, 'print');
      r.cited.forEach((x) => cited.add(x)); r.terms.forEach((x) => terms.add(x));
      problems.push(...r.problems.map((m) => `${c.id}: ${m}`));
      const attrs = `data-track="${c.track}" style="--track: var(--t-${c.track})"`;
      return `<section class="opener-page" id="ch-${c.id}" ${attrs}>${r.opener}</section>
<article class="chapter" ${attrs}>${r.prose}</article>`;
    });
    return chs.length ? partOpener(p, ctx) + chs.join('\n') : '';
  }).join('\n');
  const tracks = JSON.stringify(Object.fromEntries(ctx.book.tracks.map((t, i) => [t.id, { i, short: t.short }])));
  const extraHead = `<meta name="author" content="${esc(formatAuthors(ctx.book, { format: 'meta' }))}">
<meta name="description" content="${esc(ctx.book.subtitle)}">
<style>@page :left { @top-left { content: "${esc(ctx.book.running_head)}"; } }</style>
<script>window.PagedConfig = { auto: true, after: () => { window.__pagedDone = true; } };</script>
<script src="js/paged.polyfill.js"></script>
<script>
// Thumb tabs: one coloured tab per page on the outer edge, stepped down by track order.
const TRACKS = ${tracks};
class ThumbTabs extends Paged.Handler {
  afterPageLayout(page) {
    const el = page.querySelector('[data-track]');
    if (!el || page.querySelector('.opener, .part-opener, .cover, .backcover')) return;
    const t = TRACKS[el.dataset.track]; if (!t) return;
    const d = document.createElement('div');
    d.className = 'thumb'; d.style.setProperty('--tab', 'var(--t-' + el.dataset.track + ')');
    d.style.top = (28 + t.i * 28) + 'mm'; d.innerHTML = '<b>' + t.short + '</b>';
    page.appendChild(d);
  }
}
Paged.registerHandlers(ThumbTabs);
</script>`;
  const body = `${coverHtml(ctx)}\n${howToRead(ctx)}\n${parts}\n${backMatter(ctx, cited, terms)}`;
  return { html: shell({ title: `${ctx.book.title} — print`, css: ['tokens', 'components', 'print'], body, bodyClass: 'print is-paper', extraHead }), problems };
}

// ---------------------------------------------------------------- main
export async function build() {
  const t0 = Date.now();
  const ctx = await loadBook();
  copyAssets();
  fs.mkdirSync(path.join(DIST, 'ch'), { recursive: true });
  const written = ctx.chapters.filter((c) => c.file);
  const problems = [];
  written.forEach((c, i) => {
    const { html, r } = webChapter(c, ctx, i, written);
    problems.push(...r.problems.map((m) => `${c.id}: ${m}`));
    fs.writeFileSync(path.join(DIST, 'ch', `${c.id}.html`), html);
  });
  fs.writeFileSync(path.join(DIST, 'index.html'), home(ctx));
  const pb = printBook(ctx);
  fs.writeFileSync(path.join(DIST, 'print.html'), pb.html);
  await buildSpecimen(ctx, { DIST, shell });
  const editionsDir = path.join(ROOT, 'editions');
  const pdfCandidates = fs.existsSync(editionsDir)
    ? fs.readdirSync(editionsDir)
        .filter((f) => f.startsWith(`${ctx.book.title}-v`) && f.endsWith('.pdf') && !f.includes('_x'))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    : [];
  const latestSnapshot = pdfCandidates.length ? path.join(editionsDir, pdfCandidates[0]) : null;
  const pdfOut = path.join(DIST, `${ctx.book.title}.pdf`);
  if (latestSnapshot && fs.existsSync(latestSnapshot)) {
    fs.copyFileSync(latestSnapshot, pdfOut);
  }
  const uniq = [...new Set([...problems, ...pb.problems])];
  uniq.forEach((p) => console.warn(`  ! ${p}`));
  console.log(`built ${written.length}/${ctx.chapters.length} chapters → dist/ in ${Date.now() - t0} ms${uniq.length ? ` (${uniq.length} problems)` : ''}`);
  return { ctx, problems: uniq };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  build().catch((e) => { console.error(e); process.exit(1); });
}
