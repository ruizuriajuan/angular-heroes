
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | Observable<boolean> => {
    console.log('AuthActivateGuard..............', { route, state });
    return checkAuthStatus();
}

export const AuthSessionActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | Observable<boolean> => {
    console.log('AuthActivateGuard..............', { route, state });
    return checkControlSession();
}

export const AuthMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
): boolean | Observable<boolean> => {
    console.log('AuthMatchGuard..............', { route, segments });
    return checkAuthStatus();
}

function checkAuthStatus(): boolean | Observable<boolean> {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.checkAuthentication()
        .pipe(
            tap(estaLogueado => {
                if (!estaLogueado) {
                    router.navigate(['./auth/login']);
                }
            })
        );
};

function checkControlSession(): boolean | Observable<boolean> {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.checkAuthentication()
        .pipe(
            tap(estaLogueado => {
                if (estaLogueado) {
                    router.navigate(['./']);
                }
            }),
            map( estaLogueado => !estaLogueado)
        );
};