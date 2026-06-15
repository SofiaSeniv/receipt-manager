import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../data/recipes.data';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipes = RECIPES;

  getAll(): Recipe[] {
    return this.recipes;
  }

  getById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }
}
