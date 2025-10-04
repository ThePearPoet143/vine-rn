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
- `main`: Production-ready code
- Feature branches: Short-lived, focused changes
- Clear branch naming: `feature/user-auth`, `fix/login-bug`

### Pull Requests
- Clear, descriptive titles
- Link to related issues
- Include test plan or verification steps
- Keep PRs focused and reasonably sized

### Git Practices
- Commit related changes together
- Write clear commit messages
- Avoid committing sensitive data
- Keep commit history clean