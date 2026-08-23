import React from 'react';

interface DendritesLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const DendritesLogo: React.FC<DendritesLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { box: 32, font: 'text-xs', subFont: 'text-[9px]' },
    md: { box: 44, font: 'text-base', subFont: 'text-[10px]' },
    lg: { box: 64, font: 'text-xl', subFont: 'text-xs' },
    xl: { box: 96, font: 'text-3xl', subFont: 'text-sm' }
  };

  const { box, font, subFont } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bioluminescent Neural Tree Icon */}
      <div 
        style={{ width: box, height: box }}
        className="relative flex-shrink-0 flex items-center justify-center rounded-full bg-slate-950/80 border border-cyan-400/40 p-1 glow-cyan-sm overflow-hidden"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-cyan-400 animate-dendrite-pulse"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring with soft neon glow */}
          <circle
            cx="100"
            cy="100"
            r="92"
            stroke="url(#cyanGlowGrad)"
            strokeWidth="3.5"
            strokeDasharray="2 0"
            className="opacity-95"
          />

          {/* Root axon fibers at bottom */}
          <g stroke="url(#cyanLineGrad)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M100 135 C100 150 85 165 72 180" />
            <path d="M100 135 C95 155 80 170 82 188" />
            <path d="M100 135 C100 158 95 175 92 192" />
            <path d="M100 135 C100 158 105 175 108 192" />
            <path d="M100 135 C105 155 120 170 118 188" />
            <path d="M100 135 C100 150 115 165 128 180" />
            <path d="M85 160 C70 162 55 170 48 178" />
            <path d="M115 160 C130 162 145 170 152 178" />
          </g>

          {/* Root Synaptic Terminals */}
          <g fill="#00d9ff">
            <circle cx="72" cy="180" r="3.5" filter="url(#glowFilter)" />
            <circle cx="82" cy="188" r="3.5" filter="url(#glowFilter)" />
            <circle cx="92" cy="192" r="3.5" filter="url(#glowFilter)" />
            <circle cx="108" cy="192" r="3.5" filter="url(#glowFilter)" />
            <circle cx="118" cy="188" r="3.5" filter="url(#glowFilter)" />
            <circle cx="128" cy="180" r="3.5" filter="url(#glowFilter)" />
            <circle cx="48" cy="178" r="3" filter="url(#glowFilter)" />
            <circle cx="152" cy="178" r="3" filter="url(#glowFilter)" />
          </g>

          {/* Central Soma (Neuron cell body) */}
          <path
            d="M94 132 C92 120 95 105 100 95 C105 105 108 120 106 132 Z"
            fill="url(#somaGrad)"
            stroke="#00d9ff"
            strokeWidth="2"
          />
          <circle cx="100" cy="115" r="7" fill="#00d9ff" filter="url(#glowFilter)" />
          <circle cx="100" cy="115" r="3.5" fill="#ffffff" />

          {/* Dendritic Arbor (Crown branches) */}
          <g stroke="url(#cyanLineGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Primary Trunk */}
            <path d="M100 95 C88 85 70 85 58 75 C45 65 38 48 35 32" />
            <path d="M70 85 C62 70 50 62 42 45" />
            <path d="M58 75 C52 70 42 75 30 70" />
            <path d="M75 75 C72 58 68 45 62 30" />
            <path d="M85 82 C82 62 78 48 80 25" />

            {/* Center Trunk */}
            <path d="M100 95 C100 75 98 55 95 22" />
            <path d="M100 95 C100 75 102 55 105 22" />
            <path d="M98 60 C90 48 88 38 88 20" />
            <path d="M102 60 C110 48 112 38 112 20" />

            {/* Right Primary Trunk */}
            <path d="M100 95 C112 85 130 85 142 75 C155 65 162 48 165 32" />
            <path d="M130 85 C138 70 150 62 158 45" />
            <path d="M142 75 C148 70 158 75 170 70" />
            <path d="M125 75 C128 58 132 45 138 30" />
            <path d="M115 82 C118 62 122 48 120 25" />

            {/* Micro Branchlets */}
            <path d="M35 32 C30 25 24 22 18 25" />
            <path d="M35 32 C38 24 45 18 52 18" />
            <path d="M165 32 C170 25 176 22 182 25" />
            <path d="M165 32 C162 24 155 18 148 18" />
            <path d="M42 45 C35 42 28 46 22 45" />
            <path d="M158 45 C165 42 172 46 178 45" />
            <path d="M30 70 C24 72 18 78 14 85" />
            <path d="M170 70 C176 72 182 78 186 85" />
          </g>

          {/* Synaptic Spines & Nodes (Glowing Cyan Beads) */}
          <g fill="#00f0ff">
            <circle cx="35" cy="32" r="3.5" filter="url(#glowFilter)" />
            <circle cx="18" cy="25" r="3" filter="url(#glowFilter)" />
            <circle cx="52" cy="18" r="3" filter="url(#glowFilter)" />
            <circle cx="165" cy="32" r="3.5" filter="url(#glowFilter)" />
            <circle cx="182" cy="25" r="3" filter="url(#glowFilter)" />
            <circle cx="148" cy="18" r="3" filter="url(#glowFilter)" />
            <circle cx="42" cy="45" r="3" filter="url(#glowFilter)" />
            <circle cx="158" cy="45" r="3" filter="url(#glowFilter)" />
            <circle cx="22" cy="45" r="2.8" filter="url(#glowFilter)" />
            <circle cx="178" cy="45" r="2.8" filter="url(#glowFilter)" />
            <circle cx="30" cy="70" r="3" filter="url(#glowFilter)" />
            <circle cx="170" cy="70" r="3" filter="url(#glowFilter)" />
            <circle cx="14" cy="85" r="3" filter="url(#glowFilter)" />
            <circle cx="186" cy="85" r="3" filter="url(#glowFilter)" />
            <circle cx="62" cy="30" r="3" filter="url(#glowFilter)" />
            <circle cx="138" cy="30" r="3" filter="url(#glowFilter)" />
            <circle cx="80" cy="25" r="3" filter="url(#glowFilter)" />
            <circle cx="120" cy="25" r="3" filter="url(#glowFilter)" />
            <circle cx="95" cy="22" r="3.5" filter="url(#glowFilter)" />
            <circle cx="105" cy="22" r="3.5" filter="url(#glowFilter)" />
            <circle cx="88" cy="20" r="3" filter="url(#glowFilter)" />
            <circle cx="112" cy="20" r="3" filter="url(#glowFilter)" />
          </g>

          {/* Gradients and Filters */}
          <defs>
            <linearGradient id="cyanGlowGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00d9ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="cyanLineGrad" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            <radialGradient id="somaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </radialGradient>

            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-orbitron font-extrabold tracking-wider text-white ${font} drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]`}>
            DENDRITES
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 text-cyan-300/80 font-mono tracking-widest uppercase">
            <span className="w-2.5 h-[1px] bg-cyan-500/50"></span>
            <span className={subFont}>CONNECTING LEARNING</span>
            <span className="w-2.5 h-[1px] bg-cyan-500/50"></span>
          </div>
        )}
      </div>
    </div>
  );
};
