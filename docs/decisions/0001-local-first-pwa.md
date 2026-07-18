# ADR-0001: Local-first PWA

**Status:** Accepted

## Context

Ember's first user needs a fast mobile experience in gyms with unreliable
connectivity. A public account system and app-store distribution are not needed to
validate the workout workflow.

## Decision

Build a React PWA that persists user data in IndexedDB. Treat the local database as
the source of truth. Add a backend only when multi-device sync is a validated need.

## Consequences

- The MVP works offline and has low operating complexity.
- Export/import and migration quality are essential.
- Browser storage limitations must be documented.
- Future sync needs explicit conflict-resolution design.

