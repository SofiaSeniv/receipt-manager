import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../data/recipes.data';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipes = [...RECIPES];

  public getAll(): Observable<Recipe[]> {
    return of([...this.recipes]).pipe(delay(200));
  }

  public getById(id: number): Observable<Recipe | undefined> {
    return of(this.recipes.find(r => r.id === id)).pipe(delay(200));
  }

  public create(draft: Omit<Recipe, 'id'>): Observable<Recipe> {
    const nextId = Math.max(0, ...this.recipes.map(r => r.id)) + 1;
    const created: Recipe = { ...draft, id: nextId };
    this.recipes.push(created);
    return of(created).pipe(delay(200));
  }

  public update(recipe: Recipe): Observable<Recipe> {
    const index = this.recipes.findIndex(r => r.id === recipe.id);
    if (index === -1) {
      return throwError(() => new Error(`Recipe ${recipe.id} not found`)).pipe(delay(200));
    }
    this.recipes[index] = recipe;
    return of(recipe).pipe(delay(200));
  }

  public delete(id: number): Observable<void> {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Recipe ${id} not found`)).pipe(delay(200));
    }
    this.recipes.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }
}
