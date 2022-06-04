import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddCartInterface } from '../interfaces/addCart.interface';
import { CreateBillResponse } from '../interfaces/createBill.interface';
import { CreateBillParams } from '../interfaces/createBillParams.interface';
import { TokenBill } from '../interfaces/tokenBill.interface';
import { BillInformation } from '../../admin/interfaces/billInformation.interface';
import { OrderResponse } from '../interfaces/createOrderResponse';
import { Taxes } from '../interfaces/taxes.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(private http: HttpClient, private route: Router) {}

  createBill(newBill: CreateBillParams) {
    return this.http.post<CreateBillResponse>(
      `${this._urlBackendApi}/bill`,
      newBill
    );
  }

  setOrder() {
    localStorage.getItem('order');
  }

  createOrder(newOrder: AddCartInterface[]) {
    newOrder.forEach((element) => {
      this.http
        .post<OrderResponse>(`${this._urlBackendApi}/orders`, element)
        .subscribe(() => {
          this.route.navigateByUrl('/bill');
        });
    });
  }

  setTokenBill(idBill: number) {
    return this.http.get<TokenBill>(
      `${this._urlBackendApi}/token-refresh/unattributed/${idBill}`
    );
  }

  getBill() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('bill')}` || ''
    );
    return this.http.get<BillInformation>(
      `${this._urlBackendApi}/bill/unattributed/`,
      {
        headers,
      }
    );
  }

  getTaxes() {
    return this.http.get<Taxes>(`${this._urlBackendApi}/tax/`);
  }
}
