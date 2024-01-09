import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('./features/login/login.component').then(comp => comp.LoginComponent)},
];
