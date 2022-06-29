import { Component, Input } from '@angular/core';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';
import Swal from 'sweetalert2';
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
    this.orderService.listOrders({
      bill: { idBill: 0 },
      amount: 1,
      product: this.product,
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1000,
      toast: true,
      width: 300,
    });
  }
  orderInfo(order: AddCartInterface) {
    this.orderService.listOrders(order);
  }
  detailsProduct() {
    this.isModalVisible = true;
  }
}
