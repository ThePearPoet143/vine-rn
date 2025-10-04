/**
 * Design system color constants
 * Centralized color values used across the app
 */

/**
 * iOS accent blue - system tint color
 * Used for interactive elements, switches, sliders, links
 */
export const IOS_ACCENT_BLUE = {
  light: '#007AFF',
  dark: '#0A84FF',
} as const;

/**
 * Get iOS accent blue based on theme
 */
export function getAccentBlue(isDark: boolean): string {
  return isDark ? IOS_ACCENT_BLUE.dark : IOS_ACCENT_BLUE.light;
}
