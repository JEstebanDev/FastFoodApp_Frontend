import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorEmailService } from 'src/app/auth/shared/services/validator-email.service';
import Swal from 'sweetalert2';
import { ListUser, UserEmployee } from '../../interfaces/user.interface';
import { UserComponent } from '../../pages/user/user.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-side-employee',
  templateUrl: './user-side-employee.component.html',
  styles: [],
})
export class UserSideEmployeeComponent implements OnInit, OnChanges {
  @Input() editUser!: ListUser;
  @Output() showDetails = new EventEmitter<boolean>();
  oneMegaByte: number = 1048576;
  isClean = true;
  idUser!: number | null;
  alterableUser: UserEmployee = {
    phone: 0,
    email: '',
  };

  user: FormGroup = this.formBuilder.group({
    phone: ['', [Validators.pattern('^[0-9]{10}$')]],
    email: [
      ,
      [
        Validators.required,
        Validators.pattern(this.validatorEmail.emailPattern),
      ],
      [this.validatorEmail],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userPage: UserComponent,
    private validatorEmail: ValidatorEmailService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'].currentValue != null) {
      this.isClean = false;
      this.idUser = this.editUser.idUser!;
      this.user.get('email')?.setAsyncValidators(null);
      this.user.patchValue(this.editUser!);
    }
  }
  timeout: any = null;
  isLoadingEmail: boolean = false;
  onKeySearchEmail(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        if (this.editUser != null) {
          if (event.target.value !== this.editUser.email) {
            this.isLoadingEmail = true;
            this.user.get('email')?.setErrors({
              whileValidate: true,
            });
            this.validatorEmail
              .validateEmail(event.target.value)
              .subscribe((resp) => {
                this.user.get('email')?.setErrors(resp);
                this.isLoadingEmail = false;
              });
          }
        }
      }
    }, 500);
  }

  ngOnInit(): void {}

  clean() {
    this.idUser = null;
    this.isClean = true;
    this.showDetails.emit(false);
  }

  emailText: string = 'Este campo es obligatorio';
  phoneText = '';
  validate(variable: string) {
    if (this.user.controls['phone'].errors != null) {
      if (this.user.controls['phone'].errors!['pattern'] != null) {
        this.phoneText = 'El formato del número es incorrecto';
      }
    }
    if (this.user.controls['email'].errors != null) {
      if (this.user.controls['email'].errors!['pattern'] != null) {
        this.emailText = 'El formato del email debe ser ejemplo@gmail.com';
      }
      if (this.user.controls['email'].errors!['notAvailable'] != null) {
        this.emailText = 'El email ya esta en uso';
      }
      if (this.user.controls['email'].errors!['required'] != null) {
        this.emailText = 'Este campo es obligatorio';
      }
    }
    return (
      this.user.controls[variable].errors &&
      this.user.controls[variable].touched
    );
  }

  editUsers() {
    this.alterableUser = this.user.value;
    Swal.fire({
      title: '¿Estás seguro que deseas editar este usuario?',
      text: 'Puedes volver a editar despues',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .editUsersEmployee(this.alterableUser, this.editUser.idUser!)
          .subscribe(() => {
            this.userPage.ngOnInit();
            this.clean();
          });
        Swal.fire(
          '¡Perfecto!',
          'El usuario fue editado exitosamente',
          'success'
        );
      }
    });
  }
}
