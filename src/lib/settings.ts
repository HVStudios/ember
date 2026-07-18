export type ThemePreference = "system" | "light" | "dark";

export type EmberSettings = {
  name: string;
  theme: ThemePreference;
  defaultRestSeconds: number;
};

const key = "ember:settings";
export const defaultSettings: EmberSettings = { name: "Henrik", theme: "system", defaultRestSeconds: 90 };

export function readSettings(): EmberSettings {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem(key) ?? "{}") as Partial<EmberSettings> }; }
  catch { return defaultSettings; }
}

export function saveSettings(settings: EmberSettings) {
  localStorage.setItem(key, JSON.stringify(settings));
  applyTheme(settings.theme);
  window.dispatchEvent(new Event("ember-settings"));
}

export function applyTheme(theme: ThemePreference) {
  const resolved = theme === "system" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}
