import os
import re
import yaml
import statistics

ROOT = r"C:\Users\Janmejai\compendium"
TOC_PATH = os.path.join(ROOT, "content", "toc.yml")
CHAPTERS_DIR = os.path.join(ROOT, "content", "chapters")

with open(TOC_PATH, "r", encoding="utf-8") as f:
    toc = yaml.safe_load(f)

# Extract chapters in order
chapters = []
n_counter = 0
for part in toc.get("parts", []):
    part_id = part.get("id")
    part_title = part.get("title")
    part_track = part.get("track")
    for c in part.get("chapters", []):
        cid = c.get("id")
        explicit_n = c.get("n")
        if explicit_n is not None:
            c_num = str(explicit_n)
        else:
            n_counter += 1
            c_num = f"{n_counter:02d}"
        chapters.append({
            "id": cid,
            "num": c_num,
            "part_id": part_id,
            "part_title": part_title,
            "part_track": part_track,
            "toc_entry": c
        })

print(f"Total chapters in toc.yml: {len(chapters)}")

BANNED_WORDS = [
    r"stands as a testament",
    r"serves as a stark reminder",
    r"a testament to",
    r"testament to",
    r"plays a crucial role",
    r"plays a pivotal role",
    r"plays a vital role",
    r"plays a key role",
    r"plays an instrumental role",
    r"\bcrucial\b",
    r"\bpivotal\b",
    r"\bvital\b",
    r"marks a shift",
    r"marks a pivotal turning point",
    r"sets the stage for",
    r"paves the way for",
    r"shapes the evolving landscape",
    r"evolving landscape",
    r"rapidly shifting landscape",
    r"rapidly evolving",
    r"leaves an indelible mark",
    r"deeply rooted in",
    r"\bdelve\b",
    r"\bdelving\b",
    r"in the high-stakes world of",
    r"it is not a question of if, but when",
    r"it is not simply [^;.]+; it is",
    r"consider the case of",
    r"the lesson is unequivocal",
    r"the reality is sobering",
    r"at the end of the day",
    r"double-edged sword",
    r"game-changing",
    r"\btransformative\b",
    r"\bunprecedented\b",
    r"featured in prominent",
    r"widely profiled",
    r"leading industry expert",
    r"garnered widespread attention",
    r"maintains an active presence in"
]

TRAILING_ING_PATTERN = re.compile(r',\s+(?:underscoring|highlighting|reflecting|ensuring|demonstrating|fostering|encompassing|cultivating|offering|showcasing|signaling|bridging|mirroring)\b', re.IGNORECASE)

results = []

for ch in chapters:
    cid = ch["id"]
    filepath = os.path.join(CHAPTERS_DIR, f"{cid}.md")
    exists = os.path.exists(filepath)
    if not exists:
        results.append({
            "info": ch,
            "exists": False
        })
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter
    fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    fm = {}
    body = content
    if fm_match:
        try:
            fm = yaml.safe_load(fm_match.group(1)) or {}
        except Exception as e:
            fm = {"_parse_error": str(e)}
        body = fm_match.group(2)

    # Word count
    words = len(re.findall(r'\b\w+\b', body))

    # Pedagogical Blocks
    principles = re.findall(r':::\s*principle\b(.*)', body)
    concepts = re.findall(r':::\s*concept\b(.*)', body)
    cases = re.findall(r':::\s*case\b(.*)', body)
    lenses = re.findall(r':::\s*lens\b(.*)', body)
    interviews = re.findall(r':::\s*interview\b(.*)', body)
    myths = re.findall(r':::\s*myth\b', body)
    stats = re.findall(r':::\s*stat\b(.*)', body)
    pulls = re.findall(r':::\s*pull\b', body)
    tries = re.findall(r':::\s*try\b(.*)', body)
    checks = re.findall(r':::\s*check\b(.*)', body)
    answers = re.findall(r':::\s*answers\b', body)
    recaps = re.findall(r':::\s*recap\b(.*)', body)
    
    # Figures and media
    figures = re.findall(r'\{\{\s*(?:figure|figure-wide)\s+([^}]+)\}\}', body)
    media_cards = re.findall(r'\{\{\s*(?:watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}', body)
    highlights = re.findall(r'==([^=]+)==', body)
    cites = re.findall(r'\[@([\w-]+)\]', body)
    sidenotes = re.findall(r'\^\[((?:[^[\]]|\[[^\]]*\])*)\]', body)
    glossary_terms = re.findall(r'\[\[([^\]]+)\]\]', body)

    # Recap lines check
    recap_lines = []
    recap_block_match = re.search(r':::\s*recap\b[^\n]*\n([\s\S]*?):::', body)
    if recap_block_match:
        recap_text = recap_block_match.group(1).strip()
        recap_lines = [line for line in recap_text.split('\n') if re.match(r'^\s*\d+\.\s*', line)]

    # Check questions & Bloom levels
    check_questions = []
    bloom_levels = []
    check_block_match = re.search(r':::\s*check\b[^\n]*\n([\s\S]*?):::', body)
    if check_block_match:
        check_text = check_block_match.group(1).strip()
        check_questions = [line for line in check_text.split('\n') if re.match(r'^\s*\d+\.\s*', line)]
        bloom_levels = re.findall(r'<span class="lvl">([a-zA-Z]+)</span>', check_text)

    # Answers count
    answer_items = []
    answer_block_match = re.search(r':::\s*answers\b[^\n]*\n([\s\S]*?):::', body)
    if answer_block_match:
        ans_text = answer_block_match.group(1).strip()
        answer_items = [line for line in ans_text.split('\n') if re.match(r'^\s*\d+\.\s*', line)]

    # Try block inspection: check if try contains code vs prompt
    try_has_code = False
    try_code_languages = []
    try_block_match = re.search(r':::\s*try\b[^\n]*\n([\s\S]*?):::', body)
    if try_block_match:
        try_text = try_block_match.group(1)
        fenced_matches = re.findall(r'```([a-zA-Z0-9_-]*)\n([\s\S]*?)```', try_text)
        for lang, code_content in fenced_matches:
            lang = lang.strip().lower()
            if lang in ['python', 'py', 'javascript', 'js', 'bash', 'sh', 'sql', 'r']:
                try_has_code = True
                try_code_languages.append(lang)
            elif any(indicator in code_content for indicator in ['def ', 'import ', 'return ', 'function(', 'const ', 'let ', 'var ']):
                # heuristic code detection
                try_has_code = True
                try_code_languages.append(f"heuristic:{lang or 'unmarked'}")

    # Voice & Slop Detection
    slop_findings = []
    for pattern in BANNED_WORDS:
        matches = list(re.finditer(pattern, body, re.IGNORECASE))
        for m in matches:
            # find line number
            line_no = body[:m.start()].count('\n') + 1 + (fm_match.group(1).count('\n') + 2 if fm_match else 0)
            slop_findings.append({
                "type": "banned_word",
                "match": m.group(0),
                "pattern": pattern,
                "line": line_no
            })

    trailing_ings = []
    for m in TRAILING_ING_PATTERN.finditer(body):
        line_no = body[:m.start()].count('\n') + 1 + (fm_match.group(1).count('\n') + 2 if fm_match else 0)
        trailing_ings.append({
            "type": "trailing_ing",
            "match": m.group(0),
            "line": line_no
        })

    # Sentence burstiness & perplexity estimation
    # Extract prose paragraphs (ignore blocks, code, lists)
    prose_paras = []
    in_block = False
    in_code = False
    for line in body.split('\n'):
        if line.startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        if line.startswith(':::') or line.startswith('{{'):
            continue
        if line.startswith('#'):
            continue
        if line.startswith('|'):
            continue
        stripped = line.strip()
        if stripped and not stripped.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '- ', '* ')):
            prose_paras.append(stripped)

    sentences = []
    for p in prose_paras:
        # crude sentence split
        s_list = re.split(r'(?<=[.!?])\s+', p)
        for s in s_list:
            w_count = len(re.findall(r'\b\w+\b', s))
            if w_count >= 3:
                sentences.append(w_count)

    mean_s_len = statistics.mean(sentences) if sentences else 0
    stdev_s_len = statistics.stdev(sentences) if len(sentences) > 1 else 0

    # Frontmatter completeness
    fm_missing = []
    for req_field in ["id", "title", "deck", "hook", "objectives"]:
        if req_field not in fm or not fm[req_field]:
            fm_missing.append(req_field)
    
    # Check callout syntax errors (unmatched :::)
    colons = [line for line in body.split('\n') if line.strip().startswith(':::')]
    open_callouts = 0
    callout_errors = []
    for line in colons:
        line_clean = line.strip()
        if line_clean == ':::':
            open_callouts -= 1
        elif line_clean.startswith(':::'):
            open_callouts += 1
    if open_callouts != 0:
        callout_errors.append(f"Unmatched ::: count (balance: {open_callouts})")

    # Table syntax: check for ASCII fenced tables
    fenced_ascii_tables = re.findall(r'```[^\n]*\n(?:\s*\+[-+]+\+\s*\n)+[\s\S]*?```', body)

    results.append({
        "info": ch,
        "exists": True,
        "words": words,
        "fm": fm,
        "fm_missing": fm_missing,
        "blocks": {
            "principle": len(principles),
            "concept": len(concepts),
            "case": len(cases),
            "lens": len(lenses),
            "interview": len(interviews),
            "myth": len(myths),
            "stat": len(stats),
            "pull": len(pulls),
            "try": len(tries),
            "check": len(checks),
            "answers": len(answers),
            "recap": len(recaps)
        },
        "recap_lines_count": len(recap_lines),
        "check_questions_count": len(check_questions),
        "bloom_levels": bloom_levels,
        "answers_count": len(answer_items),
        "try_has_code": try_has_code,
        "try_code_languages": try_code_languages,
        "figures_count": len(figures),
        "media_cards_count": len(media_cards),
        "highlights_count": len(highlights),
        "cites_count": len(cites),
        "sidenotes_count": len(sidenotes),
        "glossary_count": len(glossary_terms),
        "slop_count": len(slop_findings),
        "slop_findings": slop_findings,
        "trailing_ings_count": len(trailing_ings),
        "trailing_ings": trailing_ings,
        "mean_sentence_len": round(mean_s_len, 1),
        "stdev_sentence_len": round(stdev_s_len, 1),
        "callout_errors": callout_errors,
        "fenced_ascii_tables_count": len(fenced_ascii_tables)
    })

# Summary output
print("\n=== AUDIT SUMMARY ===")
for r in results:
    info = r["info"]
    cid = info["id"]
    cnum = info["num"]
    if not r.get("exists"):
        print(f"[{cnum}] {cid}: FILE MISSING!")
        continue
    bl = r["blocks"]
    issues = []
    if r["fm_missing"]:
        issues.append(f"FM missing: {r['fm_missing']}")
    if bl["recap"] == 0:
        issues.append("MISSING RECAP")
    elif r["recap_lines_count"] != 5:
        issues.append(f"Recap has {r['recap_lines_count']} lines (expected 5)")
    if bl["check"] == 0:
        issues.append("MISSING CHECK")
    if bl["answers"] == 0:
        issues.append("MISSING ANSWERS")
    if bl["check"] > 0 and bl["answers"] > 0 and r["check_questions_count"] != r["answers_count"]:
        issues.append(f"Q/A mismatch ({r['check_questions_count']} Qs vs {r['answers_count']} As)")
    if r["highlights_count"] == 0:
        issues.append("NO HIGHLIGHTS (==...==)")
    if bl["try"] == 0:
        issues.append("MISSING TRY")
    elif r["try_has_code"]:
        issues.append(f"TRY HAS CODE! ({r['try_code_languages']})")
    if bl["principle"] == 0:
        issues.append("MISSING PRINCIPLE")
    if bl["concept"] == 0:
        issues.append("MISSING CONCEPT")
    if bl["case"] == 0:
        issues.append("MISSING CASE")
    if bl["interview"] == 0:
        issues.append("MISSING INTERVIEW")
    if r["media_cards_count"] == 0:
        issues.append("NO MEDIA CARDS")
    if r["figures_count"] == 0:
        issues.append("NO FIGURES")
    if r["slop_count"] > 0:
        issues.append(f"{r['slop_count']} BANNED SLOP TERMS")
    if r["trailing_ings_count"] > 0:
        issues.append(f"{r['trailing_ings_count']} TRAILING -INGs")
    if r["callout_errors"]:
        issues.append(f"CALLOUT ERRORS: {r['callout_errors']}")
    
    issue_str = "; ".join(issues) if issues else "OK (clean structure)"
    print(f"[{cnum}] {cid} ({r['words']} w): {issue_str}")

# Save detailed json report
import json
with open(r"C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_pedagogy\audit_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
print("\nDetailed audit saved to audit_results.json")
