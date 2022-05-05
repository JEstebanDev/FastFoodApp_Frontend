import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [],
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  listCategories!: Category[];
  editCategory!: Category;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((listCategories) => {
      this.listCategories = listCategories.data.category;
    });
  }

  showDetailCategory(category: Category) {
    this.editCategory = category;
  }
}
