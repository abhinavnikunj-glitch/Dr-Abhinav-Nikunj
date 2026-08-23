import React from 'react';
import { ActiveTab } from '../types';
import { Calendar, BookMarked, AlertOctagon, BarChart3, Eye, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  backlogCount: number;
  vaultNotesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  backlogCount,
  vaultNotesCount
}) => {
  const tabs = [
    {
      id: 'SCHEDULE' as ActiveTab,
      label: 'Schedule',
      sublabel: 'Day Protocol',
      icon: Calendar,
      badge: null
    },
    {
      id: 'VAULT' as ActiveTab,
      label: 'Vault',
      sublabel: 'Volatiles',
      icon: BookMarked,
      badge: vaultNotesCount > 0 ? vaultNotesCount : null,
      badgeColor: 'bg-cyan-500 text-black'
    },
    {
      id: 'BACKLOG' as ActiveTab,
      label: 'Backlog',
      sublabel: 'Emergency',
      icon: AlertOctagon,
      badge: backlogCount > 0 ? backlogCount : null,
      badgeColor: 'bg-rose-500 text-white animate-pulse'
    },
    {
      id: 'SPOTTERS' as ActiveTab,
      label: 'Spotters',
      sublabel: 'Day 29 / 100 Img',
      icon: Eye,
      badge: '100+',
      badgeColor: 'bg-amber-400 text-black'
    },
    {
      id: 'ANALYTICS' as ActiveTab,
      label: 'Analytics',
      sublabel: 'Readiness',
      icon: BarChart3,
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#020617]/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 sm:px-6 py-2 shadow-2xl safe-area-pb">
      <div className="max-w-3xl mx-auto flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 sm:px-4 rounded-2xl transition-all duration-200 select-none group ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 glow-cyan-sm scale-[1.05]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {/* Badge indicator */}
              {tab.badge !== null && (
                <span className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black shadow-md ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              )}

              {/* Icon */}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400 stroke-[2.2]' : 'text-slate-400'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d9ff]" />
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-tight mt-1 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
