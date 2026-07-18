import { BrandMark } from "@/components/BrandMark";

export function PlaceholderPage({ title, message }: { title: string; message: string }) {
  return <div className="page placeholder-page"><BrandMark /><p className="eyebrow">EMBER · KOMMER SNART</p><h1>{title}</h1><p>{message}</p></div>;
}

