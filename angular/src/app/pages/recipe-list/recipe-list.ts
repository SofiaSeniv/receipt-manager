import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RecipeService } from '../../services/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card';
import { CategoryName, Recipe } from '../../models/recipe.model';

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

  public readonly filters: Filter[] = [
    { key: 'all', label: 'Всі' },
    { key: 'main', label: 'Основне' },
    { key: 'soup', label: 'Суп' },
    { key: 'snack', label: 'Закуска' },
    { key: 'dessert', label: 'Десерт' },
  ];

  public readonly query = signal('');
  public readonly activeFilter = signal<CategoryName | 'all'>('all');

  private readonly allRecipes = toSignal(this.recipeService.getAll(), {
    initialValue: [] as Recipe[],
  });

  private readonly search$ = new Subject<string>();
  private readonly debouncedQuery = toSignal(
    this.search$.pipe(debounceTime(250), distinctUntilChanged()),
    { initialValue: '' }
  );

  public readonly filteredRecipes = computed(() => {
    const q = this.debouncedQuery().toLowerCase();
    const filter = this.activeFilter();
    return this.allRecipes().filter(r => {
      const matchesCategory = filter === 'all' || r.categoryName === filter;
      const matchesQuery = r.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  });

  public onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.search$.next(value);
  }
}