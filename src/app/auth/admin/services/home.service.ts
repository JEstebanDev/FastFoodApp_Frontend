import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeInterface } from '../interfaces/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getOrders(statusOrder: string) {
    //for the moment the dates are like this but when is working will the last hour
    const payload = new HttpParams()
      .set('startDate', '2022-01-01')
      .set('endDate', '2022-04-01')
      .set('statusOrder', statusOrder);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<HomeInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
  }
}
