import { type StateCreator } from 'zustand';

/**
 * Font family options for reading text
 * Following industry standards from Bible apps (YouVersion, ESV)
 */
export type FontFamily = 'system' | 'serif' | 'mono';

/**
 * Font slice state interface
 */
export interface FontSlice {
  /** Current font family */
  fontFamily: FontFamily;
  /** Font size multiplier (0.8-1.5, where 1.0 = 100%) */
  fontSize: number;
  /** Set font family */
  setFontFamily: (family: FontFamily) => void;
  /** Set font size multiplier */
  setFontSize: (size: number) => void;
}

/**
 * Font slice for preferences store
 *
 * Manages font preferences:
 * - Font family switching (System/Serif/Mono)
 * - Font size multiplier (80%-150%)
 * - Works with iOS Dynamic Type (82%-310%)
 * - Combined maximum: 620% (200% app × 310% iOS)
 */
export const createFontSlice: StateCreator<FontSlice> = (set) => ({
  fontFamily: 'system',
  fontSize: 1.0,
  setFontFamily: (family) => set({ fontFamily: family }),
  setFontSize: (size) => set({ fontSize: size }),
});
