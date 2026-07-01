import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: '**', component: NotFoundComponent },
];