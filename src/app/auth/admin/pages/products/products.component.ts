import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';
import {
  ProductInterface,
  Product,
  Category,
} from '../../interfaces/products.interface';
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
    private router: Router,
    private scroller: ViewportScroller,
    private validateAdminEmployeeGuard: ValidateAdminEmployeeGuard
  ) {}
  validateUser: boolean = false;
  showDetails = false;
  nameCategory: string = '';
  categories!: Category[];
  products!: Product[];
  editProduct!: Product;

  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.productService
        .getProductByName(params.name)
        .subscribe((showProduct) => {
          this.router.navigate([], {
            queryParams: { name: null },
          });
          if (showProduct.data != null) {
            if (showProduct.data.products!.length >= 1) {
              this.showDetailProduct(showProduct.data.products![0]);
            }
          }
        });
    });
    this.productService.getCategories().subscribe((listCategories) => {
      if (listCategories.data.category!.length > 0) {
        this.categories = listCategories.data.category!;
        if (this.categories.length > 0) {
          this.filterByCategory(this.categories[0].name);
        }
      }
    });
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
    this.showDetails = true;
    this.scroller.scrollToAnchor('editProduct');
  }

  filterByCategory(category: string | null) {
    if (category != null) {
      this.nameCategory = category;
    }
    this.productService
      .getProductsByCategoryAdmin(this.nameCategory)
      .subscribe((listProducts) => {
        if (listProducts != null) {
          this.products = listProducts.data.products!;
        }
      });
  }
}
