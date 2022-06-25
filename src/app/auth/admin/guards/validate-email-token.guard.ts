import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateEmailTokenGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let token = state.url.replace('/recover-password/', '');
    return this.loginService.isValidTokenEmail(token).pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
