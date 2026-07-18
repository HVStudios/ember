# Ember — Product Requirements Document

**Status:** Draft v0.1  
**Product owner / first user:** Henrik  
**Primary platform:** Mobile web/PWA  
**Language at launch:** Swedish UI, English identifiers in code and content data

## 1. Product summary

Ember is a calm, premium workout companion for people who want to become stronger
and more athletic without turning training into administration. It guides the user
through one exercise at a time, explains unfamiliar movements, remembers previous
performance, and recommends a sensible next step.

The first version is tailored to Henrik's 3+1-day strength program and 2–3 weekly
runs. The underlying model must remain generic enough to support other programs
later.

## 2. Problem

Existing workout trackers tend to create one or more of these problems:

- They assume the user already knows every exercise and its technique.
- Logging requires too many taps or too much scrolling during a session.
- Progression data is shown without a useful recommendation.
- Broad health features distract from the primary gym workflow.
- Program content is tightly coupled to screens, making personal adaptation hard.

For the first user, unfamiliar exercises and joint hypermobility make concise
technique guidance and easy exercise substitution especially important.

## 3. Vision

Ember should feel like a knowledgeable, restrained coach beside the user—not a
spreadsheet, social network, or aggressive bodybuilding brand.

**Promise:** Open Ember, understand today's session, train with confidence, and
leave knowing what to do next time.

## 4. Goals

### Product goals for MVP

1. Start the planned workout from the home screen in one tap.
2. Complete and log a workout comfortably with one hand on a phone.
3. Explain each programmed exercise with visual support and concise instructions.
4. Restore an interrupted workout without losing completed sets.
5. Show previous performance and a transparent next-session recommendation.
6. Work without a network connection after first load.
7. Store body-weight entries and show a simple trend.

### User outcomes

- Complete three core strength sessions per week, with an optional fourth.
- Apply progressive overload while keeping 2–3 good repetitions in reserve.
- Improve technique confidence and reduce the need to search outside the app.
- Observe strength and body-weight trends without obsessing over daily noise.

## 5. Non-goals for MVP

- Calorie, macro, recipe, step, or sleep tracking.
- Medical diagnosis, rehabilitation prescriptions, or automatic pain analysis.
- AI-generated training plans or conversational coaching.
- Social feeds, leaderboards, challenges, or public profiles.
- Cloud accounts, multi-device sync, subscriptions, or payments.
- Apple Health, Health Connect, Lifesum, or wearable integrations.
- A general-purpose program builder.
- User-uploaded exercise media.

Lifesum remains the source for nutrition. Apple Health or its platform equivalent
remains the source for steps and sleep.

## 6. Primary user

The first user is a 25-year-old returning gym user who:

- trains primarily for an athletic appearance and general strength;
- wants three gym sessions, with a fourth optional session;
- runs two or three times per week;
- prefers 45–50 minute workouts;
- is unfamiliar with several free-weight exercises;
- has diagnosed joint hypermobility, especially noticeable on the right side;
- avoids barbell bench press and values controlled, joint-friendly alternatives;
- wants a clean mobile experience rather than detailed manual tracking.

This context informs the seed program, not permanent restrictions in the domain
model.

## 7. Product principles

1. **Focus over density.** During training, one exercise is the main object.
2. **Guidance in context.** Instructions, visual reference, prior performance, and
   logging live together.
3. **Quality before load.** Recommendations never encourage sacrificing control or
   training to failure.
4. **Explain the recommendation.** Every progression suggestion states why.
5. **Offline by default.** The gym may have poor connectivity.
6. **Respect user choice.** An exercise can be substituted or skipped without
   invalidating the workout.
7. **Small scope, polished execution.** Do not duplicate specialist apps.

## 8. Core journeys

### 8.1 Start and complete a workout

1. User opens Ember and sees the next core session.
2. User reviews duration, exercise count, and readiness notes.
3. User starts the session.
4. Ember presents the first exercise with its visual and essential cues.
5. User records load and repetitions for each working set.
6. A rest timer starts automatically but never blocks navigation.
7. User moves to the next exercise, substitutes it, or skips it.
8. User finishes and sees duration, completed sets, notable progress, and the next
   planned session.

### 8.2 Learn an exercise

1. User opens the exercise guide from a workout or library.
2. User sees start/end visual media, purpose, setup, 2–4 cues, expected sensation,
   common mistakes, and alternatives.
3. User returns to the active set without losing state.

### 8.3 Resume an interrupted workout

1. Ember persists each set immediately.
2. On reopening, Ember offers to continue or discard the draft.
3. Continuing restores the exercise, set state, elapsed time, and timer context.

### 8.4 Log body weight

1. User adds a weight measurement with date/time and an optional note.
2. Ember shows raw entries and a trend; it does not infer body composition.

## 9. Functional requirements

### Home

- Show a time-appropriate greeting and the next planned core workout.
- Show duration estimate, exercise count, and primary focus.
- Provide one dominant “Starta pass” action.
- Show weekly core/bonus workout completion and manually logged runs.
- Show latest weight only when a measurement exists.
- Surface an unfinished session before any new-session action.

### Active workout

- Display one primary exercise at a time with quick access to the full list.
- Display target sets, repetition range, RIR, rest, and optional tempo.
- Display last comparable session by default.
- Pre-fill the most likely load from history, always editable.
- Accept decimal load and integer repetitions per set.
- Support bodyweight and unilateral exercises without fake kilogram values.
- Allow warm-up sets, working sets, skipped sets, notes, and exercise substitution.
- Auto-save after every change.
- Run a visible, dismissible rest timer after a completed working set.
- Prevent accidental completion when no working sets are logged, but allow explicit
  confirmation.

### Exercise guidance

- Each seed exercise must include Swedish display copy, equipment, muscles,
  instructions, cues, mistakes, expected sensation, and at least one alternative
  where practical.
- Media must have a local fallback and descriptive alternative text.
- Guidance must avoid diagnosing conditions or promising posture/pain correction.

### Progression

- Use double progression within the prescribed repetition range.
- Recommend increasing load only after all prescribed working sets reach the upper
  repetition bound with target RIR and acceptable technique.
- Otherwise recommend keeping the load.
- Recommend reducing load or reviewing technique after repeated results below the
  lower bound or an explicit poor-technique flag.
- Make the recommendation advisory and editable.
- Handle dumbbell load consistently as load per dumbbell, clearly labelled.

### Program

- Seed three core sessions and one optional session.
- Keep the core sequence independent of weekdays so missed days do not reorder the
  program.
- Permit substitution from curated alternatives.
- Store the program version on each completed session for historical integrity.

### History and progress

- List completed sessions with date, duration, and completion summary.
- Show per-exercise history and simple estimated-volume trends.
- Show personal bests only when comparisons are meaningful.
- Record manual runs minimally: date, type, duration, and optional distance.
- Record body weight and optional waist circumference.

### Settings

- Swedish/English content architecture, with Swedish as the initial UI.
- Metric units initially; unit design must be extensible.
- Configurable default rest-timer sound/vibration.
- Export all user-created data as JSON.
- Destructive actions require confirmation.

## 10. Content and safety requirements

- Exercise language is instructional, not medical.
- Pain, instability, or a sensation of a joint giving way is a stop signal; the UI
  advises stopping the exercise and seeking professional assessment when symptoms
  persist or are significant.
- Clicking without pain is not automatically classified as safe or unsafe.
- The product does not claim to correct anterior pelvic tilt or posture.
- Static stretching is optional content, not a required recovery mechanism.
- Exercise alternatives preserve training intent rather than implying that one
  movement is mandatory.

## 11. Information architecture

Bottom navigation has four destinations:

1. **Hem** — next workout, week, latest signals.
2. **Program** — sessions, exercise details, substitutions.
3. **Utveckling** — workout, exercise, run, and body trends.
4. **Inställningar** — preferences, export, data controls.

An active workout is a focused modal route that can be minimized but remains
persistent until completed or discarded.

## 12. Acceptance criteria for MVP

The MVP is ready for daily use when:

- It is installable on iOS and Android as a PWA.
- All four seed sessions render entirely from data.
- Every seed exercise has usable Swedish guidance and visual placeholders.
- A full workout can be logged offline and restored after closing the browser.
- Historical load/reps appear in the next comparable workout.
- Progression recommendations pass documented unit tests.
- Data can be exported and re-imported without loss.
- The main workout flow works at 320 px width and meets WCAG 2.2 AA for text,
  contrast, focus, and touch targets.
- No core flow depends on a remote service.

## 13. Success measures

For the private alpha, success is behavioral rather than commercial:

- At least 90% of planned core sessions can be logged without another notes app.
- Median time to record a set is under 10 seconds.
- No lost session data during four consecutive weeks of normal use.
- Exercise guidance is sufficient without external search for at least 80% of seed
  exercises after the first exposure.
- The user chooses to keep using Ember after six weeks.

## 14. Open decisions

- Final visual source: commissioned illustrations, licensed library, or original
  generated assets with a consistent art direction.
- Whether run logging belongs in MVP UI or immediately after core gym logging.
- Exact rule for load increments across cable stacks and different gyms.
- Whether the first release needs manual program editing or only substitutions.

