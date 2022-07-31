import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';
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
  @Output() showDetails = new EventEmitter<boolean>();
  title: string = 'Nuevo producto';
  categories!: ProductInterface;
  isClean = true;
  deleteImage = false;
  validateUser: boolean = false;
  idProduct!: number | null;
  editImage!: string | null;
  imageFile!: File | null;
  oneMegaByte: number = 1048576;
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
    duration: [, Validators.max(90)],
    highlight: [, Validators.max(10)],
    discountPoint: [, Validators.max(10000)],
    status: ['ACTIVE', [Validators.required]],
    imageUrl: [],
    category: [[0], [Validators.required, this.validateCategory]],
  });

  validate(variable: string) {
    return (
      this.product.controls[variable].errors &&
      this.product.controls[variable].touched
    );
  }

  validateCategory(argument: FormControl) {
    const category = argument.value;
    if (category != 0) {
      return null;
    }
    return {
      noCategoryValid: true,
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private productPage: ProductsComponent,
    private validateAdminEmployeeGuard: ValidateAdminEmployeeGuard
  ) {}

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (event: any) => {
      this.editImage = event.target.result;
    };
    fr.readAsDataURL(this.imageFile!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editProduct'].currentValue != null) {
      this.title = 'Editar producto';
      this.isClean = false;
      this.idProduct = this.editProduct!.idProduct;
      this.editImage = this.editProduct!.imageUrl;
      this.product.patchValue(this.editProduct!);
      this.product.patchValue({
        category: this.editProduct!.category.idCategory,
      });
    }
  }

  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();
    this.productService
      .getCategories()
      .subscribe((listCategories) => (this.categories = listCategories));
  }
  removeImage() {
    this.deleteImage = true;
    this.imageFile = null;
    this.editImage = null;
  }

  clean() {
    this.title = 'Nuevo producto';
    this.isClean = true;
    this.imageFile = null;
    this.editImage = null;
    this.idProduct = null;
    this.showDetails.emit(false);
    this.product.reset({ status: 'ACTIVE', category: [0] });
  }

  createProduct() {
    if (this.imageFile == null) {
      this.productService
        .createProduct(this.setAlterProduct(), null)
        .subscribe(() => {
          this.productPage.filterByCategory(null);
        });
      this.clean();
    }

    if (this.imageFile?.size! < this.oneMegaByte) {
      this.productService
        .createProduct(this.setAlterProduct(), this.imageFile)
        .subscribe(() => {
          this.productPage.filterByCategory(null);
        });
      this.clean();
    }
    if (this.imageFile?.size! > this.oneMegaByte) {
      Swal.fire('Error', 'La imagen es muy pesada', 'error');
      this.imageFile = null;
      this.editImage = null;
    }
  }

  updateProducts() {
    if (this.imageFile == null) {
      this.productService
        .updateProduct(
          this.editProduct!.idProduct,
          this.setAlterProduct(),
          null
        )
        .subscribe(() => {
          this.productPage.filterByCategory(null);
        });
      this.clean();
    }

    if (this.imageFile?.size! < this.oneMegaByte) {
      this.productService
        .updateProduct(
          this.editProduct!.idProduct,
          this.setAlterProduct(),
          this.imageFile
        )
        .subscribe(() => {
          this.productPage.filterByCategory(null);
        });
      this.clean();
    }
    if (this.imageFile?.size! > this.oneMegaByte) {
      Swal.fire('Error', 'La imagen es muy pesada', 'error');
      this.imageFile = null;
      this.editImage = null;
    }
  }

  deleteProduct() {
    Swal.fire({
      title: '¿Estas seguro que desea borrar este producto?',
      text: 'No podras revertir este proceso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .deleteProduct(this.editProduct!.idProduct)
          .subscribe((resp) => {
            if (resp.statusCode == 400) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto esta asociado a una factura, puedes desactivarlo, pero no borrarlo',
              });
            } else {
              this.clean();
              Swal.fire(
                '¡Eliminado!',
                `El producto ${this.editProduct!.name} se elimino exitosamente`,
                'success'
              );
              this.productPage.filterByCategory(null);
            }
          });
      }
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
    if (this.deleteImage) {
      this.alterableProduct.imageUrl = null;
    } else {
      this.alterableProduct.imageUrl = this.product.value['imageUrl'];
    }
    return this.alterableProduct;
  }
}
