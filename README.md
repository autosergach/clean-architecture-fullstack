# Full-Stack Clean Architecture Demo

[![CI](https://github.com/autosergach/clean-architecture-fullstack/actions/workflows/ci.yml/badge.svg)](https://github.com/autosergach/clean-architecture-fullstack/actions/workflows/ci.yml)
[![Vercel Deploy](https://vercelbadge.vercel.app/api/alexs-projects-e9caafc0/clean-architecture-fullstack)](https://clean-architecture-fullstack.vercel.app/login)
[![Render Deploy](https://img.shields.io/badge/Render-live-46e3b7)](https://clean-architecture-fullstack.onrender.com/docs)
[![Live Demo](https://img.shields.io/badge/Live-Demo-1dd6a6)](https://clean-architecture-fullstack.vercel.app/login)
[![API Docs](https://img.shields.io/badge/API-Swagger-0fbf94)](https://clean-architecture-fullstack.onrender.com/docs)

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

## Live Demo
- Frontend: https://clean-architecture-fullstack.vercel.app/login
- API Docs: https://clean-architecture-fullstack.onrender.com/docs

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
