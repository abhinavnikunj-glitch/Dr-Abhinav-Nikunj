import React from 'react';
import { DaySchedule, UserProfile } from '../types';
import { BarChart3, Award, Flame, Target, CheckCircle2, Clock, Zap, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface AnalyticsViewProps {
  days: DaySchedule[];
  totalStudySeconds: number;
  profile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  days,
  totalStudySeconds,
  profile
}) => {
  // Aggregate stats
  const allSlots = days.flatMap(d => d.slots);
  const totalSlotsCount = allSlots.length;
  const completedSlotsCount = allSlots.filter(s => s.isCompleted).length;
  const backlogSlotsCount = allSlots.filter(s => s.isBacklog && !s.isCompleted).length;

  const allItems = allSlots.flatMap(s => s.items);
  const totalItemsCount = allItems.length;
  const completedItemsCount = allItems.filter(i => i.completed).length;

  const slotProgressPercent = totalSlotsCount > 0 ? Math.round((completedSlotsCount / totalSlotsCount) * 100) : 0;
  const itemProgressPercent = totalItemsCount > 0 ? Math.round((completedItemsCount / totalItemsCount) * 100) : 0;
  const totalStudyHours = (totalStudySeconds / 3600).toFixed(1);

  // Subject breakdown
  const subjectGroups = [
    { name: 'CVS & OBGY (Day 1)', dayId: 'day-1', color: 'from-cyan-500 to-blue-500' },
    { name: 'CNS & Pediatrics (Day 2)', dayId: 'day-2', color: 'from-purple-500 to-indigo-500' },
    { name: 'Respi-Renal & Biochem (Day 3)', dayId: 'day-3', color: 'from-emerald-500 to-teal-500' },
    { name: 'Hemat-GI & PSM (Day 4)', dayId: 'day-4', color: 'from-blue-500 to-cyan-500' },
    { name: 'Anatomy Master & Surgery (Day 5)', dayId: 'day-5', color: 'from-rose-500 to-pink-500' },
    { name: 'Day 29 Volatiles & Spotters (Day 6)', dayId: 'day-6', color: 'from-amber-400 to-yellow-500' }
  ];

  return (
    <div className="mx-3 sm:mx-6 space-y-4 pb-28">
      {/* Analytics Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 glow-cyan-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              REVISION TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400">
              Synaptic Retention Metrics & Readiness
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
            NEET PG COCKPIT ANALYTICS
          </h1>
        </div>

        {/* Target Rank Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>TARGET: {profile.targetRank || 'AIR < 500'}</span>
        </div>
      </div>

      {/* Primary KPI Grid (4 Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Study Hours */}
        <div className="p-4 rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 glow-cyan-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">Logged Focus</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono font-extrabold text-2xl sm:text-3xl text-white">
            {totalStudyHours} <span className="text-xs text-cyan-400 font-normal">hrs</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            Daily Goal: {profile.dailyGoalHours}h
          </div>
        </div>

        {/* Slot Completion Rate */}
        <div className="p-4 rounded-3xl bg-[#0a0f1d] border border-emerald-500/30 glow-emerald">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">Slots Finished</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono font-extrabold text-2xl sm:text-3xl text-emerald-400">
            {completedSlotsCount} / {totalSlotsCount}
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {slotProgressPercent}% syllabus covered
          </div>
        </div>

        {/* Sub-Targets Mastery */}
        <div className="p-4 rounded-3xl bg-[#0a0f1d] border border-blue-500/30 glow-blue">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">Sub-Targets</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-mono font-extrabold text-2xl sm:text-3xl text-blue-300">
            {completedItemsCount} / {totalItemsCount}
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {itemProgressPercent}% checklist items cleared
          </div>
        </div>

        {/* Backlog Risk Level */}
        <div className="p-4 rounded-3xl bg-[#0a0f1d] border border-rose-500/30 glow-rose">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">Backlog Deficit</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-mono font-extrabold text-2xl sm:text-3xl text-rose-400">
            {backlogSlotsCount} <span className="text-xs text-rose-300 font-normal">slots</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {backlogSlotsCount === 0 ? 'Optimal velocity' : 'Requires evening mop-up'}
          </div>
        </div>
      </div>

      {/* 6-Day High-Yield Protocol Progress Bars */}
      <div className="p-5 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-4">
        <h2 className="text-sm font-orbitron font-bold text-white tracking-wide flex items-center justify-between">
          <span>6-DAY REVISION ENGINE BREAKDOWN</span>
          <span className="text-xs font-mono text-cyan-400">{slotProgressPercent}% Total Completion</span>
        </h2>

        <div className="space-y-3">
          {subjectGroups.map((grp) => {
            const day = days.find(d => d.id === grp.dayId);
            if (!day) return null;

            const daySlots = day.slots;
            const completed = daySlots.filter(s => s.isCompleted).length;
            const total = daySlots.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={grp.dayId} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">{day.dateLabel} - {grp.name}</span>
                  <span className="text-slate-400 font-bold">{completed}/{total} Slots ({pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full bg-gradient-to-r ${grp.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Neuro-Synaptic Mastery Forecast */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-[#0a0f1d] to-purple-950/30 border border-cyan-500/30 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex-shrink-0">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-orbitron font-bold text-white">
            SYNAPTIC RETENTION PROJECTION: {itemProgressPercent >= 75 ? 'HIGH COMBAT READINESS' : itemProgressPercent >= 40 ? 'STEADY ACCELERATION' : 'CALIBRATING PHASE'}
          </h3>
          <p className="text-xs text-slate-300 font-ui leading-relaxed">
            Targeting <span className="text-cyan-300 font-semibold">{profile.dreamBranch || 'Top Branch'}</span> at <span className="text-amber-300 font-semibold">{profile.targetRank || 'AIR < 500'}</span>. By maintaining 100% adherence to the 24-29 August protocol with Day 29 Volatiles Lock-In, your recall accuracy in exam conditions will be maximized.
          </p>
        </div>
      </div>
    </div>
  );
};
