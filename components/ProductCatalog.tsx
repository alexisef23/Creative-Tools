'use client';

import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  Check,
  Layers,
  Search,
  Eye,
  X,
  BookOpen,
  MessageCircle,
  PlusCircle,
} from 'lucide-react';
import {
  ANODIZED_COLORS,
  CATALOG_PRODUCTS,
  PRESET_DESIGNS,
  SERIES_CATEGORIES,
} from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { ProductItem, SeriesCategory } from '@/types';
import {
  buildSingleOrderWhatsAppUrl,
  WHATSAPP_DISPLAY_NUMBER,
} from '@/utils/whatsapp';

export default function ProductCatalog() {
  const {
    selectedCategory,
    setSelectedCategory,
    extraDiscoveredDesigns,
    loadProductIntoStudio,
    addToOrderList,
  } = useCustomizerStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'anodized' | 'stencil'>('anodized');
  const [lightboxProduct, setLightboxProduct] = useState<ProductItem | null>(
    null
  );

  const allPresets = useMemo(
    () => [...PRESET_DESIGNS, ...extraDiscoveredDesigns],
    [extraDiscoveredDesigns]
  );

  const allProducts: ProductItem[] = useMemo(() => {
    const dynamicProds: ProductItem[] = extraDiscoveredDesigns.map((d) => ({
      id: `prod-${d.id}`,
      code: d.code,
      name: `Fresero ${d.title}`,
      series: d.category,
      defaultColorId: d.recommendedColorId || 'matte-black',
      presetDesignId: d.id,
      imageUrl: d.imageUrl,
      badge: 'Nuevo',
    }));
    return [...CATALOG_PRODUCTS, ...dynamicProds];
  }, [extraDiscoveredDesigns]);

  const filteredProducts = allProducts.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Todos' || item.series === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.series.toLowerCase().includes(q))
    );
  });

  const handleCustomizeProduct = (product: ProductItem) => {
    loadProductIntoStudio(product);
    const studioEl = document.getElementById('customizer-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAddToOrder = (product: ProductItem) => {
    const color =
      ANODIZED_COLORS.find((c) => c.id === product.defaultColorId) ||
      ANODIZED_COLORS[0];
    const preset =
      allPresets.find((p) => p.id === product.presetDesignId) ||
      PRESET_DESIGNS[0];

    addToOrderList({
      title: product.name,
      code: product.code,
      series: product.series,
      color,
      designMode: 'preset',
      presetDesign: preset,
      customText: `CATÁLOGO ${product.code}`,
      previewDataUrl: product.imageUrl || '',
    });
  };

  return (
    <section
      id="catalogo"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4" />
            Catálogo Oficial Creative Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Colecciones & Diseños para Pedido Directo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Explora todos los diseños oficiales por serie. Puedes personalizar
            el color del aluminio anodizado y tu nombre en el Estudio Láser o
            solicitar tu pedido directamente por WhatsApp al{' '}
            <span className="text-emerald-400 font-semibold">
              {WHATSAPP_DISPLAY_NUMBER}
            </span>
            .
          </p>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ej. Ferrari, Gojo, Messi, RAC-01..."
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('anodized')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                viewMode === 'anodized'
                  ? 'bg-cyan-400 text-zinc-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Vista Fresero
            </button>
            <button
              type="button"
              onClick={() => setViewMode('stencil')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'stencil'
                  ? 'bg-cyan-400 text-zinc-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Lámina Original
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (10 Series + Todos) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {SERIES_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 font-bold shadow-laser-neon'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const boxColor =
            ANODIZED_COLORS.find((c) => c.id === product.defaultColorId) ||
            ANODIZED_COLORS[0];
          const preset =
            allPresets.find((p) => p.id === product.presetDesignId) ||
            PRESET_DESIGNS[0];

          const directWaUrl = buildSingleOrderWhatsAppUrl({
            color: boxColor,
            designMode: 'preset',
            presetDesign: preset,
            customText: '',
          });

          return (
            <article
              key={product.id}
              className="group rounded-2xl backdrop-blur-md bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
            >
              {/* Card Visual Header */}
              <div
                className="relative h-56 p-4 flex flex-col justify-between border-b border-white/10 overflow-hidden"
                style={
                  viewMode === 'anodized'
                    ? {
                        background: `linear-gradient(135deg, ${boxColor.highlightHex} 0%, ${boxColor.hex} 55%, ${boxColor.secondaryHex} 100%)`,
                      }
                    : {
                        background: '#f8fafc',
                      }
                }
              >
                {viewMode === 'anodized' && (
                  <div className="pointer-events-none absolute inset-0 bg-aluminum-sheen opacity-60" />
                )}

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-950/80 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                    Serie {product.series}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-zinc-950/80 text-white border border-white/15">
                      {product.code}
                    </span>
                    {product.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxProduct(product)}
                        title="Ampliar lámina de diseño"
                        className="p-1.5 rounded-lg bg-zinc-950/75 hover:bg-zinc-900 text-white border border-white/20 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Center Artwork */}
                <div className="relative z-10 my-auto flex items-center justify-center py-1">
                  {product.imageUrl ? (
                    viewMode === 'anodized' ? (
                      <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-white/95 p-2 shadow-lg border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          loading="lazy"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="w-56 h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )
                  ) : (
                    preset.svgPaths && (
                      <svg
                        viewBox={preset.viewBox || '0 0 240 140'}
                        className="w-44 h-24 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]"
                      >
                        {preset.svgPaths.map((d, i) => (
                          <path
                            key={i}
                            d={d}
                            fill="none"
                            stroke={
                              viewMode === 'anodized'
                                ? boxColor.laserTint
                                : '#09090b'
                            }
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        ))}
                      </svg>
                    )
                  )}
                </div>

                <div
                  className={`relative z-10 flex items-center justify-between text-[11px] font-mono ${
                    viewMode === 'anodized'
                      ? 'text-white/90'
                      : 'text-zinc-900 font-bold'
                  }`}
                >
                  <span>Aluminio Grado Médico</span>
                  <span>{boxColor.name}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {preset.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Aluminio Anodizado • Autoclavable 134°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>
                        Código de Referencia:{' '}
                        <strong className="text-white">{product.code}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCustomizeProduct(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 text-xs font-bold transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Personalizar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAddToOrder(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                      Sumar al Pedido
                    </button>
                  </div>

                  <a
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Pedir Directo por WhatsApp ({product.code})
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox Modal for Reference Catalog Sheet */}
      {lightboxProduct && (
        <div
          onClick={() => setLightboxProduct(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-3xl bg-zinc-950 border border-white/15 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Lámina Oficial de Referencia • {lightboxProduct.series} (
                  {lightboxProduct.code})
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {lightboxProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProduct(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {lightboxProduct.imageUrl && (
              <div className="rounded-2xl bg-white p-6 flex items-center justify-center max-h-[60vh] overflow-hidden">
                <img
                  src={lightboxProduct.imageUrl}
                  alt={lightboxProduct.name}
                  className="max-h-[52vh] w-auto object-contain"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const prod = lightboxProduct;
                  setLightboxProduct(null);
                  handleCustomizeProduct(prod);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-laser-neon"
              >
                <Sparkles className="w-4 h-4" />
                Personalizar este Diseño en el Estudio Láser
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
