'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Award,
  ArrowRight,
  Layers,
  CheckCircle2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Grid,
  Target,
} from 'lucide-react';
import { ANODIZED_COLORS, PRESET_DESIGNS } from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { WHATSAPP_DISPLAY_NUMBER } from '@/utils/whatsapp';
import {
  CreativeDiagonalRibbons,
  CreativeMolarIcon,
} from './CreativeBrandLogo';

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
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10 bg-[#0B0D13]">
      {/* Signature Packaging Diagonal Color Stripes in Top-Right & Bottom-Left Corners */}
      <CreativeDiagonalRibbons
        position="top-right"
        className="absolute -top-10 -right-24 opacity-40 sm:opacity-65"
      />
      <CreativeDiagonalRibbons
        position="bottom-left"
        className="absolute -bottom-12 -left-24 opacity-30 sm:opacity-50"
      />

      {/* Ambient Brand Spectrum Glows */}
      <div className="pointer-events-none absolute -top-36 left-1/4 w-[500px] h-[500px] rounded-full bg-[#009FE3]/15 blur-[135px]" />
      <div className="pointer-events-none absolute top-24 right-12 w-[440px] h-[440px] rounded-full bg-[#E5007D]/15 blur-[135px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-[380px] h-[380px] rounded-full bg-[#8CC63F]/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Official Packaging Typography & Palette */}
          <div className="lg:col-span-7 space-y-6">
            {/* Official Packaging Top Pill */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#11141E] border border-white/15 text-xs font-extrabold tracking-widest uppercase shadow-lg">
              <CreativeMolarIcon className="w-4 h-4" />
              <span className="text-white">CUSTOM</span>
              <span className="text-[#F39200]">DESIGN</span>
              <span className="text-white">SERIES</span>
              <span className="text-white/30">•</span>
              <span className="text-[#00AEEF]">TU ESTILO, TU HERRAMIENTA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]">
              DISPONIBLE EN{' '}
              <span className="text-[#00AEEF]">DISEÑOS</span>{' '}
              <span className="text-[#8CC63F]">PERSONALIZADOS</span>{' '}
              <span className="text-white">Y EDICIONES</span>{' '}
              <span className="bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#00AEEF] bg-clip-text text-transparent">
                ESPECIALES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Freseros de aluminio grado médico resistentes y autoclavables a
              134°C, compatibles con piezas de alta y baja velocidad. Elige tu
              serie favorita o sube tu propia imagen a grabar y envía tu pedido
              directo por WhatsApp al{' '}
              <span className="text-[#8CC63F] font-extrabold">
                {WHATSAPP_DISPLAY_NUMBER}
              </span>
              .
            </p>

            {/* Official Packaging Strip: IDEAL PARA ODONTÓLOGOS, ESTUDIANTES Y LABORATORIOS */}
            <div className="inline-block px-4 py-2 rounded-xl bg-[#11141E] border border-white/15 text-xs sm:text-sm font-black tracking-wider uppercase">
              <span className="text-white">IDEAL PARA </span>
              <span className="text-[#00AEEF]">ODONTÓLOGOS, </span>
              <span className="text-[#E5007D]">ESTUDIANTES </span>
              <span className="text-[#8CC63F]">Y LABORATORIOS</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#customizer-studio"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] text-white font-black text-base shadow-laser-neon hover:scale-[1.02] active:scale-[0.99] transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Crea tu diseño personalizado
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#catalogos-referencia"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl backdrop-blur-md bg-[#11141E] hover:bg-white/10 border border-[#00AEEF]/40 text-white font-bold text-base transition"
              >
                Explorar Catálogo Oficial
              </a>
            </div>

            {/* 4 Official Packaging Feature Badges with Exact Box Colors */}
            <div
              id="especificaciones"
              className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            >
              {/* Badge 1: Cyan - Aluminio Resistente */}
              <div className="p-3.5 rounded-2xl bg-[#11141E]/90 border border-[#009FE3]/35 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#009FE3]/20 border border-[#009FE3] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#00AEEF]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#00AEEF] uppercase tracking-wider">
                    Aluminio Resistente
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Ligero, duradero, fácil de limpiar y 100% esterilizable.
                  </p>
                </div>
              </div>

              {/* Badge 2: Magenta - Diseño Único */}
              <div className="p-3.5 rounded-2xl bg-[#11141E]/90 border border-[#E5007D]/35 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E5007D]/20 border border-[#E5007D] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#ff4da6]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#ff4da6] uppercase tracking-wider">
                    Diseño Único
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Personaliza tu fresero con el diseño que más te represente.
                  </p>
                </div>
              </div>

              {/* Badge 3: Amber/Violet - Organización Profesional */}
              <div className="p-3.5 rounded-2xl bg-[#11141E]/90 border border-[#F39200]/35 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F39200]/20 border border-[#F39200] flex items-center justify-center shrink-0">
                  <Grid className="w-4 h-4 text-[#F39200]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#F39200] uppercase tracking-wider">
                    Organización Profesional
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Mantén tus fresas listas y siempre a la mano en clínica.
                  </p>
                </div>
              </div>

              {/* Badge 4: Lime Green - Protege Tus Fresas */}
              <div className="p-3.5 rounded-2xl bg-[#11141E]/90 border border-[#8CC63F]/35 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#8CC63F]/20 border border-[#8CC63F] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-[#8CC63F]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#8CC63F] uppercase tracking-wider">
                    Protege Tus Fresas
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Ajuste con precisión milimétrica para un agarre perfecto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Packaging-Inspired Showcase Window with Multi-Color Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-[#662483] via-[#E5007D] to-[#009FE3] shadow-2xl">
              <div className="rounded-[22px] bg-[#11141E] p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#00AEEF] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#E5007D]" />
                    Muestra Interactiva • {activeHeroDesign.code}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-[#F39200] border border-[#F39200]/30">
                    {selectedColor.name}
                  </span>
                </div>

                {/* 3D-Styled Metallic Dental Bur Box Illustration */}
                <div
                  className="relative h-72 rounded-2xl overflow-hidden border-2 border-[#00AEEF]/60 p-5 flex flex-col justify-between transition-colors duration-500 shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${selectedColor.highlightHex} 0%, ${selectedColor.hex} 48%, ${selectedColor.secondaryHex} 100%)`,
                  }}
                >
                  {/* Brushed Aluminum Micro-lines Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)',
                    }}
                  />

                  {/* Animated Laser Scanning Beam */}
                  <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent animate-laser-scan z-20" />

                  {/* Top Lid Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
                      SERIE {activeHeroDesign.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8CC63F] bg-black/50 px-2 py-0.5 rounded font-bold">
                      134°C AUTOCLAVE
                    </span>
                  </div>

                  {/* Center Real Catalogo Artwork Preview + Carousel Controls */}
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
                      className="p-2 rounded-xl bg-black/45 hover:bg-[#E5007D] text-white border border-white/20 transition"
                      title="Diseño anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div
                      onClick={handleLoadHeroDesignIntoStudio}
                      className="cursor-pointer flex-1 flex flex-col items-center text-center py-2.5 px-3 rounded-2xl bg-white shadow-xl border-2 border-[#00AEEF]/40 hover:scale-[1.02] transition"
                    >
                      {activeHeroDesign.imageUrl && (
                        <img
                          src={activeHeroDesign.imageUrl}
                          alt={activeHeroDesign.title}
                          className="h-28 w-auto object-contain"
                        />
                      )}
                      <p className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#0B0D13] mt-1">
                        {activeHeroDesign.title}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setHeroIdx((prev) => (prev + 1) % featuredDesigns.length)
                      }
                      className="p-2 rounded-xl bg-black/45 hover:bg-[#009FE3] text-white border border-white/20 transition"
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
                      className="inline-flex items-center gap-1 text-[#F39200] hover:underline font-extrabold"
                    >
                      Abrir en Simulador →
                    </button>
                  </div>
                </div>

                {/* Interactive Quick Color Switcher */}
                <div className="mt-5">
                  <p className="text-xs text-slate-300 mb-2.5 flex items-center justify-between font-medium">
                    <span>Acabado de aluminio anodizado:</span>
                    <span className="text-[#00AEEF] font-bold">
                      Alta y Baja Velocidad
                    </span>
                  </p>
                  <div className="grid grid-cols-6 gap-2.5">
                    {ANODIZED_COLORS.map((color) => {
                      const active = selectedColor.id === color.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          title={color.name}
                          className={`group relative h-10 rounded-xl border transition-all flex items-center justify-center ${
                            active
                              ? 'border-[#00AEEF] scale-105 ring-2 ring-[#E5007D]/60'
                              : 'border-white/15 hover:border-white/40'
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
        </div>

        {/* 3-Step Visual Order Workflow Strip with Official Packaging Colors */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#11141E] border border-[#009FE3]/35 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#009FE3]/20 border border-[#009FE3] flex items-center justify-center font-black text-[#00AEEF] shrink-0">
              01
            </div>
            <div>
              <p className="text-xs font-black text-[#00AEEF] uppercase tracking-wider">
                Elige Serie y Color
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Selecciona entre nuestras series oficiales o sube tu propio
                logotipo/imagen.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#11141E] border border-[#E5007D]/35 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E5007D]/20 border border-[#E5007D] flex items-center justify-center font-black text-[#ff4da6] shrink-0">
              02
            </div>
            <div>
              <p className="text-xs font-black text-[#ff4da6] uppercase tracking-wider">
                Simula el Grabado Láser
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Ajusta tamaño, rotación, acabado láser, tu nombre y tu
                especialidad odontológica.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#11141E] border border-[#8CC63F]/40 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8CC63F]/20 border border-[#8CC63F] flex items-center justify-center text-[#8CC63F] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#8CC63F] uppercase tracking-wider">
                Envía Pedido + Imagen ({WHATSAPP_DISPLAY_NUMBER})
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Tu diseño se copia y descarga automáticamente para enviarlo por
                WhatsApp en un clic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
