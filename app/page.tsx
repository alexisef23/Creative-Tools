import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ReferenceCatalogSection from '@/components/ReferenceCatalogSection';
import LaserCustomizerStudio from '@/components/LaserCustomizerStudio';
import CartDrawer from '@/components/CartDrawer';
import { ShieldCheck, MessageCircle, Globe, Instagram } from 'lucide-react';
import {
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_ORDER_NUMBER,
} from '@/utils/whatsapp';
import { CreativeMolarIcon } from '@/components/CreativeBrandLogo';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D13] relative">
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
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#8CC63F] to-[#009FE3] text-[#0B0D13] font-black text-xs sm:text-sm shadow-2xl hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5 fill-[#0B0D13]" />
        <span>Pedidos: {WHATSAPP_DISPLAY_NUMBER}</span>
      </a>

      {/* Footer matching Official Creative Tools Packaging */}
      <footer className="border-t border-white/10 bg-[#0B0D13]">
        <div className="h-1.5 w-full creative-border-top" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#11141E] border border-white/15 flex items-center justify-center">
              <CreativeMolarIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-black tracking-wider text-white">
                  CREATIVE
                </span>
                <span className="text-xs font-light tracking-[0.28em] text-slate-300 uppercase">
                  TOOLS
                </span>
                <span className="text-xs font-bold text-[#F39200] ml-1">
                  • CUSTOM DESIGN SERIES
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Herramientas que Inspiran Precisión • Freseros y Fresas Dentales
                de Alta Precisión
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-[#E5007D]" />
              @creativetools.mx
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#00AEEF]" />
              www.creativetools.mx
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8CC63F]" />
              Garantía en Grabado Láser Autoclavable
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#8CC63F] hover:underline font-extrabold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: {WHATSAPP_DISPLAY_NUMBER}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
