const res = await fetch('https://epoch.ai/data-insights/llm-inference-price-trends', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
});
const html = await res.text();
console.log('Status:', res.status);
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
const text = html.replace(/<[^>]+>/g, ' ');
const keywords = ['9x', '900x', 'Cottier', 'Snodin', 'Owen', 'Adamczewski', 'diminishing'];
for (const kw of keywords) {
  const idx = text.toLowerCase().indexOf(kw.toLowerCase());
  if (idx !== -1) {
    console.log(`Keyword "${kw}": ` + text.slice(Math.max(0, idx - 50), Math.min(text.length, idx + 100)).replace(/\s+/g, ' '));
  } else {
    console.log(`Keyword "${kw}": NOT FOUND`);
  }
}
