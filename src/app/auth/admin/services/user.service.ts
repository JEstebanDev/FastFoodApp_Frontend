import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ListUser,
  User,
  UserEmployee,
  UserInterface,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<UserInterface>(
      `${this._urlBackendApi}/user/list?page=${page}`,
      {
        headers,
      }
    );
  }

  getUsersAdmin(page: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<UserInterface>(
      `${this._urlBackendApi}/user/list/admin?page=${page}`,
      {
        headers,
      }
    );
  }

  getUsersByName(name: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<UserInterface>(`${this._urlBackendApi}/user/${name}`, {
      headers,
    });
  }

  createUser(user: ListUser, profileImage: File | null) {
    const payload = new FormData();
    payload.append('request', JSON.stringify(user));
    if (profileImage != null) {
      payload.append('userimage', profileImage);
    }
    return this.http.post<UserInterface>(
      `${this._urlBackendApi}/user/`,
      payload
    );
  }

  createUserAdmin(user: ListUser, profileImage: File | null) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(user));
    if (profileImage != null) {
      payload.append('userimage', profileImage);
    }
    return this.http.post<UserInterface>(
      `${this._urlBackendApi}/user/admin`,
      payload,
      {
        headers,
      }
    );
  }

  editUsers(user: ListUser, idUser: number, profileImage: File | null) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(user));
    if (profileImage != null) {
      payload.append('userimage', profileImage);
    }

    return this.http.put<UserInterface>(
      `${this._urlBackendApi}/user/${idUser}`,
      payload,
      {
        headers,
      }
    );
  }

  editUsersEmployee(user: UserEmployee, idUser: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new FormData();
    payload.append('request', JSON.stringify(user));

    return this.http.put<UserInterface>(
      `${this._urlBackendApi}/user/${idUser}`,
      payload,
      {
        headers,
      }
    );
  }

  disableUser(idUser: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(
      `${this._urlBackendApi}/user/disable-account/${idUser}`,
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
