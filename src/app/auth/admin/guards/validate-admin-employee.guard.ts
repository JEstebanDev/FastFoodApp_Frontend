import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ValidateAdminEmployeeGuard implements CanActivate, CanLoad {
  canActivate() {
    if (localStorage.getItem('token') != null) {
      let token = localStorage.getItem('token')!;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (decodedToken.roles[0] == 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }
  canLoad() {
    if (localStorage.getItem('token') != null) {
      let token = localStorage.getItem('token')!;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      if (decodedToken.roles[0] == 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }
}
