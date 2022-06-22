import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignUpRequest } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';
import { SignUpService } from '../../services/sign-up.service';
import { ValidatorEmailService } from '../../services/validator-email.service';
import { ValidatorUsernameService } from '../../services/validator-username.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private loginService: LoginService,
    private validatorEmail: ValidatorEmailService,
    private validatorUsername: ValidatorUsernameService
  ) {}
  createUser: SignUpRequest = {
    username: '',
    name: '',
    phone: 0,
    email: '',
    password: '',
  };

  isUsernameValid = false;
  isEmailValid = false;

  signUpForm: FormGroup = this.formBuilder.group(
    {
      username: ['Juanes', Validators.required, [this.validatorUsername]],
      name: ['Juanes', Validators.required],
      phone: ['1234567890'],
      email: [
        'asdas2@asd.com',
        [
          Validators.required,
          Validators.pattern(this.validatorEmail.emailPattern),
        ],
        [this.validatorEmail],
      ],
      password: ['123456', [Validators.required]],
      confirmPassword: ['123456', [Validators.required]],
    },
    {
      validators: [
        this.validatorEmail.camposIguales('password', 'confirmPassword'),
      ],
    }
  );

  ngOnInit(): void {}

  createAccount() {
    this.createUser.name = this.signUpForm.value['name'];
    this.createUser.username = this.signUpForm.value['username'];
    this.createUser.phone = this.signUpForm.value['phone'];
    this.createUser.email = this.signUpForm.value['email'];
    this.createUser.password = this.signUpForm.value['password'];
    console.log(this.createUser);
    this.signUpService.saveUser(this.createUser).subscribe((response) => {
      if (response.statusCode == 200) {
        Swal.fire('Perfecto', 'El usuario se creo exitosamente', 'success');
        this.loginService
          .getLogin({
            username: this.createUser.username,
            password: this.createUser.password,
          })
          .subscribe((resp) => {
            localStorage.setItem('token', resp.data?.tokens.access_token!);
            window.location.reload();
          });
      } else {
        Swal.fire('Error', 'El usuario no se pudo crear', 'error');
      }
    });
    //TODO: Redirect to the client area
  }
}
