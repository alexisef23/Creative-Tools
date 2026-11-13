'use client';

import React from 'react';
import { Sparkles, ClipboardList, Instagram } from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
} from '@/utils/brand';
import CreativeToolsLogo from './CreativeBrandLogo';

export default function Navbar() {
  const { orderList, setOrderDrawerOpen } = useCustomizerStore();
  const totalPieces = orderList.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-slate-200/90 shadow-sm transition-colors">
      {/* Signature Creative Tools 5-Color Subtle Top Strip */}
      <div className="h-1 w-full creative-border-top opacity-85" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official Creative Tools Brand Identity */}
        <a href="#" className="flex items-center gap-3.5 group">
          <CreativeToolsLogo size="md" showTagline={true} theme="light" />

          <div className="hidden xl:block h-8 w-[1px] bg-slate-200 mx-2" />

          <div className="hidden xl:block">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              Custom <span className="text-[#00AEEF] mx-1">Design</span> Series
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Alta Velocidad • {BOX_DIMENSIONS_STR}
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a
            href="#catalogos-referencia"
            className="hover:text-slate-900 transition-colors"
          >
            Catálogos de Referencia
          </a>
          <a
            href="#catalogo"
            className="hover:text-slate-900 transition-colors"
          >
            Colecciones por Serie
          </a>
          <a
            href="#customizer-studio"
            className="flex items-center gap-1.5 text-slate-800 hover:text-[#00AEEF] transition-colors font-bold"
          >
            <Sparkles className="w-4 h-4 text-[#E5007D]" />
            Estudio de Grabado Láser
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver Página de Instagram"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/90 text-slate-700 border border-slate-200 transition shadow-sm"
          >
            <Instagram className="w-4 h-4 text-[#E5007D]" />
            <span>Ver Página de Instagram</span>
          </a>

          <button
            onClick={() => setOrderDrawerOpen(true)}
            aria-label="Abrir mi lista de pedido"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
          >
            <ClipboardList className="w-4 h-4 text-[#00AEEF]" />
            <span>Mi Pedido</span>
            {totalPieces > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-[#E5007D] text-white font-black shadow-sm">
                {totalPieces}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
