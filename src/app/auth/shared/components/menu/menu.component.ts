import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/auth/admin/interfaces/products.interface';
import { ProductsService } from 'src/app/auth/admin/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  categories!: ProductInterface;

  constructor(private productService: ProductsService) {}
  nameCategory: string = '';
  products!: ProductInterface;
  ngOnInit(): void {
    this.productService.getCategories().subscribe((listCategories) => {
      this.categories = listCategories;
    });
    this.filterByCategory('Pizza');
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
