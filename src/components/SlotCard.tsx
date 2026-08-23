import React, { useState } from 'react';
import { Slot, SlotItem } from '../types';
import { Play, Pause, RotateCcw, CheckCircle2, AlertTriangle, Clock, Tag, ChevronDown, ChevronUp, Plus, Trash2, Edit3, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/sound';
import confetti from 'canvas-confetti';

interface SlotCardProps {
  slot: Slot;
  onToggleTimer: (slotId: string) => void;
  onResetTimer: (slotId: string) => void;
  onToggleItem: (slotId: string, itemId: string) => void;
  onToggleCompleted: (slotId: string) => void;
  onToggleBacklog: (slotId: string) => void;
  onAddItem: (slotId: string, text: string) => void;
  onDeleteItem: (slotId: string, itemId: string) => void;
  onDeleteSlot?: (slotId: string) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  slot,
  onToggleTimer,
  onResetTimer,
  onToggleItem,
  onToggleCompleted,
  onToggleBacklog,
  onAddItem,
  onDeleteItem,
  onDeleteSlot
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const completedItems = slot.items.filter(i => i.completed).length;
  const totalItems = slot.items.length;
  const itemProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const categoryStyles = {
    HIGH_YIELD_NOTES: { label: 'HIGH-YIELD CORE', border: 'border-cyan-500/30', tagBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40' },
    ACTIVE_MCQ: { label: 'ACTIVE MCQS', border: 'border-blue-500/30', tagBg: 'bg-blue-950/60 text-blue-300 border-blue-500/40' },
    PASSIVE_REVISION: { label: 'PASSIVE SWEEP', border: 'border-purple-500/30', tagBg: 'bg-purple-950/60 text-purple-300 border-purple-500/40' },
    VOLATILE_FINAL: { label: '⚡ VOLATILE LOCK-IN', border: 'border-amber-500/40', tagBg: 'bg-amber-950/80 text-amber-300 border-amber-500/50' },
    CUSTOM: { label: 'CUSTOM BLOCK', border: 'border-emerald-500/30', tagBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' }
  };

  const catStyle = categoryStyles[slot.category] || categoryStyles.HIGH_YIELD_NOTES;

  const handleCompleteClick = () => {
    if (!slot.isCompleted) {
      soundEngine.playSlotComplete();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00d9ff', '#3b82f6', '#10b981', '#f59e0b']
        });
      } catch {
        // Fallback
      }
    } else {
      soundEngine.playClick();
    }
    onToggleCompleted(slot.id);
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    soundEngine.playClick();
    onAddItem(slot.id, newItemText.trim());
    setNewItemText('');
    setIsAddingItem(false);
  };

  return (
    <div
      className={`rounded-3xl bg-[#0a0f1d] border transition-all duration-300 p-4 sm:p-5 relative overflow-hidden ${
        slot.isCompleted
          ? 'border-emerald-500/50 bg-slate-950/90 glow-emerald'
          : slot.isBacklog
            ? 'border-rose-500/50 bg-[#160b12] glow-rose'
            : slot.category === 'VOLATILE_FINAL'
              ? 'border-amber-500/40 glow-amber'
              : 'border-slate-800 hover:border-cyan-500/40 glow-cyan-sm'
      }`}
    >
      {/* Top Tag & Slot Number Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono font-bold text-white">
            SLOT {slot.slotNumber}
          </span>
          <span className={`px-2.5 py-1 rounded-xl border text-[11px] font-mono font-bold ${catStyle.tagBg}`}>
            {catStyle.label}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {slot.timeRange}
          </span>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {slot.isBacklog && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              BACKLOG FLAG
            </span>
          )}

          {slot.isCompleted && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              COMPLETED
            </span>
          )}

          <button
            onClick={() => { soundEngine.playClick(); setIsExpanded(!isExpanded); }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Title & Slot Countdown Timer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
          {slot.title}
        </h3>

        {/* Dedicated Slot Timer */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-1.5 self-start sm:self-auto">
          <div className="font-mono font-bold text-sm text-cyan-300 px-2 tracking-wider">
            {formatTimer(slot.remainingSeconds)}
          </div>
          <button
            onClick={() => {
              if (slot.isTimerRunning) soundEngine.playTimerPause();
              else soundEngine.playTimerStart();
              onToggleTimer(slot.id);
            }}
            className={`p-1.5 rounded-xl transition-all ${
              slot.isTimerRunning
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
            }`}
            title={slot.isTimerRunning ? 'Pause Slot Timer' : 'Start Slot Timer'}
          >
            {slot.isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onResetTimer(slot.id); }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Slot Timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sub-Targets Checklist */}
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {/* Progress metric */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>High-Yield Sub-Targets ({completedItems}/{totalItems})</span>
            <span className="font-bold text-cyan-400">{itemProgress}% Ready</span>
          </div>

          {/* Checklist items */}
          <div className="space-y-1.5">
            {slot.items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.completed) soundEngine.playTaskCheck();
                  else soundEngine.playClick();
                  onToggleItem(slot.id, item.id);
                }}
                className={`group flex items-start justify-between gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                  item.completed
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                    : 'bg-slate-900/50 border-slate-800/60 text-slate-200 hover:border-cyan-500/30 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      item.completed
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-slate-600 group-hover:border-cyan-400 bg-slate-950'
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-ui leading-relaxed ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    onDeleteItem(slot.id, item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                  title="Delete sub-target"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Sub-Target Input */}
          {isAddingItem ? (
            <form onSubmit={handleAddItemSubmit} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Type additional high-yield target..."
                className="flex-1 bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold rounded-xl"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="px-2.5 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-xl hover:text-white"
              >
                CANCEL
              </button>
            </form>
          ) : (
            <button
              onClick={() => { soundEngine.playClick(); setIsAddingItem(true); }}
              className="mt-2 flex items-center gap-1.5 text-xs font-mono text-cyan-400/80 hover:text-cyan-300 py-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add custom sub-target
            </button>
          )}

          {/* Action Status Toggle Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Backlog Toggle */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onToggleBacklog(slot.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                  slot.isBacklog
                    ? 'bg-rose-950/80 text-rose-300 border-rose-500 shadow-md shadow-rose-950/50'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-rose-400 hover:border-rose-500/40'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {slot.isBacklog ? 'FLAGGED AS BACKLOG' : 'MARK AS BACKLOG'}
              </button>

              {onDeleteSlot && (
                <button
                  onClick={() => {
                    if (confirm('Delete this custom slot?')) {
                      soundEngine.playClick();
                      onDeleteSlot(slot.id);
                    }
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
                  title="Delete Slot"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Complete Toggle Button */}
            <button
              onClick={handleCompleteClick}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-md ${
                slot.isCompleted
                  ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-cyan-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {slot.isCompleted ? 'COMPLETED ✓' : 'MARK COMPLETED'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
