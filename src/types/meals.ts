export type Ingredient = {
  amount?: number;
  unit?: string;
  item: string;
  note?: string;
};

export type IngredientGroup = {
  title: string;
  ingredients: Ingredient[];
};

export type RecipeScore = {
  mealPrep: number;
  freezer: number;
  taste: number;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  servings: number;
  minutes: number;
  priceSek: [number, number];
  calories: number;
  protein: number;
  tags: string[];
  scores: RecipeScore;
  imagePosition?: { column: number; row: number };
  ingredientGroups: IngredientGroup[];
  instructions: string[];
  tips: string[];
  variations: string[];
  alternatives: string[];
  storage: string;
};
