import React from 'react';
import { DaySchedule, Slot } from '../types';
import { DateScroller } from './DateScroller';
import { ProtocolBanner } from './ProtocolBanner';
import { SlotCard } from './SlotCard';
import { Plus, Sparkles, Target, Zap, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface ScheduleViewProps {
  days: DaySchedule[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  onToggleSlotTimer: (slotId: string) => void;
  onResetSlotTimer: (slotId: string) => void;
  onToggleSlotItem: (slotId: string, itemId: string) => void;
  onToggleSlotCompleted: (slotId: string) => void;
  onToggleSlotBacklog: (slotId: string) => void;
  onAddSlotItem: (slotId: string, text: string) => void;
  onDeleteSlotItem: (slotId: string, itemId: string) => void;
  onOpenAddSlotModal: () => void;
  onDeleteCustomSlot?: (slotId: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  onToggleSlotTimer,
  onResetSlotTimer,
  onToggleSlotItem,
  onToggleSlotCompleted,
  onToggleSlotBacklog,
  onAddSlotItem,
  onDeleteSlotItem,
  onOpenAddSlotModal,
  onDeleteCustomSlot
}) => {
  const currentDay = days.find(d => d.id === selectedDayId) || days[0];

  const totalSlots = currentDay.slots.length;
  const completedSlots = currentDay.slots.filter(s => s.isCompleted).length;
  const totalItemsCount = currentDay.slots.reduce((acc, s) => acc + s.items.length, 0);
  const completedItemsCount = currentDay.slots.reduce((acc, s) => acc + s.items.filter(i => i.completed).length, 0);
  const totalMinutesRemaining = currentDay.slots
    .filter(s => !s.isCompleted)
    .reduce((acc, s) => acc + Math.ceil(s.remainingSeconds / 60), 0);

  return (
    <div className="space-y-4 pb-28">
      {/* Date Scroller */}
      <DateScroller
        days={days}
        selectedDayId={selectedDayId}
        onSelectDay={onSelectDay}
      />

      {/* Selected Day Status Header */}
      <div className="mx-3 sm:mx-6 p-4 rounded-3xl bg-[#0a0f1d] border border-cyan-500/20 glow-cyan-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
              PROTOCOL DAY {currentDay.dayNumber} OF 6
            </span>
            {currentDay.isGoldenDay && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                GOLDEN REVISION
              </span>
            )}
          </div>
          <h1 className="text-lg sm:text-xl font-orbitron font-extrabold text-white tracking-wide">
            {currentDay.title}
          </h1>
        </div>

        {/* Day Quick Stats */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Sub-Targets</div>
            <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300">
              {completedItemsCount}/{totalItemsCount} Done
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Time Left</div>
            <div className="text-xs sm:text-sm font-mono font-bold text-amber-300">
              {(totalMinutesRemaining / 60).toFixed(1)} hrs
            </div>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onOpenAddSlotModal(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            title="Add Custom Revision Slot"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">ADD SLOT</span>
          </button>
        </div>
      </div>

      {/* Circadian Protocol Banner */}
      <ProtocolBanner
        summary={currentDay.protocolSummary}
        isGoldenDay={currentDay.isGoldenDay}
      />

      {/* Slot Cards List */}
      <div className="mx-3 sm:mx-6 space-y-4">
        {currentDay.slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onToggleTimer={onToggleSlotTimer}
            onResetTimer={onResetSlotTimer}
            onToggleItem={onToggleSlotItem}
            onToggleCompleted={onToggleSlotCompleted}
            onToggleBacklog={onToggleSlotBacklog}
            onAddItem={onAddSlotItem}
            onDeleteItem={onDeleteSlotItem}
            onDeleteSlot={slot.category === 'CUSTOM' ? onDeleteCustomSlot : undefined}
          />
        ))}
      </div>
    </div>
  );
};
