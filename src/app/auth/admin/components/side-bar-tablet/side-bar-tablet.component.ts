import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';

@Component({
  selector: 'app-side-bar-tablet',
  templateUrl: './side-bar-tablet.component.html',
  styles: [],
})
export class SideBarTabletComponent implements OnInit {
  constructor(
    private router: Router,
    private validateAdminEmployeeGuard: ValidateAdminEmployeeGuard
  ) {}
  validateUser: boolean = false;
  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
