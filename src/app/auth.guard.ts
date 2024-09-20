import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard to check if the user is authenticated before allowing access to a route.
 *
 * @remarks
 * This guard uses the `AuthService` to determine if the user is authenticated.
 *
 * @example
 * To use this guard, add it to the `canActivate` array in your route configuration:
 *
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'protected',
 *     component: ProtectedComponent,
 *     canActivate: [AuthGuard]
 *   }
 * ];
 * ```
 *
 * @param next - The next route snapshot that will be activated.
 * @param state - The router state snapshot.
 * @returns `true` if the user is authenticated, otherwise `false`.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authService.isAuthenticated();
  }
}
