import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product-card-buy',
  templateUrl: './product-card-buy.component.html',
  styles: [],
})
export class ProductCardBuyComponent {
  @Input() product!: Product;
  isModalVisible = false;
  constructor(private orderService: OrderService) {}

  addtoCar() {
    this.orderService.listOrders({ product: this.product });
  }
  orderInfo(order: AddCartInterface) {
    this.orderService.listOrders(order);
  }
  detailsProduct() {
    this.isModalVisible = true;
  }
}
