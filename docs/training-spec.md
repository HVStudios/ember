# Training specification

## Purpose

This document defines the training behavior that Ember must represent. It is not a
medical plan. The seed program should be reviewed and adapted based on real-world
comfort, available equipment, and professional advice where needed.

## Training philosophy

- Three core strength sessions form a complete rotating sequence.
- A fourth upper-body session is optional and never required to preserve progress.
- Two or three runs can be arranged around the rotating strength sequence.
- Most working sets stop with 2–3 good repetitions in reserve (RIR).
- Movement quality and stable joint position take priority over load and range.
- No exercise is mandatory; alternatives preserve the intended movement pattern.
- The first 2–3 weeks are an onboarding block with conservative volume and loads.

## Weekly template

The app uses sequence, not weekday locking:

1. Upper A
2. Lower
3. Full Body
4. Upper B (optional)

A typical calendar might be:

| Day | Session |
| --- | --- |
| Monday | Upper A |
| Tuesday | Easy run |
| Wednesday | Lower |
| Thursday | Rest |
| Friday | Full Body |
| Saturday | Intervals or tempo |
| Sunday | Rest, easy long run, or optional Upper B |

Hard running should not be placed immediately before Lower when avoidable. The
optional session should be skipped before a core session when recovery is limited.

## Joint-aware operating rules

- Stop a set for pain, instability, loss of control, or a joint-giving-way feeling.
- Recurrent uncomfortable clicking triggers a technique/load adjustment or curated
  substitution; it is not something the app asks the user to push through.
- Avoid hanging passively in hyperextended elbows or knees.
- Range of motion is the largest controlled, comfortable range—not a universal
  maximum.
- Barbell bench press, dips, behind-neck presses/pulldowns, and heavy deep flyes are
  excluded from the seed program.
- Leg raises are replaced by reverse crunches/dead bugs because the former caused
  recurrent hip clicking during the lowering phase.
- Dumbbell lateral raises begin at a lighter controlled load; cable lateral raises
  are the preferred alternative if elbow clicking recurs.

## Progression model

### Double progression

For a prescription such as 3 × 8–10 at RIR 2:

1. Select a load that permits at least 8 controlled reps on every working set.
2. Add repetitions across sessions while preserving target RIR and technique.
3. When all three sets reach 10 reps, increase by the smallest practical increment.
4. After increasing, repetitions may return toward 8.

### Recommendation states

- **Increase:** all working sets meet upper bound, RIR target is met, and technique
  is not flagged.
- **Hold:** results fall within range or data is insufficient.
- **Reduce/review:** two comparable sessions fall below the lower bound, or the user
  flags poor control/technique.
- **No recommendation:** bodyweight, timed, distance-based, or incomparable exercise
  until a specific rule exists.

Recommendations must never override user judgment.

## Seed program v0.1

The exact exercise content is stored in `src/data/programs/athletic-foundation-v1.ts`.
The initial intent is:

### Upper A — foundational push/pull

- Flat neutral-grip dumbbell press — 3 × 8–10
- Neutral-grip lat pulldown — 3 × 8–12
- Seated cable row — 3 × 8–12
- Landmine press — 2 × 8–10 per side
- Cable lateral raise — 2 × 12–15
- Rope triceps pushdown — 2 × 10–15
- Cable curl — 2 × 10–15

### Lower — legs, hips, and trunk

- Supported Bulgarian split squat — 3 × 8 per side
- Dumbbell Romanian deadlift — 3 × 8–10
- Leg press — 3 × 10–12
- Seated or lying leg curl — 2 × 10–15
- Sled push — 4 × 20 m
- Reverse crunch — 3 × 10–15

### Full Body — strength and athletic capacity

- Trap-bar deadlift — 3 × 5 (submaximal)
- Chest-supported row — 3 × 8–12
- Incline neutral-grip dumbbell press — 3 × 8–10
- Assisted pull-up or neutral pulldown — 3 × 6–10
- Supported single-leg RDL — 2 × 8 per side
- Farmer carry — 3 × 20–30 m
- Dead bug — 2 × 8 per side

### Upper B — optional volume

- Incline neutral-grip dumbbell press — 3 × 8–10
- Chest-supported row — 3 × 8–12
- Neutral-grip lat pulldown — 2 × 8–12
- Cable lateral raise — 2 × 12–15
- Face pull — 2 × 12–15
- Rope triceps pushdown — 2 × 10–15
- Cable curl — 2 × 10–15
- Farmer carry — 2 × 20–30 m

## Preparation

Preparation is brief and specific, not fatigue-inducing:

- 3–5 minutes of easy general movement if helpful.
- One set each of a relevant shoulder/scapular or hip/trunk drill.
- At least one progressive warm-up set before the first loaded compound movement.

The app distinguishes preparation sets from working sets and excludes them from
progression calculations.

## Running

Initial run types:

- Easy: conversational pace, typically 6–8 km.
- Quality: intervals or tempo, scaled to current running background.
- Optional long easy run: added only when recovery remains good.

Ember records runs minimally in the first product phase. It does not prescribe
advanced run progression or replace a running watch.

## Load units and exercise semantics

- Dumbbell exercises store load **per dumbbell**.
- Cable/machine load is recorded as the displayed stack value and treated as
  gym-specific.
- Unilateral exercises store reps per side and one shared load unless sides differ.
- Carries and sled work use load plus distance.
- Bodyweight and assisted exercises require explicit load semantics.

