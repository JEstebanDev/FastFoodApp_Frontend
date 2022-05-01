import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Additional } from '../../interfaces/additional.interface';
import { ProductInterface } from '../../interfaces/products.interface';
import { AdditionalService } from '../../services/additional.service';

@Component({
  selector: 'app-additional-side',
  templateUrl: './additional-side.component.html',
  styles: [],
})
export class AdditionalSideComponent implements OnInit {
  @Input() editAdditional!: Additional | null;
  isClean: boolean = false;
  categories!: ProductInterface;
  additional: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    imageUrl: [],
    price: ['', [Validators.required]],
    category: [[0], Validators.required],
    status: ['ACTIVE', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private additionalService: AdditionalService
  ) {}
  ngOnInit(): void {
    this.additionalService
      .getCategories()
      .subscribe((listCategory) => (this.categories = listCategory));
  }
  clean() {}

  createAdditional() {}

  editAdditionals() {}

  deleteAdditional() {}
}
