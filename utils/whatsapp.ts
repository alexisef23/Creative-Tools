import {
  AnodizedColor,
  OrderCustomerDetails,
  OrderItem,
  PresetDesign,
} from '@/types';

// Número oficial de pedidos por WhatsApp: +52 1 614 552 5335
export const WHATSAPP_ORDER_NUMBER = '5216145525335';
export const WHATSAPP_DISPLAY_NUMBER = '+52 1 614 552 5335';

export function buildSingleOrderMessageText(params: {
  color: AnodizedColor;
  designMode: 'preset' | 'upload';
  presetDesign: PresetDesign;
  uploadedFileName?: string | null;
  customText: string;
  doctorName?: string;
  clinicName?: string;
  notes?: string;
}): string {
  const {
    color,
    designMode,
    presetDesign,
    uploadedFileName,
    customText,
    doctorName,
    clinicName,
    notes,
  } = params;

  const designSummary =
    designMode === 'preset'
      ? `Catálogo Oficial: ${presetDesign.title} (Código: ${presetDesign.code} • Serie ${presetDesign.category})`
      : `Imagen / Logo Personalizado (${uploadedFileName || 'Archivo propio subido'})`;

  const lines = [
    '🦷 *NUEVO PEDIDO DE FRESERO GRABADO LÁSER - CREATIVE TOOLS*',
    '',
    '📋 *ESPECIFICACIONES DEL DISEÑO:*',
    `• *Color del Fresero (Aluminio Anodizado):* ${color.name}`,
    `• *Diseño a Grabar:* ${designSummary}`,
    customText.trim()
      ? `• *Texto Personalizado en Tapa:* "${customText.trim()}"`
      : '• *Texto Personalizado:* Sin texto adicional',
    `• *Material:* Aluminio Grado Médico 6061-T6 (Autoclavable 134°C)`,
    doctorName?.trim() ? `• *Doctor(a):* ${doctorName.trim()}` : '',
    clinicName?.trim() ? `• *Clínica / Consultorio:* ${clinicName.trim()}` : '',
    notes?.trim() ? `• *Indicaciones adicionales:* ${notes.trim()}` : '',
    '',
    '🖼️ *IMAGEN A GRABAR Y MOCKUP:*',
    '_(Te adjunto a continuación en este chat la imagen del diseño y la vista previa del fresero grabado)_',
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildSingleOrderWhatsAppUrl(params: {
  color: AnodizedColor;
  designMode: 'preset' | 'upload';
  presetDesign: PresetDesign;
  uploadedFileName?: string | null;
  customText: string;
  doctorName?: string;
  clinicName?: string;
  notes?: string;
}): string {
  const text = buildSingleOrderMessageText(params);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildOrderListWhatsAppUrl(
  items: OrderItem[],
  customer: OrderCustomerDetails
): string {
  const itemLines = items.map((item, index) => {
    const designDesc =
      item.designMode === 'preset'
        ? `${item.title} (Código: ${item.code})`
        : `Logo Propio (${item.uploadedFileName || 'Imagen personalizada'})`;
    return `${index + 1}. *${designDesc}*\n   • Color Fresero: ${item.color.name}${
      item.customText ? `\n   • Texto en tapa: "${item.customText}"` : ''
    }`;
  });

  const lines = [
    '🚀 *SOLICITUD DE PEDIDO DE FRESEROS PERSONALIZADOS - CREATIVE TOOLS*',
    '',
    '*DISEÑOS SOLICITADOS:*',
    ...itemLines,
    '',
    '*DATOS DEL DOCTOR / CLÍNICA PARA EL PEDIDO:*',
    `• *Dr(a).:* ${customer.doctorName || 'Por confirmar'}`,
    customer.clinicName ? `• *Clínica / Consultorio:* ${customer.clinicName}` : '',
    `• *Teléfono / WhatsApp:* ${customer.phone || 'Por confirmar'}`,
    customer.city ? `• *Ciudad / Estado:* ${customer.city}` : '',
    customer.address ? `• *Dirección de Entrega:* ${customer.address}` : '',
    customer.notes ? `• *Notas del Pedido:* ${customer.notes}` : '',
    '',
    '🖼️ *IMÁGENES A GRABAR:*',
    '_(Adjunto en este chat la imagen generada del fresero y el arte a grabar)_',
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}

/**
 * Prepares and dispatches the image to engrave + canvas mockup so the user can send it
 * directly to +52 1 614 552 5335 on WhatsApp:
 * 1. Copies the PNG image to the system clipboard (so the user can press Ctrl+V directly in WhatsApp)
 * 2. Downloads the PNG file automatically so they also have it saved on their device
 * 3. Opens the WhatsApp chat with +52 1 614 552 5335
 */
export async function sendOrderWithImageToWhatsApp(params: {
  whatsappUrl: string;
  canvasDataUrl: string;
  sourceImageDataUrl?: string | null;
  fileNamePrefix: string;
}): Promise<{ copiedToClipboard: boolean; downloaded: boolean }> {
  const { whatsappUrl, canvasDataUrl, sourceImageDataUrl, fileNamePrefix } =
    params;

  let copiedToClipboard = false;
  let downloaded = false;

  // 1. Copy the mockup PNG to the clipboard so Ctrl+V pastes the image directly into WhatsApp
  if (canvasDataUrl && typeof window !== 'undefined') {
    try {
      const response = await fetch(canvasDataUrl);
      const blob = await response.blob();

      if (navigator.clipboard && 'ClipboardItem' in window) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        copiedToClipboard = true;
      }
    } catch {
      copiedToClipboard = false;
    }

    // 2. Trigger automatic download of the mockup image (and custom uploaded image if present)
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

  // 3. Open WhatsApp chat with +52 1 614 552 5335
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return { copiedToClipboard, downloaded };
}
