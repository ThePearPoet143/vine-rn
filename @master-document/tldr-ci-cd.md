# TL;DR CI/CD Quick Reference

## Build Triggers

**IMPORTANT:** All builds are **MANUAL ONLY** - EAS does not automatically build on branch changes.

## Daily Development Workflow

```bash
# 1. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature

# 2. Make changes and commit
git add .
git commit -m "feat: Your feature description"
git push -u origin feature/your-feature

# 3. Create PR on GitHub: feature/your-feature → develop
# 4. After merge, continue local development with:
npx expo start --tunnel
```

## QA Release Workflow

```bash
# 1. Create PR on GitHub: develop → qa
# 2. After merge, checkout qa branch
git checkout qa
git pull origin qa

# 3. Manually build QA version
eas build --profile qa --platform ios

# 4. QA team tests the build
# 5. Fix bugs by creating bugfix/* branches from develop
# 6. Repeat until QA sign-off
```

## Production Release Workflow

```bash
# 1. Create PR on GitHub: qa → main (requires QA approval)
# 2. After merge, checkout main
git checkout main
git pull origin main

# 3. Manually build production version
eas build --profile production --platform ios

# 4. Submit to TestFlight/App Store
eas submit --platform ios

# 5. Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Hotfix Workflow

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Make fix and commit
git add .
git commit -m "fix: Critical bug description"
git push -u origin hotfix/critical-fix

# 3. Create PR: hotfix/critical-fix → main (fast-track)
# 4. After merge, build and deploy immediately
git checkout main
git pull origin main
eas build --profile production --platform ios
eas submit --platform ios

# 5. Sync to develop
git checkout develop
git pull origin develop
git cherry-pick <commit-hash>
git push origin develop
```

## Build Profiles Quick Reference

| Profile | Command | Branch | Purpose | Distribution |
|---------|---------|--------|---------|--------------|
| development | `eas build --profile development --platform ios` | any | Local dev with hot reload | Internal (ad-hoc) |
| qa | `eas build --profile qa --platform ios` | qa | QA testing | Internal or TestFlight |
| preview | `eas build --profile preview --platform ios` | any | Stakeholder demos | Internal (ad-hoc) |
| production | `eas build --profile production --platform ios` | main | App Store release | App Store |

## Common Commands

### Development
```bash
# Start dev server with tunneling
npx expo start --tunnel

# Clear cache and restart
npx expo start -c --tunnel

# Rebuild development client (when adding native deps)
eas build --profile development --platform ios
```

### Building
```bash
# Check build status
eas build:list --platform ios

# View specific build
eas build:view <build-id>

# Cancel running build
eas build:cancel
```

### Deployment
```bash
# Submit build to TestFlight/App Store
eas submit --platform ios

# Check submission status
eas submit:list --platform ios

# Submit specific build
eas submit --platform ios --id <build-id>
```

### Git
```bash
# Check which branch you're on
git branch

# Switch branches
git checkout develop
git checkout qa
git checkout main

# Update branch with latest
git pull origin <branch-name>

# View recent commits
git log --oneline -10
```

## Branch Strategy at a Glance

```
feature/* → develop → qa → main
   (dev)     (int)   (QA)  (Prod)
```

**Permanent Branches:**
- `main` - Production (App Store)
- `qa` - QA/Staging (TestFlight)
- `develop` - Integration

**Temporary Branches:**
- `feature/*` - New features (from develop)
- `bugfix/*` - Bug fixes (from develop)
- `hotfix/*` - Emergency fixes (from main)

## Information to Update

**In eas.json:**
- Line 29: Replace `"your-apple-team-id"` with actual Apple Team ID

**To find Apple Team ID:**
1. Visit https://developer.apple.com/account
2. Click "Membership"
3. Copy Team ID

## When to Build

**Development Build:**
- First time setup
- After adding native dependencies
- After changing app.json or native config

**QA Build:**
- After merging features to qa branch
- Before production release
- When QA needs to test

**Production Build:**
- After QA approval
- Ready for App Store submission
- Hotfix merged to main

## Automatic Builds

Currently: **NOT CONFIGURED**

All builds must be triggered manually with `eas build` commands.

To enable automatic builds:
- Set up GitHub Actions workflow
- Configure EAS Build webhooks
- Requires additional setup (not currently implemented)

## Quick Troubleshooting

**Build fails:**
```bash
# Check build logs
eas build:view <build-id>

# Common fixes:
# - Update dependencies: npm install
# - Clear EAS cache: add "cache" config to eas.json
# - Check for version conflicts in package.json
```

**Can't connect to dev server:**
```bash
# Use tunnel mode
npx expo start --tunnel

# If tunnel fails, install ngrok
npm install --save-dev @expo/ngrok
```

**Merge conflicts:**
```bash
# On your feature branch
git checkout develop
git pull origin develop
git checkout feature/your-branch
git rebase develop
# Resolve conflicts, then:
git add .
git rebase --continue
git push --force-with-lease
```

## Full Documentation

For complete details, see:
- [ci-cd.md](ci-cd.md) - Complete CI/CD documentation
- [branching-strategy.md](branching-strategy.md) - Detailed Git workflow
- [claude.md](claude.md) - Coding standards and guidelines
