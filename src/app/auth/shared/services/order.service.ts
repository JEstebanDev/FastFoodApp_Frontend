import { Injectable, OnInit } from '@angular/core';
import { AddCartInterface } from '../interfaces/addCart.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnInit {
  constructor() {}
  key: number = 0;

  order: AddCartInterface[] = [];

  ngOnInit(): void {
    console.log(this.order);
  }
  getOrder() {
    return this.order;
  }
  listOrders(order: AddCartInterface) {
    if (this.order != null) {
      this.order.map((element) => {
        if (element.product.idProduct == order.product.idProduct) {
          element.quantity += 1;
          this.key = 1;
        }
      });
    }
    if (this.key != 1) {
      this.order.push(order);
    }
    this.key = 0;

    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(this.order));
  }
}
