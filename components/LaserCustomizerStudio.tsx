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
  UserCheck,
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

export default function LaserCustomizerStudio() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [studioSeriesFilter, setStudioSeriesFilter] =
    useState<SeriesCategory>('Todos');
  const [quantity, setQuantity] = useState<number>(1);
  const [includesBurs, setIncludesBurs] = useState<boolean>(false);
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
        } — $${currentSubtotal} MXN)! Abre "Mi Pedido" cuando estés listo para ingresar tus datos de entrega.`
      );
      setTimeout(() => setDispatchNotice(null), 4500);
    }
  };

  return (
    <section
      id="customizer-studio"
      className="relative overflow-hidden py-16 sm:py-20 border-t border-slate-200 bg-slate-50/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Studio Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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
            Freseros de aluminio grado médico esterilizable para{' '}
            <strong className="text-slate-900">alta velocidad exclusivamente</strong>{' '}
            ({BOX_DIMENSIONS_STR}). Elige tu color anodizado, selecciona un
            diseño del catálogo o sube tu logo personalizado. Contacto y dudas
            oficiales en{' '}
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
        </div>

        {/* Main 12-Col Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Column: Real-Time Canvas Mockup (Dark Contrast Stage) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <LaserCanvasPreview />
          </div>

          {/* Right Column: Step-by-Step Configuration Panels (Clean Light Cards) */}
          <div className="lg:col-span-5 space-y-6">
            {/* STEP 1: Box Color Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00AEEF]" />
                  Paso 1 • Color del Fresero Anodizado
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
                          ? 'bg-sky-50/70 border-[#00AEEF] ring-1 ring-[#00AEEF]'
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
                          {color.name.split(' ')[0]} {color.name.split(' ')[1]}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {color.badgeText}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Design Source Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5007D]" />
                  Paso 2 • Diseño a Grabar con Láser
                </span>
                <span className="text-xs font-extrabold text-slate-500">
                  {designMode === 'preset' ? 'Catálogo' : 'Logo Propio'}
                </span>
              </div>

              {/* Source Mode Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
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
                  <Upload className="w-3.5 h-3.5" />
                  Subir Mi Logo
                </button>
              </div>

              {designMode === 'preset' ? (
                <div className="space-y-3">
                  {/* Category Pills inside Studio */}
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

                  {/* Thumbnail Grid of Reference Catalog Designs */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {filteredStudioPresets.map((preset) => {
                      const active = selectedPreset.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setSelectedPreset(preset)}
                          className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                            active
                              ? 'bg-sky-50/70 border-[#00AEEF] ring-1 ring-[#00AEEF]'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {preset.imageUrl ? (
                            <div className="w-11 h-11 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                              <img
                                src={preset.imageUrl}
                                alt={preset.title}
                                loading="lazy"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-slate-200 p-1 shrink-0 flex items-center justify-center text-[10px] font-mono text-slate-700 font-bold">
                              {preset.code}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-slate-600">
                                {preset.code}
                              </span>
                              {active && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {preset.title}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {preset.category}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/70 transition"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                    <p className="text-xs font-extrabold text-slate-900">
                      Arrastra la imagen o logo a grabar aquí o haz clic
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Soporta PNG, JPG o SVG. Se previsualizará grabada sobre la
                      tapa del fresero.
                    </p>
                    {uploadedFileName && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        <FileImage className="w-3.5 h-3.5" />
                        {uploadedFileName}
                      </div>
                    )}
                  </div>

                  {/* Laser Threshold Controls for Uploaded Logos */}
                  {uploadedImageSrc && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#00AEEF]" />
                          Intensidad del Grabado
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateTransform({
                              invertUpload: !transform.invertUpload,
                            })
                          }
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-bold text-[11px] hover:bg-slate-50"
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
                            contrastThreshold: parseInt(e.target.value, 10),
                          })
                        }
                        className="w-full accent-slate-900 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Text Engraving on Lid */}
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <Type className="w-3.5 h-3.5 text-[#00AEEF]" />
                    Texto Principal en Tapa (Nombre del Dr. / Clínica):
                  </label>
                  <input
                    type="text"
                    maxLength={44}
                    value={transform.customText}
                    onChange={(e) =>
                      updateTransform({ customText: e.target.value })
                    }
                    placeholder="Ej. DRA. SOFÍA RAMÍREZ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition"
                  />
                </div>

                {/* Dental Specialty Sub-tag Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Subtítulo / Especialidad Odontológica:
                  </label>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                    {DENTAL_SPECIALTIES.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => updateTransform({ specialtyTag: spec })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap border transition ${
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
                      onClick={() => updateTransform({ specialtyTag: '' })}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-800"
                    >
                      Sin Subtítulo
                    </button>
                  </div>
                </div>

                {/* Typography Selector */}
                <div className="grid grid-cols-3 gap-2">
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
                      onClick={() => updateTransform({ fontFamily: font.id })}
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
            </div>

            {/* STEP 3: Modalidad, Fresas Dentales y Envío de Pedido */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Paso 3 • Modalidad y Precio del Fresero
                </span>
                <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  ${currentUnitPrice} MXN c/u
                </span>
              </div>

              {/* Opción 1: Solo Fresero ($250) + Botón Abajo para Cargar con Fresas ($549) */}
              <div className="space-y-2.5">
                <div
                  onClick={() => setIncludesBurs(false)}
                  className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-center justify-between ${
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
                        Fresero metálico grabado láser (sin fresas incluidas)
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900">
                    ${PRICE_BOX_ONLY_MXN} MXN
                  </span>
                </div>

                {/* Botón para Cargar con Fresas Dentales -> Pasa a $549 y desbloquea texto */}
                <button
                  type="button"
                  onClick={() => setIncludesBurs((prev) => !prev)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    includesBurs
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-amber-50 hover:bg-amber-100/80 text-slate-900 border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Zap
                      className={`w-5 h-5 shrink-0 ${
                        includesBurs ? 'text-amber-300' : 'text-amber-500'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-black">
                        {includesBurs
                          ? '✓ Fresero Cargado con Fresas Dentales'
                          : '⚡ Cargar mi fresero con fresas dentales'}
                      </p>
                      <p
                        className={`text-[11px] ${
                          includesBurs ? 'text-emerald-100' : 'text-slate-600'
                        }`}
                      >
                        {includesBurs
                          ? 'Incluye el kit completo de fresas FG 1.6 mm'
                          : 'Haz clic para ver las fresas que incluye'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-black">
                      ${PRICE_BOX_WITH_BURS_MXN} MXN
                    </span>
                    {includesBurs ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Texto desbloqueado con las especificaciones de las fresas */}
                {includesBurs && (
                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                      <span className="font-black text-emerald-950 uppercase tracking-wider text-[11px]">
                        🦷 {DENTAL_BUR_SPECS_TITLE}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                        Incluido por ${PRICE_BOX_WITH_BURS_MXN}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[11px]">
                      {DENTAL_BUR_FEATURES.map((feat) => (
                        <li
                          key={feat.id}
                          className="flex items-start gap-2 leading-snug"
                        >
                          <span className="font-black text-emerald-700 shrink-0">
                            {feat.id}.
                          </span>
                          <span>
                            <strong className="text-slate-900">
                              {feat.title}:
                            </strong>{' '}
                            {feat.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botón para agregar Kit de Fresas Extra ($299 MXN) */}
                <button
                  type="button"
                  onClick={() => {
                    addExtraBurKitToOrder(1, false);
                    setDispatchNotice(
                      `¡Se agregó 1 Kit de Fresas Extra ($${PRICE_EXTRA_BUR_KIT_MXN} MXN) a tu pedido!`
                    );
                    setTimeout(() => setDispatchNotice(null), 4000);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-extrabold flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <PackagePlus className="w-4 h-4 text-[#00AEEF]" />
                    + Agregar Kit de Fresas Extra al pedido
                  </span>
                  <span className="font-black text-slate-900">
                    +${PRICE_EXTRA_BUR_KIT_MXN} MXN
                  </span>
                </button>
              </div>

              {/* Shipping Policy Banner */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-xs">
                  <p className="font-extrabold text-emerald-950">
                    Envío Nacional FedEx: $150 MXN
                  </p>
                  <p className="text-emerald-700 font-semibold text-[11px]">
                    ¡GRATIS llevando 2 freseros con fresas ($549) o 3 freseros solos ($250)!
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-extrabold text-slate-900">
                    Cantidad de freseros:
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {qualifiesFreeShippingHere ? (
                      <span className="text-emerald-600 font-bold">
                        ✓ Califica para Envío FedEx GRATIS
                      </span>
                    ) : includesBurs ? (
                      <span>
                        Agrega {2 - quantity} fresero(s) cargado(s) más para envío gratis
                      </span>
                    ) : (
                      <span>
                        Con freseros solos ($250) requieres {3 - quantity} más para envío gratis
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold transition shadow-sm"
                    title="Disminuir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center font-bold transition shadow-sm"
                    title="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Live Configuration Summary Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Modalidad:</span>
                  <span className="font-bold text-slate-900">
                    {includesBurs
                      ? `Fresero + Fresas ($${PRICE_BOX_WITH_BURS_MXN})`
                      : `Solo Fresero ($${PRICE_BOX_ONLY_MXN})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dimensiones:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {BOX_DIMENSIONS_STR}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Color del Fresero:</span>
                  <span className="font-bold text-slate-900">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Diseño Láser:</span>
                  <span className="font-bold text-[#00AEEF]">
                    {designMode === 'preset'
                      ? `${selectedPreset.code} • ${selectedPreset.title}`
                      : uploadedFileName || 'Logo Propio Personalizado'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
                  <span className="font-bold text-slate-800">
                    Subtotal ({quantity} {quantity > 1 ? 'piezas' : 'pieza'}):
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    ${currentSubtotal} MXN
                  </span>
                </div>
              </div>

              {/* Primary CTA: Add and Open Checkout */}
              <button
                type="button"
                onClick={() => handleAddToOrderList(true)}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition"
              >
                <ClipboardList className="w-4 h-4 text-cyan-400" />
                Hacer Pedido ({quantity} {quantity > 1 ? 'pzs' : 'pza'} — $
                {currentSubtotal} MXN)
              </button>

              {/* Secondary CTA: Add to Order List */}
              <button
                type="button"
                onClick={() => handleAddToOrderList(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs transition shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-[#00AEEF]" />
                Guardar en Mi Pedido y Diseñar Otro Modelo
              </button>

              {/* Helpful Notice when item is saved */}
              {dispatchNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 leading-relaxed">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{dispatchNotice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
