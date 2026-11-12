import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ReferenceCatalogSection from '@/components/ReferenceCatalogSection';
import LaserCustomizerStudio from '@/components/LaserCustomizerStudio';
import CartDrawer from '@/components/CartDrawer';
import { ShieldCheck, Truck, Instagram, Ruler, Zap } from 'lucide-react';
import CreativeToolsLogo, {
  CreativeMolarIcon,
} from '@/components/CreativeBrandLogo';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
} from '@/utils/brand';

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

      {/* Floating Official Instagram Support Pill */}
      <a
        href={OFFICIAL_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Perfil Oficial de Instagram"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] text-white font-extrabold text-xs sm:text-sm shadow-laser-neon hover:scale-105 active:scale-95 transition-all"
      >
        <Instagram className="w-5 h-5 text-white" />
        <span className="drop-shadow">{OFFICIAL_INSTAGRAM_HANDLE}</span>
      </a>

      {/* Footer matching Official Creative Tools Packaging & Logistics */}
      <footer className="border-t border-white/10 bg-[#0B0D13]">
        <div className="h-1.5 w-full creative-border-top" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <CreativeToolsLogo size="md" showTagline={true} />

            {/* Logistics & Product Specs Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-[#F39200]" />
                Solo Fresas de Alta Velocidad
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Ruler className="w-4 h-4 text-[#00AEEF]" />
                Medidas: {BOX_DIMENSIONS_STR}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Truck className="w-4 h-4 text-[#8CC63F]" />
                FedEx $150 MXN (GRATIS &gt; 2 pzs) • Chihuahua Local
              </span>
              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E5007D]/15 border border-[#E5007D]/35 text-[#ff66b5] hover:text-white hover:bg-[#E5007D] transition font-bold"
              >
                <Instagram className="w-4 h-4" />
                {OFFICIAL_INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Creative Tools. Herramientas que
              Inspiran Precisión. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#8CC63F]" />
                Aluminio Grado Médico Autoclavable a 134°C
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
