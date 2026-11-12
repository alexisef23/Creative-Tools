import { create } from 'zustand';
import {
  AnodizedColor,
  OrderItem,
  PresetDesign,
  ProductItem,
  SeriesCategory,
  TransformState,
} from '@/types';
import { ANODIZED_COLORS, PRESET_DESIGNS } from '@/utils/catalogData';

interface CustomizerStoreState {
  // Catalog filter
  selectedCategory: SeriesCategory;
  setSelectedCategory: (category: SeriesCategory) => void;

  // Dynamic auto-discovered designs from /Catalogo folder
  extraDiscoveredDesigns: PresetDesign[];
  isSyncingCatalog: boolean;
  syncCatalogFromDisk: () => Promise<number>;

  // Customizer Studio State
  selectedColor: AnodizedColor;
  setSelectedColor: (color: AnodizedColor) => void;

  designMode: 'preset' | 'upload';
  setDesignMode: (mode: 'preset' | 'upload') => void;

  selectedPreset: PresetDesign;
  setSelectedPreset: (preset: PresetDesign) => void;

  uploadedImageSrc: string | null;
  uploadedFileName: string | null;
  setUploadedImage: (src: string | null, fileName?: string | null) => void;

  transform: TransformState;
  updateTransform: (partial: Partial<TransformState>) => void;
  resetTransform: () => void;

  // Load a catalog card directly into the studio
  loadProductIntoStudio: (product: ProductItem) => void;

  // Snapshot data URL from HTML5 canvas
  latestCanvasSnapshot: string;
  setLatestCanvasSnapshot: (dataUrl: string) => void;

  // Order List (Lista de Pedido Directo sin precios)
  orderList: OrderItem[];
  isOrderDrawerOpen: boolean;
  setOrderDrawerOpen: (open: boolean) => void;
  addToOrderList: (
    item: Omit<OrderItem, 'orderItemId' | 'quantity'> & { quantity?: number }
  ) => void;
  updateOrderItemQuantity: (orderItemId: string, quantity: number) => void;
  removeFromOrderList: (orderItemId: string) => void;
  clearOrderList: () => void;
}

const DEFAULT_TRANSFORM: TransformState = {
  x: 0,
  y: -4,
  scale: 1,
  rotation: 0,
  flipHorizontal: false,
  laserFinish: 'silver',
  customText: 'DR. ALEJANDRO VEGA',
  specialtyTag: 'ODONTOLOGÍA AVANZADA',
  fontFamily: 'monospace',
  invertUpload: false,
  contrastThreshold: 145,
};

export const useCustomizerStore = create<CustomizerStoreState>((set, get) => ({
  selectedCategory: 'Todos',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  extraDiscoveredDesigns: [],
  isSyncingCatalog: false,
  syncCatalogFromDisk: async () => {
    set({ isSyncingCatalog: true });
    try {
      const res = await fetch('/api/catalog', { cache: 'no-store' });
      const data = await res.json();
      const extras: PresetDesign[] = Array.isArray(data.discoveredExtras)
        ? data.discoveredExtras.map((d: PresetDesign) => ({
            ...d,
            isAutoDiscovered: true,
          }))
        : [];
      set({ extraDiscoveredDesigns: extras, isSyncingCatalog: false });
      return extras.length;
    } catch {
      set({ isSyncingCatalog: false });
      return 0;
    }
  },

  selectedColor: ANODIZED_COLORS[0],
  setSelectedColor: (color) => set({ selectedColor: color }),

  designMode: 'preset',
  setDesignMode: (mode) => set({ designMode: mode }),

  selectedPreset: PRESET_DESIGNS[0],
  setSelectedPreset: (preset) =>
    set({
      selectedPreset: preset,
      designMode: 'preset',
    }),

  uploadedImageSrc: null,
  uploadedFileName: null,
  setUploadedImage: (src, fileName = null) =>
    set({
      uploadedImageSrc: src,
      uploadedFileName: fileName,
      designMode: src ? 'upload' : 'preset',
    }),

  transform: { ...DEFAULT_TRANSFORM },
  updateTransform: (partial) =>
    set((state) => ({
      transform: { ...state.transform, ...partial },
    })),
  resetTransform: () =>
    set((state) => ({
      transform: {
        ...DEFAULT_TRANSFORM,
        customText: state.transform.customText,
        specialtyTag: state.transform.specialtyTag,
        fontFamily: state.transform.fontFamily,
        laserFinish: state.transform.laserFinish,
      },
    })),

  loadProductIntoStudio: (product) => {
    const allPresets = [...PRESET_DESIGNS, ...get().extraDiscoveredDesigns];
    const matchedColor =
      ANODIZED_COLORS.find((c) => c.id === product.defaultColorId) ||
      ANODIZED_COLORS[0];
    const matchedPreset =
      allPresets.find((p) => p.id === product.presetDesignId) ||
      PRESET_DESIGNS[0];

    set((state) => ({
      selectedColor: matchedColor,
      selectedPreset: matchedPreset,
      designMode: 'preset',
      transform: {
        ...DEFAULT_TRANSFORM,
        customText: state.transform.customText,
        specialtyTag: state.transform.specialtyTag,
        fontFamily: state.transform.fontFamily,
        laserFinish: state.transform.laserFinish,
      },
    }));
  },

  latestCanvasSnapshot: '',
  setLatestCanvasSnapshot: (dataUrl) => set({ latestCanvasSnapshot: dataUrl }),

  orderList: [],
  isOrderDrawerOpen: false,
  setOrderDrawerOpen: (open) => set({ isOrderDrawerOpen: open }),

  addToOrderList: (item) =>
    set((state) => ({
      orderList: [
        ...state.orderList,
        {
          ...item,
          quantity: Math.max(1, item.quantity ?? 1),
          orderItemId: `ord-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
        },
      ],
      isOrderDrawerOpen: true,
    })),

  updateOrderItemQuantity: (orderItemId, quantity) =>
    set((state) => ({
      orderList: state.orderList.map((i) =>
        i.orderItemId === orderItemId
          ? { ...i, quantity: Math.min(99, Math.max(1, Math.round(quantity))) }
          : i
      ),
    })),

  removeFromOrderList: (orderItemId) =>
    set((state) => ({
      orderList: state.orderList.filter((i) => i.orderItemId !== orderItemId),
    })),

  clearOrderList: () => set({ orderList: [] }),
}));
