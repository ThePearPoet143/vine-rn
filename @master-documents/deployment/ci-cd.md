# CI/CD Documentation - Vine

Complete guide for building, deploying, and managing releases across all platforms.

## Table of Contents

1. [Platform Overview](#platform-overview)
2. [Web Deployment (EAS Hosting)](#web-deployment-eas-hosting)
3. [iOS Deployment](#ios-deployment)
4. [Android Deployment](#android-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Platform Overview

**Vine** is a cross-platform React Native application built with Expo Router that deploys to:

- **Web** (React Native Web) - via EAS Hosting
- **iOS** - via App Store / TestFlight
- **Android** - via Google Play / APK

### Tech Stack

- **Framework**: Expo SDK 54, React Native 0.81.4
- **Router**: expo-router v6.0.10
- **UI**: NativeWind (Tailwind CSS for React Native)
- **State**: Zustand with AsyncStorage persistence
- **Build System**: EAS Build
- **Hosting**: EAS Hosting (Web), App Store (iOS), Google Play (Android)

---

## Web Deployment (EAS Hosting)

### Prerequisites

```bash
# Install EAS CLI globally
npm install --global eas-cli

# Login to Expo account
eas login

# Verify login
eas whoami
```

### Configuration

**app.json** - Web output settings:

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

**babel.config.js** - Required for import.meta support:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          unstable_transformImportMeta: true, // Required for web
        },
      ],
      "nativewind/babel",
    ],
  };
};
```

### Web Output Modes

| Mode | Description | Use Case | SEO |
|------|-------------|----------|-----|
| `single` | Single-page application (SPA) | Dynamic apps, client-side routing | Limited |
| `static` | Static site generation (SSG) | Content sites, blogs | Excellent |
| `server` | Server-side rendering (SSR) | Dynamic content, API routes | Excellent |

**Current configuration**: `single` (chosen for compatibility with expo-router's vaul dependency)

### Deployment Steps

```bash
# 1. Export the web app for production
npx expo export --platform web

# 2. Deploy to EAS Hosting
eas deploy

# Optional: Deploy with a specific message
eas deploy --message "Deploy theme system v2.0"
```

### Deployment Output

After successful deployment, you'll receive:

- **Preview URL**: `https://your-app-name.exp.direct`
- **Deployment ID**: Unique identifier for this deployment
- **Dashboard Link**: Manage deployments at expo.dev

### Web-Specific Fixes Applied

**Issue 1**: Module resolution error with `@radix-ui/react-dialog`
- **Root cause**: expo-router includes vaul (web drawer library) which depends on Radix UI (DOM-only)
- **Solution**: Changed `web.output` from `static` to `single`

**Issue 2**: `Cannot use 'import.meta' outside a module`
- **Root cause**: ESM packages using import.meta in SPA mode
- **Solution**: Enabled `unstable_transformImportMeta` in babel.config.js

### Platform-Specific Considerations

React Native Web automatically polyfills:
- **AsyncStorage** → `localStorage` (web)
- **Platform-specific components** → Web equivalents
- **Native modules** → Web fallbacks

No `.web.tsx` files currently used (following minimal approach like Bluesky).

---

## iOS Deployment

### Prerequisites

```bash
# Ensure you have an Apple Developer account
# Configure app.json with bundleIdentifier

# Current bundleIdentifier: com.northstar-productlabs.vineapp
```

### Configuration

**app.json**:

```json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.northstar-productlabs.vineapp",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    }
  }
}
```

### Build for iOS

```bash
# Development build
eas build --platform ios --profile development

# Production build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### TestFlight Distribution

```bash
# Build and auto-submit to TestFlight
eas build --platform ios --profile production --auto-submit
```

---

## Android Deployment

### Configuration

**app.json**:

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.northstarproductlabs.vineapp"
    }
  }
}
```

### Build for Android

```bash
# Development build
eas build --platform android --profile development

# Production build for Google Play
eas build --platform android --profile production

# Build APK for direct installation
eas build --platform android --profile preview
```

### Submit to Google Play

```bash
eas submit --platform android
```

---

## Environment Configuration

### EAS Project Configuration

**app.json**:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "2c5cfaae-9ab2-4022-8c02-4576f7fb7b41"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/2c5cfaae-9ab2-4022-8c02-4576f7fb7b41"
    }
  }
}
```

### Build Profiles

Create `eas.json` for custom build configurations:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

---

## Troubleshooting

### Web Deployment Issues

**Metro bundler errors**:
```bash
# Clear Metro cache and restart
npx expo start --web --clear

# Clear all caches
npx expo start --clear
```

**Radix UI / vaul errors**:
- Ensure `web.output: "single"` in app.json
- Ensure `unstable_transformImportMeta: true` in babel.config.js

**Deployment fails**:
```bash
# Ensure you've exported before deploying
npx expo export --platform web
eas deploy
```

### iOS Build Issues

**Prebuild issues**:
```bash
# Clean prebuild
npx expo prebuild --clean
```

**Code signing errors**:
- Verify Apple Developer account in EAS dashboard
- Check bundleIdentifier matches provisioning profile

### Android Build Issues

**Gradle build failures**:
```bash
# Update dependencies
npm install
npx expo prebuild --clean
```

### Cross-Platform Issues

**AsyncStorage errors**:
```bash
# Rebuild native projects
npx expo prebuild --clean
```

**Port conflicts**:
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

---

## Continuous Integration (CI)

### GitHub Actions Example

```yaml
name: Deploy Web to EAS Hosting

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Export web
        run: npx expo export --platform web

      - name: Deploy to EAS
        run: eas deploy --auto
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

---

## Monitoring & Analytics

### Deployment Dashboard

Access deployment history and analytics:
- **URL**: https://expo.dev/accounts/thepearpoet143/projects/vine
- **Features**:
  - Deployment history
  - Asset sizes
  - Build logs
  - Crash reports

### Update Analytics

Monitor OTA updates:
```bash
# View update statistics
eas update:view

# View channel information
eas channel:view
```

---

## Best Practices

### Pre-Deployment Checklist

- [ ] Run tests: `npm test`
- [ ] Lint code: `npm run lint`
- [ ] Test on all platforms locally
- [ ] Verify theme persistence works
- [ ] Check bundle size: `npx expo export --platform web`
- [ ] Review breaking changes in CHANGELOG

### Version Management

```json
// app.json
{
  "expo": {
    "version": "1.0.0",
    "runtimeVersion": {
      "policy": "appVersion" // Increment for breaking changes
    }
  }
}
```

### Performance Optimization

**Bundle size optimization**:
```bash
# Analyze bundle
npx expo export --platform web
# Check dist/_expo/static/js/web/entry-*.js size
```

**Code splitting**: Future enhancement (currently single bundle)

**Asset optimization**: All assets are bundled and optimized automatically

---

## Resources

- **EAS Hosting Docs**: https://docs.expo.dev/eas/hosting/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Expo Router Docs**: https://docs.expo.dev/router/introduction/
- **Project Dashboard**: https://expo.dev/accounts/thepearpoet143/projects/vine

---

**Last Updated**: 2025-10-04
**Expo SDK**: 54
**expo-router**: v6.0.10
**EAS CLI**: v16.20.1
