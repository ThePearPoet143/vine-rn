import { create } from 'zustand';
import { useColorScheme } from 'react-native';
import { type ThemeMode, type ThemeColors, getThemeColors } from '@/constants/themes';

/**
 * Theme store using Zustand
 *
 * Features:
 * - 5 reading themes (Light, Dark, Sepia, Warm Dark, Green)
 * - Auto mode follows system dark/light preference
 * - Fast in-memory state management
 * - WCAG AAA compliant colors (7:1+ contrast)
 * - Works with font customization (family + size)
 *
 * @example
 * ```tsx
 * const { themeMode, setThemeMode } = useThemeStore();
 *
 * // Change theme
 * setThemeMode('sepia');
 * ```
 */
interface ThemeStore {
  /** Current theme mode */
  themeMode: ThemeMode;
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: 'auto',
  setThemeMode: (mode) => set({ themeMode: mode }),
}));

/**
 * Hook to access theme preferences with computed colors
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, themeMode, setThemeMode } = useThemeContext();
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>Current theme: {themeMode}</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useThemeContext() {
  const systemColorScheme = useColorScheme();
  const { themeMode, setThemeMode } = useThemeStore();

  // Compute current theme colors based on theme mode and system preference
  const colors = getThemeColors(themeMode, systemColorScheme);

  return {
    themeMode,
    setThemeMode,
    colors,
  };
}

/**
 * Provider component for theme preferences
 * With Zustand, this is optional but kept for consistency with FontProvider
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
