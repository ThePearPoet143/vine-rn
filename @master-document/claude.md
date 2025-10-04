# Claude AI Guidelines

## Commit Message Rules

### Rule #1: No AI References
- Do NOT reference Anthropic, Claude, or Claude Code in commit messages
- Do NOT include AI-generated footers or co-author attributions
- Commit messages should appear as human-written

### Commit Message Format
```
<type>: <subject>

<body>
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

**Example:**
```
feat: Add development environment setup

- Configure EAS build profiles for development, preview, and production
- Add ngrok tunneling support for physical device testing
- Update documentation with setup instructions
```

## Documentation Standards

### Style Guidelines
- NO emojis in any documentation
- Professional, technical tone
- Clear, concise language
- Use proper markdown formatting

### Structure
- Use headings hierarchically (H1 → H2 → H3)
- Include table of contents for long documents
- Provide code examples with syntax highlighting
- Add troubleshooting sections where relevant

### File Naming
- Use kebab-case: `ci-cd.md`, `api-docs.md`
- Be descriptive but concise
- Group related docs in appropriate folders

## Code Style

### General Principles
- Follow existing project conventions
- Write self-documenting code
- Add comments only when necessary for clarity
- Prefer explicit over implicit

### TypeScript/React Native
- Use TypeScript strict mode
- Prefer functional components
- Use proper typing (avoid `any`)
- Follow Expo and React Native best practices

## Communication Style

### In Documentation
- Direct and professional
- No unnecessary preamble or postamble
- Focus on technical accuracy
- Avoid superlatives or marketing language

### Code Comments
- Explain "why", not "what"
- Keep comments up-to-date with code changes
- Remove outdated comments
- Use JSDoc for function documentation when helpful

## Master Document Folder

### Purpose
The `@master-document` folder contains:
- Project guidelines and standards
- Technical documentation
- Process documentation (CI/CD, deployment, etc.)
- Reference materials

### Organization
- One topic per document
- Link between related documents
- Keep documents updated as project evolves
- Archive outdated documentation rather than deleting

## Version Control

### Branch Strategy

This project follows Git Flow with three permanent branches:

**Permanent Branches:**
- `main` - Production releases (App Store)
- `qa` - QA/staging environment (TestFlight)
- `develop` - Active development integration

**Temporary Branches:**
- `feature/*` - New features (from `develop`)
- `bugfix/*` - Bug fixes (from `develop`)
- `hotfix/*` - Emergency production fixes (from `main`)

**Branch Naming:**
- Use lowercase with hyphens
- Be descriptive but concise
- Include ticket/issue number if applicable
- Examples: `feature/oauth-login`, `bugfix/navigation-crash`, `hotfix/memory-leak`

**Workflow:**
```
feature/new-feature → develop → qa → main
       (dev)          (int)   (QA) (Prod)
```

See [branching-strategy.md](branching-strategy.md) for complete details.

### Pull Requests

**PR Title Format:**
```
<type>: <description>
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- refactor: Code refactoring
- test: Tests
- chore: Maintenance

**PR Requirements:**
- Clear, descriptive title following format above
- Detailed description of changes
- Link to related issues/tickets
- Test plan or verification steps
- No merge conflicts
- All CI checks passing
- At least 1 approval (for develop)
- QA/PO approval (for qa → main)

**PR Best Practices:**
- Keep PRs focused and reasonably sized
- Review your own PR first
- Respond to feedback promptly
- Update PR description if scope changes

### Git Practices

**DO:**
- Commit related changes together
- Write clear, descriptive commit messages
- Follow conventional commit format
- Keep commits atomic and focused
- Pull latest changes before starting work
- Rebase feature branches regularly
- Delete branches after merge

**DON'T:**
- Commit directly to main, qa, or develop
- Commit sensitive data (.env files, secrets, keys)
- Force push to shared branches
- Mix unrelated changes in one commit
- Commit commented-out code
- Leave TODO comments without tickets

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

Example:
```
feat: Add user authentication

Implement OAuth login flow with Google and Apple Sign In.
Includes token refresh logic and secure storage.

Closes VINE-123
```

### Environment Variables

- Use `.env.example` as template
- Never commit `.env` files with real values
- Document all environment variables
- Use different values per environment (dev, qa, prod)