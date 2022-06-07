import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { BillInterface, OrdersDTO } from '../../interfaces/bill.interface';
@Component({
  selector: 'app-order-side',
  templateUrl: './order-side.component.html',
  styles: [],
})
export class OrderSideComponent implements OnInit {
  @Output() homeProductsDetails = new EventEmitter<OrdersDTO[]>();
  isClicked: number = 0;
  constructor(private homeService: HomeService) {}
  enable: boolean = false;
  orders: BillInterface = null!;
  statusOrder: string = '';
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
    this.statusOrder = statusOrder;
    this.homeService.getOrders(statusOrder).subscribe((order) => {
      this.orders = order;
    });
  }

  showDetails(productsDetails: OrdersDTO[], idBill: number) {
    this.homeProductsDetails.emit(productsDetails);
    this.isClicked = idBill;
  }

  changeStatusOrder() {}
}
