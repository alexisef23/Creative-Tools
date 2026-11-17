'use client';

import React from 'react';

interface CreativeMolarIconProps {
  className?: string;
}

export function CreativeMolarIcon({
  className = 'w-9 h-9',
}: CreativeMolarIconProps) {
  return (
    <img
      src="/brand/logo-icon.jpg"
      alt="Creative Tools Icon"
      className={`${className} object-contain rounded-md mix-blend-multiply select-none`}
    />
  );
}

export function CreativeToolsLogo({
  size = 'md',
  showTagline = false,
  theme = 'light',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}) {
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
  }[size];

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex flex-col justify-center ${className}`}>
      {isDark ? (
        <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-black border border-white/10 shadow-sm">
          <img
            src="/brand/logo-dark.jpg"
            alt="Creative Tools"
            className={`${heightClass} w-auto object-contain select-none`}
          />
        </div>
      ) : (
        <img
          src="/brand/logo-light.jpg"
          alt="Creative Tools"
          className={`${heightClass} w-auto object-contain mix-blend-multiply select-none`}
        />
      )}

      {showTagline && (
        <p
          className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${
            isDark ? 'text-[#00AEEF] pl-1' : 'text-slate-500 pl-1'
          }`}
        >
          Herramientas que Inspiran Precisión
        </p>
      )}
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
