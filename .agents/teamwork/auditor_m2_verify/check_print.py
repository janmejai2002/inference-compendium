import re

with open('dist/print.html', 'r', encoding='utf-8') as f:
    text = f.read()

cites = re.findall(r'\[@anthropic-context-caching[^\]]*\]', text)
print("Found in print.html:", cites)

# Also check for any other unparsed citations in print.html for product track
all_unparsed = re.findall(r'\[@[\w-]+[;\s][^\]]*\]', text)
print("All unparsed compound citations in print.html:", all_unparsed)
