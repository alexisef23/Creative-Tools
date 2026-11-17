import { OrderCustomerDetails, OrderItem } from '@/types';
import {
  BOX_DIMENSIONS_LABEL,
  getOrderItemUnitPrice,
  INSTAGRAM_DIRECT_URL,
} from './brand';
import { calculateShipping, formatMxn } from './shipping';

export function buildInstagramOrderText(
  items: OrderItem[],
  customer: OrderCustomerDetails
): string {
  const shipping = calculateShipping(items, customer.deliveryMethod);

  const itemLines = items.map((item, idx) => {
    const qty = Math.max(1, item.quantity || 1);
    const unitPrice = getOrderItemUnitPrice(item);
    const lineTotal = unitPrice * qty;

    if (item.itemType === 'extra_burs') {
      return [
        `🦷 ${idx + 1}. ${item.title}`,
        `   • Cantidad: ${qty} kit(s) × ${formatMxn(unitPrice)} = ${formatMxn(lineTotal)}`,
        `   • Especificación: FG 1.6mm Alta Velocidad (hasta 400,000 RPM)`,
      ].join('\n');
    }

    const desc =
      item.designMode === 'preset'
        ? `${item.title} (Ref: ${item.code})`
        : `Logo Personalizado (${item.uploadedFileName || 'Diseño propio'})`;

    const modeLabel = item.includesBurs
      ? 'Fresero + Kit de Fresas FG 1.6mm ($549 MXN)'
      : 'Solo Fresero de Aluminio ($250 MXN)';

    return [
      `📦 ${idx + 1}. ${desc}`,
      `   • Modalidad: ${modeLabel}`,
      `   • Cantidad: ${qty} pz(s) × ${formatMxn(unitPrice)} = ${formatMxn(lineTotal)}`,
      `   • Color: ${item.color.name}`,
      item.customText ? `   • Texto en tapa: "${item.customText}"` : '',
      item.specialtyTag ? `   • Especialidad: "${item.specialtyTag}"` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  return [
    '🦷 NUEVO PEDIDO DE FRESEROS PERSONALIZADOS - CREATIVE TOOLS',
    '',
    'PRODUCTOS SOLICITADOS:',
    ...itemLines,
    '',
    'ESPECIFICACIONES:',
    `• Exclusivo para fresas de Alta Velocidad (FG 1.6 mm / hasta 400,000 RPM)`,
    `• Medidas del fresero: ${BOX_DIMENSIONS_LABEL}`,
    '• Aluminio grado médico autoclavable 134°C',
    '',
    'DATOS DE ENTREGA (5 CAMPOS):',
    `• 1. Nombre completo: ${customer.fullName}`,
    `• 2. Calle y número: ${customer.street}`,
    `• 3. Colonia: ${customer.neighborhood}`,
    `• 4. Código postal: ${customer.postalCode}`,
    `• 5. Teléfono: ${customer.phone}`,
    customer.deliveryMethod === 'local'
      ? '• Entrega: Local en Municipio de Chihuahua'
      : `• Entrega: ${shipping.label}`,
    customer.notes?.trim() ? `• Notas: ${customer.notes.trim()}` : '',
    '',
    'DESGLOSE DE PAGO:',
    `• Subtotal productos (${shipping.totalPieces} pzs): ${formatMxn(shipping.subtotalMxn)}`,
    `• Envío: ${
      customer.deliveryMethod === 'local'
        ? '$0 MXN (Entrega local Chihuahua)'
        : shipping.isFree
        ? 'GRATIS ($0 MXN)'
        : formatMxn(shipping.costMxn)
    }`,
    `• TOTAL A PAGAR: ${formatMxn(shipping.totalMxn)}`,
    '',
    '🖼️ (Te adjunto la imagen de mi diseño a grabar generado en el simulador)',
  ]
    .filter((l) => l !== '')
    .join('\n');
}

/**
 * Convierte un dataURL base64 a un Blob.
 */
function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch {
    return null;
  }
}

/**
 * Envía el pedido y la imagen directamente a Instagram:
 * 1. Intenta `navigator.share` con el archivo de imagen para abrir directamente
 *    Instagram Direct con la imagen y el texto adjuntos.
 * 2. Si no está soportado (ej. Desktop), copia la imagen al portapapeles (Ctrl+V)
 *    y abre el chat de Instagram Direct (https://ig.me/m/creative.tools.mx).
 */
export async function sendOrderToInstagram(params: {
  items: OrderItem[];
  customer: OrderCustomerDetails;
  canvasDataUrl: string;
  sourceImageDataUrl?: string | null;
  fileNamePrefix?: string;
}): Promise<{
  sharedNatively: boolean;
  copiedToClipboard: boolean;
  downloaded: boolean;
}> {
  const { items, customer, canvasDataUrl, fileNamePrefix = 'pedido-fresero' } =
    params;
  const orderText = buildInstagramOrderText(items, customer);

  let sharedNatively = false;
  let copiedToClipboard = false;
  let downloaded = false;

  const blob = canvasDataUrl ? dataUrlToBlob(canvasDataUrl) : null;

  // 1. Intento con Web Share API con archivos (abre directamente Instagram en móviles)
  if (blob && typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      const file = new File([blob], `${fileNamePrefix}-diseno.png`, {
        type: 'image/png',
      });

      if (
        'canShare' in navigator &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: 'Pedido Fresero Creative Tools',
          text: orderText,
          files: [file],
        });
        sharedNatively = true;
        return { sharedNatively, copiedToClipboard: false, downloaded: false };
      }
    } catch {
      // Si el usuario canceló el share o falló, continuamos con portapapeles y enlace
    }
  }

  // 2. Copia al portapapeles de la imagen
  if (blob && typeof window !== 'undefined' && navigator.clipboard) {
    try {
      if ('ClipboardItem' in window) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        copiedToClipboard = true;
      }
    } catch {
      copiedToClipboard = false;
    }
  }

  // 3. Descarga de respaldo para que el cliente tenga el archivo
  if (canvasDataUrl && typeof document !== 'undefined') {
    try {
      const link = document.createElement('a');
      link.download = `${fileNamePrefix}-diseno.png`;
      link.href = canvasDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloaded = true;
    } catch {
      downloaded = false;
    }
  }

  // 4. Abre Instagram Direct con la cuenta @creative.tools.mx
  if (typeof window !== 'undefined') {
    const directUrl = INSTAGRAM_DIRECT_URL || `https://ig.me/m/creative.tools.mx`;
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  }

  return { sharedNatively, copiedToClipboard, downloaded };
}

