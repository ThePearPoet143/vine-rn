import React, { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Font family options for reading text
 * Following industry standards from Bible apps (YouVersion, ESV)
 * - system: SF Pro (iOS default, excellent readability)
 * - serif: New York (iOS serif font for traditional reading)
 * - mono: Menlo (monospace for code/technical content)
 */
export type FontFamily = 'system' | 'serif' | 'mono';

/**
 * Font context providing global font preferences
 *
 * Features:
 * - Font family switching (System/Serif/Mono)
 * - Font size multiplier (50% - 200%)
 * - Works in conjunction with iOS Dynamic Type (82% - 310%)
 * - Combined maximum: 620% (200% app × 310% iOS)
 *
 * @example
 * ```tsx
 * const { fontFamily, setFontFamily, fontSize, setFontSize } = useFontContext();
 *
 * // Change font family
 * setFontFamily('serif');
 *
 * // Change font size (1.0 = 100%, 1.5 = 150%, etc.)
 * setFontSize(1.5);
 * ```
 */
interface FontContextValue {
  /** Current font family */
  fontFamily: FontFamily;
  /** Set font family */
  setFontFamily: (family: FontFamily) => void;
  /**
   * Font size multiplier (0.5 = 50%, 1.0 = 100%, 2.0 = 200%)
   * This works WITH iOS Dynamic Type, not instead of it
   * Combined scaling = fontSize × iOS Dynamic Type scale
   */
  fontSize: number;
  /** Set font size multiplier (0.5 - 2.0) */
  setFontSize: (size: number) => void;
}

const FontContext = createContext<FontContextValue | undefined>(undefined);

/**
 * Provider component for font preferences
 * Must wrap the app at root level (see app/_layout.tsx)
 */
export function FontProvider({ children }: { children: ReactNode }) {
  const [fontFamily, setFontFamily] = useState<FontFamily>('system');
  const [fontSize, setFontSize] = useState<number>(1.0);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily, fontSize, setFontSize }}>
      {children}
    </FontContext.Provider>
  );
}

/**
 * Hook to access font preferences
 * Must be used within FontProvider
 *
 * @throws Error if used outside FontProvider
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { fontFamily, fontSize } = useFontContext();
 *   return <Text style={{ fontFamily, fontSize: 17 * fontSize }}>Hello</Text>;
 * }
 * ```
 */
export function useFontContext() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFontContext must be used within FontProvider');
  }
  return context;
}
