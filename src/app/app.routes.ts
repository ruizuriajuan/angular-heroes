import { Routes } from '@angular/router';
import { AuthActivateGuard, AuthMatchGuard, AuthSessionActivateGuard } from './auth/services/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./auth/layout-page.component'),
        canActivate:[AuthSessionActivateGuard],
        children: [
            { path: 'login', loadComponent: () => import('./auth/page/login-page/login-page.component').then(c => c.LoginPageComponent) },
            { path: 'register', loadComponent: () => import('./auth/page/register-page/register-page.component').then(c => c.RegisterPageComponent) },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: 'heroes',
        loadComponent: () => import('./heroes/page/layout-page/layout-page.component'),
        canActivate: [AuthActivateGuard],
        children: [
            { path: 'add', loadComponent: () => import('./heroes/page/new-page/new-page.component').then(c => c.NewPageComponent) },
            { path: 'search', loadComponent: () => import('./heroes/page/search-page/search-page.component').then(c => c.SearchPageComponent) },
            { path: 'edit/:id', loadComponent: () => import('./heroes/page/new-page/new-page.component').then(c => c.NewPageComponent) },
            { path: 'list', loadComponent: () => import('./heroes/page/list-page/list-page.component').then(c => c.ListPageComponent) },
            { path: ':id', loadComponent: () => import('./heroes/page/hero-page/hero-page.component').then(c => c.HeroPageComponent) },
            { path: '**', redirectTo: 'list' },
        ]
    }
];
