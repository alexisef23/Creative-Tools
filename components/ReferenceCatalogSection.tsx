'use client';

import React, { useEffect, useState } from 'react';
import {
  FolderOpen,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { ANODIZED_COLORS, PRESET_DESIGNS } from '@/utils/catalogData';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { PresetDesign } from '@/types';
import { buildSingleOrderWhatsAppUrl } from '@/utils/whatsapp';

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
    accent: '#8CC63F',
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
    accent: '#8CC63F',
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
      className="py-16 border-t border-white/10 bg-[#11141E]/75 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#F39200] text-xs font-black uppercase tracking-widest mb-2">
              <FolderOpen className="w-4 h-4 text-[#E5007D]" />
              CUSTOM <span className="text-[#00AEEF]">DESIGN</span> SERIES •
              CATÁLOGOS DE REFERENCIA
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explora las Carpetas de Referencia por Serie
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Selecciona cualquiera de las series de{' '}
              <code className="text-[#00AEEF] bg-white/5 px-1.5 py-0.5 rounded font-semibold">
                Catalogo/
              </code>{' '}
              para explorar las láminas de grabado láser o sincronizar nuevos
              archivos al instante.
            </p>
          </div>

          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncingCatalog}
            className="self-start lg:self-auto px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#8CC63F]/15 hover:bg-[#8CC63F]/25 text-[#a8e05f] border border-[#8CC63F]/40 transition flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isSyncingCatalog ? 'animate-spin' : ''
              }`}
            />
            {isSyncingCatalog ? 'Sincronizando...' : 'Sincronizar Carpeta'}
          </button>
        </div>

        {/* Folder Tabs (All 10 Reference Series without design counts) */}
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
                    ? 'bg-gradient-to-r from-[#E5007D] via-[#009FE3] to-[#8CC63F] text-white shadow-laser-neon'
                    : 'bg-[#0B0D13] hover:bg-white/10 text-slate-200 border border-white/15'
                }`}
              >
                <FolderOpen
                  className="w-3.5 h-3.5"
                  style={{ color: isActive ? '#ffffff' : folder.accent }}
                />
                <span>{folder.label}</span>
              </button>
            );
          })}
        </div>

        {syncMessage && (
          <div className="mb-6 p-3 rounded-xl bg-[#8CC63F]/15 border border-[#8CC63F]/40 text-[#a8e05f] text-xs font-bold">
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
            const waUrl = buildSingleOrderWhatsAppUrl({
              color: recColor,
              designMode: 'preset',
              presetDesign: design,
              customText: '',
            });

            return (
              <div
                key={design.id}
                className={`group rounded-2xl p-3 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#009FE3]/15 border-[#00AEEF] ring-2 ring-[#E5007D]/40'
                    : 'bg-[#0B0D13]/90 hover:bg-[#0B0D13] border-white/15 hover:border-[#00AEEF]/60'
                }`}
              >
                <div
                  onClick={() => handleSelectFromLookbook(design)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#11141E] text-[#00AEEF] border border-[#009FE3]/30 font-mono text-[10px] font-bold">
                      {design.code}
                    </span>
                    {design.isAutoDiscovered ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#8CC63F] text-[#0B0D13] font-extrabold text-[9px] uppercase">
                        Nuevo
                      </span>
                    ) : (
                      isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#8CC63F]" />
                      )
                    )}
                  </div>

                  <div className="h-36 rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden border-2 border-white/20 group-hover:border-[#00AEEF]/50 transition">
                    {design.imageUrl && (
                      <img
                        src={design.imageUrl}
                        alt={design.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <h3 className="text-xs font-extrabold text-white mt-2.5 line-clamp-1 group-hover:text-[#00AEEF]">
                    {design.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {design.description}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectFromLookbook(design)}
                    className="py-1.5 px-2 rounded-lg bg-[#E5007D]/20 hover:bg-[#E5007D] text-[#ff66b5] hover:text-white border border-[#E5007D]/35 font-extrabold text-[10px] flex items-center justify-center gap-1 transition"
                  >
                    <Sparkles className="w-3 h-3" />
                    Simular
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-2 rounded-lg bg-[#8CC63F]/20 hover:bg-[#8CC63F] text-[#a8e05f] hover:text-[#0B0D13] border border-[#8CC63F]/35 font-extrabold text-[10px] flex items-center justify-center gap-1 transition"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Pedir
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
