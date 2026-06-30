// src/app/services/recipe.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { RecipeService } from './recipe';
import { RECIPES } from '../data/recipes.data';

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
});
