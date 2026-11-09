'use client';

import React from 'react';
import { Sparkles, ClipboardList, MessageCircle, Cpu } from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_ORDER_NUMBER } from '@/utils/whatsapp';

export default function Navbar() {
  const { orderList, setOrderDrawerOpen } = useCustomizerStore();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-[1px] shadow-laser-neon">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center group-hover:bg-zinc-900 transition">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                CREATIVE <span className="text-cyan-400">TOOLS</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Dental Laser Lab
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Freseros de Aluminio Grado Médico • Pedidos: {WHATSAPP_DISPLAY_NUMBER}
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#catalogos-referencia"
            className="hover:text-cyan-400 transition-colors"
          >
            Catálogos de Referencia
          </a>
          <a
            href="#catalogo"
            className="hover:text-cyan-400 transition-colors"
          >
            Colecciones por Serie
          </a>
          <a
            href="#customizer-studio"
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
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
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition"
          >
            <MessageCircle className="w-4 h-4" />
            {WHATSAPP_DISPLAY_NUMBER}
          </a>

          <button
            onClick={() => setOrderDrawerOpen(true)}
            aria-label="Abrir mi lista de pedido"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-bold text-sm shadow-laser-neon hover:brightness-110 transition"
          >
            <ClipboardList className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Mi Pedido</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-950 text-cyan-300 font-extrabold">
              {orderList.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
