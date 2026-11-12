import React from 'react';
import { Ruler, Zap } from 'lucide-react';
import { BOX_DIMENSIONS, BUR_COMPATIBILITY_LONG } from '@/utils/brand';

/** Ficha técnica: compatibilidad (alta velocidad) + medidas exactas del fresero. */
export default function ProductSpecs({
  variant = 'full',
}: {
  variant?: 'full' | 'compact';
}) {
  const dims = [
    { label: 'Largo', value: BOX_DIMENSIONS.lengthCm, color: '#00AEEF' },
    { label: 'Alto', value: BOX_DIMENSIONS.heightCm, color: '#E5007D' },
    { label: 'Ancho', value: BOX_DIMENSIONS.widthCm, color: '#8CC63F' },
  ];

  if (variant === 'compact') {
    return (
      <div className="space-y-1.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#F39200] shrink-0" />
          <span>
            Para fresas de <strong className="text-white">alta velocidad</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
          <span>
            {BOX_DIMENSIONS.lengthCm} × {BOX_DIMENSIONS.heightCm} ×{' '}
            {BOX_DIMENSIONS.widthCm} cm{' '}
            <span className="text-slate-500">(largo × alto × ancho)</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-[#0B0D13] border border-white/15 space-y-3">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#F39200]/20 border border-[#F39200] flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-[#F39200]" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-[#F39200]">
            Solo Fresas de Alta Velocidad
          </p>
          <p className="text-[11px] text-slate-400">{BUR_COMPATIBILITY_LONG}</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
          <Ruler className="w-3.5 h-3.5 text-[#00AEEF]" />
          Medidas exactas del fresero
        </p>
        <div className="grid grid-cols-3 gap-2">
          {dims.map((d) => (
            <div
              key={d.label}
              className="rounded-xl bg-[#11141E] border border-white/10 p-2 text-center"
            >
              <p className="text-lg font-black" style={{ color: d.color }}>
                {d.value}
                <span className="text-xs font-bold text-slate-400"> cm</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

