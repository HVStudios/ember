# Technical architecture

## Architectural goals

- Excellent mobile performance and offline resilience.
- No backend required for the private MVP.
- Domain logic testable without React or browser APIs.
- Versioned training content independent from presentation.
- A migration path to cloud sync without replacing the local-first model.

## Stack

| Area | Choice | Rationale |
| --- | --- | --- |
| UI | React + TypeScript | Mature typed component model |
| Build | Vite | Small, fast PWA foundation |
| Styling | Tailwind CSS + CSS tokens | Fast composition with explicit brand tokens |
| Components | shadcn/ui primitives | Accessible ownership of source components |
| Motion | Framer Motion | Focused transitions and workout feedback |
| Local state | Zustand | Small UI/session state surface |
| Persistence | Dexie / IndexedDB | Transactional offline workout storage |
| Validation | Zod | Runtime validation for data/imports |
| Forms | React Hook Form | Efficient controlled logging/settings forms |
| Unit tests | Vitest + Testing Library | Domain and component testing |
| End-to-end | Playwright | Mobile workout and persistence flows |
| PWA | vite-plugin-pwa / Workbox | Installability and asset caching |

TanStack Query is deferred until a remote data source exists. Adding it now would
create ceremony without a server-state problem.

## Layer boundaries

```text
UI/routes
    ↓
feature application services
    ↓
domain types + pure rules
    ↓
repository interfaces
    ↓
IndexedDB adapters
```

- Components never query Dexie tables directly.
- Progression rules are pure functions.
- Seed content is validated before entering the database.
- Completed workout records embed prescription snapshots to preserve history after
  program updates.

## Source layout

```text
src/
  app/                  boot, router, layouts, providers
  components/           reusable UI primitives and composites
  data/
    exercises/          versioned exercise content
    programs/           versioned program definitions
  db/                   schema, migrations, repositories
  features/
    active-workout/
    exercise-guide/
    history/
    home/
    measurements/
    program/
    progress/
    settings/
  lib/
    progression/        pure progression rules
    units/              load and distance formatting
    validation/         shared schemas
  styles/               reset, global CSS, tokens
  types/                domain contracts
```

## Core data entities

### ExerciseDefinition

Immutable/versioned instructional content: identity, movement, equipment, media,
instructions, cues, mistakes, alternatives, and load semantics.

### ProgramDefinition / WorkoutTemplate

Versioned prescriptions referencing exercise IDs. A template describes targets,
not actual performance.

### WorkoutSession

A user-created instance with start/end timestamps, template/version snapshot,
exercise order, substitutions, set logs, and notes.

### SetLog

Warm-up or working set with load, reps/duration/distance, completion timestamp,
RIR when captured, and optional quality flag.

### Measurement

Timestamped body weight or waist measurement with unit and optional note.

### RunLog

Minimal manually entered run type, duration, distance, and note.

## Persistence strategy

1. Seed definitions ship with the app and are validated at startup.
2. IndexedDB stores user settings, active draft, completed sessions, substitutions,
   measurements, and runs.
3. Each completed set commits immediately in a transaction.
4. Schema migrations are forward-only and covered by fixture tests.
5. Export produces a versioned JSON envelope containing all user-owned data.
6. Import validates fully before writing and uses one transaction.

## Offline and PWA behavior

- App shell and exercise media are precached within a deliberate size budget.
- User data never depends on the service-worker cache.
- Updates are announced and activated after the user leaves an active workout.
- The app must not reload mid-session solely to apply a new version.

## Security and privacy

- MVP stores data locally and makes that explicit.
- No analytics, ads, or third-party trackers in the private alpha.
- Export is user-initiated; deletion is explicit and confirmed.
- Future sync requires authentication, encryption in transit, deletion controls,
  and documented data ownership before implementation.

## Testing priorities

1. Progression recommendation edge cases.
2. Save/resume active workout across refresh and offline conditions.
3. Program/exercise data validation and referential integrity.
4. Export/import round trip.
5. Exercise substitution without corrupting comparable history.
6. Mobile viewport, keyboard, and touch interactions.

## Performance budgets

- Initial route should remain usable on a mid-range phone under constrained network.
- Avoid loading all exercise media on the home route.
- Lazy-load exercise guides and progress charts.
- Keep animations transform/opacity based and respect reduced-motion settings.

