# Branching Strategy

## Overview

This project follows a modified Git Flow branching strategy optimized for mobile app development with continuous integration and QA workflows.

## Branch Structure

### Permanent Branches

#### main
- **Purpose:** Production-ready code
- **Protection:** Highest level of protection
- **Deploys to:** App Store (production)
- **Merge from:** `qa` branch only
- **Direct commits:** Never allowed

#### qa
- **Purpose:** Quality assurance and staging environment
- **Protection:** Requires PR approval
- **Deploys to:** TestFlight (QA channel)
- **Merge from:** `develop` branch
- **Direct commits:** Never allowed
- **Testing:** Full QA regression testing happens here

#### develop
- **Purpose:** Integration branch for active development
- **Protection:** Requires PR approval (optional)
- **Deploys to:** Development builds (optional CI)
- **Merge from:** Feature branches
- **Direct commits:** Discouraged, use feature branches

### Temporary Branches

#### feature/*
- **Purpose:** Individual feature development
- **Naming:** `feature/short-description` (e.g., `feature/user-authentication`)
- **Branch from:** `develop`
- **Merge to:** `develop`
- **Lifetime:** Short-lived, deleted after merge
- **Examples:**
  - `feature/oauth-login`
  - `feature/push-notifications`
  - `feature/dark-mode`

#### bugfix/*
- **Purpose:** Non-critical bug fixes
- **Naming:** `bugfix/short-description` (e.g., `bugfix/login-validation`)
- **Branch from:** `develop`
- **Merge to:** `develop`
- **Lifetime:** Short-lived, deleted after merge

#### hotfix/*
- **Purpose:** Emergency production fixes
- **Naming:** `hotfix/short-description` (e.g., `hotfix/crash-on-startup`)
- **Branch from:** `main`
- **Merge to:** Both `main` AND `develop`
- **Lifetime:** Very short-lived
- **Process:**
  1. Branch from `main`
  2. Fix and test
  3. Merge to `main` (emergency release)
  4. Merge to `develop` (keep in sync)

#### release/*
- **Purpose:** Release preparation (optional)
- **Naming:** `release/v1.2.0`
- **Branch from:** `develop`
- **Merge to:** `qa`
- **Use case:** Version bumps, release notes, final tweaks

## Workflow Diagrams

### Standard Feature Development Flow

```
feature/new-login → develop → qa → main
     (dev)           (CI)    (QA)  (Prod)
```

### Hotfix Flow

```
         main
          ↓
    hotfix/critical-fix
      ↓           ↓
    main      develop
   (Prod)      (sync)
```

## Detailed Workflows

### Feature Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/user-profile
   ```

2. **Develop and Commit**
   ```bash
   # Make changes
   git add .
   git commit -m "feat: Add user profile screen"
   ```

3. **Keep Updated with Develop**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/user-profile
   git rebase develop
   ```

4. **Push and Create PR**
   ```bash
   git push -u origin feature/user-profile
   # Create PR on GitHub: feature/user-profile → develop
   ```

5. **After Merge**
   ```bash
   git checkout develop
   git pull origin develop
   git branch -d feature/user-profile
   ```

### QA Release Workflow

1. **Prepare for QA**
   ```bash
   git checkout develop
   git pull origin develop
   # Ensure all features for this release are merged
   ```

2. **Create PR to QA**
   ```bash
   # On GitHub: Create PR from develop → qa
   # Add release notes in PR description
   # Tag QA team for review
   ```

3. **Build QA Version**
   ```bash
   git checkout qa
   git pull origin qa
   eas build --profile qa --platform ios
   ```

4. **QA Testing**
   - QA team tests the build
   - Bugs found → create `bugfix/*` branches from `develop`
   - Critical issues → fix and rebuild
   - Sign-off required before production

### Production Release Workflow

1. **Final QA Approval**
   - All QA tests passed
   - Stakeholder approval obtained
   - Release notes prepared

2. **Create PR to Main**
   ```bash
   # On GitHub: Create PR from qa → main
   # Include version number and changelog
   ```

3. **Build Production Version**
   ```bash
   git checkout main
   git pull origin main
   eas build --profile production --platform ios
   ```

4. **Submit to App Store**
   ```bash
   eas submit --platform ios --profile production
   ```

5. **Tag Release**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

### Hotfix Workflow

1. **Create Hotfix Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-crash
   ```

2. **Fix and Test**
   ```bash
   # Make fix
   git commit -m "fix: Resolve crash on app launch"
   ```

3. **Merge to Main**
   ```bash
   # Create PR: hotfix/critical-crash → main
   # Fast-track approval
   # Merge immediately
   ```

4. **Build and Deploy**
   ```bash
   git checkout main
   git pull origin main
   eas build --profile production --platform ios
   eas submit --platform ios
   ```

5. **Sync to Develop**
   ```bash
   # Create PR: hotfix/critical-crash → develop
   # Or cherry-pick: git cherry-pick <commit-hash>
   ```

## Branch Protection Rules

### GitHub Settings

#### main Branch
- Require pull request reviews before merging
- Require status checks to pass
- Require branches to be up to date
- Require linear history
- Do not allow bypassing the above settings
- Restrict who can push (admins only for emergency)

#### qa Branch
- Require pull request reviews before merging
- Require status checks to pass
- Require branches to be up to date

#### develop Branch
- Require status checks to pass (if CI configured)
- Optional: Require pull request reviews

## Pull Request Guidelines

### PR Title Format
```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### PR Review Process

**Feature PRs (to develop):**
- At least 1 approval required
- All CI checks must pass
- No merge conflicts

**QA PRs (develop → qa):**
- Technical lead approval required
- Include release notes
- Version bump if applicable

**Production PRs (qa → main):**
- QA sign-off required
- Product owner approval required
- All tests passing
- Release notes complete

## Naming Conventions

### Branch Names
- Use lowercase
- Use hyphens for spaces
- Be descriptive but concise
- Include ticket/issue number if applicable

**Good:**
- `feature/oauth-integration`
- `bugfix/login-error-handling`
- `hotfix/memory-leak-fix`
- `feature/VINE-123-user-settings`

**Bad:**
- `feature/new-stuff`
- `fix`
- `john-dev-branch`
- `FEATURE/OAuth`

### Commit Messages
Follow Conventional Commits:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**
```
feat(auth): Add OAuth login flow

Implement Google OAuth authentication with token refresh

Closes VINE-123
```

```
fix(navigation): Resolve tab bar navigation issue

Fixed issue where tab bar wouldn't update active state
```

## Version Management

### Semantic Versioning
Follow SemVer: MAJOR.MINOR.PATCH

- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes (backward compatible)

### Where Versions Live
- `app.json`: `version` field (user-facing version)
- EAS: `autoIncrement` for build numbers
- Git tags: `v1.0.0` format

### Version Update Process
1. Update `version` in `app.json` on `qa` branch before production merge
2. Create git tag after production merge
3. Document changes in release notes

## Best Practices

### DO:
- Keep branches short-lived
- Rebase feature branches regularly
- Write descriptive commit messages
- Test before creating PR
- Delete merged branches
- Keep PRs focused and small
- Review your own PR first

### DON'T:
- Commit directly to `main`, `qa`, or `develop`
- Create long-lived feature branches
- Merge without review
- Force push to shared branches
- Mix unrelated changes in one PR
- Ignore merge conflicts
- Skip writing tests

## Troubleshooting

### Merge Conflicts
```bash
# On your feature branch
git checkout develop
git pull origin develop
git checkout feature/your-feature
git rebase develop

# Resolve conflicts
git add .
git rebase --continue
git push --force-with-lease
```

### Accidentally Committed to Wrong Branch
```bash
# On wrong branch (e.g., develop)
git log  # Note the commit hash
git reset --hard HEAD~1

# Switch to correct branch
git checkout feature/your-feature
git cherry-pick <commit-hash>
```

### Need to Sync Hotfix to All Branches
```bash
# After hotfix merged to main
git checkout develop
git pull origin develop
git cherry-pick <hotfix-commit-hash>
git push origin develop

git checkout qa
git pull origin qa
git cherry-pick <hotfix-commit-hash>
git push origin qa
```

## Environment-Specific Builds

### Development
```bash
git checkout develop
eas build --profile development --platform ios
```

### QA
```bash
git checkout qa
eas build --profile qa --platform ios
```

### Production
```bash
git checkout main
eas build --profile production --platform ios
```

## Quick Reference

### Common Commands
```bash
# Start new feature
git checkout develop && git pull && git checkout -b feature/name

# Update feature with latest develop
git checkout develop && git pull && git checkout feature/name && git rebase develop

# Prepare for QA
# PR: develop → qa on GitHub

# Release to production
# PR: qa → main on GitHub
git checkout main && git pull && git tag v1.0.0 && git push origin v1.0.0
```

## Summary

This branching strategy ensures:
- Clean separation between development, QA, and production
- Structured workflow for feature development
- Quality gates before production release
- Emergency hotfix capability
- Traceability through version tags
- Collaborative development with PR reviews
