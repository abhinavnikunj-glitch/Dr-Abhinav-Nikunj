import { SpotterItem } from '../types';

export const SPOTTERS_DATA: SpotterItem[] = [
  // RADIOLOGY
  {
    id: 'rad-1',
    title: 'Chest X-Ray: Batwing / Butterfly Pulmonary Edema',
    subject: 'Radiology & Medicine',
    category: 'RADIOLOGY',
    highYieldSummary: 'Bilateral symmetrical perihilar alveolar opacities with peripheral lung sparing, classic for acute cardiogenic pulmonary edema or alveolar proteinosis.',
    keyFeatures: [
      'Bilateral dense perihilar haze spreading outwards from both hila',
      'Clear outer 1-2 cm lung periphery (sparing of lung cortex)',
      'Associated cardiomegaly & upper lobe vascular redistribution (antler sign)',
      'Kerley B lines (horizontal linear opacities at costophrenic angles)'
    ],
    classicBuzzwords: ['Bat-wing opacity', 'Butterfly pattern', 'Perihilar alveolar fullness', 'Kerley B lines'],
    examTrapWarning: 'Non-cardiogenic causes (e.g. ARDS, fluid overload in renal failure, Goodpasture) also show batwing pattern, but cardiac silhouette is typically normal!',
    visualType: 'SVG_CHEST_XRAY'
  },
  {
    id: 'rad-2',
    title: 'Neck X-Ray: Steeple Sign (Subglottic Stenosis)',
    subject: 'Pediatrics & Radiology',
    category: 'RADIOLOGY',
    highYieldSummary: 'Inverted V-shaped symmetrical subglottic tracheal narrowing on AP neck radiograph, pathognomonic for Viral Croup (Laryngotracheobronchitis, Parainfluenza).',
    keyFeatures: [
      'Pencil-point / Steeple tapering of the subglottic trachea on AP view',
      'Caused by inflammatory mucosal edema of the subglottic larynx',
      'Clinical presentation: Barking seal cough, inspiratory stridor, hoarseness',
      'Rx: Oral Dexamethasone (0.6 mg/kg) + Nebulized Racemic Epinephrine'
    ],
    classicBuzzwords: ['Steeple sign', 'Pencil-tip sign', 'Church steeple', 'Subglottic narrowing'],
    examTrapWarning: 'Do NOT confuse with "Thumb sign" which is seen on LATERAL neck radiograph in Acute Epiglottitis (Hib)!',
    visualType: 'SVG_DIAGRAM'
  },
  {
    id: 'rad-3',
    title: 'Neck X-Ray (Lateral): Thumbprint Sign',
    subject: 'Pediatrics & ENT',
    category: 'RADIOLOGY',
    highYieldSummary: 'Enlarged, edematous epiglottis protruding into the hypopharynx like an adult thumb, indicative of life-threatening Acute Epiglottitis.',
    keyFeatures: [
      'Swollen, round epiglottis obliterating the vallecula on lateral neck view',
      'Causative organism: Haemophilus influenzae type b (Hib)',
      'Tripod posture: Leaning forward, neck hyperextended, drooling, toxic look',
      'Direct visualization of throat is CONTRAINDICATED (can trigger fatal laryngospasm)'
    ],
    classicBuzzwords: ['Thumbprint sign', 'Tripod positioning', 'Vallecula obliteration', 'Stridor without bark'],
    examTrapWarning: 'Never attempt direct tongue blade depression or indirect laryngoscopy in un-intubated child outside the operating theater!',
    visualType: 'SVG_DIAGRAM'
  },
  {
    id: 'rad-4',
    title: 'Brain NCCT: Epidural (Extradural) Hematoma vs Subdural',
    subject: 'Neurosurgery & Radiology',
    category: 'RADIOLOGY',
    highYieldSummary: 'Hyperdense biconvex (lentiform) extra-axial collection limited by cranial sutures, usually from middle meningeal artery tear at pterion.',
    keyFeatures: [
      'Biconvex / lentiform shape (does NOT cross cranial sutures, can cross midline)',
      'Lucid interval: Brief concussion → lucid recovery → rapid coma & pupillary dilation',
      'Subdural Hematoma (SDH) comparison: Crescentic shape, crosses sutures, bridging veins tear'
    ],
    classicBuzzwords: ['Biconvex lens', 'Lentiform hematoma', 'Middle meningeal artery', 'Lucid interval', 'Pterion fracture'],
    examTrapWarning: 'EDH is bounded by sutures where periosteum is adherent; SDH is not bounded by sutures and extends widely along the cerebral convexity.',
    visualType: 'SVG_BRAIN_CT'
  },
  {
    id: 'rad-5',
    title: 'Abdominal X-Ray: Football Sign (Pneumoperitoneum)',
    subject: 'Surgery & Radiology',
    category: 'RADIOLOGY',
    highYieldSummary: 'Large oval radiolucency outlining the peritoneal cavity on supine radiograph in infants with gastrointestinal perforation.',
    keyFeatures: [
      'Massive free intraperitoneal air outlining the entire peritoneal cavity like an American football',
      'Rigler sign / Double wall sign (air on both luminal and peritoneal sides of bowel wall)',
      'Falciform ligament sign (outlined as a vertical linear stripe by free air)'
    ],
    classicBuzzwords: ['Football sign', 'Rigler sign', 'Falciform ligament sign', 'Pneumoperitoneum'],
    examTrapWarning: 'In adults, erect chest X-ray including both domes of diaphragm is the most sensitive initial radiograph (crescent under right hemidiaphragm).',
    visualType: 'SVG_DIAGRAM'
  },
  {
    id: 'rad-6',
    title: 'Barium Swallow: Bird-Beak Sign (Achalasia Cardia)',
    subject: 'Gastroenterology & Surgery',
    category: 'RADIOLOGY',
    highYieldSummary: 'Smooth, symmetrical, tapered narrowing of the distal esophagus with proximal massive dilatation on barium swallow, diagnostic of Achalasia.',
    keyFeatures: [
      'Failure of Lower Esophageal Sphincter (LES) relaxation with aperistalsis',
      'Loss of myenteric (Auerbach) plexus ganglion cells (inhibitory VIP & NO)',
      'Gold standard diagnostic test: High-Resolution Esophageal Manometry (Type I, II, III)',
      'Rx: Heller cardiomyotomy with Dor fundoplication / Pneumatic balloon dilation / POEM'
    ],
    classicBuzzwords: ['Bird-beak sign', 'Rat-tail tapering', 'Megaesophagus', 'Auerbach plexus loss'],
    examTrapWarning: 'Pseudoachalasia (caused by gastric adenocarcinoma infiltrating the gastroesophageal junction) presents in elderly with rapid weight loss and asymmetric irregularity!',
    visualType: 'SVG_DIAGRAM'
  },

  // HISTOPATHOLOGY
  {
    id: 'histo-1',
    title: 'Histopathology: Reed-Sternberg "Owl-Eye" Cells',
    subject: 'Pathology',
    category: 'HISTOPATH',
    highYieldSummary: 'Large binucleated or multinucleated giant cells with prominent eosinophilic inclusion-like nucleoli and clear perinuclear halos, diagnostic of Classical Hodgkin Lymphoma.',
    keyFeatures: [
      'Immunophenotype of Classic RS cells: CD15+ positive, CD30+ positive, CD45- negative, CD20- (mostly negative)',
      'Subtypes: Nodular Sclerosis (Lacunar cells - most common in females), Mixed Cellularity (highest EBV association), Lymphocyte Rich (best prognosis), Lymphocyte Depleted (worst prognosis)',
      'Popcorn / LP cells (CD20+, CD45+, CD15-, CD30-) seen in Nodular Lymphocyte Predominant HL'
    ],
    classicBuzzwords: ['Owl-eye nucleoli', 'Lacunar cells', 'CD15+ CD30+', 'Bimodal age distribution'],
    examTrapWarning: 'Nodular Lymphocyte Predominant Hodgkin Lymphoma (NLPHL) lacks CD15 and CD30, but expresses B-cell marker CD20!',
    visualType: 'SVG_HISTO_SLIDE'
  },
  {
    id: 'histo-2',
    title: 'Histopathology: Auer Rods & Faggot Cells',
    subject: 'Pathology & Hematology',
    category: 'HISTOPATH',
    highYieldSummary: 'Crystalline rod-shaped intracytoplasmic inclusions composed of fused lysosomes / azurophilic granules, pathognomonic for Acute Myeloid Leukemia (especially APML M3).',
    keyFeatures: [
      'Myeloperoxidase (MPO) and Sudan Black B strongly positive',
      'Bundles of Auer rods stacked together inside promyelocytes = "Faggot cells"',
      'Associated with t(15;17) PML-RARA fusion',
      'Life-threatening complication: Disseminated Intravascular Coagulation (DIC) triggered by primary granule thromboplastin release'
    ],
    classicBuzzwords: ['Auer rods', 'Faggot cells', 'MPO positive', 't(15;17)', 'Promyelocytes', 'ATRA response'],
    examTrapWarning: 'Auer rods are NEVER seen in Acute Lymphoblastic Leukemia (ALL) or lymphoid lineage malignancies.',
    visualType: 'SVG_HISTO_SLIDE'
  },
  {
    id: 'histo-3',
    title: 'Histopathology: Call-Exner Bodies (Granulosa Cell Tumor)',
    subject: 'OBGY & Pathology',
    category: 'HISTOPATH',
    highYieldSummary: 'Small follicle-like microfollicular structures containing eosinophilic PAS-positive fluid and degenerate pyknotic nuclei, hallmark of Adult Granulosa Cell Tumor of Ovary.',
    keyFeatures: [
      'Coffee-bean grooved nuclei in granulosa cells',
      'Estrogen-secreting sex cord-stromal tumor → endometrial hyperplasia / abnormal uterine bleeding',
      'Tumor marker: Serum Inhibin B and Anti-Mullerian Hormone (AMH)',
      'Pathology: FOXL2 mutation (c.402C>G)'
    ],
    classicBuzzwords: ['Call-Exner bodies', 'Coffee-bean nuclei', 'Inhibin B', 'Estrogen secreting', 'FOXL2 mutation'],
    examTrapWarning: 'Do NOT confuse with Schiller-Duval bodies (seen in Yolk Sac Tumors / Endodermal Sinus Tumors with AFP elevation)!',
    visualType: 'SVG_HISTO_SLIDE'
  },
  {
    id: 'histo-4',
    title: 'Histopathology: Psammoma Bodies (Concentric Calcifications)',
    subject: 'Pathology & Oncology',
    category: 'HISTOPATH',
    highYieldSummary: 'Round, concentrically laminated, basophilic dystrophic calcospherites resulting from necrotic tip calcification in papillary malignancies.',
    keyFeatures: [
      'Mnemonic "PSaMMoma": Papillary thyroid carcinoma, Serous ovarian cystadenocarcinoma, Meningioma, Mesothelioma',
      'Also seen in: Prolactinoma, Papillary renal cell carcinoma, Somatostatinoma',
      'Papillary Thyroid Carcinoma features: Orphan Annie eye nuclei (cleared ground-glass), nuclear pseudoinclusions, nuclear grooves'
    ],
    classicBuzzwords: ['Laminated calcospherites', 'Orphan Annie nuclei', 'Dystrophic calcification', 'Papillary architecture'],
    examTrapWarning: 'Medullary thyroid cancer shows amyloid stroma (Congo Red +) and calcitonin, NOT psammoma bodies!',
    visualType: 'SVG_HISTO_SLIDE'
  },

  // DERMATOLOGY
  {
    id: 'derma-1',
    title: 'Dermatology: Target / Iris Lesions (Erythema Multiforme)',
    subject: 'Dermatology',
    category: 'DERMATOLOGY',
    highYieldSummary: 'Concentric three-zoned annular lesions with central dusky/necrotic bulla, intermediate pale edematous ring, and outer erythematous halo.',
    keyFeatures: [
      'Erythema Multiforme Minor vs Major (Major involves mucosal surfaces like lips/oral cavity)',
      'Most common trigger (> 70%): Herpes Simplex Virus (HSV-1 / HSV-2) infection',
      'Other triggers: Mycoplasma pneumoniae, medications (sulfonamides, NSAIDs, anticonvulsants)'
    ],
    classicBuzzwords: ['Target lesion', 'Iris lesion', 'Three concentric zones', 'HSV reactivation', 'Acrofacial distribution'],
    examTrapWarning: 'Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN) have flat atypical targets with massive detachment (>10% SJS, >30% TEN) and are drug-induced, not HSV-driven.',
    visualType: 'SVG_DERMA_LESION'
  },
  {
    id: 'derma-2',
    title: 'Dermatology: Wickham Striae & 6 Ps (Lichen Planus)',
    subject: 'Dermatology',
    category: 'DERMATOLOGY',
    highYieldSummary: 'Fine reticulated whitish lace-like network of lines visible on the surface of violaceous polygonal pruritic papules, characteristic of Lichen Planus.',
    keyFeatures: [
      'The 6 Ps: Planar, Polygonal, Pruritic, Purple/Violaceous, Papules, Plaques',
      'Histology: Dense band-like lymphocytic infiltrate at dermo-epidermal junction, saw-toothed rete ridges, hypergranulosis, Civatte/colloid bodies',
      'Koebner isomorphic phenomenon positive',
      'Strong association: Hepatitis C virus infection'
    ],
    classicBuzzwords: ['Wickham striae', 'Saw-tooth rete ridges', 'Civatte bodies', 'Hepatitis C association', '6 Ps of Lichen Planus'],
    examTrapWarning: 'Lichen Planus has hypergranulosis with saw-toothed rete ridges, while Psoriasis has hypogranulosis/absent granular layer with regular elongation of rete ridges!',
    visualType: 'SVG_DERMA_LESION'
  },

  // SURGICAL INSTRUMENTS
  {
    id: 'inst-1',
    title: 'Instrument: Babcock Non-Crushing Tissue Forceps',
    subject: 'Surgery & OBGY',
    category: 'INSTRUMENTS',
    highYieldSummary: 'Atraumatic forceps with triangular fenestrated curved jaws and transverse ridges at the tips, designed to hold delicate tubular viscus safely.',
    keyFeatures: [
      'Jaws are hollow / fenestrated to prevent ischemic crush injury',
      'Uses: Holding Appendix during appendectomy, Fallopian tubes in tubectomy, Ureter, Bowel loops, Lymph nodes',
      'Difference from Allis: Allis has sharp interlocking teeth (crushing), while Babcock is smooth-edged (atraumatic non-crushing)'
    ],
    classicBuzzwords: ['Fenestrated triangular jaws', 'Atraumatic grasp', 'Tubal holding', 'Appendectomy forceps'],
    examTrapWarning: 'Never use Allis on bowel loops or fallopian tubes intended to remain healthy; Allis causes micro-perforation and ischemia.',
    visualType: 'SVG_INSTRUMENT'
  },
  {
    id: 'inst-2',
    title: 'Instrument: Episiotomy Scissors (Braun-Stadler)',
    subject: 'OBGY',
    category: 'INSTRUMENTS',
    highYieldSummary: 'Angled surgical scissors with one flattened, rounded lower probe blade to protect fetal head during perineal incision.',
    keyFeatures: [
      'Lower blade has a flat, blunt-ended tip to glide safely between fetal presenting part and maternal vaginal mucosa',
      'Blades are angled laterally at ~45-60 degrees for medio-lateral episiotomy incision',
      'Timing of episiotomy: Done at crowning (when 3-4 cm of fetal head is visible during contraction)'
    ],
    classicBuzzwords: ['Angled blades', 'Flattened lower guard', 'Mediolateral episiotomy', 'Perineal safety blade'],
    examTrapWarning: 'Mediolateral episiotomy is preferred over median in India due to lower risk of 3rd and 4th degree perineal tears extending to anal sphincter.',
    visualType: 'SVG_INSTRUMENT'
  },

  // CLINICAL SCORES CALCULATORS
  {
    id: 'score-1',
    title: 'Glasgow Coma Scale (GCS Calculator: 3 – 15)',
    subject: 'Neurosurgery & Emergency Medicine',
    category: 'CLINICAL_SCORES',
    highYieldSummary: 'Universal consciousness assessment tool scoring Eye (1-4), Verbal (1-5), and Motor (1-6) responses. Score ≤ 8 mandates endotracheal intubation ("GCS 8, Intubate!").',
    keyFeatures: [
      'Eye Opening (E1-E4): 4 Spontaneous, 3 To sound, 2 To pressure, 1 None',
      'Verbal (V1-V5): 5 Oriented, 4 Confused, 3 Inappropriate words, 2 Sounds, 1 None (T if intubated)',
      'Motor (M1-M6): 6 Obeys, 5 Localizes, 4 Normal Flexion (Withdrawal), 3 Abnormal Flexion (Decorticate), 2 Extension (Decerebrate), 1 None'
    ],
    classicBuzzwords: ['E4 V5 M6', 'Decorticate vs Decerebrate', 'GCS 8 intubation cutoff', 'Trauma severity grading'],
    examTrapWarning: 'Decorticate posturing (flexion) implies lesion ABOVE red nucleus (cortex/diencephalon); Decerebrate posturing (extension) implies lesion AT or BELOW red nucleus (brainstem)!',
    visualType: 'CALCULATOR_TABLE',
    scoreCalculatorData: { type: 'GCS' }
  },
  {
    id: 'score-2',
    title: 'CURB-65 Pneumonia Mortality Score',
    subject: 'Pulmonology & Medicine',
    category: 'CLINICAL_SCORES',
    highYieldSummary: 'Point-of-care 5-point triage score for Community-Acquired Pneumonia (CAP) determining outpatient vs hospital ward vs ICU admission.',
    keyFeatures: [
      'Confusion: AMTS ≤ 8 or new disorientation [1 point]',
      'Urea: BUN > 19 mg/dL (> 7 mmol/L) [1 point]',
      'Respiratory Rate: ≥ 30 breaths/min [1 point]',
      'Blood Pressure: SBP < 90 mmHg or DBP ≤ 60 mmHg [1 point]',
      'Age: ≥ 65 years [1 point]',
      'Triage: 0-1 (Low risk - Outpatient), 2 (Moderate risk - Inpatient Ward), ≥3 (Severe - ICU consideration)'
    ],
    classicBuzzwords: ['CURB-65', 'BUN > 19 mg/dL', 'RR ≥ 30', 'CAP admission criteria'],
    examTrapWarning: 'CRB-65 (without Urea) is used in primary care clinics where laboratory biochemistry is unavailable.',
    visualType: 'CALCULATOR_TABLE',
    scoreCalculatorData: { type: 'CURB65' }
  },
  {
    id: 'score-3',
    title: 'Alvarado Score for Acute Appendicitis (MANTRELS)',
    subject: 'General Surgery',
    category: 'CLINICAL_SCORES',
    highYieldSummary: '10-point diagnostic clinical score predicting acute appendicitis probability. Tenderness in RIF and Leukocytosis carry double weight (2 points each).',
    keyFeatures: [
      'M: Migration of pain to RIF [1 pt]',
      'A: Anorexia [1 pt]',
      'N: Nausea / Vomiting [1 pt]',
      'T: Tenderness in RIF [2 pts - Double Weight]',
      'R: Rebound tenderness [1 pt]',
      'E: Elevated temperature (> 37.3°C / 99.1°F) [1 pt]',
      'L: Leukocytosis (> 10,000 /mcL) [2 pts - Double Weight]',
      'S: Shift of neutrophils to left (> 75%) [1 pt]',
      'Cutoffs: ≤ 4 (Appendicitis unlikely), 5-6 (Equivocal - CT/USG needed), ≥ 7 (Probable appendicitis - Urgent Surgery)'
    ],
    classicBuzzwords: ['MANTRELS', 'Double weight for T and L', 'Total score 10', 'Alvarado ≥ 7'],
    examTrapWarning: 'Remember only TWO letters (T for Tenderness in RIF and L for Leukocytosis) have 2 points each. All other 6 letters have 1 point each (Total = 10)!',
    visualType: 'CALCULATOR_TABLE',
    scoreCalculatorData: { type: 'ALVARADO' }
  },

  // ONCOLOGY STAGING & FIGO
  {
    id: 'onco-1',
    title: 'FIGO 2018 Staging: Carcinoma Cervix Master Chart',
    subject: 'OBGY & Oncology',
    category: 'ONCOLOGY_STAGING',
    highYieldSummary: 'Clinical-radiological staging system for cervical cancer. Stage IIB (parametrial invasion) marks the cutoff where surgery is no longer indicated; Concurrent Chemoradiotherapy (CCRT with Cisplatin) is mandatory.',
    keyFeatures: [
      'Stage I: Confined strictly to cervix (IA microscopic < 5mm depth, IB visible ≥ 5mm depth)',
      'Stage II: Beyond cervix but NOT to pelvic wall / lower 1/3 vagina (IIA upper 2/3 vagina, IIB PARAMETRIAL invasion - CCRT cutoff)',
      'Stage III: Lower 1/3 vagina (IIIA) OR Pelvic side wall / hydronephrosis (IIIB) OR Pelvic/Para-aortic lymph nodes (IIIC1/IIIC2)',
      'Stage IV: Mucosa of bladder/rectum (IVA) OR Distant metastasis (IVB)'
    ],
    classicBuzzwords: ['FIGO Cervix', 'IIB Parametrial invasion', 'IIIB Hydronephrosis', 'IIIC Lymph nodes', 'CCRT with Cisplatin'],
    examTrapWarning: 'Hydronephrosis or non-functioning kidney due to ureteric obstruction automatically elevates cervical cancer to Stage IIIB regardless of primary tumor size!',
    visualType: 'CALCULATOR_TABLE',
    detailsTable: {
      headers: ['FIGO Stage', 'Anatomical Extent', 'Treatment of Choice'],
      rows: [
        ['Stage IA1', 'Depth of stromal invasion < 3 mm, no LVSI', 'Simple Hysterectomy / Conization (if fertility desired)'],
        ['Stage IA2 - IB2', 'Invasion 3-5 mm up to < 4 cm visible tumor', 'Radical Hysterectomy (Wertheim-Meigs) + Pelvic LND'],
        ['Stage IB3 & IIA2', 'Tumor ≥ 4 cm limited to cervix/upper vagina', 'Concurrent Chemoradiotherapy (CCRT with Cisplatin)'],
        ['Stage IIB', 'Invasion into PARAMETRIUM', 'CCRT (Definitive External Beam RT + Brachytherapy + Cisplatin)'],
        ['Stage IIIB', 'Extends to pelvic side wall OR causes hydronephrosis', 'CCRT'],
        ['Stage IIIC1 / IIIC2', 'Pelvic (C1) or Para-aortic (C2) lymph nodes positive', 'CCRT with extended-field radiotherapy'],
        ['Stage IVA / IVB', 'Bladder/rectal mucosa invasion (IVA) or distant mets (IVB)', 'Palliative Chemotherapy / Palliative RT / Pelvic Exenteration']
      ]
    }
  }
];
