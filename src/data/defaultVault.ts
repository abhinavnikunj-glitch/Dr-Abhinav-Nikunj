import { VaultNote } from '../types';

export const DEFAULT_VAULT_NOTES: VaultNote[] = [
  {
    id: 'vault-1',
    title: 'Pharmacology: 50+ Critical Drugs of Choice (DOCs)',
    subject: 'Pharmacology',
    tags: ['Pharma', 'DOC', 'Rapid Fire', 'High-Yield'],
    isPinned: true,
    highYieldLevel: 'CRITICAL',
    lastModified: Date.now() - 1000 * 60 * 60 * 12,
    content: `### ⚡ Top 25 Must-Know Drugs of Choice (NEET PG High-Yield)
- **Anaphylactic Shock**: Inj. Adrenaline (Epinephrine) 1:1000 (0.5 mg IM in anterolateral thigh)
- **Acute Myocardial Infarction (Analgesia)**: Morphine IV
- **Status Epilepticus**: IV Lorazepam (0.1 mg/kg) → followed by IV Fosphenytoin / Levetiracetam
- **Absence Seizures**: Ethosuximide (or Valproate)
- **Myoclonic Seizures & Juvenile Myoclonic Epilepsy (JME)**: Sodium Valproate (Levetiracetam in females of childbearing age)
- **Trigeminal Neuralgia**: Carbamazepine
- **Paroxysmal Supraventricular Tachycardia (PSVT)**: IV Adenosine (6 mg rapid bolus + saline flush)
- **Atrial Fibrillation (Rate Control)**: Beta-blockers (Metoprolol/Esmolol) or Diltiazem
- **Ventricular Tachycardia with pulse (Stable)**: IV Amiodarone
- **Ventricular Fibrillation / Pulseless VT**: Defibrillation (CPR + Epinephrine + Amiodarone)
- **MRSA Infection**: Vancomycin (IV) / Linezolid / Daptomycin
- **Pseudomonas aeruginosa**: Piperacillin-Tazobactam (Zosyn) / Ceftazidime / Meropenem
- **Clostridioides difficile (first episode)**: Oral Fidaxomicin or Oral Vancomycin
- **Syphilis (Primary/Secondary/Latent)**: Benzathine Penicillin G (2.4 MU IM)
- **Neurosyphilis**: Aqueous Crystalline Penicillin G IV
- **Gestational Diabetes Mellitus (GDM)**: Insulin
- **Hypertension in Pregnancy**: Labetalol / Methyldopa / Nifedipine (ACE inhibitors strictly contraindicated)
- **Eclampsia Seizure Prophylaxis & Treatment**: Magnesium Sulfate (MgSO4 Pritchard / Zuspan regimen)
- **Postpartum Hemorrhage (PPH Uterotonic)**: Oxytocin 10-20 IU IV infusion
- **Pheochromocytoma**: Phenoxybenzamine (alpha blocker first) → then Propranolol (beta blocker)
- **Malignant Hyperthermia / Neuroleptic Malignant Syndrome (NMS)**: IV Dantrolene
- **Acute Gouty Attack**: NSAIDs (Indomethacin/Naproxen) or Colchicine
- **Chronic Gout (Urate Lowering)**: Allopurinol (Xanthine oxidase inhibitor)
- **Zollinger-Ellison Syndrome**: High-dose Proton Pump Inhibitors (Pantoprazole/Omeprazole)`
  },
  {
    id: 'vault-2',
    title: 'Toxicology: Universal Antidotes Master Matrix',
    subject: 'FMT & Pharma',
    tags: ['Toxicology', 'Antidotes', 'FMT', 'Emergency'],
    isPinned: true,
    highYieldLevel: 'CRITICAL',
    lastModified: Date.now() - 1000 * 60 * 60 * 24,
    content: `### ☠️ Critical Poisoning & Specific Antidotes
| Toxin / Poison | Specific Antidote | Mechanism / Key Notes |
| :--- | :--- | :--- |
| **Paracetamol (Acetaminophen)** | N-Acetylcysteine (NAC) | Replenishes hepatic glutathione (Rumack-Matthew nomogram) |
| **Organophosphates (OP)** | Atropine + Pralidoxime (2-PAM) | Atropine blocks muscarinic; PAM reactivates AChE |
| **Opioids (Morphine/Heroin)** | Naloxone | Competitive opioid mu-receptor antagonist (short t1/2) |
| **Benzodiazepines** | Flumazenil | GABA receptor antagonist (Risk of seizures in chronic users) |
| **Methanol / Ethylene Glycol** | Fomepizole / Ethanol | Inhibits Alcohol Dehydrogenase (ADH) |
| **Cyanide** | Hydroxocobalamin / Sodium Nitrite + Thiosulfate | Forms cyanocobalamin / Methemoglobin trapping |
| **Carbon Monoxide (CO)** | 100% Normobaric / Hyperbaric Oxygen (HBO) | Reduces HbCO half-life from 300 min to 30 min |
| **Beta-Blockers** | IV Glucagon | Increases cAMP independent of beta-receptors |
| **Calcium Channel Blockers** | IV Calcium Gluconate + High-Dose Insulin Euglycemia (HIET) | Improves myocardial substrate utilization |
| **Digoxin** | Digoxin-Specific Fab Fragments (Digibind) | Binds free digoxin in circulation |
| **Heparin** | Protamine Sulfate | 1 mg neutralizes ~100 units of unfractionated heparin |
| **Warfarin** | Vitamin K1 (Phytomenadione) + PCC (4-Factor Prothrombin Complex) | Rapid INR reversal with PCC |
| **Iron** | Deferoxamine | Chelation (Vin-rose colored urine) |
| **Copper (Wilson disease)** | D-Penicillamine / Trientine / Zinc | Enhances urinary excretion / reduces absorption |
| **Lead** | Dimercaprol (BAL) + Calcium Disodium EDTA / Succimer (DMSA) | Succimer is oral DOC in children |
| **Arsenic & Mercury** | Dimercaprol (BAL) / Unithiol (DMPS) | Sulfhydryl enzyme restoration |
| **Local Anesthetic Toxicity (LAST)** | 20% Lipid Emulsion (Intralipid) | "Lipid sink" mechanism |`
  },
  {
    id: 'vault-3',
    title: 'Hematology: Chromosomal Translocations & Cytogenetics',
    subject: 'Pathology & Hematology',
    tags: ['Cytogenetics', 'Translocations', 'Leukemia', 'Lymphoma'],
    isPinned: false,
    highYieldLevel: 'CRITICAL',
    lastModified: Date.now() - 1000 * 60 * 60 * 36,
    content: `### 🔬 High-Yield Cytogenetics & Fusion Genes
- **CML (Chronic Myeloid Leukemia)**: \`t(9;22)(q34;q11)\` → **BCR-ABL1** fusion gene (Philadelphia chromosome; Tyrosine kinase activation; Rx: Imatinib)
- **APML (Acute Promyelocytic Leukemia - AML M3)**: \`t(15;17)(q22;q12)\` → **PML-RARA** fusion (Auer rods in faggot cells; DIC risk; Rx: ATRA + Arsenic Trioxide)
- **AML with maturation (M2)**: \`t(8;21)\` → **RUNX1-RUNX1T1** (Good prognosis)
- **AML M4eo**: \`inv(16)\` or \`t(16;16)\` → **CBFB-MYH11** (Abnormal eosinophils)
- **Burkitt Lymphoma**: \`t(8;14)(q24;q32)\` → **c-MYC** translocation to IgH enhancer (Starry-sky appearance on biopsy; EBV association)
  * Variant translocations: \`t(2;8)\` (kappa light chain) and \`t(8;22)\` (lambda light chain)
- **Follicular Lymphoma**: \`t(14;18)(q32;q21)\` → **BCL-2** overexpression (Anti-apoptotic protein; BCL-2 positive in germinal centers unlike reactive hyperplasia)
- **Mantle Cell Lymphoma**: \`t(11;14)(q13;q32)\` → **Cyclin D1 (PRAD1/CCND1)** overexpression (Promotes G1/S phase cell cycle progression; CD5+, CD23-)
- **Marginal Zone Lymphoma (MALToma)**: \`t(11;18)(q21;q21)\` → **API2-MALT1** (Predicts poor response to H. pylori eradication therapy)
- **Ewing Sarcoma**: \`t(11;22)(q24;q12)\` → **EWS-FLI1** fusion (Small round blue cells; CD99/MIC2 positive)
- **Synovial Sarcoma**: \`t(X;18)(p11;q11)\` → **SS18-SSX1/2** fusion
- **Alveolar Rhabdomyosarcoma**: \`t(2;13)\` or \`t(1;13)\` → **PAX3/7-FOXO1**`
  },
  {
    id: 'vault-4',
    title: 'Biochemistry: Inborn Errors & Glycogen Storage Diseases',
    subject: 'Biochemistry',
    tags: ['GSD', 'Enzymes', 'Biochem', 'Metabolism'],
    isPinned: false,
    highYieldLevel: 'VERY_HIGH',
    lastModified: Date.now() - 1000 * 60 * 60 * 48,
    content: `### 🧪 Glycogen Storage Diseases (GSD Types I - VI)
- **Type I (Von Gierke Disease)**: Deficient enzyme = **Glucose-6-Phosphatase** (Type Ia) or G6P Translocase (Ib with neutropenia).
  * Manifestations: Severe fasting hypoglycemia, massive hepatomegaly (doll-like face), hyperuricemia (gout), lactic acidosis, hyperlipidemia (xanthomas).
- **Type II (Pompe Disease)**: Deficient enzyme = **Lysosomal Acid Alpha-Glucosidase (Acid Maltase)**.
  * Manifestations: Cardiomegaly (massive hypertrophic cardiomyopathy), hypotonia (floppy infant), macroglossia, glycogen accumulation in lysosomes. *"Pompe trashes the PUMP (heart)"*.
- **Type III (Cori / Forbes Disease)**: Deficient enzyme = **Debranching Enzyme (Alpha-1,6-Glucosidase)**.
  * Manifestations: Milder hypoglycemia, normal blood lactate levels (unlike Type I), accumulation of limit dextrin-like branching.
- **Type IV (Andersen Disease / Amylopectinosis)**: Deficient enzyme = **Branching Enzyme (Alpha-1,4 to 1,6 Transglucosidase)**.
  * Manifestations: Progressive liver cirrhosis in infancy, hepatosplenomegaly, early death without liver transplant.
- **Type V (McArdle Disease)**: Deficient enzyme = **Muscle Glycogen Phosphorylase (Myophosphorylase)**.
  * Manifestations: Exercise-induced muscle cramps, myoglobinuria (burgundy urine), second-wind phenomenon, flat blood lactate curve after ischemic forearm exercise test.
- **Type VI (Hers Disease)**: Deficient enzyme = **Hepatic Glycogen Phosphorylase**.
  * Manifestations: Mild hepatomegaly and mild hypoglycemia.`
  },
  {
    id: 'vault-5',
    title: 'PSM: Biomedical Waste Management Rules 2016 (BMW Colors)',
    subject: 'PSM & Preventive Medicine',
    tags: ['BMW', 'PSM', 'Waste Disposal', 'Regulations'],
    isPinned: false,
    highYieldLevel: 'CRITICAL',
    lastModified: Date.now() - 1000 * 60 * 60 * 60,
    content: `### 🗑️ BMW 2016 Color-Coded Segregation
1. **YELLOW BAG (Non-Chlorinated Plastic / Incineration & Deep Burial)**:
   - Human & animal anatomical waste (organs, tissues, placenta, amputated limbs)
   - Soiled waste (cotton, bandages, linen, plasters soaked in blood/body fluids)
   - Expired or discarded cytotoxic drugs & antibiotics
   - Chemical waste & microbiology/biotechnology cultures

2. **RED BAG (Autoclaving / Microwaving → Shredding → Recycling)**:
   - Contaminated recyclable plastics: IV tubing, IV bottles (non-glass), urinary catheters, gloves, vacutainers, syringes without needles

3. **WHITE TRANSLUCENT CONTAINER (Puncture-Proof, Leak-Proof / Autoclaving → Shredding)**:
   - Metallic sharps: Used needles, scalpels, blades, suture needles, trocars, lumbar puncture needles

4. **BLUE BOX / CARDBOARD CONTAINER (Disinfection with 1-2% Sodium Hypochlorite / Autoclave → Glass Recycling)**:
   - Glassware (broken or intact ampoules, vials, glass slides, specimen bottles)
   - Metallic body implants & orthopedic screws/plates`
  },
  {
    id: 'vault-6',
    title: 'Clinical Scores: GCS, CURB-65, Wells & Alvarado Quick Formulas',
    subject: 'Medicine & Surgery',
    tags: ['Scores', 'GCS', 'Alvarado', 'CURB-65', 'Wells'],
    isPinned: true,
    highYieldLevel: 'CRITICAL',
    lastModified: Date.now() - 1000 * 60 * 60 * 72,
    content: `### 📊 High-Yield Clinical Scoring Systems
#### 1. Glasgow Coma Scale (GCS: 3 - 15)
- **Eye Opening (E 1-4)**: 4 Spontaneous, 3 To sound/speech, 2 To pressure/pain, 1 None
- **Verbal Response (V 1-5)**: 5 Oriented, 4 Confused conversation, 3 Inappropriate words, 2 Incomprehensible sounds, 1 None (T for Intubated)
- **Motor Response (M 1-6)**: 6 Obeys commands, 5 Localizes pain, 4 Normal flexion (withdrawal), 3 Abnormal flexion (decorticate), 2 Extension (decerebrate), 1 None

#### 2. CURB-65 (Pneumonia Mortality Risk: 0 - 5)
- **C**: Confusion (new disorientation) [1 pt]
- **U**: Urea > 7 mmol/L (BUN > 19 mg/dL) [1 pt]
- **R**: Respiratory rate ≥ 30 breaths/min [1 pt]
- **B**: Blood pressure (SBP < 90 mmHg or DBP ≤ 60 mmHg) [1 pt]
- **65**: Age ≥ 65 years [1 pt]
* Score 0-1: Outpatient Rx | Score 2: Short inpatient stay | Score 3-5: ICU admission consideration

#### 3. Alvarado Score (Acute Appendicitis: MANTRELS - Total 10)
- **M**: Migration of pain to Right Iliac Fossa [1]
- **A**: Anorexia [1]
- **N**: Nausea / Vomiting [1]
- **T**: Tenderness in RIF [2 pts - Double weight]
- **R**: Rebound tenderness [1]
- **E**: Elevated temperature (> 37.3°C / 99.1°F) [1]
- **L**: Leukocytosis (> 10,000/mcL) [2 pts - Double weight]
- **S**: Shift to the left of neutrophils (> 75%) [1]
* Score ≥ 7: High probability of appendicitis (Immediate surgical consultation)`
  }
];
