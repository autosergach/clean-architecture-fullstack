# Contributing

Thanks for your interest in contributing. This repository prioritizes clean
architecture boundaries, clear documentation, and test-driven validation.

## How to contribute
1. Open an issue describing the change or proposal.
2. Create a feature branch:
   - `feat/<short-description>`
   - `fix/<short-description>`
   - `docs/<short-description>`
3. Keep commits small and follow Conventional Commits:
   - `feat(domain): add task entity`
   - `test(application): cover register user use-case`
4. Add or update tests where applicable.
5. Ensure CI passes before opening a pull request.

## Local setup
```bash
cd backend
npm install
npm test
npm run typecheck
npm run lint
```

## Architectural rules
- Domain must not depend on application or infrastructure.
- Application depends on domain only.
- Infrastructure adapts and wires dependencies; no business rules here.

## Pull request checklist
- Tests added or updated
- Documentation updated (README or docs)
- CI checks pass
