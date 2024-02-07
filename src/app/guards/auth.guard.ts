import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  return inject(AuthService).currentUser.pipe(take(1), map(user => {
    const isAuthenticated = !!user;
    return isAuthenticated ? true : router.createUrlTree(['/auth']);
  }));
};
