// ==================== CONTACTO OFICIAL ====================
// Instagram es el canal principal de contacto, dudas y cotizaciones.
export const INSTAGRAM_HANDLE = '@creative.tools.mx';
export const INSTAGRAM_URL = 'https://www.instagram.com/creative.tools.mx';

export const OFFICIAL_INSTAGRAM_URL = INSTAGRAM_URL;
export const OFFICIAL_INSTAGRAM_HANDLE = INSTAGRAM_HANDLE;

// ==================== ESPECIFICACIONES DEL PRODUCTO ====================
export const BOX_DIMENSIONS = {
  lengthCm: 7.3, // Largo
  heightCm: 2.8, // Alto
  widthCm: 2.5, // Ancho / Profundidad
} as const;

export const BOX_DIMENSIONS_LABEL = `${BOX_DIMENSIONS.lengthCm} × ${BOX_DIMENSIONS.heightCm} × ${BOX_DIMENSIONS.widthCm} cm`;
export const BOX_DIMENSIONS_STR = BOX_DIMENSIONS_LABEL;

export const BUR_COMPATIBILITY_SHORT = 'Fresas de alta velocidad';
export const BUR_COMPATIBILITY_PRIMARY = BUR_COMPATIBILITY_SHORT;
export const BUR_COMPATIBILITY_LONG =
  'Diseñado exclusivamente para fresas de alta velocidad (pieza de mano de alta velocidad / turbina).';

export const PRODUCT_SPECS: { label: string; value: string }[] = [
  { label: 'Compatibilidad', value: 'Solo fresas de alta velocidad' },
  { label: 'Largo', value: `${BOX_DIMENSIONS.lengthCm} cm` },
  { label: 'Alto', value: `${BOX_DIMENSIONS.heightCm} cm` },
  { label: 'Ancho / Profundidad', value: `${BOX_DIMENSIONS.widthCm} cm` },
  { label: 'Material', value: 'Aluminio grado médico anodizado' },
  { label: 'Esterilización', value: 'Autoclavable 134 °C' },
];

