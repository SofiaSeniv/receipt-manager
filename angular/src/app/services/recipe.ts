import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../data/recipes.data';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipes = RECIPES;

  public getAll(): Observable<Recipe[]> {
    return of(this.recipes).pipe(delay(200));
  }

  public getById(id: number): Observable<Recipe | undefined> {
    return of(this.recipes.find(r => r.id === id)).pipe(delay(200));
  }
}
