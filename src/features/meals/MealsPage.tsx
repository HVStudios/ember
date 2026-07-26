import { useMemo, useState } from "react";
import { Clock3, Flame, Heart, Search, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { RecipeVisual } from "@/components/RecipeVisual";
import { emberMealsV1 } from "@/data/recipes/ember-meals-v1";
import { readFavoriteRecipes, toggleFavoriteRecipe } from "@/lib/meals/favorites";

export function MealsPage() {
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(readFavoriteRecipes);
  const recipes = useMemo(() => emberMealsV1.filter((recipe) => {
    const matchesQuery = `${recipe.name} ${recipe.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (!favoritesOnly || favorites.includes(recipe.id));
  }), [favorites, favoritesOnly, query]);

  function toggleFavorite(id: string) {
    setFavorites(toggleFavoriteRecipe(id));
  }

  return (
    <div className="page meals-page">
      <header className="topbar"><BrandMark /><span className="meals-mode"><Utensils size={14} /> Meals</span></header>
      <section className="page-intro meals-intro">
        <p className="eyebrow">RESTAURANGKÄNSLA · MEAL PREP</p>
        <h1>Mat du längtar<br />efter att äta.</h1>
        <p>Proteinrika vardagsfavoriter byggda för fyra goda luncher – inte för att kännas som fitnessmat.</p>
      </section>

      <div className="meal-toolbar">
        <label className="meal-search"><Search size={17} /><span className="sr-only">Sök recept</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök rätt eller ingrediens" /></label>
        <button type="button" className={favoritesOnly ? "is-active" : ""} onClick={() => setFavoritesOnly((value) => !value)} aria-pressed={favoritesOnly}><Heart size={17} fill={favoritesOnly ? "currentColor" : "none"} /> Favoriter</button>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <Link to={`/meals/${recipe.id}`}><RecipeVisual recipe={recipe} /></Link>
            <button type="button" className="recipe-favorite" onClick={() => toggleFavorite(recipe.id)} aria-label={favorites.includes(recipe.id) ? "Ta bort favorit" : "Spara favorit"}>
              <Heart size={17} fill={favorites.includes(recipe.id) ? "currentColor" : "none"} />
            </button>
            <Link className="recipe-card__copy" to={`/meals/${recipe.id}`}>
              <div className="recipe-tags">{recipe.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <div className="recipe-card__meta"><span><Flame size={13} />{recipe.calories} kcal</span><span>{recipe.protein} g protein</span><span><Clock3 size={13} />{recipe.minutes} min</span></div>
            </Link>
          </article>
        ))}
      </div>
      {!recipes.length && <div className="meals-empty"><Utensils size={24} /><strong>Inga recept här ännu</strong><p>Prova en annan sökning eller visa alla recept.</p></div>}
      <p className="meal-disclaimer">Näringsvärden, tider och priser är uppskattningar. Faktiskt innehåll beror på råvaror och portionsstorlek.</p>
    </div>
  );
}
