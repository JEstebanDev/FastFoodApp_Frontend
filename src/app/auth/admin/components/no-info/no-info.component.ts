import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-info',
  templateUrl: './no-info.component.html',
  styles: [],
})
export class NoInfoComponent implements OnInit {
  @Input() mensaje!: string;
  constructor() {}

  ngOnInit(): void {}
}
