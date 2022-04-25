import { Component, OnInit } from '@angular/core';
import { HomeInterface } from '../../interfaces/home.interface';
import { OrdersDTO } from '../../interfaces/home.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  isClicked: number = 0;
  constructor(private homeService: HomeService) {}
  hola: string = 'puta';
  orders: HomeInterface = null!;
  enable: boolean = false;
  ngOnInit(): void {
    this.homeService.getOrders('NEW').subscribe((order) => {
      this.enable = true;
      this.orders = order;
      console.log();
    });
  }

  getOrders(statusOrder: string) {
    this.homeService.getOrders(statusOrder).subscribe((order) => {
      this.orders = order;
    });
  }
  homeProductsDetails!: OrdersDTO[];
  showDetails(productsDetails: OrdersDTO[], idBill: number) {
    this.homeProductsDetails = productsDetails;
    this.isClicked = idBill;
  }
}
