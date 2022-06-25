import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTypeUserGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.loginService.isValidTypeUser().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/profile');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.loginService.isValidTypeUser().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/profile');
        }
      })
    );
  }
}
