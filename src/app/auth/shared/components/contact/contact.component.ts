import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorEmailService } from '../../services/validator-email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private validatorEmail: ValidatorEmailService
  ) {}

  ngOnInit(): void {}

  contact: FormGroup = this.formBuilder.group({
    name: [, Validators.required],
    subject: [, Validators.required],
    phone: [, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: [
      ,
      [
        Validators.required,
        Validators.pattern(this.validatorEmail.emailPattern),
      ],
    ],
    message: [, Validators.required],
  });

  emailText = 'Este campo es obligatorio';
  phoneText = 'Este campo es obligatorio';
  validate(variable: string) {
    if (this.contact.controls['phone'].errors != null) {
      if (this.contact.controls['phone'].errors!['pattern'] != null) {
        this.phoneText = 'El formato del número es incorrecto';
      }
      if (this.contact.controls['phone'].errors!['required'] != null) {
        this.phoneText = 'Este campo es obligatorio';
      }
    }
    if (this.contact.controls['email'].errors != null) {
      if (this.contact.controls['email'].errors!['pattern'] != null) {
        this.emailText = 'El formato del email debe ser ejemplo@gmail.com';
      }
      if (this.contact.controls['email'].errors!['required'] != null) {
        this.emailText = 'Este campo es obligatorio';
      }
    }
    return (
      this.contact.controls[variable].errors &&
      this.contact.controls[variable].touched
    );
  }
}
