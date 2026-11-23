'use client';

import React, { useRef, useState } from 'react';
import {
  Palette,
  Upload,
  Sparkles,
  CheckCircle2,
  Type,
  Sliders,
  FileImage,
  PlusCircle,
  Info,
  Award,
  Instagram,
  ClipboardList,
  Truck,
  Plus,
  Minus,
  Zap,
  PackagePlus,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import {
  ANODIZED_COLORS,
  PRESET_DESIGNS,
  SERIES_CATEGORIES,
} from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  BOX_DIMENSIONS_STR,
  PRICE_BOX_ONLY_MXN,
  PRICE_BOX_WITH_BURS_MXN,
  PRICE_EXTRA_BUR_KIT_MXN,
  DENTAL_BUR_FEATURES,
  DENTAL_BUR_SPECS_TITLE,
} from '@/utils/brand';
import { LaserFontFamily, SeriesCategory } from '@/types';
import LaserCanvasPreview from './LaserCanvasPreview';

const DENTAL_SPECIALTIES = [
  'ODONTOLOGÍA AVANZADA',
  'ENDODONCIA MICROSCÓPICA',
  'ORTODONCIA & ORTOPEDIA',
  'REHABILITACIÓN ORAL',
  'ODONTOPEDIATRÍA',
  'CIRUGÍA MAXILOFACIAL',
  'ESTÉTICA DENTAL',
  'PERIODONCIA E IMPLANTES',
];

type StudioTab = 'color' | 'design' | 'order';

export default function LaserCustomizerStudio() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeTab, setActiveTab] = useState<StudioTab>('design');
  const [studioSeriesFilter, setStudioSeriesFilter] =
    useState<SeriesCategory>('Todos');
  const [quantity, setQuantity] = useState<number>(1);
  const [includesBurs, setIncludesBurs] = useState<boolean>(false);
  const [showBurDetails, setShowBurDetails] = useState<boolean>(false);
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);

  const {
    selectedColor,
    setSelectedColor,
    designMode,
    setDesignMode,
    selectedPreset,
    setSelectedPreset,
    extraDiscoveredDesigns,
    uploadedImageSrc,
    uploadedFileName,
    setUploadedImage,
    transform,
    updateTransform,
    latestCanvasSnapshot,
    addToOrderList,
    addExtraBurKitToOrder,
    setOrderDrawerOpen,
  } = useCustomizerStore();

  const currentUnitPrice = includesBurs
    ? PRICE_BOX_WITH_BURS_MXN
    : PRICE_BOX_ONLY_MXN;
  const currentSubtotal = currentUnitPrice * quantity;
  const qualifiesFreeShippingHere = includesBurs
    ? quantity >= 2
    : quantity >= 3;

  const allStudioPresets = [...PRESET_DESIGNS, ...extraDiscoveredDesigns];

  const filteredStudioPresets =
    studioSeriesFilter === 'Todos'
      ? allStudioPresets
      : allStudioPresets.filter((p) => p.category === studioSeriesFilter);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processUploadedFile(file);
  };

  const processUploadedFile = (file: File) => {
    const isSvg =
      file.type === 'image/svg+xml' ||
      file.name.toLowerCase().endsWith('.svg');

    if (isSvg) {
      const textReader = new FileReader();
      textReader.onload = (event) => {
        let svgText = String(event.target?.result || '');
        // Ensure SVGs without explicit width/height render at high resolution
        if (svgText.includes('<svg') && !/\bwidth\s*=/.test(svgText)) {
          svgText = svgText.replace(
            '<svg',
            '<svg width="900" height="900"'
          );
        }
        const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgText
        )}`;
        setUploadedImage(encoded, file.name);
      };
      textReader.readAsText(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setUploadedImage(result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleAddToOrderList = (openDrawer = false) => {
    addToOrderList({
      itemType: 'box',
      title:
        designMode === 'preset'
          ? `Fresero ${selectedPreset.title}`
          : `Fresero Logo Propio (${uploadedFileName || 'Personalizado'})`,
      code: designMode === 'preset' ? selectedPreset.code : 'CUSTOM-LOGO',
      series: designMode === 'preset' ? selectedPreset.category : 'Custom Logo',
      color: selectedColor,
      designMode,
      presetDesign: selectedPreset,
      uploadedFileName,
      uploadedImageSrc,
      customText: transform.customText,
      specialtyTag: transform.specialtyTag,
      previewDataUrl: latestCanvasSnapshot,
      quantity: Math.max(1, quantity),
      includesBurs,
      unitPrice: currentUnitPrice,
    });

    if (openDrawer) {
      setOrderDrawerOpen(true);
    } else {
      setDispatchNotice(
        `¡Diseño agregado a tu pedido (${quantity} ${
          quantity > 1 ? 'piezas' : 'pieza'
        } — $${currentSubtotal} MXN)! Abre "Mi Pedido" cuando estés listo.`
      );
      setTimeout(() => setDispatchNotice(null), 4500);
    }
  };

  return (
    <section
      id="customizer-studio"
      className="relative overflow-hidden py-14 sm:py-18 border-t border-slate-200 bg-slate-50/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Studio Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span className="text-slate-900">CUSTOM</span>
            <span className="text-[#00AEEF]">DESIGN</span>
            <span className="text-slate-900">STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Diseña tu Fresero y Envía tu{' '}
            <span className="text-[#00AEEF]">Pedido</span> con{' '}
            <span className="text-[#059669]">Imagen a Grabar</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Aluminio grado médico esterilizable para{' '}
            <strong className="text-slate-900">
              fresas de alta velocidad
            </strong>{' '}
            ({BOX_DIMENSIONS_STR}). Sube el logo de tu clínica o elige un diseño
            del catálogo y visualízalo grabado en tiempo real.
          </p>
        </div>

        {/* Main 12-Col Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Real-Time Canvas Mockup */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <LaserCanvasPreview />
          </div>

          {/* Right Column: UNIFIED Single-Card Studio Control Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden flex flex-col">
              {/* Unified 3-Step Tab Bar */}
              <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/90 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('color')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'color'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                    style={{ background: selectedColor.hex }}
                  />
                  <span>1. Color</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('design')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'design'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E5007D] shrink-0" />
                  <span>2. Diseño</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('order')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'order'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>3. Pedido</span>
                </button>
              </div>

              {/* Tab Content Area */}
              <div className="p-5 space-y-4">
                {/* ==================== TAB 1: COLOR ==================== */}
                {activeTab === 'color' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <Palette className="w-4 h-4 text-[#00AEEF]" />
                        Elige el Color del Fresero
                      </span>
                      <span className="text-xs font-extrabold text-[#00AEEF]">
                        {selectedColor.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {ANODIZED_COLORS.map((color) => {
                        const isSelected = selectedColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                              isSelected
                                ? 'bg-sky-50/80 border-[#00AEEF] ring-1 ring-[#00AEEF]'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                            }`}
                          >
                            <span
                              className="w-7 h-7 rounded-lg shrink-0 border border-black/10 flex items-center justify-center shadow-sm"
                              style={{
                                background: `linear-gradient(135deg, ${color.highlightHex}, ${color.hex})`,
                              }}
                            >
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {color.name.split(' ')[0]}{' '}
                                {color.name.split(' ')[1]}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">
                                {color.badgeText}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('design')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
                    >
                      Siguiente: Elegir Diseño o Subir Logo
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* ==================== TAB 2: DESIGN & TEXT ==================== */}
                {activeTab === 'design' && (
                  <div className="space-y-3.5">
                    {/* Source Mode Switcher */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setDesignMode('preset')}
                        className={`py-2 px-3 rounded-lg text-xs font-extrabold transition ${
                          designMode === 'preset'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Catálogos Oficiales
                      </button>
                      <button
                        type="button"
                        onClick={() => setDesignMode('upload')}
                        className={`py-2 px-3 rounded-lg text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                          designMode === 'upload'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5 text-[#E5007D]" />
                        Subir Mi Logo
                      </button>
                    </div>

                    {designMode === 'preset' ? (
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                          {SERIES_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setStudioSeriesFilter(cat)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition ${
                                studioSeriesFilter === cat
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                          {filteredStudioPresets.map((preset) => {
                            const active = selectedPreset.id === preset.id;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => setSelectedPreset(preset)}
                                className={`p-2 rounded-xl border text-left transition flex items-center gap-2 ${
                                  active
                                    ? 'bg-sky-50/70 border-[#00AEEF] ring-1 ring-[#00AEEF]'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                                }`}
                              >
                                {preset.imageUrl ? (
                                  <div className="w-9 h-9 rounded-lg bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                                    <img
                                      src={preset.imageUrl}
                                      alt={preset.title}
                                      loading="lazy"
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-9 h-9 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center text-[9px] font-mono text-slate-700 font-bold">
                                    {preset.code}
                                  </div>
                                )}

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-mono font-bold text-slate-500">
                                      {preset.code}
                                    </span>
                                    {active && (
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-[11px] font-bold text-slate-900 truncate">
                                    {preset.title}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100/70 transition"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Upload className="w-6 h-6 text-[#00AEEF] mx-auto mb-1.5" />
                          <p className="text-xs font-extrabold text-slate-900">
                            Sube el logo de tu clínica o empresa
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            PNG, JPG, WEBP o SVG. Quita el fondo sólido y suaviza
                            bordes automáticamente.
                          </p>
                          {uploadedFileName && (
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                              <FileImage className="w-3 h-3" />
                              {uploadedFileName}
                            </div>
                          )}
                        </div>

                        {uploadedImageSrc && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-700 font-semibold flex items-center gap-1.5 text-[11px]">
                                <Sliders className="w-3.5 h-3.5 text-[#00AEEF]" />
                                Sensibilidad del Grabado
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateTransform({
                                    invertUpload: !transform.invertUpload,
                                  })
                                }
                                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-bold text-[10px] hover:bg-slate-100"
                              >
                                {transform.invertUpload
                                  ? 'Modo: Invertido'
                                  : 'Modo: Estándar'}
                              </button>
                            </div>
                            <input
                              type="range"
                              min="40"
                              max="220"
                              value={transform.contrastThreshold}
                              onChange={(e) =>
                                updateTransform({
                                  contrastThreshold: parseInt(
                                    e.target.value,
                                    10
                                  ),
                                })
                              }
                              className="w-full accent-slate-900 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Compact Lid Text & Specialty Controls */}
                    <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                          <Type className="w-3.5 h-3.5 text-[#00AEEF]" />
                          Texto en Tapa (Nombre del Dr. / Clínica):
                        </label>
                        <input
                          type="text"
                          maxLength={44}
                          value={transform.customText}
                          onChange={(e) =>
                            updateTransform({ customText: e.target.value })
                          }
                          placeholder="Ej. DRA. SOFÍA RAMÍREZ"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          Especialidad:
                        </label>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                          {DENTAL_SPECIALTIES.map((spec) => (
                            <button
                              key={spec}
                              type="button"
                              onClick={() =>
                                updateTransform({ specialtyTag: spec })
                              }
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap border transition ${
                                transform.specialtyTag === spec
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {spec}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              updateTransform({ specialtyTag: '' })
                            }
                            className="px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-800"
                          >
                            Sin Subtítulo
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { id: 'monospace', label: 'Técnica CAD' },
                            { id: 'sans-serif', label: 'Moderna Sans' },
                            { id: 'serif', label: 'Clásica Serif' },
                          ] as { id: LaserFontFamily; label: string }[]
                        ).map((font) => (
                          <button
                            key={font.id}
                            type="button"
                            onClick={() =>
                              updateTransform({ fontFamily: font.id })
                            }
                            className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                              transform.fontFamily === font.id
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {font.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('order')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
                    >
                      Siguiente: Elegir Modalidad ($250 / $549) y Cantidad
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* ==================== TAB 3: MODALIDAD, FRESAS Y CANTIDAD ==================== */}
                {activeTab === 'order' && (
                  <div className="space-y-3">
                    {/* Solo Fresero ($250) */}
                    <div
                      onClick={() => setIncludesBurs(false)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                        !includesBurs
                          ? 'bg-sky-50/80 border-[#00AEEF] ring-1 ring-[#00AEEF]'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            !includesBurs ? 'text-[#00AEEF]' : 'text-slate-300'
                          }`}
                        />
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">
                            Solo el Fresero (Cajita de Aluminio)
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Grabado láser personalizado (sin fresas)
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        ${PRICE_BOX_ONLY_MXN}
                      </span>
                    </div>

                    {/* Botón Cargar con Fresas Dentales ($549) */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          const next = !includesBurs;
                          setIncludesBurs(next);
                          setShowBurDetails(next);
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          includesBurs
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-amber-50 hover:bg-amber-100/80 text-slate-900 border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Zap
                            className={`w-4 h-4 shrink-0 ${
                              includesBurs
                                ? 'text-amber-300'
                                : 'text-amber-500'
                            }`}
                          />
                          <div>
                            <p className="text-xs font-black">
                              {includesBurs
                                ? '✓ Cargado con Fresas Dentales'
                                : '⚡ Cargar mi fresero con fresas dentales'}
                            </p>
                            <p
                              className={`text-[11px] ${
                                includesBurs
                                  ? 'text-emerald-100'
                                  : 'text-slate-600'
                              }`}
                            >
                              Kit completo FG 1.6 mm (Alta Velocidad)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-sm font-black">
                            ${PRICE_BOX_WITH_BURS_MXN}
                          </span>
                          {includesBurs &&
                            (showBurDetails ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            ))}
                        </div>
                      </button>

                      {includesBurs && showBurDetails && (
                        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5 text-[11px] text-slate-700">
                          <p className="font-black text-emerald-950 uppercase tracking-wider text-[10px]">
                            🦷 {DENTAL_BUR_SPECS_TITLE}:
                          </p>
                          <ul className="space-y-1">
                            {DENTAL_BUR_FEATURES.map((feat) => (
                              <li key={feat.id} className="leading-snug">
                                <strong className="text-slate-900">
                                  {feat.id}. {feat.title}:
                                </strong>{' '}
                                {feat.detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Kit Extra de Fresas */}
                    <button
                      type="button"
                      onClick={() => {
                        addExtraBurKitToOrder(1, false);
                        setDispatchNotice(
                          `¡Se agregó 1 Kit de Fresas Extra ($${PRICE_EXTRA_BUR_KIT_MXN} MXN) a tu pedido!`
                        );
                        setTimeout(() => setDispatchNotice(null), 4000);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-extrabold flex items-center justify-between transition"
                    >
                      <span className="flex items-center gap-1.5">
                        <PackagePlus className="w-4 h-4 text-[#00AEEF]" />+
                        Agregar Kit de Fresas Extra
                      </span>
                      <span className="font-black text-slate-900">
                        +${PRICE_EXTRA_BUR_KIT_MXN} MXN
                      </span>
                    </button>

                    {/* Quantity + Shipping */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">
                          Cantidad:
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {qualifiesFreeShippingHere ? (
                            <span className="text-emerald-600 font-bold">
                              ✓ Envío FedEx GRATIS
                            </span>
                          ) : includesBurs ? (
                            `Con 2 de $${PRICE_BOX_WITH_BURS_MXN} envío gratis`
                          ) : (
                            `Con 3 de $${PRICE_BOX_ONLY_MXN} envío gratis`
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) => Math.max(1, q - 1))
                          }
                          className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold transition shadow-sm"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-black text-slate-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center font-bold transition shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2.5 text-[11px]">
                      <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-emerald-900 font-medium">
                        Envío FedEx <strong>$150 MXN</strong> •{' '}
                        <strong>GRATIS</strong> en 2 de $549 o 3 de $250
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Persistent Unified Action Footer inside the same card */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-black/15"
                      style={{ background: selectedColor.hex }}
                    />
                    <span className="font-bold text-slate-700 truncate">
                      {includesBurs
                        ? `Cargado ($${PRICE_BOX_WITH_BURS_MXN})`
                        : `Solo Fresero ($${PRICE_BOX_ONLY_MXN})`}{' '}
                      × {quantity}
                    </span>
                  </div>
                  <span className="text-base font-black text-slate-900 shrink-0">
                    ${currentSubtotal} MXN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToOrderList(true)}
                    className="sm:col-span-2 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-[0.99]"
                  >
                    <ClipboardList className="w-4 h-4 text-cyan-400" />
                    Hacer Pedido ({quantity} {quantity > 1 ? 'pzs' : 'pza'} — $
                    {currentSubtotal} MXN)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddToOrderList(false)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-[11px] transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#00AEEF]" />
                    Guardar y Diseñar Otro
                  </button>

                  <a
                    href={OFFICIAL_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[11px] transition"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#E5007D]" />
                    {OFFICIAL_INSTAGRAM_HANDLE}
                  </a>
                </div>

                {dispatchNotice && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 leading-relaxed">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{dispatchNotice}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
