import { z } from "zod";
import { db } from "./database";
import type { ActiveWorkoutDraft, BodyMeasurement, CompletedWorkout, RunLog } from "@/types/training";

const backupSchema = z.object({
  format: z.literal("ember-backup"),
  version: z.union([z.literal(1), z.literal(2)]),
  exportedAt: z.number(),
  data: z.object({
    activeWorkouts: z.array(z.record(z.string(), z.unknown())),
    completedWorkouts: z.array(z.record(z.string(), z.unknown())),
    measurements: z.array(z.record(z.string(), z.unknown())),
    runs: z.array(z.record(z.string(), z.unknown())).optional(),
  }),
});

export async function createBackup() {
  return {
    format: "ember-backup" as const,
    version: 2 as const,
    exportedAt: Date.now(),
    data: {
      activeWorkouts: await db.activeWorkouts.toArray(),
      completedWorkouts: await db.completedWorkouts.toArray(),
      measurements: await db.measurements.toArray(),
      runs: await db.runs.toArray(),
    },
  };
}

export async function restoreBackup(input: unknown) {
  const parsed = backupSchema.parse(input);
  await db.transaction("rw", db.activeWorkouts, db.completedWorkouts, db.measurements, db.runs, async () => {
    await Promise.all([db.activeWorkouts.clear(), db.completedWorkouts.clear(), db.measurements.clear(), db.runs.clear()]);
    await db.activeWorkouts.bulkPut(parsed.data.activeWorkouts as unknown as ActiveWorkoutDraft[]);
    await db.completedWorkouts.bulkPut(parsed.data.completedWorkouts as unknown as CompletedWorkout[]);
    await db.measurements.bulkPut(parsed.data.measurements as unknown as BodyMeasurement[]);
    await db.runs.bulkPut((parsed.data.runs ?? []) as unknown as RunLog[]);
  });
  return { active: parsed.data.activeWorkouts.length, completed: parsed.data.completedWorkouts.length, measurements: parsed.data.measurements.length, runs: parsed.data.runs?.length ?? 0 };
}
