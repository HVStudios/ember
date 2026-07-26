import { useState } from "react";
import { ArrowLeft, Check, ChefHat, Clock3, Flame, Heart, Snowflake, Star, UtensilsCrossed, WalletCards } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RecipeVisual } from "@/components/RecipeVisual";
import { getRecipe } from "@/data/recipes/ember-meals-v1";
import { formatIngredient } from "@/lib/meals/format";
import { readFavoriteRecipes, toggleFavoriteRecipe } from "@/lib/meals/favorites";

const portions = [2, 4, 6, 8];

function Score({ icon: Icon, label, value }: { icon: typeof Star; label: string; value: number }) {
  return <div><Icon size={16} /><strong>{value}/5</strong><span>{label}</span></div>;
}

export function RecipeDetailPage() {
  const { recipeId = "" } = useParams();
  const recipe = getRecipe(recipeId);
  const [servings, setServings] = useState(4);
  const [favorite, setFavorite] = useState(() => readFavoriteRecipes().includes(recipeId));
  if (!recipe) return <Navigate to="/meals" replace />;

  function toggleFavorite() {
    setFavorite(toggleFavoriteRecipe(recipeId).includes(recipeId));
  }

  return (
    <main className="recipe-detail-page">
      <header className="recipe-detail-header">
        <Link className="icon-button" to="/meals" aria-label="Tillbaka"><ArrowLeft size={19} /></Link>
        <span>EMBER MEALS</span>
        <button className="icon-button" type="button" onClick={toggleFavorite} aria-label={favorite ? "Ta bort favorit" : "Spara favorit"}><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button>
      </header>

      <RecipeVisual recipe={recipe} />
      <section className="recipe-title">
        <div className="recipe-tags">{recipe.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
      </section>

      <section className="recipe-nutrition" aria-label="Receptfakta">
        <div><Flame size={17} /><strong>{recipe.calories}</strong><span>kcal / portion</span></div>
        <div><UtensilsCrossed size={17} /><strong>{recipe.protein} g</strong><span>protein</span></div>
        <div><Clock3 size={17} /><strong>{recipe.minutes}</strong><span>minuter</span></div>
        <div><WalletCards size={17} /><strong>{recipe.priceSek[0]}–{recipe.priceSek[1]} kr</strong><span>ca / portion</span></div>
      </section>

      <section className="recipe-scores">
        <Score icon={ChefHat} label="Meal prep" value={recipe.scores.mealPrep} />
        <Score icon={Snowflake} label="Frysbar" value={recipe.scores.freezer} />
        <Score icon={Star} label="Smak" value={recipe.scores.taste} />
      </section>

      <section className="meal-detail-section">
        <div className="meal-section-heading"><div><p className="eyebrow">INKÖPSLISTA</p><h2>Ingredienser</h2></div><div className="serving-picker" aria-label="Antal portioner">{portions.map((count) => <button type="button" key={count} className={servings === count ? "is-active" : ""} onClick={() => setServings(count)}>{count}</button>)}</div></div>
        <p className="serving-note">{servings} portioner · mängderna skalas automatiskt</p>
        <div className="ingredient-groups">
          {recipe.ingredientGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.ingredients.map((ingredient, index) => <li key={`${ingredient.item}-${index}`}><span>{formatIngredient(ingredient, servings, recipe.servings)}</span>{ingredient.note && <small>{ingredient.note}</small>}</li>)}</ul></div>)}
        </div>
      </section>

      <section className="meal-detail-section">
        <p className="eyebrow">STEG FÖR STEG</p><h2>Så lagar du</h2>
        <ol className="recipe-steps">{recipe.instructions.map((instruction, index) => <li key={instruction}><span>{index + 1}</span><p>{instruction}</p></li>)}</ol>
      </section>

      <section className="meal-detail-section recipe-notes">
        <div><h2>Tips från Ember</h2><ul>{recipe.tips.map((tip) => <li key={tip}><Check size={14} />{tip}</li>)}</ul></div>
        <div><h2>Variationer</h2><ul>{recipe.variations.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div><h2>Alternativ</h2><ul>{recipe.alternatives.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="storage-note"><Snowflake size={18} /><div><strong>Förvaring</strong><p>{recipe.storage}</p></div></div>
      </section>
    </main>
  );
}
