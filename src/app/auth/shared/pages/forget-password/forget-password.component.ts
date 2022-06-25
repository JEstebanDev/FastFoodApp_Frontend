import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { ValidatorEmailService } from '../../services/validator-email.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styles: [],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorEmail.emailPattern),
      ],
    ],
  });
  constructor(
    private formBuilder: FormBuilder,
    private validatorEmail: ValidatorEmailService,
    private loginService: LoginService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  emailText: string = '';
  validate(variable: string) {
    if (this.forgetForm.controls['email'].errors != null) {
      if (this.forgetForm.controls['email'].errors!['pattern'] != null) {
        this.emailText = 'El formato del email debe ser ejemplo@gmail.com';
      }
      if (this.forgetForm.controls['email'].errors!['notAvailable'] != null) {
        this.emailText = 'El email ya esta en uso';
      }
      if (this.forgetForm.controls['email'].errors!['required'] != null) {
        this.emailText = 'Este campo es obligatorio';
      }
    }
    return (
      this.forgetForm.controls[variable].errors &&
      this.forgetForm.controls[variable].touched
    );
  }
  sendMail() {
    this.loginService
      .sendMailRecoverPassword(this.forgetForm.value['email'])
      .subscribe((resp) => {
        if (resp.statusCode !== 400) {
          Swal.fire({
            title: '¡Perfecto!',
            icon: 'success',
            text: 'Se te acaba de enviar un correo para que puedas modificar tu contraseña',
          });
          this.route.navigateByUrl('/home');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo no se encuentra registrado',
          });
          this.forgetForm.get('email')?.setValue('');
        }
      });
  }
}
