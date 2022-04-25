import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from '../../interfaces/login.interfaces';
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
    this.signUpForm.valueChanges.subscribe((resp) => {
      console.log(this.signUpForm.value);
    });
  }

  createAccount() {
    this.createUser.name = this.signUpForm.value['name'];
    this.createUser.username = this.signUpForm.value['username'];
    this.createUser.phone = this.signUpForm.value['phone'];
    this.createUser.email = this.signUpForm.value['email'];
    this.createUser.password = this.signUpForm.value['password'];
    console.log(this.createUser);
    this.signUpService.saveUser(this.createUser).subscribe((resp) => {
      console.log(resp);
    });
    //TODO: Redirect to the client area
  }
}
