import type { CSSProperties } from "react";
import type { Recipe } from "@/types/meals";

export function RecipeVisual({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  if (!recipe.imagePosition) {
    return (
      <div className={`recipe-visual recipe-visual--placeholder ${compact ? "recipe-visual--compact" : ""}`} role="img" aria-label={recipe.name}>
        <span>EMBER MEALS</span>
        <strong>{recipe.name}</strong>
      </div>
    );
  }

  const { column, row } = recipe.imagePosition;
  const style = {
    "--meal-x": `${column * 50}%`,
    "--meal-y": `${row * 100}%`,
  } as CSSProperties;

  return (
    <div className={`recipe-visual ${compact ? "recipe-visual--compact" : ""}`} role="img" aria-label={recipe.name}>
      <div className="recipe-atlas" style={style} />
    </div>
  );
}
