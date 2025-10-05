# Theme Color Usage Standards

## Background Color Hierarchy

The theme system uses two primary background colors to create visual hierarchy:

### `colors.background`
- **Purpose**: Main content background color
- **Usage**: For content areas that need to stand out (cards, modals, popovers)
- **DO NOT USE FOR**: Screen containers or headers

### `colors.groupedBackground`
- **Purpose**: Provides subtle contrast for grouped content and navigation areas
- **Usage**:
  - Stack navigator headers (`headerStyle.backgroundColor`)
  - Screen container backgrounds (`backgroundColor`)
  - Grouped list backgrounds
  - Section backgrounds
- **ALWAYS USE FOR**: New screen containers and headers

## Visual Hierarchy Pattern

```
┌─────────────────────────────┐
│  Header (groupedBackground) │ ← Stack navigator header
├─────────────────────────────┤
│                             │
│  Screen (groupedBackground) │ ← Screen container
│                             │
│  ┌─────────────────────┐    │
│  │  Card (background)  │    │ ← Cards/content stand out
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

## Implementation Rules

### ✅ CORRECT: New Screen Template

```typescript
export default function MyScreen() {
  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      {/* Screen content */}
    </View>
  );
}
```

### ✅ CORRECT: Stack Navigator Header

```typescript
export default function MyLayout() {
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.groupedBackground, // ← Always use groupedBackground
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      {/* Screens */}
    </Stack>
  );
}
```

### ❌ INCORRECT: Using background for screens/headers

```typescript
// DON'T DO THIS
<View style={[styles.container, { backgroundColor: colors.background }]}>

// DON'T DO THIS
headerStyle: {
  backgroundColor: colors.background,
}
```

## Theme Color Values

All 7 themes maintain different values for `background` and `groupedBackground` to create proper visual hierarchy:

| Theme | background | groupedBackground |
|-------|-----------|-------------------|
| Light | #FFFFFF | #F2F2F7 |
| Dark | #000000 | #1C1C1E |
| Parchment | #FAF9F5 | #F5F4ED |
| Night | #30302E | #1F1E1D |
| Sepia | #F4ECD8 | #F0E7D0 |
| Warm Dark | #2B2621 | #1F1C19 |
| Green | #F0F4EE | #E8F0E3 |

**IMPORTANT**: Never set `groupedBackground = background` as it breaks visual hierarchy and may violate WCAG compliance.

## WCAG Compliance

The color contrast ratios are calculated based on:
- Text on `groupedBackground` (for headers and screen content)
- Text on `background` (for cards and elevated content)

Changing these values can break AAA compliance. Always maintain the original color values.
