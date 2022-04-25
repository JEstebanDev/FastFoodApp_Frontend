import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginFormComponent implements OnInit {
  @Input() loginForm!: FormGroup;

  esValido(variable: string) {
    return (
      this.loginForm.controls[variable].errors &&
      this.loginForm.controls[variable].touched
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
