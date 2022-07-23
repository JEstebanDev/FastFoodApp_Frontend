import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { BillInterface, OrdersDTO } from '../../interfaces/bill.interface';
import Swal from 'sweetalert2';
import { BillService } from '../../services/bill.service';
import { BillOrderInterface } from '../../interfaces/billOrder.interface';
@Component({
  selector: 'app-order-side',
  templateUrl: './order-side.component.html',
  styles: [],
})
export class OrderSideComponent implements OnInit {
  @Output() homeProductsDetails = new EventEmitter<OrdersDTO[]>();

  isClicked: number = 0;
  constructor(
    private homeService: HomeService,
    private billService: BillService
  ) {}

  enable: boolean = false;
  orders: BillOrderInterface = null!;
  statusOrder: string = 'NEW';

  ngOnInit(): void {
    this.updateListOrders('NEW');
  }
  updateListOrders(statusOrder: string) {
    this.homeService.getOrders(statusOrder).subscribe((order) => {
      this.enable = true;
      this.orders = order;
      this.sortByIdBill();
      //the first item is called to show in the detailsOrder
      if (this.orders.data.bill[0] != null) {
        const elemetData = this.orders.data.bill[0];
        this.showDetails(elemetData.ordersDTO, elemetData.billUserDTO.idBill);
      }
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

  goToService(idBill: number, statusOrder: string, message: string) {
    Swal.fire({
      title: 'Deseas cambiar el estado del pedido?',
      text: 'El siguiente estado sera ' + message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, por supuesto',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.homeService.setStatusOrder(idBill, statusOrder).subscribe(() => {
          this.updateListOrders(statusOrder);
          this.statusOrder = statusOrder;
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Acción realizada',
          showConfirmButton: false,
          timer: 1200,
          toast: true,
          width: 300,
        });
      }
    });
  }

  changeStatusOrder(idBill: number, option: string) {
    switch (this.statusOrder) {
      case 'NEW':
        if (option == 'ACCEPTED') {
          Swal.fire({
            title: '¿Deseas aceptar el pedido?',
            text: 'El siguiente pedido se añadira a la lista de preparación',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aceptar pedido',
            denyButtonText: 'Cancelar este pedido',
          }).then((result) => {
            if (result.isConfirmed) {
              this.billService
                .updateStatusBill(idBill, 'ACCEPTED')
                .subscribe((resp) => {
                  this.updateListOrders('NEW');

                  if (resp.statusCode == 200) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Acción realizada',
                      showConfirmButton: false,
                      timer: 1000,
                      toast: true,
                      width: 300,
                    });
                  }
                });
            } else if (result.isDenied) {
              this.billService
                .updateStatusBill(idBill, 'DELETED')
                .subscribe((resp) => {
                  this.updateListOrders('NEW');
                  if (resp.statusCode == 200) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Acción realizada',
                      showConfirmButton: false,
                      timer: 1000,
                      toast: true,
                      width: 300,
                    });
                  }
                });
            }
          });
        }
        if (option == 'NEXT') {
          this.goToService(idBill, 'COOKING', 'cocinando');
        }
        break;
      case 'COOKING':
        if (option == 'BACK') {
          this.goToService(idBill, 'NEW', 'nuevo');
        }
        if (option == 'NEXT') {
          this.goToService(idBill, 'COOKED', 'preparado');
        }
        break;

      case 'COOKED':
        if (option == 'BACK') {
          this.goToService(idBill, 'COOKING', 'cocinando');
        }
        if (option == 'NEXT') {
          this.goToService(idBill, 'DELIVERED', 'entregado');
        }

        break;
      case 'DELIVERED':
        if (option == 'BACK') {
          this.goToService(idBill, 'COOKED', 'preparado');
        }
        break;
    }
  }
}
