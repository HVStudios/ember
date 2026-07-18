# Design system foundation

## Brand

Ember represents consistency: a small glow sustained over time. The visual language
is warm, calm, precise, and capable. It avoids flames, aggressive gym imagery, neon
gradients, and gamified guilt.

Working line: **Progress with purpose.**

## Experience principles

- The active task is visually dominant.
- Dense information is progressively disclosed.
- Touch targets are at least 44 × 44 CSS pixels.
- Color supports hierarchy but never carries meaning alone.
- Motion confirms spatial change; it does not decorate every interaction.
- Numbers used during a workout are large and glanceable.

## Color direction

Token names are semantic so the palette can evolve.

### Dark theme (initial default)

| Token | Working value | Use |
| --- | --- | --- |
| `--surface-canvas` | `#11100F` | App background |
| `--surface-card` | `#1A1816` | Primary cards |
| `--surface-raised` | `#24211E` | Sheets and controls |
| `--text-primary` | `#F7F2EC` | Primary text |
| `--text-secondary` | `#B9B0A7` | Supporting text |
| `--border-subtle` | `#332E29` | Dividers and outlines |
| `--accent` | `#E9784A` | Primary action and progress |
| `--accent-strong` | `#F28A5B` | Hover/high emphasis |
| `--success` | `#6FAF87` | Completed/positive state |
| `--warning` | `#D7A651` | Attention |
| `--danger` | `#D96C67` | Destructive/error |

Light theme is required before public v1 but may follow the private MVP.

## Typography

- Use a high-quality system stack initially to avoid a blocking font download.
- Display: 32/38, semibold.
- Page title: 24/30, semibold.
- Section title: 18/24, semibold.
- Body: 16/24, regular.
- Supporting: 14/20, regular.
- Numeric workout input: 28/32, medium, tabular numerals.

## Spacing and shape

- Base spacing unit: 4 px.
- Common rhythm: 8, 12, 16, 24, 32 px.
- Card radius: 20 px.
- Control radius: 14 px.
- Pill radius: 999 px only for compact status/filter controls.
- Avoid stacking multiple bordered cards when spacing alone creates hierarchy.

## Elevation

Dark surfaces rely primarily on tone and borders. Shadows are soft and reserved for
temporary elements such as bottom sheets, menus, and the rest timer.

## Motion

- Standard transition: 180–240 ms.
- Exercise-to-exercise navigation uses a subtle horizontal relationship.
- Completing a set uses a restrained scale/fade confirmation.
- Timer changes do not pulse continuously.
- `prefers-reduced-motion` removes nonessential transforms.

## Core components

- App shell and bottom navigation
- Workout hero card
- Progress ring/bar
- Exercise media frame
- Technique cue list
- Set row and numeric stepper/input
- Rest timer bottom sheet
- Previous-performance card
- Recommendation callout with rationale
- Exercise substitution sheet
- Workout summary
- Measurement entry sheet
- Empty, loading, offline, and recovery states

## Workout screen hierarchy

1. Exit/minimize and workout progress.
2. Exercise name and prescription.
3. Visual demonstration.
4. Current set logging.
5. Previous result and recommendation.
6. Collapsible technique details.
7. Secondary navigation to exercise list/substitution.

Instructions remain reachable without displacing the set input below the initial
viewport on common phone sizes.

## Accessibility

- WCAG 2.2 AA contrast for text and controls.
- Visible keyboard focus in every theme.
- Labels remain visible for numeric inputs; placeholders are not labels.
- All exercise media has meaningful alt text or is explicitly decorative.
- Timer events have non-audio feedback.
- Charts expose an accessible table or textual summary.
- Interface remains functional at 200% text zoom.

