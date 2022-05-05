import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: [],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;

  @Output() detailCategory = new EventEmitter<Category>();
  constructor() {}

  ngOnInit(): void {}

  detailsCategory() {
    this.detailCategory.emit(this.category);
  }
}
