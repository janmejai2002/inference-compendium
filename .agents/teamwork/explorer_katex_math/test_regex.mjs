const line = 'In April 2026, BCG announced that its global revenue had expanded to $14.4 billion for 2025, up from $13.5 billion the prior year';
const regex = /(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g;
let m;
let count = 0;
while ((m = regex.exec(line)) !== null) {
  count++;
  console.log('Match full:', m[0]);
  console.log('Match inner:', m[1]);
}
if (count === 0) console.log('No matches (currency was not captured as math)');
