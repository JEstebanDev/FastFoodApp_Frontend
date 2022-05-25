import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  id: string | undefined;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id'] != null) {
        localStorage.setItem('table', params['id']);
      }
    });
  }
}
