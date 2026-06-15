export type CategoryName = 'main' | 'soup' | 'snack' | 'dessert';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  num: string;
  technique: string;
  text: string;
  time: string;
}

export interface Recipe {
  id: number;
  title: string;
  photoPath: string;
  categoryName: CategoryName;
  categoryDisplayName: string;
  cookTime: string;
  servings: number;
  versionsCount: number;
  techniques: string[];
  ingredients: Ingredient[];
  steps: Step[];
}