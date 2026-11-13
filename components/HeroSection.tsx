'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Award,
  ArrowRight,
  Layers,
  CheckCircle2,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Grid,
  Target,
  Truck,
} from 'lucide-react';
import { ANODIZED_COLORS, PRESET_DESIGNS } from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
} from '@/utils/brand';
import { CreativeMolarIcon } from './CreativeBrandLogo';

const HERO_FEATURED_IDS = [
  'racing-ferrari-f1',
  'heroes-ironman-landing',
  'anime-shenlong-dbz',
  'dental-humor-supreme-judge',
  'scifi-millennium-falcon',
  'animals-crowned-lion',
  'retro-nes-controller',
  'arch-tokyo-torii-skyline',
];

export default function HeroSection() {
  const { selectedColor, setSelectedColor, setSelectedPreset } =
    useCustomizerStore();

  const featuredDesigns = PRESET_DESIGNS.filter((d) =>
    HERO_FEATURED_IDS.includes(d.id)
  );
  const [heroIdx, setHeroIdx] = useState(0);
  const activeHeroDesign = featuredDesigns[heroIdx] || PRESET_DESIGNS[0];

  const handleLoadHeroDesignIntoStudio = () => {
    setSelectedPreset(activeHeroDesign);
    const el = document.getElementById('customizer-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 bg-[#FAFCFF]">
      {/* Subtle Soft Background Gradient Accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-[130px]" />
      <div className="pointer-events-none absolute top-24 right-12 w-[440px] h-[440px] rounded-full bg-rose-100/40 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Badges in Clean Medical Style */}
          <div className="lg:col-span-7 space-y-6">
            {/* Packaging Top Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold tracking-wider uppercase shadow-sm">
              <CreativeMolarIcon className="w-4 h-4" />
              <span className="text-slate-900 font-extrabold">CUSTOM</span>
              <span className="text-[#00AEEF] font-extrabold">DESIGN</span>
              <span className="text-slate-900 font-extrabold">SERIES</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-semibold text-[11px]">
                TU ESTILO, TU HERRAMIENTA
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]">
              DISPONIBLE EN{' '}
              <span className="text-[#00AEEF]">DISEÑOS</span>{' '}
              <span className="text-[#059669]">PERSONALIZADOS</span>{' '}
              <span>Y EDICIONES</span>{' '}
              <span className="bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] bg-clip-text text-transparent">
                ESPECIALES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Freseros de aluminio grado médico resistentes y autoclavables a
              134°C, diseñados exclusivamente para{' '}
              <strong className="text-slate-900 font-extrabold">
                fresas de alta velocidad
              </strong>
              . Medidas exactas de{' '}
              <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {BOX_DIMENSIONS_STR}
              </span>
              . Elige tu serie favorita o personaliza tu diseño y contáctanos por
              Instagram en{' '}
              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5007D] hover:underline font-extrabold inline-flex items-center gap-1"
              >
                <Instagram className="w-4 h-4 inline" />
                {OFFICIAL_INSTAGRAM_HANDLE}
              </a>
              .
            </p>

            {/* Target Audience Strip */}
            <div className="inline-block px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-700">
              IDEAL PARA{' '}
              <span className="text-[#00AEEF]">ODONTÓLOGOS,</span>{' '}
              <span className="text-[#E5007D]">ESTUDIANTES</span> Y{' '}
              <span className="text-[#059669]">LABORATORIOS</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#customizer-studio"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-5 h-5 text-[#00AEEF]" />
                Crea tu diseño personalizado
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#catalogos-referencia"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base shadow-sm transition"
              >
                Explorar Catálogo Oficial
              </a>
            </div>

            {/* 4 Feature Badges in Clean White Cards */}
            <div
              id="especificaciones"
              className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#00AEEF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Aluminio Grado Médico
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ligero, resistente, fácil de limpiar y 100% autoclavable a 134°C.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#E5007D]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Grabado Láser Permanente
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No se borra con autoclave ni agentes desinfectantes.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Grid className="w-4 h-4 text-[#F39200]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Organización Quirúrgica
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mantén tus fresas de alta velocidad seguras y ordenadas.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-[#059669]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Ajuste Milimétrico
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dimensiones exactas: 7.3 cm largo × 2.8 cm alto × 2.5 cm ancho.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Contrast Showcase Stage for the Metallic Bur Box */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#E5007D]" />
                  Simulador • {activeHeroDesign.code}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-amber-300 border border-white/10">
                  {selectedColor.name}
                </span>
              </div>

              {/* 3D Metallic Dental Bur Box */}
              <div
                className="relative h-72 rounded-2xl overflow-hidden border border-white/20 p-5 flex flex-col justify-between shadow-inner"
                style={{
                  background: `linear-gradient(135deg, ${selectedColor.highlightHex} 0%, ${selectedColor.hex} 48%, ${selectedColor.secondaryHex} 100%)`,
                }}
              >
                {/* Brushed Aluminum Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)',
                  }}
                />

                {/* Top Lid Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
                    SERIE {activeHeroDesign.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-black/60 px-2 py-0.5 rounded font-bold">
                    134°C AUTOCLAVE
                  </span>
                </div>

                {/* Center Real Artwork Preview + Carousel Controls */}
                <div className="relative z-10 my-auto flex items-center justify-between gap-2 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setHeroIdx(
                        (prev) =>
                          (prev - 1 + featuredDesigns.length) %
                          featuredDesigns.length
                      )
                    }
                    className="p-2 rounded-xl bg-black/50 hover:bg-[#E5007D] text-white border border-white/20 transition"
                    title="Diseño anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div
                    onClick={handleLoadHeroDesignIntoStudio}
                    className="cursor-pointer flex-1 flex flex-col items-center text-center py-2.5 px-3 rounded-2xl bg-white shadow-xl border border-white/30 hover:scale-[1.02] transition"
                  >
                    {activeHeroDesign.imageUrl && (
                      <img
                        src={activeHeroDesign.imageUrl}
                        alt={activeHeroDesign.title}
                        className="h-28 w-auto object-contain"
                      />
                    )}
                    <p className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-slate-900 mt-1">
                      {activeHeroDesign.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setHeroIdx((prev) => (prev + 1) % featuredDesigns.length)
                    }
                    className="p-2 rounded-xl bg-black/50 hover:bg-[#009FE3] text-white border border-white/20 transition"
                    title="Siguiente diseño"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Ruler Markings */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/90">
                  <span>0mm ─── 10mm ─── 20mm ─── 30mm</span>
                  <button
                    type="button"
                    onClick={handleLoadHeroDesignIntoStudio}
                    className="inline-flex items-center gap-1 text-amber-300 hover:underline font-extrabold"
                  >
                    Abrir en Simulador →
                  </button>
                </div>
              </div>

              {/* Quick Color Switcher */}
              <div className="mt-5">
                <p className="text-xs text-slate-300 mb-2.5 flex items-center justify-between font-medium">
                  <span>Color de aluminio anodizado:</span>
                  <span className="text-cyan-400 font-bold">
                    Solo Alta Velocidad • {BOX_DIMENSIONS_STR}
                  </span>
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {ANODIZED_COLORS.map((color) => {
                    const active = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        className={`group relative h-9 rounded-xl border transition-all flex items-center justify-center ${
                          active
                            ? 'border-white scale-105 ring-2 ring-cyan-400'
                            : 'border-white/20 hover:border-white/50'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${color.highlightHex}, ${color.hex})`,
                        }}
                      >
                        {active && (
                          <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Visual Order Workflow Strip in Clean White Cards */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center font-black text-[#00AEEF] shrink-0">
              01
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Elige Serie y Color
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Alta velocidad (7.3 × 2.8 × 2.5 cm). Elige tu color anodizado y
                diseño o sube tu logo.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-black text-[#E5007D] shrink-0">
              02
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Simula el Grabado Láser
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Ajusta tamaño, posición, acabado metálico, tu nombre y tu
                especialidad odontológica en tiempo real.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#059669] shrink-0 font-black">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Envío FedEx $150 o GRATIS (&gt;2 pzs)
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Envío nacional FedEx y entrega local en Chihuahua. Contacto
                oficial por Instagram @creative.tools.mx.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
