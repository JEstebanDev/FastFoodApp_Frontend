import { Injectable } from '@angular/core';
import { AddCartInterface } from '../interfaces/addCart.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}
  order: AddCartInterface[] = [];

  getOrder() {
    return this.order;
  }

  listOrders(order: AddCartInterface) {
    this.order.push(order);
    console.log(this.order);
  }
}
