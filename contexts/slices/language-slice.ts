import { type StateCreator } from 'zustand';

/**
 * Supported languages
 */
export type Language = 'en' | 'zh';

/**
 * Language labels for display
 */
export const LANGUAGE_LABELS: Record<Language, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '简体中文', english: 'Simplified Chinese' },
};

/**
 * Language slice state interface
 */
export interface LanguageSlice {
  /** Current app language */
  language: Language;
  /** Set app language */
  setLanguage: (language: Language) => void;
}

/**
 * Language slice for preferences store
 *
 * Manages app language/localization preferences:
 * - English (en)
 * - Simplified Chinese (zh)
 */
export const createLanguageSlice: StateCreator<LanguageSlice> = (set) => ({
  language: 'en',
  setLanguage: (language) => set({ language: language }),
});
