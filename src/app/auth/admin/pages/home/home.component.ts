import { Component, OnInit } from '@angular/core';
import { BillInterface, OrdersDTO } from '../../interfaces/bill.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  isClicked: number = 0;
  constructor(private homeService: HomeService) {}
  orders: BillInterface = null!;
  enable: boolean = false;
  ngOnInit(): void {
    this.homeService.getOrders('NEW').subscribe((order) => {
      this.enable = true;
      this.orders = order;
      //the first item is called to show in the detailsOrder
      const elemetData = this.orders.data.bill[0];
      this.showDetails(elemetData.ordersDTO, elemetData.billUserDTO.idBill);
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
