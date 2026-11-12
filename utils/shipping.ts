import { DeliveryMethod, OrderItem } from '@/types';

// ==================== POLÍTICA DE ENVÍOS ====================
export const FEDEX_NATIONAL_RATE_MXN = 150;
export const FEDEX_FLAT_RATE_MXN = FEDEX_NATIONAL_RATE_MXN;

/** El envío es gratis cuando el pedido tiene MÁS de este número de piezas (> 2). */
export const FREE_SHIPPING_MIN_EXCLUSIVE = 2;
export const LOCAL_CITY_LABEL = 'municipio de Chihuahua';

export interface ShippingQuote {
  totalPieces: number;
  method: DeliveryMethod;
  costMxn: number;
  shippingCost: number;
  isFree: boolean;
  isFreeShipping: boolean;
  label: string;
  /** Piezas que faltan para obtener envío gratis (0 si ya aplica). */
  piecesToFreeShipping: number;
  piecesNeededForFree: number;
}

export function countPieces(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + Math.max(1, item.quantity || 1), 0);
}

export function qualifiesForFreeShipping(totalPieces: number): boolean {
  return totalPieces > FREE_SHIPPING_MIN_EXCLUSIVE;
}

export function calculateShipping(
  itemsOrCount: OrderItem[] | number,
  method: DeliveryMethod = 'fedex'
): ShippingQuote {
  const totalPieces =
    typeof itemsOrCount === 'number'
      ? Math.max(0, itemsOrCount)
      : countPieces(itemsOrCount);

  const piecesToFreeShipping = qualifiesForFreeShipping(totalPieces)
    ? 0
    : Math.max(0, FREE_SHIPPING_MIN_EXCLUSIVE + 1 - totalPieces);

  if (method === 'local') {
    return {
      totalPieces,
      method,
      costMxn: 0,
      shippingCost: 0,
      isFree: true,
      isFreeShipping: true,
      label: `Entrega / recolección local (${LOCAL_CITY_LABEL}) — se acuerda por Instagram`,
      piecesToFreeShipping,
      piecesNeededForFree: piecesToFreeShipping,
    };
  }

  const isFree = qualifiesForFreeShipping(totalPieces);
  const costMxn = isFree ? 0 : FEDEX_NATIONAL_RATE_MXN;

  return {
    totalPieces,
    method,
    costMxn,
    shippingCost: costMxn,
    isFree,
    isFreeShipping: isFree,
    label: isFree
      ? 'Envío nacional FedEx — GRATIS (más de 2 piezas)'
      : `Envío nacional FedEx — $${FEDEX_NATIONAL_RATE_MXN} MXN`,
    piecesToFreeShipping,
    piecesNeededForFree: piecesToFreeShipping,
  };
}

export function formatMxn(amount: number): string {
  return amount === 0 ? '$0 MXN' : `$${amount.toLocaleString('es-MX')} MXN`;
}

export const formatCurrencyMx = formatMxn;


