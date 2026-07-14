import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { CategoryName, Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;

  selectedId: number | null;
  detailLoading: boolean;
  detailError: string | null;

  searchQuery: string;
  debouncedQuery: string;
  categoryFilter: CategoryName | 'all';

  currentServings: number | null;

  creating: boolean;
  createError: string | null;
  updating: boolean;
  updateError: string | null;
  deletingId: number | null;
  deleteError: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,

  selectedId: null,
  detailLoading: true,
  detailError: null,

  searchQuery: '',
  debouncedQuery: '',
  categoryFilter: 'all',

  currentServings: null,

  creating: false,
  createError: null,
  updating: false,
  updateError: null,
  deletingId: null,
  deleteError: null,
};

export const RecipeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    filteredRecipes: computed(() => {
      const q = store.debouncedQuery().toLowerCase();
      const filter = store.categoryFilter();
      return store.recipes().filter((r) => {
        const matchesCategory = filter === 'all' || r.categoryName === filter;
        const matchesQuery = r.title.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
    }),
    selectedRecipe: computed(() => store.recipes().find((r) => r.id === store.selectedId())),
    scaledIngredients: computed(() => {
      const recipe = store.recipes().find((r) => r.id === store.selectedId());
      const servings = store.currentServings();
      if (!recipe || servings === null) return [];
      const ratio = servings / recipe.servings;
      return recipe.ingredients.map((ing) => ({
        ...ing,
        amount: Math.round(ing.amount * ratio * 10) / 10,
      }));
    }),
  })),
  withMethods((store, recipeService = inject(RecipeService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          recipeService.getAll().pipe(
            tap((recipes) => patchState(store, { recipes, loading: false })),
            catchError(() => {
              patchState(store, { loading: false, error: 'Не вдалося завантажити рецепти' });
              return EMPTY;
            })
          )
        )
      )
    ),

    loadById: rxMethod<number>(
      pipe(
        tap((id) => patchState(store, { selectedId: id, detailLoading: true, detailError: null })),
        switchMap((id) =>
          recipeService.getById(id).pipe(
            tap((recipe) => {
              patchState(store, {
                detailLoading: false,
                currentServings: recipe?.servings ?? null,
                detailError: recipe ? null : 'Рецепт не знайдено',
              });
              if (recipe && !store.recipes().some((r) => r.id === recipe.id)) {
                patchState(store, { recipes: [...store.recipes(), recipe] });
              }
            }),
            catchError(() => {
              patchState(store, { detailLoading: false, detailError: 'Рецепт не знайдено' });
              return EMPTY;
            })
          )
        )
      )
    ),

    search: rxMethod<string>(
      pipe(
        tap((query) => patchState(store, { searchQuery: query })),
        debounceTime(250),
        distinctUntilChanged(),
        tap((query) => patchState(store, { debouncedQuery: query }))
      )
    ),

    create: rxMethod<Omit<Recipe, 'id'>>(
      pipe(
        tap(() => patchState(store, { creating: true, createError: null })),
        exhaustMap((draft) =>
          recipeService.create(draft).pipe(
            tap((created) =>
              patchState(store, {
                recipes: [...store.recipes(), created],
                creating: false,
              })
            ),
            catchError(() => {
              patchState(store, { creating: false, createError: 'Не вдалося створити рецепт' });
              return EMPTY;
            })
          )
        )
      )
    ),

    update: rxMethod<Recipe>(
      pipe(
        tap(() => patchState(store, { updating: true, updateError: null })),
        exhaustMap((recipe) =>
          recipeService.update(recipe).pipe(
            tap((updated) =>
              patchState(store, {
                recipes: store.recipes().map((r) => (r.id === updated.id ? updated : r)),
                updating: false,
                ...(store.selectedId() === updated.id ? { currentServings: updated.servings } : {}),
              })
            ),
            catchError(() => {
              patchState(store, { updating: false, updateError: 'Не вдалося оновити рецепт' });
              return EMPTY;
            })
          )
        )
      )
    ),

    remove: rxMethod<number>(
      pipe(
        tap((id) => patchState(store, { deletingId: id, deleteError: null })),
        exhaustMap((id) =>
          recipeService.delete(id).pipe(
            tap(() =>
              patchState(store, {
                recipes: store.recipes().filter((r) => r.id !== id),
                deletingId: null,
              })
            ),
            catchError(() => {
              patchState(store, { deletingId: null, deleteError: 'Не вдалося видалити рецепт' });
              return EMPTY;
            })
          )
        )
      )
    ),

    setCategoryFilter(filter: CategoryName | 'all'): void {
      patchState(store, { categoryFilter: filter });
    },

    decrementServings(): void {
      const servings = store.currentServings();
      if (servings !== null && servings > 1) {
        patchState(store, { currentServings: servings - 1 });
      }
    },

    incrementServings(): void {
      const servings = store.currentServings();
      if (servings !== null && servings < 20) {
        patchState(store, { currentServings: servings + 1 });
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  })
);
