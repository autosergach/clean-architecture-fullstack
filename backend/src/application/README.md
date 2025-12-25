# Application Layer

This layer orchestrates use-cases and defines ports (boundaries).

## Responsibilities
- Use-cases (commands/queries)
- Input validation at the boundary
- Output DTOs / result models
- Ports/interfaces (e.g., repositories, clocks, event bus)

## Rules
- Can depend on Domain
- Must not depend on Infrastructure
- Framework-agnostic orchestration

## Current use-cases
- Auth: register, login
- Tasks: create, update, list with filters/search
- Comments: add to task

## Ports (interfaces)
- UserRepository
- TaskRepository
- CommentRepository
- PasswordHasher
- TokenService
- Clock
- IdGenerator
