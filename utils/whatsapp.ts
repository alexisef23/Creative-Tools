import { OrderCustomerDetails, OrderItem } from '@/types';
import { buildInstagramOrderText, imageSrcToPngBlob } from './instagram';

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
 * Prepara la imagen a grabar para enviarla junto con el pedido por WhatsApp:
 * 1. Convierte la imagen (simulador o catálogo) a PNG garantizado
 * 2. Copia el PNG al portapapeles (Ctrl+V directo en WhatsApp)
 * 3. Descarga el PNG (y el logo original si se subió uno propio)
 * 4. Abre WhatsApp con todo el mensaje del pedido ya escrito
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

  const blob = canvasDataUrl ? await imageSrcToPngBlob(canvasDataUrl) : null;

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

  if (typeof document !== 'undefined') {
    try {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileNamePrefix}-vista-previa.png`;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        downloaded = true;
      } else if (canvasDataUrl) {
        const link = document.createElement('a');
        link.download = `${fileNamePrefix}-vista-previa.png`;
        link.href = canvasDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        downloaded = true;
      }

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

