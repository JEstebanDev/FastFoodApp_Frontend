import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [],
})
export class PaginationComponent implements OnInit {
  @Input() pages!: number[];
  @Output() page = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  button(number: number) {
    this.page.emit(number);
  }
}
