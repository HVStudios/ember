import { Database, Download, Info, Moon, Timer, Upload, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { createBackup, restoreBackup } from "@/db/backup";
import { readSettings, saveSettings, type EmberSettings, type ThemePreference } from "@/lib/settings";

export function SettingsPage() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState<EmberSettings>(() => readSettings());
  const update = <K extends keyof EmberSettings>(key: K, value: EmberSettings[K]) => {
    const next = { ...settings, [key]: value }; setSettings(next); saveSettings(next); setMessage("Inställningen har sparats.");
  };
  const downloadBackup = async () => {
    const backup = await createBackup();
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `ember-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(url);
    setMessage("Säkerhetskopian har skapats.");
  };
  const importBackup = async (file?: File) => {
    if (!file) return;
    try { const content = JSON.parse(await file.text()) as unknown; if (!window.confirm("Importen ersätter all lokal Ember-data. Vill du fortsätta?")) return; const result = await restoreBackup(content); setMessage(`Återställt: ${result.completed} pass, ${result.runs} löppass och ${result.measurements} mätningar.`); }
    catch { setMessage("Filen kunde inte valideras. Ingen data ändrades."); }
    if (fileInput.current) fileInput.current.value = "";
  };

  return <div className="page settings-page"><header className="topbar"><BrandMark /><span className="program-version">EMBER 0.2</span></header>
    <section className="page-intro"><p className="eyebrow">INSTÄLLNINGAR</p><h1>Gör Ember till din</h1><p>Utseende och träningsstandarder sparas lokalt på den här enheten.</p></section>
    <section className="settings-group form-settings">
      <label><UserRound size={18}/><span><strong>Namn</strong><small>Används i hälsningar</small></span><input value={settings.name} onChange={(event) => update("name", event.target.value)} /></label>
      <label><Moon size={18}/><span><strong>Tema</strong><small>Följ telefonen eller välj själv</small></span><select value={settings.theme} onChange={(event) => update("theme", event.target.value as ThemePreference)}><option value="system">System</option><option value="dark">Mörkt</option><option value="light">Ljust</option></select></label>
      <label><Timer size={18}/><span><strong>Standardvila</strong><small>För nya, fria pass senare</small></span><select value={settings.defaultRestSeconds} onChange={(event) => update("defaultRestSeconds", Number(event.target.value))}><option value={60}>60 sek</option><option value={90}>90 sek</option><option value={120}>120 sek</option></select></label>
    </section>
    <section className="settings-group"><div className="settings-title"><Database size={18}/><div><strong>Säkerhetskopia</strong><span>Versionsmärkt JSON-format</span></div></div><button onClick={downloadBackup}><Download size={18}/><div><strong>Exportera all data</strong><span>Gym, löpning, utkast och kroppsmått</span></div></button><button onClick={() => fileInput.current?.click()}><Upload size={18}/><div><strong>Återställ från fil</strong><span>Valideras innan befintlig data ersätts</span></div></button><input ref={fileInput} hidden type="file" accept="application/json,.json" onChange={(event) => void importBackup(event.target.files?.[0])}/></section>
    {message && <div className="settings-message" role="status">{message}</div>}<aside className="settings-info"><Info size={18}/><p>All träningsdata ligger lokalt. Exportera en backup innan du byter eller återställer telefonen.</p></aside></div>;
}
