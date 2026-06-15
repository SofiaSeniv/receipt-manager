import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetailComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  readonly recipe = computed(() => this.recipeService.getById(Number(this.id())));

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
      if (!this.recipe()) {
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