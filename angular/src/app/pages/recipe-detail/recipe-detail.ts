import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form';
import { RecipeStore } from '../../state/recipe.store';
import { NotFoundComponent } from '../not-found/not-found';

@Component({
  selector: 'app-recipe-detail',
  imports: [NotFoundComponent, RecipeFormComponent],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetailComponent {
  protected readonly store = inject(RecipeStore);
  private readonly router = inject(Router);

  public readonly id = input.required<string>();

  protected readonly formVisible = signal(false);

  public constructor() {
    this.store.loadById(computed(() => Number(this.id())));
  }

  protected openEditForm(): void {
    this.formVisible.set(true);
  }

  protected closeForm(): void {
    this.formVisible.set(false);
  }

  protected deleteRecipe(id: number): void {
    if (confirm('Видалити рецепт?')) {
      this.store.remove(id);
      this.router.navigate(['/']);
    }
  }
}
