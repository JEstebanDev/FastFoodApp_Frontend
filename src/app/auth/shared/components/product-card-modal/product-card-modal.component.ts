import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Additional } from 'src/app/auth/admin/interfaces/additional.interface';
import { Product } from 'src/app/auth/admin/interfaces/products.interface';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-product-card-modal',
  templateUrl: './product-card-modal.component.html',
  styles: [],
})
export class ProductCardModalComponent implements OnInit {
  @Input() product!: Product;

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() Order: EventEmitter<AddCartInterface> = new EventEmitter();

  listAdditional!: any;
  AdditionalSelected: Additional[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    if (this.product.category.idCategory != null) {
      this.homeService
        .getIngredientes(this.product.category.idCategory)
        .subscribe((Additionals) => {
          this.listAdditional = Additionals.data.additional;
        });
    }
  }

  addAdditional(Additional: Additional) {
    const btn = document.getElementById(Additional.idAdditional.toString());

    if (!this.AdditionalSelected.includes(Additional, 0)) {
      this.AdditionalSelected.push(Additional);
      btn!.style.backgroundColor = '#ffe08a';
    } else {
      this.remove(this.AdditionalSelected, Additional);
      btn!.style.backgroundColor = '#f5f5f5';
    }
  }
  remove(NumberAdditionals: Additional[], removeNumber: Additional) {
    var found = NumberAdditionals.indexOf(removeNumber);

    while (found !== -1) {
      NumberAdditionals.splice(found, 1);
      found = NumberAdditionals.indexOf(removeNumber);
    }
  }

  addtoCar(product: Product) {
    this.Order.emit({
      product: product,
      additional: this.AdditionalSelected,
    });
    this.close.emit(false);
  }

  closeModal() {
    this.close.emit(false);
  }
}
