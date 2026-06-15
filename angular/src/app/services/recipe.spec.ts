// src/app/services/recipe.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe';
import { RECIPES } from '../data/recipes.data';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeService);
  });

  describe('getAll', () => {
    it('should return all recipes', () => {
      expect(service.getAll()).toEqual(RECIPES);
    });

    it('should return non-empty array', () => {
      expect(service.getAll().length).toBeGreaterThan(0);
    });
  });

  describe('getById', () => {
    it('should return correct recipe by id', () => {
      const first = RECIPES[0];
      expect(service.getById(first.id)).toEqual(first);
    });

    it('should return undefined for non-existent id', () => {
      expect(service.getById(9999)).toBeUndefined();
    });

    it('should return undefined for negative id', () => {
      expect(service.getById(-1)).toBeUndefined();
    });
  });
});