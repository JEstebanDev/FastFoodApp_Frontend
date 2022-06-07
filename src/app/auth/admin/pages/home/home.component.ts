import { Component } from '@angular/core';
import { OrdersDTO } from '../../interfaces/bill.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  homeProductsDetails!: OrdersDTO[];

  getProductsDetails(productsDetails: OrdersDTO[]) {
    this.homeProductsDetails = productsDetails;
  }
}
