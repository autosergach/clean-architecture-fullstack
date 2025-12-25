# Infrastructure Layer

This layer contains implementation details and adapters.

## Responsibilities
- DB clients, repositories implementations
- HTTP server / routing (transport)
- External services integrations
- Configuration & wiring

## Rules
- Can depend on Application and Domain
- Must keep framework concerns isolated here
- Replaceable without affecting core logic
