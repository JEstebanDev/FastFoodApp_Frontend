import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getUsers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<UserInterface>(`${this._urlBackendApi}/user/list/0`, {
      headers,
    });
  }

  createUser(user: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new HttpParams().set('request', JSON.stringify(user));
    return this.http.post<UserInterface>(
      `${this._urlBackendApi}/user/`,
      payload,
      {
        headers,
      }
    );
  }

  editUsers(user: User, idUser: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new HttpParams().set('request', JSON.stringify(user));
    return this.http.put<UserInterface>(
      `${this._urlBackendApi}/user/${idUser}`,
      payload,
      {
        headers,
      }
    );
  }

  deleteUser(idUser: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.delete<UserInterface>(
      `${this._urlBackendApi}/user/${idUser}`,
      {
        headers,
      }
    );
  }
}
