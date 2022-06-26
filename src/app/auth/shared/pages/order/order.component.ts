import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { LoginService } from '../../services/login.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private route: Router,
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef
  ) {}

  isModalVisible: boolean = false;
  orderList: AddCartInterface[] = [];
  value: string = '';
  totalOrder: number = 0;
  async ngOnInit(): Promise<void> {
    this.orderService.ngOnInit();
    if (this.orderService.getOrder() != null) {
      this.orderList = this.orderService.getOrder();
    }
  }

  payment() {
    Swal.fire({
      title: '¿Estas seguro de tu pedido?',
      text: 'Revisa si tu pedido esta completo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡todo listo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.isValidToken().subscribe((statusCode) => {
          if (statusCode) {
            this.route.navigateByUrl('/checkout');
          } else {
            this.isModalVisible = true;
          }
        });
      }
    });
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
        (element.product.price + additionalTotal) * element.amount;
    });
    this.cdRef.detectChanges();
  }
}
