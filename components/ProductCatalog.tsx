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
  Instagram,
  PlusCircle,
  Ruler,
  Zap,
  ClipboardList,
} from 'lucide-react';
import {
  ANODIZED_COLORS,
  CATALOG_PRODUCTS,
  PRESET_DESIGNS,
  SERIES_CATEGORIES,
} from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { ProductItem } from '@/types';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
  BUR_COMPATIBILITY_SHORT,
} from '@/utils/brand';

export default function ProductCatalog() {
  const {
    selectedCategory,
    setSelectedCategory,
    extraDiscoveredDesigns,
    loadProductIntoStudio,
    addToOrderList,
    setOrderDrawerOpen,
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
          <div className="inline-flex items-center gap-2 text-[#00AEEF] text-xs font-black uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4 text-[#E5007D]" />
            Catálogo Oficial Creative Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Colecciones &{' '}
            <span className="text-[#00AEEF]">Diseños</span>{' '}
            <span className="text-[#8CC63F]">Personalizados</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Explora todos los diseños oficiales por serie. Fabricados en
            aluminio grado médico esterilizable para fresas de{' '}
            <strong className="text-white">alta velocidad</strong> ({BOX_DIMENSIONS_STR}
            ). Personalízalos o haz tu pedido directo. Dudas y contacto oficial
            en Instagram:{' '}
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00AEEF] hover:underline font-bold"
            >
              {OFFICIAL_INSTAGRAM_HANDLE}
            </a>
            .
          </p>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#00AEEF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ej. Ferrari, Gojo, Messi, RAC-01..."
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-[#11141E] border border-white/15 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#00AEEF]"
            />
          </div>

          <div className="inline-flex p-1 rounded-xl bg-[#11141E] border border-white/15">
            <button
              type="button"
              onClick={() => setViewMode('anodized')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition ${
                viewMode === 'anodized'
                  ? 'bg-gradient-to-r from-[#E5007D] to-[#009FE3] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Vista Fresero
            </button>
            <button
              type="button"
              onClick={() => setViewMode('stencil')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'stencil'
                  ? 'bg-gradient-to-r from-[#E5007D] to-[#009FE3] text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Lámina Original
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (10 Series + Todos without counts) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {SERIES_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] text-white shadow-laser-neon'
                  : 'bg-[#11141E] hover:bg-white/10 text-slate-200 border border-white/15'
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

          return (
            <article
              key={product.id}
              className="group rounded-2xl bg-[#11141E] hover:bg-[#151926] border border-white/15 hover:border-[#00AEEF]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
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
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#0B0D13]/85 text-[#00AEEF] border border-[#00AEEF]/40 backdrop-blur-md">
                    Serie {product.series}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#0B0D13]/85 text-[#F39200] border border-[#F39200]/35">
                      {product.code}
                    </span>
                    {product.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxProduct(product)}
                        title="Ampliar lámina de diseño"
                        className="p-1.5 rounded-lg bg-[#0B0D13]/80 hover:bg-[#E5007D] text-white border border-white/20 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Center Artwork */}
                <div className="relative z-10 my-auto flex items-center justify-center py-1">
                  {product.imageUrl ? (
                    viewMode === 'anodized' ? (
                      <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-white p-2 shadow-lg border-2 border-[#00AEEF]/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
                                : '#0B0D13'
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
                      ? 'text-white/95 font-semibold'
                      : 'text-[#0B0D13] font-bold'
                  }`}
                >
                  <span>Aluminio Resistente</span>
                  <span>{boxColor.name}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#00AEEF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {preset.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#F39200] shrink-0" />
                      <span className="font-semibold text-white">
                        Solo Fresas de Alta Velocidad
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                      <span>
                        Medidas: <strong className="text-slate-200">{BOX_DIMENSIONS_STR}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8CC63F] shrink-0" />
                      <span>
                        Ref:{' '}
                        <strong className="text-[#F39200]">
                          {product.code}
                        </strong>
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
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#E5007D]/20 hover:bg-[#E5007D] text-[#ff66b5] hover:text-white border border-[#E5007D]/40 text-xs font-extrabold transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Personalizar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAddToOrder(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#009FE3]/20 hover:bg-[#009FE3] text-[#00AEEF] hover:text-white border border-[#009FE3]/40 text-xs font-extrabold transition"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Sumar al Pedido
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleQuickAddToOrder(product);
                      setOrderDrawerOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#8CC63F]/20 hover:bg-[#8CC63F] text-[#a8e05f] hover:text-[#0B0D13] border border-[#8CC63F]/40 text-xs font-extrabold transition"
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    Hacer Pedido de este Modelo ({product.code})
                  </button>
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
            className="max-w-2xl w-full rounded-3xl bg-[#11141E] border-2 border-[#00AEEF]/50 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#F39200]">
                  Lámina Oficial de Referencia • {lightboxProduct.series} (
                  {lightboxProduct.code})
                </span>
                <h3 className="text-xl font-black text-white">
                  {lightboxProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProduct(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-[#E5007D] text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {lightboxProduct.imageUrl && (
              <div className="rounded-2xl bg-white p-6 flex items-center justify-center max-h-[60vh] overflow-hidden border-2 border-[#00AEEF]/30">
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] text-white font-black text-xs sm:text-sm shadow-laser-neon"
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
