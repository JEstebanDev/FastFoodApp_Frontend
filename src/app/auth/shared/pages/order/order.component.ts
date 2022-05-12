import { Component, OnInit } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  orderList!: AddCartInterface[];
  ngOnInit(): void {
    if (this.orderService.order != null) {
      this.orderList = this.orderService.order;
      console.log(this.orderList);
    }
  }
}
