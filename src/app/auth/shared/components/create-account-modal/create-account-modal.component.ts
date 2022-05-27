import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginRequest, SignUpRequest } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';
import { SignUpService } from '../../services/sign-up.service';
import { ValidatorEmailService } from '../../services/validator-email.service';
import { ValidatorUsernameService } from '../../services/validator-username.service';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: [],
})
export class CreateAccountModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private signUpService: SignUpService,
    private validatorEmail: ValidatorEmailService,
    private validatorUsername: ValidatorUsernameService
  ) {}
  hideElements: boolean = false;
  isValidLogin: boolean = false;
  hideCreate: boolean = false;
  hideLogin: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  user: LoginRequest = {
    username: '',
    password: '',
  };

  loginForm: FormGroup = this.formBuilder.group({
    username: [, Validators.required],
    password: [, [Validators.required, Validators.minLength(6)]],
  });

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
      phone: ['1234567890', Validators.minLength(10)],
      email: [
        'asdas@asd.com',
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

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {});
  }

  closeModal() {
    this.close.emit(false);
  }
  changeComponent() {
    this.hideCreate = false;
    this.hideLogin = true;
  }

  createAccount() {
    this.createUser.name = this.signUpForm.value['name'];
    this.createUser.username = this.signUpForm.value['username'];
    this.createUser.phone = this.signUpForm.value['phone'];
    this.createUser.email = this.signUpForm.value['email'];
    this.createUser.password = this.signUpForm.value['password'];
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
    this.closeModal();
    this.router.navigate(['/checkout']);
  }

  login() {
    this.user = this.loginForm.value;
    this.loginService.getLogin(this.user).subscribe((data) => {
      if (data.data?.tokens.access_token != null) {
        this.isValidLogin = true;
        localStorage.setItem('token', data.data.tokens.refresh_token!);
        this.closeModal();
        this.router.navigate(['/checkout']);
        window.location.reload();
      } else {
        Swal.fire('Error', 'El usuario no es valido', 'error');
      }
    });
  }
}
