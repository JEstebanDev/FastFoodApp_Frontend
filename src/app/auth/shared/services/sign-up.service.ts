import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignUpRequest } from '../interfaces/login.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private _urlBackendApi: string = environment.urlBackendApi;
  constructor(private http: HttpClient) {}

  saveUser(createUser: SignUpRequest) {
    const user = JSON.stringify(createUser);
    const payload = new HttpParams().set('request', user);
    return this.http.post<SignUpRequest>(
      `${this._urlBackendApi}/user/`,
      payload
    );
  }
}
