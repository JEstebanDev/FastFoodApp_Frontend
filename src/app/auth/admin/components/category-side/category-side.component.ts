import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category.interface';
import { CategoryComponent } from '../../pages/category/category.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-side',
  templateUrl: './category-side.component.html',
  styles: [],
})
export class CategorySideComponent implements OnInit, OnChanges {
  @Input() editCategory!: Category | null;
  isClean = true;

  category: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    status: ['ACTIVE', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private categoryPage: CategoryComponent
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['editCategory'].currentValue);
    if (changes['editCategory'].currentValue != null) {
      this.isClean = false;
      this.category.patchValue(this.editCategory!);
    }
  }

  ngOnInit(): void {}

  clean() {
    this.isClean = true;
    this.editCategory = null;
    this.category.reset({ status: 'ACTIVE' });
  }

  createCategory() {
    this.editCategory = this.category.value;
    this.categoryService
      .createCategory(this.editCategory!)
      .subscribe(() => this.categoryPage.ngOnInit());
    this.clean();
  }
  updateCategory() {
    this.categoryService
      .updateCategory(this.category.value, this.editCategory!.idCategory)
      .subscribe(() => this.categoryPage.ngOnInit());
    this.clean();
  }
  deleteCategory() {
    this.categoryService
      .deleteCategory(this.editCategory!.idCategory)
      .subscribe(() => this.categoryPage.ngOnInit());
    this.clean();
  }
}
