import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';

interface RecipeLoadState {
  loading: boolean;
  recipe: Recipe | undefined;
}

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetailComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  public readonly id = input.required<string>();

  private readonly id$ = toObservable(this.id);

  private readonly loadState = toSignal(
    this.id$.pipe(
      switchMap(id =>
        this.recipeService.getById(Number(id)).pipe(map(recipe => ({ loading: false, recipe })))
      )
    ),
    { initialValue: { loading: true, recipe: undefined } as RecipeLoadState }
  );

  public readonly recipe = computed(() => this.loadState().recipe);
  public readonly loading = computed(() => this.loadState().loading);

  public readonly currentServings = linkedSignal(() => this.recipe()?.servings ?? 0);

  public readonly scaledIngredients = computed(() => {
    const r = this.recipe();
    if (!r) return [];
    const ratio = this.currentServings() / r.servings;
    return r.ingredients.map(ing => ({
      ...ing,
      amount: Math.round(ing.amount * ratio * 10) / 10,
    }));
  });

  public constructor() {
    effect(() => {
      const state = this.loadState();
      if (!state.loading && !state.recipe) {
        this.router.navigate(['/']);
      }
    });
  }

  public decrement(): void {
    if (this.currentServings() > 1) {
      this.currentServings.update(v => v - 1);
    }
  }

  public increment(): void {
    if (this.currentServings() < 20) {
      this.currentServings.update(v => v + 1);
    }
  }
}