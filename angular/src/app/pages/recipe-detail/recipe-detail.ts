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

  readonly id = input.required<string>();

  private readonly id$ = toObservable(this.id);

  private readonly loadState = toSignal(
    this.id$.pipe(
      switchMap(id =>
        this.recipeService.getById(Number(id)).pipe(map(recipe => ({ loading: false, recipe })))
      )
    ),
    { initialValue: { loading: true, recipe: undefined } as RecipeLoadState }
  );

  readonly recipe = computed(() => this.loadState().recipe);
  readonly loading = computed(() => this.loadState().loading);

  readonly currentServings = linkedSignal(() => this.recipe()?.servings ?? 0);

  readonly scaledIngredients = computed(() => {
    const r = this.recipe();
    if (!r) return [];
    const ratio = this.currentServings() / r.servings;
    return r.ingredients.map(ing => ({
      ...ing,
      amount: Math.round(ing.amount * ratio * 10) / 10,
    }));
  });

  constructor() {
    effect(() => {
      const state = this.loadState();
      if (!state.loading && !state.recipe) {
        this.router.navigate(['/']);
      }
    });
  }

  decrement(): void {
    if (this.currentServings() > 1) {
      this.currentServings.update(v => v - 1);
    }
  }

  increment(): void {
    if (this.currentServings() < 20) {
      this.currentServings.update(v => v + 1);
    }
  }
}