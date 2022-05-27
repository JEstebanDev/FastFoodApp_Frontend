import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit {
  publicKey: string = 'pub_test_fMVf5VaXmlO3IEkeL0Il4ZdzAdZY1mgW';
  private integrity: string = 'test_integrity_Zhd1yPz6q9mcvX0ZsEUqHytNaIdFxGIi';
  constructor(private orderService: OrderService) {}
  reference: string = '';
  totalOrder = 0;
  isOrder = false;
  async ngOnInit(): Promise<void> {
    this.orderService.ngOnInit();
    if (this.orderService.getOrder() != null) {
      this.isOrder = false;
    } else {
      this.isOrder = true;
    }

    this.orderService.getOrder().map((element) => {
      let additionalTotal: number = 0;
      if (element.additional != null) {
        element.additional!.forEach((additional) => {
          additionalTotal += additional.price;
        });
      }
      this.totalOrder +=
        (element.product.price + additionalTotal) * element.quantity;
    });
    this.totalOrder = this.totalOrder * 100;
    var cadenaConcatenada = `burger-app-2022-${Date.now()}-${
      this.totalOrder
    }COP${this.integrity}`;

    const encondedText = new TextEncoder().encode(cadenaConcatenada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    this.reference = hashHex;
  }
}
