import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { BillInterface, OrdersDTO } from '../../interfaces/bill.interface';
import Swal from 'sweetalert2';
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
  statusOrder: string = 'NEW';
  ngOnInit(): void {
    this.homeService.getOrders('NEW').subscribe((order) => {
      this.enable = true;
      this.orders = order;
      this.sortByIdBill();
      //the first item is called to show in the detailsOrder
      const elemetData = this.orders.data.bill[0];
      this.showDetails(elemetData.ordersDTO, elemetData.billUserDTO.idBill);
    });
  }

  getOrders(statusOrder: string) {
    this.statusOrder = statusOrder;
    this.homeService.getOrders(statusOrder).subscribe((order) => {
      this.orders = order;
      this.sortByIdBill();
    });
  }

  showDetails(productsDetails: OrdersDTO[], idBill: number) {
    this.homeProductsDetails.emit(productsDetails);
    this.isClicked = idBill;
  }

  sortByIdBill() {
    this.orders.data.bill.sort(
      (a, b) => a.billUserDTO.idBill - b.billUserDTO.idBill
    );
  }

  changeStatusOrder(idBill: number) {
    switch (this.statusOrder) {
      case 'NEW':
        Swal.fire({
          title: 'Deseas cambiar el estado del pedido?',
          text: 'El siguiente estado sera cocinando',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, por supuesto',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.homeService.setStatusOrder(idBill, 'COOKING').subscribe(() => {
              this.ngOnInit();
            });
            Swal.fire(
              'Cambio exitoso!',
              'Busca en la seccion de cocinando la factura ' + idBill,
              'success'
            );
          }
        });

        break;
      case 'COOKING':
        Swal.fire({
          title: 'Deseas cambiar el estado del pedido?',
          text: 'El siguiente estado sera entregado',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, por supuesto',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.homeService
              .setStatusOrder(idBill, 'DELIVERED')
              .subscribe(() => {
                this.ngOnInit();
              });
            Swal.fire(
              'Cambio exitoso!',
              'Busca en la seccion de entregados la factura ' + idBill,
              'success'
            );
          }
        });

        this.ngOnInit();
        break;
    }
  }
}
