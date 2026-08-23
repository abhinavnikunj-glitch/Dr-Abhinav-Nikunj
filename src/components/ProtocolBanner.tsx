import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Sun, Utensils, Activity, Moon, BookOpen } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface ProtocolBannerProps {
  summary: string;
  isGoldenDay?: boolean;
}

export const ProtocolBanner: React.FC<ProtocolBannerProps> = ({
  summary,
  isGoldenDay = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const protocolSteps = [
    { time: '07:30 AM', title: 'Wake & Hydrate', icon: Sun, color: 'text-amber-400', desc: 'Serene morning wake-up, light stretching, zero social media' },
    { time: '08:30 AM – 12:30 PM', title: 'SLOT 1: Peak Efficiency', icon: BookOpen, color: 'text-cyan-400', desc: 'Core High-Yield Subject Notes + 50 Bookmarked MCQs' },
    { time: '12:30 PM – 01:15 PM', title: 'Lunch & Dissociation', icon: Utensils, color: 'text-emerald-400', desc: 'Nutritious meal, step away from study desk, cognitive reset' },
    { time: '01:15 PM – 05:15 PM', title: 'SLOT 2: High Yield Core', icon: BookOpen, color: 'text-blue-400', desc: 'Second Subject Notes + 50 Bookmarked MCQs' },
    { time: '05:15 PM – 06:00 PM', title: 'Physical Jog / Walk (45m)', icon: Activity, color: 'text-rose-400', desc: 'Cardiovascular release, fresh air, cerebral blood flow boost' },
    { time: '06:00 PM – 11:00 PM', title: 'SLOT 3: Passive Study & PYQs', icon: Moon, color: 'text-purple-400', desc: 'Low-friction review, Chhoti copy, rapid flashcards, weak areas sweep' },
    { time: '11:00 PM', title: 'Sleep & Synaptic Consolidation', icon: Moon, color: 'text-indigo-400', desc: 'Total blackout, deep restorative sleep for memory encoding' }
  ];

  return (
    <div className={`mx-3 sm:mx-6 my-2 rounded-2xl border p-3.5 sm:p-4 transition-all ${
      isGoldenDay
        ? 'bg-gradient-to-r from-amber-950/40 via-slate-950/80 to-yellow-950/30 border-amber-500/30'
        : 'bg-[#0a0f1d]/80 border-slate-800/90'
    }`}>
      {/* Header bar */}
      <div 
        onClick={() => {
          soundEngine.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${isGoldenDay ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40' : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'}`}>
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-white tracking-wide flex items-center gap-2">
              CIRCADIAN PROTOCOL FLOW
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                isGoldenDay ? 'bg-amber-400/15 text-amber-300' : 'bg-cyan-400/15 text-cyan-300'
              }`}>
                Optimal Neuro-Efficiency
              </span>
            </span>
            <p className="text-[11px] text-slate-400 font-ui line-clamp-1 mt-0.5">
              {summary}
            </p>
          </div>
        </div>

        <button className="p-1 rounded-lg text-slate-400 hover:text-white">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Step-by-Step Flow */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-in fade-in duration-150">
          {protocolSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400">{step.time}</span>
                  <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                </div>
                <div className="text-xs font-bold text-white mb-0.5">{step.title}</div>
                <div className="text-[10px] text-slate-400 font-ui leading-tight">{step.desc}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
