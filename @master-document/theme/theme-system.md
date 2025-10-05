# Theme System Architecture

## Overview

Vine uses a semantic theme system that eliminates scattered conditionals and follows industry standards (Material Design, iOS HIG, Ant Design). All themes share the same semantic color structure with different values.

## Theme Structure

### Available Themes

**Light Themes** (isDark: false):
- **Light** - Classic white background (#FFFFFF)
- **Parchment** - Subtle warm tones (#FAF9F5, #F5F4ED)
- **Sepia** - Kindle-inspired warm reading (#FBF0D9)
- **Green** - Nature-inspired calming (#D5E8D4)

**Dark Themes** (isDark: true):
- **Dark** - True black OLED-friendly (#000000)
- **Night** - Deep charcoal with warm undertones (#30302E, #1F1E1D)
- **Warm Dark** - Dark with warm tones (#1A1510)

**Auto Mode**:
- Automatically switches between Light and Dark based on system preference

## Theme Color Properties

### Core Colors
```typescript
background: string;           // Main background
text: string;                 // Primary text
secondaryBackground: string;  // Secondary surfaces
secondaryText: string;        // Secondary text (75% opacity)
tertiaryText: string;         // Tertiary text (30% opacity)
```

### Card & Layout Colors
```typescript
cardBackground: string;       // Card surfaces
groupedBackground: string;    // Grouped list background (also drawer bg)
border: string;               // Border lines
separator: string;            // List separators
```

### Interaction Overlays (Eliminates conditionals!)
```typescript
pressOverlay: string;         // Press feedback overlay
hoverOverlay: string;         // Hover state overlay
```

**Light themes use**: `rgba(0, 0, 0, 0.05)` for press, `rgba(0, 0, 0, 0.03)` for hover
**Dark themes use**: `rgba(255, 255, 255, 0.1)` for press, `rgba(255, 255, 255, 0.05)` for hover

### Navigation Colors
```typescript
drawerBorder: string;         // Drawer right border
drawerOverlay: string;        // Drawer scrim overlay
```

**Light themes use**: Light wash overlay (e.g., `rgba(255, 255, 255, 0.6)`) to fade/wash out content
**Dark themes use**: `transparent` overlay (no fade effect)

### Component-Specific Colors
```typescript
switchTrackInactive: string;  // Switch track when off
```

### Metadata
```typescript
isDark: boolean;              // Theme category
name: string;                 // Display name
description: string;          // Theme description
contrastRatio: string;        // WCAG contrast ratio
```

## Color Usage Patterns

### ❌ OLD WAY (Scattered Conditionals)
```typescript
// BAD: Inline conditionals everywhere
backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
borderColor: colors.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
```

### ✅ NEW WAY (Semantic Properties)
```typescript
// GOOD: Use semantic properties
backgroundColor: colors.pressOverlay
borderColor: colors.drawerBorder
```

## iOS System Colors

### Centralized Color Constants

All iOS system colors are defined in `constants/colors.ts`:

```typescript
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
};
```

### Helper Functions

```typescript
// Get accent blue
getAccentBlue(isDark: boolean): string

// Get any system color
getSystemColor(color: keyof typeof IOS_SYSTEM_COLORS, isDark: boolean): string
```

### Usage Example

```typescript
// ❌ OLD WAY
backgroundColor: colors.isDark ? '#0A84FF' : '#007AFF'

// ✅ NEW WAY
backgroundColor: getSystemColor('blue', colors.isDark)
```

## Component Integration

### Drawer Layout
```typescript
// app/(drawer)/_layout.tsx
screenOptions={{
  drawerStyle: {
    borderRightColor: colors.drawerBorder,  // ✅ Semantic
  },
  overlayColor: colors.drawerOverlay,        // ✅ Semantic
  drawerActiveBackgroundColor: colors.pressOverlay, // ✅ Semantic
}}
```

### List Items
```typescript
// components/ui/list-item.tsx
<Animated.View
  style={{
    backgroundColor: colors.pressOverlay,    // ✅ Semantic
  }}
/>
```

### Switches
```typescript
// components/ui/switch.tsx
const TRACK_INACTIVE = colors.switchTrackInactive; // ✅ Semantic
const TRACK_ACTIVE = getAccentBlue(colors.isDark); // ✅ Helper
```

## Adding a New Theme

1. **Define theme colors** in `constants/themes.ts`:

```typescript
export const MyNewTheme: ThemeColors = {
  // Core colors
  background: '#YOURCOLOR',
  text: '#YOURCOLOR',
  secondaryBackground: '#YOURCOLOR',
  secondaryText: 'rgba(...)',
  tertiaryText: 'rgba(...)',

  // Card & layout
  cardBackground: '#YOURCOLOR',
  groupedBackground: '#YOURCOLOR',
  border: 'rgba(...)',
  separator: 'rgba(...)',

  // Interaction overlays (use standard patterns)
  pressOverlay: 'rgba(0, 0, 0, 0.05)',      // Light theme
  // OR
  pressOverlay: 'rgba(255, 255, 255, 0.1)', // Dark theme
  hoverOverlay: 'rgba(0, 0, 0, 0.03)',      // Light theme
  // OR
  hoverOverlay: 'rgba(255, 255, 255, 0.05)', // Dark theme

  // Navigation (use standard patterns)
  drawerBorder: 'rgba(0, 0, 0, 0.1)',       // Light theme
  // OR
  drawerBorder: 'rgba(255, 255, 255, 0.1)', // Dark theme
  drawerOverlay: 'rgba(255, 255, 255, 0.6)', // Light theme (wash out effect)
  // OR
  drawerOverlay: 'transparent',             // Dark theme (no overlay)

  // Components
  switchTrackInactive: '#YOURCOLOR',

  // Metadata
  isDark: false, // or true
  name: 'My New Theme',
  description: 'Your description',
  contrastRatio: '7:1',
};
```

2. **Add to theme map**:
```typescript
export const Themes = {
  // ... existing themes
  'my-new': MyNewTheme,
};
```

3. **Add to ThemeMode type**:
```typescript
export type ThemeMode = 'light' | 'dark' | 'my-new' | ... | 'auto';
```

4. **Add to appearance options** in `constants/appearance.ts`:
```typescript
{ mode: 'my-new', label: 'My New Theme', icon: 'icon.fill' }
```

## Benefits

✅ **Zero scattered conditionals** (only 3 remaining in external API compatibility layer)
✅ **Single source of truth** - All colors defined once in theme
✅ **Easy theme creation** - Just define values, no component changes
✅ **Type-safe** - TypeScript autocomplete for all properties
✅ **Industry standard** - Matches Material Design, iOS HIG, Ant Design
✅ **Better DX** - Clear semantic naming, no magic values

## Architecture Compliance

This theme system follows:
- **Material Design** - Semantic color tokens
- **iOS Human Interface Guidelines** - Adaptive color system
- **Ant Design** - Theme token architecture
- **Design Systems Best Practices** - Single source of truth, no component-level conditionals
