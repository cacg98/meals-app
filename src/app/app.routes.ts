import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth/auth.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'login', loadComponent: () => import('./features/login/login.component').then(comp => comp.LoginComponent)},
    {path: 'home', canActivate: [authGuard], loadComponent: () => import('./features/home/home.component').then(comp => comp.HomeComponent)},
];
