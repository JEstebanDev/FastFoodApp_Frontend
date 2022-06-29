import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-tablet',
  templateUrl: './side-bar-tablet.component.html',
  styles: [],
})
export class SideBarTabletComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
