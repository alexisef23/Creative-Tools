'use client';

import React from 'react';
import { Sparkles, ClipboardList, MessageCircle } from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_ORDER_NUMBER,
} from '@/utils/whatsapp';
import { CreativeMolarIcon } from './CreativeBrandLogo';

export default function Navbar() {
  const { orderList, setOrderDrawerOpen } = useCustomizerStore();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0D13]/90 border-b border-white/10">
      {/* Signature Creative Tools 5-Color Spectrum Top Strip */}
      <div className="h-1.5 w-full creative-border-top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official Creative Tools Brand Identity */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-[#11141E] border border-white/15 flex items-center justify-center shadow-laser-neon group-hover:scale-105 transition-transform">
            <CreativeMolarIcon className="w-8 h-8" />
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-black text-xl tracking-wider text-white">
                  CREATIVE
                </span>
                <span className="font-light text-sm tracking-[0.32em] text-slate-200 uppercase">
                  TOOLS
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#00AEEF]">
                Herramientas que Inspiran Precisión
              </p>
            </div>

            <div className="hidden xl:block h-8 w-[1px] bg-white/15 mx-1" />

            <div className="hidden xl:block">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#E5007D]/15 text-[#ff4da6] border border-[#E5007D]/35">
                Custom <span className="text-[#F39200] mx-1">Design</span> Series
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pedidos: {WHATSAPP_DISPLAY_NUMBER}
              </p>
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-200">
          <a
            href="#catalogos-referencia"
            className="hover:text-[#00AEEF] transition-colors"
          >
            Catálogos de Referencia
          </a>
          <a
            href="#catalogo"
            className="hover:text-[#8CC63F] transition-colors"
          >
            Colecciones por Serie
          </a>
          <a
            href="#customizer-studio"
            className="flex items-center gap-1.5 text-[#F39200] hover:text-[#ffaa2b] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#E5007D]" />
            Estudio de Grabado Láser
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(
              'Hola Creative Tools, me gustaría hacer un pedido de un fresero personalizado.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#8CC63F]/15 hover:bg-[#8CC63F]/25 text-[#a8e05f] border border-[#8CC63F]/35 transition"
          >
            <MessageCircle className="w-4 h-4 text-[#8CC63F]" />
            {WHATSAPP_DISPLAY_NUMBER}
          </a>

          <button
            onClick={() => setOrderDrawerOpen(true)}
            aria-label="Abrir mi lista de pedido"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5007D] via-[#009FE3] to-[#8CC63F] p-[1.5px] shadow-laser-neon hover:brightness-110 transition"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-[#0B0D13] text-white font-extrabold text-xs sm:text-sm">
              <ClipboardList className="w-4 h-4 text-[#00AEEF]" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {orderList.length > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#E5007D] text-white font-black">
                  {orderList.length}
                </span>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
