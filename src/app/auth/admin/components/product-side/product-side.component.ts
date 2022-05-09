import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductInterface } from '../../interfaces/products.interface';
import { ProductsComponent } from '../../pages/products/products.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-side',
  templateUrl: './product-side.component.html',
  styles: [],
})
export class ProductSideComponent implements OnInit, OnChanges {
  @Input() editProduct!: Product | null;
  categories!: ProductInterface;
  isClean = true;

  formatCategory = {
    idCategory: 0,
  };
  alterableProduct: Product = {
    idProduct: 0,
    name: '',
    calories: 0,
    description: '',
    price: 0,
    duration: '',
    highlight: 0,
    discountPoint: 0,
    status: '',
    category: this.formatCategory,
    imageUrl: null,
  };

  product: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    calories: [],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    duration: [],
    highlight: [],
    discountPoint: [],
    status: ['ACTIVE', [Validators.required]],
    imageUrl: [],
    category: [[0], [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private productPage: ProductsComponent
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editProduct'].currentValue != null) {
      this.isClean = false;
      this.product.patchValue(this.editProduct!);
      this.product.patchValue({
        category: this.editProduct!.category.idCategory,
      });
    }
  }

  ngOnInit(): void {
    this.productService
      .getCategories()
      .subscribe((listCategories) => (this.categories = listCategories));
  }
  clean() {
    this.isClean = true;
    this.product.reset({ status: 'ACTIVE', category: [0] });
  }

  createProduct() {
    this.productService
      .createProduct(this.setAlterProduct())
      .subscribe((resp) => {
        this.productPage.filterByCategory(null);
      });
  }

  editProducts() {
    this.productService
      .updateProduct(this.editProduct!.idProduct, this.setAlterProduct())
      .subscribe(() => {
        this.productPage.filterByCategory(null);
      });
  }
  deleteProduct() {
    this.productService
      .deleteProduct(this.editProduct!.idProduct)
      .subscribe(() => {
        this.productPage.filterByCategory(null);
      });
  }

  setAlterProduct() {
    this.alterableProduct.name = this.product.value['name'];
    this.alterableProduct.calories = this.product.value['calories'];
    this.alterableProduct.description = this.product.value['description'];
    this.alterableProduct.price = this.product.value['price'];
    this.alterableProduct.duration = this.product.value['duration'];
    this.alterableProduct.highlight = this.product.value['highlight'];
    this.alterableProduct.discountPoint = this.product.value['discountPoint'];
    this.alterableProduct.status = this.product.value['status'];
    this.alterableProduct.category.idCategory = this.product.value['category'];
    this.alterableProduct.imageUrl = this.product.value['imageUrl'];
    return this.alterableProduct;
  }
}
