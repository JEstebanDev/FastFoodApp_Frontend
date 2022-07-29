import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styles: [],
})
export class NavigationBarComponent implements OnInit {
  constructor() {}
  isActive: string = 'inicio';
  ngOnInit(): void {}
}
