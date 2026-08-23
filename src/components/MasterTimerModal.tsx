import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Clock, Flame, Zap, Volume2, VolumeX, Maximize2, Minimize2, Award, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../services/sound';
import { Slot } from '../types';

interface MasterTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalDailySeconds: number;
  isRunning: boolean;
  onToggleRun: () => void;
  onResetTimer: () => void;
  dailyGoalHours: number;
  activeSlots: Slot[];
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MasterTimerModal: React.FC<MasterTimerModalProps> = ({
  isOpen,
  onClose,
  totalDailySeconds,
  isRunning,
  onToggleRun,
  onResetTimer,
  dailyGoalHours,
  activeSlots,
  soundEnabled,
  onToggleSound
}) => {
  const [timerMode, setTimerMode] = useState<'STOPWATCH' | 'POMO_50' | 'POMO_90' | 'DEEP_240'>('STOPWATCH');
  const [pomoRemaining, setPomoRemaining] = useState<number>(50 * 60);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync pomo preset changes
  useEffect(() => {
    if (timerMode === 'POMO_50') setPomoRemaining(50 * 60);
    else if (timerMode === 'POMO_90') setPomoRemaining(90 * 60);
    else if (timerMode === 'DEEP_240') setPomoRemaining(240 * 60);
  }, [timerMode]);

  // Pomodoro local countdown when running
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerMode !== 'STOPWATCH') {
      interval = setInterval(() => {
        setPomoRemaining((prev) => {
          if (prev <= 1) {
            soundEngine.playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerMode]);

  if (!isOpen) return null;

  const formatHMS = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return {
      hrs: String(hrs).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0')
    };
  };

  const goalSeconds = Math.max(1, dailyGoalHours * 3600);
  const progressPercent = Math.min(100, Math.round((totalDailySeconds / goalSeconds) * 100));
  const timeDisplay = timerMode === 'STOPWATCH' ? formatHMS(totalDailySeconds) : formatHMS(pomoRemaining);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'p-0 bg-black' : 'p-4 bg-black/85 backdrop-blur-md'} animate-in fade-in duration-200`}>
      <div className={`relative w-full ${isFullscreen ? 'h-full max-w-none rounded-none' : 'max-w-2xl rounded-3xl'} bg-[#0a0f1d] border border-cyan-500/30 p-6 sm:p-8 glow-cyan shadow-2xl flex flex-col justify-between overflow-hidden`}>
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 glow-cyan-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-orbitron font-extrabold text-white tracking-wider flex items-center gap-2">
                SYNAPTIC FOCUS ENGINE
              </h2>
              <p className="text-xs text-cyan-400/70 font-mono">NEET PG High-Yield Cumulative Study Timer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { soundEngine.playClick(); onToggleSound(); }}
              className={`p-2 rounded-xl border transition-colors ${soundEnabled ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 text-slate-500 bg-slate-900'}`}
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setIsFullscreen(!isFullscreen); }}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Toggle Fullscreen Focus"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onClose(); }}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="p-1 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => { soundEngine.playClick(); setTimerMode('STOPWATCH'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${timerMode === 'STOPWATCH' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              CUMULATIVE STOPWATCH
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setTimerMode('POMO_50'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${timerMode === 'POMO_50' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              50m FOCUS
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setTimerMode('POMO_90'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${timerMode === 'POMO_90' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              90m BLOCK
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setTimerMode('DEEP_240'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${timerMode === 'DEEP_240' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              4h SLOT
            </button>
          </div>
        </div>

        {/* Central Timer Circular Display */}
        <div className="relative z-10 my-4 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* SVG Arc Progress */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
              <circle
                cx="120"
                cy="120"
                r="104"
                stroke="#0f172a"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="120"
                cy="120"
                r="104"
                stroke="url(#timerGradient)"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 104}
                strokeDashoffset={2 * Math.PI * 104 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d9ff" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-cyan-400 mb-1">
                {isRunning ? (
                  <span className="flex items-center gap-1 text-emerald-400 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    DEEP FOCUS ACTIVE
                  </span>
                ) : (
                  <span className="text-slate-400">STANDBY MODE</span>
                )}
              </div>

              {/* Big Digital Readout */}
              <div className="font-mono font-extrabold text-4xl sm:text-5xl tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                {timeDisplay.hrs}:{timeDisplay.mins}:{timeDisplay.secs}
              </div>

              {/* Daily Target Indicator */}
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-slate-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{progressPercent}% of {dailyGoalHours}h Goal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slot Attachment (Optional active slot tracking) */}
        {activeSlots.length > 0 && (
          <div className="relative z-10 mb-4 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400">Sync with current slot:</span>
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 max-w-[240px] truncate"
            >
              <option value="">-- No specific slot attached --</option>
              {activeSlots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.timeRange})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Primary Controls */}
        <div className="relative z-10 flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => { soundEngine.playClick(); onResetTimer(); }}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95"
            title="Reset Master Daily Time"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (isRunning) soundEngine.playTimerPause();
              else soundEngine.playTimerStart();
              onToggleRun();
            }}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-orbitron font-extrabold text-base tracking-wider transition-all shadow-xl active:scale-95 ${
              isRunning
                ? 'bg-rose-500/90 hover:bg-rose-500 text-white shadow-rose-500/25'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-cyan-500/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                PAUSE FOCUS
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                START FOCUS
              </>
            )}
          </button>
        </div>

        {/* Bottom Quick Metrics Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Today's Focus</div>
            <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">
              {(totalDailySeconds / 3600).toFixed(1)} hrs
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Daily Target</div>
            <div className="text-sm font-mono font-bold text-white mt-0.5">
              {dailyGoalHours}.0 hrs
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Efficiency Rate</div>
            <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
              {progressPercent >= 100 ? '🔥 Goal Achieved!' : `${progressPercent}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
