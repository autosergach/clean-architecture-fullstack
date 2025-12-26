# Frontend

Frontend for the Task Manager, built with Vite + React + TypeScript.

## Setup
```bash
npm install
```

## Dev
```bash
npm run dev
```

## Tests
```bash
npm test
```

## Environment
- `VITE_API_URL` (default: `http://localhost:3001`)

## Typecheck
```bash
npm run typecheck
```

## Lint
```bash
npm run lint
```

## UI foundation
Base UI components live in `src/shared/ui` and are backed by design tokens in
`src/app/globals.css`.

## Auth flow
Login and register pages live in `src/pages`, using React Hook Form + Zod and
state management in `src/features/auth/model/auth-store.ts`.

## Tasks API
Tasks and comments API clients live in:
- `src/features/tasks/api/tasks-api.ts`
- `src/features/tasks/api/comments-api.ts`

## Tasks UI
Tasks page and state live in:
- `src/pages/TasksPage.tsx`
- `src/features/tasks/model/tasks-store.ts`
