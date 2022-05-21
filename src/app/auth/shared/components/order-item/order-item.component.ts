import { Component, Input, OnInit } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [],
})
export class OrderItemComponent implements OnInit {
  @Input() details!: AddCartInterface;
  constructor(private orderService: OrderService) {}
  price: number = 0;
  subtotal: number = 0;
  amount: number = 0;
  ngOnInit(): void {
    this.price = this.details.product.price;
    if (this.details.additional != null) {
      this.details.additional!.forEach((additional) => {
        this.price += additional.price;
      });
    }
    this.amount = this.details.quantity!;
    this.subtotal = this.price;
  }
  payment() {}

  addButton() {
    this.amount += 1;
    this.subtotal = this.price * this.amount;
  }
  lessButton() {
    if (this.amount > 0) {
      this.amount -= 1;
      this.subtotal = this.price * this.amount;
    }
    if (this.amount == 0) {
      let detailProduct = this.orderService.getOrder();
      if (detailProduct.includes(this.details)) {
        this.remove(detailProduct, this.details);
      }
      console.log(detailProduct);
    }
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
