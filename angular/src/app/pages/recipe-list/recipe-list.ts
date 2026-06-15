import { Component, computed, inject, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card';
import { CategoryName } from '../../models/recipe.model';

interface Filter {
  key: CategoryName | 'all';
  label: string;
}

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);

  readonly filters: Filter[] = [
    { key: 'all', label: 'Всі' },
    { key: 'main', label: 'Основне' },
    { key: 'soup', label: 'Суп' },
    { key: 'snack', label: 'Закуска' },
    { key: 'dessert', label: 'Десерт' },
  ];

  readonly query = signal('');
  readonly activeFilter = signal<CategoryName | 'all'>('all');

  private readonly allRecipes = this.recipeService.getAll();

  readonly filteredRecipes = computed(() => {
    const q = this.query().toLowerCase();
    const filter = this.activeFilter();
    return this.allRecipes.filter(r => {
      const matchesCategory = filter === 'all' || r.categoryName === filter;
      const matchesQuery = r.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  });

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}