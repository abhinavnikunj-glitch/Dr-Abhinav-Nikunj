import { DaySchedule } from '../types';

export const DEFAULT_SYLLABUS: DaySchedule[] = [
  {
    id: 'day-1',
    dateLabel: '24 AUG',
    dayNumber: 1,
    title: 'CVS, OBGY & Dermatology Core',
    protocolSummary: 'Wake by 7:30am → 8:30am-12:30pm: SLOT 1 Max efficiency (CVS Notes + 50 MCQs) → 12:30-1:15pm Lunch break (Relax & dissociate) → 1:15-5:15pm: SLOT 2 OBGY Notes + 50 MCQs → 5:15-6:00pm Jog/walk (45m) → 6:00-11:00pm: PASSIVE Relaxed study → Sleep by 11pm',
    slots: [
      {
        id: 'slot-24-1',
        dayId: 'day-1',
        slotNumber: 1,
        title: 'CVS Notes + 50 Bookmarked MCQs',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'cvs-1', text: 'Cardiac cycle, Wiggers diagram & JVP waveform analysis', completed: false },
          { id: 'cvs-2', text: 'Pressure-Volume (PV) loops (Inotropy, Afterload, Preload changes)', completed: false },
          { id: 'cvs-3', text: 'Heart Murmurs & dynamic auscultation maneuvers', completed: false },
          { id: 'cvs-4', text: 'Antiarrhythmics classification (Vaughan-Williams Classes I to IV)', completed: false },
          { id: 'cvs-5', text: 'MI Biomarkers kinetics (Myoglobin, Troponin I/T, CK-MB) & ECG leads', completed: false },
          { id: 'cvs-6', text: 'Infective Endocarditis (Modified Duke criteria, HACEK organisms)', completed: false },
          { id: 'cvs-7', text: 'Solve 50 high-yield bookmarked CVS MCQs & review rationales', completed: false }
        ]
      },
      {
        id: 'slot-24-2',
        dayId: 'day-1',
        slotNumber: 2,
        title: 'OBGY Notes + 50 Bookmarked MCQs',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'obgy-1', text: 'Stages of Labor, Friedman curve & WHO Partograph alert/action lines', completed: false },
          { id: 'obgy-2', text: 'Postpartum Hemorrhage (4 Ts, B-Lynch suture, Uterotonics protocols)', completed: false },
          { id: 'obgy-3', text: 'Hypertensive disorders of pregnancy (Pre-eclampsia/Eclampsia & MgSO4 Pritchard regimen)', completed: false },
          { id: 'obgy-4', text: 'Gestational Diabetes Mellitus (DIPSI vs WHO screening criteria)', completed: false },
          { id: 'obgy-5', text: 'Malpresentations (Breech maneuvers, Face, Brow, Transverse lie)', completed: false },
          { id: 'obgy-6', text: 'Obstetric USG biometry (BPD, HC, AC, FL) & Doppler velocimetry (UA/MCA)', completed: false },
          { id: 'obgy-7', text: 'Solve 50 high-yield bookmarked OBGY MCQs', completed: false }
        ]
      },
      {
        id: 'slot-24-3',
        dayId: 'day-1',
        slotNumber: 3,
        title: 'PASSIVE Study & PYQ Explorer',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'PASSIVE_REVISION',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'pas-1-1', text: 'Dermatology: Vesiculobullous disorders (Pemphigus vs Bullous Pemphigoid) & STIs', completed: false },
          { id: 'pas-1-2', text: 'General Physiology: Action potentials, Gibbs-Donnan equilibrium & body fluid compartments', completed: false },
          { id: 'pas-1-3', text: 'Weak areas extraction from Mega BTR flash reviews', completed: false },
          { id: 'pas-1-4', text: 'NEET PG 2024/2025 & FMGE July 2026 PYQ Explorer recall audit', completed: false },
          { id: 'pas-1-5', text: 'Chhoti Copy rapid bookmark sweep before 11:00 PM lights out', completed: false }
        ]
      }
    ]
  },
  {
    id: 'day-2',
    dateLabel: '25 AUG',
    dayNumber: 2,
    title: 'CNS, Pediatrics & Psychiatry',
    protocolSummary: 'Wake by 7:30am → 8:30am-12:30pm: CNS Integrated Notes + 50 MCQs → 12:30-1:15pm Lunch break → 1:15-5:15pm: Pediatrics Notes + 50 MCQs → 5:15-6:00pm Jog/walk → 6:00-11:00pm: Passive Psychiatry & General Pharma → Sleep by 11pm',
    slots: [
      {
        id: 'slot-25-1',
        dayId: 'day-2',
        slotNumber: 1,
        title: 'CNS Integrated Notes + 50 Bookmarked MCQs',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'cns-1', text: 'Ascending & Descending Spinal Tracts, Brown-Séquard syndrome', completed: false },
          { id: 'cns-2', text: 'Brainstem stroke syndromes (Wallenberg, Weber, Millard-Gubler, Foville)', completed: false },
          { id: 'cns-3', text: 'Antiepileptic drugs mechanisms, DOCs for Focal/Absence/Myoclonic seizures', completed: false },
          { id: 'cns-4', text: 'Stroke management algorithms (tPA window, ASPECTS score, thrombectomy)', completed: false },
          { id: 'cns-5', text: 'CNS Tumors histopathology (Glioblastoma pseudopalisading, Meningioma psammoma, Medulloblastoma Homer-Wright)', completed: false },
          { id: 'cns-6', text: 'Solve 50 bookmarked CNS questions', completed: false }
        ]
      },
      {
        id: 'slot-25-2',
        dayId: 'day-2',
        slotNumber: 2,
        title: 'Pediatrics Notes + 50 Bookmarked MCQs',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'ped-1', text: 'Developmental Milestones (Gross motor, Fine motor, Social, Language & red flags)', completed: false },
          { id: 'ped-2', text: 'WHO Growth Charts & Shakir tape MUAC cutoffs', completed: false },
          { id: 'ped-3', text: 'SAM vs MAM management (F-75, F-100, Refeeding syndrome minerals)', completed: false },
          { id: 'ped-4', text: 'Neonatal Jaundice workup (Physiological vs Pathological, Phototherapy/Exchange transfusion charts)', completed: false },
          { id: 'ped-5', text: 'Neonatal Sepsis & Congenital Heart Diseases (Cyanotic 5 Ts vs Acyanotic ASD/VSD/PDA)', completed: false },
          { id: 'ped-6', text: 'Solve 50 bookmarked Pediatrics MCQs', completed: false }
        ]
      },
      {
        id: 'slot-25-3',
        dayId: 'day-2',
        slotNumber: 3,
        title: 'PASSIVE Study: Psych, Pharma & PYQs',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'PASSIVE_REVISION',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'pas-2-1', text: 'Psychiatry: Lithium toxicity levels, Schizophrenia Schneiderian first-rank symptoms, Defense mechanisms', completed: false },
          { id: 'pas-2-2', text: 'General Pharmacology: GPCR secondary messengers (Gs, Gi, Gq) & Pharmacokinetics (Zero vs First order)', completed: false },
          { id: 'pas-2-3', text: 'NEET PG 2024/2025 PYQ deep review', completed: false },
          { id: 'pas-2-4', text: 'Chhoti Copy review of volatile drug formulas & psychiatric classifications', completed: false }
        ]
      }
    ]
  },
  {
    id: 'day-3',
    dateLabel: '26 AUG',
    dayNumber: 3,
    title: 'Respi-Renal, Biochem-Hemat & Ortho',
    protocolSummary: 'Wake by 7:30am → 8:30am-12:30pm: Respi & Renal Notes + 50 MCQs → 12:30-1:15pm Lunch → 1:15-5:15pm: Biochem-Hemat Notes + 50 MCQs → 5:15-6:00pm Jog → 6:00-11:00pm: Passive Ortho & General Path → Sleep by 11pm',
    slots: [
      {
        id: 'slot-26-1',
        dayId: 'day-3',
        slotNumber: 1,
        title: 'Respi & Renal Notes + 50 Bookmarked MCQs',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'rr-1', text: 'Pulmonary Function Tests (Obstructive vs Restrictive Flow-Volume loops)', completed: false },
          { id: 'rr-2', text: 'ABG Interpretation: High Anion Gap Metabolic Acidosis (MUDPILES) & Winter formula', completed: false },
          { id: 'rr-3', text: 'GINA 2025/2026 Asthma step-ladder & GOLD COPD guidelines', completed: false },
          { id: 'rr-4', text: 'Diuretics site of action, electrolyte shifts & Bartter/Gitelman/Liddle syndromes', completed: false },
          { id: 'rr-5', text: 'Nephritic vs Nephrotic Syndromes (PSGN subepithelial humps, MN spike & dome, MCD podocyte effacement)', completed: false },
          { id: 'rr-6', text: 'KDIGO AKI staging criteria & RIFLE criteria', completed: false },
          { id: 'rr-7', text: 'Solve 50 bookmarked Respi-Renal MCQs', completed: false }
        ]
      },
      {
        id: 'slot-26-2',
        dayId: 'day-3',
        slotNumber: 2,
        title: 'Biochem-Hemat Notes + 50 Bookmarked MCQs',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'bh-1', text: 'Inborn Errors of Metabolism: Glycogen Storage Diseases (Von Gierke, Pompe, Cori, McArdle)', completed: false },
          { id: 'bh-2', text: 'Amino acid metabolism disorders: PKU, Maple syrup urine disease, Alkaptonuria, Homocystinuria', completed: false },
          { id: 'bh-3', text: 'Vitamins deficiency & toxicity syndromes (B1 Wernicke-Korsakoff, B3 Pellagra 4Ds, B12 vs Folate)', completed: false },
          { id: 'bh-4', text: 'Anemias workup: Iron deficiency (Mentzer index), Thalassemia trait, Megaloblastic, Hemolytic (PNH, Hereditary spherocytosis)', completed: false },
          { id: 'bh-5', text: 'Coagulation cascade, PT/INR vs aPTT disorders & Platelet defects (ITP, TTP, DIC, HUS, vWD)', completed: false },
          { id: 'bh-6', text: 'Solve 50 bookmarked Biochem-Hemat MCQs', completed: false }
        ]
      },
      {
        id: 'slot-26-3',
        dayId: 'day-3',
        slotNumber: 3,
        title: 'PASSIVE Study: Orthopedics, General Path & PYQs',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'PASSIVE_REVISION',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'pas-3-1', text: 'Orthopedics: Eponymous fractures (Colles, Smith, Barton, Monteggia, Galeazzi) & nerve injuries', completed: false },
          { id: 'pas-3-2', text: 'Bone tumors radiological hallmarks (Codman triangle, Onion peel, Sunburst, Soap bubble)', completed: false },
          { id: 'pas-3-3', text: 'General Pathology: Cellular adaptations, Necrosis types, Amyloidosis Congo Red apple-green birefringence', completed: false },
          { id: 'pas-3-4', text: 'NEET PG 2024/2025 PYQ rapid review', completed: false }
        ]
      }
    ]
  },
  {
    id: 'day-4',
    dateLabel: '27 AUG',
    dayNumber: 4,
    title: 'Hematology, GI, PSM & Radiology',
    protocolSummary: 'Wake by 7:30am → 8:30am-12:30pm: Hemat & GI Notes + 50 MCQs → 12:30-1:15pm Lunch → 1:15-5:15pm: PSM Notes + 50 MCQs → 5:15-6:00pm Jog → 6:00-11:00pm: Passive Radio, Anesthesia & Immuno → Sleep by 11pm',
    slots: [
      {
        id: 'slot-27-1',
        dayId: 'day-4',
        slotNumber: 1,
        title: 'Hematology & GI Notes + 50 Bookmarked MCQs',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'hgi-1', text: 'Leukemias & Lymphomas Cytogenetics: t(9;22) BCR-ABL, t(15;17) PML-RARA, t(8;14) c-MYC, t(14;18) BCL2', completed: false },
          { id: 'hgi-2', text: 'Multiple Myeloma diagnostic CRAB criteria & serum protein electrophoresis M-spike', completed: false },
          { id: 'hgi-3', text: 'Inflammatory Bowel Disease: Crohn vs Ulcerative Colitis clinical/pathology comparison', completed: false },
          { id: 'hgi-4', text: 'Hepatitis Serology master interpretation (HBsAg, Anti-HBs, Anti-HBc IgM/IgG, HBeAg)', completed: false },
          { id: 'hgi-5', text: 'Anti-ulcer drugs (PPIs, H2 blockers, Sucralfate) & H. pylori eradication regimens', completed: false },
          { id: 'hgi-6', text: 'Solve 50 bookmarked Hemat & GI MCQs', completed: false }
        ]
      },
      {
        id: 'slot-27-2',
        dayId: 'day-4',
        slotNumber: 2,
        title: 'PSM Notes + 50 Bookmarked MCQs',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'psm-1', text: 'Epidemiology study designs: Case-Control (Odds Ratio) vs Cohort (Relative Risk & Attributable Risk)', completed: false },
          { id: 'psm-2', text: 'Biostatistics tests of significance: Chi-square, Student t-test (paired/unpaired), ANOVA, Sensitivity & Specificity 2x2 table', completed: false },
          { id: 'psm-3', text: 'Biomedical Waste Management Rules 2016 (Yellow, Red, White translucent, Blue box categorization)', completed: false },
          { id: 'psm-4', text: 'National Immunization Schedule (NIS) & Cold chain equipment (ILR vs Deep freezer temperatures)', completed: false },
          { id: 'psm-5', text: 'National Health Programs updates & Maternal/Infant mortality indicators', completed: false },
          { id: 'psm-6', text: 'Solve 50 bookmarked PSM MCQs', completed: false }
        ]
      },
      {
        id: 'slot-27-3',
        dayId: 'day-4',
        slotNumber: 3,
        title: 'PASSIVE Study: Radiology, Anesthesia & Immuno',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'PASSIVE_REVISION',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'pas-4-1', text: 'Radiology: Classic signs on Chest X-ray & CT scans (Batwing, Golden S sign, Hampton hump, Westermark sign)', completed: false },
          { id: 'pas-4-2', text: 'Anesthesia: MAC values of inhalational agents (Nitrous oxide, Halothane, Sevoflurane) & Malignant hyperthermia Dantrolene', completed: false },
          { id: 'pas-4-3', text: 'Immunology: Hypersensitivity reactions Type I-IV mnemonics & HLA associations', completed: false },
          { id: 'pas-4-4', text: 'NEET PG recent PYQ pattern audit', completed: false }
        ]
      }
    ]
  },
  {
    id: 'day-5',
    dateLabel: '28 AUG',
    dayNumber: 5,
    title: 'Anatomy Master, Surgery & High Volatiles',
    protocolSummary: 'Wake by 7:30am → 8:30am-12:30pm: Anatomy Master Notes + 50 MCQs → 12:30-1:15pm Lunch → 1:15-5:15pm: Surgery Notes + 50 MCQs → 5:15-6:00pm Jog → 6:00-11:00pm: Micro, ENT, FMT & Volatile Filter → Sleep by 11pm',
    slots: [
      {
        id: 'slot-28-1',
        dayId: 'day-5',
        slotNumber: 1,
        title: 'Anatomy Master Notes + 50 Bookmarked MCQs',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'anat-1', text: 'Neuroanatomy: Circle of Willis, Cavernous sinus boundaries & structures passing through', completed: false },
          { id: 'anat-2', text: 'Cranial Nerves foramina of exit (Cribriform to Jugular & Hypoglossal canal) & clinical testing', completed: false },
          { id: 'anat-3', text: 'Brachial Plexus roots, trunks, cords, branches & Erb-Duchenne vs Klumpke palsy', completed: false },
          { id: 'anat-4', text: 'Pelvis & Perineum: Pudendal canal, Ischiorectal fossa, Inguinal canal & hernia boundaries (Hesselbach triangle)', completed: false },
          { id: 'anat-5', text: 'Pharyngeal Arches derivatives (muscles, nerves, skeletal, pouches & clefts)', completed: false },
          { id: 'anat-6', text: 'Solve 50 bookmarked Anatomy MCQs', completed: false }
        ]
      },
      {
        id: 'slot-28-2',
        dayId: 'day-5',
        slotNumber: 2,
        title: 'Surgery Notes + 50 Bookmarked MCQs',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'HIGH_YIELD_NOTES',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'surg-1', text: 'Trauma ATLS Primary & Secondary survey, FAST & eFAST protocols', completed: false },
          { id: 'surg-2', text: 'Burns Parkland resuscitation formula (4ml x kg x %TBSA) & Rule of Nines', completed: false },
          { id: 'surg-3', text: 'Thyroid nodule management (Bethesda classification) & Breast cancer triple assessment', completed: false },
          { id: 'surg-4', text: 'Acute Abdomen algorithms (Appendicitis Alvarado score, Intestinal obstruction, Perforation signs)', completed: false },
          { id: 'surg-5', text: 'Arterial vs Venous ulcers (CEAP classification) & Peripheral vascular disease Fontaine staging', completed: false },
          { id: 'surg-6', text: 'Solve 50 bookmarked Surgery MCQs', completed: false }
        ]
      },
      {
        id: 'slot-28-3',
        dayId: 'day-5',
        slotNumber: 3,
        title: 'PASSIVE Study: Micro, ENT, FMT & Day 29 Filter',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'PASSIVE_REVISION',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'pas-5-1', text: 'Microbiology: Culture media tables, Parasitology egg morphology & Virology DNA/RNA classification', completed: false },
          { id: 'pas-5-2', text: 'ENT: Pure Tone Audiometry (PTA) graphs interpretation & CSOM mucosal vs squamosal management', completed: false },
          { id: 'pas-5-3', text: 'FMT: Toxicology antidotes (Organophosphates, Cyanide, Methanol, Paracetamol, Iron, Lead)', completed: false },
          { id: 'pas-5-4', text: 'Filter extreme volatile data points into the Volatile Vault for Day 29 Lock-In', completed: false }
        ]
      }
    ]
  },
  {
    id: 'day-6',
    dateLabel: '29 AUG',
    dayNumber: 6,
    isGoldenDay: true,
    title: '⚡ FINAL VOLATILES LOCK-IN (Golden Day)',
    protocolSummary: '⚡ FINAL DAY: 8:30am-12:30pm: 100 Spotters & 50+ Visual Tables → 12:30-1:15pm Lunch → 1:15-5:15pm: All Scores & First Pages → 5:15-6:00pm Walk & Mind reset → 6:00-11:00pm: Full Pharma Rapid Fire & DOCs → Pack Admit Card & Stationery → Bed strictly by 10:30-11:00 PM with serene mind',
    slots: [
      {
        id: 'slot-29-1',
        dayId: 'day-6',
        slotNumber: 1,
        title: '100 High-Yield Spotter Images & 50+ Visual Tables',
        timeRange: '08:30 AM – 12:30 PM',
        category: 'VOLATILE_FINAL',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'fin-1-1', text: '100 High-Yield Radiology Spotters (Chest, CNS CT/MRI, Abdominal X-ray & Pelvic signs)', completed: false },
          { id: 'fin-1-2', text: 'Histopathology slide hallmarks (Reed-Sternberg, Call-Exner, Psammoma bodies, Auer rods, Homer-Wright)', completed: false },
          { id: 'fin-1-3', text: 'Dermatology clinical spotters (Target lesions, Wickham striae, Gottron papules, Auspitz sign)', completed: false },
          { id: 'fin-1-4', text: 'Surgical & Obstetric Instruments identification (Babcock, Allis, Kocher, Cheatle, Episiotomy scissors)', completed: false },
          { id: 'fin-1-5', text: '50+ High-Yield Visual Comparison Tables review', completed: false }
        ]
      },
      {
        id: 'slot-29-2',
        dayId: 'day-6',
        slotNumber: 2,
        title: 'First Pages, All Clinical Scores & Oncology Staging',
        timeRange: '01:15 PM – 05:15 PM',
        category: 'VOLATILE_FINAL',
        durationMinutes: 240,
        remainingSeconds: 240 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'fin-2-1', text: 'First Pages sweep (Rheumatology autoantibodies, Ortho eponymous splints, Surgery triage)', completed: false },
          { id: 'fin-2-2', text: 'BNS/BSS Legal Sections & HPV high-risk oncogenic strains (16, 18, 31, 33, 45)', completed: false },
          { id: 'fin-2-3', text: 'All High-Yield Scores: GCS, Child-Pugh, MELD, Alvarado, Wells DVT/PE, CURB-65, qSOFA, Balthazar, Gleason, BIRADS, FIGO', completed: false },
          { id: 'fin-2-4', text: 'High-Yield Oncology Staging: Cervix, Endometrium, Ovary, Breast, Thyroid, Larynx, Oral Cavity', completed: false },
          { id: 'fin-2-5', text: 'Facial Nerve Injury Topographical Localization (Schirmer test, Stapedius reflex, Taste anterior 2/3 tongue)', completed: false }
        ]
      },
      {
        id: 'slot-29-3',
        dayId: 'day-6',
        slotNumber: 3,
        title: 'Full Pharma Rapid Fire (DOCs & Antidotes) & Exam Pack',
        timeRange: '06:00 PM – 11:00 PM',
        category: 'VOLATILE_FINAL',
        durationMinutes: 300,
        remainingSeconds: 300 * 60,
        isTimerRunning: false,
        isCompleted: false,
        isBacklog: false,
        items: [
          { id: 'fin-3-1', text: 'Full Pharmacology Rapid Fire: 100+ Drugs of Choice (DOCs) from Vault', completed: false },
          { id: 'fin-3-2', text: 'Complete Toxicology Antidotes Master Table', completed: false },
          { id: 'fin-3-3', text: 'Last Page General Pharma formulas (Loading dose, Maintenance dose, Half-life t1/2, Volume of distribution)', completed: false },
          { id: 'fin-3-4', text: 'Pack Exam Essentials: Admit Card printouts, Original Govt ID, Clear transparent pen, Passport photos', completed: false },
          { id: 'fin-3-5', text: 'Transition into calm mode. Deep diaphragmatic breathing. Sleep strictly by 11:00 PM. YOU ARE READY!', completed: false }
        ]
      }
    ]
  }
];
