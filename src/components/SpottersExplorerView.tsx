import React, { useState } from 'react';
import { SPOTTERS_DATA } from '../data/spottersData';
import { SpotterCategory, SpotterItem } from '../types';
import { Eye, Search, Sparkles, Filter, Calculator, AlertTriangle, CheckCircle2, ChevronRight, Layers, Table, BookOpen } from 'lucide-react';
import { soundEngine } from '../services/sound';

export const SpottersExplorerView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SpotterCategory>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpotterId, setActiveSpotterId] = useState<string>(SPOTTERS_DATA[0].id);

  // Interactive Calculator States
  // GCS
  const [gcsEye, setGcsEye] = useState(4);
  const [gcsVerbal, setGcsVerbal] = useState(5);
  const [gcsMotor, setGcsMotor] = useState(6);

  // CURB-65
  const [curbC, setCurbC] = useState(false);
  const [curbU, setCurbU] = useState(false);
  const [curbR, setCurbR] = useState(false);
  const [curbB, setCurbB] = useState(false);
  const [curb65, setCurb65] = useState(false);

  // Alvarado
  const [alvM, setAlvM] = useState(false);
  const [alvA, setAlvA] = useState(false);
  const [alvN, setAlvN] = useState(false);
  const [alvT, setAlvT] = useState(false);
  const [alvR, setAlvR] = useState(false);
  const [alvE, setAlvE] = useState(false);
  const [alvL, setAlvL] = useState(false);
  const [alvS, setAlvS] = useState(false);

  const activeSpotter = SPOTTERS_DATA.find(s => s.id === activeSpotterId) || SPOTTERS_DATA[0];

  const categories: { key: SpotterCategory; label: string }[] = [
    { key: 'ALL', label: 'All 100+ Spotters' },
    { key: 'RADIOLOGY', label: 'Radiology Signs' },
    { key: 'HISTOPATH', label: 'Histopathology' },
    { key: 'DERMATOLOGY', label: 'Dermatology' },
    { key: 'INSTRUMENTS', label: 'Surg Instruments' },
    { key: 'CLINICAL_SCORES', label: 'Clinical Scores' },
    { key: 'ONCOLOGY_STAGING', label: 'FIGO / Oncology' }
  ];

  const filteredSpotters = SPOTTERS_DATA.filter(s => {
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.highYieldSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.classicBuzzwords.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate GCS
  const totalGCS = gcsEye + gcsVerbal + gcsMotor;

  // Calculate CURB65
  const totalCURB = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);

  // Calculate Alvarado
  const totalAlvarado = (alvM ? 1 : 0) + (alvA ? 1 : 0) + (alvN ? 1 : 0) + (alvT ? 2 : 0) + 
                        (alvR ? 1 : 0) + (alvE ? 1 : 0) + (alvL ? 2 : 0) + (alvS ? 1 : 0);

  // Visual SVG Renderer
  const renderVisualArtwork = (spotter: SpotterItem) => {
    if (spotter.visualType === 'SVG_CHEST_XRAY') {
      return (
        <div className="relative w-full h-56 bg-black rounded-2xl border border-cyan-500/30 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 300 200" className="w-full h-full text-slate-400">
            {/* Thoracic Ribcage & Silhouette */}
            <path d="M150 20 L150 180" stroke="#334155" strokeWidth="6" />
            {/* Clavicles */}
            <path d="M70 45 Q150 35 230 45" stroke="#475569" strokeWidth="4" fill="none" />
            {/* Left & Right Lung Fields */}
            <path d="M60 50 C40 80 40 140 70 170 C100 170 110 160 140 160 C140 80 120 50 60 50 Z" fill="#020617" stroke="#334155" strokeWidth="2" />
            <path d="M240 50 C260 80 260 140 230 170 C200 170 190 160 160 160 C160 80 180 50 240 50 Z" fill="#020617" stroke="#334155" strokeWidth="2" />
            {/* Cardiac Silhouette (Cardiomegaly) */}
            <path d="M140 110 C140 165 210 165 210 120 C210 95 160 95 140 110 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            {/* Bat-wing Perihilar Alveolar Infiltrates (Glowing Cyan White) */}
            <ellipse cx="115" cy="115" rx="30" ry="25" fill="#f8fafc" opacity="0.85" filter="url(#hazeFilter)" />
            <ellipse cx="185" cy="115" rx="30" ry="25" fill="#f8fafc" opacity="0.85" filter="url(#hazeFilter)" />
            {/* Periphery is Clear */}
            <text x="150" y="192" fill="#00d9ff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              [BATWING INFILTRATE: PERIHILAR HAZE WITH CLEAR PERIPHERY]
            </text>
            <defs>
              <filter id="hazeFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
          </svg>
        </div>
      );
    }

    if (spotter.visualType === 'SVG_BRAIN_CT') {
      return (
        <div className="relative w-full h-56 bg-black rounded-2xl border border-cyan-500/30 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 260 200" className="w-full h-full">
            {/* Skull Calvarium */}
            <ellipse cx="130" cy="100" rx="90" ry="85" fill="#0f172a" stroke="#ffffff" strokeWidth="8" />
            {/* Brain Parenchyma */}
            <ellipse cx="130" cy="100" rx="80" ry="75" fill="#1e293b" />
            {/* Midline Shift */}
            <path d="M130 30 Q120 100 130 170" stroke="#64748b" strokeWidth="3" strokeDasharray="4 2" />
            {/* Biconvex Hyperdense Lentiform EDH Lens on Right Temporal */}
            <path d="M210 70 C185 85 185 115 210 130 C215 110 215 90 210 70 Z" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" filter="url(#edhGlow)" />
            <text x="130" y="195" fill="#00d9ff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              [NCCT BRAIN: BICONVEX LENTIFORM EPIDURAL HEMATOMA]
            </text>
            <defs>
              <filter id="edhGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00d9ff" />
              </filter>
            </defs>
          </svg>
        </div>
      );
    }

    if (spotter.visualType === 'SVG_HISTO_SLIDE') {
      return (
        <div className="relative w-full h-56 bg-[#2d0a23] rounded-2xl border border-purple-500/30 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 280 180" className="w-full h-full">
            {/* Background lymphoid tissue (H&E Staining) */}
            <circle cx="70" cy="60" r="14" fill="#6b21a8" opacity="0.6" />
            <circle cx="210" cy="80" r="16" fill="#6b21a8" opacity="0.6" />
            <circle cx="140" cy="150" r="18" fill="#6b21a8" opacity="0.6" />
            <circle cx="80" cy="130" r="15" fill="#701a75" opacity="0.5" />
            <circle cx="200" cy="140" r="14" fill="#701a75" opacity="0.5" />

            {/* Giant Reed-Sternberg Cell (Binucleated Owl's Eye) */}
            <ellipse cx="140" cy="85" rx="55" ry="42" fill="#be185d" opacity="0.35" stroke="#db2777" strokeWidth="2" />
            {/* Left & Right Nuclei with clear halo and prominent eosinophilic inclusion nucleolus */}
            <circle cx="120" cy="85" r="18" fill="#fbcfe8" stroke="#831843" strokeWidth="2" />
            <circle cx="120" cy="85" r="8" fill="#e11d48" filter="url(#owlGlow)" />

            <circle cx="160" cy="85" r="18" fill="#fbcfe8" stroke="#831843" strokeWidth="2" />
            <circle cx="160" cy="85" r="8" fill="#e11d48" filter="url(#owlGlow)" />

            <text x="140" y="172" fill="#f472b6" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              [H&E SLIDE: REED-STERNBERG CELL - CLASSICAL OWL'S EYE NUCLEOLI]
            </text>
            <defs>
              <filter id="owlGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#f43f5e" />
              </filter>
            </defs>
          </svg>
        </div>
      );
    }

    if (spotter.visualType === 'SVG_DERMA_LESION') {
      return (
        <div className="relative w-full h-56 bg-[#1a0f0f] rounded-2xl border border-rose-500/30 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 260 180" className="w-full h-full">
            {/* Skin Canvas */}
            <rect width="260" height="180" fill="#2d1216" />
            {/* Outer Erythematous Ring (Zone 3) */}
            <circle cx="130" cy="85" r="58" fill="#9f1239" opacity="0.8" />
            {/* Intermediate Pale Edematous Ring (Zone 2) */}
            <circle cx="130" cy="85" r="40" fill="#fda4af" opacity="0.9" />
            {/* Central Dusky/Violaceous Necrotic Bulla (Zone 1) */}
            <circle cx="130" cy="85" r="22" fill="#881337" stroke="#4c0519" strokeWidth="3" />
            <circle cx="130" cy="85" r="8" fill="#1c1917" />

            <text x="130" y="170" fill="#fb7185" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              [TARGET / IRIS LESION: 3 CONCENTRIC ZONES OF ERYTHEMA MULTIFORME]
            </text>
          </svg>
        </div>
      );
    }

    if (spotter.visualType === 'SVG_INSTRUMENT') {
      return (
        <div className="relative w-full h-56 bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 280 180" className="w-full h-full text-slate-300">
            {/* Surgical Metallic Instrument Outline */}
            <path d="M60 140 C40 140 40 110 60 110 L140 90 L200 60 C220 50 240 70 230 85 C220 100 200 95 190 90" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M60 140 C40 140 40 170 60 170 L140 90 L200 120 C220 130 240 110 230 95" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Fenestrated Triangular Jaw Tips */}
            <polygon points="215,65 240,75 225,90" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <polygon points="215,115 240,105 225,90" fill="none" stroke="#38bdf8" strokeWidth="3" />
            {/* Ratchet Lock Mechanism */}
            <rect x="90" y="125" width="20" height="8" rx="2" fill="#64748b" />

            <text x="140" y="172" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              [BABCOCK ATRAUMATIC TISSUE FORCEPS - FENESTRATED JAWS]
            </text>
          </svg>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-3 sm:mx-6 space-y-4 pb-28">
      {/* Spotters Hero Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0f1d] border border-amber-500/40 glow-amber flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              DAY 29 SPECIAL MODULE
            </span>
            <span className="text-xs font-mono text-slate-400">
              100 High-Yield Spotters & Visual Mastery Tables
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
            CLINICAL SPOTTERS & SCORES
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 font-bold">
            {SPOTTERS_DATA.length} Curated High-Yield Spotters
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search spotters by radiological sign, histopath bodies, scores (GCS, CURB-65)..."
            className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => { soundEngine.playClick(); setSelectedCategory(c.key); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === c.key
                  ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Spotters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Spotter Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredSpotters.map((spotter) => {
            const isSelected = spotter.id === activeSpotterId;
            return (
              <div
                key={spotter.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveSpotterId(spotter.id);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-400 glow-amber'
                    : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-500/30">
                    {spotter.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {spotter.subject}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                  {spotter.title}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {spotter.highYieldSummary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Active Spotter Details & Interactive Calculators (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 p-4 sm:p-6 glow-cyan-sm space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                  {activeSpotter.subject} • {activeSpotter.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                  {activeSpotter.title}
                </h2>
              </div>
            </div>

            {/* High-Yield Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 font-ui leading-relaxed">
              {activeSpotter.highYieldSummary}
            </div>

            {/* Visual Diagram / Artwork */}
            {renderVisualArtwork(activeSpotter)}

            {/* Interactive Clinical Score Calculators */}
            {activeSpotter.scoreCalculatorData?.type === 'GCS' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    INTERACTIVE GCS SCORER
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Total GCS:</span>
                    <span className={`text-base font-mono font-black px-3 py-0.5 rounded-xl border ${
                      totalGCS <= 8 ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse' : 'bg-cyan-950 text-cyan-300 border-cyan-500'
                    }`}>
                      {totalGCS} / 15 {totalGCS <= 8 && '⚠️ (INTUBATE!)'}
                    </span>
                  </div>
                </div>

                {/* E V M Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Eye Opening (E: 1-4)
                    </label>
                    <select
                      value={gcsEye}
                      onChange={(e) => { soundEngine.playClick(); setGcsEye(Number(e.target.value)); }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                    >
                      <option value={4}>4 - Spontaneous</option>
                      <option value={3}>3 - To Sound</option>
                      <option value={2}>2 - To Pressure</option>
                      <option value={1}>1 - None</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Verbal Response (V: 1-5)
                    </label>
                    <select
                      value={gcsVerbal}
                      onChange={(e) => { soundEngine.playClick(); setGcsVerbal(Number(e.target.value)); }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                    >
                      <option value={5}>5 - Oriented</option>
                      <option value={4}>4 - Confused</option>
                      <option value={3}>3 - Inappropriate</option>
                      <option value={2}>2 - Sounds</option>
                      <option value={1}>1 - None</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Motor Response (M: 1-6)
                    </label>
                    <select
                      value={gcsMotor}
                      onChange={(e) => { soundEngine.playClick(); setGcsMotor(Number(e.target.value)); }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white"
                    >
                      <option value={6}>6 - Obeys Commands</option>
                      <option value={5}>5 - Localizes Pain</option>
                      <option value={4}>4 - Normal Flexion</option>
                      <option value={3}>3 - Decorticate (Abnormal Flex)</option>
                      <option value={2}>2 - Decerebrate (Extension)</option>
                      <option value={1}>1 - None</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* CURB-65 Calculator */}
            {activeSpotter.scoreCalculatorData?.type === 'CURB65' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    CURB-65 POINT CALCULATOR
                  </span>
                  <span className="text-sm font-mono font-bold px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500">
                    Score: {totalCURB} / 5 ({totalCURB <= 1 ? 'Outpatient' : totalCURB === 2 ? 'Inpatient Ward' : 'ICU Admission'})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={curbC} onChange={(e) => setCurbC(e.target.checked)} className="rounded" />
                    <span>Confusion (AMTS ≤ 8 or disorientation)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={curbU} onChange={(e) => setCurbU(e.target.checked)} className="rounded" />
                    <span>Urea &gt; 7 mmol/L (BUN &gt; 19 mg/dL)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={curbR} onChange={(e) => setCurbR(e.target.checked)} className="rounded" />
                    <span>Respiratory Rate ≥ 30 breaths/min</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={curbB} onChange={(e) => setCurbB(e.target.checked)} className="rounded" />
                    <span>Blood Pressure (SBP &lt; 90 or DBP ≤ 60)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer col-span-1 sm:col-span-2">
                    <input type="checkbox" checked={curb65} onChange={(e) => setCurb65(e.target.checked)} className="rounded" />
                    <span>Age ≥ 65 years</span>
                  </label>
                </div>
              </div>
            )}

            {/* Alvarado Score Calculator */}
            {activeSpotter.scoreCalculatorData?.type === 'ALVARADO' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    ALVARADO APPENDICITIS SCORER (MANTRELS)
                  </span>
                  <span className={`text-sm font-mono font-bold px-3 py-1 rounded-xl border ${
                    totalAlvarado >= 7 ? 'bg-rose-950 text-rose-300 border-rose-500' : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}>
                    Score: {totalAlvarado} / 10 ({totalAlvarado >= 7 ? 'Probable Appendicitis (Surgery!)' : totalAlvarado >= 5 ? 'Equivocal (CT Scan)' : 'Unlikely'})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={alvM} onChange={(e) => setAlvM(e.target.checked)} />
                    <span>M: Migration of pain to RIF [1 pt]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={alvA} onChange={(e) => setAlvA(e.target.checked)} />
                    <span>A: Anorexia [1 pt]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={alvN} onChange={(e) => setAlvN(e.target.checked)} />
                    <span>N: Nausea / Vomiting [1 pt]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 cursor-pointer">
                    <input type="checkbox" checked={alvT} onChange={(e) => setAlvT(e.target.checked)} />
                    <span>T: Tenderness in RIF [2 pts - Double Weight]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={alvR} onChange={(e) => setAlvR(e.target.checked)} />
                    <span>R: Rebound Tenderness [1 pt]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input type="checkbox" checked={alvE} onChange={(e) => setAlvE(e.target.checked)} />
                    <span>E: Elevated Temp &gt; 37.3°C [1 pt]</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 cursor-pointer col-span-1 sm:col-span-2">
                    <input type="checkbox" checked={alvL} onChange={(e) => setAlvL(e.target.checked)} />
                    <span>L: Leukocytosis &gt; 10,000/mcL [2 pts - Double Weight]</span>
                  </label>
                </div>
              </div>
            )}

            {/* Details Table (FIGO Staging etc.) */}
            {activeSpotter.detailsTable && (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-2">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-cyan-300">
                      {activeSpotter.detailsTable.headers.map((h, i) => (
                        <th key={i} className="p-2.5 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeSpotter.detailsTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-900 hover:bg-slate-900/60">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2.5 text-slate-200">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Key Features Breakdown */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Key Diagnostic Features & Management
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {activeSpotter.keyFeatures.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800/60">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buzzwords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs font-mono text-slate-400">Buzzwords:</span>
              {activeSpotter.classicBuzzwords.map((buzz, bIdx) => (
                <span key={bIdx} className="px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                  {buzz}
                </span>
              ))}
            </div>

            {/* Exam Trap Warning Box */}
            {activeSpotter.examTrapWarning && (
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 font-ui leading-relaxed flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-300">NEET PG Trap Alert: </span>
                  {activeSpotter.examTrapWarning}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
