'use client';

import React, { useRef, useState } from 'react';
import {
  Palette,
  Upload,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Type,
  Sliders,
  FileImage,
  PlusCircle,
  UserCheck,
  Info,
  RefreshCw,
  Award,
} from 'lucide-react';
import {
  ANODIZED_COLORS,
  PRESET_DESIGNS,
  SERIES_CATEGORIES,
} from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import {
  buildSingleOrderWhatsAppUrl,
  sendOrderWithImageToWhatsApp,
  WHATSAPP_DISPLAY_NUMBER,
} from '@/utils/whatsapp';
import { LaserFontFamily, SeriesCategory } from '@/types';
import LaserCanvasPreview from './LaserCanvasPreview';
import { CreativeDiagonalRibbons } from './CreativeBrandLogo';

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
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);

  const {
    selectedColor,
    setSelectedColor,
    designMode,
    setDesignMode,
    selectedPreset,
    setSelectedPreset,
    extraDiscoveredDesigns,
    isSyncingCatalog,
    syncCatalogFromDisk,
    uploadedImageSrc,
    uploadedFileName,
    setUploadedImage,
    transform,
    updateTransform,
    latestCanvasSnapshot,
    addToOrderList,
  } = useCustomizerStore();

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

  const handleAddToOrderList = () => {
    addToOrderList({
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
    });
  };

  const handleDirectWhatsAppOrder = async () => {
    const combinedText = transform.specialtyTag.trim()
      ? `${transform.customText.trim()} (${transform.specialtyTag.trim()})`
      : transform.customText.trim();

    const whatsappUrl = buildSingleOrderWhatsAppUrl({
      color: selectedColor,
      designMode,
      presetDesign: selectedPreset,
      uploadedFileName,
      customText: combinedText,
      doctorName,
      clinicName,
      notes: orderNotes,
    });

    const prefix =
      designMode === 'preset'
        ? `pedido-${selectedPreset.code.toLowerCase()}`
        : 'pedido-logo-personalizado';

    const result = await sendOrderWithImageToWhatsApp({
      whatsappUrl,
      canvasDataUrl: latestCanvasSnapshot,
      sourceImageDataUrl: designMode === 'upload' ? uploadedImageSrc : null,
      fileNamePrefix: prefix,
    });

    if (result.copiedToClipboard) {
      setDispatchNotice(
        `¡Listo! La imagen a grabar se copió a tu portapapeles y se descargó en tu equipo. En el chat de WhatsApp (${WHATSAPP_DISPLAY_NUMBER}) solo presiona Ctrl+V (Pegar) o adjunta la imagen descargada.`
      );
    } else {
      setDispatchNotice(
        `¡Listo! Se descargó la imagen de tu diseño automáticamente y se abrió el chat con ${WHATSAPP_DISPLAY_NUMBER}. Adjunta la imagen descargada en la conversación.`
      );
    }
  };

  return (
    <section
      id="customizer-studio"
      className="relative overflow-hidden py-20 border-t border-white/10 bg-gradient-to-b from-[#0B0D13] via-[#11141E] to-[#0B0D13]"
    >
      <CreativeDiagonalRibbons
        position="top-right"
        className="absolute -top-12 -right-28 opacity-35"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Studio Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11141E] border border-[#E5007D]/40 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5007D]" />
            <span className="text-white">CUSTOM</span>
            <span className="text-[#F39200]">DESIGN</span>
            <span className="text-[#00AEEF]">STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Diseña tu Fresero y Envía tu{' '}
            <span className="text-[#00AEEF]">Pedido</span> con{' '}
            <span className="text-[#8CC63F]">Imagen a Grabar</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Elige el color del aluminio anodizado, selecciona cualquiera de{' '}
            <span className="text-[#00AEEF] font-bold">
              nuestros diseños del catálogo
            </span>{' '}
            o sube tu propia imagen/logo. Al terminar, envía tu pedido junto con
            la imagen a grabar directamente a nuestro WhatsApp{' '}
            <span className="text-[#8CC63F] font-extrabold">
              {WHATSAPP_DISPLAY_NUMBER}
            </span>
            .
          </p>
        </div>

        {/* Main 12-Col Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Column: Real-Time Canvas Mockup */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <LaserCanvasPreview />
          </div>

          {/* Right Column: Step-by-Step Configuration Panels */}
          <div className="lg:col-span-5 space-y-6">
            {/* STEP 1: Box Color Selection */}
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#009FE3]/35 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#00AEEF] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#E5007D]" />
                  Paso 1 • Color del Fresero Anodizado
                </span>
                <span className="text-xs font-extrabold text-[#F39200]">
                  {selectedColor.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ANODIZED_COLORS.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#009FE3]/15 border-[#00AEEF] ring-1 ring-[#E5007D]/50'
                          : 'bg-[#0B0D13] hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-lg shrink-0 border border-white/30 flex items-center justify-center shadow-inner"
                        style={{
                          background: `linear-gradient(135deg, ${color.highlightHex}, ${color.hex})`,
                        }}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {color.name.split(' ')[0]} {color.name.split(' ')[1]}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {color.badgeText}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Design Source Selection (Presets from Catalogo vs Custom Upload) */}
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#E5007D]/35 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#ff4da6] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F39200]" />
                  Paso 2 • Imagen o Diseño a Grabar
                </span>
                <button
                  type="button"
                  onClick={() => syncCatalogFromDisk()}
                  title="Buscar nuevas imágenes en la carpeta Catalogo"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8CC63F] hover:underline"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${
                      isSyncingCatalog ? 'animate-spin' : ''
                    }`}
                  />
                  Actualizar Catálogo
                </button>
              </div>

              {/* Mode Switch Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#0B0D13] border border-white/15">
                <button
                  type="button"
                  onClick={() => setDesignMode('preset')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold transition ${
                    designMode === 'preset'
                      ? 'bg-gradient-to-r from-[#E5007D] to-[#009FE3] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  A. Catálogos por Serie
                </button>
                <button
                  type="button"
                  onClick={() => setDesignMode('upload')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold transition ${
                    designMode === 'upload'
                      ? 'bg-gradient-to-r from-[#E5007D] to-[#009FE3] text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  B. Subir Tu Imagen / Logo
                </button>
              </div>

              {designMode === 'preset' ? (
                <div className="space-y-3">
                  {/* Mini Series Filter inside Studio */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                    {SERIES_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setStudioSeriesFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition ${
                          studioSeriesFilter === cat
                            ? 'bg-[#009FE3]/25 text-[#00AEEF] border border-[#00AEEF]/60'
                            : 'bg-[#0B0D13] text-slate-400 hover:text-white border border-white/10'
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
                              ? 'bg-[#009FE3]/15 border-[#00AEEF] ring-1 ring-[#E5007D]/50'
                              : 'bg-[#0B0D13] hover:bg-white/10 border-white/10'
                          }`}
                        >
                          {preset.imageUrl ? (
                            <div className="w-11 h-11 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden border border-white/20">
                              <img
                                src={preset.imageUrl}
                                alt={preset.title}
                                loading="lazy"
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-[#11141E] p-1 shrink-0 flex items-center justify-center border border-white/10 text-[10px] font-mono text-[#00AEEF]">
                              {preset.code}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-[#F39200]">
                                {preset.code}
                              </span>
                              {active && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC63F] shrink-0" />
                              )}
                            </div>
                            <p className="text-xs font-semibold text-white truncate">
                              {preset.title}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
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
                    className="cursor-pointer border-2 border-dashed border-[#00AEEF]/50 hover:border-[#E5007D] rounded-2xl p-6 text-center bg-[#0B0D13] hover:bg-[#009FE3]/10 transition"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-[#00AEEF] mx-auto mb-2" />
                    <p className="text-xs font-extrabold text-white">
                      Arrastra la imagen o logo a grabar aquí o haz clic
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Soporta PNG, JPG o SVG. Se previsualizará grabada con
                      láser sobre la tapa del fresero.
                    </p>
                    {uploadedFileName && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8CC63F]/20 text-[#a8e05f] text-xs font-bold">
                        <FileImage className="w-3.5 h-3.5" />
                        {uploadedFileName}
                      </div>
                    )}
                  </div>

                  {/* Laser Threshold Controls for Uploaded Logos */}
                  {uploadedImageSrc && (
                    <div className="p-3.5 rounded-xl bg-[#0B0D13] border border-white/15 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#00AEEF]" />
                          Intensidad del Grabado Láser
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateTransform({
                              invertUpload: !transform.invertUpload,
                            })
                          }
                          className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-[#00AEEF] font-bold text-[11px]"
                        >
                          {transform.invertUpload
                            ? 'Modo: Invertido (Logos claros)'
                            : 'Modo: Estándar (Logos oscuros)'}
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
                        className="w-full accent-[#00AEEF] cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Custom Doctor / Clinic Text & Dental Specialty Input */}
              <div className="pt-2 space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1.5">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D13] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                {/* Dental Specialty Sub-tag Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F39200]" />
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
                            ? 'bg-[#E5007D]/20 border-[#E5007D] text-[#ff66b5]'
                            : 'bg-[#0B0D13] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => updateTransform({ specialtyTag: '' })}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap bg-[#0B0D13] border border-white/10 text-slate-400 hover:text-rose-300"
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
                          ? 'bg-[#009FE3]/20 border-[#00AEEF] text-[#00AEEF]'
                          : 'bg-[#0B0D13] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 3: Realizar Pedido Directo por WhatsApp (+52 1 614 552 5335) */}
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#8CC63F]/40 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#8CC63F] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  Paso 3 • Datos para Enviar Pedido
                </span>
                <span className="text-[11px] font-mono text-[#a8e05f] font-bold">
                  {WHATSAPP_DISPLAY_NUMBER}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="Tu Nombre / Doctor(a) (Opcional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D13] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8CC63F]"
                />
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Clínica / Ciudad (Opcional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D13] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8CC63F]"
                />
              </div>

              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Indicaciones especiales sobre tu grabado (Opcional)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D13] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#8CC63F]"
              />

              {/* Live Configuration Summary Box */}
              <div className="p-3.5 rounded-xl bg-[#0B0D13] border border-white/10 text-xs space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Color del Fresero:</span>
                  <span className="font-bold text-white">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Imagen a Grabar:</span>
                  <span className="font-bold text-[#00AEEF]">
                    {designMode === 'preset'
                      ? `${selectedPreset.code} • ${selectedPreset.title}`
                      : uploadedFileName || 'Imagen / Logo Personalizado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Atención Directa:</span>
                  <span className="font-bold text-[#8CC63F]">
                    WhatsApp {WHATSAPP_DISPLAY_NUMBER}
                  </span>
                </div>
              </div>

              {/* Primary CTA: Send Order + Image to WhatsApp +52 1 614 552 5335 */}
              <button
                type="button"
                onClick={handleDirectWhatsAppOrder}
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl bg-gradient-to-r from-[#8CC63F] via-[#76B82A] to-[#009FE3] text-[#0B0D13] font-black text-xs sm:text-sm shadow-lime-neon hover:brightness-110 transition"
              >
                <MessageCircle className="w-5 h-5 fill-[#0B0D13]" />
                Hacer Pedido + Enviar Imagen al {WHATSAPP_DISPLAY_NUMBER}
              </button>

              {/* Secondary CTA: Add to Order List if ordering multiple designs */}
              <button
                type="button"
                onClick={handleAddToOrderList}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E5007D]/15 hover:bg-[#E5007D]/25 text-[#ff66b5] border border-[#E5007D]/40 font-extrabold text-xs transition"
              >
                <PlusCircle className="w-4 h-4" />
                Agregar este Diseño a Mi Lista de Pedido (Varios Modelos)
              </button>

              {/* Helpful Notice when image is copied & downloaded */}
              {dispatchNotice && (
                <div className="p-3.5 rounded-xl bg-[#8CC63F]/15 border border-[#8CC63F]/40 text-[#a8e05f] text-xs flex items-start gap-2.5 leading-relaxed">
                  <Info className="w-4 h-4 text-[#8CC63F] shrink-0 mt-0.5" />
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
