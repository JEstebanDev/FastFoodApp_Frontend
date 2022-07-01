import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styles: [],
})
export class SignupFormComponent implements OnInit {
  @Input() signUpForm!: FormGroup;
  phoneText = 'Este campo es obligatorio';
  emailText = 'Este campo es obligatorio';
  usernameText = 'Este campo es obligatorio';
  password = 'Este campo es obligatorio';
  validate(variable: string) {
    if (this.signUpForm.controls['username'].errors != null) {
      if (
        this.signUpForm.controls['username'].errors!['notAvailable'] != null
      ) {
        this.usernameText = 'El username ya esta en uso';
      }
      if (this.signUpForm.controls['username'].errors!['required'] != null) {
        this.usernameText = 'Este campo es obligatorio';
      }
    }
    if (this.signUpForm.errors != null) {
      if (this.signUpForm.errors['noIguales'] != null) {
        this.password = 'Las contraseñas deben ser iguales';
      }
    }
    if (this.signUpForm.controls['confirmPassword'].errors != null) {
    }
    if (this.signUpForm.controls['phone'].errors != null) {
      if (this.signUpForm.controls['phone'].errors!['pattern'] != null) {
        this.phoneText = 'El formato del número es incorrecto';
      }
      if (this.signUpForm.controls['phone'].errors!['required'] != null) {
        this.phoneText = 'Este campo es obligatorio';
      }
    }
    if (this.signUpForm.controls['email'].errors != null) {
      if (this.signUpForm.controls['email'].errors!['pattern'] != null) {
        this.emailText = 'El formato del email debe ser ejemplo@gmail.com';
      }
      if (this.signUpForm.controls['email'].errors!['required'] != null) {
        this.emailText = 'Este campo es obligatorio';
      }
    }
    return (
      this.signUpForm.controls[variable].errors &&
      this.signUpForm.controls[variable].touched
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
