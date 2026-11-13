'use client';

import React from 'react';
import { Sparkles, ClipboardList, Instagram } from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
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
        {/* Official Creative Tools Brand Identity with generous breathing room */}
        <a href="#" className="flex items-center group">
          <CreativeToolsLogo size="md" showTagline={true} theme="light" />
        </a>

        {/* Unified, Spacious Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a
            href="#catalogo"
            className="hover:text-slate-900 transition-colors"
          >
            Catálogo de Diseños
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
