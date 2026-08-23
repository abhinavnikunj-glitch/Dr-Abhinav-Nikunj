import React from 'react';
import { DendritesLogo } from './DendritesLogo';
import { UserProfile } from '../types';
import { Play, Pause, Clock, User, HardDriveDownload, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface HeaderCockpitProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  totalStudySeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onOpenTimerModal: () => void;
  onOpenBackup: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  completedSlotsCount: number;
  totalSlotsCount: number;
}

export const HeaderCockpit: React.FC<HeaderCockpitProps> = ({
  profile,
  onOpenProfile,
  totalStudySeconds,
  isTimerRunning,
  onToggleTimer,
  onOpenTimerModal,
  onOpenBackup,
  soundEnabled,
  onToggleSound,
  completedSlotsCount,
  totalSlotsCount
}) => {
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateDaysLeft = () => {
    try {
      const exam = new Date(profile.examDate);
      const now = new Date();
      const diffTime = exam.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch {
      return 6;
    }
  };

  const daysLeft = calculateDaysLeft();

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2.5 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: App Logo & Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <DendritesLogo size="md" showSubtitle={true} />
        </div>

        {/* Center: Global Cumulative Master Study Timer Mini-Widget */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl p-1 sm:p-1.5 glow-cyan-sm">
          {/* Quick Play/Pause */}
          <button
            onClick={() => {
              if (isTimerRunning) soundEngine.playTimerPause();
              else soundEngine.playTimerStart();
              onToggleTimer();
            }}
            className={`p-2 rounded-xl transition-all ${
              isTimerRunning
                ? 'bg-rose-500/80 hover:bg-rose-500 text-white animate-pulse'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
            }`}
            title={isTimerRunning ? 'Pause Study Timer' : 'Start Study Timer'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Time Readout Trigger to open expanded focus cockpit */}
          <button
            onClick={() => { soundEngine.playClick(); onOpenTimerModal(); }}
            className="flex items-center gap-2 px-2 py-1 text-left hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span className="hidden xs:inline">CUMULATIVE:</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-white tracking-wider">
                {formatTime(totalStudySeconds)}
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 hidden md:inline">
              FOCUS
            </span>
          </button>
        </div>

        {/* Right: Controls & Student Profile Badge */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* D-Day Countdown Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>D-{daysLeft} D-DAY</span>
          </div>

          {/* Backup / Export Button */}
          <button
            onClick={() => { soundEngine.playClick(); onOpenBackup(); }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            title="Backup & Restore Data"
          >
            <HardDriveDownload className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => { soundEngine.playClick(); onToggleSound(); }}
            className={`p-2 rounded-xl border transition-colors ${soundEnabled ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 text-slate-500 bg-slate-900'}`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Student Profile Trigger Button */}
          <button
            onClick={() => { soundEngine.playClick(); onOpenProfile(); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/70 hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-black font-bold text-xs">
              <User className="w-4 h-4 text-slate-950" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate max-w-[110px]">
                {profile.title} {profile.fullName.split(' ')[0]}
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 truncate max-w-[110px]">
                {profile.targetRank || 'AIR < 500'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
