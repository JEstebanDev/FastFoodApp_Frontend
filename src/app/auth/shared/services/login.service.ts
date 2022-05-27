import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../interfaces/login.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenUser } from '../interfaces/tokenUser.interface';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  isValidToken(): Observable<boolean> {
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
        catchError((error) => of(false))
      );
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
