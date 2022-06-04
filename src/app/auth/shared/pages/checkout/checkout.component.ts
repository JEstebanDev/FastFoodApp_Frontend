import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { CreateBillParams } from '../../interfaces/createBillParams.interface';
import { UserInfo } from '../../interfaces/tokenUser.interface';
import { CheckoutService } from '../../services/checkout.service';
import { LoginService } from '../../services/login.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit {
  publicKey: string = 'pub_test_fMVf5VaXmlO3IEkeL0Il4ZdzAdZY1mgW';
  constructor(
    private orderService: OrderService,
    private checkoutService: CheckoutService,
    private loginService: LoginService,
    private route: Router
  ) {}
  reference: string = '';
  totalOrder = 0;
  isOrder = false;
  user!: UserInfo | null;

  idBill!: number;
  newBill!: CreateBillParams;
  newOrder!: AddCartInterface[];

  async ngOnInit(): Promise<void> {
    this.orderService.ngOnInit();
    let order = this.orderService.getOrder();
    if (order.length > 0) {
      this.isOrder = false;
    } else {
      this.isOrder = true;
    }
    order.map((element) => {
      let additionalTotal: number = 0;
      if (element.additional != null) {
        element.additional!.forEach((additional) => {
          additionalTotal += additional.price;
        });
      }
      this.totalOrder +=
        (element.product.price + additionalTotal) * element.amount;
    });
    this.totalOrder = this.totalOrder * 100;
    this.reference = (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');

    if (localStorage.getItem('token') != null) {
      this.loginService.getUser().subscribe((resp) => {
        if (resp != null) {
          this.user = resp.data?.user.user!;
        }
      });
    } else {
      this.user = null;
    }
    this.newOrder = JSON.parse(localStorage.getItem('order')!);
  }

  payment(method: number) {
    let reference: string | null;
    if (method == 3) {
      reference = this.reference;
    } else {
      reference = null;
    }

    this.newBill = {
      date: new Date(),
      noTable: JSON.parse(localStorage.getItem('table')!),
      payMode: { idPayMode: method },
      user: {
        idUser: this.user?.idUser!,
      },
      idTransaction: reference!,
    };

    this.checkoutService.createBill(this.newBill)!.subscribe((bill) => {
      this.newOrder.map((element) => {
        if (element.bill.idBill == 0) {
          element.bill.idBill = bill.data?.bill.idBill!;
        }
      });

      if (bill.status == 'OK') {
        this.checkoutService
          .setTokenBill(bill.data?.bill.idBill!)
          .subscribe((token) => {
            localStorage.setItem('bill', token.data?.unattributed.toString()!);
            this.checkoutService.createOrder(this.newOrder);
            this.orderService.deleteOrder();
          });
      }
    });
  }
}
