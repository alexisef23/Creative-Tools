'use client';

import React, { useEffect, useState } from 'react';
import {
  FolderOpen,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ClipboardList,
} from 'lucide-react';
import { ANODIZED_COLORS, PRESET_DESIGNS } from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { PresetDesign } from '@/types';
import { BOX_DIMENSIONS_STR } from '@/utils/brand';

const REFERENCE_FOLDERS = [
  {
    id: 'Racing',
    label: 'Racing Series',
    folderName: 'Racing Series',
    accent: '#E5007D',
  },
  {
    id: 'Heroes',
    label: 'Heroes Series',
    folderName: 'Heroes Series',
    accent: '#009FE3',
  },
  {
    id: 'Anime',
    label: 'Anime Series',
    folderName: 'Anime Series',
    accent: '#F39200',
  },
  {
    id: 'Idols',
    label: 'Idol Series',
    folderName: 'Idol Series',
    accent: '#E5007D',
  },
  {
    id: 'Sport',
    label: 'Sport Series',
    folderName: 'Sport Series',
    accent: '#009FE3',
  },
  {
    id: 'Sci-Fi',
    label: 'Sci-Fi Series',
    folderName: 'Sci-Fi Series',
    accent: '#662483',
  },
  {
    id: 'Dental Humor',
    label: 'Dental Humor Series',
    folderName: 'Dental Humor Series',
    accent: '#059669',
  },
  {
    id: 'Architecture',
    label: 'Architecture & Landmarks',
    folderName: 'Architecture & Landmarks Series',
    accent: '#F39200',
  },
  {
    id: 'Retro Gaming',
    label: 'Vintage & Retro Gaming',
    folderName: 'Vintage & Retro Gaming Series',
    accent: '#E5007D',
  },
  {
    id: 'Animals',
    label: 'Animals & Spirit Series',
    folderName: 'Animals & Spirit Series',
    accent: '#059669',
  },
] as const;

export default function ReferenceCatalogSection() {
  const [activeFolder, setActiveFolder] = useState<string>('Racing');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const {
    selectedPreset,
    setSelectedPreset,
    setSelectedColor,
    extraDiscoveredDesigns,
    isSyncingCatalog,
    syncCatalogFromDisk,
    addToOrderList,
    setOrderDrawerOpen,
  } = useCustomizerStore();

  useEffect(() => {
    syncCatalogFromDisk();
  }, [syncCatalogFromDisk]);

  const allDesigns = [...PRESET_DESIGNS, ...extraDiscoveredDesigns];

  const folderDesigns = allDesigns.filter(
    (d) => d.category === activeFolder && d.imageUrl
  );

  const handleManualSync = async () => {
    const newCount = await syncCatalogFromDisk();
    setSyncMessage(
      newCount > 0
        ? '¡Se detectaron y agregaron nuevas imágenes desde tu carpeta Catalogo!'
        : 'Carpeta Catalogo sincronizada al día.'
    );
    setTimeout(() => setSyncMessage(null), 4000);
  };

  const handleSelectFromLookbook = (design: PresetDesign) => {
    setSelectedPreset(design);
    if (design.recommendedColorId) {
      const recommendedColor = ANODIZED_COLORS.find(
        (c) => c.id === design.recommendedColorId
      );
      if (recommendedColor) {
        setSelectedColor(recommendedColor);
      }
    }
    const studioEl = document.getElementById('customizer-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="catalogos-referencia"
      className="py-16 border-t border-b border-slate-200 bg-slate-50/70 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-slate-700 text-xs font-black uppercase tracking-wider mb-2">
              <FolderOpen className="w-4 h-4 text-[#00AEEF]" />
              CUSTOM DESIGN SERIES • CATÁLOGOS DE REFERENCIA
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explora las Carpetas de Referencia por Serie
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Selecciona cualquiera de las series para explorar las láminas de
              grabado láser. Freseros de aluminio esterilizable para{' '}
              <strong className="text-slate-900">alta velocidad</strong> ({BOX_DIMENSIONS_STR}).
            </p>
          </div>

          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncingCatalog}
            className="self-start lg:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm transition flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isSyncingCatalog ? 'animate-spin' : ''
              }`}
            />
            {isSyncingCatalog ? 'Sincronizando...' : 'Sincronizar Carpeta'}
          </button>
        </div>

        {/* Folder Tabs (All 10 Reference Series) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {REFERENCE_FOLDERS.map((folder) => {
            const isActive = activeFolder === folder.id;
            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => setActiveFolder(folder.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <FolderOpen
                  className="w-3.5 h-3.5"
                  style={{ color: isActive ? '#38bdf8' : folder.accent }}
                />
                <span>{folder.label}</span>
              </button>
            );
          })}
        </div>

        {syncMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            {syncMessage}
          </div>
        )}

        {/* Lookbook Sheet Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {folderDesigns.map((design) => {
            const isSelected = selectedPreset.id === design.id;
            const recColor =
              ANODIZED_COLORS.find((c) => c.id === design.recommendedColorId) ||
              ANODIZED_COLORS[0];

            return (
              <div
                key={design.id}
                className={`group rounded-2xl p-3 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50/60 border-[#00AEEF] ring-2 ring-[#00AEEF]/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div
                  onClick={() => handleSelectFromLookbook(design)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[10px] font-bold">
                      {design.code}
                    </span>
                    {design.isAutoDiscovered ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-extrabold text-[9px] uppercase">
                        Nuevo
                      </span>
                    ) : (
                      isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )
                    )}
                  </div>

                  <div className="h-36 rounded-xl bg-slate-50 p-2 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-slate-300 transition">
                    {design.imageUrl && (
                      <img
                        src={design.imageUrl}
                        alt={design.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <h3 className="text-xs font-extrabold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-[#00AEEF]">
                    {design.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {design.description}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectFromLookbook(design)}
                    className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-extrabold text-[10px] flex items-center justify-center gap-1 transition"
                  >
                    <Sparkles className="w-3 h-3 text-[#00AEEF]" />
                    Simular
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToOrderList({
                        title: design.title,
                        code: design.code,
                        series: design.category,
                        color: recColor,
                        designMode: 'preset',
                        presetDesign: design,
                        customText: `CATÁLOGO ${design.code}`,
                        previewDataUrl: design.imageUrl || '',
                      });
                      setOrderDrawerOpen(true);
                    }}
                    className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] flex items-center justify-center gap-1 transition shadow-sm"
                  >
                    <ClipboardList className="w-3 h-3" />
                    Pedir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
