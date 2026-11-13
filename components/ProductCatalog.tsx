'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Sparkles,
  Check,
  Layers,
  Search,
  Eye,
  X,
  BookOpen,
  PlusCircle,
  Ruler,
  Zap,
  ClipboardList,
  RefreshCw,
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
} from '@/utils/brand';

export default function ProductCatalog() {
  const {
    selectedCategory,
    setSelectedCategory,
    extraDiscoveredDesigns,
    isSyncingCatalog,
    syncCatalogFromDisk,
    loadProductIntoStudio,
    addToOrderList,
    setOrderDrawerOpen,
  } = useCustomizerStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'anodized' | 'stencil'>('anodized');
  const [lightboxProduct, setLightboxProduct] = useState<ProductItem | null>(
    null
  );
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  useEffect(() => {
    syncCatalogFromDisk();
  }, [syncCatalogFromDisk]);

  const handleManualSync = async () => {
    const count = await syncCatalogFromDisk();
    setSyncFeedback(
      count > 0
        ? `¡Se detectaron y agregaron ${count} nuevos diseños de tu carpeta Catalogo!`
        : 'Carpeta Catalogo sincronizada al día.'
    );
    setTimeout(() => setSyncFeedback(null), 4000);
  };

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
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4 text-[#00AEEF]" />
            Catálogo Oficial Creative Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Colecciones &{' '}
            <span className="text-[#00AEEF]">Diseños</span>{' '}
            <span className="text-[#059669]">Personalizados</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Explora todos los diseños oficiales por serie. Fabricados en
            aluminio grado médico esterilizable para fresas de{' '}
            <strong className="text-slate-900">alta velocidad</strong> ({BOX_DIMENSIONS_STR}
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
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ej. Ferrari, Gojo, Messi, RAC-01..."
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
            />
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('anodized')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition ${
                viewMode === 'anodized'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vista Fresero
            </button>
            <button
              type="button"
              onClick={() => setViewMode('stencil')}
              className={`px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                viewMode === 'stencil'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Lámina Original
            </button>
          </div>

          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncingCatalog}
            title="Sincronizar nuevos diseños de la carpeta Catalogo"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center justify-center shrink-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${isSyncingCatalog ? 'animate-spin text-[#00AEEF]' : ''}`}
            />
          </button>
        </div>
      </div>

      {syncFeedback && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          {syncFeedback}
        </div>
      )}

      {/* Category Filter Pills (10 Series + Todos) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {SERIES_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
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
              className="group rounded-2xl bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Card Visual Header */}
              <div
                className="relative h-56 p-4 flex flex-col justify-between border-b border-slate-200 overflow-hidden"
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
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                    Serie {product.series}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-white/90 text-slate-900 border border-white/40 shadow-sm">
                      {product.code}
                    </span>
                    {product.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxProduct(product)}
                        title="Ampliar lámina de diseño"
                        className="p-1.5 rounded-lg bg-black/50 hover:bg-slate-900 text-white border border-white/20 transition"
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
                      <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-white p-2 shadow-md border border-white/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
                      ? 'text-white font-bold drop-shadow'
                      : 'text-slate-800 font-bold'
                  }`}
                >
                  <span>Aluminio Grado Médico</span>
                  <span>{boxColor.name}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#00AEEF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {preset.description}
                  </p>

                  {/* Specs List */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-semibold text-slate-900">
                        Solo Fresas de Alta Velocidad
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                      <span>
                        Medidas: <strong className="text-slate-800">{BOX_DIMENSIONS_STR}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        Ref:{' '}
                        <strong className="text-slate-900">
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
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-extrabold transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E5007D]" />
                      Personalizar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAddToOrder(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#00AEEF] border border-sky-200 text-xs font-extrabold transition"
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
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 text-xs font-extrabold transition shadow-sm"
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-cyan-400" />
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
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl text-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lámina Oficial de Referencia • {lightboxProduct.series} (
                  {lightboxProduct.code})
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {lightboxProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProduct(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {lightboxProduct.imageUrl && (
              <div className="rounded-2xl bg-slate-50 p-6 flex items-center justify-center max-h-[60vh] overflow-hidden border border-slate-200">
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#00AEEF]" />
                Personalizar este Diseño en el Estudio Láser
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
