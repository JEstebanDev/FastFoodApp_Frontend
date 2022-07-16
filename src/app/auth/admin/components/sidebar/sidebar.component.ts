import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  showProducts: boolean = false;
  constructor(
    private router: Router,
    private validateAdminEmployeeGuard: ValidateAdminEmployeeGuard
  ) {}
  validateUser: boolean = false;
  isActive: string = '';
  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();
  }

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
