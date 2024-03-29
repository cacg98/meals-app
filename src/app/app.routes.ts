import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth/auth.guard';
import { recipeResolver } from './common/resolvers/recipe/recipe.resolver';
import { favoritesResolver } from './common/resolvers/favorites/favorites.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component'),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/components/layout/layout.component'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component'),
      },
      {
        path: 'recipes/:path',
        resolve: { recipe: recipeResolver },
        loadComponent: () =>
          import('./features/recipe-detail/recipe-detail.component'),
      },
      {
        path: 'favorites',
        resolve: { favorites: favoritesResolver },
        loadComponent: () => import('./features/favorites/favorites.component'),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
