import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  isValidLogin: boolean = false;

  user: LoginRequest = {
    username: '',
    password: '',
  };

  loginForm: FormGroup = this.formBuilder.group({
    username: ['Velez123', Validators.required],
    password: ['asdasda1', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  login() {
    this.user = this.loginForm.value;

    this.loginService.getLogin(this.user).subscribe((data) => {
      if (data.data?.tokens.access_token != null) {
        this.isValidLogin = true;
        localStorage.setItem('token', data.data.tokens.refresh_token!);
        this.router.navigate(['/admin/home']);
      } else {
        Swal.fire('Error', 'El usuario no es valido', 'error');
      }
    });
  }
}
