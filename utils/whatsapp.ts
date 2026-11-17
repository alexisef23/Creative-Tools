import { OrderCustomerDetails, OrderItem } from '@/types';
import { buildInstagramOrderText } from './instagram';

// Canal interno de recepción de pedidos (no se muestra en la interfaz).
// El contacto público para dudas y cotizaciones es Instagram (ver utils/brand.ts).
export const WHATSAPP_ORDER_NUMBER = '5216145525335';

export function buildOrderMessageText(
  items: OrderItem[],
  customer: OrderCustomerDetails
): string {
  return buildInstagramOrderText(items, customer);
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

