import React from 'react';
import { DaySchedule, Slot } from '../types';
import { AlertOctagon, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Flame, ChevronRight, Zap } from 'lucide-react';
import { soundEngine } from '../services/sound';
import confetti from 'canvas-confetti';

interface BacklogTrackerViewProps {
  days: DaySchedule[];
  onToggleSlotCompleted: (slotId: string) => void;
  onToggleSlotBacklog: (slotId: string) => void;
  onToggleSlotItem: (slotId: string, itemId: string) => void;
  onNavigateToDay: (dayId: string) => void;
}

export const BacklogTrackerView: React.FC<BacklogTrackerViewProps> = ({
  days,
  onToggleSlotCompleted,
  onToggleSlotBacklog,
  onToggleSlotItem,
  onNavigateToDay
}) => {
  // Collect all backlogged or incomplete slots
  const allSlotsWithDay = days.flatMap(d => d.slots.map(s => ({ ...s, dayInfo: d })));
  const backlogSlots = allSlotsWithDay.filter(s => s.isBacklog && !s.isCompleted);
  const incompleteSlots = allSlotsWithDay.filter(s => !s.isCompleted && !s.isBacklog);

  const totalBacklogMinutes = backlogSlots.reduce((acc, s) => acc + Math.ceil(s.remainingSeconds / 60), 0);
  const totalBacklogHours = (totalBacklogMinutes / 60).toFixed(1);

  const handleResolveSlot = (slotId: string) => {
    soundEngine.playSlotComplete();
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }
    onToggleSlotCompleted(slotId);
  };

  return (
    <div className="mx-3 sm:mx-6 space-y-4 pb-28">
      {/* Backlog Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0f1d] border border-rose-500/30 glow-rose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5 animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5" />
              EMERGENCY MOP-UP ZONE
            </span>
            <span className="text-xs font-mono text-slate-400">
              Zero High-Yield Deficits Strategy
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
            BACKLOG & UNFINISHED SLOTS
          </h1>
        </div>

        {/* Backlog Stats */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-rose-500/30 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Backlogged Slots</div>
            <div className="text-sm sm:text-base font-mono font-bold text-rose-400">
              {backlogSlots.length} Blocks
            </div>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-amber-500/30 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Est. Mop-Up Time</div>
            <div className="text-sm sm:text-base font-mono font-bold text-amber-300">
              {totalBacklogHours} Hours
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Guidance Advisory */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-ui leading-relaxed flex items-start gap-3">
        <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-cyan-300 font-semibold">NEET PG Mop-Up Rule:</span> If you fall behind in a 4-hour block, do not compromise the next day's primary slots. Use the evening passive slot (6:00 PM – 11:00 PM) or the Day 29 buffer to clear high-yield sub-targets with rapid elimination.
        </div>
      </div>

      {/* Flagged Backlog Cards List */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <span>Active Flagged Backlogs</span>
          <span className="text-rose-400">({backlogSlots.length})</span>
        </h2>

        {backlogSlots.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0f1d] border border-emerald-500/30 text-center glow-emerald">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-orbitron font-bold text-white mb-1">
              ZERO BACKLOG DETECTED!
            </h3>
            <p className="text-xs font-ui text-slate-400 max-w-md mx-auto">
              All scheduled study slots are on track or marked complete. Your synaptic retention velocity is optimal!
            </p>
          </div>
        ) : (
          backlogSlots.map((slot) => {
            const completedCount = slot.items.filter(i => i.completed).length;
            const totalCount = slot.items.length;

            return (
              <div
                key={slot.id}
                className="p-4 sm:p-5 rounded-3xl bg-[#0a0f1d] border border-rose-500/40 glow-rose flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                      DAY {slot.dayInfo.dayNumber} ({slot.dayInfo.dateLabel})
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      SLOT {slot.slotNumber} • {slot.timeRange}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onNavigateToDay(slot.dayInfo.id);
                    }}
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View in Day Schedule <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {slot.title}
                  </h3>
                  <span className="text-xs font-mono text-amber-300">
                    {completedCount}/{totalCount} sub-targets done
                  </span>
                </div>

                {/* Sub-targets quick checklist */}
                <div className="space-y-1 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  {slot.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        soundEngine.playTaskCheck();
                        onToggleSlotItem(slot.id, item.id);
                      }}
                      className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white"
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${item.completed ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                        {item.completed && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                      <span className={item.completed ? 'line-through text-slate-500' : ''}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onToggleSlotBacklog(slot.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Remove Backlog Flag
                  </button>

                  <button
                    onClick={() => handleResolveSlot(slot.id)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    MARK COMPLETED
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Other Pending Slots */}
      {incompleteSlots.length > 0 && (
        <div className="space-y-3 pt-4">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Upcoming / Incomplete Protocol Slots ({incompleteSlots.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {incompleteSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-[10px] font-mono text-cyan-400">
                    Day {slot.dayInfo.dayNumber} ({slot.dayInfo.dateLabel}) • Slot {slot.slotNumber}
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {slot.title}
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onToggleSlotBacklog(slot.id);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400 hover:text-rose-400 hover:border-rose-500/40"
                >
                  + Flag Backlog
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
