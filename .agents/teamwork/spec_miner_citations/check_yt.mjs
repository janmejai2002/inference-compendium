const urls = {
  'ibm-agent-skills': 'https://www.youtube.com/watch?v=Lg-meK5IU8Q',
  'boyle-big-tech-debt': 'https://www.youtube.com/watch?v=NufJ7g63KSY',
  '3b1b-neural-network': 'https://www.youtube.com/watch?v=aircAruvnKk'
};

for (const [id, url] of Object.entries(urls)) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const durMatch = html.match(/"approxDurationMs":"(\d+)"/);
    const dateMatch = html.match(/"datePublished":"([^"]+)"/);
    const uploadMatch = html.match(/"uploadDate":"([^"]+)"/);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    console.log(`=== ${id} ===`);
    console.log(`Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    if (durMatch) {
      const sec = Math.round(parseInt(durMatch[1], 10) / 1000);
      console.log(`Duration: ${sec}s (${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}) (~${Math.round(sec/60)} min)`);
    }
    console.log(`Date: ${dateMatch ? dateMatch[1] : uploadMatch ? uploadMatch[1] : 'N/A'}`);
  } catch (err) {
    console.error(`Error for ${id}:`, err);
  }
}
