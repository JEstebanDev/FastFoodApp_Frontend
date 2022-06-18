import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../interfaces/suggestion.interface';

@Component({
  selector: 'app-suggest-input-search',
  templateUrl: './suggest-input-search.component.html',
  styles: [],
})
export class SuggestInputSearchComponent implements OnInit {
  @Input() listData!: Suggestion[];
  @Input() option!: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  closeSuggestion() {
    this.listData = [];
  }
  showSuggestion(value: string) {
    this.listData = [];
    this.router.navigate([`/admin/${this.option}`], {
      queryParams: { name: value },
    });
  }
}
