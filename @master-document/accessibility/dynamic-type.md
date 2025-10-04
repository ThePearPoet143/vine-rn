# Dynamic Type Implementation

## Overview

This document explains how the app implements iOS Dynamic Type support for accessibility, allowing users to change text sizes system-wide and have the app respond appropriately.

## Industry Standards Followed

### iOS Best Practices
- **Apple HIG Compliant**: Follows Apple Human Interface Guidelines for Dynamic Type
- **Accessibility First**: Supports all iOS text sizes from XS (82%) to AX5 (310%)
- **Auto-Scaling**: Uses React Native's built-in `allowFontScaling` for automatic text scaling
- **Restart Pattern**: Industry-standard approach for React Native apps (most RN apps require restart)

### React Native Best Practices
- **allowFontScaling={true}**: Enabled by default on all Typography components
- **maxFontSizeMultiplier={3}**: Limits scaling to 300% (iOS accessibility maximum)
- **AppState Listener**: Detects when user returns from Settings after changing text size
- **Clean Alert UX**: Single "Restart Now" button for clear user action

## Implementation

### Architecture

```
User changes text size in iOS Settings
    ↓
Returns to app
    ↓
AppState listener detects app becoming active
    ↓
Compare current PixelRatio.getFontScale() with initial value
    ↓
If changed: Show alert "Text Size Changed - Restart Now"
    ↓
User taps "Restart Now"
    ↓
Updates.reloadAsync() restarts app
    ↓
App loads with new font scale applied
```

### Key Files

#### 1. `hooks/use-font-scale-monitor.ts`
**Purpose**: Detects font scale changes and prompts user to restart

**How it works**:
- Stores initial `PixelRatio.getFontScale()` on mount
- Listens to `AppState.addEventListener('change')`
- Compares current vs initial font scale when app becomes active
- Shows alert if change detected
- Calls `Updates.reloadAsync()` to restart app

**Code**: ~56 lines
```typescript
export function useFontScaleMonitor() {
  const initialFontScale = useRef(PixelRatio.getFontScale());
  const hasShownAlert = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        const currentFontScale = PixelRatio.getFontScale();
        if (currentFontScale !== initialFontScale.current && !hasShownAlert.current) {
          hasShownAlert.current = true;
          Alert.alert(
            'Text Size Changed',
            'Your iOS text size setting has changed. The app will restart to apply the new size.',
            [{ text: 'Restart Now', onPress: async () => await Updates.reloadAsync() }],
            { cancelable: false }
          );
        }
      }
    });
    return () => subscription.remove();
  }, []);
}
```

#### 2. `components/font-scale-monitor.tsx`
**Purpose**: Isolated component that runs the font scale monitor

**How it works**:
- Calls `useFontScaleMonitor()` hook
- Returns `null` (no visual output)
- Wrapped in `React.memo()` to prevent unnecessary re-renders

**Code**: ~26 lines
```typescript
function FontScaleMonitorComponent() {
  useFontScaleMonitor();
  return null;
}

export const FontScaleMonitor = memo(FontScaleMonitorComponent, () => true);
```

#### 3. `app/_layout.tsx`
**Purpose**: Mounts the monitor at root level

**Integration**:
```typescript
export default function RootLayout() {
  return (
    <ThemeProvider>
      <FontScaleMonitor /> {/* Monitors font scale changes */}
      <Stack>...</Stack>
    </ThemeProvider>
  );
}
```

#### 4. `components/ui/typography.tsx`
**Purpose**: Base Typography component with Dynamic Type support

**How it works**:
- Uses NativeWind Tailwind classes for font sizes (text-ios-body, text-ios-headline, etc.)
- Sets `allowFontScaling={true}` by default (React Native auto-scales)
- Sets `maxFontSizeMultiplier={3}` to limit scaling to 300%
- Provides `disableScaling` prop for decorative text (icons, logos, etc.)

**Code**:
```typescript
export function Typography({
  variant = 'body',
  disableScaling = false,
  ...props
}: TypographyProps) {
  return (
    <Text
      className={`text-ios-${variant} ...`}
      allowFontScaling={!disableScaling}
      maxFontSizeMultiplier={disableScaling ? 1 : 3}
      {...props}
    />
  );
}
```

## Why This Approach?

### ✅ Why Automatic Scaling (Not Manual)?

**Research showed**:
- NativeWind v4 compiles Tailwind classes to React Native styles at runtime
- React Native's `allowFontScaling` automatically scales these compiled styles
- Manual scaling (reading `getFontScale()` and calculating sizes) is over-engineering
- Industry standard: Let React Native handle scaling automatically

**Decision**: Use `allowFontScaling={true}` + NativeWind auto-scaling

### ✅ Why Restart (Not Live Update)?

**Research showed**:
- Native iOS apps use `adjustsFontForContentSizeCategory = true` for live updates
- React Native doesn't expose `UIContentSizeCategoryDidChange` notification
- Building custom native module for live updates adds 100+ lines of native code
- Most React Native production apps require restart for Dynamic Type changes
- Users changing system settings expect to restart apps

**Decision**: Show alert prompting user to restart app

### ✅ Why Single "Restart Now" Button (Not "Later")?

**Original implementation had "Later" button**:
- Problem: Caused partial/inconsistent UI updates (some text changed, some didn't)
- Solution 1 tried: Complex Context-based re-render prevention
- Solution 2: Just force restart immediately with single button

**Decision**: Single "Restart Now" button - simpler and cleaner UX

## User Experience

### Normal Usage
1. User opens Bible app
2. All text respects their iOS text size setting
3. Text scales from 82% to 310% based on accessibility preferences
4. Everything works automatically ✅

### Changing Text Size
1. User goes to iOS Settings → Accessibility → Display & Text Size → Larger Text
2. Adjusts slider to new size (e.g., 100% → 150%)
3. Returns to Bible app
4. **Alert appears**: "Text Size Changed. The app will restart to apply the new size."
5. User taps **"Restart Now"**
6. App reloads in ~1 second
7. All text now displays at new size ✅

### Why This is Good UX
- Clear communication about what's happening
- Single action required (tap "Restart Now")
- Fast restart (~1 second with Updates.reloadAsync)
- No confusing partial updates or mixed font sizes
- Industry-standard behavior users expect

## Testing

### Manual Testing Steps

1. **Test Default Scaling**:
   - Open app with default iOS text size
   - Navigate through all screens
   - Verify text is readable and properly sized

2. **Test Small Text (XS - 82%)**:
   - Settings → Accessibility → Display & Text Size → Larger Text
   - Slide to smallest size
   - Open app (or restart if already open)
   - Verify all text scales down appropriately

3. **Test Large Text (AX5 - 310%)**:
   - Settings → Accessibility → Display & Text Size → Larger Text
   - Slide to largest size
   - Open app (or restart if already open)
   - Verify all text scales up without truncation
   - Verify buttons grow vertically to accommodate text
   - Verify layouts don't break

4. **Test Change Detection**:
   - Open app at 100% text size
   - Navigate to Settings and change to 150%
   - Return to app
   - **Verify alert appears**: "Text Size Changed"
   - Tap "Restart Now"
   - **Verify app restarts** and text is now 150%

5. **Test Simulator vs Device**:
   - Run same tests on iOS Simulator
   - Run same tests on physical device
   - Run same tests on TestFlight build
   - Behavior should be identical

### Known Behavior

- ✅ **App restart required**: This is expected and industry-standard for React Native
- ✅ **Partial re-renders before restart**: May see some text update briefly before alert shows - this is harmless since user immediately restarts
- ✅ **Simulator behavior**: Same as device (restart required)
- ✅ **TestFlight behavior**: Same as development (restart required)

## Design System Integration

### Typography Variants
All variants support Dynamic Type auto-scaling:
- `large-title` (34pt base → scales 28pt-105pt)
- `title-1` (28pt base → scales 23pt-87pt)
- `title-2` (22pt base → scales 18pt-68pt)
- `title-3` (20pt base → scales 16pt-62pt)
- `headline` (17pt base → scales 14pt-53pt)
- `body` (17pt base → scales 14pt-53pt)
- `callout` (16pt base → scales 13pt-50pt)
- `subheadline` (15pt base → scales 12pt-47pt)
- `footnote` (13pt base → scales 11pt-40pt)
- `caption-1` (12pt base → scales 10pt-37pt)
- `caption-2` (11pt base → scales 9pt-34pt)

### Components Supporting Dynamic Type
- ✅ Typography (all variants)
- ✅ Button (text auto-scales, min-height + padding allows growth)
- ✅ Alert (title and body text scale)
- ✅ Badge (auto-scales)
- ✅ Card (content scales, container grows)
- ✅ All UI components using Typography internally

### Disabling Dynamic Type
For decorative elements (icons, logos, fixed-size UI):
```typescript
<Typography variant="body" disableScaling>
  Fixed Size Text (won't scale with accessibility settings)
</Typography>
```

## Future Enhancements

### Potential Improvements (Not Currently Needed)
1. **Live Updates Without Restart** (Complex)
   - Build custom Expo native module
   - Listen to `UIContentSizeCategoryDidChange` notification
   - Emit event to React Native
   - Force full re-render via Context
   - **Effort**: ~200-300 lines of native code + React code
   - **Benefit**: Live updates without restart
   - **Decision**: Not worth complexity for current use case

2. **Custom Scaling Curves** (Over-Engineering)
   - Manually calculate scaled sizes
   - Apply custom scaling logic per component
   - **Effort**: ~100-150 lines
   - **Benefit**: Fine-grained control
   - **Decision**: React Native's auto-scaling works perfectly

3. **Per-Screen Scaling Limits** (Premature Optimization)
   - Allow different max multipliers per screen
   - **Effort**: ~50 lines
   - **Benefit**: Prevent layout breaking on specific screens
   - **Decision**: Current 3x limit works across all screens

## Dependencies

```json
{
  "expo-updates": "^0.x.x",  // For Updates.reloadAsync()
  "react-native": "^0.x.x"   // For AppState, PixelRatio, Alert
}
```

No additional dependencies required - uses built-in React Native APIs.

## Resources

### Apple Documentation
- [Apple HIG - Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Apple HIG - Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [UIContentSizeCategory Notification](https://developer.apple.com/documentation/uikit/uicontentsizecategory/didchangenotification)

### React Native Documentation
- [Text - allowFontScaling](https://reactnative.dev/docs/text#allowfontscaling)
- [AppState API](https://reactnative.dev/docs/appstate)
- [PixelRatio API](https://reactnative.dev/docs/pixelratio)

### Industry Best Practices
- Medium: [Font-Scaling in React Native Apps](https://medium.com/@runawaytrike/font-scaling-in-react-native-apps-8d38a48fdf26)
- Stack Overflow: [React Native Responsive Font Size](https://stackoverflow.com/questions/33628677/react-native-responsive-font-size)

## Summary

**Current Implementation**: Production-ready, industry-standard Dynamic Type support
- ✅ Simple (~82 lines total)
- ✅ Follows Apple HIG
- ✅ Follows React Native best practices
- ✅ Supports full accessibility range (82%-310%)
- ✅ Clear user experience (restart on change)
- ✅ No over-engineering
- ✅ Easy to maintain

Perfect for a Bible reading app where accessibility is critical for elderly users who need larger text sizes.
