import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';

@Component({
  selector: 'app-product-card-buy',
  templateUrl: './product-card-buy.component.html',
  styles: [],
})
export class ProductCardBuyComponent implements OnInit {
  @Input() product!: Product;

  @Output() detailProduct = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  detailsProduct() {
    this.detailProduct.emit(this.product);
  }
}