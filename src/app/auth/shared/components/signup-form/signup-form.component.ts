import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styles: [],
})
export class SignupFormComponent implements OnInit {
  @Input() signUpForm!: FormGroup;

  esValido(variable: string) {
    console.log();
    return (
      this.signUpForm.controls[variable].errors &&
      this.signUpForm.controls[variable].touched
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
