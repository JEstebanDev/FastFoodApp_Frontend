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
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private _urlBackendApi: string = environment.urlBackendApi;

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private route: Router
  ) {}
  newOrder!: AddCartInterface[];
  createBill(newBill: CreateBillParams, method: number) {
    this.newOrder = JSON.parse(localStorage.getItem('order')!);
    this.http
      .post<CreateBillResponse>(`${this._urlBackendApi}/bill`, newBill)
      .subscribe((response) => {
        this.setTokenBill(response.data?.bill.idBill!);
        this.newOrder.forEach((element) => {
          element.bill.idBill = response.data?.bill.idBill!;
        });
        this.createOrder(this.newOrder, method);
      });
  }

  createOrder(newOrder: AddCartInterface[], method: number) {
    newOrder.forEach((element) => {
      this.http
        .post<OrderResponse>(`${this._urlBackendApi}/orders`, element)
        .subscribe(() => {
          this.orderService.deleteOrder();
          if (method == 3) {
            let element: HTMLElement = document.getElementsByClassName(
              'pagos'
            )[0] as HTMLElement;
            element.click();
          } else {
            this.route.navigateByUrl('/bill');
          }
        });
    });
  }

  checkTransaction(idBill: number) {
    return this.http.get(`${this._urlBackendApi}/bill/transaction/${idBill}`);
  }

  setOrder() {
    localStorage.getItem('order');
  }

  setTokenBill(idBill: number) {
    this.http
      .get<TokenBill>(
        `${this._urlBackendApi}/token-refresh/unattributed/${idBill}`
      )
      .subscribe((token) => {
        localStorage.setItem('bill', token.data?.unattributed.toString()!);
      });
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
