# Preferences Context Architecture

## Overview

This directory contains the unified preferences management system for the Vine Bible app. All user appearance preferences (theme, font, language) are managed through a single Zustand store using the **slices pattern** for modularity and maintainability.

## Architecture Decision

### Why We Consolidated

Previously, we had three separate context providers:
- `ThemeProvider` (Zustand)
- `FontProvider` (React Context + useState)
- `LanguageProvider` (React Context + useState)

**Problems with the old approach:**
- 3 nested providers in `_layout.tsx` causing provider pyramid
- Mixed state management (Zustand + React Context)
- 3 separate subscriptions = potential performance issues
- Difficult to add persistence (would need to sync 3 stores)
- No single source of truth for user preferences

**Benefits of consolidation:**
- ✅ Single `PreferencesProvider` wrapper
- ✅ Consistent Zustand-based state management
- ✅ Single subscription point = better performance
- ✅ Atomic updates (all preferences load/save together)
- ✅ Easy to add new preferences (just add a slice)
- ✅ Simple to add persistence with Zustand middleware
- ✅ Cleaner API: `usePreferences()` vs 3 different hooks

### Industry Standards Followed

This implementation follows:

1. **Zustand Slices Pattern** (Official recommendation)
   - Each concern (theme/font/language) is a separate slice
   - Slices are combined into a single store
   - Modular, testable, maintainable

2. **Single Store for Related State**
   - Theme, font, and language are all "user appearance preferences"
   - They're always used together
   - They'll share the same persistence logic

3. **Backward Compatibility**
   - Existing code continues to work via compatibility hooks
   - No breaking changes during migration
   - Gradual adoption of new API

## Directory Structure

```
contexts/
├── README.md                    # This file
├── preferences-context.tsx      # Unified store + hooks
└── slices/                      # Modular state slices
    ├── theme-slice.ts          # Theme preferences
    ├── font-slice.ts           # Font preferences
    └── language-slice.ts       # Language preferences
```

## Usage

### Primary API (Recommended)

Access all preferences from a single hook:

```typescript
import { usePreferences } from '@/contexts/preferences-context';

function MyComponent() {
  const {
    // Theme
    themeMode,
    setThemeMode,
    colors,

    // Font
    fontFamily,
    fontSize,
    setFontFamily,
    setFontSize,

    // Language
    language,
    setLanguage,
  } = usePreferences();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{
        color: colors.text,
        fontFamily: fontFamily === 'serif' ? 'New York' : 'System',
        fontSize: 17 * fontSize
      }}>
        {language === 'en' ? 'Hello' : '你好'}
      </Text>
    </View>
  );
}
```

### Backward Compatible API

For existing code, the old hooks still work:

```typescript
import {
  useThemeContext,    // Returns: { themeMode, setThemeMode, colors }
  useFontContext,     // Returns: { fontFamily, fontSize, setFontFamily, setFontSize }
  useLanguageContext, // Returns: { language, setLanguage }
} from '@/contexts/preferences-context';

function LegacyComponent() {
  const { colors } = useThemeContext();
  const { fontFamily } = useFontContext();
  const { language } = useLanguageContext();

  // Works exactly as before
}
```

### Provider Setup

In `app/_layout.tsx`:

```typescript
import { PreferencesProvider } from '@/contexts/preferences-context';

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <RootLayoutNav />
    </PreferencesProvider>
  );
}
```

## State Structure

The unified preferences store has this shape:

```typescript
interface PreferencesStore {
  // Theme Slice
  themeMode: 'auto' | 'light' | 'dark' | 'sepia' | 'warm-dark' | 'green';
  setThemeMode: (mode: ThemeMode) => void;

  // Font Slice
  fontFamily: 'system' | 'serif' | 'mono';
  fontSize: number; // 0.8 - 1.5 (80% - 150%)
  setFontFamily: (family: FontFamily) => void;
  setFontSize: (size: number) => void;

  // Language Slice
  language: 'en' | 'zh';
  setLanguage: (language: Language) => void;
}
```

### Computed Values

The `usePreferences()` hook adds computed values:

- **`colors`**: Computed from `themeMode` + system color scheme
  - Auto mode uses system dark/light preference
  - Returns appropriate `ThemeColors` object
  - All 6 themes are WCAG AAA compliant (7:1+ contrast)

## Slices Deep Dive

### Theme Slice (`slices/theme-slice.ts`)

**Responsibilities:**
- Store current theme mode
- Provide theme mode setter

**Note:** Color computation happens in the hook, not the slice. This keeps the slice pure and allows the hook to respond to system color scheme changes.

**Available Themes:**
- `auto` - Follows system dark/light preference
- `light` - Classic white background (21:1 contrast)
- `dark` - True black for OLED (21:1 contrast)
- `sepia` - Warm reading (7.2:1 contrast)
- `warm-dark` - Dark with warm tones (12:1 contrast)
- `green` - Nature-inspired (8.5:1 contrast)

### Font Slice (`slices/font-slice.ts`)

**Responsibilities:**
- Store font family preference
- Store font size multiplier
- Provide setters for both

**Font Families:**
- `system` - SF Pro (iOS default, excellent readability)
- `serif` - New York (traditional reading, iOS 13+)
- `mono` - Menlo (monospace for technical content)

**Font Scaling:**
- App multiplier: 0.8x - 1.5x (80% - 150%)
- Works WITH iOS Dynamic Type (not instead of)
- Combined max: 620% (1.5 app × 3.1 iOS accessibility)

### Language Slice (`slices/language-slice.ts`)

**Responsibilities:**
- Store current app language
- Provide language setter
- Export language labels for UI

**Supported Languages:**
- `en` - English
- `zh` - Simplified Chinese (简体中文)

**Labels:**
```typescript
LANGUAGE_LABELS = {
  en: { native: 'English', english: 'English' },
  zh: { native: '简体中文', english: 'Simplified Chinese' },
};
```

## Adding a New Preference

To add a new preference slice (e.g., `notification-slice.ts`):

### 1. Create the Slice File

```typescript
// contexts/slices/notification-slice.ts
import { type StateCreator } from 'zustand';

export interface NotificationSlice {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export const createNotificationSlice: StateCreator<NotificationSlice> = (set) => ({
  notificationsEnabled: true,
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
});
```

### 2. Add to Combined Store

```typescript
// contexts/preferences-context.tsx
import { createNotificationSlice, type NotificationSlice } from './slices/notification-slice';

type PreferencesStore = ThemeSlice & FontSlice & LanguageSlice & NotificationSlice;

export const usePreferencesStore = create<PreferencesStore>()((...a) => ({
  ...createThemeSlice(...a),
  ...createFontSlice(...a),
  ...createLanguageSlice(...a),
  ...createNotificationSlice(...a), // Add here
}));
```

### 3. Export from Hook

```typescript
export function usePreferences() {
  const store = usePreferencesStore();

  return {
    // ... existing

    // Notifications
    notificationsEnabled: store.notificationsEnabled,
    setNotificationsEnabled: store.setNotificationsEnabled,
  };
}
```

That's it! The new preference is now available throughout the app.

## Future Enhancements

### Adding Persistence

To persist preferences to AsyncStorage or MMKV:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
```

### Adding DevTools

For debugging in development:

```typescript
import { devtools } from 'zustand/middleware';

export const usePreferencesStore = create<PreferencesStore>()(
  devtools(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createFontSlice(...a),
      ...createLanguageSlice(...a),
    }),
    { name: 'PreferencesStore' }
  )
);
```

## Migration Guide

All files have been automatically migrated. Here's what changed:

### Before (3 Providers)

```typescript
// app/_layout.tsx
<ThemeProvider>
  <FontProvider>
    <LanguageProvider>
      <RootLayoutNav />
    </LanguageProvider>
  </FontProvider>
</ThemeProvider>
```

### After (1 Provider)

```typescript
// app/_layout.tsx
<PreferencesProvider>
  <RootLayoutNav />
</PreferencesProvider>
```

### Import Changes

**Old:**
```typescript
import { useThemeContext } from '@/contexts/theme-context';
import { useFontContext } from '@/contexts/font-context';
import { useLanguageContext } from '@/contexts/language-context';
```

**New:**
```typescript
import { useThemeContext, useFontContext, useLanguageContext } from '@/contexts/preferences-context';
// OR (recommended)
import { usePreferences } from '@/contexts/preferences-context';
```

## Performance Considerations

### Why Zustand Over React Context

**React Context + useState:**
- Every state update triggers re-renders of all consumers
- Multiple contexts = multiple subscriptions
- Can cause unnecessary re-renders

**Zustand:**
- Only components that use changed values re-render
- Selector-based subscriptions
- Better performance for frequently updated state

### Selector Pattern (Advanced)

For optimal performance, you can use selectors:

```typescript
// Only re-renders when themeMode changes
const themeMode = usePreferencesStore((state) => state.themeMode);

// Only re-renders when fontSize changes
const fontSize = usePreferencesStore((state) => state.fontSize);
```

The `usePreferences()` hook is optimized for convenience, but for performance-critical components, direct selector usage is available.

## Testing

### Unit Testing Slices

Each slice is a pure function and easy to test:

```typescript
import { createThemeSlice } from './theme-slice';

test('theme slice sets theme mode', () => {
  const setState = jest.fn();
  const slice = createThemeSlice(setState, () => ({}), {});

  slice.setThemeMode('dark');

  expect(setState).toHaveBeenCalledWith({ themeMode: 'dark' });
});
```

### Integration Testing

```typescript
import { renderHook, act } from '@testing-library/react-native';
import { usePreferences } from './preferences-context';

test('preferences hook provides all values', () => {
  const { result } = renderHook(() => usePreferences());

  expect(result.current.themeMode).toBe('auto');
  expect(result.current.fontFamily).toBe('system');
  expect(result.current.language).toBe('en');

  act(() => {
    result.current.setThemeMode('dark');
  });

  expect(result.current.themeMode).toBe('dark');
});
```

## References

- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Zustand Slices Pattern](https://zustand.docs.pmnd.rs/guides/slices-pattern)
- [React Native Performance Best Practices](https://reactnative.dev/docs/performance)
- [WCAG AAA Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced)

## Questions?

For questions or issues with the preferences system, refer to this document or check the inline code documentation in:
- `preferences-context.tsx`
- `slices/theme-slice.ts`
- `slices/font-slice.ts`
- `slices/language-slice.ts`
