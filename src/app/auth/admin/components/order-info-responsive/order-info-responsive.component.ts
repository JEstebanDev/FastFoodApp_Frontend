import { Component, Input } from '@angular/core';
import { OrdersDTO } from '../../interfaces/bill.interface';
@Component({
  selector: 'app-order-info-responsive',
  templateUrl: './order-info-responsive.component.html',
  styles: [],
})
export class OrderInfoResponsiveComponent {
  @Input() homeProductsDetails!: OrdersDTO[];
}
