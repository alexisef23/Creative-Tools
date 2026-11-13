'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Crosshair,
  Copy,
  Check,
  FlipHorizontal2,
  Sparkles,
} from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { LaserFinishMode } from '@/types';

const CANVAS_WIDTH = 760;
const CANVAS_HEIGHT = 460;

// Expanded Laser Engraving Zone Coordinates on the Clean Aluminum Lid
const ENGRAVE_ZONE = {
  x: 115,
  y: 72,
  width: 530,
  height: 252,
};

export default function LaserCanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadedImgObjRef = useRef<HTMLImageElement | null>(null);
  const presetImgObjRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showBoundingGuides, setShowBoundingGuides] = useState(true);
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const {
    selectedColor,
    designMode,
    selectedPreset,
    uploadedImageSrc,
    transform,
    updateTransform,
    resetTransform,
    setLatestCanvasSnapshot,
  } = useCustomizerStore();

  // Load uploaded image into an HTMLImageElement whenever uploadedImageSrc changes
  useEffect(() => {
    if (!uploadedImageSrc) {
      uploadedImgObjRef.current = null;
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      uploadedImgObjRef.current = img;
      renderCanvas();
    };
    img.src = uploadedImageSrc;
  }, [uploadedImageSrc]);

  // Load reference catalog preset image whenever selectedPreset.imageUrl changes
  useEffect(() => {
    if (!selectedPreset.imageUrl) {
      presetImgObjRef.current = null;
      renderCanvas();
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      presetImgObjRef.current = img;
      renderCanvas();
    };
    img.src = selectedPreset.imageUrl;
  }, [selectedPreset]);

  // Helper: convert an HTMLImageElement (from Catalogo or Custom Upload) into a metallic laser stencil
  const drawLaserEtchedImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    options: {
      isReferenceCatalog: boolean;
      threshold: number;
      invert: boolean;
      laserTintHex: string;
      laserFinish: LaserFinishMode;
    }
  ) => {
    const maxW = 390;
    const maxH = 220;
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const drawW = Math.max(1, Math.round(img.width * ratio));
    const drawH = Math.max(1, Math.round(img.height * ratio));

    const offCanvas = document.createElement('canvas');
    offCanvas.width = drawW;
    offCanvas.height = drawH;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.drawImage(img, 0, 0, drawW, drawH);
    const imgData = offCtx.getImageData(0, 0, drawW, drawH);
    const data = imgData.data;

    // Parse laserTint hex to RGB based on laserFinish mode
    let rTint = 244;
    let gTint = 244;
    let bTint = 245;

    if (options.laserFinish === 'bright') {
      rTint = 255;
      gTint = 255;
      bTint = 255;
    } else if (options.laserFinish === 'deep') {
      rTint = 203;
      gTint = 213;
      bTint = 225;
    } else {
      const hex = options.laserTintHex.replace('#', '');
      rTint = parseInt(hex.substring(0, 2), 16) || 242;
      gTint = parseInt(hex.substring(2, 4), 16) || 245;
      bTint = parseInt(hex.substring(4, 6), 16) || 249;
    }

    // Sample background color slightly inside the corners
    const insetX = Math.max(2, Math.floor(drawW * 0.06));
    const insetY = Math.max(2, Math.floor(drawH * 0.06));
    const sampleIdx = (insetY * drawW + insetX) * 4;
    const bgR = data[sampleIdx];
    const bgG = data[sampleIdx + 1];
    const bgB = data[sampleIdx + 2];

    for (let y = 0; y < drawH; y++) {
      for (let x = 0; x < drawW; x++) {
        const p = (y * drawW + x) * 4;
        const alpha = data[p + 3];

        // Skip outer frame border on reference cards if within 3% of edge
        if (
          options.isReferenceCatalog &&
          (x < drawW * 0.03 ||
            x > drawW * 0.97 ||
            y < drawH * 0.03 ||
            y > drawH * 0.97)
        ) {
          data[p + 3] = 0;
          continue;
        }

        if (alpha < 32) {
          data[p + 3] = 0;
          continue;
        }

        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        if (options.isReferenceCatalog) {
          const dist = Math.sqrt(
            (r - bgR) * (r - bgR) +
              (g - bgG) * (g - bgG) +
              (b - bgB) * (b - bgB)
          );
          if (dist > 68) {
            const intensity = Math.min(1, (dist - 50) / 140);
            data[p] = rTint;
            data[p + 1] = gTint;
            data[p + 2] = bTint;
            data[p + 3] = Math.round(255 * intensity);
          } else {
            data[p + 3] = 0;
          }
        } else {
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const shouldEngrave = options.invert
            ? lum > options.threshold
            : lum < options.threshold;

          if (shouldEngrave) {
            data[p] = rTint;
            data[p + 1] = gTint;
            data[p + 2] = bTint;
            data[p + 3] = Math.min(255, Math.round(alpha * 0.95));
          } else {
            data[p + 3] = 0;
          }
        }
      }
    }

    offCtx.putImageData(imgData, 0, 0);
    ctx.drawImage(offCanvas, -drawW / 2, -drawH / 2, drawW, drawH);
  };

  // Core 60fps HTML5 Canvas Render Pipeline
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Dark Studio Background Grid
    const bgGrad = ctx.createRadialGradient(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      40,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      420
    );
    bgGrad.addColorStop(0, '#1e293b');
    bgGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Subtle CAD grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < CANVAS_WIDTH; gx += 28) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let gy = 0; gy < CANVAS_HEIGHT; gy += 28) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(CANVAS_WIDTH, gy);
      ctx.stroke();
    }

    // 2. Outer Drop Shadow of the Anodized Aluminum Bur Box
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 18;

    const boxX = 70;
    const boxY = 36;
    const boxW = 620;
    const boxH = 388;
    const radius = 28;

    // Metallic Anodized Linear Gradient
    const metalGrad = ctx.createLinearGradient(
      boxX,
      boxY,
      boxX + boxW,
      boxY + boxH
    );
    metalGrad.addColorStop(0, selectedColor.highlightHex);
    metalGrad.addColorStop(0.45, selectedColor.hex);
    metalGrad.addColorStop(0.88, selectedColor.secondaryHex);
    metalGrad.addColorStop(1, selectedColor.hex);

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, radius);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.restore();

    // 3. Brushed Aluminum Horizontal Micro-Grain Texture
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, radius);
    ctx.clip();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.lineWidth = 1;
    for (let lineY = boxY; lineY < boxY + boxH; lineY += 3) {
      ctx.beginPath();
      ctx.moveTo(boxX, lineY);
      ctx.lineTo(boxX + boxW, lineY);
      ctx.stroke();
    }

    // Diagonal metallic specular reflection band
    const sheenGrad = ctx.createLinearGradient(
      boxX,
      boxY,
      boxX + boxW * 0.85,
      boxY + boxH
    );
    sheenGrad.addColorStop(0, 'rgba(255,255,255,0.16)');
    sheenGrad.addColorStop(0.35, 'rgba(255,255,255,0.02)');
    sheenGrad.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    sheenGrad.addColorStop(0.75, 'rgba(255,255,255,0.08)');
    sheenGrad.addColorStop(1, 'rgba(0,0,0,0.22)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.restore();

    // 4. CNC Chamfered Inner Rim Border
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(boxX + 8, boxY + 8, boxW - 16, boxH - 16, radius - 5);
    ctx.stroke();
    ctx.restore();

    // 5. Top Subtle Laser Etched Header on Lid
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
    ctx.font = '600 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      'CREATIVE TOOLS • ALTA VELOCIDAD (7.3×2.8×2.5cm)',
      boxX + 26,
      boxY + 25
    );
    ctx.textAlign = 'right';
    ctx.fillText('AUTOCLAVABLE 134°C', boxX + boxW - 26, boxY + 25);
    ctx.restore();

    // 6. Clipped Laser Engraving Area on the Main Aluminum Lid
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(
      ENGRAVE_ZONE.x,
      ENGRAVE_ZONE.y,
      ENGRAVE_ZONE.width,
      ENGRAVE_ZONE.height,
      14
    );
    ctx.clip();

    // Subtle recessed lid panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
    ctx.fillRect(
      ENGRAVE_ZONE.x,
      ENGRAVE_ZONE.y,
      ENGRAVE_ZONE.width,
      ENGRAVE_ZONE.height
    );

    // Compute user transform coordinates inside the engraving zone
    const centerX =
      ENGRAVE_ZONE.x +
      ENGRAVE_ZONE.width / 2 +
      (transform.x / 100) * (ENGRAVE_ZONE.width * 0.36);
    const centerY =
      ENGRAVE_ZONE.y +
      ENGRAVE_ZONE.height / 2 +
      (transform.y / 100) * (ENGRAVE_ZONE.height * 0.36);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(
      transform.flipHorizontal ? -transform.scale : transform.scale,
      transform.scale
    );

    // Authentic Fiber-Laser Etching Filter
    ctx.shadowColor =
      transform.laserFinish === 'deep'
        ? 'rgba(0, 0, 0, 0.95)'
        : 'rgba(0, 0, 0, 0.78)';
    ctx.shadowBlur = transform.laserFinish === 'deep' ? 3.5 : 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = transform.laserFinish === 'deep' ? 2.2 : 1.5;

    if (designMode === 'preset') {
      if (selectedPreset.imageUrl && presetImgObjRef.current) {
        drawLaserEtchedImage(ctx, presetImgObjRef.current, {
          isReferenceCatalog: true,
          threshold: transform.contrastThreshold,
          invert: false,
          laserTintHex: selectedColor.laserTint,
          laserFinish: transform.laserFinish,
        });
      } else if (selectedPreset.svgPaths) {
        ctx.translate(-120, -70);
        ctx.strokeStyle =
          transform.laserFinish === 'bright'
            ? '#ffffff'
            : selectedColor.laserTint;
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        selectedPreset.svgPaths.forEach((pathStr) => {
          const path2d = new Path2D(pathStr);
          ctx.stroke(path2d);
        });
      }
    } else if (designMode === 'upload' && uploadedImgObjRef.current) {
      drawLaserEtchedImage(ctx, uploadedImgObjRef.current, {
        isReferenceCatalog: false,
        threshold: transform.contrastThreshold,
        invert: transform.invertUpload,
        laserTintHex: selectedColor.laserTint,
        laserFinish: transform.laserFinish,
      });
    }

    ctx.restore();
    ctx.restore();

    // 7. Interactive Bounding Box & Laser Coordinates Overlay
    if (showBoundingGuides) {
      ctx.save();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.55)';
      ctx.lineWidth = 1.25;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(
        ENGRAVE_ZONE.x,
        ENGRAVE_ZONE.y,
        ENGRAVE_ZONE.width,
        ENGRAVE_ZONE.height
      );
      ctx.setLineDash([]);

      // Corner registration marks
      const cornerLen = 12;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.2;
      const corners = [
        [ENGRAVE_ZONE.x, ENGRAVE_ZONE.y, 1, 1],
        [ENGRAVE_ZONE.x + ENGRAVE_ZONE.width, ENGRAVE_ZONE.y, -1, 1],
        [ENGRAVE_ZONE.x, ENGRAVE_ZONE.y + ENGRAVE_ZONE.height, 1, -1],
        [
          ENGRAVE_ZONE.x + ENGRAVE_ZONE.width,
          ENGRAVE_ZONE.y + ENGRAVE_ZONE.height,
          -1,
          -1,
        ],
      ];
      corners.forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * cornerLen);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * cornerLen, cy);
        ctx.stroke();
      });

      ctx.fillStyle = '#22d3ee';
      ctx.font = '600 10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        `ÁREA LÁSER • REF: ${
          designMode === 'preset' ? selectedPreset.code : 'LOGO PROPIO'
        } • ESC:${Math.round(transform.scale * 100)}% ROT:${transform.rotation}°`,
        ENGRAVE_ZONE.x + 8,
        ENGRAVE_ZONE.y - 7
      );
      ctx.restore();
    }

    // 8. Custom Doctor / Clinic Name + Dental Specialty Laser Engraving & Endodontic Ruler
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.78)';
    ctx.shadowBlur = 2;
    ctx.fillStyle =
      transform.laserFinish === 'bright' ? '#ffffff' : selectedColor.laserTint;
    ctx.font = `700 14px ${transform.fontFamily}`;
    ctx.textAlign = 'center';
    const customLabel =
      transform.customText.trim() || 'CREATIVE TOOLS • MEDICAL GRADE';
    ctx.fillText(
      customLabel.toUpperCase(),
      CANVAS_WIDTH / 2,
      boxY + boxH - 58
    );

    if (transform.specialtyTag.trim()) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      ctx.font = '600 10px monospace';
      ctx.fillText(
        `• ${transform.specialtyTag.trim().toUpperCase()} •`,
        CANVAS_WIDTH / 2,
        boxY + boxH - 42
      );
    }

    // Millimeter Endodontic Ruler at very bottom of box
    const rulerLeft = boxX + 85;
    const rulerRight = boxX + boxW - 85;
    const rulerY = boxY + boxH - 18;
    ctx.strokeStyle = 'rgba(255,255,255,0.68)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(rulerLeft, rulerY);
    ctx.lineTo(rulerRight, rulerY);
    ctx.stroke();

    const totalTicks = 30;
    const tickSpacing = (rulerRight - rulerLeft) / totalTicks;
    ctx.font = '600 8px monospace';
    for (let t = 0; t <= totalTicks; t++) {
      const tx = rulerLeft + t * tickSpacing;
      const isMajor = t % 5 === 0;
      ctx.beginPath();
      ctx.moveTo(tx, rulerY);
      ctx.lineTo(tx, rulerY - (isMajor ? 7 : 4));
      ctx.stroke();
      if (t % 10 === 0) {
        ctx.fillText(`${t}mm`, tx, rulerY - 9);
      }
    }
    ctx.restore();

    // Save low-overhead dataURL snapshot for Order & WhatsApp dispatch
    try {
      const snapshot = canvas.toDataURL('image/png');
      setLatestCanvasSnapshot(snapshot);
    } catch {
      // Ignore cross-origin taint if any
    }
  }, [
    selectedColor,
    designMode,
    selectedPreset,
    transform,
    showBoundingGuides,
    setLatestCanvasSnapshot,
  ]);

  useEffect(() => {
    const id = requestAnimationFrame(renderCanvas);
    return () => cancelAnimationFrame(id);
  }, [renderCanvas]);

  // Pointer Drag Handlers for Direct Canvas Repositioning
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragStart({ x: e.clientX, y: e.clientY });

    updateTransform({
      x: Math.max(-95, Math.min(95, Math.round(transform.x + dx * 0.55))),
      y: Math.max(-95, Math.min(95, Math.round(transform.y + dy * 0.55))),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `fresero-pedido-${
      designMode === 'preset' ? selectedPreset.code : 'custom'
    }-${selectedColor.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyImageToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      if (navigator.clipboard && 'ClipboardItem' in window) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedFeedback(true);
        setTimeout(() => setCopiedFeedback(false), 3000);
      }
    } catch {
      handleDownloadSnapshot();
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-white">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Simulador Láser •{' '}
            {designMode === 'preset'
              ? `${selectedPreset.code} (${selectedPreset.title})`
              : 'Tu Logo Personalizado'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              updateTransform({ flipHorizontal: !transform.flipHorizontal })
            }
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              transform.flipHorizontal
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
            }`}
            title="Invertir horizontalmente (Espejo)"
          >
            <FlipHorizontal2 className="w-3.5 h-3.5" />
            Espejo
          </button>

          <button
            type="button"
            onClick={() => setShowBoundingGuides((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showBoundingGuides
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            Guías
          </button>

          <button
            type="button"
            onClick={handleCopyImageToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 transition"
          >
            {copiedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                ¡Copiada!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar Imagen
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadSnapshot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Guardar PNG
          </button>
        </div>
      </div>

      {/* Laser Finish Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-zinc-950/70 border border-white/10">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Acabado del Haz Láser:
        </span>
        <div className="flex items-center gap-1.5">
          {(
            [
              { id: 'silver', label: 'Plata Satinado' },
              { id: 'bright', label: 'Blanco Alto Contraste' },
              { id: 'deep', label: 'Grabado Profundo' },
            ] as { id: LaserFinishMode; label: string }[]
          ).map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => updateTransform({ laserFinish: mode.id })}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                transform.laserFinish === mode.id
                  ? 'bg-cyan-400 text-zinc-950'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive HTML5 Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-inner">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-auto block cursor-grab active:cursor-grabbing touch-none select-none"
        />

        <div className="pointer-events-none absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-zinc-950/80 border border-white/10 text-[11px] text-slate-300 flex items-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-cyan-400" />
          Arrastra directamente sobre la tapa para acomodar el diseño a grabar
        </div>
      </div>

      {/* Precision Bounding-Box Controls (Scale, Rotation, Reset) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Scale Control */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="flex items-center gap-1 font-semibold">
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
              Tamaño del Grabado
            </span>
            <span className="font-mono text-cyan-300">
              {Math.round(transform.scale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.4"
            max="1.8"
            step="0.05"
            value={transform.scale}
            onChange={(e) =>
              updateTransform({ scale: parseFloat(e.target.value) })
            }
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Rotation Control */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="flex items-center gap-1 font-semibold">
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              Rotación Angular
            </span>
            <span className="font-mono text-cyan-300">
              {transform.rotation}°
            </span>
          </div>
          <input
            type="range"
            min="-45"
            max="45"
            step="1"
            value={transform.rotation}
            onChange={(e) =>
              updateTransform({ rotation: parseInt(e.target.value, 10) })
            }
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Reset Position / Quick Zoom Buttons */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() =>
              updateTransform({
                scale: Math.max(0.4, +(transform.scale - 0.1).toFixed(2)),
              })
            }
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
            title="Reducir escala"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              updateTransform({
                scale: Math.min(1.8, +(transform.scale + 0.1).toFixed(2)),
              })
            }
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
            title="Aumentar escala"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetTransform}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 text-xs font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Centrar
          </button>
        </div>
      </div>
    </div>
  );
}
