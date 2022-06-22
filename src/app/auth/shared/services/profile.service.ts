import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillInterface } from '../../admin/interfaces/bill.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getProducts(username: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    const payload = new HttpParams().append('username', username);
    return this.http.get<BillInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
  }
}
