import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef
  ) {}

  isModalVisible: boolean = false;
  orderList!: AddCartInterface[];
  value: string = '';
  totalOrder: number = 0;
  async ngOnInit(): Promise<void> {
    this.orderService.ngOnInit();
    if (this.orderService.order != null) {
      this.orderList = this.orderService.order;
    }
  }

  payment() {
    this.isModalVisible = true;
    console.log(this.orderService.getOrder());
  }

  setTotalOrder() {
    this.totalOrder = 0;
    this.orderService.getOrder().map((element) => {
      let additionalTotal: number = 0;
      if (element.additional != null) {
        element.additional!.forEach((additional) => {
          additionalTotal += additional.price;
        });
      }
      this.totalOrder +=
        (element.product.price + additionalTotal) * element.quantity;
    });
    this.cdRef.detectChanges();
  }
}
