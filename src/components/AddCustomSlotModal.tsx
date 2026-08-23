import React, { useState } from 'react';
import { DaySchedule, SlotCategory } from '../types';
import { X, Plus, Clock, BookOpen, Layers, ListOrdered, Save } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface AddCustomSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: DaySchedule[];
  selectedDayId: string;
  onAddSlot: (dayId: string, slotData: {
    title: string;
    timeRange: string;
    category: SlotCategory;
    durationMinutes: number;
    subTargetsText: string;
  }) => void;
}

export const AddCustomSlotModal: React.FC<AddCustomSlotModalProps> = ({
  isOpen,
  onClose,
  days,
  selectedDayId,
  onAddSlot
}) => {
  const [dayId, setDayId] = useState(selectedDayId);
  const [title, setTitle] = useState('');
  const [timeRange, setTimeRange] = useState('06:00 PM – 08:00 PM');
  const [category, setCategory] = useState<SlotCategory>('CUSTOM');
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [subTargetsText, setSubTargetsText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    soundEngine.playClick();
    onAddSlot(dayId, {
      title: title.trim(),
      timeRange: timeRange.trim(),
      category,
      durationMinutes: Number(durationMinutes) || 120,
      subTargetsText
    });
    // Reset and close
    setTitle('');
    setSubTargetsText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 p-6 glow-cyan shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-orbitron font-bold text-white tracking-wide">
                ADD REVISION SLOT
              </h2>
              <p className="text-xs text-slate-400 font-mono">Insert dynamic study block into circadian schedule</p>
            </div>
          </div>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Target Day */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              SELECT REVISION DAY
            </label>
            <select
              value={dayId}
              onChange={(e) => setDayId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            >
              {days.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.dateLabel} - Day {d.dayNumber}: {d.title}
                </option>
              ))}
            </select>
          </div>

          {/* Slot Title */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              SLOT TITLE & SUBJECT
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Microbiology Bacteriology Tables & Antimicrobial Sensitivity"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Time Window & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                TIME WINDOW
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  placeholder="08:30 AM – 12:30 PM"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                DURATION (MINUTES)
              </label>
              <input
                type="number"
                min="15"
                max="600"
                step="15"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              CATEGORY / FOCUS LEVEL
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { key: 'HIGH_YIELD_NOTES', label: 'Notes + Core' },
                { key: 'ACTIVE_MCQ', label: 'Active MCQs' },
                { key: 'PASSIVE_REVISION', label: 'Passive Sweep' },
                { key: 'VOLATILE_FINAL', label: 'Volatile Lock-In' },
                { key: 'CUSTOM', label: 'Custom Block' }
              ].map((c) => (
                <button
                  type="button"
                  key={c.key}
                  onClick={() => setCategory(c.key as SlotCategory)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                    category === c.key
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Multi-line Sub-targets */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              ITEMIZED SUB-TARGETS (One per line)
            </label>
            <textarea
              rows={4}
              value={subTargetsText}
              onChange={(e) => setSubTargetsText(e.target.value)}
              placeholder="Gram positive vs negative flowcharts&#10;Culture media selective vs differential&#10;Solve 30 PYQs on Bacterial genetics"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 font-ui focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 leading-relaxed"
            />
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Each line becomes an interactive checklist item with progress sync
            </span>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); onClose(); }}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              INSERT SLOT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
