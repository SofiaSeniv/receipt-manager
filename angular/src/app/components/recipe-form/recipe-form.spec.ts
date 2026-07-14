import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RECIPES } from '../../data/recipes.data';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeStore } from '../../state/recipe.store';
import { RecipeFormComponent } from './recipe-form';

describe('RecipeForm', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let store: InstanceType<typeof RecipeStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFormComponent],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            getAll: () => of(RECIPES),
            getById: (id: number) => of(RECIPES.find((r) => r.id === id)),
            create: (draft: Omit<Recipe, 'id'>) => of({ ...draft, id: 999 }),
            update: (recipe: Recipe) => of(recipe),
            delete: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(RecipeStore);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts empty in create mode', () => {
    fixture.detectChanges();
    const heading: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(heading.textContent).toContain('Новий рецепт');
  });

  it('pre-fills the draft in edit mode', async () => {
    const recipe = RECIPES[0];
    fixture.componentRef.setInput('recipe', recipe);
    await fixture.whenStable();
    fixture.detectChanges();
    const heading: HTMLElement = fixture.nativeElement.querySelector('h2');
    const titleInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(heading.textContent).toContain('Редагувати рецепт');
    expect(titleInput.value).toBe(recipe.title);
  });

  it('calls store.create on submit in create mode', () => {
    const createSpy = vi.spyOn(store, 'create');
    fixture.detectChanges();
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    expect(createSpy).toHaveBeenCalled();
  });

  it('calls store.update on submit in edit mode', async () => {
    const recipe = RECIPES[0];
    fixture.componentRef.setInput('recipe', recipe);
    await fixture.whenStable();
    const updateSpy = vi.spyOn(store, 'update');
    fixture.detectChanges();
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ id: recipe.id }));
  });

  it('emits closed when the cancel button is clicked', () => {
    const emitted = vi.fn();
    component.closed.subscribe(emitted);
    fixture.detectChanges();
    const cancelBtn: HTMLButtonElement = fixture.nativeElement.querySelector('.btn-secondary');
    cancelBtn.click();
    expect(emitted).toHaveBeenCalled();
  });
});
