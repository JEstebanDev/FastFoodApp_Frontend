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

  ngOnInit(): void {}

  getOrder() {
    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(this.order));
    return this.order;
  }
  addButton(details: AddCartInterface) {
    details.quantity += 1;
    return details;
  }
  lessButton(details: AddCartInterface) {
    if (details.quantity > 0) {
      details.quantity -= 1;
    }
    if (details.quantity == 0) {
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
