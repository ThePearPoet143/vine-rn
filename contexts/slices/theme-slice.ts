import { type StateCreator } from 'zustand';
import { type ThemeMode } from '@/constants/themes';

/**
 * Theme slice state interface
 */
export interface ThemeSlice {
  /** Current theme mode */
  themeMode: ThemeMode;
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => void;
}

/**
 * Theme slice for preferences store
 *
 * Manages reading theme preferences:
 * - 6 theme modes (Auto, Light, Dark, Sepia, Warm Dark, Green)
 * - Auto mode follows system dark/light preference
 * - All themes are WCAG AAA compliant (7:1+ contrast)
 */
export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  themeMode: 'auto',
  setThemeMode: (mode) => set({ themeMode: mode }),
});
