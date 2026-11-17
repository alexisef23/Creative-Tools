import { OrderItem } from '@/types';

// ==================== CONTACTO OFICIAL ====================
// Instagram es el canal principal de contacto, dudas y cotizaciones.
export const INSTAGRAM_HANDLE = '@creative.tools.mx';
export const INSTAGRAM_URL = 'https://www.instagram.com/creative.tools.mx';
export const INSTAGRAM_DIRECT_URL = 'https://ig.me/m/creative.tools.mx';

export const OFFICIAL_INSTAGRAM_URL = INSTAGRAM_URL;
export const OFFICIAL_INSTAGRAM_HANDLE = INSTAGRAM_HANDLE;

// ==================== PRECIOS OFICIALES (MXN) ====================
/** Precio del fresero solo (cajita de aluminio anodizado sin fresas). */
export const PRICE_BOX_ONLY_MXN = 250;
/** Precio del fresero cargado con kit de fresas dentales de alta velocidad. */
export const PRICE_BOX_WITH_BURS_MXN = 549;
/** Precio del kit adicional de fresas dentales FG de alta velocidad. */
export const PRICE_EXTRA_BUR_KIT_MXN = 299;

export function getOrderItemUnitPrice(item: Partial<OrderItem>): number {
  if (typeof item.unitPrice === 'number' && item.unitPrice > 0) {
    return item.unitPrice;
  }
  if (item.itemType === 'extra_burs') {
    return PRICE_EXTRA_BUR_KIT_MXN;
  }
  return item.includesBurs ? PRICE_BOX_WITH_BURS_MXN : PRICE_BOX_ONLY_MXN;
}

// ==================== ESPECIFICACIONES DE LAS FRESAS DENTALES ====================
export const DENTAL_BUR_SPECS_TITLE =
  'Kit de Fresas de Diamante FG 1.6 mm (Alta Velocidad)';

export const DENTAL_BUR_FEATURES: {
  id: number;
  title: string;
  detail: string;
}[] = [
  {
    id: 1,
    title: 'Vástago FG 1.6 mm (Friction Grip)',
    detail: 'Estándar universal para pieza de mano de alta velocidad (turbina).',
  },
  {
    id: 2,
    title: 'Uso Exclusivamente Odontológico',
    detail: 'Grado clínico dental profesional (no apto para uso cosmético/uñas).',
  },
  {
    id: 3,
    title: 'Polvo de Esmeril / Diamante Natural',
    detail: 'Alta dureza que garantiza un filo superior y corte de alta precisión.',
  },
  {
    id: 4,
    title: 'Vástago de Acero Inoxidable Grado Médico',
    detail: 'Alta resistencia mecánica, máxima durabilidad y 100% libre de corrosión.',
  },
  {
    id: 5,
    title: '100% Esterilizables en Autoclave',
    detail: 'Aptas para desinfección bajo alta temperatura y alta presión.',
  },
  {
    id: 6,
    title: 'Velocidad Máxima de hasta 400,000 RPM',
    detail: 'Balanceadas para trabajar con seguridad hasta 400,000/min.',
  },
];

// ==================== ESPECIFICACIONES DEL FRESERO ====================
export const BOX_DIMENSIONS = {
  lengthCm: 7.3, // Largo
  heightCm: 2.8, // Alto
  widthCm: 2.5, // Ancho / Profundidad
} as const;

export const BOX_DIMENSIONS_LABEL = `${BOX_DIMENSIONS.lengthCm} × ${BOX_DIMENSIONS.heightCm} × ${BOX_DIMENSIONS.widthCm} cm`;
export const BOX_DIMENSIONS_STR = BOX_DIMENSIONS_LABEL;

export const BUR_COMPATIBILITY_SHORT = 'Fresas de alta velocidad (FG 1.6 mm)';
export const BUR_COMPATIBILITY_PRIMARY = BUR_COMPATIBILITY_SHORT;
export const BUR_COMPATIBILITY_LONG =
  'Diseñado exclusivamente para fresas de alta velocidad FG 1.6 mm (pieza de mano de alta velocidad / turbina hasta 400,000 RPM).';

export const PRODUCT_SPECS: { label: string; value: string }[] = [
  { label: 'Compatibilidad', value: 'Fresas FG 1.6 mm Alta Velocidad' },
  { label: 'Largo', value: `${BOX_DIMENSIONS.lengthCm} cm` },
  { label: 'Alto', value: `${BOX_DIMENSIONS.heightCm} cm` },
  { label: 'Ancho / Profundidad', value: `${BOX_DIMENSIONS.widthCm} cm` },
  { label: 'Material', value: 'Aluminio grado médico anodizado' },
  { label: 'Esterilización', value: 'Autoclavable 134 °C' },
];
