import Dexie, { type EntityTable } from "dexie";
import type { ActiveWorkoutDraft, BodyMeasurement, CompletedWorkout, ExerciseId, ProgressPhoto, RunLog, WorkoutExerciseLog } from "@/types/training";
import { createCompletedWorkout } from "@/lib/workouts/completion";

class EmberDatabase extends Dexie {
  activeWorkouts!: EntityTable<ActiveWorkoutDraft, "id">;
  completedWorkouts!: EntityTable<CompletedWorkout, "id">;
  measurements!: EntityTable<BodyMeasurement, "id">;
  runs!: EntityTable<RunLog, "id">;
  progressPhotos!: EntityTable<ProgressPhoto, "id">;

  constructor() {
    super("ember");
    this.version(1).stores({
      activeWorkouts: "&id, workoutTemplateId, updatedAt",
    });
    this.version(2).stores({
      activeWorkouts: "&id, workoutTemplateId, updatedAt",
      completedWorkouts: "&id, workoutTemplateId, endedAt",
    });
    this.version(3).stores({
      activeWorkouts: "&id, workoutTemplateId, updatedAt",
      completedWorkouts: "&id, workoutTemplateId, endedAt",
      measurements: "&id, measuredAt",
    });
    this.version(4).stores({
      activeWorkouts: "&id, workoutTemplateId, updatedAt",
      completedWorkouts: "&id, workoutTemplateId, endedAt",
      measurements: "&id, measuredAt",
      runs: "&id, ranAt, type",
    });
    this.version(5).stores({ activeWorkouts:"&id, workoutTemplateId, updatedAt", completedWorkouts:"&id, workoutTemplateId, endedAt", measurements:"&id, measuredAt", runs:"&id, ranAt, type", progressPhotos:"&id, takenAt, pose" });
  }
}

export const db = new EmberDatabase();

export const activeWorkoutRepository = {
  async list() { return db.activeWorkouts.orderBy("updatedAt").reverse().toArray(); },
  async get(id: string) {
    return db.activeWorkouts.get(id);
  },
  async save(draft: ActiveWorkoutDraft) {
    await db.activeWorkouts.put(draft);
  },
  async remove(id: string) {
    await db.activeWorkouts.delete(id);
  },
};

export const measurementRepository = {
  async list() { return db.measurements.orderBy("measuredAt").toArray(); },
  async add(input: Omit<BodyMeasurement, "id" | "createdAt">) {
    const createdAt = Date.now();
    const measurement: BodyMeasurement = { ...input, id: `measurement:${createdAt}`, createdAt };
    await db.measurements.add(measurement);
    return measurement;
  },
  async update(measurement: BodyMeasurement) { await db.measurements.put(measurement); return measurement; },
  async remove(id: string) { await db.measurements.delete(id); },
};

export const runRepository = {
  async list() { return db.runs.orderBy("ranAt").reverse().toArray(); },
  async add(input: Omit<RunLog, "id" | "createdAt">) {
    const createdAt = Date.now();
    const run: RunLog = { ...input, id: `run:${createdAt}`, createdAt };
    await db.runs.add(run);
    return run;
  },
  async remove(id: string) { await db.runs.delete(id); },
};
export const progressPhotoRepository = {
  async list(){ return db.progressPhotos.orderBy("takenAt").reverse().toArray(); },
  async add(input: Omit<ProgressPhoto,"id"|"createdAt">){ const createdAt=Date.now(); const photo={...input,id:`photo:${createdAt}:${input.pose}`,createdAt}; await db.progressPhotos.put(photo); return photo; },
  async remove(id:string){ await db.progressPhotos.delete(id); },
};

export const completedWorkoutRepository = {
  async get(id: string) {
    return db.completedWorkouts.get(id);
  },
  async list() {
    return db.completedWorkouts.orderBy("endedAt").reverse().toArray();
  },
  async countSince(timestamp: number) {
    return db.completedWorkouts.where("endedAt").aboveOrEqual(timestamp).count();
  },
  async latestExerciseResults(exerciseIds: ExerciseId[]) {
    const requested = new Set(exerciseIds);
    const results = new Map<ExerciseId, WorkoutExerciseLog>();
    const workouts = await db.completedWorkouts.orderBy("endedAt").reverse().toArray();

    for (const workout of workouts) {
      for (const exercise of workout.exercises) {
        if (requested.has(exercise.exerciseId) && !results.has(exercise.exerciseId)) {
          results.set(exercise.exerciseId, exercise);
        }
      }
      if (results.size === requested.size) break;
    }

    return results;
  },
  async exerciseHistory(exerciseId: ExerciseId) {
    const workouts = await db.completedWorkouts.orderBy("endedAt").toArray();
    return workouts.flatMap((workout) => workout.exercises
      .filter((exercise) => exercise.exerciseId === exerciseId)
      .map((exercise) => ({ endedAt: workout.endedAt, exercise })));
  },
  async complete(draft: ActiveWorkoutDraft, endedAt = Date.now()) {
    const completed = createCompletedWorkout(draft, endedAt);

    await db.transaction("rw", db.activeWorkouts, db.completedWorkouts, async () => {
      await db.completedWorkouts.put(completed);
      await db.activeWorkouts.delete(draft.id);
    });

    return completed;
  },
};
