'use client';

import React, { useState } from 'react';
import {
  X,
  Trash2,
  ClipboardList,
  CheckCircle2,
  Download,
  Truck,
  MapPin,
  Instagram,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { DeliveryMethod, OrderCustomerDetails } from '@/types';
import {
  sendOrderToInstagram,
  buildInstagramOrderText,
} from '@/utils/instagram';
import {
  calculateShipping,
  FEDEX_FLAT_RATE_MXN,
  formatCurrencyMx,
} from '@/utils/shipping';
import {
  BOX_DIMENSIONS_STR,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  INSTAGRAM_DIRECT_URL,
} from '@/utils/brand';
import CreativeToolsLogo from './CreativeBrandLogo';

export default function CartDrawer() {
  const {
    orderList,
    isOrderDrawerOpen,
    setOrderDrawerOpen,
    removeFromOrderList,
    updateOrderItemQuantity,
    clearOrderList,
  } = useCustomizerStore();

  const [step, setStep] = useState<'list' | 'details' | 'sent'>('list');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('fedex');
  const [isSending, setIsSending] = useState(false);
  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    fullName: '',
    street: '',
    neighborhood: '',
    postalCode: '',
    phone: '',
    deliveryMethod: 'fedex',
    notes: '',
  });

  if (!isOrderDrawerOpen) return null;

  const totalPieces = orderList.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const shippingInfo = calculateShipping(totalPieces, deliveryMethod);

  const handleSendToInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const customerWithDelivery: OrderCustomerDetails = {
      ...customer,
      deliveryMethod,
    };

    const primaryItem = orderList.find((i) => i.previewDataUrl) || orderList[0];

    try {
      await sendOrderToInstagram({
        items: orderList,
        customer: customerWithDelivery,
        canvasDataUrl: primaryItem?.previewDataUrl || '',
        sourceImageDataUrl: primaryItem?.uploadedImageSrc || null,
        fileNamePrefix: `pedido-freseros-${primaryItem?.code || 'custom'}`,
      });
      setStep('sent');
    } catch {
      setStep('sent');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setOrderDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white text-slate-900 border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="h-1 w-full creative-border-top" />

            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreativeToolsLogo
                  size="sm"
                  showTagline={false}
                  theme="light"
                />
                <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />
                <div className="hidden sm:block">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {step === 'list' && 'Mi Lista de Pedido'}
                    {step === 'details' && 'Datos de Entrega'}
                    {step === 'sent' && 'Pedido Enviado a Instagram'}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Solo Alta Velocidad • {BOX_DIMENSIONS_STR}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOrderDrawerOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {orderList.length === 0 && step !== 'sent' ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto shadow-sm">
                  <ClipboardList className="w-8 h-8 text-[#00AEEF]" />
                </div>
                <p className="text-base font-extrabold text-slate-900">
                  Aún no has agregado freseros a tu pedido
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Elige un modelo del catálogo o personaliza tu diseño con tu
                  logo en el Estudio Láser.
                </p>
                <div className="pt-2">
                  <a
                    href={OFFICIAL_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#E5007D] hover:underline"
                  >
                    <Instagram className="w-4 h-4" />
                    Ver Página de Instagram: {OFFICIAL_INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            ) : step === 'list' ? (
              <>
                {/* Shipping Benefit / Threshold Dynamic Banner */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    shippingInfo.isFreeShipping
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-sky-50/70 border-sky-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        shippingInfo.isFreeShipping
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'bg-sky-100 border-sky-300 text-[#00AEEF]'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      {shippingInfo.isFreeShipping ? (
                        <>
                          <p className="font-black text-emerald-800 uppercase tracking-wider">
                            ¡Envío FedEx GRATIS Aplicado!
                          </p>
                          <p className="text-emerald-700 text-[11px] mt-0.5">
                            Tu pedido tiene {totalPieces} piezas (más de 2
                            piezas califican para envío nacional gratis sin
                            costo adicional).
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            Envío FedEx Nacional:{' '}
                            <span className="text-[#00AEEF]">
                              {formatCurrencyMx(FEDEX_FLAT_RATE_MXN)}
                            </span>
                          </p>
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            Tienes {totalPieces}{' '}
                            {totalPieces === 1 ? 'pieza' : 'piezas'}.{' '}
                            <strong className="text-[#00AEEF]">
                              ¡Agrega {shippingInfo.piecesNeededForFree} pieza(s)
                              más
                            </strong>{' '}
                            para obtener{' '}
                            <strong className="text-emerald-700">
                              ENVÍO GRATIS
                            </strong>{' '}
                            (&gt; 2 piezas).
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>Modelos en tu pedido ({orderList.length}):</span>
                    <span>Total piezas: {totalPieces}</span>
                  </div>

                  {orderList.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5 items-center hover:border-slate-300 transition shadow-sm"
                    >
                      {/* Thumbnail Preview */}
                      {item.previewDataUrl ? (
                        <img
                          src={item.previewDataUrl}
                          alt={item.title}
                          className="w-16 h-16 object-contain rounded-xl border border-slate-200 shrink-0 bg-white p-1"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-xl border border-slate-200 shrink-0 flex items-center justify-center text-[10px] font-mono text-white font-bold text-center p-1"
                          style={{
                            background: `linear-gradient(135deg, ${item.color.highlightHex}, ${item.color.hex})`,
                          }}
                        >
                          {item.code}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold">
                            {item.code}
                          </span>
                          <p className="text-xs font-extrabold text-slate-900 truncate">
                            {item.title}
                          </p>
                        </div>

                        <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                          {item.color.name} • Alta Vel.
                        </p>

                        {item.customText && (
                          <p className="text-[10px] text-slate-500 truncate">
                            Texto: &ldquo;{item.customText}&rdquo;
                          </p>
                        )}

                        {/* Quantity Controls per Item */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Cant:
                          </span>
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderItemQuantity(
                                  item.orderItemId,
                                  Math.max(1, (item.quantity || 1) - 1)
                                )
                              }
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                              title="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-black text-slate-900">
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderItemQuantity(
                                  item.orderItemId,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                              title="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {item.previewDataUrl && (
                            <a
                              href={item.previewDataUrl}
                              download={`fresero-${item.code.toLowerCase()}.png`}
                              className="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-slate-900 hover:underline font-bold ml-auto"
                            >
                              <Download className="w-3 h-3" />
                              Lámina PNG
                            </a>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromOrderList(item.orderItemId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition self-start"
                        title="Quitar modelo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : step === 'details' ? (
              <form
                id="order-form"
                onSubmit={handleSendToInstagram}
                className="space-y-4 text-xs"
              >
                {/* Delivery Method Selection */}
                <div className="space-y-2">
                  <label className="block text-slate-900 font-extrabold uppercase tracking-wider text-[11px]">
                    Método de Entrega:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('fedex')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                        deliveryMethod === 'fedex'
                          ? 'bg-sky-50 border-[#00AEEF] text-slate-900 ring-1 ring-[#00AEEF]'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">
                          Envío Nacional FedEx
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {shippingInfo.isFreeShipping
                            ? '¡GRATIS (>2 pzs)!'
                            : '$150 MXN a todo México'}
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('local')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                        deliveryMethod === 'local'
                          ? 'bg-emerald-50 border-emerald-500 text-slate-900 ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">
                          Entrega Local en Chihuahua
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Municipio de Chihuahua
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 5 Mandatory Shipping Address Fields */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                      Datos Obligatorios de Envío (5 Campos)
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      Requeridos *
                    </span>
                  </div>

                  {/* 1. Nombre completo */}
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      1. Nombre completo *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.fullName}
                      onChange={(e) =>
                        setCustomer({ ...customer, fullName: e.target.value })
                      }
                      placeholder="Ej. Dr. Roberto Mendoza Silva"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                    />
                  </div>

                  {/* 2. Calle y número */}
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      2. Calle y número *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.street}
                      onChange={(e) =>
                        setCustomer({ ...customer, street: e.target.value })
                      }
                      placeholder="Ej. Av. División del Norte #1420 Int. 3B"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                    />
                  </div>

                  {/* 3. Colonia */}
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      3. Colonia *
                    </label>
                    <input
                      required
                      type="text"
                      value={customer.neighborhood}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          neighborhood: e.target.value,
                        })
                      }
                      placeholder="Ej. Col. San Felipe"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* 4. Código postal */}
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">
                        4. Código postal *
                      </label>
                      <input
                        required
                        type="text"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={customer.postalCode}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            postalCode: e.target.value,
                          })
                        }
                        placeholder="Ej. 31203"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                      />
                    </div>

                    {/* 5. Teléfono de contacto */}
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">
                        5. Teléfono de contacto *
                      </label>
                      <input
                        required
                        type="tel"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer({ ...customer, phone: e.target.value })
                        }
                        placeholder="Ej. 614 250 1234"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                      />
                    </div>
                  </div>

                  {/* Notas Adicionales */}
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">
                      Notas adicionales / Indicaciones especiales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={customer.notes}
                      onChange={(e) =>
                        setCustomer({ ...customer, notes: e.target.value })
                      }
                      placeholder="Horarios de clínica, entrecalles o especificaciones del grabado..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition"
                    />
                  </div>
                </div>

                {/* Logistics Summary Pill */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span>Piezas solicitadas:</span>
                    <span className="font-bold text-slate-900">
                      {totalPieces} {totalPieces === 1 ? 'pieza' : 'piezas'}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Logística:</span>
                    <span className="font-bold text-[#00AEEF]">
                      {deliveryMethod === 'fedex'
                        ? shippingInfo.isFreeShipping
                          ? 'FedEx Nacional (GRATIS)'
                          : 'FedEx Nacional ($150 MXN)'
                        : 'Entrega Local Chihuahua'}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Cuenta de Instagram:</span>
                    <span className="font-bold text-[#E5007D]">
                      {OFFICIAL_INSTAGRAM_HANDLE}
                    </span>
                  </div>
                </div>
              </form>
            ) : (
              /* Sent / Confirmation Screen */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900">
                    ¡Pedido Listo para Enviar a Instagram!
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Se abrió la conversación de Instagram con{' '}
                    <strong className="text-slate-900">
                      {OFFICIAL_INSTAGRAM_HANDLE}
                    </strong>
                    . La imagen de tu diseño a grabar se copió automáticamente al
                    portapapeles y se descargó en tu dispositivo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5 text-slate-700">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E5007D]" />
                    ¿Cómo enviar la imagen en Instagram?
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                    <li>
                      En el chat de Instagram, presiona{' '}
                      <strong className="text-slate-900">Pegar (Ctrl+V)</strong>{' '}
                      para adjuntar la imagen copiada.
                    </li>
                    <li>
                      O toca el ícono de imagen/galería y selecciona la imagen
                      descargada.
                    </li>
                    <li>
                      ¡Listo! Te responderemos para confirmar tu pedido y número
                      de guía de FedEx.
                    </li>
                  </ol>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <a
                      href={INSTAGRAM_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-sm hover:bg-slate-800 transition"
                    >
                      <Instagram className="w-4 h-4 text-[#E5007D]" />
                      Abrir Chat de Instagram Direct
                    </a>

                    <a
                      href={OFFICIAL_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver Página de Instagram
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearOrderList();
                    setStep('list');
                    setOrderDrawerOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                >
                  Finalizar y Volver al Catálogo
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer with Actions */}
          {orderList.length > 0 && step !== 'sent' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
              {step === 'list' ? (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-[0.99]"
                >
                  <ClipboardList className="w-4 h-4 text-[#00AEEF]" />
                  Continuar con Datos de Envío ({totalPieces}{' '}
                  {totalPieces === 1 ? 'pieza' : 'piezas'})
                </button>
              ) : (
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStep('list')}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 transition shadow-sm"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    form="order-form"
                    disabled={isSending}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-[0.99] disabled:opacity-50"
                  >
                    <Instagram className="w-4 h-4 text-[#E5007D]" />
                    {isSending
                      ? 'Preparando envío...'
                      : 'Enviar Pedido + Imagen a Instagram'}
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
