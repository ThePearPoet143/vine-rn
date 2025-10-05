# Master Documentation

Comprehensive technical documentation for the Vine app.

## Directory Structure

### `/accessibility/`
Accessibility features and implementation guides
- **dynamic-type.md** - Dynamic Type support and font scaling

### `/deployment/`
Deployment guides and CI/CD configuration
- **ci-cd.md** - Complete CI/CD setup for Web, iOS, and Android
- **tldr-ci-cd.md** - Quick reference commands and workflows
- **web-platform.md** - React Native Web architecture, configuration, and troubleshooting

### `/navigation/`
Navigation patterns and implementation guides
- **stack-navigator-pattern.md** - Standard Stack navigator setup for drawer screens

### `/theme/`
Theme system architecture and usage guidelines
- **theme-system.md** - Complete theme system architecture and best practices
- **theme-colors.md** - Color usage rules for screens and headers (practical guide)
- **refactor-summary.md** - Theme refactor summary and migration guide
- **architecture-review.md** - Theme architecture review and design decisions

### Root Documentation
- **branching-strategy.md** - Git Flow workflow and branch management
- **claude.md** - AI coding guidelines and standards

## Quick Reference

### Creating New Screens

**Always use `colors.groupedBackground` for:**
- Screen container backgrounds
- Stack navigator headers
- Grouped list backgrounds

**Use `colors.background` for:**
- Cards and elevated content (they stand out against groupedBackground)

```typescript
// Screen template
export default function MyScreen() {
  const { colors } = useThemeContext();
  return (
    <View style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      {/* Content */}
    </View>
  );
}
```

See [navigation/stack-navigator-pattern.md](navigation/stack-navigator-pattern.md) for complete setup.

### Theme System

**7 WCAG AAA Compliant Themes:**
- Light, Dark, Parchment, Night, Sepia, Warm Dark, Green

**Key Principles:**
- Semantic color properties (no scattered conditionals)
- Single source of truth for all colors
- iOS HIG and Material Design compliance

See [theme/theme-system.md](theme/theme-system.md) for architecture details.

### Deployment

**Build Profiles:**
- `development` - Local dev with hot reload
- `qa` - QA testing environment
- `preview` - Stakeholder demos
- `production` - App Store releases

**Quick Commands:**
```bash
# iOS build
eas build --profile production --platform ios

# Web deployment
npx expo export --platform web
eas deploy

# TestFlight submission
eas submit --platform ios
```

See [deployment/ci-cd.md](deployment/ci-cd.md) for complete workflows.

### Web Platform

**Configuration:**
- Output mode: `single` (SPA)
- Babel transform: `unstable_transformImportMeta: true`
- React Native Web v0.21.0

**Known Issues:**
- Radix UI SSR incompatibility (solved with SPA mode)
- Drawer UX differences (native vs web)

See [deployment/web-platform.md](deployment/web-platform.md) for troubleshooting.

## Standards and Conventions

### Documentation Style
- No emojis in documentation
- Professional, technical tone
- Clear, concise language
- Proper markdown formatting

### Commit Messages
```
<type>: <subject>

<body>
```

**Types:** feat, fix, docs, refactor, test, chore

See [claude.md](claude.md) for complete guidelines.

### Git Workflow
```
feature/* → develop → qa → main
  (dev)      (int)   (QA) (Prod)
```

See [branching-strategy.md](branching-strategy.md) for branch strategy.

## Purpose

These documents serve as the source of truth for:
1. **Consistency** - Ensure all features follow the same patterns
2. **Onboarding** - Help new developers understand the codebase
3. **Reference** - Quick lookup for common implementations
4. **Quality** - Maintain accessibility and design standards

## Maintenance

### When to Update
- New patterns are established
- Existing patterns change significantly
- Edge cases or gotchas are discovered
- New features require specific implementation rules

### Document Organization
- One topic per document
- Link between related documents
- Keep documents updated as project evolves
- Archive outdated documentation rather than deleting

---

**Last Updated**: 2025-10-04
**Project**: Vine - Reading-focused Bible app
**Tech Stack**: React Native, Expo SDK 54, TypeScript
