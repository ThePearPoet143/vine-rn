import { type ThemeMode } from './themes';
import { type FontFamily } from '@/contexts/preferences-context';

/**
 * Theme configuration for appearance settings
 */
export const THEME_OPTIONS: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'auto', label: 'Auto (System)', icon: 'circle.lefthalf.filled' },
  { mode: 'light', label: 'Light', icon: 'sun.max.fill' },
  { mode: 'dark', label: 'Dark', icon: 'moon.fill' },
  { mode: 'parchment', label: 'Parchment', icon: 'doc.text.fill' },
  { mode: 'night', label: 'Night', icon: 'moon.zzz.fill' },
  { mode: 'sepia', label: 'Sepia', icon: 'book.fill' },
  { mode: 'warm-dark', label: 'Warm Dark', icon: 'moon.stars.fill' },
  { mode: 'green', label: 'Green', icon: 'leaf.fill' },
];

/**
 * Font family configuration for appearance settings
 */
export const FONT_OPTIONS: { family: FontFamily; label: string }[] = [
  { family: 'system', label: 'System (SF Pro)' },
  { family: 'serif', label: 'Serif (New York)' },
  { family: 'mono', label: 'Mono (Menlo)' },
];
