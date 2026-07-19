import { z } from "zod";
import { strFromU8, strToU8, unzipSync, zipSync } from "fflate";
import { db } from "./database";
import type { ActiveWorkoutDraft, BodyMeasurement, CompletedWorkout, ProgressPhoto, RunLog } from "@/types/training";

const backupSchema = z.object({
  format: z.literal("ember-backup"),
  version: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  exportedAt: z.number(),
  data: z.object({
    activeWorkouts: z.array(z.record(z.string(), z.unknown())),
    completedWorkouts: z.array(z.record(z.string(), z.unknown())),
    measurements: z.array(z.record(z.string(), z.unknown())),
    runs: z.array(z.record(z.string(), z.unknown())).optional(),
    progressPhotos: z.array(z.object({ id:z.string(), takenAt:z.number(), pose:z.enum(["front","side","back"]), note:z.string().optional(), createdAt:z.number(), file:z.string() })).optional(),
  }),
});

export async function createBackup() {
  return {
    format: "ember-backup" as const,
    version: 3 as const,
    exportedAt: Date.now(),
    data: {
      activeWorkouts: await db.activeWorkouts.toArray(),
      completedWorkouts: await db.completedWorkouts.toArray(),
      measurements: await db.measurements.toArray(),
      runs: await db.runs.toArray(),
      progressPhotos: [] as Array<{id:string;takenAt:number;pose:"front"|"side"|"back";note?:string;createdAt:number;file:string}>,
    },
  };
}

export async function restoreBackup(input: unknown) {
  const parsed = backupSchema.parse(input);
  await db.transaction("rw", db.activeWorkouts, db.completedWorkouts, db.measurements, db.runs, db.progressPhotos, async () => {
    await Promise.all([db.activeWorkouts.clear(), db.completedWorkouts.clear(), db.measurements.clear(), db.runs.clear(), db.progressPhotos.clear()]);
    await db.activeWorkouts.bulkPut(parsed.data.activeWorkouts as unknown as ActiveWorkoutDraft[]);
    await db.completedWorkouts.bulkPut(parsed.data.completedWorkouts as unknown as CompletedWorkout[]);
    await db.measurements.bulkPut(parsed.data.measurements as unknown as BodyMeasurement[]);
    await db.runs.bulkPut((parsed.data.runs ?? []) as unknown as RunLog[]);
  });
  return { active: parsed.data.activeWorkouts.length, completed: parsed.data.completedWorkouts.length, measurements: parsed.data.measurements.length, runs: parsed.data.runs?.length ?? 0 };
}

export async function createBackupArchive(){
  const backup=await createBackup(); const photos=await db.progressPhotos.toArray(); const files:Record<string,Uint8Array>={};
  backup.data.progressPhotos=photos.map((photo,index)=>{const file=`progress-photos/${photo.takenAt}-${photo.pose}-${index}.webp`;return {id:photo.id,takenAt:photo.takenAt,pose:photo.pose,note:photo.note,createdAt:photo.createdAt,file};});
  for(let i=0;i<photos.length;i+=1) files[backup.data.progressPhotos[i].file]=new Uint8Array(await photos[i].blob.arrayBuffer());
  files["data.json"]=strToU8(JSON.stringify(backup)); return new Blob([zipSync(files,{level:6}) as BlobPart],{type:"application/zip"});
}

export async function restoreBackupArchive(file:File){
  const files=unzipSync(new Uint8Array(await file.arrayBuffer())); if(!files["data.json"]) throw new Error("Data saknas");
  const parsed=backupSchema.parse(JSON.parse(strFromU8(files["data.json"]))); const result=await restoreBackup(parsed);
  const photos:ProgressPhoto[]=(parsed.data.progressPhotos??[]).map(({file:photoFile,...photo})=>{const bytes=files[photoFile];if(!bytes)throw new Error("Bild saknas");return {...photo,blob:new Blob([bytes as BlobPart],{type:"image/webp"})};});
  await db.progressPhotos.bulkPut(photos); return {...result,photos:photos.length};
}
