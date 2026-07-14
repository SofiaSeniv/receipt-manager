import { Component, computed, inject, input } from '@angular/core';
import { RecipeStore } from '../../state/recipe.store';
import { NotFoundComponent } from '../not-found/not-found';

@Component({
  selector: 'app-recipe-detail',
  imports: [NotFoundComponent],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetailComponent {
  protected readonly store = inject(RecipeStore);

  public readonly id = input.required<string>();

  public constructor() {
    this.store.loadById(computed(() => Number(this.id())));
  }
}
