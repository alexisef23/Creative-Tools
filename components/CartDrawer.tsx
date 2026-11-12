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
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { DeliveryMethod, OrderCustomerDetails } from '@/types';
import {
  buildOrderListWhatsAppUrl,
  sendOrderWithImageToWhatsApp,
} from '@/utils/whatsapp';
import {
  calculateShipping,
  FEDEX_FLAT_RATE_MXN,
  formatCurrencyMx,
} from '@/utils/shipping';
import {
  BOX_DIMENSIONS_STR,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
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

  const handleSendCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const customerWithDelivery: OrderCustomerDetails = {
      ...customer,
      deliveryMethod,
    };

    const whatsappUrl = buildOrderListWhatsAppUrl(
      orderList,
      customerWithDelivery
    );

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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#0B0D13] border-l border-white/15 shadow-2xl flex flex-col justify-between">
          {/* Top Spectrum Strip & Header with Logo */}
          <div>
            <div className="h-1.5 w-full creative-border-top" />

            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#11141E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreativeToolsLogo size="sm" showTagline={false} />
                <div className="h-6 w-[1px] bg-white/15 hidden sm:block" />
                <div className="hidden sm:block">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">
                    {step === 'list' && 'Mi Lista de Pedido'}
                    {step === 'details' && 'Datos de Entrega'}
                    {step === 'sent' && 'Pedido Preparado'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Solo Alta Velocidad • {BOX_DIMENSIONS_STR}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOrderDrawerOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-[#E5007D] text-slate-400 hover:text-white transition"
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
                <div className="w-16 h-16 rounded-2xl bg-[#11141E] border border-white/15 flex items-center justify-center mx-auto shadow-laser-neon">
                  <ClipboardList className="w-8 h-8 text-[#00AEEF]" />
                </div>
                <p className="text-base font-extrabold text-white">
                  Aún no has agregado freseros a tu pedido
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
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
                    Consultas en Instagram: {OFFICIAL_INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            ) : step === 'list' ? (
              <>
                {/* Shipping Benefit / Threshold Dynamic Banner */}
                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    shippingInfo.isFreeShipping
                      ? 'bg-[#8CC63F]/15 border-[#8CC63F]/50 text-[#a8e05f]'
                      : 'bg-gradient-to-r from-[#009FE3]/15 via-[#F39200]/10 to-[#11141E] border-[#009FE3]/35 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        shippingInfo.isFreeShipping
                          ? 'bg-[#8CC63F]/20 border-[#8CC63F] text-[#8CC63F]'
                          : 'bg-[#009FE3]/20 border-[#009FE3] text-[#00AEEF]'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      {shippingInfo.isFreeShipping ? (
                        <>
                          <p className="font-black text-[#8CC63F] uppercase tracking-wider">
                            ¡Envío FedEx GRATIS Aplicado!
                          </p>
                          <p className="text-slate-300 text-[11px] mt-0.5">
                            Tu pedido tiene {totalPieces} piezas (más de 2
                            piezas califican para envío nacional gratis sin
                            costo adicional).
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                            Envío FedEx Nacional:{' '}
                            <span className="text-[#F39200]">
                              {formatCurrencyMx(FEDEX_FLAT_RATE_MXN)}
                            </span>
                          </p>
                          <p className="text-slate-300 text-[11px] mt-0.5">
                            Tienes {totalPieces}{' '}
                            {totalPieces === 1 ? 'pieza' : 'piezas'}.{' '}
                            <strong className="text-[#00AEEF]">
                              ¡Agrega {shippingInfo.piecesNeededForFree} pieza(s)
                              más
                            </strong>{' '}
                            para obtener{' '}
                            <strong className="text-[#8CC63F]">
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
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                    <span>Modelos en tu pedido ({orderList.length}):</span>
                    <span>Total piezas: {totalPieces}</span>
                  </div>

                  {orderList.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="p-3.5 rounded-2xl bg-[#11141E] border border-white/15 flex gap-3.5 items-center hover:border-white/25 transition"
                    >
                      {/* Thumbnail Preview */}
                      {item.previewDataUrl ? (
                        <img
                          src={item.previewDataUrl}
                          alt={item.title}
                          className="w-16 h-16 object-contain rounded-xl border border-[#00AEEF]/40 shrink-0 bg-white p-1"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-xl border border-white/20 shrink-0 flex items-center justify-center text-[10px] font-mono text-white font-bold text-center p-1"
                          style={{
                            background: `linear-gradient(135deg, ${item.color.highlightHex}, ${item.color.hex})`,
                          }}
                        >
                          {item.code}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#009FE3]/20 text-[#00AEEF] font-mono text-[10px] font-bold">
                            {item.code}
                          </span>
                          <p className="text-xs font-extrabold text-white truncate">
                            {item.title}
                          </p>
                        </div>

                        <p className="text-[11px] text-[#F39200] font-semibold mt-0.5">
                          {item.color.name} • Alta Vel.
                        </p>

                        {item.customText && (
                          <p className="text-[10px] text-slate-400 truncate">
                            Texto: &ldquo;{item.customText}&rdquo;
                          </p>
                        )}

                        {/* Quantity Controls per Item */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Cant:
                          </span>
                          <div className="flex items-center bg-[#0B0D13] border border-white/10 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateOrderItemQuantity(
                                  item.orderItemId,
                                  Math.max(1, (item.quantity || 1) - 1)
                                )
                              }
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition"
                              title="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-black text-white">
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
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition"
                              title="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {item.previewDataUrl && (
                            <a
                              href={item.previewDataUrl}
                              download={`fresero-${item.code.toLowerCase()}.png`}
                              className="inline-flex items-center gap-1 text-[10px] text-[#8CC63F] hover:underline font-bold ml-auto"
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
                        className="p-1.5 text-slate-400 hover:text-[#E5007D] transition self-start"
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
                onSubmit={handleSendCompleteOrder}
                className="space-y-4 text-xs"
              >
                {/* Delivery Method Selection */}
                <div className="space-y-2">
                  <label className="block text-slate-200 font-extrabold uppercase tracking-wider text-[11px]">
                    Método de Entrega:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('fedex')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                        deliveryMethod === 'fedex'
                          ? 'bg-[#009FE3]/15 border-[#00AEEF] text-white ring-1 ring-[#00AEEF]'
                          : 'bg-[#11141E] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-xs">
                          Envío Nacional FedEx
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
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
                          ? 'bg-[#8CC63F]/15 border-[#8CC63F] text-white ring-1 ring-[#8CC63F]'
                          : 'bg-[#11141E] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#8CC63F] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-xs">
                          Entrega Local en Chihuahua
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Municipio de Chihuahua
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 5 Mandatory Shipping Address Fields */}
                <div className="p-4 rounded-2xl bg-[#11141E] border border-white/15 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#00AEEF]">
                      Datos Obligatorios de Envío (5 Campos)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Requeridos *
                    </span>
                  </div>

                  {/* 1. Nombre completo */}
                  <div>
                    <label className="block text-slate-200 font-bold mb-1">
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
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>

                  {/* 2. Calle y número */}
                  <div>
                    <label className="block text-slate-200 font-bold mb-1">
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
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>

                  {/* 3. Colonia */}
                  <div>
                    <label className="block text-slate-200 font-bold mb-1">
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
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* 4. Código postal */}
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">
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
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>

                    {/* 5. Teléfono de contacto */}
                    <div>
                      <label className="block text-slate-200 font-bold mb-1">
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
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>
                  </div>

                  {/* Notas Adicionales */}
                  <div>
                    <label className="block text-slate-200 font-bold mb-1">
                      Notas adicionales / Indicaciones especiales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={customer.notes}
                      onChange={(e) =>
                        setCustomer({ ...customer, notes: e.target.value })
                      }
                      placeholder="Horarios de clínica, entrecalles o especificaciones del grabado..."
                      className="w-full px-3 py-2 rounded-xl bg-[#0B0D13] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>

                {/* Logistics Summary Pill */}
                <div className="p-3.5 rounded-xl bg-[#0B0D13] border border-white/10 space-y-1 text-slate-300">
                  <div className="flex justify-between font-medium">
                    <span>Piezas solicitadas:</span>
                    <span className="font-bold text-white">
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
                    <span>Atención y consultas:</span>
                    <span className="font-bold text-[#E5007D]">
                      {OFFICIAL_INSTAGRAM_HANDLE}
                    </span>
                  </div>
                </div>
              </form>
            ) : (
              /* Sent / Confirmation Screen */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#8CC63F]/20 border border-[#8CC63F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-[#8CC63F]" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">
                    ¡Pedido Preparado con Éxito!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                    Tu pedido con los 5 datos de entrega, el desglose de piezas
                    ({totalPieces}) y la logística de envío se envió al sistema.
                    La imagen a grabar se copió a tu portapapeles y se descargó
                    en tu dispositivo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#11141E] border border-white/15 text-left text-xs space-y-2 text-slate-300">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#F39200]" />
                    Canal Oficial de Seguimiento:
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Para confirmar el status de tu paquete o resolver dudas de
                    tu grabado, contáctanos en nuestro Instagram oficial:
                  </p>
                  <a
                    href={OFFICIAL_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5007D]/20 via-[#F39200]/20 to-[#00AEEF]/20 border border-white/20 text-white font-extrabold text-xs hover:brightness-110 transition mt-1"
                  >
                    <Instagram className="w-4 h-4 text-[#E5007D]" />
                    {OFFICIAL_INSTAGRAM_HANDLE}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearOrderList();
                    setStep('list');
                    setOrderDrawerOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition"
                >
                  Finalizar y Volver al Catálogo
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer with Actions */}
          {orderList.length > 0 && step !== 'sent' && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#11141E] space-y-3">
              {step === 'list' ? (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#E5007D] via-[#F39200] to-[#009FE3] text-white font-black text-xs sm:text-sm shadow-laser-neon hover:brightness-110 active:scale-[0.99] transition"
                >
                  <ClipboardList className="w-4 h-4" />
                  Continuar con Datos de Envío ({totalPieces}{' '}
                  {totalPieces === 1 ? 'pieza' : 'piezas'})
                </button>
              ) : (
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStep('list')}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    form="order-form"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#8CC63F] via-[#76B82A] to-[#009FE3] text-[#0B0D13] font-black text-xs sm:text-sm shadow-lime-neon hover:brightness-110 active:scale-[0.99] transition"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0B0D13]" />
                    Confirmar y Enviar Pedido
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
