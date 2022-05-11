import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  Additional,
  CategoriesValue,
} from '../../interfaces/additional.interface';
import { AdditionalComponent } from '../../pages/additional/additional.component';
import { AdditionalService } from '../../services/additional.service';

@Component({
  selector: 'app-additional-side',
  templateUrl: './additional-side.component.html',
  styles: [],
})
export class AdditionalSideComponent implements OnInit, OnChanges {
  @Input() editAdditional!: Additional;
  isClean: boolean = true;
  //this CategoriesValues is a craft Interface for the status of the checkbox
  //and have a lot of uses in the class is for the edit and create news categories
  editCategories: CategoriesValue[] = [];

  alterableAdditional: Additional = {
    idAdditional: 0,
    name: '',
    imageUrl: null,
    price: 0,
    category: [],
    status: '',
  };

  additional: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    imageUrl: [],
    price: ['', [Validators.required]],
    status: ['ACTIVE', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private additionalService: AdditionalService,
    private additionalPage: AdditionalComponent
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.editCategories.forEach((element) => {
      element.check = false;
    });
    if (changes['editAdditional'].currentValue != null) {
      this.isClean = false;

      this.editAdditional.category.forEach((category) => {
        this.editCategories.forEach((element) => {
          if (element.idCategory == category.idCategory) {
            element.check = true;
          }
        });
      });
      this.additional.patchValue(this.editAdditional!);
    }
  }

  ngOnInit(): void {
    this.additionalService.getCategories().subscribe((listCategory) => {
      listCategory.data.category!.forEach((category) => {
        this.editCategories.push({
          check: false,
          idCategory: category!.idCategory,
          name: category!.name,
        });
      });
    });
  }

  onChecked(idCategory: number, isChecked: any) {
    if (isChecked.target.checked) {
      this.editCategories.forEach((element) => {
        if (element.idCategory === idCategory) {
          element.check = true;
        }
      });
    }
    if (!isChecked.target.checked) {
      this.editCategories.forEach((element) => {
        if (element.idCategory === idCategory) {
          element.check = false;
        }
      });
    }
  }

  clean() {
    this.editCategories.forEach((element) => {
      element.check = false;
    });
    this.isClean = true;
    this.additional.reset({ status: 'ACTIVE' });
    this.alterableAdditional = {
      idAdditional: 0,
      name: '',
      imageUrl: null,
      price: 0,
      category: [],
      status: '',
    };
  }

  validCategory() {
    let valido: number = 0;
    this.editCategories.forEach((element) => {
      if (element.check == false) {
        valido += 1;
      }
    });
    if (this.editCategories.length == valido) {
      Swal.fire('Error', 'El adicional debe tener una categoria', 'error');
      return false;
    }
    return true;
  }

  createAdditional() {
    if (this.validCategory()) {
      this.additionalService
        .createAdditional(this.alterData())
        .subscribe((resp) => {
          this.additionalPage.ngOnInit();
        });
      this.clean();
    }
  }

  editAdditionals() {
    if (this.validCategory()) {
      this.additionalService
        .editAdditional(this.alterData(), this.editAdditional.idAdditional)
        .subscribe((resp) => {
          this.additionalPage.ngOnInit();
        });
      this.clean();
    }
  }

  deleteAdditional() {
    this.additionalService
      .deleteAdditional(this.editAdditional.idAdditional)
      .subscribe((resp) => {
        this.additionalPage.ngOnInit();
      });
    this.clean();
  }

  alterData() {
    this.alterableAdditional.name = this.additional.value['name'];
    this.alterableAdditional.imageUrl = this.additional.value['imageUrl'];
    this.alterableAdditional.price = this.additional.value['price'];
    this.alterableAdditional.status = this.additional.value['status'];
    //Set empty the category because the user could add and remove manytimes so could duplicate data
    this.alterableAdditional.category = [];
    this.editCategories.forEach((addCategories) => {
      if (addCategories.check) {
        this.alterableAdditional.category.push({
          idCategory: addCategories.idCategory,
        });
      }
    });
    return this.alterableAdditional;
  }
}
