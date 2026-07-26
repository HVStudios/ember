const key = "ember:meal-favorites";

export function readFavoriteRecipes(): string[] {
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as string[]; }
  catch { return []; }
}

export function toggleFavoriteRecipe(id: string) {
  const current = new Set(readFavoriteRecipes());
  if (current.has(id)) current.delete(id);
  else current.add(id);
  const next = [...current];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}
