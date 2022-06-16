import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillInterface } from '../interfaces/bill.interface';
import { OrderStatus } from '../interfaces/orderStatus.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient) {}

  getOrders(statusOrder: string) {
    //for the moment the dates are like this but when is working will the last hour
    const payload = new HttpParams()
      .set('startDate', '2022-06-01 00:00:00')
      .set('endDate', '2022-07-29 23:59:59')
      .set('statusOrder', statusOrder);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get<BillInterface>(
      `${this._urlBackendApi}/bill/list?${payload}`,
      {
        headers,
      }
    );
  }
  setStatusOrder(idBill: number, statusOrder: string) {
    //for the moment the dates are like this but when is working will the last hour
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
