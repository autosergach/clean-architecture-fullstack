# Architecture

## 1. Purpose

This repository is a showcase of production-ready full-stack architecture:
- clear boundaries and separation of concerns
- testability-first approach (TDD where reasonable)
- maintainability and scalability
- professional workflow (branches, PRs, CI)

The goal is not “a demo that looks like an app”, but a codebase that could be evolved into a real product.

---

## 2. Scope

### In scope
- Backend API (Node.js + TypeScript)
- Frontend (React or Angular)
- Auth, core domain flows, validations, error handling
- Automated tests (unit / integration / e2e)
- CI pipelines and quality gates
- Architecture documentation and decision records

### Out of scope (for now)
- Multi-region deployment
- Advanced observability stack
- Payments and billing

---

## 3. Guiding principles

- Clean Architecture / Hexagonal Architecture
- SOLID and GRASP principles
- Dependencies point inward
- Domain is framework-agnostic
- Pragmatism over dogmatism

---

## 4. High-level architecture (C4)

### System Context

User → Web Frontend → Backend API → Database / External Services

### Containers

- Frontend SPA (React / Angular + TypeScript)
- Backend API (Node.js + TypeScript)
- Database (PostgreSQL / SQLite)
- Optional external integrations

### Diagrams
- `docs/diagrams/architecture.mmd`
- `docs/diagrams/sequence-auth.mmd`

---

## 5. Backend architecture

### Layers

**Domain**
- Entities
- Value Objects
- Domain Services
- Domain Errors

**Application**
- Use Cases
- DTOs
- Ports (interfaces)
- Policies

**Infrastructure**
- HTTP Controllers
- Persistence adapters
- Configuration and DI
- External services

### Dependency rule

Infrastructure → Application → Domain

Domain depends on nothing.

---

## 6. Frontend architecture

- Pages (routing level)
- Features (business functionality)
- Shared UI components
- API clients
- State management

No business logic duplication from backend.

---

## 7. Testing strategy

### Backend
- Unit tests for domain and use cases
- Integration tests for adapters
- Minimal e2e coverage

### Frontend
- Unit tests for components and state
- E2E tests for critical flows

---

## 8. CI / Quality

- Type checking
- Linting
- Automated tests
- Build validation

---

## 9. Security basics

- Secure password hashing
- Input validation
- Environment-based secrets
- Dependency audits

---

## 10. ADR (Architecture Decision Records)

All decisions are documented in docs/adr.

Each ADR includes:
- Context
- Decision
- Alternatives
- Consequences

---

## 11. Roadmap

### Phase 1
- Skeleton and CI
- Architecture boundaries

### Phase 2
- Auth and core domain
- Tests

### Phase 3
- Frontend integration
- E2E tests

### Phase 4
- Hardening and polish
