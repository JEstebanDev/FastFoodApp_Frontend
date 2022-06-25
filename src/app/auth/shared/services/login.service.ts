import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  RecoverRequest,
  User,
} from '../interfaces/login.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUser } from '../interfaces/tokenUser.interface';
import { ValidEmailToken } from '../interfaces/valid-email-toke.interface';
import { EmailSent } from '../interfaces/emailSent.interface';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _urlBackendApi: string = environment.urlBackendApi;
  private user!: TokenUser | undefined;
  constructor(private http: HttpClient) {}

  isValidToken(): Observable<boolean> {
    if (localStorage.getItem('token') != null) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}` || ''
      );
      return this.http
        .get<LoginResponse>(`${this._urlBackendApi}/token-refresh`, {
          headers,
        })
        .pipe(
          map((resp) => {
            if (resp.statusCode == 401) {
              return false;
            } else {
              return true;
            }
          }),
          catchError(() => of(false))
        );
    }
    return of(false);
  }

  isValidTypeUser(): Observable<boolean> {
    if (localStorage.getItem('token') != null) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}` || ''
      );
      return this.http
        .get<LoginResponse>(`${this._urlBackendApi}/token-refresh`, {
          headers,
        })
        .pipe(
          map((resp) => {
            if (resp.data?.tokens.userRoles === 'ROLE_CLIENT') {
              return false;
            } else {
              return true;
            }
          }),
          catchError(() => of(false))
        );
    }
    return of(false);
  }

  isValidTokenEmail(token: string) {
    return this.http
      .get<ValidEmailToken>(
        `${this._urlBackendApi}/valid-email-token?token=${token}`
      )
      .pipe(
        map((resp) => {
          if (resp.statusCode == 401) {
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => of(false))
      );
  }

  sendMailRecoverPassword(email: string) {
    const payload = new HttpParams().set('email', email);
    return this.http.get<EmailSent>(
      `${this._urlBackendApi}/recover-password?${payload}`
    );
  }

  resetPassword(token: string, recoverValue: RecoverRequest) {
    const payload = new HttpParams()
      .set('newPassword', recoverValue.newPassword)
      .set('repeatNewPassword', recoverValue.repeatNewPassword);
    return this.http.post<User>(
      `${this._urlBackendApi}/reset-password?token=${token}`,
      payload
    );
  }

  setUser(user: TokenUser) {
    return (this.user = user);
  }

  getUser() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<TokenUser>(
      `${this._urlBackendApi}/token-refresh/user`,
      {
        headers,
      }
    );
  }

  getLogin(login: LoginRequest): Observable<LoginResponse> {
    const payload = new HttpParams()
      .set('username', login.username)
      .set('password', login.password);

    return this.http
      .post<LoginResponse>(`${this._urlBackendApi}/login`, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(catchError((error) => of(error)));
  }
}
