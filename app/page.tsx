import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ReferenceCatalogSection from '@/components/ReferenceCatalogSection';
import LaserCustomizerStudio from '@/components/LaserCustomizerStudio';
import CartDrawer from '@/components/CartDrawer';
import { Cpu, ShieldCheck, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_ORDER_NUMBER } from '@/utils/whatsapp';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ReferenceCatalogSection />
        <ProductCatalog />
        <LaserCustomizerStudio />
      </main>

      <CartDrawer />

      {/* Floating WhatsApp Direct Order Button */}
      <a
        href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(
          'Hola Creative Tools, quiero realizar un pedido de fresero personalizado.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5 fill-zinc-950" />
        <span>Pedidos: {WHATSAPP_DISPLAY_NUMBER}</span>
      </a>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white">
                CREATIVE <span className="text-cyan-400">TOOLS</span>
              </p>
              <p className="text-xs text-slate-400">
                Ingeniería en Freseros Dentales de Aluminio Grado Médico
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Garantía Vitalicia en Grabado Láser Autoclavable
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Directo: {WHATSAPP_DISPLAY_NUMBER}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
