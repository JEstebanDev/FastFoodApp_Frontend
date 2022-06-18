import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface, Product } from '../../interfaces/products.interface';
import { Suggestion } from '../../interfaces/suggestion.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  nameCategory: string = '';
  categories!: ProductInterface;
  products!: ProductInterface;
  editProduct!: Product;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.productService
        .getProductByName(params.name)
        .subscribe((showProduct) => {
          this.router.navigate([], {
            queryParams: { name: null },
          });
          if (showProduct.data != null) {
            if (showProduct.data.products!.length <= 1) {
              this.editProduct = showProduct.data.products![0];
            }
          }
        });
    });

    this.productService
      .getCategories()
      .subscribe((listCategories) => (this.categories = listCategories));
    this.filterByCategory('Pizza');
  }
  listProduct: Suggestion[] = [];
  search(nameProducto: string) {
    this.productService.getProductByName(nameProducto).subscribe((result) => {
      this.listProduct = [];
      if (result.data != null) {
        result.data.products!.forEach((element) => {
          this.listProduct.push({
            imageUrl: element.imageUrl,
            name: element.name,
            price: element.price,
          });
        });
      }
    });
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
