export type SeriesCategory =
  | 'Todos'
  | 'Racing'
  | 'Heroes'
  | 'Anime'
  | 'Idols'
  | 'Sport'
  | 'Sci-Fi'
  | 'Dental Humor'
  | 'Architecture'
  | 'Retro Gaming'
  | 'Animals';

export type LaserFontFamily = 'monospace' | 'sans-serif' | 'serif';
export type LaserFinishMode = 'silver' | 'bright' | 'deep';

export interface AnodizedColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  highlightHex: string;
  laserTint: string;
  badgeText: string;
}

export interface PresetDesign {
  id: string;
  code: string;
  title: string;
  category: Exclude<SeriesCategory, 'Todos'>;
  description: string;
  imageUrl?: string; // Path to reference catalog asset in /Catalogo/...
  svgPaths?: string[];
  viewBox?: string;
  recommendedColorId?: string;
  isAutoDiscovered?: boolean;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  series: Exclude<SeriesCategory, 'Todos'>;
  defaultColorId: string;
  presetDesignId: string;
  imageUrl?: string;
  featured?: boolean;
  badge?: string;
}

export interface TransformState {
  x: number; // Normalized offset -100 to 100
  y: number; // Normalized offset -100 to 100
  scale: number; // 0.3 to 2.2
  rotation: number; // -180 to 180 deg
  flipHorizontal: boolean; // Mirror design horizontally
  laserFinish: LaserFinishMode; // Silver satin, High-contrast white, or Deep etch
  customText: string; // Optional doctor/clinic name etched at bottom of lid
  specialtyTag: string; // Optional dental specialty badge
  fontFamily: LaserFontFamily;
  invertUpload: boolean; // Invert threshold for dark vs light logos
  contrastThreshold: number; // 0 to 255 laser threshold
}

export interface OrderItem {
  orderItemId: string;
  title: string;
  code: string;
  series: string;
  color: AnodizedColor;
  designMode: 'preset' | 'upload';
  presetDesign?: PresetDesign;
  uploadedFileName?: string | null;
  uploadedImageSrc?: string | null;
  customText?: string;
  specialtyTag?: string;
  previewDataUrl: string;
}

export interface OrderCustomerDetails {
  doctorName: string;
  clinicName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}
