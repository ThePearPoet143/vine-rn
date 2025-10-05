# Web Platform Configuration

Complete documentation for React Native Web setup, configuration, and troubleshooting.

## Overview

Vine uses **React Native Web** to deploy the same codebase to web browsers. This document covers the web-specific configuration, known issues, and solutions.

---

## Architecture

### Tech Stack

- **React Native Web**: v0.21.0
- **Metro Bundler**: Web bundling for Expo SDK 54
- **Expo Router**: v6.0.10 with web support
- **Output Mode**: Single-page application (SPA)

### Platform Detection

React Native automatically handles platform detection:

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
}
```

### Platform-Specific Files

**Current approach**: Minimal use of `.web.tsx` files (following Bluesky pattern)

**When to use `.web.tsx`**:
- Only 1 file currently uses this: `hooks/use-color-scheme.web.ts`
- For substantial platform differences (not minor tweaks)
- When Platform module checks become unwieldy

**Example structure** (if needed in future):
```
app/
  (drawer)/
    _layout.tsx       # Mobile drawer navigation
    _layout.web.tsx   # Web sidebar navigation
```

---

## Configuration Files

### 1. app.json - Web Settings

```json
{
  "expo": {
    "web": {
      "output": "single",
      "favicon": "./assets/images/favicon.png"
    }
  }
}
```

**Output modes**:
- `single`: SPA with client-side routing (current)
- `static`: Static site generation (SSG) - blocked by expo-router vaul dependency
- `server`: Server-side rendering (SSR) - requires additional setup

### 2. babel.config.js - Web Transforms

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          unstable_transformImportMeta: true, // REQUIRED for web
        },
      ],
      "nativewind/babel",
    ],
  };
};
```

**Why `unstable_transformImportMeta` is required**:
- Expo Router SDK 54+ uses ESM packages with `import.meta`
- SPA mode requires this transform to work in browser
- Without it: `SyntaxError: Cannot use 'import.meta' outside a module`

### 3. metro.config.js - Web Bundling

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

**Current config**: Uses default Expo web resolver
**Future enhancement**: Custom resolver for platform-specific module replacement

---

## Known Issues & Solutions

### Issue 1: @radix-ui/react-dialog Not Found

**Error**:
```
Metro error: Cannot find module '@radix-ui/react-dialog'
```

**Root cause**:
- expo-router v6 includes **vaul** (web drawer component)
- vaul depends on `@radix-ui/react-dialog` (DOM-only library)
- Static rendering mode tries to bundle radix-ui in Node.js environment
- Radix UI uses browser APIs that don't exist in Node.js

**Solution**:
Changed `web.output` from `"static"` to `"single"` in app.json

**Trade-off**:
- ❌ Lost: SEO benefits, static HTML generation
- ✅ Gained: Simpler deployment, no SSR complexity

**Alternative solutions explored**:
1. ❌ Metro custom resolver to mock radix-ui (complex)
2. ❌ Create `.web.tsx` drawer override (too much refactoring)
3. ✅ Change output mode (simplest, works immediately)

### Issue 2: Cannot Use 'import.meta' Outside Module

**Error**:
```
Uncaught SyntaxError: Cannot use 'import.meta' outside a module
```

**Root cause**:
- Modern ESM packages use `import.meta` for module metadata
- Browser requires `<script type="module">` to support `import.meta`
- Expo's default web bundling doesn't enable module transform

**Solution**:
Enabled `unstable_transformImportMeta: true` in babel.config.js

**Why it works**:
- Babel transforms `import.meta` calls into compatible code
- Works in both module and non-module script contexts
- Experimental but stable in Expo SDK 54+

---

## Web-Specific Polyfills

React Native Web automatically provides these polyfills:

### AsyncStorage → localStorage

```typescript
// Same code works on all platforms!
import AsyncStorage from '@react-native-async-storage/async-storage';

// iOS/Android: Native storage
// Web: localStorage with same API
await AsyncStorage.setItem('key', 'value');
```

**Implementation**:
- Zustand persist middleware uses AsyncStorage
- Storage key: `'user-preferences'`
- Automatically uses localStorage on web

### Platform-Specific Components

| React Native | Web Equivalent |
|--------------|----------------|
| `<View>` | `<div>` |
| `<Text>` | `<span>` |
| `<Image>` | `<img>` |
| `<ScrollView>` | `<div>` with overflow |
| `<TextInput>` | `<input>` / `<textarea>` |

### Native Modules with Web Fallbacks

| Module | Web Behavior |
|--------|--------------|
| `expo-haptics` | No-op (silent failure) |
| `expo-symbols` | Fallback to IconSymbol component |
| `react-native-gesture-handler` | Web gesture polyfills |

---

## Drawer Navigation on Web

### Current Implementation

Using **expo-router/drawer** which includes:
- Mobile: React Navigation drawer (swipe from left)
- Web: vaul drawer component (Radix UI based)

**How it works**:
```typescript
import { Drawer } from 'expo-router/drawer';

// expo-router automatically uses:
// - React Navigation drawer on iOS/Android
// - vaul drawer on web
```

**UX differences**:
- Mobile: Native drawer with gestures
- Web: Modal-like drawer overlay

### Future Enhancement: Platform-Specific Navigation

For better web UX, consider creating `_layout.web.tsx`:

```typescript
// app/(drawer)/_layout.web.tsx
export default function WebLayout() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Permanent sidebar on web */}
      <Sidebar />
      <main>
        <Slot />
      </main>
    </div>
  );
}
```

**When to implement**:
- User feedback indicates poor drawer UX on web
- Desktop-first usage patterns emerge
- Following Bluesky's approach (they have 2 `.web.tsx` files total)

---

## Development Workflow

### Local Development

```bash
# Start web dev server
npm run web
# or
npx expo start --web

# With cache clearing
npx expo start --web --clear
```

**Dev server**: http://localhost:8081

**Hot reload**: Enabled by default

**Browser DevTools**: React DevTools work normally

### Debugging

**Console logs**:
```typescript
console.log('[web] Debug info'); // Shows in browser console
```

**React DevTools**:
- Install React DevTools browser extension
- Works same as regular React app

**Network tab**:
- View bundle loading
- Check asset sizes
- Monitor API calls

---

## Performance Optimization

### Bundle Size

**Current size**: 4.12 MB (entry.js)

**Includes**:
- React 19.1.0
- React Native Web
- Expo Router
- All app code
- Theme system
- Font system
- Navigation

**Optimization opportunities** (future):
1. Code splitting by route
2. Lazy loading for heavy components
3. Dynamic imports for theme variants
4. Asset CDN for static files

### Load Time Optimization

**Current approach**: Single bundle (SPA)

**First load**:
1. Download 4.12 MB JS bundle
2. Parse and execute
3. Hydrate AsyncStorage (theme preferences)
4. Render app

**Subsequent loads**:
- Bundle cached by browser
- Only hydration delay

**Future improvements**:
- Route-based code splitting
- Service worker for offline support
- Static site generation (when radix-ui issue resolved)

---

## Best Practices

### 1. Use Platform Module for Minor Differences

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      web: 20,
      default: 16,
    }),
  },
});
```

### 2. Avoid Web-Only Libraries

**Bad**:
```typescript
import ReactDOM from 'react-dom'; // Won't work on mobile!
```

**Good**:
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const ReactDOM = require('react-dom');
  // Use ReactDOM
}
```

### 3. Test All Platforms

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android

# Web
npx expo start --web
```

### 4. Progressive Enhancement

Build for mobile first, enhance for web:
```typescript
const containerStyle = {
  width: '100%',
  ...(Platform.OS === 'web' && {
    maxWidth: 1200,
    margin: '0 auto',
  }),
};
```

---

## Deployment

### Export for Production

```bash
npx expo export --platform web
```

**Output**: `dist/` directory containing:
- `index.html` - Entry point
- `_expo/static/js/` - JavaScript bundles
- `_expo/static/css/` - Stylesheets
- Assets (fonts, images)

### Deploy to EAS Hosting

```bash
eas deploy
```

**What it does**:
1. Uploads `dist/` contents to EAS CDN
2. Generates unique deployment ID
3. Provides preview URL
4. Updates deployment dashboard

### Deploy to Other Platforms

**Netlify**:
```bash
npx expo export --platform web
netlify deploy --dir=dist --prod
```

**Vercel**:
```bash
npx expo export --platform web
vercel --prod
```

**Cloudflare Pages**:
```bash
npx expo export --platform web
wrangler pages publish dist
```

---

## Troubleshooting

### Web bundle won't load

**Symptoms**:
- Blank white screen
- Console errors about modules
- "Cannot find module" errors

**Solutions**:
1. Clear Metro cache: `npx expo start --web --clear`
2. Clear browser cache: Hard refresh (Cmd+Shift+R)
3. Check babel.config.js has `unstable_transformImportMeta: true`
4. Verify app.json has `web.output: "single"`

### Styles look broken

**Check**:
1. NativeWind configured in metro.config.js
2. global.css imported
3. Tailwind classes applied correctly

### AsyncStorage not persisting

**Check**:
1. Browser localStorage enabled (not in incognito mode)
2. Storage key matches: `'user-preferences'`
3. Check browser DevTools > Application > Local Storage

### Drawer not working

**Current known issue**: Drawer works but UX is different from mobile
**Solution**: This is expected behavior (vaul drawer on web)
**Future fix**: Create `.web.tsx` with sidebar navigation

---

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Safari 14+ (Desktop & Mobile)
- ✅ Firefox 88+
- ✅ Edge 90+

### Required Browser Features

- ES2020 support
- localStorage
- CSS Flexbox
- CSS Grid
- Async/await

### Polyfills Included

React Native Web includes:
- Array.prototype.flatMap
- Object.fromEntries
- Promise.allSettled
- String.prototype.matchAll

---

## Resources

- **React Native Web Docs**: https://necolas.github.io/react-native-web/
- **Expo Web Docs**: https://docs.expo.dev/workflow/web/
- **Platform-Specific Code**: https://docs.expo.dev/router/advanced/platform-specific-modules/
- **Bluesky Architecture**: https://github.com/bluesky-social/social-app

---

**Last Updated**: 2025-10-04
**React Native Web**: v0.21.0
**Expo SDK**: 54
**Bundle Size**: 4.12 MB
