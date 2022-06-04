import { Injectable, OnInit } from '@angular/core';
import { AddCartInterface } from '../interfaces/addCart.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnInit {
  constructor() {}
  key: number = 0;
  order: AddCartInterface[] = [];
  totalOrder: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order')!);
    }
  }

  getOrder() {
    localStorage.setItem('order', JSON.stringify(this.order));
    return this.order;
  }

  deleteOrder() {
    this.order = [];
    localStorage.removeItem('order');
  }

  listOrders(order: AddCartInterface) {
    this.ngOnInit();
    if (this.order != null) {
      this.order.map((element) => {
        if (JSON.stringify(element) == JSON.stringify(order)) {
          element.amount += 1;
          this.key = 1;
        }
      });
    }
    if (this.key != 1) {
      this.order.push(order);
    }
    this.key = 0;
    localStorage.setItem('order', JSON.stringify(this.order));
  }

  addButton(details: AddCartInterface) {
    details.amount += 1;
    return details;
  }
  lessButton(details: AddCartInterface) {
    if (details.amount > 0) {
      details.amount -= 1;
    }
    if (details.amount == 0) {
      let detailProduct = this.order;
      if (detailProduct.includes(details)) {
        this.remove(detailProduct, details);
      }
    }
    return details;
  }

  remove(
    NumberAdditionals: AddCartInterface[],
    removeNumber: AddCartInterface
  ) {
    var found = NumberAdditionals.indexOf(removeNumber);
    while (found !== -1) {
      NumberAdditionals.splice(found, 1);
      found = NumberAdditionals.indexOf(removeNumber);
    }
  }
}
