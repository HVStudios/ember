export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`} aria-label="Ember">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      {!compact && <span className="brand-name">EMBER</span>}
    </div>
  );
}

