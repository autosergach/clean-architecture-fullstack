# Backend

This package implements the Task Manager backend with Clean Architecture layers:
- `domain/`: entities, value objects, domain errors
- `application/`: use-cases and ports (interfaces)
- `infrastructure/`: adapters, HTTP API, persistence

## Setup
```bash
npm install
```

## Tests
```bash
npm test
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
