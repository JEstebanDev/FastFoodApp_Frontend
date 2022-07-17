import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddCartInterface } from '../interfaces/addCart.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnInit {
  constructor(private router: Router) {}
  key: number = 0;
  order: AddCartInterface[] = [];
  totalOrder: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order')!);
    }
  }

  getOrder() {
    localStorage.setItem('order', JSON.stringify(this.order));
    return this.order;
  }

  deleteOrder() {
    this.order = [];
    localStorage.removeItem('order');
  }
  checkOrder() {
    this.ngOnInit();
    let totalAmount = 0;
    this.order.forEach((element) => {
      totalAmount += element.amount;
    });
    return totalAmount;
  }

  listOrders(order: AddCartInterface) {
    if (this.checkOrder() > 7) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes agregar mas de 8 ordenes por pedido',
        confirmButtonColor: '#F25D50',
        confirmButtonText: 'Ver menú',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/order');
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        width: 300,
      });
      this.ngOnInit();
      if (this.order != null) {
        this.order.forEach((element) => {
          if (
            JSON.stringify(element.additional) ==
              JSON.stringify(order.additional) &&
            JSON.stringify(element.bill) == JSON.stringify(order.bill) &&
            JSON.stringify(element.product) == JSON.stringify(order.product)
          ) {
            element.amount += 1;
            this.key = 1;
          }
        });
      }
      if (this.key == 0) {
        this.order.push(order);
      }
      if (this.key == 2) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo puedes hacer 8 ordenes por pedido',
        });
      }
      this.key = 0;
      localStorage.setItem('order', JSON.stringify(this.order));
    }
  }

  addButton(details: AddCartInterface) {
    details.amount += 1;
    return details;
  }
  lessButton(details: AddCartInterface) {
    if (details.amount > 0) {
      details.amount -= 1;
    }
    if (details.amount == 0) {
      let detailProduct = this.order;
      if (detailProduct.includes(details)) {
        this.remove(detailProduct, details);
      }
    }
    return details;
  }

  remove(
    NumberAdditionals: AddCartInterface[],
    removeNumber: AddCartInterface
  ) {
    var found = NumberAdditionals.indexOf(removeNumber);
    while (found !== -1) {
      NumberAdditionals.splice(found, 1);
      found = NumberAdditionals.indexOf(removeNumber);
    }
  }
}
