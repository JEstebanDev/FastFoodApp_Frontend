import { Component, Input } from '@angular/core';
import { OrdersDTO } from '../../interfaces/bill.interface';
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styles: [],
})
export class OrderInfoComponent {
  @Input() homeProductsDetails!: OrdersDTO[];
}
