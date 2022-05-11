import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';

@Component({
  selector: 'app-product-card-modal',
  templateUrl: './product-card-modal.component.html',
  styles: [],
})
export class ProductCardModalComponent implements OnInit {
  @Input() product!: Product;

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(false);
  }
}
