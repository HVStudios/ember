# ADR-0002: Training content as validated data

**Status:** Accepted

## Context

The initial program will evolve as exercises are tested. Hardcoding session content
inside React components would make changes risky and block future programs.

## Decision

Represent exercises and program templates as versioned TypeScript data validated by
runtime schemas. UI components render the domain model and do not encode specific
exercise IDs.

## Consequences

- Program revisions do not require UI rewrites.
- Referential-integrity tests are required.
- Completed workouts store prescription snapshots to remain historically correct.
- A future editor or remote content source can target the same model.

