export type ExerciseId = string;
export type WorkoutTemplateId = string;

export type LoadSemantics =
  | "external-total"
  | "per-dumbbell"
  | "machine-display"
  | "bodyweight"
  | "assistance";

export type SetTarget = {
  sets: number;
  reps?: { min: number; max: number };
  distanceMeters?: { min: number; max: number };
  durationSeconds?: { min: number; max: number };
  rir?: { min: number; max: number };
  restSeconds: number;
  unilateral?: boolean;
};

export type ExerciseDefinition = {
  id: ExerciseId;
  version: number;
  name: { sv: string; en: string };
  equipment: string[];
  primaryMuscles: string[];
  loadSemantics: LoadSemantics;
  media: {
    kind: "image-pair" | "animation" | "placeholder";
    src?: string;
    alt: { sv: string; en: string };
  };
  purpose: { sv: string; en: string };
  steps: { sv: string[]; en: string[] };
  cues: { sv: string[]; en: string[] };
  commonMistakes: { sv: string[]; en: string[] };
  expectedSensation: { sv: string[]; en: string[] };
  alternativeExerciseIds: ExerciseId[];
};

export type WorkoutExercisePrescription = {
  exerciseId: ExerciseId;
  order: number;
  target: SetTarget;
  notes?: { sv: string; en: string };
};

export type WorkoutTemplate = {
  id: WorkoutTemplateId;
  name: { sv: string; en: string };
  kind: "core" | "optional";
  estimatedMinutes: number;
  focus: { sv: string; en: string };
  exercises: WorkoutExercisePrescription[];
};

export type ProgramDefinition = {
  id: string;
  version: number;
  name: { sv: string; en: string };
  description: { sv: string; en: string };
  workoutSequence: WorkoutTemplateId[];
  optionalWorkoutIds: WorkoutTemplateId[];
  workouts: WorkoutTemplate[];
};

export type WorkoutSetLog = {
  index: number;
  load: string;
  reps: string;
  distanceMeters?: string;
  durationSeconds?: string;
  completed: boolean;
  completedAt?: number;
};

export type WorkoutExerciseLog = {
  exerciseId: ExerciseId;
  originalExerciseId?: ExerciseId;
  prescription: WorkoutExercisePrescription;
  sets: WorkoutSetLog[];
  actualRir?: number;
};

export type ActiveWorkoutDraft = {
  id: string;
  programId: string;
  programVersion: number;
  workoutTemplateId: WorkoutTemplateId;
  workoutName: string;
  startedAt: number;
  updatedAt: number;
  currentExerciseIndex: number;
  exercises: WorkoutExerciseLog[];
  restEndsAt?: number;
  warmupCompleted?: boolean;
};

export type CompletedWorkout = Omit<ActiveWorkoutDraft, "restEndsAt"> & {
  endedAt: number;
  durationSeconds: number;
};

export type BodyMeasurement = {
  id: string;
  measuredAt: number;
  weightKg?: number;
  waistCm?: number;
  note?: string;
  createdAt: number;
};

export type RunType = "easy" | "interval" | "tempo" | "long";

export type RunLog = {
  id: string;
  ranAt: number;
  type: RunType;
  distanceKm: number;
  durationSeconds: number;
  note?: string;
  createdAt: number;
};

export type ProgressPhotoPose = "front" | "side" | "back";
export type ProgressPhoto = { id: string; takenAt: number; pose: ProgressPhotoPose; blob: Blob; note?: string; createdAt: number };
