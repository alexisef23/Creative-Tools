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
  Zap,
  PackagePlus,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { useCustomizerStore } from '@/hooks/useCustomizerStore';
import { DeliveryMethod, OrderCustomerDetails } from '@/types';
import {
  sendOrderToInstagram,
  buildInstagramOrderText,
  copyOrderTextToClipboard,
  copyImageSrcToClipboard,
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
  getOrderItemUnitPrice,
  PRICE_BOX_ONLY_MXN,
  PRICE_BOX_WITH_BURS_MXN,
  PRICE_EXTRA_BUR_KIT_MXN,
  DENTAL_BUR_FEATURES,
  DENTAL_BUR_SPECS_TITLE,
} from '@/utils/brand';
import CreativeToolsLogo from './CreativeBrandLogo';

export default function CartDrawer() {
  const {
    orderList,
    isOrderDrawerOpen,
    setOrderDrawerOpen,
    removeFromOrderList,
    updateOrderItemQuantity,
    toggleOrderItemBurs,
    addExtraBurKitToOrder,
    clearOrderList,
  } = useCustomizerStore();

  const [step, setStep] = useState<'list' | 'details' | 'sent'>('list');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('fedex');
  const [isSending, setIsSending] = useState(false);
  const [lastOrderText, setLastOrderText] = useState('');
  const [lastImageSrc, setLastImageSrc] = useState('');
  const [copiedTextFeedback, setCopiedTextFeedback] = useState(false);
  const [copiedImageFeedback, setCopiedImageFeedback] = useState(false);
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

  const shippingInfo = calculateShipping(orderList, deliveryMethod);
  const totalPieces = shippingInfo.totalPieces;

  const handleSendToInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const customerWithDelivery: OrderCustomerDetails = {
      ...customer,
      deliveryMethod,
    };

    const primaryItem = orderList.find((i) => i.previewDataUrl) || orderList[0];
    const previewSrc = primaryItem?.previewDataUrl || '';
    const generatedText = buildInstagramOrderText(orderList, customerWithDelivery);
    setLastOrderText(generatedText);
    setLastImageSrc(previewSrc);

    try {
      const result = await sendOrderToInstagram({
        items: orderList,
        customer: customerWithDelivery,
        canvasDataUrl: previewSrc,
        sourceImageDataUrl: primaryItem?.uploadedImageSrc || null,
        fileNamePrefix: `pedido-freseros-${primaryItem?.code || 'custom'}`,
      });
      setCopiedImageFeedback(result.copiedToClipboard);
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
                    {step === 'list' && 'Mi Carrito de Pedido'}
                    {step === 'details' && 'Datos de Entrega'}
                    {step === 'sent' && 'Pedido Enviado a Instagram'}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Solo Fresero ${PRICE_BOX_ONLY_MXN} • Con Fresas $
                    {PRICE_BOX_WITH_BURS_MXN} • {BOX_DIMENSIONS_STR}
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
              <div className="text-center py-14 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto shadow-sm">
                  <ClipboardList className="w-8 h-8 text-[#00AEEF]" />
                </div>
                <p className="text-base font-extrabold text-slate-900">
                  Aún no has agregado freseros a tu pedido
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Elige solo el fresero metálico (${PRICE_BOX_ONLY_MXN} MXN) o
                  cárgalo con fresas dentales FG 1.6 mm (${PRICE_BOX_WITH_BURS_MXN} MXN).
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
                {/* Shipping Promotion Dynamic Banner */}
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
                            {shippingInfo.promoMessage}
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
                            {shippingInfo.promoMessage}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>Productos en tu carrito ({orderList.length}):</span>
                    <span>
                      Subtotal:{' '}
                      <strong className="text-slate-900">
                        {formatCurrencyMx(shippingInfo.subtotalMxn)}
                      </strong>
                    </span>
                  </div>

                  {orderList.map((item) => {
                    const qty = Math.max(1, item.quantity || 1);
                    const unitPrice = getOrderItemUnitPrice(item);
                    const lineSubtotal = unitPrice * qty;
                    const isExtraBurKit = item.itemType === 'extra_burs';
                    const isLoaded = Boolean(item.includesBurs);

                    return (
                      <div
                        key={item.orderItemId}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-300 transition shadow-sm"
                      >
                        <div className="flex gap-3.5 items-start">
                          {/* Thumbnail Preview */}
                          {isExtraBurKit ? (
                            <div className="w-16 h-16 rounded-xl border border-amber-300 bg-amber-50 shrink-0 flex flex-col items-center justify-center text-amber-700 p-1">
                              <Zap className="w-6 h-6 text-amber-500" />
                              <span className="text-[9px] font-black uppercase mt-0.5">
                                Kit Extra
                              </span>
                            </div>
                          ) : item.previewDataUrl ? (
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
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold">
                                    {item.code}
                                  </span>
                                  <p className="text-xs font-extrabold text-slate-900 truncate">
                                    {item.title}
                                  </p>
                                </div>
                                {!isExtraBurKit && (
                                  <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                                    {item.color.name} •{' '}
                                    <span
                                      className={
                                        isLoaded
                                          ? 'text-emerald-700 font-bold'
                                          : 'text-slate-700'
                                      }
                                    >
                                      {isLoaded
                                        ? `Cargado con Fresas ($${PRICE_BOX_WITH_BURS_MXN} c/u)`
                                        : `Solo Fresero ($${PRICE_BOX_ONLY_MXN} c/u)`}
                                    </span>
                                  </p>
                                )}
                                {isExtraBurKit && (
                                  <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                                    FG 1.6 mm • 400,000 RPM (${PRICE_EXTRA_BUR_KIT_MXN} c/u)
                                  </p>
                                )}
                              </div>

                              {/* Precio visible por ítem */}
                              <div className="text-right shrink-0">
                                <p className="text-xs font-black text-slate-900">
                                  ${lineSubtotal} MXN
                                </p>
                                {qty > 1 && (
                                  <p className="text-[10px] text-slate-500">
                                    ${unitPrice} × {qty}
                                  </p>
                                )}
                              </div>
                            </div>

                            {item.customText && !isExtraBurKit && (
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">
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
                                      Math.max(1, qty - 1)
                                    )
                                  }
                                  className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                                  title="Reducir cantidad"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center text-xs font-black text-slate-900">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateOrderItemQuantity(
                                      item.orderItemId,
                                      qty + 1
                                    )
                                  }
                                  className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                                  title="Aumentar cantidad"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {item.previewDataUrl && !isExtraBurKit && (
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
                            onClick={() =>
                              removeFromOrderList(item.orderItemId)
                            }
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition self-start"
                            title="Quitar modelo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Botón dentro del carrito para cargar el fresero con fresas dentales ($549) */}
                        {!isExtraBurKit && (
                          <div className="pt-2 border-t border-slate-200/80 space-y-2">
                            <button
                              type="button"
                              onClick={() =>
                                toggleOrderItemBurs(item.orderItemId)
                              }
                              className={`w-full py-2 px-3 rounded-xl border text-[11px] font-extrabold flex items-center justify-between transition ${
                                isLoaded
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-amber-50 hover:bg-amber-100 text-slate-900 border-amber-300'
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Zap
                                  className={`w-3.5 h-3.5 ${
                                    isLoaded
                                      ? 'text-amber-300'
                                      : 'text-amber-500'
                                  }`}
                                />
                                {isLoaded
                                  ? `✓ Cargado con fresas dentales ($${PRICE_BOX_WITH_BURS_MXN} c/u)`
                                  : `⚡ Cargar con fresas dentales (pasa a $${PRICE_BOX_WITH_BURS_MXN} c/u)`}
                              </span>
                              {isLoaded ? (
                                <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                              )}
                            </button>

                            {/* Texto desbloqueado con las fresas incluidas */}
                            {isLoaded && (
                              <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-[10px] text-slate-700 space-y-1">
                                <p className="font-black text-emerald-950 uppercase tracking-wider">
                                  {DENTAL_BUR_SPECS_TITLE}:
                                </p>
                                <ul className="space-y-0.5">
                                  {DENTAL_BUR_FEATURES.map((f) => (
                                    <li key={f.id}>
                                      <strong className="text-slate-900">
                                        {f.id}. {f.title}:
                                      </strong>{' '}
                                      {f.detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Upsell Card: Agregar Kit de Fresas Extra ($299 MXN) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <PackagePlus className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white">
                        Agregar Kit de Fresas Extra
                      </p>
                      <p className="text-[10px] text-slate-300">
                        FG 1.6 mm • Alta Velocidad 400,000 RPM • Diamante Natural
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addExtraBurKitToOrder(1, true)}
                    className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 transition"
                  >
                    + Agregar (${PRICE_EXTRA_BUR_KIT_MXN})
                  </button>
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
                            ? '¡GRATIS por promoción!'
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

                {/* Logistics & Price Summary Pill */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal ({totalPieces} pzs):</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrencyMx(shippingInfo.subtotalMxn)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Envío:</span>
                    <span className="font-bold text-[#00AEEF]">
                      {deliveryMethod === 'fedex'
                        ? shippingInfo.isFreeShipping
                          ? 'FedEx Nacional (GRATIS)'
                          : 'FedEx Nacional ($150 MXN)'
                        : 'Entrega Local Chihuahua ($0 MXN)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-slate-200 text-sm">
                    <span className="font-black text-slate-900">
                      Total a Pagar:
                    </span>
                    <span className="font-black text-slate-900">
                      {formatCurrencyMx(shippingInfo.totalMxn)}
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

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3 text-slate-700">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E5007D]" />
                    Envía tu pedido + imagen en el chat de Instagram:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                    <li>
                      La imagen de tu fresero ya se{' '}
                      <strong className="text-slate-900">
                        descargó automáticamente
                      </strong>{' '}
                      y se copió al portapapeles. En el chat presiona{' '}
                      <strong className="text-slate-900">Pegar (Ctrl+V)</strong>{' '}
                      o adjunta el archivo descargado.
                    </li>
                    <li>
                      Copia los datos de tu pedido con el botón de abajo y
                      pégalos en el mismo chat.
                    </li>
                  </ol>

                  {/* Botones rápidos para copiar imagen y texto */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await copyOrderTextToClipboard(lastOrderText);
                        if (ok) {
                          setCopiedTextFeedback(true);
                          setTimeout(() => setCopiedTextFeedback(false), 3000);
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-extrabold text-[11px] transition shadow-sm"
                    >
                      {copiedTextFeedback ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ¡Texto Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#00AEEF]" />
                          Copiar Texto del Pedido
                        </>
                      )}
                    </button>

                    {lastImageSrc && (
                      <button
                        type="button"
                        onClick={async () => {
                          const ok = await copyImageSrcToClipboard(lastImageSrc);
                          if (ok) {
                            setCopiedImageFeedback(true);
                            setTimeout(
                              () => setCopiedImageFeedback(false),
                              3000
                            );
                          }
                        }}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-extrabold text-[11px] transition shadow-sm"
                      >
                        {copiedImageFeedback ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ¡Imagen Copiada!
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3.5 h-3.5 text-[#E5007D]" />
                            Copiar Imagen (Ctrl+V)
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
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

          {/* Drawer Footer with Financial Breakdown & Actions */}
          {orderList.length > 0 && step !== 'sent' && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 space-y-3">
              {step === 'list' && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal productos:</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrencyMx(shippingInfo.subtotalMxn)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío FedEx Nacional:</span>
                    <span
                      className={
                        shippingInfo.isFreeShipping
                          ? 'font-black text-emerald-600'
                          : 'font-bold text-slate-900'
                      }
                    >
                      {shippingInfo.isFreeShipping
                        ? 'GRATIS ($0 MXN)'
                        : formatCurrencyMx(shippingInfo.costMxn)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total Estimado:</span>
                    <span>{formatCurrencyMx(shippingInfo.totalMxn)}</span>
                  </div>
                </div>
              )}

              {step === 'list' ? (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-[0.99]"
                >
                  <ClipboardList className="w-4 h-4 text-[#00AEEF]" />
                  Continuar al Envío — {formatCurrencyMx(shippingInfo.totalMxn)}
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
                      : `Enviar Pedido (${formatCurrencyMx(
                          shippingInfo.totalMxn
                        )})`}
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
