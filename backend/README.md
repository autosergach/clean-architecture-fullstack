# Backend

This package implements the Task Manager backend with Clean Architecture layers:
- `domain/`: entities, value objects, domain errors
- `application/`: use-cases and ports (interfaces)
- `infrastructure/`: adapters, HTTP API, persistence

## Setup
```bash
npm install
```

## Run API (NestJS)
```bash
npm run start:dev
```

Swagger UI: `http://localhost:3001/docs`

### Environment
- `JWT_SECRET` (optional for local dev, defaults to `dev-secret`)

## Tests
```bash
npm test
```

## Integration tests
E2E-style API tests are included in `tests/infrastructure` and run with `npm test`.

## Coverage (CI)
```bash
npm run test:ci
```

## Typecheck
```bash
npm run typecheck
```

## Lint
```bash
npm run lint
```

## Current use-cases
- Auth: register, login
- Tasks: create, update, list with filters/search
- Comments: add to task

## API overview
- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks` (auth)
- `POST /tasks` (auth)
- `PATCH /tasks/:taskId` (auth)
- `POST /tasks/:taskId/comments` (auth)
