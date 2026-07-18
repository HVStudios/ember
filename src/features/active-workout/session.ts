import type {
  ActiveWorkoutDraft,
  ProgramDefinition,
  WorkoutSetLog,
  WorkoutTemplate,
} from "@/types/training";

export function createWorkoutDraft(program: ProgramDefinition, workout: WorkoutTemplate, now = Date.now()): ActiveWorkoutDraft {
  return {
    id: `active:${workout.id}`,
    programId: program.id,
    programVersion: program.version,
    workoutTemplateId: workout.id,
    workoutName: workout.name.sv,
    startedAt: now,
    updatedAt: now,
    currentExerciseIndex: 0,
    exercises: workout.exercises.map((prescription) => ({
      exerciseId: prescription.exerciseId,
      prescription,
      sets: Array.from({ length: prescription.target.sets }, (_, index) => emptySet(index)),
    })),
  };
}

export function updateSetValue(
  draft: ActiveWorkoutDraft,
  exerciseIndex: number,
  setIndex: number,
  field: "load" | "reps",
  value: string,
  now = Date.now(),
): ActiveWorkoutDraft {
  return updateSet(draft, exerciseIndex, setIndex, (set) => ({ ...set, [field]: sanitizeNumeric(value) }), now);
}

export function toggleSetComplete(
  draft: ActiveWorkoutDraft,
  exerciseIndex: number,
  setIndex: number,
  now = Date.now(),
): ActiveWorkoutDraft {
  return updateSet(draft, exerciseIndex, setIndex, (set) => ({
    ...set,
    completed: !set.completed,
    completedAt: set.completed ? undefined : now,
  }), now);
}

export function startRest(draft: ActiveWorkoutDraft, seconds: number, now = Date.now()): ActiveWorkoutDraft {
  return { ...draft, restEndsAt: now + seconds * 1000, updatedAt: now };
}

export function moveToExercise(draft: ActiveWorkoutDraft, index: number, now = Date.now()): ActiveWorkoutDraft {
  const boundedIndex = Math.max(0, Math.min(index, draft.exercises.length - 1));
  return { ...draft, currentExerciseIndex: boundedIndex, restEndsAt: undefined, updatedAt: now };
}

export function substituteExercise(draft: ActiveWorkoutDraft, exerciseIndex: number, exerciseId: string, now = Date.now()): ActiveWorkoutDraft {
  return {
    ...draft,
    updatedAt: now,
    exercises: draft.exercises.map((exercise, index) => index !== exerciseIndex ? exercise : {
      ...exercise,
      originalExerciseId: exercise.originalExerciseId ?? exercise.exerciseId,
      exerciseId,
      sets: exercise.sets.map((set) => ({ ...set, load: "", reps: "", completed: false, completedAt: undefined })),
    }),
  };
}

export function isExerciseComplete(draft: ActiveWorkoutDraft, exerciseIndex: number) {
  const exercise = draft.exercises[exerciseIndex];
  return Boolean(exercise?.sets.length && exercise.sets.every((set) => set.completed));
}

export function canCompleteSet(set: WorkoutSetLog) {
  return Number(set.reps) > 0;
}

function emptySet(index: number): WorkoutSetLog {
  return { index, load: "", reps: "", completed: false };
}

function sanitizeNumeric(value: string) {
  return value.replace(",", ".").replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
}

function updateSet(
  draft: ActiveWorkoutDraft,
  exerciseIndex: number,
  setIndex: number,
  updater: (set: WorkoutSetLog) => WorkoutSetLog,
  now: number,
): ActiveWorkoutDraft {
  return {
    ...draft,
    updatedAt: now,
    exercises: draft.exercises.map((exercise, currentExerciseIndex) =>
      currentExerciseIndex !== exerciseIndex
        ? exercise
        : {
            ...exercise,
            sets: exercise.sets.map((set, currentSetIndex) => currentSetIndex === setIndex ? updater(set) : set),
          },
    ),
  };
}
