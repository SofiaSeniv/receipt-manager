import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryName, Ingredient, Recipe, Step } from '../../models/recipe.model';
import { RecipeStore } from '../../state/recipe.store';

interface RecipeDraft {
  title: string;
  photoPath: string;
  categoryName: CategoryName;
  categoryDisplayName: string;
  cookTime: string;
  servings: number;
  versionsCount: number;
  techniques: string[];
  ingredients: Ingredient[];
  steps: Step[];
}

interface CategoryOption {
  key: CategoryName;
  label: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { key: 'main', label: 'Основне' },
  { key: 'soup', label: 'Суп' },
  { key: 'snack', label: 'Закуска' },
  { key: 'dessert', label: 'Десерт' },
];

function emptyDraft(): RecipeDraft {
  return {
    title: '',
    photoPath: '',
    categoryName: CATEGORY_OPTIONS[0].key,
    categoryDisplayName: CATEGORY_OPTIONS[0].label,
    cookTime: '',
    servings: 1,
    versionsCount: 1,
    techniques: [],
    ingredients: [],
    steps: [],
  };
}

function toDraft(recipe: Recipe): RecipeDraft {
  return {
    title: recipe.title,
    photoPath: recipe.photoPath,
    categoryName: recipe.categoryName,
    categoryDisplayName: recipe.categoryDisplayName,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    versionsCount: recipe.versionsCount,
    techniques: [...recipe.techniques],
    ingredients: recipe.ingredients.map((ing) => ({ ...ing })),
    steps: recipe.steps.map((step) => ({ ...step })),
  };
}

@Component({
  selector: 'app-recipe-form',
  imports: [FormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeFormComponent {
  protected readonly store = inject(RecipeStore);

  public readonly recipe = input<Recipe | null>(null);
  public readonly closed = output<void>();

  protected readonly categoryOptions = CATEGORY_OPTIONS;
  protected readonly draft = signal<RecipeDraft>(emptyDraft());
  protected readonly isEdit = computed(() => this.recipe() !== null);
  protected readonly saving = computed(() => this.store.creating() || this.store.updating());

  public constructor() {
    effect(() => {
      const recipe = this.recipe();
      this.draft.set(recipe ? toDraft(recipe) : emptyDraft());
    });
  }

  protected onTitleInput(event: Event): void {
    this.updateField('title', (event.target as HTMLInputElement).value);
  }

  protected onPhotoPathInput(event: Event): void {
    this.updateField('photoPath', (event.target as HTMLInputElement).value);
  }

  protected onCookTimeInput(event: Event): void {
    this.updateField('cookTime', (event.target as HTMLInputElement).value);
  }

  protected onServingsInput(event: Event): void {
    this.updateField('servings', Number((event.target as HTMLInputElement).value));
  }

  protected onTechniquesInput(event: Event): void {
    const techniques = (event.target as HTMLInputElement).value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    this.updateField('techniques', techniques);
  }

  protected onCategoryChange(event: Event): void {
    const key = (event.target as HTMLSelectElement).value as CategoryName;
    const option = this.categoryOptions.find((o) => o.key === key);
    this.draft.update((d) => ({
      ...d,
      categoryName: key,
      categoryDisplayName: option?.label ?? d.categoryDisplayName,
    }));
  }

  protected addIngredient(): void {
    this.draft.update((d) => ({
      ...d,
      ingredients: [...d.ingredients, { name: '', amount: 0, unit: '' }],
    }));
  }

  protected removeIngredient(index: number): void {
    this.draft.update((d) => ({
      ...d,
      ingredients: d.ingredients.filter((_, i) => i !== index),
    }));
  }

  protected onIngredientNameInput(index: number, event: Event): void {
    this.updateIngredient(index, 'name', (event.target as HTMLInputElement).value);
  }

  protected onIngredientAmountInput(index: number, event: Event): void {
    this.updateIngredient(index, 'amount', Number((event.target as HTMLInputElement).value));
  }

  protected onIngredientUnitInput(index: number, event: Event): void {
    this.updateIngredient(index, 'unit', (event.target as HTMLInputElement).value);
  }

  protected addStep(): void {
    this.draft.update((d) => ({
      ...d,
      steps: [
        ...d.steps,
        { num: String(d.steps.length + 1).padStart(2, '0'), technique: '', text: '', time: '' },
      ],
    }));
  }

  protected removeStep(index: number): void {
    this.draft.update((d) => ({
      ...d,
      steps: d.steps.filter((_, i) => i !== index),
    }));
  }

  protected onStepTechniqueInput(index: number, event: Event): void {
    this.updateStep(index, 'technique', (event.target as HTMLInputElement).value);
  }

  protected onStepTextInput(index: number, event: Event): void {
    this.updateStep(index, 'text', (event.target as HTMLInputElement).value);
  }

  protected onStepTimeInput(index: number, event: Event): void {
    this.updateStep(index, 'time', (event.target as HTMLInputElement).value);
  }

  protected submit(): void {
    const current = this.recipe();
    if (current) {
      this.store.update({ ...this.draft(), id: current.id });
    } else {
      this.store.create(this.draft());
    }
    this.closed.emit();
  }

  protected cancel(): void {
    this.closed.emit();
  }

  private updateField<K extends keyof RecipeDraft>(field: K, value: RecipeDraft[K]): void {
    this.draft.update((d) => ({ ...d, [field]: value }));
  }

  private updateIngredient<K extends keyof Ingredient>(index: number, field: K, value: Ingredient[K]): void {
    this.draft.update((d) => ({
      ...d,
      ingredients: d.ingredients.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    }));
  }

  private updateStep<K extends keyof Step>(index: number, field: K, value: Step[K]): void {
    this.draft.update((d) => ({
      ...d,
      steps: d.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
    }));
  }
}
