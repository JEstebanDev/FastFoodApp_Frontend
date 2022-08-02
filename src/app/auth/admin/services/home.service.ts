import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillOrderInterface } from '../interfaces/billOrder.interface';
import { OrderStatus } from '../interfaces/orderStatus.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getOrders(statusOrder: string) {
    //this is the code for work daily
    var date = new Date();
    var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    //for the moment the dates are like this but when is working will the last hour
    const payload = new HttpParams()
      .set('page', 0)
      .set('startDate', '2022-06-01 00:00:00')
      .set('endDate', '2022-12-29 23:59:59')
      .set('statusOrder', statusOrder);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<BillOrderInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
  }

  setStatusOrder(idBill: number, statusOrder: string) {
    const payload = new HttpParams().set('statusOrder', statusOrder);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<OrderStatus>(
      `${this._urlBackendApi}/orders/status/${idBill}?${payload}`,
      {
        headers,
      }
    );
  }
}
