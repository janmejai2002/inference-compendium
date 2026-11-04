import re
import xml.etree.ElementTree as ET

def audit_file(filepath):
    print(f"=== Auditing {filepath} ===")
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    highlights = len(re.findall(r'==[^=]+==', text))
    print(f"Highlights (4-8): {highlights}")

    stats = len(re.findall(r':::\s*stat\b', text))
    print(f"Stat blocks (exactly 1): {stats}")

    media = len(re.findall(r'(?m)^\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}', text))
    print(f"Media cards (1-3): {media}")

    questions = len(re.findall(r'<span\s+class="lvl">(?:recall|apply|explain|transfer|judge)</span>', text))
    print(f"Check questions (4-6): {questions}")

    recap = re.search(r':::\s*recap[^\n]*\n([\s\S]*?)\n:::', text)
    recap_lines = len([l for l in recap.group(1).split('\n') if re.match(r'^\s*\d+\.\s+', l)]) if recap else 0
    print(f"Recap numbered lines (exactly 5): {recap_lines}")

    # Check for unparsed compound citations
    compound_cites = re.findall(r'\[@[^\]\n]*[;,][^\]\n]*\]', text)
    print(f"Compound / malformed citations: {compound_cites}")

    # Check for banned AI phrases
    banned_phrases = [
        r'\bin today\'?s (?:fast-paced|rapidly evolving|digital) world\b',
        r'\bdelve(?:s|d)? into\b',
        r'\ba testament to\b',
        r'\bbeacon of\b',
        r'\btapestry of\b',
        r'\bgame-?changer\b',
        r'\bplethora of\b',
        r'\bit is (?:important|crucial|essential) to remember that\b',
        r'\bnot only .* but also\b',
        r'\bseamlessly integrat(?:e|es|ed|ing)\b',
        r'matter of if',
        r', ensuring',
        r'\bcatastrophically\b',
        r'\bfundamentally\b',
        r'\bcritically\b'
    ]
    found_banned = []
    for bp in banned_phrases:
        m = re.findall(bp, text, re.IGNORECASE)
        if m:
            found_banned.append((bp, m))
    print(f"Banned AI phrases found: {found_banned}")

audit_file('content/chapters/ai-product-lifecycle.md')
audit_file('content/chapters/product-architecture-economics.md')

print("\n=== Validating SVGs ===")
for svg_path in ['content/figures/ai-product-lifecycle.svg', 'content/figures/product-architecture-economics.svg']:
    try:
        tree = ET.parse(svg_path)
        root = tree.getroot()
        print(f"SVG {svg_path}: Valid XML, root tag={root.tag}, viewBox={root.attrib.get('viewBox')}")
    except Exception as e:
        print(f"SVG {svg_path}: INVALID XML! {e}")
