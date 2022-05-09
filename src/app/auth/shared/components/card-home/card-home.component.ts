import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styles: [],
})
export class CardHomeComponent implements OnInit {
  @Input() product!: Product;
  @Output() detailProduct = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  detailsProduct() {
    this.detailProduct.emit(this.product);
  }
}
