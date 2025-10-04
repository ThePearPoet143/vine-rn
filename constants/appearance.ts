import { type ThemeMode, Themes } from './themes';
import { type FontFamily } from '@/contexts/preferences-context';

/**
 * Theme option interface
 */
interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
}

/**
 * Auto theme option (always first)
 */
export const AUTO_THEME: ThemeOption = {
  mode: 'auto',
  label: 'Auto (System)',
  icon: 'circle.lefthalf.filled',
};

/**
 * Light theme options
 */
export const LIGHT_THEMES: ThemeOption[] = [
  { mode: 'light', label: 'Light', icon: 'sun.max.fill' },
  { mode: 'parchment', label: 'Parchment', icon: 'doc.text.fill' },
  { mode: 'sepia', label: 'Sepia', icon: 'book.fill' },
  { mode: 'green', label: 'Green', icon: 'leaf.fill' },
];

/**
 * Dark theme options
 */
export const DARK_THEMES: ThemeOption[] = [
  { mode: 'dark', label: 'Dark', icon: 'moon.fill' },
  { mode: 'night', label: 'Night', icon: 'moon.zzz.fill' },
  { mode: 'warm-dark', label: 'Warm Dark', icon: 'moon.stars.fill' },
];

/**
 * All theme options (for backwards compatibility)
 */
export const THEME_OPTIONS: ThemeOption[] = [
  AUTO_THEME,
  ...LIGHT_THEMES,
  ...DARK_THEMES,
];

/**
 * Font family configuration for appearance settings
 */
export const FONT_OPTIONS: { family: FontFamily; label: string }[] = [
  { family: 'system', label: 'System (SF Pro)' },
  { family: 'serif', label: 'Serif (New York)' },
  { family: 'mono', label: 'Mono (Menlo)' },
];
