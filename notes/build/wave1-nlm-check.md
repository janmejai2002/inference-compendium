# Wave 1 NotebookLM cross-check (2026-11-01)
Notebook: inference-found (175d3ad1). Six queries; answers are AI summaries, used only to find issues, not cited.

## next-word-machine
- Experts (Karpathy, Sanderson, IBM) agree: no database lookup, hallucination = plausible continuation, "lossy" compression is fair. No contradiction.
- Gap found: "just next-word prediction" omits post-training (supervised fine-tuning on example conversations, then human-feedback tuning). FIXED: one added sentence after the loop section.
- Gap found: principle step 5 / misconception said no lookup at all; products can add retrieval around the model. FIXED: caveat added ("inside the model", "the model itself").
- Temperature: notebook says temperature 0 gives repeatable output; chapter's "lower the randomness" is consistent. No change.
- Token = 3/4 word and non-English cost: NOT in the foundation videos (sources are OpenAI docs, Petrov, Sarvam, Ahia). Karpathy does note safety training is mostly English, so non-English can behave differently; editor could add it to a security/judging chapter, not here.
- Context window: Karpathy compares it to RAM (working memory). The chapter's desk analogy is equivalent. No change.

## kinds-of-ai
- Notebook has almost nothing on predictive vs generative ML (it covers LLMs, RAG, agents). Cannot confirm or contradict the core split from it; the chapter rests on MGI and HBR sources.
- "A language model also predicts" paragraph is consistent with the experts. No edits.

## Editor's call
- Whether to name the "reversal curse" (Karpathy: model answers "Tom Cruise's mother?" but often fails the reverse question) as an extra misconception in next-word-machine; it is a strong illustration that facts are not stored as a database, but needs the Karpathy timestamp opened first.
- Whether to add a source for the claim that the notebook lacks predictive-ML coverage (consider a vetted IBM or Google ML-vs-GenAI video for kinds-of-ai; ibm-predictive-vs-generative is already a Watch card).
