import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [],
})
export class PaginationComponent implements OnInit {
  @Input() pages!: number[];
  @Output() page = new EventEmitter<number>();
  number = 0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['page'] > 0) {
        this.number = params['page'] - 1;
      }
    });
  }

  navigateTo(number: number) {
    this.router.navigate([], {
      queryParams: {
        page: number + 1,
      },
      queryParamsHandling: 'merge',
    });

    this.number = number;
    this.page.emit(number);
  }
}
