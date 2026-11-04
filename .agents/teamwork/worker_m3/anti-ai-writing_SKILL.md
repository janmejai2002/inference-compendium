---
name: anti-ai-writing
description: "Authoring and editorial auditing standard for eliminating machine-generated tropes, AI slop, and statistical regression to the mean. Enforces Wikipedia WP:AISIGNS/WP:AITELLS guidelines, high perplexity and sentence burstiness, concrete human observation, and authentic investigative journalism voice."
---

# Anti-AI Writing & Human Editorial Standard

This skill establishes the rules, banned patterns, and stylistic architecture required to write prose that is completely indistinguishable from world-class human investigative journalism and essays (in the tradition of *The Atlantic*, *The New Yorker*, *Bloomberg Businessweek*, and *The Financial Times*). 

It operationalizes the empirical findings from Wikipedia's *WikiProject AI Cleanup* (`WP:AISIGNS`, `WP:AITELLS`), linguistic perplexity research, and the *Billion Dollar PDFs* canon.

---

## 1. The Core Law: Overcoming Statistical Regression to the Mean

Large Language Models generate text by predicting the most statistically probable next token. This mathematical nature creates an unavoidable pathology: **statistical regression to the mean**. 

The model systematically smooths over weird, gritty, specific human realities and replaces them with generic, important-sounding abstractions. Instead of describing a developer who forgot to revoke an API key at 2:15 AM before a quarterly earnings call, the AI writes about *"the evolving landscape of enterprise vulnerability."*

### The Golden Rule
**Specifics kill slop.** Whenever tempted to use an abstract noun or a sweeping summary, replace it with a verifiable proper noun, a specific dollar figure, a direct human quote, a physical room, or an exact timeline.

---

## 2. Banned Vocabulary & Rhetorical Reflexes

Any text containing the following words and constructions immediately fails the editorial audit:

### A. The "Significance & Legacy" Inflation Trap (`WP:AILEGACY`)
AI models habitually attempt to convince the reader that mundane events are historic turning points. 
**Strictly Banned**:
- *"stands as a testament / serves as a stark reminder"*
- *"plays a crucial / pivotal / vital / key / instrumental role"*
- *"marks a shift / marks a pivotal turning point"*
- *"sets the stage for / paves the way for"*
- *"shapes the evolving landscape / rapidly shifting landscape"*
- *"leaves an indelible mark / deeply rooted in"*
- *"a testament to the enduring power of"*
- *"underscores the critical importance of"*
- *"delve / delving into"*

**Human Replacement**: State what happened plainly. If a company lost $40 million, write: *"The breach cost $40 million."* Do not tell the reader that the breach *"serves as a stark reminder of the evolving cyber landscape."*

---

### B. The Trailing Participial Clause (`WP:SUPERFICIAL`)
The single most prevalent syntactic signature of an LLM is appending a present participle phrase (`-ing`) to the end of a sentence to simulate analytical depth.
**Banned Structure**:  
`[Statement of fact], [highlighting / underscoring / reflecting / fostering / ensuring / encompassing / cultivating / offering valuable insights into X].`

**Example of Slop**:  
> *"The court fined the company €15 million, underscoring the growing importance of compliance in an increasingly digital world."*

**Human Edit**:  
> *"The court fined the company €15 million. It was the third sanction that month, but the CEO refused to alter deployment schedules."*

---

### C. Canned Attribution & Notability Inflation (`WP:AIATTR`)
LLMs reflexively attempt to establish credibility by praising the prestige of their sources.
**Banned Phrases**:
- *"featured in prominent media outlets / widely profiled in"*
- *"written by a leading industry expert"*
- *"garnered widespread attention across national publications"*
- *"maintains an active presence in"*

**Human Edit**: Cite the author and publication cleanly: *"In 2024, researchers at Anthropic discovered..."* Let the quality of the finding speak for itself.

---

### D. The Melodrama & Dichotomy Cliche
AI models love apocalyptic dichotomies and breathless throat-clearing.
**Banned Constructions**:
- *"In the high-stakes world of..."*
- *"It is not a question of if, but when..."*
- *"It is not simply X; it is Y."*
- *"Consider the case of..."*
- *"The lesson is unequivocal / the reality is sobering..."*
- *"At the end of the day..."*
- *"A double-edged sword / a double-edged reality..."*

---

## 3. The Mechanics of Human Prose (Perplexity & Burstiness)

Automated detectors look for low perplexity (predictable word choice) and low burstiness (uniform sentence lengths). Human prose is wildly irregular:

```text
Sentence 1 (Short, blunt):
The firewall held.

Sentence 2 (Long, rhythmic, observant):
Down the hall, however, an engineer named Sarah was copying a master database token into a terminal window because the quarterly review was seventy-two hours away and nobody wanted to explain why the automated billing assistant was still waiting on an access ticket.

Sentence 3 (Medium, analytical):
When the system called the database, it did so with root privileges.

Sentence 4 (Short):
Nobody logged the query.
```

### The Cadence Rules
1. **Sentence Variety**: Never write three sentences of the same length in a row. Alternate between short declarative sentences (3–7 words) and complex, periodic sentences (25–40 words).
2. **Cut Adverbs**: Eliminate *devastatingly*, *critically*, *exponentially*, *fundamentally*, *catastrophically*. If the verb is strong, the adverb is redundant.
3. **Use Active Verbs of Motion**: Instead of *"facilitating the transfer of data"*, write *"routing the funds"*, *"dumping the ledger"*, *"skipping the check"*.

---

## 4. The 5-Step Anti-AI Audit Checklist

Before releasing any written artifact, execute this audit:

- [ ] **Check 1: Scan for "-ing" sentence tails.** Search for commas followed by `underscoring`, `highlighting`, `reflecting`, `ensuring`, `demonstrating`. Delete or split into independent sentences.
- [ ] **Check 2: Search for banned nouns & adjectives.** Zero occurrences of *testament*, *pivotal*, *evolving landscape*, *indelible*, *delve*, *crucial*.
- [ ] **Check 3: Measure Sentence Burstiness.** Ensure sentence lengths fluctuate dramatically across every single paragraph.
- [ ] **Check 4: Verify Grounding Specifics.** Every general claim must be tethered to a named researcher, a specific statute, an exact dollar loss, or a CVE code.
- [ ] **Check 5: Tone Test.** Does this sound like an excited vendor pitching a solution, or a weary, sharp investigative reporter explaining how a system broke? If it sounds like a pitch, strip the adjectives.
