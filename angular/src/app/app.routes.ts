import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: '**', redirectTo: '' },
];