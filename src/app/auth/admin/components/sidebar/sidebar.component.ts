import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  showProducts: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {}

  mobileNavbar: boolean = false;
  navbar() {
    this.mobileNavbar = !this.mobileNavbar;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  popup = document.querySelector('.popup');

  hidePopup() {
    this.mobileNavbar = false;
  }
}
