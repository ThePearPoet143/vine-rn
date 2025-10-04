# CI/CD Documentation

## Overview

This document outlines the complete CI/CD pipeline for the Vine mobile application, including build profiles, deployment workflows, and TestFlight distribution.

## Table of Contents

- [Build Profiles](#build-profiles)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [TestFlight Distribution](#testflight-distribution)
- [Troubleshooting](#troubleshooting)

---

## Build Profiles

The project uses EAS (Expo Application Services) with three build profiles defined in `eas.json`:

### 1. Development Profile
```json
"development": {
  "developmentClient": true,
  "distribution": "internal"
}
```

**Purpose:** Local development and testing on physical devices
**Distribution:** Internal (ad-hoc)
**Use case:** Daily development work with live reload and debugging

**Build command:**
```bash
eas build --profile development --platform ios
```

**Characteristics:**
- Includes Expo Dev Client for hot reloading
- Connects to Metro bundler via tunnel
- Not suitable for TestFlight or App Store
- Can be installed on registered devices only

---

### 2. Preview Profile
```json
"preview": {
  "distribution": "internal"
}
```

**Purpose:** Internal testing without development tools
**Distribution:** Internal (ad-hoc)
**Use case:** QA testing, stakeholder demos

**Build command:**
```bash
eas build --profile preview --platform ios
```

**Characteristics:**
- Production-like build without dev tools
- Internal distribution only
- Good for pre-release testing
- Limited to 100 devices per year (Apple restriction)

---

### 3. Production Profile
```json
"production": {
  "autoIncrement": true
}
```

**Purpose:** App Store and TestFlight releases
**Distribution:** App Store
**Use case:** Official releases to testers and end users

**Build command:**
```bash
eas build --profile production --platform ios
```

**Characteristics:**
- Optimized production bundle
- Auto-increments build number
- Suitable for TestFlight and App Store
- No development tools included

---

## Development Workflow

### Initial Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Log in to EAS**
   ```bash
   eas login
   ```

3. **Build development client** (first time only)
   ```bash
   eas build --profile development --platform ios
   ```
   - Install the resulting `.ipa` file on your device via the link provided

### Daily Development

1. **Start development server with tunneling**
   ```bash
   npx expo start --tunnel
   ```

2. **Connect your device**
   - Scan the QR code with your iPhone camera
   - App will connect to your development server via ngrok tunnel

3. **Develop and test**
   - Edit files in the `app/` directory
   - Changes appear instantly via hot reload
   - Use `r` to manually reload
   - Use `j` to open debugger

### When to Rebuild Development Client

Rebuild the development client when you:
- Add new native dependencies
- Modify `app.json` or `eas.json`
- Change native configuration (iOS permissions, etc.)
- Update Expo SDK version

---

## Production Deployment

### Prerequisites

1. **Apple Developer Account**
   - Active membership ($99/year)
   - Bundle ID registered: `com.northstar-productlabs.vine`

2. **App Store Connect**
   - App created in App Store Connect
   - App information filled out (name, description, etc.)
   - Screenshots and metadata prepared

3. **EAS Configuration**
   - Already configured in `eas.json`
   - Project ID: `2c5cfaae-9ab2-4022-8c02-4576f7fb7b41`

### Building for Production

1. **Create production build**
   ```bash
   eas build --profile production --platform ios
   ```

2. **Monitor build progress**
   - Build runs on EAS cloud servers (~5-10 minutes)
   - View progress at: https://expo.dev/accounts/thepearpoet143/projects/vine/builds
   - You'll receive email notification when complete

3. **Verify build**
   - Check build status is "Finished"
   - Note the build ID for submission

### Version Management

- **Version number:** Manually update in `app.json` (`version` field)
- **Build number:** Auto-increments via `autoIncrement: true`
- **Commit reference:** Automatically captured from git

Current version: `1.0.0`

---

## TestFlight Distribution

### First-Time Setup

1. **Create app in App Store Connect**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Create new app with bundle ID: `com.northstar-productlabs.vine`
   - Fill in basic app information

2. **Configure TestFlight settings**
   - Set up internal testing group (automatic)
   - Create external testing groups (optional)
   - Add beta testers via email

### Submitting to TestFlight

1. **Submit the build**
   ```bash
   eas submit --platform ios
   ```

2. **Select build**
   - Choose the production build you just created
   - Or select from list of previous builds

3. **Provide credentials**
   - Enter Apple ID and app-specific password
   - Or use App Store Connect API key (recommended for automation)

4. **Wait for processing**
   - Apple processes the build (15-30 minutes)
   - You'll receive email when ready for testing

### Managing Beta Testers

**Internal Testers:**
- Up to 100 internal testers (App Store Connect users)
- No review required
- Instant access to new builds

**External Testers:**
- Up to 10,000 external testers
- Requires beta app review (1-2 days)
- Testers receive email invitations

**Adding testers:**
1. Go to TestFlight in App Store Connect
2. Select your app
3. Add testers to groups
4. They'll receive installation instructions via email

---

## Environment & Configuration

### App Configuration (`app.json`)

Key settings:
```json
{
  "name": "vine",
  "slug": "vine",
  "version": "1.0.0",
  "scheme": "vine",
  "ios": {
    "bundleIdentifier": "com.northstar-productlabs.vine"
  }
}
```

### EAS Project

- **Project ID:** `2c5cfaae-9ab2-4022-8c02-4576f7fb7b41`
- **Owner:** thepearpoet143
- **Dashboard:** https://expo.dev/accounts/thepearpoet143/projects/vine

### Git Integration

- EAS automatically captures git commit hash
- Production builds include commit reference
- Ensure code is committed before building

---

## Troubleshooting

### Development Server Issues

**Problem:** "No development server found"
**Solution:** Use tunnel mode for physical devices
```bash
npx expo start --tunnel
```

**Problem:** Tunnel fails to connect
**Solution:** Install ngrok locally
```bash
npm install --save-dev @expo/ngrok
```

### Build Issues

**Problem:** Build fails with native module error
**Solution:** Verify all native dependencies are compatible with Expo SDK 54

**Problem:** Version conflict
**Solution:** Ensure version in `app.json` is higher than previous submissions

### TestFlight Issues

**Problem:** Build stuck in "Processing"
**Solution:** Wait 30-60 minutes; Apple's processing can be slow

**Problem:** Beta review rejection
**Solution:** Ensure app metadata and test instructions are clear

**Problem:** Testers can't install
**Solution:**
- Verify device UDID is registered (for internal distribution)
- Check iOS version compatibility
- Ensure TestFlight app is installed

### Common Commands

**Check EAS build status:**
```bash
eas build:list --platform ios
```

**View build logs:**
```bash
eas build:view <build-id>
```

**Check submission status:**
```bash
eas submit:list --platform ios
```

**Clear local cache:**
```bash
npx expo start -c
```

---

## Best Practices

1. **Version Control**
   - Always commit changes before building
   - Tag production releases in git
   - Use semantic versioning

2. **Testing**
   - Test on development build first
   - Use preview builds for QA
   - Only submit tested builds to TestFlight

3. **Communication**
   - Add release notes for each TestFlight build
   - Notify testers of new builds
   - Track feedback from beta testers

4. **Security**
   - Never commit `.env` files with secrets
   - Use EAS Secrets for sensitive data
   - Rotate API keys regularly

5. **Monitoring**
   - Monitor TestFlight crash reports
   - Track installation rates
   - Collect beta tester feedback

---

## Quick Reference

### Development
```bash
npm install                          # Install dependencies
eas login                           # Login to EAS
eas build --profile development --platform ios  # Build dev client
npx expo start --tunnel             # Start dev server
```

### Production
```bash
eas build --profile production --platform ios   # Build for App Store
eas submit --platform ios           # Submit to TestFlight
```

### Useful Links
- **EAS Dashboard:** https://expo.dev/accounts/thepearpoet143/projects/vine
- **App Store Connect:** https://appstoreconnect.apple.com
- **Expo Docs:** https://docs.expo.dev
- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **EAS Submit Docs:** https://docs.expo.dev/submit/introduction/