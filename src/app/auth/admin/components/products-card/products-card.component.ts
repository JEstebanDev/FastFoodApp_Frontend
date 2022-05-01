import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styles: [],
})
export class ProductsCardComponent implements OnInit {
  @Input() product!: Product;

  @Output() detailProduct = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  detailsProduct() {
    this.detailProduct.emit(this.product);
  }
}
