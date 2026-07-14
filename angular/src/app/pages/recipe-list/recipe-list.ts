import { Component, inject, signal } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form';
import { CategoryName } from '../../models/recipe.model';
import { RecipeStore } from '../../state/recipe.store';

interface Filter {
  key: CategoryName | 'all';
  label: string;
}

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent, RecipeFormComponent],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeListComponent {
  protected readonly store = inject(RecipeStore);

  public readonly filters: Filter[] = [
    { key: 'all', label: 'Всі' },
    { key: 'main', label: 'Основне' },
    { key: 'soup', label: 'Суп' },
    { key: 'snack', label: 'Закуска' },
    { key: 'dessert', label: 'Десерт' },
  ];

  protected readonly formVisible = signal(false);

  public onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.store.search(value);
  }

  protected openCreateForm(): void {
    this.formVisible.set(true);
  }

  protected closeForm(): void {
    this.formVisible.set(false);
  }
}
