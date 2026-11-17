import { DeliveryMethod, OrderItem } from '@/types';
import {
  getOrderItemUnitPrice,
  PRICE_BOX_ONLY_MXN,
  PRICE_BOX_WITH_BURS_MXN,
} from './brand';

// ==================== POLÍTICA DE ENVÍOS ====================
export const FEDEX_NATIONAL_RATE_MXN = 150;
export const FEDEX_FLAT_RATE_MXN = FEDEX_NATIONAL_RATE_MXN;

/** Mínimo de freseros cargados ($549) para envío gratis: 2 piezas. */
export const FREE_SHIPPING_MIN_LOADED_BOXES = 2;
/** Mínimo de freseros solos ($250) para envío gratis: 3 piezas. */
export const FREE_SHIPPING_MIN_EMPTY_BOXES = 3;

export const LOCAL_CITY_LABEL = 'municipio de Chihuahua';

export interface ShippingQuote {
  totalPieces: number;
  totalBoxesCount: number;
  loadedBoxesCount: number;
  emptyBoxesCount: number;
  extraBurKitsCount: number;
  subtotalMxn: number;
  totalMxn: number;
  method: DeliveryMethod;
  costMxn: number;
  shippingCost: number;
  isFree: boolean;
  isFreeShipping: boolean;
  label: string;
  promoMessage: string;
  /** Piezas faltantes para envío gratis (0 si ya califica). */
  piecesToFreeShipping: number;
  piecesNeededForFree: number;
}

export function countPieces(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + Math.max(1, item.quantity || 1), 0);
}

export function calculateOrderSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    const qty = Math.max(1, item.quantity || 1);
    const unitPrice = getOrderItemUnitPrice(item);
    return sum + unitPrice * qty;
  }, 0);
}

export function calculateShipping(
  itemsOrCount: OrderItem[] | number,
  method: DeliveryMethod = 'fedex'
): ShippingQuote {
  let loadedBoxesCount = 0;
  let emptyBoxesCount = 0;
  let extraBurKitsCount = 0;
  let subtotalMxn = 0;

  if (typeof itemsOrCount === 'number') {
    emptyBoxesCount = Math.max(0, itemsOrCount);
    subtotalMxn = emptyBoxesCount * PRICE_BOX_ONLY_MXN;
  } else {
    for (const item of itemsOrCount) {
      const qty = Math.max(1, item.quantity || 1);
      const unitPrice = getOrderItemUnitPrice(item);
      subtotalMxn += unitPrice * qty;

      if (item.itemType === 'extra_burs') {
        extraBurKitsCount += qty;
      } else if (item.includesBurs) {
        loadedBoxesCount += qty;
      } else {
        emptyBoxesCount += qty;
      }
    }
  }

  const totalBoxesCount = loadedBoxesCount + emptyBoxesCount;
  const totalPieces = totalBoxesCount + extraBurKitsCount;

  // Regla oficial de promoción de envío gratis:
  // 1) Si lleva 2 o más freseros cargados con fresas ($549 c/u) -> Envío GRATIS
  // 2) Si lleva puros freseros solos ($250 c/u), requiere al menos 3 freseros -> Envío GRATIS
  const qualifiesByLoadedBoxes =
    loadedBoxesCount >= FREE_SHIPPING_MIN_LOADED_BOXES;
  const qualifiesByTotalBoxes =
    totalBoxesCount >= FREE_SHIPPING_MIN_EMPTY_BOXES;
  const isFreeByPromo = qualifiesByLoadedBoxes || qualifiesByTotalBoxes;

  const neededLoaded = Math.max(
    0,
    FREE_SHIPPING_MIN_LOADED_BOXES - loadedBoxesCount
  );
  const neededTotalBoxes = Math.max(
    0,
    FREE_SHIPPING_MIN_EMPTY_BOXES - totalBoxesCount
  );
  const piecesToFreeShipping = isFreeByPromo
    ? 0
    : Math.min(neededLoaded, neededTotalBoxes);

  let promoMessage = '';
  if (isFreeByPromo) {
    promoMessage = qualifiesByLoadedBoxes
      ? `¡Felicidades! Llevas ${loadedBoxesCount} freseros cargados ($${PRICE_BOX_WITH_BURS_MXN} c/u) y tienes ENVÍO FEDEX GRATIS.`
      : `¡Felicidades! Llevas ${totalBoxesCount} freseros y tienes ENVÍO FEDEX GRATIS.`;
  } else if (emptyBoxesCount === 2 && loadedBoxesCount === 0) {
    promoMessage = `Con 2 freseros solos ($${PRICE_BOX_ONLY_MXN} c/u) no aplica envío gratis. ¡Agrega 1 fresero más (3 en total) o cárgales fresas ($${PRICE_BOX_WITH_BURS_MXN} c/u) para obtener ENVÍO GRATIS!`;
  } else if (loadedBoxesCount === 1 && emptyBoxesCount === 1) {
    promoMessage = `¡Carga tu segundo fresero con fresas ($${PRICE_BOX_WITH_BURS_MXN}) o agrega 1 fresero más para desbloquear ENVÍO GRATIS!`;
  } else if (loadedBoxesCount === 1 && emptyBoxesCount === 0) {
    promoMessage = `¡Agrega 1 fresero con fresas ($${PRICE_BOX_WITH_BURS_MXN}) más para llevarte ENVÍO GRATIS!`;
  } else {
    promoMessage = `Envío GRATIS llevando 2 freseros con fresas ($${PRICE_BOX_WITH_BURS_MXN} c/u) o 3 freseros solos ($${PRICE_BOX_ONLY_MXN} c/u).`;
  }

  if (method === 'local') {
    return {
      totalPieces,
      totalBoxesCount,
      loadedBoxesCount,
      emptyBoxesCount,
      extraBurKitsCount,
      subtotalMxn,
      totalMxn: subtotalMxn,
      method,
      costMxn: 0,
      shippingCost: 0,
      isFree: true,
      isFreeShipping: true,
      label: `Entrega / recolección local (${LOCAL_CITY_LABEL}) — sin costo de paquetería`,
      promoMessage,
      piecesToFreeShipping,
      piecesNeededForFree: piecesToFreeShipping,
    };
  }

  const costMxn = isFreeByPromo ? 0 : FEDEX_NATIONAL_RATE_MXN;
  const totalMxn = subtotalMxn + costMxn;

  return {
    totalPieces,
    totalBoxesCount,
    loadedBoxesCount,
    emptyBoxesCount,
    extraBurKitsCount,
    subtotalMxn,
    totalMxn,
    method,
    costMxn,
    shippingCost: costMxn,
    isFree: isFreeByPromo,
    isFreeShipping: isFreeByPromo,
    label: isFreeByPromo
      ? qualifiesByLoadedBoxes
        ? `Envío nacional FedEx — GRATIS (${loadedBoxesCount} freseros de $${PRICE_BOX_WITH_BURS_MXN})`
        : `Envío nacional FedEx — GRATIS (${totalBoxesCount} freseros)`
      : `Envío nacional FedEx — $${FEDEX_NATIONAL_RATE_MXN} MXN`,
    promoMessage,
    piecesToFreeShipping,
    piecesNeededForFree: piecesToFreeShipping,
  };
}

export function formatMxn(amount: number): string {
  return amount === 0 ? '$0 MXN' : `$${amount.toLocaleString('es-MX')} MXN`;
}

export const formatCurrencyMx = formatMxn;
