import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RECIPES } from '../data/recipes.data';
import { RecipeService } from '../services/recipe';
import { RecipeStore } from './recipe.store';

function flush(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('RecipeStore', () => {
  let store: InstanceType<typeof RecipeStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeService,
          useValue: {
            getAll: () => of(RECIPES),
            getById: (id: number) => of(RECIPES.find((r) => r.id === id)),
          },
        },
      ],
    });
    store = TestBed.inject(RecipeStore);
  });

  it('loads all recipes on init', () => {
    expect(store.loading()).toBe(false);
    expect(store.recipes()).toEqual(RECIPES);
  });

  describe('filteredRecipes', () => {
    it('returns all recipes when filter is "all" and query is empty', () => {
      expect(store.filteredRecipes()).toEqual(RECIPES);
    });

    it('filters by category', () => {
      const target = RECIPES[0];
      store.setCategoryFilter(target.categoryName);
      const result = store.filteredRecipes();
      expect(result).toContainEqual(target);
      expect(result.every((r) => r.categoryName === target.categoryName)).toBe(true);
    });

    it('filters by debounced search query', async () => {
      const target = RECIPES[0];
      store.search(target.title.slice(0, 3).toLowerCase());
      expect(store.filteredRecipes()).toEqual(RECIPES);
      await flush();
      const result = store.filteredRecipes();
      expect(result).toContainEqual(target);
      expect(result.every((r) => r.title.toLowerCase().includes(target.title.slice(0, 3).toLowerCase()))).toBe(true);
    });
  });

  describe('loadById / selectedRecipe', () => {
    it('sets selectedId, currentServings and clears detailLoading', () => {
      const target = RECIPES[1];
      store.loadById(target.id);
      expect(store.detailLoading()).toBe(false);
      expect(store.detailError()).toBeNull();
      expect(store.selectedRecipe()).toEqual(target);
      expect(store.currentServings()).toBe(target.servings);
    });

    it('sets detailError when the recipe does not exist', () => {
      store.loadById(9999);
      expect(store.detailError()).toBeTruthy();
      expect(store.selectedRecipe()).toBeUndefined();
    });
  });

  describe('scaledIngredients', () => {
    it('returns an empty array before any recipe is selected', () => {
      expect(store.scaledIngredients()).toEqual([]);
    });

    it('scales ingredient amounts relative to currentServings', () => {
      const recipe = RECIPES[0];
      store.loadById(recipe.id);
      store.incrementServings();
      const scaled = store.scaledIngredients();
      const ratio = (recipe.servings + 1) / recipe.servings;
      expect(scaled[0].amount).toBeCloseTo(recipe.ingredients[0].amount * ratio, 1);
    });
  });

  describe('search', () => {
    it('updates searchQuery immediately and debouncedQuery after the debounce window', async () => {
      store.search('борщ');
      expect(store.searchQuery()).toBe('борщ');
      expect(store.debouncedQuery()).toBe('');
      await flush();
      expect(store.debouncedQuery()).toBe('борщ');
    });
  });

  describe('setCategoryFilter', () => {
    it('updates categoryFilter', () => {
      store.setCategoryFilter('dessert');
      expect(store.categoryFilter()).toBe('dessert');
    });
  });

  describe('servings scaler', () => {
    it('increments but does not exceed 20', () => {
      store.loadById(RECIPES[0].id);
      for (let i = 0; i < 30; i++) {
        store.incrementServings();
      }
      expect(store.currentServings()).toBe(20);
    });

    it('decrements but does not go below 1', () => {
      store.loadById(RECIPES[0].id);
      for (let i = 0; i < 30; i++) {
        store.decrementServings();
      }
      expect(store.currentServings()).toBe(1);
    });
  });
});
