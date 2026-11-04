"""
Empirical Mathematical Audit and Verification Harness for INFERENCE Part VI (Finance Track)
Challenger 2 - Teamwork Adversarial Audit
"""
import math
import numpy as np

def run_audit():
    print("================================================================================")
    print("STARTING EMPIRICAL MATHEMATICAL AUDIT FOR PART VI (FINANCE TRACK)")
    print("================================================================================\n")
    
    findings = []
    
    # --------------------------------------------------------------------------
    # CHAPTER 22: Algorithmic Underwriting & Credit Risk
    # --------------------------------------------------------------------------
    print("--- AUDITING CHAPTER 22 ---")
    
    # 1. ECL formula
    EAD_1 = 1000000
    PD_1 = 0.035
    Recovery_1 = 0.40
    LGD_1 = 1 - Recovery_1
    ECL_1 = EAD_1 * PD_1 * LGD_1
    print(f"Ch 22 Retail Term Loan ECL: EAD={EAD_1}, PD={PD_1}, LGD={LGD_1} -> ECL = {ECL_1} (Expected: 21,000)")
    assert ECL_1 == 21000
    
    # Check yourself 2:
    EAD_cy2 = 4000000
    PD_cy2 = 0.04
    Recovery_cy2 = 0.35
    LGD_cy2 = 1 - Recovery_cy2
    ECL_cy2 = EAD_cy2 * PD_cy2 * LGD_cy2
    print(f"Ch 22 Check Yourself 2: EAD={EAD_cy2}, PD={PD_cy2}, LGD={LGD_cy2} -> ECL = {ECL_cy2} (Expected: 1,04,000)")
    assert ECL_cy2 == 104000
    
    # Illustrative Case (Line 173-196):
    AUM_sme = 12000 # crore
    GNPA_sme = 0.038 # 3.80%
    LGD_sme = 0.50
    defaulted_exposure = AUM_sme * GNPA_sme # 456 crore
    actual_baseline_credit_loss = defaulted_exposure * LGD_sme # 228 crore
    text_stated_baseline_credit_loss = 86.64 # crore stated in line 179!
    print(f"Ch 22 Illustrative Case Line 179:")
    print(f"  Calculated: 12000 * 0.038 * 0.50 = {actual_baseline_credit_loss} Cr")
    print(f"  Text stated: {text_stated_baseline_credit_loss} Cr")
    if abs(actual_baseline_credit_loss - text_stated_baseline_credit_loss) > 0.01:
        findings.append({
            "chapter": "22",
            "location": "Line 179 (Illustrative Case)",
            "severity": "CRITICAL",
            "issue": f"Arithmetic contradiction in credit loss formula: 12,000 Cr * 0.038 * 0.50 = 228.00 Cr, but text states 86.64 Cr.",
            "expected": "228.00 crore/year",
            "actual_in_text": "86.64 crore/year"
        })
    
    # Line 194 delta credit loss:
    delta_gnpa_sme = 0.0065 # 65 bps
    delta_loss_sme = AUM_sme * delta_gnpa_sme * LGD_sme # 39.00 Cr
    print(f"Ch 22 Line 194 Delta Credit Loss: 12000 * 0.0065 * 0.50 = {delta_loss_sme} Cr (Text: 39.00 Cr)")
    assert delta_loss_sme == 39.0
    
    # Shapley Values Try-it (Line 240)
    shap_vals = [4.2, 3.1, 2.5, 1.8, -2.8]
    sum_shap = sum(shap_vals)
    pd_raw = 14.8
    base_rate = pd_raw - sum_shap
    print(f"Ch 22 Shapley Try-it: Sum of SHAP = {sum_shap}%, Raw PD = {pd_raw}%, Base Rate = {base_rate}%")
    assert round(sum_shap, 1) == 8.8
    assert round(base_rate, 1) == 6.0
    
    # --------------------------------------------------------------------------
    # CHAPTER 24: Financial Crime, Fraud, and RBI FREE-AI
    # --------------------------------------------------------------------------
    print("\n--- AUDITING CHAPTER 24 ---")
    
    # Bayes theorem
    tpr_24 = 0.99
    fpr_24 = 0.01
    pi_24 = 0.0001
    p_legit_24 = 1 - pi_24
    num_24 = tpr_24 * pi_24
    den_24 = num_24 + fpr_24 * p_legit_24
    posterior_24 = num_24 / den_24
    print(f"Ch 24 Bayes Posterior: Num={num_24:.6f}, Den={den_24:.6f}, P(Fraud|Alert) = {posterior_24*100:.4f}% (Text: 0.9804% ~ 0.98%)")
    assert round(posterior_24 * 100, 4) == 0.9804
    
    # Table Lines 69-74 (N = 40M)
    N_24 = 40000000
    actual_fraud_count = N_24 * pi_24 # 4000
    tp_count = actual_fraud_count * tpr_24 # 3960
    fn_count = actual_fraud_count - tp_count # 40
    actual_clean_count = N_24 * p_legit_24 # 39,996,000
    fp_count = actual_clean_count * fpr_24 # 399,960
    tn_count = actual_clean_count - fp_count # 39,596,040
    total_alerts = tp_count + fp_count # 403,920
    total_cleared = fn_count + tn_count # 39,596,080
    prec_table = tp_count / total_alerts
    print(f"Ch 24 Table: Alerts={total_alerts}, Cleared={total_cleared}, Precision={prec_table*100:.4f}%")
    assert total_alerts == 403920
    assert total_cleared == 39596080
    assert round(prec_table * 100, 4) == 0.9804
    
    # Check yourself 3:
    N_cy3 = 10000000
    pi_cy3 = 0.0002
    tpr_cy3 = 0.95
    fpr_cy3 = 0.005
    tf_cy3 = N_cy3 * pi_cy3 # 2000
    tp_cy3 = tf_cy3 * tpr_cy3 # 1900
    clean_cy3 = N_cy3 - tf_cy3 # 9,998,000
    fp_cy3 = clean_cy3 * fpr_cy3 # 49,990
    alerts_cy3 = tp_cy3 + fp_cy3 # 51,890
    prec_cy3 = tp_cy3 / alerts_cy3 # 1900 / 51890 = 0.0366159
    print(f"Ch 24 Check Yourself 3: Alerts={alerts_cy3}, Prec={prec_cy3*100:.2f}% (Text: 51,890 and ~3.66%)")
    assert alerts_cy3 == 51890
    assert round(prec_cy3 * 100, 2) == 3.66
    
    # --------------------------------------------------------------------------
    # CHAPTER 25: Casebook - 8 Quantitative Problems
    # --------------------------------------------------------------------------
    print("\n--- AUDITING CHAPTER 25 ---")
    
    # CASE 1: Commercial SME Lending
    print("\n[Case 1: Commercial SME Lending]")
    aum_c1 = 10000 # Cr
    gnpa_base_c1 = 0.042
    lgd_c1 = 0.50
    prov_base_c1 = aum_c1 * gnpa_base_c1 * lgd_c1 # 210.0 Cr
    opex_base_c1 = aum_c1 * 0.035 # 350.0 Cr
    nim_c1 = aum_c1 * 0.0475 # 475.0 Cr
    pbt_base_c1 = nim_c1 - prov_base_c1 - opex_base_c1 # -85.0 Cr
    print(f"  Baseline PBT: {pbt_base_c1:.2f} Cr (Expected: -85.0 Cr)")
    assert round(pbt_base_c1, 2) == -85.0
    
    delta_gnpa_c1 = 0.0060 # 60 bps
    delta_prov_c1 = aum_c1 * delta_gnpa_c1 * lgd_c1 # 30.0 Cr
    delta_opex_c1 = aum_c1 * 0.0080 # 80.0 Cr
    delta_pbt_c1 = delta_prov_c1 + delta_opex_c1 # 110.0 Cr
    new_pbt_c1 = pbt_base_c1 + delta_pbt_c1 # +25.0 Cr
    print(f"  Delta PBT: {delta_pbt_c1:.2f} Cr, New PBT: {new_pbt_c1:.2f} Cr")
    assert round(delta_pbt_c1, 2) == 110.0
    assert round(new_pbt_c1, 2) == 25.0
    
    tax_rate = 0.2517
    delta_pat_c1 = delta_pbt_c1 * (1 - tax_rate) # 82.313 Cr
    delta_roa_c1 = delta_pbt_c1 / aum_c1 # 1.10%
    tier1_eq_c1 = aum_c1 * 0.10 # 1000 Cr
    delta_roe_c1 = delta_pat_c1 / tier1_eq_c1 # 8.2313%
    print(f"  Delta PAT: {delta_pat_c1:.2f} Cr, Delta ROA: {delta_roa_c1*100:.2f}%, Delta ROE: {delta_roe_c1*100:.2f}%")
    assert round(delta_pat_c1, 2) == 82.31
    assert round(delta_roa_c1 * 100, 2) == 1.10
    assert round(delta_roe_c1 * 100, 2) == 8.23
    
    # Case 1 Sensitivity Table:
    print("  Verifying Case 1 Sensitivity Table (Delta PBT in Cr):")
    sens_c1_expected = [
        [80.0, 100.0, 120.0],
        [90.0, 110.0, 130.0],
        [100.0, 120.0, 140.0]
    ]
    def_reductions = [0.0040, 0.0060, 0.0080]
    opex_reductions = [0.0060, 0.0080, 0.0100]
    for r_idx, d_red in enumerate(def_reductions):
        for c_idx, o_red in enumerate(opex_reductions):
            val = (aum_c1 * d_red * lgd_c1) + (aum_c1 * o_red)
            exp = sens_c1_expected[r_idx][c_idx]
            assert round(val, 1) == exp
    print("  -> Case 1 Sensitivity Table 100% verified!")
    
    # CASE 2: Private Equity M&A Due Diligence
    print("\n[Case 2: Private Equity M&A Diligence]")
    # Line 141 entry haircut:
    unaccrued_liab = 52.0
    arr_haircut_cash = 33.0
    entry_reduction = unaccrued_liab + arr_haircut_cash # 85.0 Cr
    print(f"  Entry valuation reduction: {entry_reduction} Cr (Text: 85.0 Cr)")
    assert entry_reduction == 85.0
    
    # Line 147-151:
    base_ebitda_c2 = 300.0
    # Text line 147 says: "compress operating expenses by 14.0%, yielding INR 84.0 crore in annual cash opex savings."
    # Text line 148 says: "Annual EBITDA expands from INR 300 crore to INR 420 crore (EBITDA margin rises from 20.0% to 28.0%)."
    # Notice: 420 - 300 = 120.0 Cr, NOT 84.0 Cr!
    print(f"  Text line 147 claims opex savings = 84.0 Cr")
    print(f"  Text line 148 claims EBITDA expands by: 420 - 300 = 120.0 Cr")
    if 420 - 300 != 84.0:
        findings.append({
            "chapter": "25",
            "location": "Case 2 (Lines 147-148)",
            "severity": "HIGH",
            "issue": f"Internal contradiction between stated opex savings (INR 84.0 Cr in line 147) and stated EBITDA expansion (INR 120.0 Cr from INR 300 Cr to INR 420 Cr in line 148).",
            "expected": "EBITDA expansion of INR 120.0 Cr (8.0% of INR 1,500 Cr revenue) or clarify where the remaining INR 36.0 Cr expansion originates.",
            "actual_in_text": "INR 84.0 Cr opex savings vs INR 120.0 Cr EBITDA expansion"
        })
    
    delta_ev_exit = (420.0 - 300.0) * 12.0 # 1440.0 Cr
    fee_savings = 2.2
    total_val_c2 = entry_reduction + fee_savings + delta_ev_exit # 85 + 2.2 + 1440 = 1527.2 Cr
    print(f"  Total Enterprise Value Created: {total_val_c2} Cr (Text: 1527.2 Cr)")
    assert total_val_c2 == 1527.2
    
    # Case 2 Sensitivity Table (Lines 158-163):
    print("  Verifying Case 2 Sensitivity Table:")
    sens_c2_expected = [
        [900.0, 1080.0, 1260.0],
        [1200.0, 1440.0, 1680.0],
        [1500.0, 1800.0, 2100.0]
    ]
    ebitda_expansions = [90.0, 120.0, 150.0]
    multiples = [10.0, 12.0, 14.0]
    for r_idx, eb in enumerate(ebitda_expansions):
        for c_idx, mult in enumerate(multiples):
            val = eb * mult
            exp = sens_c2_expected[r_idx][c_idx]
            assert round(val, 1) == exp
    print("  -> Case 2 Sensitivity Table 100% verified!")
    
    # CASE 3: Retail Wealth Management
    print("\n[Case 3: Retail Wealth Management]")
    aum_c3 = 40000 # Cr
    clients_c3 = 80000
    rms_base = 500
    comp_rm = 0.24 # 24.0 lakh = 0.24 Cr
    base_payroll = rms_base * comp_rm # 120.0 Cr
    gross_fee_base = aum_c3 * 0.0075 # 300.0 Cr
    
    # New capacity = 800 clients/RM
    rms_needed = clients_c3 / 800 # 100
    rms_reduced = rms_base - rms_needed # 400
    payroll_savings_c3 = rms_reduced * comp_rm # 96.0 Cr
    
    # Churn: 10.0% -> 5.5% (450 bps reduction)
    retained_aum = aum_c3 * 0.045 # 1800.0 Cr
    fee_preserved = retained_aum * 0.0075 # 13.5 Cr
    total_val_c3 = payroll_savings_c3 + fee_preserved # 109.5 Cr
    print(f"  Payroll savings: {payroll_savings_c3} Cr, Preserved fees: {fee_preserved} Cr, Total: {total_val_c3} Cr")
    assert payroll_savings_c3 == 96.0
    assert fee_preserved == 13.5
    assert total_val_c3 == 109.5
    
    # Margins:
    base_margin = (gross_fee_base - base_payroll) / gross_fee_base # 60.0%
    opt_margin = (gross_fee_base + fee_preserved - (rms_needed * comp_rm)) / (gross_fee_base + fee_preserved)
    print(f"  Baseline Margin: {base_margin*100:.1f}%, Optimized Margin: {opt_margin*100:.1f}% (Text: 92.3%)")
    assert round(base_margin * 100, 1) == 60.0
    assert round(opt_margin * 100, 1) == 92.3
    
    # Case 3 Sensitivity Table (Lines 205-210):
    print("  Auditing Case 3 Sensitivity Table:")
    # Header: | Advisor Capacity \ Churn Reduction | 300 bps (INR 12 Cr fee) | 450 bps (INR 13.5 Cr fee) | 600 bps (INR 18 Cr fee) |
    # Notice: 300 bps of 40,000 Cr at 0.75% = 40,000 * 0.03 * 0.0075 = 9.0 Cr, NOT 12.0 Cr!
    fee_300bps_actual = aum_c3 * 0.030 * 0.0075 # 9.0 Cr
    fee_300bps_header = 12.0 # Cr in text header!
    print(f"    Fee for 300 bps churn reduction: Calculated = {fee_300bps_actual} Cr vs Text Header = {fee_300bps_header} Cr")
    if fee_300bps_actual != fee_300bps_header:
        findings.append({
            "chapter": "25",
            "location": "Case 3 Sensitivity Table (Line 205)",
            "severity": "HIGH",
            "issue": f"Mathematical error in sensitivity table column header: 300 bps churn reduction on INR 40,000 Cr AUM at 0.75% fee yields INR 9.0 Cr fee, but table header states 'INR 12 Cr fee'.",
            "expected": "300 bps (INR 9.0 Cr fee)",
            "actual_in_text": "300 bps (INR 12 Cr fee)"
        })
    
    # Check Row 1: "600 clients / RM (67 RMs retained)"
    # 80,000 / 600 = 133.33 RMs retained, NOT 67!
    rms_600 = clients_c3 / 600 # 133.33
    print(f"    RMs retained for 600 clients/RM: Calculated = {rms_600:.2f} vs Text Header = 67 RMs retained")
    if round(rms_600, 2) != 67.0:
        findings.append({
            "chapter": "25",
            "location": "Case 3 Sensitivity Table (Line 207)",
            "severity": "HIGH",
            "issue": f"Row label error: 80,000 clients at 600 clients/RM requires 133.33 RMs (or 133 RMs), but text states '67 RMs retained'.",
            "expected": "600 clients / RM (133 RMs retained)",
            "actual_in_text": "600 clients / RM (67 RMs retained)"
        })
    
    # Check numbers in Case 3 table:
    # Text values:
    # Row 1: [92.0, 93.5, 98.0]
    # Row 2: [108.0, 109.5, 114.0]
    # Row 3: [112.8, 114.3, 118.8]
    # In Row 2: 96 + 12 = 108, 96 + 13.5 = 109.5, 96 + 18 = 114. (Matches if using 12, 13.5, 18)
    # In Row 3: 100.8 + 12 = 112.8, 100.8 + 13.5 = 114.3, 100.8 + 18 = 118.8. (Matches if using 12, 13.5, 18)
    # In Row 1: The row values are 92.0, 93.5, 98.0 -> implies payroll savings = 80.0 Cr!
    # But 80 Cr payroll savings means 80 / 0.24 = 333.33 RMs saved -> 166.67 RMs retained.
    # If 133.33 RMs were retained, payroll savings would be (500 - 133.33) * 0.24 = 88.0 Cr!
    # And if 300 bps used 9.0 Cr, col 1 values should be:
    # Row 2: 96 + 9 = 105.0 Cr (instead of 108.0 Cr)
    # Row 3: 100.8 + 9 = 109.8 Cr (instead of 112.8 Cr)
    
    # CASE 4: Fraud and AML Operations
    print("\n[Case 4: Fraud and AML Operations]")
    txns_c4 = 250000000
    alert_rate_c4 = 0.002
    alerts_c4 = txns_c4 * alert_rate_c4 # 500,000
    cost_per_alert_base = 150 # INR
    spend_base_c4 = alerts_c4 * cost_per_alert_base # 75,000,000 = 7.50 Cr/mo
    annual_spend_base_c4 = spend_base_c4 * 12 # 90.0 Cr/yr
    print(f"  Baseline monthly spend: {spend_base_c4/1e7:.2f} Cr/mo, annual: {annual_spend_base_c4/1e7:.2f} Cr/yr")
    assert math.isclose(spend_base_c4, 7.5e7)
    assert math.isclose(annual_spend_base_c4, 90.0e7)
    
    auto_count_c4 = alerts_c4 * 0.65 # 325,000
    esc_count_c4 = alerts_c4 * 0.35 # 175,000
    auto_cost_c4 = auto_count_c4 * 2.0 # 650,000 = 0.065 Cr
    esc_cost_c4 = esc_count_c4 * 50.0 # 8,750,000 = 0.875 Cr
    opt_spend_c4 = auto_cost_c4 + esc_cost_c4 # 9,400,000 = 0.940 Cr
    delta_spend_mo_c4 = spend_base_c4 - opt_spend_c4 # 65,600,000 = 6.560 Cr
    delta_spend_yr_c4 = delta_spend_mo_c4 * 12 # 78.72 Cr
    pct_red_c4 = delta_spend_mo_c4 / spend_base_c4 # 87.4666% -> 87.5%
    print(f"  Opt monthly spend: {opt_spend_c4/1e7:.3f} Cr, Savings: {delta_spend_yr_c4/1e7:.2f} Cr/yr ({pct_red_c4*100:.1f}%)")
    assert math.isclose(opt_spend_c4, 0.94e7)
    assert math.isclose(delta_spend_mo_c4, 6.56e7)
    assert math.isclose(delta_spend_yr_c4, 78.72e7)
    
    # Case 4 Sensitivity Table (Lines 249-253):
    print("  Auditing Case 4 Sensitivity Table:")
    # Text table values:
    # | Auto-Dismissal Rate \ Escalated Review Cost | INR 40 Unit Cost | INR 50 Unit Cost | INR 60 Unit Cost |
    # | **55% Auto-Dismissal (225k escalated)** | INR 72.5 Cr | INR 69.8 Cr | INR 67.1 Cr |
    # | **65% Auto-Dismissal (175k escalated)** | INR 80.8 Cr | INR 78.7 Cr | INR 76.6 Cr |
    # | **75% Auto-Dismissal (125k escalated)** | INR 89.1 Cr | INR 87.6 Cr | INR 86.1 Cr |
    sens_c4_text = [
        [72.5, 69.8, 67.1],
        [80.8, 78.7, 76.6],
        [89.1, 87.6, 86.1]
    ]
    auto_rates = [0.55, 0.65, 0.75]
    unit_costs = [40, 50, 60]
    for r_idx, ar in enumerate(auto_rates):
        for c_idx, uc in enumerate(unit_costs):
            auto_c = (alerts_c4 * ar) * 2.0
            esc_c = (alerts_c4 * (1 - ar)) * uc
            tot_mo = auto_c + esc_c
            sav_yr = (spend_base_c4 - tot_mo) * 12 / 1e7
            txt_val = sens_c4_text[r_idx][c_idx]
            print(f"    Rate {ar*100}%, Cost INR {uc}: Calculated = INR {sav_yr:.2f} Cr vs Text = INR {txt_val} Cr (Diff = {sav_yr - txt_val:.2f} Cr)")
            # Notice the discrepancy!
            if abs(sav_yr - txt_val) > 0.2:
                findings.append({
                    "chapter": "25",
                    "location": f"Case 4 Sensitivity Table (Row {r_idx+1}, Col {c_idx+1})",
                    "severity": "HIGH",
                    "issue": f"Discrepancy in Case 4 sensitivity table: for auto-rate {ar*100}% and unit cost INR {uc}, annual savings is INR {sav_yr:.2f} Cr, but text states INR {txt_val} Cr.",
                    "expected": f"INR {sav_yr:.1f} Cr",
                    "actual_in_text": f"INR {txt_val} Cr"
                })
    
    # GUESSTIMATE 1: Sizing 3-Year TCO for On-Premise GPU Cluster vs Cloud API
    print("\n[Guesstimate 1: Private AI Cluster TCO]")
    monthly_queries_g1 = 20000000
    prompt_tokens = 2000
    comp_tokens = 300
    total_tokens_per_query = prompt_tokens + comp_tokens # 2300
    monthly_tokens = monthly_queries_g1 * total_tokens_per_query # 46B
    
    # On-prem:
    capex_nodes = 4 * 320000 * 85 / 1e7 # 10.88 Cr
    capex_fabric = 220000 * 85 / 1e7 # 1.87 Cr
    capex_total = capex_nodes + capex_fabric # 12.75 Cr
    
    pue = 1.35
    kw_draw = 40.8 * pue # 55.08 kW
    annual_kwh = kw_draw * 8760 # 482,490.8 kWh
    power_cost_yr = annual_kwh * 11 / 1e7 # 0.5307 Cr
    colo_yr = 3600000 / 1e7 # 0.36 Cr
    mlops_yr = 7000000 / 1e7 # 0.70 Cr
    maint_yr = capex_total * 0.18 # 2.295 Cr
    opex_total_yr = power_cost_yr + colo_yr + mlops_yr + maint_yr # 3.8857 Cr ~ 3.89 Cr
    tco_onprem_3yr = capex_total + (3 * opex_total_yr) # 24.407 Cr ~ 24.42 Cr
    print(f"  Capex: {capex_total:.2f} Cr, Annual Opex: {opex_total_yr:.2f} Cr, 3-Yr On-Prem TCO: {tco_onprem_3yr:.2f} Cr")
    
    # Cloud API:
    # $1.50 / 1M input, $6.00 / 1M output, exchange rate 85
    c_input = (prompt_tokens / 1e6) * 1.50 # $0.0030
    c_output = (comp_tokens / 1e6) * 6.00 # $0.0018
    c_query_usd = c_input + c_output # $0.0048
    c_query_inr = c_query_usd * 85 # INR 0.408
    print(f"  Cost per query: ${c_query_usd:.4f} = INR {c_query_inr:.3f}")
    assert round(c_query_inr, 3) == 0.408
    
    # Annual cloud spend:
    # 20M queries/month * 12 months * 0.408 INR
    annual_cloud_spend_actual = (monthly_queries_g1 * 12 * c_query_inr) / 1e7 # IN CRORES!
    print(f"  Annual Cloud API Spend:")
    print(f"    Calculated: 20,000,000 * 12 * 0.408 = INR {monthly_queries_g1 * 12 * c_query_inr:,.2f} = INR {annual_cloud_spend_actual:.3f} Crore")
    print(f"    Text Line 284 states: INR 97.92 crore/year")
    print(f"    3-Year Cloud TCO Calculated: INR {annual_cloud_spend_actual * 3:.3f} Crore vs Text: INR 293.76 crore")
    
    if abs(annual_cloud_spend_actual - 97.92) > 1.0:
        findings.append({
            "chapter": "25",
            "location": "Guesstimate 1 (Lines 284-286, 290, 299)",
            "severity": "CRITICAL",
            "issue": f"10x decimal order-of-magnitude error in Cloud API Spend: 20M queries * 12 months * INR 0.408/query = INR 97,920,000 (INR 9.792 Crore/year), but text states INR 97.92 crore/year (and 3-year TCO INR 293.76 Cr instead of INR 29.38 Cr). Net savings is INR 4.96 Cr, NOT INR 269.34 Cr.",
            "expected": "Annual Cloud API Spend: INR 9.792 crore/year; 3-year Cloud TCO: INR 29.38 crore; Net 3-year savings: INR 4.96 crore.",
            "actual_in_text": "Annual spend: INR 97.92 crore/year; 3-year Cloud TCO: INR 293.76 crore; Net savings: INR 269.34 crore."
        })
    
    # Crossover volume:
    fixed_annual_onprem = (capex_total / 3) + opex_total_yr # 4.25 + 3.8857 = 8.1357 Cr
    crossover_queries_yr = (fixed_annual_onprem * 1e7) / c_query_inr # ~19,940,000 queries/year
    crossover_queries_mo = crossover_queries_yr / 12 # ~1,661,700 queries/month
    print(f"  Crossover volume: {crossover_queries_yr:,.0f} queries/year ({crossover_queries_mo:,.0f} queries/month)")
    print(f"  Text Line 289 states: ~19,950,980 queries/year (~1.66 million queries/month)")
    
    # GUESSTIMATE 2: Debt Covenant Monitoring
    print("\n[Guesstimate 2: Debt Covenant Monitoring]")
    aum_g2 = 50000 # Cr
    borrowers_g2 = 500
    breached_rate_g2 = 0.08 # 40 accounts
    breached_exp_g2 = aum_g2 * breached_rate_g2 # 4000 Cr
    default_rate_breached_base = 0.25 # 10 accounts, 1000 Cr
    lgd_base_g2 = 0.55
    loss_base_g2 = 1000.0 * lgd_base_g2 # 550.0 Cr
    
    default_rate_opt = 0.125 # 5 accounts, 500 Cr
    lgd_opt_g2 = 0.40
    loss_opt_g2 = 500.0 * lgd_opt_g2 # 200.0 Cr
    loss_savings_g2 = loss_base_g2 - loss_opt_g2 # 350.0 Cr
    waiver_fees_g2 = 15 * 0.25 # 3.75 Cr
    total_val_g2 = loss_savings_g2 + waiver_fees_g2 # 353.75 Cr
    print(f"  Baseline Loss: {loss_base_g2} Cr, Opt Loss: {loss_opt_g2} Cr, Savings: {loss_savings_g2} Cr, Total: {total_val_g2} Cr")
    assert loss_base_g2 == 550.0
    assert loss_opt_g2 == 200.0
    assert loss_savings_g2 == 350.0
    assert total_val_g2 == 353.75
    
    # Guesstimate 2 Sensitivity Table (Lines 338-343):
    print("  Verifying Guesstimate 2 Sensitivity Table:")
    sens_g2_expected = [
        [280.0, 310.0, 340.0],
        [325.0, 350.0, 375.0],
        [370.0, 390.0, 410.0]
    ]
    def_rates_g2 = [0.15, 0.125, 0.10]
    lgds_g2 = [0.45, 0.40, 0.35]
    for r_idx, dr in enumerate(def_rates_g2):
        for c_idx, lgd in enumerate(lgds_g2):
            def_exp = breached_exp_g2 * dr
            new_loss = def_exp * lgd
            savings = loss_base_g2 - new_loss
            exp = sens_g2_expected[r_idx][c_idx]
            assert round(savings, 1) == exp
    print("  -> Guesstimate 2 Sensitivity Table 100% verified!")
    
    # GUESSTIMATE 3: NBFC Back-Office Automation
    print("\n[Guesstimate 3: NBFC Back-Office Automation]")
    aum_g3 = 8000 # Cr
    noi_g3 = 600.0 # Cr
    ci_base_g3 = 0.48
    opex_base_g3 = noi_g3 * ci_base_g3 # 288.0 Cr
    prov_base_g3 = aum_g3 * 0.015 # 120.0 Cr
    pbt_base_g3 = noi_g3 - opex_base_g3 - prov_base_g3 # 192.0 Cr
    pat_base_g3 = pbt_base_g3 * (1 - tax_rate) # 143.6736 Cr
    bv_g3 = 1000.0 # Cr
    roe_base_g3 = pat_base_g3 / bv_g3 # 14.367% -> 14.37%
    mcap_base_g3 = 1.80 * bv_g3 # 1800.0 Cr
    pe_base_g3 = mcap_base_g3 / pat_base_g3 # 12.528x -> 12.5x
    
    opex_savings_g3 = 52.5 # Cr
    opex_opt_g3 = opex_base_g3 - opex_savings_g3 # 235.5 Cr
    ci_opt_g3 = opex_opt_g3 / noi_g3 # 39.25%
    prov_savings_g3 = aum_g3 * 0.0015 # 12.0 Cr
    prov_opt_g3 = prov_base_g3 - prov_savings_g3 # 108.0 Cr
    pbt_opt_g3 = noi_g3 - opex_opt_g3 - prov_opt_g3 # 256.5 Cr
    pat_opt_g3 = pbt_opt_g3 * (1 - tax_rate) # 191.93895 Cr -> 191.94 Cr
    roe_opt_g3 = pat_opt_g3 / bv_g3 # 19.1938% -> 19.19%
    mcap_opt_g3 = 2.40 * bv_g3 # 2400.0 Cr
    delta_mcap_g3 = mcap_opt_g3 - mcap_base_g3 # 600.0 Cr
    pe_opt_val = 14.5 * pat_opt_g3 # 2783.11 Cr
    print(f"  Base ROE: {roe_base_g3*100:.2f}%, Opt ROE: {roe_opt_g3*100:.2f}%, Delta Mcap: {delta_mcap_g3} Cr, P/E Val: {pe_opt_val:.1f} Cr")
    assert round(pat_base_g3, 2) == 143.67
    assert round(roe_base_g3 * 100, 2) == 14.37
    assert round(pbt_opt_g3, 1) == 256.5
    assert round(pat_opt_g3, 2) == 191.94
    assert round(roe_opt_g3 * 100, 2) == 19.19
    assert delta_mcap_g3 == 600.0
    assert round(pe_opt_val, 1) == 2783.1
    
    # Guesstimate 3 Sensitivity Table (Lines 383-388):
    print("  Auditing Guesstimate 3 Sensitivity Table:")
    # The table has columns 2.10x, 2.40x, 2.70x P/B, and rows for C/I 42.0%, 39.25%, 36.0%.
    # But every cell is simply Book Value (1000 Cr) * P/B multiple!
    # Row 1: 2100, 2400, 2700
    # Row 2: 2100, 2400, 2700
    # Row 3: 2100, 2400, 2700
    print("    Sensitivity table shows invariant market caps across C/I ratio rows (2100, 2400, 2700 in all rows).")
    findings.append({
        "chapter": "25",
        "location": "Guesstimate 3 Sensitivity Table (Lines 384-388)",
        "severity": "MEDIUM",
        "issue": "Degenerate sensitivity matrix: Market capitalization is calculated solely as Book Value (INR 1,000 Cr) * P/B Multiple, ignoring the impact of Cost-to-Income compression on PAT, resulting in identical values across all three C/I rows.",
        "expected": "Model valuation as P/E Multiple * PAT (reflecting C/I compression) or dynamic P/B tied to ROE, rather than static BV * P/B.",
        "actual_in_text": "All rows are identical (INR 2,100 Cr, INR 2,400 Cr, INR 2,700 Cr)"
    })
    
    # GUESSTIMATE 4: Algorithmic Trading Liquidity Shock Capital Buffer
    print("\n[Guesstimate 4: Algo Trading Liquidity Shock Buffer]")
    q_g4 = 1500.0 # Cr
    slippage_cost_g4 = q_g4 * 0.0185 # 27.75 Cr
    dir_loss_g4 = q_g4 * 0.0450 # 67.50 Cr
    margin_demand_g4 = q_g4 * 0.140 # 21.00 Cr
    otr_penalty_g4 = 3.50 # Cr
    subtotal_g4 = slippage_cost_g4 + dir_loss_g4 + margin_demand_g4 + otr_penalty_g4 # 119.75 Cr
    buffer_g4 = subtotal_g4 * 1.15 # 137.7125 Cr -> 137.71 Cr
    print(f"  Subtotal: {subtotal_g4} Cr, Mandatory Buffer (with 15% safety): {buffer_g4:.2f} Cr")
    assert slippage_cost_g4 == 27.75
    assert dir_loss_g4 == 67.50
    assert margin_demand_g4 == 21.00
    assert subtotal_g4 == 119.75
    assert round(buffer_g4, 2) == 137.71
    
    # Guesstimate 4 Sensitivity Table (Lines 430-436):
    print("  Auditing Guesstimate 4 Sensitivity Table:")
    # Header: | Liquidation Slippage \ Adverse Price Drop | 3.0% Price Drop | 4.5% Price Drop | 6.0% Price Drop |
    # Text values:
    # Row 1 (1.20% Slippage): [106.4, 132.3, 158.1]
    # Row 2 (1.85% Slippage): [117.6, 137.7, 169.3]
    # Row 3 (2.50% Slippage): [128.8, 154.7, 180.6]
    sens_g4_text = [
        [106.4, 132.3, 158.1],
        [117.6, 137.7, 169.3],
        [128.8, 154.7, 180.6]
    ]
    slippages_g4 = [0.0120, 0.0185, 0.0250]
    price_drops_g4 = [0.030, 0.045, 0.060]
    for r_idx, sl in enumerate(slippages_g4):
        for c_idx, pd in enumerate(price_drops_g4):
            sl_cost = q_g4 * sl
            pd_cost = q_g4 * pd
            sub = sl_cost + pd_cost + margin_demand_g4 + otr_penalty_g4
            buf = sub * 1.15
            txt_v = sens_g4_text[r_idx][c_idx]
            print(f"    Slippage {sl*100:.2f}%, Drop {pd*100:.1f}%: Calculated = {buf:.2f} Cr vs Text = {txt_v} Cr (Diff = {buf - txt_v:.2f} Cr)")
            if abs(buf - txt_v) > 0.2:
                findings.append({
                    "chapter": "25",
                    "location": f"Guesstimate 4 Sensitivity Table (Row {r_idx+1}, Col {c_idx+1})",
                    "severity": "HIGH",
                    "issue": f"Discrepancy in Guesstimate 4 sensitivity table: for slippage {sl*100:.2f}% and price drop {pd*100:.1f}%, calculated buffer is INR {buf:.2f} Cr, but text states INR {txt_v} Cr.",
                    "expected": f"INR {buf:.1f} Cr",
                    "actual_in_text": f"INR {txt_v} Cr"
                })
    
    print("\n================================================================================")
    print(f"AUDIT COMPLETE: FOUND {len(findings)} ISSUES/DISCREPANCIES ACROSS THE 4 CHAPTERS")
    print("================================================================================\n")
    for idx, f in enumerate(findings, 1):
        print(f"[{idx}] Severity: {f['severity']} | Ch {f['chapter']} | {f['location']}")
        print(f"    Issue: {f['issue']}")
        print(f"    Expected: {f['expected']}")
        print(f"    In Text:  {f['actual_in_text']}\n")

if __name__ == "__main__":
    run_audit()
