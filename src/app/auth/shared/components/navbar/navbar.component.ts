import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../interfaces/tokenUser.interface';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  isLogged: boolean = false;
  userData!: UserInfo;
  ngOnInit(): void {
    if (this.loginService.isValidToken()) {
      if (localStorage.getItem('token') != null) {
        this.loginService.getUser().subscribe((element) => {
          if (element.data != null) {
            this.userData = element.data.user.user;
            this.isLogged = true;
          }
        });
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
