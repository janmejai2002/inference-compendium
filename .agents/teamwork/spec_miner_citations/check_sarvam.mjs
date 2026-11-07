const res = await fetch('https://www.sarvam.ai/blogs/bulbul-v4-flash', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
});
const html = await res.text();
console.log('Status:', res.status);
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A');
const text = html.replace(/<[^>]+>/g, ' ');
const keywords = ['Bulbul', 'Flash', '22', 'Indic', 'TTS', 'latency', 'chunk', 'October', '2026', '150ms'];
for (const kw of keywords) {
  const idx = text.toLowerCase().indexOf(kw.toLowerCase());
  if (idx !== -1) {
    console.log(`Keyword "${kw}": ` + text.slice(Math.max(0, idx - 40), Math.min(text.length, idx + 80)).replace(/\s+/g, ' '));
  } else {
    console.log(`Keyword "${kw}": NOT FOUND`);
  }
}
