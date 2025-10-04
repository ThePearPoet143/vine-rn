import React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { getThemeColors, type ThemeColors } from '@/constants/themes';
import { createThemeSlice, type ThemeSlice } from './slices/theme-slice';
import { createFontSlice, type FontSlice } from './slices/font-slice';
import { createLanguageSlice, type LanguageSlice } from './slices/language-slice';

// Re-export types for convenience
export type { FontFamily } from './slices/font-slice';
export type { Language } from './slices/language-slice';
export { LANGUAGE_LABELS } from './slices/language-slice';

/**
 * Combined preferences store using Zustand slices pattern
 *
 * Consolidates all user appearance preferences:
 * - Theme (reading themes, dark mode, auto mode)
 * - Font (family, size scaling)
 * - Language (en, zh)
 *
 * Benefits:
 * - Single source of truth for all preferences
 * - Atomic updates (all preferences load/save together)
 * - Better performance (single subscription vs 3 nested contexts)
 * - Persistent across app restarts (AsyncStorage)
 * - Cross-platform (iOS, Android, Web via localStorage)
 */
type PreferencesStore = ThemeSlice & FontSlice & LanguageSlice;

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createFontSlice(...a),
      ...createLanguageSlice(...a),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/**
 * Hook to access all preferences with computed values
 *
 * Adds computed theme colors based on theme mode and system preference
 * Includes hydration status to prevent flash of unstyled content
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, themeMode, setThemeMode, hasHydrated } = usePreferences();
 *
 *   if (!hasHydrated) {
 *     return <LoadingScreen />; // Optional: show loading until hydrated
 *   }
 *
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>
 *         Current theme: {themeMode}
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function usePreferences() {
  const systemColorScheme = useColorScheme();
  const store = usePreferencesStore();

  // Check if store has been hydrated from AsyncStorage
  const hasHydrated = usePreferencesStore.persist.hasHydrated();

  // Compute current theme colors based on theme mode and system preference
  const colors = getThemeColors(store.themeMode, systemColorScheme);

  return {
    // Hydration status (useful for preventing flash of unstyled content)
    hasHydrated,

    // Theme
    themeMode: store.themeMode,
    setThemeMode: store.setThemeMode,
    colors,

    // Font
    fontFamily: store.fontFamily,
    fontSize: store.fontSize,
    setFontFamily: store.setFontFamily,
    setFontSize: store.setFontSize,

    // Language
    language: store.language,
    setLanguage: store.setLanguage,
  };
}

/**
 * Backward-compatible hook for theme context
 *
 * @deprecated Use usePreferences() instead for access to all preferences
 */
export function useThemeContext() {
  const { themeMode, setThemeMode, colors } = usePreferences();
  return { themeMode, setThemeMode, colors };
}

/**
 * Backward-compatible hook for font context
 *
 * @deprecated Use usePreferences() instead for access to all preferences
 */
export function useFontContext() {
  const { fontFamily, fontSize, setFontFamily, setFontSize } = usePreferences();
  return { fontFamily, fontSize, setFontFamily, setFontSize };
}

/**
 * Backward-compatible hook for language context
 *
 * @deprecated Use usePreferences() instead for access to all preferences
 */
export function useLanguageContext() {
  const { language, setLanguage } = usePreferences();
  return { language, setLanguage };
}

/**
 * Provider component for preferences
 * With Zustand, this is optional but kept for consistency with legacy code
 */
export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Legacy provider aliases for backward compatibility
export const ThemeProvider = PreferencesProvider;
export const FontProvider = PreferencesProvider;
export const LanguageProvider = PreferencesProvider;
