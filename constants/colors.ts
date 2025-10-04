/**
 * Design system color constants
 * Centralized color values used across the app
 */

/**
 * iOS System Colors
 * Standard iOS semantic colors with light/dark variants
 * https://developer.apple.com/design/human-interface-guidelines/color
 */
export const IOS_SYSTEM_COLORS = {
  blue: { light: '#007AFF', dark: '#0A84FF' },
  green: { light: '#34C759', dark: '#30D158' },
  indigo: { light: '#5856D6', dark: '#5E5CE6' },
  orange: { light: '#FF9500', dark: '#FF9F0A' },
  pink: { light: '#FF2D55', dark: '#FF375F' },
  purple: { light: '#AF52DE', dark: '#BF5AF2' },
  red: { light: '#FF3B30', dark: '#FF453A' },
  teal: { light: '#5AC8FA', dark: '#64D2FF' },
  yellow: { light: '#FFCC00', dark: '#FFD60A' },
  gray: { light: '#8E8E93', dark: '#8E8E93' },
  gray2: { light: '#AEAEB2', dark: '#636366' },
  gray3: { light: '#C7C7CC', dark: '#48484A' },
  gray4: { light: '#D1D1D6', dark: '#3A3A3C' },
  gray5: { light: '#E5E5EA', dark: '#2C2C2E' },
  gray6: { light: '#F2F2F7', dark: '#1C1C1E' },
} as const;

/**
 * iOS accent blue - system tint color
 * Used for interactive elements, switches, sliders, links
 */
export const IOS_ACCENT_BLUE = IOS_SYSTEM_COLORS.blue;

/**
 * Get iOS accent blue based on theme
 */
export function getAccentBlue(isDark: boolean): string {
  return isDark ? IOS_ACCENT_BLUE.dark : IOS_ACCENT_BLUE.light;
}

/**
 * Get iOS system color based on theme
 */
export function getSystemColor(
  color: keyof typeof IOS_SYSTEM_COLORS,
  isDark: boolean
): string {
  return isDark ? IOS_SYSTEM_COLORS[color].dark : IOS_SYSTEM_COLORS[color].light;
}
