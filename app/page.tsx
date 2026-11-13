import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCatalog from '@/components/ProductCatalog';
import ReferenceCatalogSection from '@/components/ReferenceCatalogSection';
import LaserCustomizerStudio from '@/components/LaserCustomizerStudio';
import CartDrawer from '@/components/CartDrawer';
import { ShieldCheck, Truck, Instagram, Ruler, Zap } from 'lucide-react';
import CreativeToolsLogo from '@/components/CreativeBrandLogo';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
} from '@/utils/brand';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 relative">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ReferenceCatalogSection />
        <ProductCatalog />
        <LaserCustomizerStudio />
      </main>

      <CartDrawer />

      {/* Floating Official Instagram Pill */}
      <a
        href={OFFICIAL_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver Página de Instagram"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-xl border border-slate-700 hover:scale-105 active:scale-95 transition-all"
      >
        <Instagram className="w-5 h-5 text-[#E5007D]" />
        <span>Ver Página de Instagram</span>
      </a>

      {/* Footer in Elegant Deep Slate Contrast */}
      <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
        <div className="h-1 w-full creative-border-top opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <CreativeToolsLogo size="md" showTagline={true} theme="dark" />

            {/* Logistics & Product Specs Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Zap className="w-4 h-4 text-amber-400" />
                Solo Fresas de Alta Velocidad
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Ruler className="w-4 h-4 text-sky-400" />
                {BOX_DIMENSIONS_STR}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Truck className="w-4 h-4 text-emerald-400" />
                FedEx $150 MXN (GRATIS &gt; 2 pzs) • Chihuahua Local
              </span>
              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition font-bold"
              >
                <Instagram className="w-4 h-4 text-[#E5007D]" />
                Ver Página de Instagram
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Creative Tools. Herramientas que
              Inspiran Precisión. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Aluminio Grado Médico Autoclavable a 134°C
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
