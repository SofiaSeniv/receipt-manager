// src/app/services/recipe.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { RecipeService } from './recipe';
import { RECIPES } from '../data/recipes.data';
import { Recipe } from '../models/recipe.model';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  describe('getAll', () => {
    it('should return all recipes', async () => {
      expect(await firstValueFrom(service.getAll())).toEqual(RECIPES);
    });

    it('should return non-empty array', async () => {
      expect((await firstValueFrom(service.getAll())).length).toBeGreaterThan(0);
    });
  });

  describe('getById', () => {
    it('should return correct recipe by id', async () => {
      const first = RECIPES[0];
      expect(await firstValueFrom(service.getById(first.id))).toEqual(first);
    });

    it('should return undefined for non-existent id', async () => {
      expect(await firstValueFrom(service.getById(9999))).toBeUndefined();
    });

    it('should return undefined for negative id', async () => {
      expect(await firstValueFrom(service.getById(-1))).toBeUndefined();
    });
  });

  describe('create', () => {
    const draft: Omit<Recipe, 'id'> = {
      title: 'Test Recipe',
      photoPath: '/photos/test.jpg',
      categoryName: 'snack',
      categoryDisplayName: 'Закуска',
      cookTime: '10 хв',
      servings: 2,
      versionsCount: 1,
      techniques: [],
      ingredients: [],
      steps: [],
    };

    it('adds a new recipe with an auto-generated id', async () => {
      const created = await firstValueFrom(service.create(draft));
      expect(created.id).toBeGreaterThan(0);
      expect(created.title).toBe('Test Recipe');
      expect(await firstValueFrom(service.getById(created.id))).toEqual(created);
    });

    it('does not mutate the original RECIPES constant', async () => {
      const originalLength = RECIPES.length;
      await firstValueFrom(service.create(draft));
      expect(RECIPES.length).toBe(originalLength);
    });
  });

  describe('update', () => {
    it('updates an existing recipe', async () => {
      const target = { ...RECIPES[0], title: 'Updated title' };
      const updated = await firstValueFrom(service.update(target));
      expect(updated.title).toBe('Updated title');
      expect(await firstValueFrom(service.getById(target.id))).toEqual(target);
    });

    it('throws for a non-existent id', async () => {
      await expect(firstValueFrom(service.update({ ...RECIPES[0], id: 9999 }))).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('removes an existing recipe', async () => {
      const target = RECIPES[0];
      await firstValueFrom(service.delete(target.id));
      expect(await firstValueFrom(service.getById(target.id))).toBeUndefined();
    });

    it('throws for a non-existent id', async () => {
      await expect(firstValueFrom(service.delete(9999))).rejects.toThrow();
    });
  });
});
