import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-item-mobile',
  templateUrl: './order-item-mobile.component.html',
  styles: [],
})
export class OrderItemMobileComponent implements OnInit {
  @Input() details!: AddCartInterface;
  @Output() subTotalOrder = new EventEmitter<number>();
  constructor(private orderService: OrderService) {}
  price: number = 0;
  subtotal: number = 0;
  ngOnInit(): void {
    this.price = this.details.product.price;
    if (this.details.additional != null) {
      this.details.additional!.forEach((additional) => {
        this.price += additional.price;
      });
    }
    this.subtotal = this.price * this.details.amount;
    this.subTotalOrder.emit();
  }

  addButton() {
    const product = this.orderService.addButton(this.details);
    this.subtotal = this.price * product.amount;
    this.subTotalOrder.emit();
  }

  lessButton() {
    const product = this.orderService.lessButton(this.details);
    this.subtotal = this.price * product.amount;
    this.subTotalOrder.emit();
  }
}
