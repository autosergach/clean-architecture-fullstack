# Full-Stack Clean Architecture Demo

[![CI](https://github.com/autosergach/clean-architecture-fullstack/actions/workflows/ci.yml/badge.svg)](https://github.com/autosergach/clean-architecture-fullstack/actions/workflows/ci.yml)

## Purpose
Portfolio-grade Task Manager that demonstrates architectural thinking,
engineering maturity, production-friendly practices, and explicit trade-offs.

## What this repository proves
- Clean Architecture boundaries that are enforced in code
- Business rules isolated from frameworks
- Test strategy that emphasizes domain and use-case confidence
- CI automation and documentation as first-class artifacts

## Tech Stack
- Backend: Node.js + TypeScript + NestJS
- Frontend: React + TypeScript (next phase)
- Testing: Jest + Supertest
- Docs: Swagger/OpenAPI
- CI: GitHub Actions

## Architecture
Layers and dependencies are explicit:
`Infrastructure → Application → Domain`

Key docs:
- Architecture overview: `docs/architecture.md`
- ADRs: `docs/adr/0001-architecture-style-and-layering.md`
- Docs index: `docs/README.md`

## Backend quickstart
```bash
cd backend
npm install
npm run start:dev
```
Swagger UI: `http://localhost:3001/docs`

## Deployment (Render + Vercel)
Backend (Render):
- Root directory: `backend`
- Build: `npm install && npm run build`
- Start: `npm run start`
- Env: `JWT_SECRET`, `CORS_ORIGIN`, `PORT`

Frontend (Vercel):
- Root directory: `frontend`
- Build: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL=https://<backend-url>`

## Tests
```bash
cd backend
npm test
npm run test:ci
```

## Trade-offs (current)
- In-memory repositories keep infrastructure lightweight early on.
- JWT secret defaults to a dev value for local setup, replaced in production.

## Repository standards
- Conventional Commits for readable history.
- Use GitHub Issues/Projects to show planning and progress.
- ADRs capture architectural decisions and alternatives.

## Contributing
See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

## License
MIT. See `LICENSE`.

## Status
Stage 5 complete (backend + tests + CI). Stage 6 in progress.
