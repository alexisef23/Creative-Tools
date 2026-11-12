import { OrderCustomerDetails, OrderItem } from '@/types';
import { BOX_DIMENSIONS_LABEL, INSTAGRAM_HANDLE } from './brand';
import { calculateShipping, formatMxn, LOCAL_CITY_LABEL } from './shipping';

// Canal interno de recepción de pedidos (no se muestra en la interfaz).
// El contacto público para dudas y cotizaciones es Instagram (ver utils/brand.ts).
export const WHATSAPP_ORDER_NUMBER = '5216145525335';

export function buildOrderMessageText(
  items: OrderItem[],
  customer: OrderCustomerDetails
): string {
  const shipping = calculateShipping(items, customer.deliveryMethod);

  const itemLines = items.map((item, index) => {
    const designDesc =
      item.designMode === 'preset'
        ? `${item.title} (Código: ${item.code})`
        : `Logo Propio (${item.uploadedFileName || 'Imagen personalizada'})`;
    return [
      `${index + 1}. *${designDesc}*`,
      `   • Piezas: ${item.quantity}`,
      `   • Color Fresero: ${item.color.name}`,
      item.customText ? `   • Texto en tapa: "${item.customText}"` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const deliveryLine =
    customer.deliveryMethod === 'local'
      ? `• *Entrega:* Local dentro del ${LOCAL_CITY_LABEL} (por acordar)`
      : `• *Entrega:* Envío nacional FedEx`;

  const lines = [
    '🦷 *NUEVO PEDIDO DE FRESEROS GRABADOS LÁSER - CREATIVE TOOLS*',
    '',
    '*DISEÑOS SOLICITADOS:*',
    ...itemLines,
    '',
    '*ESPECIFICACIONES:*',
    `• Freseros para fresas de *alta velocidad*`,
    `• Medidas: ${BOX_DIMENSIONS_LABEL} (largo × alto × ancho)`,
    '• Aluminio grado médico anodizado, autoclavable 134 °C',
    '',
    '*DATOS DE ENVÍO:*',
    `• *Nombre completo:* ${customer.fullName}`,
    `• *Calle y número:* ${customer.street}`,
    `• *Colonia:* ${customer.neighborhood}`,
    `• *Código postal:* ${customer.postalCode}`,
    `• *Teléfono de contacto:* ${customer.phone}`,
    deliveryLine,
    customer.notes.trim() ? `• *Notas:* ${customer.notes.trim()}` : '',
    '',
    '*RESUMEN:*',
    `• Total de piezas: ${shipping.totalPieces}`,
    customer.deliveryMethod === 'local'
      ? '• Costo de envío: Por acordar (entrega local)'
      : `• Costo de envío FedEx: ${
          shipping.isFree ? 'GRATIS (más de 2 piezas)' : formatMxn(shipping.costMxn)
        }`,
    '',
    '🖼️ *IMÁGENES A GRABAR:*',
    '_(Adjunto en este chat la vista previa del fresero y el arte a grabar)_',
    '',
    `Contacto Instagram: ${INSTAGRAM_HANDLE}`,
  ].filter((l) => l !== '');

  return lines.join('\n');
}

export function buildOrderWhatsAppUrl(
  items: OrderItem[],
  customer: OrderCustomerDetails
): string {
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(
    buildOrderMessageText(items, customer)
  )}`;
}

export const buildOrderListWhatsAppUrl = buildOrderWhatsAppUrl;

/**
 * Prepara la imagen a grabar para enviarla junto con el pedido:
 * 1. Copia el PNG al portapapeles (Ctrl+V en el chat)
 * 2. Descarga el PNG (y la imagen original si es logo propio)
 * 3. Abre el chat de pedidos con el mensaje prellenado
 */
export async function sendOrderWithImage(params: {
  orderUrl?: string;
  whatsappUrl?: string;
  canvasDataUrl: string;
  sourceImageDataUrl?: string | null;
  fileNamePrefix: string;
}): Promise<{ copiedToClipboard: boolean; downloaded: boolean }> {
  const targetUrl = params.orderUrl || params.whatsappUrl || '';
  const { canvasDataUrl, sourceImageDataUrl, fileNamePrefix } = params;

  let copiedToClipboard = false;
  let downloaded = false;

  if (canvasDataUrl && typeof window !== 'undefined') {
    try {
      const response = await fetch(canvasDataUrl);
      const blob = await response.blob();
      if (navigator.clipboard && 'ClipboardItem' in window) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type || 'image/png']: blob }),
        ]);
        copiedToClipboard = true;
      }
    } catch {
      copiedToClipboard = false;
    }

    try {
      const link = document.createElement('a');
      link.download = `${fileNamePrefix}-vista-previa.png`;
      link.href = canvasDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloaded = true;

      if (sourceImageDataUrl) {
        const srcLink = document.createElement('a');
        srcLink.download = `${fileNamePrefix}-imagen-a-grabar.png`;
        srcLink.href = sourceImageDataUrl;
        document.body.appendChild(srcLink);
        srcLink.click();
        document.body.removeChild(srcLink);
      }
    } catch {
      downloaded = false;
    }
  }

  if (typeof window !== 'undefined' && targetUrl) {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }

  return { copiedToClipboard, downloaded };
}

export const sendOrderWithImageToWhatsApp = sendOrderWithImage;

