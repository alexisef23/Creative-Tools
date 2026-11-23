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
 * Convierte cualquier fuente de imagen (dataURL, URL relativa /Catalogo/..., JPG o PNG)
 * a un Blob PNG garantizado (requerido por ClipboardItem y Web Share API).
 */
export async function imageSrcToPngBlob(src: string): Promise<Blob | null> {
  if (!src || typeof window === 'undefined') return null;

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = src;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width || 600;
    canvas.height = img.naturalHeight || img.height || 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0);
    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/png')
    );
  } catch {
    try {
      const res = await fetch(src);
      return await res.blob();
    } catch {
      return null;
    }
  }
}

export async function copyOrderTextToClipboard(text: string): Promise<boolean> {
  if (!text || typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function copyImageSrcToClipboard(src: string): Promise<boolean> {
  const blob = await imageSrcToPngBlob(src);
  if (!blob || typeof window === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    if ('ClipboardItem' in window) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Envía el pedido y la imagen hacia Instagram:
 * 1. Convierte la imagen (del simulador o del catálogo) a PNG.
 * 2. En móviles compatibles usa Web Share API con el archivo PNG + texto del pedido.
 * 3. En escritorio: copia el PNG al portapapeles (Ctrl+V), descarga la imagen
 *    automáticamente y abre el chat de Instagram Direct (@creative.tools.mx).
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
  orderText: string;
}> {
  const {
    items,
    customer,
    canvasDataUrl,
    sourceImageDataUrl,
    fileNamePrefix = 'pedido-fresero',
  } = params;
  const orderText = buildInstagramOrderText(items, customer);

  let sharedNatively = false;
  let copiedToClipboard = false;
  let downloaded = false;

  const blob = canvasDataUrl ? await imageSrcToPngBlob(canvasDataUrl) : null;

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
        return {
          sharedNatively,
          copiedToClipboard: false,
          downloaded: false,
          orderText,
        };
      }
    } catch {
      // Si el usuario canceló el share o falló, continuamos con portapapeles + descarga + enlace
    }
  }

  // 2. Copia al portapapeles de la imagen PNG
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

  // 3. Descarga automática del archivo PNG (y logo original si se subió)
  if (typeof document !== 'undefined') {
    try {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileNamePrefix}-diseno.png`;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        downloaded = true;
      } else if (canvasDataUrl) {
        const link = document.createElement('a');
        link.download = `${fileNamePrefix}-diseno.png`;
        link.href = canvasDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        downloaded = true;
      }

      if (sourceImageDataUrl) {
        const srcLink = document.createElement('a');
        srcLink.download = `${fileNamePrefix}-logo-original.png`;
        srcLink.href = sourceImageDataUrl;
        document.body.appendChild(srcLink);
        srcLink.click();
        document.body.removeChild(srcLink);
      }
    } catch {
      downloaded = false;
    }
  }

  // 4. Abre Instagram Direct con la cuenta @creative.tools.mx
  if (typeof window !== 'undefined') {
    const directUrl =
      INSTAGRAM_DIRECT_URL || `https://ig.me/m/creative.tools.mx`;
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  }

  return { sharedNatively, copiedToClipboard, downloaded, orderText };
}

