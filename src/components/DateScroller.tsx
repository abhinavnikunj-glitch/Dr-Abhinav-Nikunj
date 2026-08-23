import React from 'react';
import { DaySchedule } from '../types';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface DateScrollerProps {
  days: DaySchedule[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
}

export const DateScroller: React.FC<DateScrollerProps> = ({
  days,
  selectedDayId,
  onSelectDay
}) => {
  return (
    <div className="w-full overflow-x-auto py-2 px-3 sm:px-6 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto max-w-7xl">
        {days.map((day) => {
          const isSelected = day.id === selectedDayId;
          const completedSlots = day.slots.filter(s => s.isCompleted).length;
          const totalSlots = day.slots.length;
          const isAllDone = totalSlots > 0 && completedSlots === totalSlots;

          return (
            <button
              key={day.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectDay(day.id);
              }}
              className={`relative flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 text-left min-w-[125px] sm:min-w-[145px] select-none ${
                isSelected
                  ? day.isGoldenDay
                    ? 'bg-gradient-to-br from-amber-950/80 via-yellow-950/50 to-slate-950 border-amber-400 glow-amber scale-[1.02]'
                    : 'bg-[#0a1226] border-cyan-400 glow-cyan-sm scale-[1.02]'
                  : day.isGoldenDay
                    ? 'bg-slate-950/70 border-amber-500/40 hover:border-amber-400/80 hover:bg-amber-950/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Golden Badge for Day 6 */}
              {day.isGoldenDay && (
                <div className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[9px] font-mono font-black tracking-wider flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 fill-black" />
                  GOLDEN
                </div>
              )}

              {/* Day Label & Date */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[11px] font-mono font-bold tracking-wider ${
                  day.isGoldenDay ? 'text-amber-400' : isSelected ? 'text-cyan-400' : 'text-slate-400'
                }`}>
                  DAY {day.dayNumber}
                </span>

                {isAllDone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>

              <div className={`font-orbitron font-extrabold text-base sm:text-lg tracking-wide ${
                day.isGoldenDay ? 'text-amber-200' : isSelected ? 'text-white' : 'text-slate-300'
              }`}>
                {day.dateLabel}
              </div>

              {/* Mini Progress / Slot count */}
              <div className="mt-2 w-full flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="truncate max-w-[85px]">{completedSlots}/{totalSlots} Slots</span>
                <span className={`font-bold ${isAllDone ? 'text-emerald-400' : completedSlots > 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {Math.round((completedSlots / (totalSlots || 1)) * 100)}%
                </span>
              </div>

              {/* Mini progress bar */}
              <div className="mt-1 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    day.isGoldenDay
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}
                  style={{ width: `${(completedSlots / (totalSlots || 1)) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
