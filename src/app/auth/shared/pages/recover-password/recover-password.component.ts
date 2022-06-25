import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecoverRequest } from '../../interfaces/login.interfaces';
import { LoginService } from '../../services/login.service';
import { ValidatorEmailService } from '../../services/validator-email.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styles: [],
})
export class RecoverPasswordComponent implements OnInit {
  data: RecoverRequest = {
    newPassword: '',
    repeatNewPassword: '',
  };

  recoverForm: FormGroup = this.formBuilder.group(
    {
      newPassword: ['123456', [Validators.required, Validators.minLength(6)]],
      repeatNewPassword: [
        '123456',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    {
      validators: [
        this.validatorEmail.camposIguales('password', 'confirmPassword'),
      ],
    }
  );
  constructor(
    private formBuilder: FormBuilder,
    private validatorEmail: ValidatorEmailService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {}

  recoverPassword() {
    this.data = this.recoverForm.value;
    this.loginService
      .resetPassword(
        this.activatedRoute.snapshot.paramMap.get('token')!.toString(),
        this.data
      )
      .subscribe((response) => {
        if (response != null) {
          this.route.navigateByUrl('/login');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña modificada',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El tiempo se agoto, genera de nuevo la petición para cambiar tu contraseña',
          });
        }
      });
  }
}
