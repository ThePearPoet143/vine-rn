# TLDR: CI/CD Quick Reference

Fast commands for deploying Vine to all platforms.

## 🌐 Web (EAS Hosting)

```bash
# Deploy to web (2 commands)
npx expo export --platform web
eas deploy
```

**URL**: Your deployment URL will be provided after `eas deploy`

---

## 📱 iOS

```bash
# TestFlight
eas build --platform ios --profile production --auto-submit

# Local development
eas build --platform ios --profile development
npx expo run:ios
```

---

## 🤖 Android

```bash
# Google Play
eas build --platform android --profile production
eas submit --platform android

# APK for testing
eas build --platform android --profile preview
```

---

## 🔧 Common Issues

### Web won't bundle?
```bash
# Clear cache and restart
npx expo start --web --clear
```

### Port 8081 already in use?
```bash
lsof -ti:8081 | xargs kill -9
npx expo start
```

### AsyncStorage errors?
```bash
npx expo prebuild --clean
```

### Deployment fails?
```bash
# Make sure you exported first!
npx expo export --platform web
eas deploy
```

---

## ⚙️ Required Configuration

### Web (app.json)
```json
{
  "web": {
    "output": "single"
  }
}
```

### Web (babel.config.js)
```js
{
  unstable_transformImportMeta: true
}
```

---

## 📊 Monitor Deployments

**Dashboard**: https://expo.dev/accounts/thepearpoet143/projects/vine

**Check login**:
```bash
eas whoami
```

**Check version**:
```bash
eas --version
```

---

## 🚀 Full Deploy (All Platforms)

```bash
# 1. Web
npx expo export --platform web && eas deploy

# 2. iOS
eas build --platform ios --profile production --auto-submit

# 3. Android
eas build --platform android --profile production && eas submit --platform android
```

---

## 📝 Pre-Deploy Checklist

- [ ] Test locally on iOS/Android/Web
- [ ] Theme persistence works
- [ ] No console errors
- [ ] Bundle size reasonable (<5MB)
- [ ] Version bumped in app.json

---

**EAS CLI**: v16.20.1
**Expo SDK**: 54
**Account**: thepearpoet143
