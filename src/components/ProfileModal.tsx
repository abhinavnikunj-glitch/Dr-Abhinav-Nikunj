import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Award, Target, Calendar, Clock, Save, Sparkles, ShieldCheck, Stethoscope } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const dreamBranches = [
    'MD Radiodiagnosis',
    'MD General Medicine',
    'MD Dermatology, Venereology & Leprosy (DVL)',
    'MS Orthopaedics',
    'MS Obstetrics & Gynaecology (OBGY)',
    'MD Paediatrics',
    'MS General Surgery',
    'MD Anaesthesiology',
    'MS Ophthalmology',
    'MS Otorhinolaryngology (ENT)',
    'MD Psychiatry'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0a0f1d] border border-cyan-500/30 p-6 glow-cyan shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Subtle Cyber Grid */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-orbitron font-bold text-white tracking-wide flex items-center gap-2">
                STUDENT COCKPIT PROFILE
              </h2>
              <p className="text-xs text-slate-400 font-mono">NEET PG Aspirant Credentials & Target Matrix</p>
            </div>
          </div>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Full Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                TITLE
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="Dr.">Dr.</option>
                <option value="Dr. Aspirant">Dr. Aspirant</option>
                <option value="Intern">Intern</option>
                <option value="Post-Intern">Post-Intern</option>
                <option value="Future Resident">Future Resident</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                FULL NAME
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Abhinav Nikunj"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Roll No / Reg No & Target Rank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                ROLL / REG NO.
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  placeholder="e.g. NBE-2026-98442"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                TARGET AIR RANK
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-amber-400/80 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.targetRank}
                  onChange={(e) => setFormData({ ...formData, targetRank: e.target.value })}
                  placeholder="e.g. AIR < 250"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Dream Branch */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              DREAM SPECIALIZATION BRANCH
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
              <input
                type="text"
                list="branch-suggestions"
                value={formData.dreamBranch}
                onChange={(e) => setFormData({ ...formData, dreamBranch: e.target.value })}
                placeholder="e.g. MD Radiodiagnosis"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-cyan-200 font-medium focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
              />
              <datalist id="branch-suggestions">
                {dreamBranches.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Daily Study Goal & Exam Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                DAILY STUDY GOAL
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="4"
                  max="18"
                  step="0.5"
                  value={formData.dailyGoalHours}
                  onChange={(e) => setFormData({ ...formData, dailyGoalHours: parseFloat(e.target.value) || 10 })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-emerald-300 font-mono font-bold focus:outline-none focus:border-emerald-400"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">Recommended: 10 - 12 hrs/day</span>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                EXAM DATE
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-rose-400 absolute left-3 top-2.5" />
                <input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-rose-300 font-mono focus:outline-none focus:border-rose-400"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">Target D-Day countdown</span>
            </div>
          </div>

          {/* Motivation Quote Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-ui flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-cyan-300 font-semibold">Mission Protocol:</span> Every hour clocked in Dendrites solidifies synaptic pathways. Keep your breathing steady, trust your 6-day revision schedule, and conquer the rank!
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); onClose(); }}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              {savedSuccess ? 'SAVED MATRIX!' : 'SAVE PROFILE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
