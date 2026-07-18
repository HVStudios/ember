# Ember

Ember is a mobile-first, offline-first workout companion focused on guided strength
sessions, simple logging, and sustainable progression.

The project is currently in product-definition and foundation stage.

## Product principles

- One clear action at a time during a workout.
- Technique quality and joint comfort come before load.
- Exercise guidance belongs beside the workout log.
- Programs and exercises are data, not UI code.
- Ember complements nutrition and health apps instead of duplicating them.

## Repository map

```text
docs/                 Product, training, design, and architecture decisions
public/               Static PWA assets
src/
  app/                App shell, routes, and providers
  components/         Shared presentation components
  data/               Versioned seed programs and exercise content
  db/                 Local persistence and migrations
  features/           Product features grouped by user capability
  lib/                Framework-independent utilities
  styles/             Global styles and design tokens
  types/              Shared domain types
```

## Documentation

- [Product requirements](docs/prd.md)
- [Training specification](docs/training-spec.md)
- [Technical architecture](docs/architecture.md)
- [Design system](docs/design-system.md)
- [Roadmap](docs/roadmap.md)
- [Decisions](docs/decisions/README.md)

## Proposed stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Zustand,
Dexie/IndexedDB, Zod, Vitest, and Playwright. Dependencies will be installed when
implementation begins; this commit deliberately establishes the contract first.

