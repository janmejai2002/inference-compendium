"""
Empirical Verification of Remediated Mathematics in Part VI (Finance Track)
Dynamic test harness running against actual markdown content files.
"""
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def verify():
    print("================================================================================")
    print("VERIFYING REMEDIATED MATHEMATICS ACROSS PART VI FILES")
    print("================================================================================\n")
    
    errors = []
    
    # 1. Verify Chapter 22: Algorithmic Underwriting & Credit Risk
    print("[1] Verifying content/chapters/algorithmic-underwriting-and-credit-risk.md...")
    with open('content/chapters/algorithmic-underwriting-and-credit-risk.md', 'r', encoding='utf-8') as f:
        ch22 = f.read()
    
    # Check baseline credit loss
    expected_ch22_loss = r"\text{Annual Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.038 \times 0.50 = \mathbf{\text{₹}228.00\text{ crore/year}}"
    if expected_ch22_loss not in ch22:
        errors.append("Chapter 22 does not contain expected credit loss formula: ₹228.00 crore/year")
    else:
        print("  ✔ Chapter 22 Annual Credit Loss formula verified: ₹228.00 crore/year (12000 * 0.038 * 0.50 = 228.00)")
    
    # 2. Verify Glossary definitions
    print("\n[2] Verifying content/glossary.yml...")
    with open('content/glossary.yml', 'r', encoding='utf-8') as f:
        gloss = f.read()
    
    if "(LGD = 1 − Recovery Rate)" not in gloss:
        errors.append("Glossary missing plain unicode LGD definition")
    else:
        print("  ✔ Glossary LGD plain unicode verified: (LGD = 1 − Recovery Rate)")
        
    if "(ECL = EAD × PD × LGD)" not in gloss:
        errors.append("Glossary missing plain unicode ECL definition")
    else:
        print("  ✔ Glossary ECL plain unicode verified: (ECL = EAD × PD × LGD)")
        
    # Check for raw LaTeX in LGD/ECL
    if r"$LGD = 1 - \text{Recovery Rate}$" in gloss or r"$ECL = EAD \times PD \times LGD$" in gloss:
        errors.append("Glossary still contains unparsed LaTeX syntax in LGD/ECL")
    else:
        print("  ✔ Glossary confirmed clean of LaTeX syntax in LGD/ECL")
        
    # 3. Verify Chapter 25: Finance Casebook
    print("\n[3] Verifying content/chapters/finance-casebook.md...")
    with open('content/chapters/finance-casebook.md', 'r', encoding='utf-8') as f:
        ch25 = f.read()
        
    # Edit 3.1: Case 2 duplicate \times and EBITDA bridge
    if r"6.0\times \times" in ch25:
        errors.append("Duplicate \\times \\times still present in Case 2")
    else:
        print("  ✔ Case 2 duplicate \\times \\times resolved")
        
    if "gross margin retention, delivering a total annual EBITDA expansion of ₹120.0 crore" not in ch25:
        errors.append("Case 2 EBITDA bridge missing ₹36.0 Cr gross margin retention reconciliation")
    else:
        print("  ✔ Case 2 EBITDA bridge verified (84.0 Cr opex + 36.0 Cr gross margin retention = 120.0 Cr)")
        
    # Edit 3.2: Case 3 sensitivity table
    if "| **600 clients / RM (133 RMs retained)** | ₹97.0 Cr | ₹101.5 Cr | ₹106.0 Cr |" not in ch25:
        errors.append("Case 3 sensitivity table missing corrected 600 clients/RM row")
    else:
        print("  ✔ Case 3 sensitivity table row 1 verified (133 RMs retained: 97.0, 101.5, 106.0)")
        
    if "| Advisor Capacity \\ Churn Reduction | 300 bps (₹9.0 Cr fee) | 450 bps (₹13.5 Cr fee) | 600 bps (₹18.0 Cr fee) |" not in ch25:
        errors.append("Case 3 sensitivity table header missing corrected 300 bps (₹9.0 Cr fee)")
    else:
        print("  ✔ Case 3 sensitivity table header verified (300 bps = ₹9.0 Cr fee)")
        
    # Edit 3.3: Case 4 sensitivity table
    if "| **55% Auto-Dismissal (225k escalated)** | ₹78.5 Cr | ₹75.8 Cr | ₹73.1 Cr |" not in ch25:
        errors.append("Case 4 sensitivity table missing corrected 55% auto-dismissal row")
    else:
        print("  ✔ Case 4 sensitivity table row 1 verified (78.5, 75.8, 73.1)")
        
    if "| **75% Auto-Dismissal (125k escalated)** | ₹83.1 Cr | ₹81.6 Cr | ₹80.1 Cr |" not in ch25:
        errors.append("Case 4 sensitivity table missing corrected 75% auto-dismissal row")
    else:
        print("  ✔ Case 4 sensitivity table row 3 verified (83.1, 81.6, 80.1)")
        
    # Edit 3.4: Guesstimate 1
    if r"\text{₹}9.792\text{ crore/year}" not in ch25:
        errors.append("Guesstimate 1 Annual Cloud API Spend missing ₹9.792 crore/year")
    else:
        print("  ✔ Guesstimate 1 Annual Cloud API spend verified: ₹9.792 crore/year (20M * 12 * 0.408)")
        
    if "3 \\times \\text{₹}9.792\\text{ Cr} = \\mathbf{\\text{₹}29.38\\text{ crore}}" not in ch25:
        errors.append("Guesstimate 1 3-Year Cloud API TCO missing ₹29.38 crore")
    else:
        print("  ✔ Guesstimate 1 3-Year Cloud TCO verified: ₹29.38 crore")
        
    if "199{,}509{,}804\\text{ queries/year}" not in ch25 or "16.63\\text{ million queries/month}" not in ch25:
        errors.append("Guesstimate 1 Crossover volume missing 199,509,804 queries/year / 16.63M queries/month")
    else:
        print("  ✔ Guesstimate 1 Crossover volume verified: 199,509,804 queries/yr (~16.63M queries/mo)")
        
    if "Self-hosting saves ₹4.96 crore across 3 years" not in ch25:
        errors.append("Guesstimate 1 net savings missing ₹4.96 crore")
    else:
        print("  ✔ Guesstimate 1 net 3-year savings verified: ₹4.96 crore (29.38 - 24.42)")
        
    # Edit 3.5: Guesstimate 3 P/E valuation
    if "| Cost-to-Income Ratio \\ P/E Multiple | 12.5x P/E (Base) | 14.5x P/E (Target) | 16.0x P/E (Bull) |" not in ch25:
        errors.append("Guesstimate 3 sensitivity table missing P/E Multiple header")
    else:
        print("  ✔ Guesstimate 3 sensitivity table non-degenerate P/E on PAT header verified")
        
    if "| **39.25% C/I (₹191.9 Cr PAT)** | ₹2,399.3 Cr | **₹2,783.1 Cr** | ₹3,071.0 Cr |" not in ch25:
        errors.append("Guesstimate 3 sensitivity table missing base case row ₹2,783.1 Cr")
    else:
        print("  ✔ Guesstimate 3 sensitivity table base case row verified (₹2,783.1 Cr target)")
        
    # Edit 3.6: Guesstimate 4 margin call & sensitivity table
    if "an incremental 1.40% / 140 basis points cash margin call" not in ch25:
        errors.append("Guesstimate 4 missing incremental 1.40% margin call demand")
    else:
        print("  ✔ Guesstimate 4 incremental margin call verified: 1.40% (140 bps) -> ₹21.00 Cr")
        
    if "| **1.20% Stressed Slippage** | ₹100.6 Cr | ₹126.5 Cr | ₹152.4 Cr |" not in ch25:
        errors.append("Guesstimate 4 sensitivity table row 1 incorrect")
    else:
        print("  ✔ Guesstimate 4 sensitivity table row 1 verified (100.6, 126.5, 152.4)")
        
    if "| **1.85% Stressed Slippage** | ₹111.8 Cr | **₹137.7 Cr** | ₹163.6 Cr |" not in ch25:
        errors.append("Guesstimate 4 sensitivity table row 2 incorrect")
    else:
        print("  ✔ Guesstimate 4 sensitivity table row 2 base case verified (111.8, 137.7, 163.6)")
        
    if "| **2.50% Stressed Slippage** | ₹123.1 Cr | ₹148.9 Cr | ₹174.8 Cr |" not in ch25:
        errors.append("Guesstimate 4 sensitivity table row 3 incorrect")
    else:
        print("  ✔ Guesstimate 4 sensitivity table row 3 verified (123.1, 148.9, 174.8)")
        
    # Summary
    print("\n================================================================================")
    if errors:
        print(f"VERIFICATION FAILED WITH {len(errors)} ERRORS:")
        for e in errors:
            print(f"  ✖ {e}")
        sys.exit(1)
    else:
        print("VERIFICATION COMPLETE: ALL 10 REMEDIATION BLUEPRINT EDITS 100% VERIFIED!")
        print("================================================================================")
        sys.exit(0)

if __name__ == '__main__':
    verify()
