'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  ClipboardList,
  MessageCircle,
  CheckCircle2,
  Building2,
  Download,
} from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { OrderCustomerDetails } from '@/types';
import {
  buildOrderListWhatsAppUrl,
  sendOrderWithImageToWhatsApp,
  WHATSAPP_DISPLAY_NUMBER,
} from '@/utils/whatsapp';

export default function CartDrawer() {
  const {
    orderList,
    isOrderDrawerOpen,
    setOrderDrawerOpen,
    removeFromOrderList,
    clearOrderList,
  } = useCustomizerStore();

  const [step, setStep] = useState<'list' | 'details' | 'sent'>('list');
  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    doctorName: '',
    clinicName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  if (!isOrderDrawerOpen) return null;

  const handleSendCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = buildOrderListWhatsAppUrl(orderList, customer);

    // Find first item with a canvas snapshot or image to copy/download automatically
    const primaryItem = orderList.find((i) => i.previewDataUrl) || orderList[0];

    await sendOrderWithImageToWhatsApp({
      whatsappUrl,
      canvasDataUrl: primaryItem?.previewDataUrl || '',
      sourceImageDataUrl: primaryItem?.uploadedImageSrc || null,
      fileNamePrefix: `pedido-freseros-${primaryItem?.code || 'custom'}`,
    });

    setStep('sent');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setOrderDrawerOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/15 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ClipboardList className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-base font-extrabold text-white">
                  {step === 'list' && 'Mi Lista de Pedido de Freseros'}
                  {step === 'details' && 'Datos para Enviar tu Pedido'}
                  {step === 'sent' && '¡Pedido Enviado a WhatsApp!'}
                </h3>
                <p className="text-[11px] text-emerald-400 font-mono">
                  Atención directa: {WHATSAPP_DISPLAY_NUMBER}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOrderDrawerOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {orderList.length === 0 && step !== 'sent' ? (
              <div className="text-center py-16 space-y-3">
                <ClipboardList className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-white">
                  Aún no has agregado diseños a tu pedido
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Selecciona cualquier modelo del catálogo o personaliza tu
                  fresero con tu imagen en el Estudio Láser para enviarlo por
                  WhatsApp.
                </p>
              </div>
            ) : step === 'list' ? (
              orderList.map((item) => (
                <div
                  key={item.orderItemId}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3.5 items-center"
                >
                  {/* Thumbnail Preview */}
                  {item.previewDataUrl ? (
                    <img
                      src={item.previewDataUrl}
                      alt={item.title}
                      className="w-20 h-16 object-contain rounded-xl border border-white/15 shrink-0 bg-white p-1"
                    />
                  ) : (
                    <div
                      className="w-20 h-16 rounded-xl border border-white/20 shrink-0 flex items-center justify-center text-[10px] font-mono text-white font-bold text-center p-1"
                      style={{
                        background: `linear-gradient(135deg, ${item.color.highlightHex}, ${item.color.hex})`,
                      }}
                    >
                      {item.code}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                        {item.code}
                      </span>
                      <p className="text-xs font-bold text-white truncate">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-[11px] text-cyan-300 mt-0.5">
                      Color Fresero: {item.color.name}
                    </p>
                    {item.customText && (
                      <p className="text-[10px] text-slate-400 truncate">
                        Texto: &ldquo;{item.customText}&rdquo;
                      </p>
                    )}

                    {item.previewDataUrl && (
                      <a
                        href={item.previewDataUrl}
                        download={`fresero-${item.code.toLowerCase()}.png`}
                        className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline mt-1 font-semibold"
                      >
                        <Download className="w-3 h-3" />
                        Descargar imagen a grabar
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromOrderList(item.orderItemId)}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                    title="Quitar de la lista"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : step === 'details' ? (
              <form
                id="order-form"
                onSubmit={handleSendCompleteOrder}
                className="space-y-3.5 text-xs"
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-200">
                  <Building2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Sin pagos en línea: Tu pedido y la imagen a grabar se envían
                    directamente a nuestro WhatsApp{' '}
                    <strong>{WHATSAPP_DISPLAY_NUMBER}</strong>.
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nombre del Doctor(a) *
                  </label>
                  <input
                    required
                    type="text"
                    value={customer.doctorName}
                    onChange={(e) =>
                      setCustomer({ ...customer, doctorName: e.target.value })
                    }
                    placeholder="Ej. Dr. Alejandro Vega"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Clínica Dental / Consultorio
                  </label>
                  <input
                    type="text"
                    value={customer.clinicName}
                    onChange={(e) =>
                      setCustomer({ ...customer, clinicName: e.target.value })
                    }
                    placeholder="Ej. Vega Dental Studio"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Tu WhatsApp / Teléfono *
                    </label>
                    <input
                      required
                      type="tel"
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer({ ...customer, phone: e.target.value })
                      }
                      placeholder="Ej. 614 123 4567"
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Ciudad / Estado *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.city}
                      onChange={(e) =>
                        setCustomer({ ...customer, city: e.target.value })
                      }
                      placeholder="Ej. Chihuahua, Chih."
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Dirección o Sucursal de Entrega (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                    placeholder="Calle, número, colonia y código postal"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Comentarios o Detalles del Grabado (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({ ...customer, notes: e.target.value })
                    }
                    placeholder="Indica cualquier detalle especial sobre tu imagen o logo..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white"
                  />
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-extrabold text-white">
                  ¡Tu Pedido e Imagen están Listos!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Se abrió la ventana de WhatsApp con el número{' '}
                  <span className="text-emerald-400 font-bold">
                    {WHATSAPP_DISPLAY_NUMBER}
                  </span>{' '}
                  y la imagen de tu diseño se copió automáticamente al
                  portapapeles y se descargó en tu dispositivo. Solo presiona{' '}
                  <strong className="text-white">Ctrl + V (Pegar)</strong> en el
                  chat de WhatsApp para adjuntar la imagen a grabar.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearOrderList();
                    setStep('list');
                    setOrderDrawerOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition"
                >
                  Cerrar y Volver al Estudio
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {orderList.length > 0 && step !== 'sent' && (
            <div className="p-5 border-t border-white/10 bg-zinc-900/70 space-y-3">
              {step === 'list' ? (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 font-extrabold text-sm shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-zinc-950" />
                  Continuar para Enviar Pedido por WhatsApp
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('list')}
                    className="px-4 py-3 rounded-xl bg-white/5 text-xs font-bold text-slate-300"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    form="order-form"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-zinc-950" />
                    Enviar Pedido + Imagen al {WHATSAPP_DISPLAY_NUMBER}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
