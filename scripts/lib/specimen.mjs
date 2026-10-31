// The design book: dist/design.html (+ dist/artifact/design.html, a self-contained
// copy for publishing). Everything shown is produced by the real pipeline:
// page images come from scripts/pdf.mjs, component specimens from the real renderer.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, esc, renderFragment, attentionMatrix } from './render.mjs';

const COMPONENTS = [
  ['Highlighter · the skim layer', 'Mark the one sentence per paragraph a student must remember. Skim mode on the web and the night-before read both depend on it.',
    'A model is a rule. ==A model is a rule that turns what you know into a guess about what you don\'t.== Everything else is detail.'],
  ['Margin note and glossary term', 'Notes go to the outer rail in print and on wide screens; on phones they fold into the text. First use of a [[term]] defines it in the rail.',
    'The numbers 12 and 4 are its [[parameter|parameters]], the knobs that fit this rule to this city.^[A **forecast**, a **score** and a **recommendation** are all the same object: a model\'s output.]'],
  ['From first principles', 'Derive the idea from things the reader already knows. The last step is always the conclusion (∴).',
    '::: principle Build it from zero\n1. We want a number we cannot see yet from numbers we can see now.\n2. Pick a rule with adjustable knobs.\n3. Nudge the knobs until the rule fits past examples.\n4. A model is a compression of experience into parameters.\n:::'],
  ['Concept card', 'One term: plain words, an analogy, the most common misconception. Numbered by chapter.',
    '::: concept Inference\n**Plain words.** Using a trained model to produce an answer.\n\n**Analogy.** The factory is built; this is the production line running.\n\n**Misconception.** "Inference is cheap, so AI is cheap." At millions of queries a day, it is the main cost.\n:::'],
  ['Case', 'A business decision worked end to end. Mark constructed cases Illustrative; real cases need a tier A or B source.',
    '::: case Illustrative · A quick-commerce dark store\n#### The situation\nWaste on fresh items runs at 9% and the category head wants "a better AI model".\n\n#### Your move\nChange the target from most likely demand to the stock level that balances waste against stockouts.\n:::'],
  ['Field lens', 'The same idea through one placement track. Colour = the track\'s thumb tab.',
    '::: lens marketing\nEvery targeting, churn and lifetime-value score you use is a model. Ask what it was trained on before you trust a segment.\n:::'],
  ['Interview room', 'The question, the opening line of a strong answer, what is being tested, and the structure.',
    '::: interview Guesstimate meets AI\n**Q.** An NBFC wants to "use AI for loan approvals". Where do you start?\n\n> "Before the model, the decision: what does a wrong approval cost versus a wrong rejection?"\n\n**What they are testing.** Whether you treat AI as a business decision with error costs.\n:::'],
  ['Myth / reality', 'Kills one specific misconception. The myth is struck through.',
    '::: myth\n**Myth.** An LLM looks the answer up in a database.\n\n**Reality.** It generates every answer token by token from its parameters.\n:::'],
  ['Stat', 'One number, its meaning, and a citation to the source registry. No citation, no stat.',
    '::: stat 40%\nHigher quality output from BCG consultants using GPT-4 on tasks inside the AI\'s capability.\n<span class="src">Source: [@hbs-jagged-frontier]</span>\n:::'],
  ['Watch · Read cards', 'Generated from content/sources.yml by id. The QR code is for the printed copy; the tier tells the reader how much to trust it.',
    '{{watch karpathy-intro-llms}}'],
  ['Try it yourself', 'A prompt the reader runs in a real AI tool. Active learning, and it shows the concept rather than describing it.',
    '::: try Watch a model guess\nPaste this into three new chats and compare:\n\n```\nComplete with exactly five more words: "The best thing about the Indian monsoon is"\n```\n:::'],
  ['Check yourself', 'Retrieval practice with Bloom levels. Tick boxes for the printed copy; answers print upside down.',
    '::: check Check yourself\n1. In one sentence, without the word "algorithm", what is a model? <span class="lvl">recall</span>\n2. Which trust question matters most for a fraud model trained before UPI? <span class="lvl">transfer</span>\n:::'],
  ['Pull quote', 'One line, attributed. Use at most once a chapter.',
    '::: pull\nAll models are wrong, but some are useful.\n\nGeorge E. P. Box, statistician\n:::'],
  ['The night-before page', 'The whole chapter in five numbered lines, on its own page in print.',
    '::: recap The night-before page\n1. A model is a learned rule: inputs you have → a guess about an output you don\'t.\n2. Training is the factory; inference is the production line.\n:::'],
];

const SPREAD_NAMES = { cover: 'Cover', 'how-to-read': 'How to read', contents: 'Contents & reading paths', part: 'Part opener', opener: 'Chapter opener', body: 'Body', recap: 'The night-before page', glossary: 'Glossary', sources: 'Source index', blank: 'Blank verso', backcover: 'Back cover' };

function spreads(pages) {
  const out = [];
  if (!pages.length) return out;
  out.push([pages[0]]);
  for (let i = 1; i < pages.length; i += 2) out.push(pages.slice(i, i + 2));
  return out;
}

function gridDiagram() {
  // A4 drawn at 2 units per mm. Values mirror design/print.css (right-hand page).
  const k = 2, W = 210 * k, H = 297 * k, ox = 70, oy = 20;
  const L = (x) => ox + x * k, T = (y) => oy + y * k;
  const label = (x, y, t, a = 'middle') => `<text x="${x}" y="${y}" text-anchor="${a}" font-size="11" font-family="IBM Plex Mono, monospace" fill="var(--desk-ink-2)">${t}</text>`;
  let s = `<svg viewBox="0 0 ${W + 140} ${H + 70}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A4 page grid: inner margin 20mm, text column 128mm, gap 6mm, margin rail 44mm, outer margin 12mm">`;
  s += `<rect x="${ox}" y="${oy}" width="${W}" height="${H}" fill="#fff" stroke="var(--desk-rule)"/>`;
  s += `<rect x="${L(20)}" y="${T(20)}" width="${128 * k}" height="${253 * k}" fill="#E8EBFE" stroke="#2337E6" stroke-width="1"/>`;
  s += `<rect x="${L(154)}" y="${T(20)}" width="${44 * k}" height="${253 * k}" fill="#FFF3B0" stroke="#C9A800" stroke-dasharray="4 3"/>`;
  s += `<rect x="${L(199)}" y="${T(48)}" width="${11 * k}" height="${26 * k}" fill="#2337E6"/>`;
  for (let i = 0; i < 26; i++) s += `<rect x="${L(26)}" y="${T(40 + i * 8.6)}" width="${(i % 6 === 5 ? 70 : 116) * k}" height="${2.2 * k}" fill="#2337E6" opacity=".22"/>`;
  s += `<text x="${L(84)}" y="${T(30)}" text-anchor="middle" font-size="13" font-family="Archivo, sans-serif" font-weight="700" fill="#1B2BB8">TEXT COLUMN</text>`;
  s += `<text x="${L(176)}" y="${T(30)}" text-anchor="middle" font-size="13" font-family="Archivo, sans-serif" font-weight="700" fill="#8A7300">RAIL</text>`;
  const y = oy + H + 22;
  [[0, 20, '20'], [20, 148, '128 mm'], [148, 154, '6'], [154, 198, '44'], [198, 210, '12']].forEach(([a, b, t]) => {
    s += `<line x1="${L(a)}" x2="${L(b)}" y1="${y}" y2="${y}" stroke="var(--desk-ink-2)"/><line x1="${L(a)}" x2="${L(a)}" y1="${y - 4}" y2="${y + 4}" stroke="var(--desk-ink-2)"/>`;
    s += label((L(a) + L(b)) / 2, y + 18, t);
  });
  s += `<line x1="${L(210)}" x2="${L(210)}" y1="${y - 4}" y2="${y + 4}" stroke="var(--desk-ink-2)"/>`;
  s += label(ox - 10, T(10) + 4, 'top 20', 'end') + label(ox - 10, T(285) + 4, 'foot 24', 'end');
  s += label(L(204), T(44), 'tab', 'middle');
  s += label(ox - 10, oy + H / 2, 'binding', 'end');
  return s + '</svg>';
}

export async function buildSpecimen(ctx, { DIST, shell }) {
  const { book } = ctx;
  const pj = path.join(DIST, 'pages', 'pages.json');
  const pages = fs.existsSync(pj) ? JSON.parse(fs.readFileSync(pj, 'utf8')) : [];
  const img = (p) => `pages/p-${String(p.n).padStart(3, '0')}.jpg`;

  const spreadHtml = pages.length ? spreads(pages).map((sp) => `<figure class="spread${sp.length === 1 ? ' single' : ''}${sp[0].side === 'left' && sp.length === 1 ? ' verso' : ''}">
    <div class="sheets">${sp.map((p) => `<a href="${img(p)}" target="_blank" rel="noopener" class="sheet"><img src="${img(p)}" alt="Page ${p.n}: ${esc(SPREAD_NAMES[p.role] || p.role)}" loading="lazy" width="840" height="1188"></a>`).join('')}</div>
    <figcaption>${sp.map((p) => `<span><b>${p.n}</b> ${esc(SPREAD_NAMES[p.role] || p.role)}${p.blocks.length ? ` <i>${p.blocks.join(' · ')}</i>` : ''}</span>`).join('')}</figcaption>
  </figure>`).join('\n') : `<p class="empty">No page images yet. Run <code>npm run pdf</code> and reload.</p>`;

  const comps = COMPONENTS.map(([name, note, src], i) => `<article class="comp" id="c-${i + 1}">
    <header><span class="comp-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(name)}</h3><p>${esc(note)}</p></header>
    <div class="comp-body">
      <div class="comp-live is-paper"><div class="prose" style="--track: var(--t-foundations)">${renderFragment(src, ctx)}</div></div>
      <pre class="comp-src"><code>${esc(src)}</code></pre>
    </div>
  </article>`).join('\n');

  const tracks = book.tracks.map((t) => `<div class="sw"><span style="background: var(--t-${t.id})"></span><b>${esc(t.name)}</b><i>${esc(t.short)}</i></div>`).join('');
  const core = [['--ink', 'Ink', 'Body text, rules'], ['--accent', 'Cobalt', 'The one loud colour'], ['--marker', 'Highlighter', 'Skim layer only'], ['--paper-2', 'Panel', 'Cases, concept heads'], ['--ink-3', 'Caption', 'Meta, timestamps'], ['--rule', 'Hairline', 'Dividers']]
    .map(([v, n, u]) => `<div class="sw core"><span style="background: var(${v})"></span><b>${n}</b><i>${u}</i></div>`).join('');

  const body = `<header class="sp-top">
  <a class="wordmark" href="index.html">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></a>
  <nav><a href="#pages">Pages</a><a href="#journeys">Journeys</a><a href="#type">Type</a><a href="#colour">Colour</a><a href="#grid">Grid</a><a href="#components">Components</a><a href="#social">Social</a><a href="#workflow">Workflow</a></nav>
</header>
<main class="sp">
<section class="sp-hero">
  <div class="sp-hero-copy">
    <div class="sp-k">Design book · ${esc(book.edition)}</div>
    <h1>How ${esc(book.title)}<span>${esc(book.title_accent || '')}</span> looks, reads and is built.</h1>
    <p>Every page below was rendered by the same pipeline that will produce the final book. Change a chapter, run one command, and these pages update. Nothing here is a mock-up.</p>
    <dl class="sp-facts"><div><dt>Format</dt><dd>A4 · mirrored margins</dd></div><div><dt>Pages in this build</dt><dd>${pages.length || '—'}</dd></div><div><dt>Chapters written</dt><dd>${ctx.chapters.filter((c) => c.file).length} of ${ctx.chapters.length}</dd></div><div><dt>Sources</dt><dd>${Object.keys(ctx.sources).length}, all tiered</dd></div></dl>
  </div>
  <div class="sp-hero-art">${attentionMatrix(book.cover_sentence, { cell: 38, fg: 'var(--accent)', label: 'var(--desk-ink-2)', mask: 'var(--desk-rule)', font: 12 })}
  <p class="sp-cap">The cover motif is an attention matrix: each row is a word, each cell shows how much it looks back at an earlier word. The empty upper triangle is real; a language model cannot look ahead.</p></div>
</section>

<section id="pages" class="sp-sec">
  <div class="sp-h"><span class="sp-k">01 · The book</span><h2>Every page, as it prints</h2><p>Spreads as they face each other when bound: left page even, right page odd. Click any page for the full-size image.</p></div>
  <div class="spreads">${spreadHtml}</div>
</section>

<section id="journeys" class="sp-sec">
  <div class="sp-h"><span class="sp-k">02 · Reader journeys</span><h2>Four ways the book will be met</h2><p>A compendium spreads through WhatsApp groups as a PDF, gets printed at the campus shop, and is opened on a phone in a cab to the interview. Each case has its own design answer.</p></div>
  <div class="journeys">
    <div class="j"><b>PDF on a laptop</b><p>Clickable contents with page numbers, a bookmark outline built from every heading, live links on every source title. A4 reads at 100% on a 14-inch screen without zooming.</p></div>
    <div class="j"><b>Printed and bound</b><p>20 mm inner margin for spiral binding. QR codes beside every video and article. Tick boxes on every question. Answers print upside down. Colour thumb tabs on the page edge, labelled so they still work in black and white.</p></div>
    <div class="j"><b>Phone, night before</b><p>The web edition has one column, notes folded into the text, and a Skim switch that dims everything except the highlighted lines. The night-before page is the whole chapter in five lines.</p></div>
    <div class="j"><b>Shared on social</b><p>Concept and stat cards in 4:5 are cut from the same tokens, so a LinkedIn post looks like the book. These are the stills that motion versions will be made from.</p></div>
  </div>
</section>

<section id="type" class="sp-sec">
  <div class="sp-h"><span class="sp-k">03 · Typography</span><h2>Three faces, three jobs</h2><p>A condensed grotesque for structure, a reading serif built for long screen and print sessions, a mono for data and timestamps.</p></div>
  <div class="faces">
    <div class="face"><div class="face-sample" style="font-family: var(--f-display); font-weight: 880; font-stretch: 68%;">Training is the factory.</div><b>Archivo</b><span>Display & labels · width 62–125 · weight 100–900. Condensed for headlines, expanded and spaced for kickers.</span></div>
    <div class="face"><div class="face-sample" style="font-family: var(--f-text); font-weight: 400;">A model is a rule that turns what you know into a guess.</div><b>Literata</b><span>Reading text · optical sizes 7–72. Designed for long reading on screens; holds up at 9.7 pt in print.</span></div>
    <div class="face"><div class="face-sample" style="font-family: var(--f-mono); font-size: 1.6rem;">14:14 · Tier A · § 01.2</div><b>IBM Plex Mono</b><span>Data, timestamps, section numbers, citations.</span></div>
  </div>
  <div class="scale is-paper">
    <div><i>Mega · 9rem</i><span style="font: 900 4.5rem/0.8 var(--f-display); font-stretch: 62%; color: var(--accent)">01</span></div>
    <div><i>H1 · 3.6rem</i><span style="font: 860 2.6rem/1 var(--f-display); font-stretch: 74%">What is a model, really?</span></div>
    <div><i>Deck · 1.35rem</i><span style="font: italic 380 1.35rem/1.3 var(--f-text)">Every AI conversation in a placement interview rests on one idea.</span></div>
    <div><i>H2 · 2rem</i><span style="font: 820 2rem/1 var(--f-display); font-stretch: 78%">A model is a compressed rule</span></div>
    <div><i>Body · 1rem</i><span style="font: 400 1rem/1.6 var(--f-text)">The simplest bridge is a line. Every extra kilometre added roughly four minutes.</span></div>
    <div><i>Kicker · .69rem</i><span class="kicker">Part I · How the machine thinks</span></div>
  </div>
</section>

<section id="colour" class="sp-sec">
  <div class="sp-h"><span class="sp-k">04 · Colour</span><h2>One loud colour, one highlighter, eight tracks</h2><p>Cobalt carries the brand. Yellow is reserved for the skim layer and means one thing only: remember this. Track colours appear only on thumb tabs, lens blocks and chips.</p></div>
  <div class="swatches">${core}</div>
  <div class="swatches tracks">${tracks}</div>
</section>

<section id="grid" class="sp-sec">
  <div class="sp-h"><span class="sp-k">05 · The page</span><h2>One column and a rail</h2><p>Dense text needs one comfortable column, not three narrow ones. The rail on the outer edge holds notes, definitions and QR codes, where a thumb rests. Margins mirror on left pages.</p></div>
  <div class="grid-fig">${gridDiagram()}</div>
</section>

<section id="components" class="sp-sec">
  <div class="sp-h"><span class="sp-k">06 · Components</span><h2>The teaching blocks, live</h2><p>Left: rendered by the real pipeline. Right: exactly what an author or agent types in a chapter file. This section is the authoring reference.</p></div>
  ${comps}
</section>

<section id="social" class="sp-sec">
  <div class="sp-h"><span class="sp-k">07 · Social stills</span><h2>Cut from the same cloth</h2><p>4:5 cards for LinkedIn and Instagram carousels, built from the same tokens. These are the key frames the motion versions will animate.</p></div>
  <div class="cards">
    <div class="card c-concept"><span class="c-k">${esc(book.title)}${esc(book.title_accent || '')} · Concept 01.1</span><p class="c-t">Training is the factory. Inference is the production line.</p><p class="c-b">One is built once and costs crores. The other runs every time you hit enter and costs paise.</p><span class="c-f">Ch 01 · What is a model, really?</span></div>
    <div class="card c-stat"><span class="c-k">${esc(book.title)}${esc(book.title_accent || '')} · The evidence</span><p class="c-n">40%</p><p class="c-b">higher-quality work from BCG consultants using GPT-4, inside the AI's frontier. Outside it, they did worse.</p><span class="c-f">Dell'Acqua et al., HBS 2023</span></div>
    <div class="card c-matrix"><span class="c-k">${esc(book.title)}${esc(book.title_accent || '')}</span><div class="c-m">${attentionMatrix('Will AI replace the analyst ?', { cell: 40, fg: '#8593FF', font: 13 })}</div><p class="c-t">How the machine thinks, from first principles.</p></div>
  </div>
</section>

<section id="workflow" class="sp-sec">
  <div class="sp-h"><span class="sp-k">08 · How it is made</span><h2>Version control for a magazine</h2><p>Content is plain text in a private Git repository. Every edit is a tracked change with an author and a reason; any page can be traced back to the commit that changed it.</p></div>
  <ol class="flow">
    <li><b>Plan</b><span>TOC session</span><code>content/toc.yml</code></li>
    <li><b>Research & write</b><span>Chapter session</span><code>content/chapters/*.md<br>content/sources.yml</code></li>
    <li><b>Check</b><span>Sources, terms, links</span><code>npm run check</code></li>
    <li><b>Render</b><span>Web, print, PDF</span><code>npm run pdf</code></li>
    <li><b>Commit</b><span>Tracked, reviewable</span><code>git commit · push</code></li>
  </ol>
</section>
</main>`;

  fs.writeFileSync(path.join(DIST, 'design.html'), shell({ title: `${book.title} Design Book`, css: ['tokens', 'components', 'specimen'], body, bodyClass: 'desk' }));

  // Self-contained copy for publishing (no document wrapper; CSS inlined; page images alongside).
  const css = ['tokens', 'components', 'specimen'].map((f) => fs.readFileSync(path.join(ROOT, 'design', `${f}.css`), 'utf8')).join('\n');
  const art = path.join(DIST, 'artifact');
  fs.mkdirSync(art, { recursive: true });
  fs.writeFileSync(path.join(art, 'design.html'), `<title>${esc(book.title)} Design Book</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>${css}</style>
<div class="desk">${body}</div>
`);
}
