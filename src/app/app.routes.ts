import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth/auth.guard';
import { recipeResolver } from './common/resolvers/recipe/recipe.resolver';

export const routes: Routes = [
    {
        path: 'login', 
        loadComponent: () => import('./features/login/login.component').then(comp => comp.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import('./core/components/layout/layout.component').then(comp => comp.LayoutComponent),
        loadChildren: () => [
            {
                path: '', 
                pathMatch: 'full', 
                redirectTo: 'home'
            },
            {
                path: 'home', 
                canActivate: [authGuard], 
                loadComponent: () => import('./features/home/home.component').then(comp => comp.HomeComponent)
            },
            {
                path: 'recipes/:path', 
                canActivate: [authGuard], 
                resolve: {recipe: recipeResolver}, 
                loadComponent: () => import('./features/recipe-detail/recipe-detail.component').then(comp => comp.RecipeDetailComponent)
            }
        ]
    }
];
