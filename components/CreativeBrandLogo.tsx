'use client';

import React, { useId } from 'react';

interface CreativeMolarIconProps {
  className?: string;
}

export function CreativeMolarIcon({ className = 'w-9 h-9' }: CreativeMolarIconProps) {
  const gradId = useId();

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00AEEF" />
          <stop offset="28%" stopColor="#8CC63F" />
          <stop offset="55%" stopColor="#F39200" />
          <stop offset="80%" stopColor="#E5007D" />
          <stop offset="100%" stopColor="#662483" />
        </linearGradient>
      </defs>
      {/* Stylized Molar Crown & Roots matching the Creative Tools packaging icon */}
      <path
        d="M20 10C12.5 10 8 16.5 8 24.5C8 31.5 11.5 36.5 13.5 43.5C15 49 16.5 55 20.5 55C24 55 25.5 47 28.5 42.5C30 40.2 34 40.2 35.5 42.5C38.5 47 40 55 43.5 55C47.5 55 49 49 50.5 43.5C52.5 36.5 56 31.5 56 24.5C56 16.5 51.5 10 44 10C39 10 35.5 13.5 32 13.5C28.5 13.5 25 10 20 10Z"
        stroke={`url(#${gradId})`}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 21C26 24.5 38 24.5 42 21"
        stroke={`url(#${gradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CreativeToolsLogo({
  size = 'md',
  showTagline = true,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}) {
  const box = { sm: 'w-9 h-9 rounded-xl', md: 'w-12 h-12 rounded-2xl', lg: 'w-16 h-16 rounded-2xl' }[size];
  const icon = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-11 h-11' }[size];
  const word = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }[size];
  const sub = { sm: 'text-[10px]', md: 'text-sm', lg: 'text-base' }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${box} bg-[#11141E] border border-white/15 flex items-center justify-center shadow-laser-neon shrink-0`}
      >
        <CreativeMolarIcon className={icon} />
      </div>
      <div className="leading-tight">
        <div className="flex items-baseline gap-2">
          <span className={`font-black tracking-wider text-white ${word}`}>
            CREATIVE
          </span>
          <span
            className={`font-light tracking-[0.32em] text-slate-200 uppercase ${sub}`}
          >
            TOOLS
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#00AEEF]">
            Herramientas que Inspiran Precisión
          </p>
        )}
      </div>
    </div>
  );
}

export function CreativeDiagonalRibbons({
  position = 'top-right',
  className = '',
}: {
  position?: 'top-right' | 'bottom-left';
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex flex-col gap-1.5 transform ${
          position === 'top-right' ? 'rotate-[32deg]' : '-rotate-[32deg]'
        }`}
      >
        <div className="h-3 w-64 rounded-full bg-[#662483] opacity-90" />
        <div className="h-3.5 w-72 rounded-full bg-[#E5007D] opacity-95" />
        <div className="h-3.5 w-72 rounded-full bg-[#009FE3] opacity-95" />
        <div className="h-3 w-64 rounded-full bg-[#8CC63F] opacity-90" />
      </div>
    </div>
  );
}

export default CreativeToolsLogo;


