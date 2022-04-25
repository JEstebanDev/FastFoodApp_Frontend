import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.loginService.isValidToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.loginService.isValidToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
