import { Component, OnInit } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  orderList!: AddCartInterface[];
  value: string = '';
  async ngOnInit(): Promise<void> {
    this.orderService.ngOnInit();
    if (this.orderService.order != null) {
      this.orderList = this.orderService.order;
    }
    var cadenaConcatenada =
      'sk8-438k4-xmxm392-sn2m2490000COPtest_integrity_Zhd1yPz6q9mcvX0ZsEUqHytNaIdFxGIi';
    //Ejemplo
    const encondedText = new TextEncoder().encode(cadenaConcatenada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    this.value = hashHex;
    console.log(this.value);
    console.log(Date.now());
  }

  payment() {}
}
