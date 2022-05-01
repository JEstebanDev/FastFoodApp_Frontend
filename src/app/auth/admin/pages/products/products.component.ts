import { Component, OnInit } from '@angular/core';
import { ProductInterface, Product } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  nameCategory: string = '';
  categories!: ProductInterface;
  products!: ProductInterface;
  editProduct!: Product;

  ngOnInit(): void {
    this.productService
      .getCategories()
      .subscribe((listCategories) => (this.categories = listCategories));
    this.filterByCategory('Pizza');
  }

  showDetailProduct(product: Product) {
    this.editProduct = product;
  }

  filterByCategory(category: string | null) {
    if (category != null) {
      this.nameCategory = category;
    }
    this.productService
      .getProductsByCategory(this.nameCategory)
      .subscribe((listProducts) => {
        this.products = listProducts;
      });
  }
}
