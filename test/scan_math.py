import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

chapters = sorted(glob.glob("content/chapters/*.md"))
print(f"Total chapters found: {len(chapters)}")

for ch in chapters:
    with open(ch, "r", encoding="utf-8") as f:
        content = f.read()
    
    # find block math
    blocks = re.findall(r"\$\$(.*?)\$\$", content, re.DOTALL)
    # find inline math
    inlines = re.findall(r"(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)", content)
    
    # check for specific keywords in content
    keywords = ["FLOP", "KV", "cache", "velocity", "cascade", "routing", "ECL", "Basel", "SHAP", "IRB", "break-even", "81.9%"]
    found_kw = [kw for kw in keywords if kw.lower() in content.lower()]
    
    print(f"\n=== {ch} (blocks: {len(blocks)}, inlines: {len(inlines)}) ===")
    if found_kw:
        print(f"  Keywords: {found_kw}")
    if blocks:
        print("  Sample block math:")
        for b in blocks[:5]:
            clean_b = " ".join(b.split())
            print(f"    $$ {clean_b[:100]} $$")
