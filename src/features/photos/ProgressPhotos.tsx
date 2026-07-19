import { Camera, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { progressPhotoRepository } from "@/db/database";
import type { ProgressPhoto, ProgressPhotoPose } from "@/types/training";

const poseLabel:Record<ProgressPhotoPose,string>={front:"Framifrån",side:"Från sidan",back:"Bakifrån"};
export function ProgressPhotos(){
  const [photos,setPhotos]=useState<ProgressPhoto[]>([]); const [pose,setPose]=useState<ProgressPhotoPose>("front");
  useEffect(()=>{void progressPhotoRepository.list().then(setPhotos)},[]);
  const urls=useMemo(()=>photos.map((photo)=>({photo,url:URL.createObjectURL(photo.blob)})),[photos]);
  useEffect(()=>()=>urls.forEach(({url})=>URL.revokeObjectURL(url)),[urls]);
  const add=async(file?:File)=>{if(!file)return;const blob=await resize(file);const photo=await progressPhotoRepository.add({takenAt:Date.now(),pose,blob});setPhotos((current)=>[photo,...current]);};
  return <section className="photos-section"><div className="section-heading"><div><p className="eyebrow">BILDER</p><h2>Progress över tid</h2></div></div><div className="photo-upload"><Camera size={20}/><div><strong>Privat på den här enheten</strong><span>Bilden skalas ned och lagras lokalt.</span></div><select value={pose} onChange={(e)=>setPose(e.target.value as ProgressPhotoPose)}>{Object.entries(poseLabel).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select><label><Plus size={16}/> Lägg till<input type="file" accept="image/*" capture="environment" onChange={(e)=>void add(e.target.files?.[0])}/></label></div>{urls.length===0?<div className="history-empty"><Camera size={27}/><strong>Din första jämförelse börjar här</strong><p>Ta bilder i samma ljus, vinkel och avstånd för en rättvis jämförelse.</p></div>:<div className="photo-grid">{urls.map(({photo,url})=><article key={photo.id}><img src={url} alt={`${poseLabel[photo.pose]} ${new Date(photo.takenAt).toLocaleDateString("sv-SE")}`}/><span>{poseLabel[photo.pose]} · {new Date(photo.takenAt).toLocaleDateString("sv-SE")}</span><button aria-label="Radera bild" onClick={()=>{if(confirm("Radera bilden permanent?"))void progressPhotoRepository.remove(photo.id).then(()=>setPhotos((c)=>c.filter((p)=>p.id!==photo.id)))}}><Trash2 size={15}/></button></article>)}</div>}</section>;
}
async function resize(file:File){const bitmap=await createImageBitmap(file);const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement("canvas");canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext("2d")!.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();return new Promise<Blob>((resolve,reject)=>canvas.toBlob((blob)=>blob?resolve(blob):reject(new Error("Kunde inte behandla bilden")),"image/webp",.82));}
