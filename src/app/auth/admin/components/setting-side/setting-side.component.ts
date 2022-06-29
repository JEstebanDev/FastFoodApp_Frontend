import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorEmailService } from 'src/app/auth/shared/services/validator-email.service';
import { ValidatorUsernameService } from 'src/app/auth/shared/services/validator-username.service';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-setting-side',
  templateUrl: './setting-side.component.html',
  styles: [],
})
export class SettingSideComponent implements OnInit {
  @Input() editUser!: User;
  oneMegaByte: number = 1048576;
  editImage!: string | null;
  imageFile!: File | null;
  isClean = true;
  title: string = 'Nuevo Usuario';
  idUser!: number | null;
  alterableUser: User = {
    name: '',
    username: '',
    phone: 0,
    urlImage: '',
    email: '',
    password: '',
    userRoles: '',
    status: '',
  };

  user: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    username: ['', Validators.required, [this.validatorUsername]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: [
      ,
      [
        Validators.required,
        Validators.pattern(this.validatorEmail.emailPattern),
      ],
      [this.validatorEmail],
    ],
    password: [, [Validators.required]],
    userRoles: ['ROLE_EMPLOYEE', [Validators.required]],
    status: ['ACTIVE', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private settingPage: SettingsComponent,
    private validatorEmail: ValidatorEmailService,
    private validatorUsername: ValidatorUsernameService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'].currentValue != null) {
      this.isClean = false;
      this.idUser = this.editUser.idUser!;
      this.title = 'Editar Usuario';

      this.user.get('username')?.setAsyncValidators(null);

      this.user.get('email')?.setAsyncValidators(null);

      this.user.get('password')?.clearValidators();
      this.user.get('password')?.updateValueAndValidity();
      this.user.patchValue(this.editUser!);
      this.editImage = this.editUser.urlImage!;
    }
  }
  timeout: any = null;
  isLoadingEmail: boolean = false;
  isLoadingUsername: boolean = false;
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
  onKeySearchUsername(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        if (this.editUser != null) {
          if (event.target.value !== this.editUser.username!) {
            this.isLoadingUsername = true;
            this.user.get('username')?.setErrors({
              whileValidate: true,
            });
            this.validatorUsername
              .validateUsername(event.target.value)
              .subscribe((resp) => {
                this.user.get('username')?.setErrors(resp);
                this.isLoadingUsername = false;
              });
          }
        }
      }
    }, 500);
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (event: any) => {
      this.editImage = event.target.result;
    };
    fr.readAsDataURL(this.imageFile!);
    this.imageFile?.name;
  }

  removeImage() {
    this.imageFile = null;
    this.editImage = null;
  }

  ngOnInit(): void {}

  clean() {
    this.user.controls['password'].addValidators([
      Validators.required,
      Validators.minLength(6),
    ]);
    this.idUser = null;
    this.imageFile = null;
    this.editImage = null;
    this.isClean = true;
    this.user.reset({ status: 'ACTIVE', userRoles: 'ROLE_EMPLOYEE' });
  }

  emailText: string = 'Este campo es obligatorio';
  usernameText: string = 'Este campo es obligatorio';
  phoneText = 'Este campo es obligatorio';
  validate(variable: string) {
    if (this.user.controls['phone'].errors != null) {
      if (this.user.controls['phone'].errors!['pattern'] != null) {
        this.phoneText = 'El formato del número es incorrecto';
      }
    }
    if (this.user.controls['username'].errors != null) {
      if (this.user.controls['username'].errors!['notAvailable'] != null) {
        this.usernameText = 'El username ya esta en uso';
      }
      if (this.user.controls['username'].errors!['required'] != null) {
        this.usernameText = 'Este campo es obligatorio';
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

  createUser() {
    this.alterableUser = this.user.value;

    if (this.imageFile == null) {
      this.userService
        .createUserAdmin(this.alterableUser, null)
        .subscribe((resp) => {
          console.log(resp);
          this.settingPage.ngOnInit();
          this.clean();
        });
    } else {
      if (this.imageFile?.size! < this.oneMegaByte) {
        this.userService
          .createUserAdmin(this.alterableUser, this.imageFile)
          .subscribe((resp) => {
            console.log(resp);
            this.settingPage.ngOnInit();
            this.clean();
          });
      } else {
        this.imageFile = null;
        this.editImage = null;
        Swal.fire('Error', 'La imagen es muy pesada', 'error');
      }
    }
  }

  editUsers() {
    this.alterableUser = this.user.value;
    if (this.editImage != '') {
      this.alterableUser.urlImage = this.editImage;
    }
    if (this.imageFile == null) {
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
            .editUsers(this.alterableUser, this.editUser.idUser!, null)
            .subscribe(() => {
              this.settingPage.ngOnInit();
              this.clean();
            });
          Swal.fire(
            '¡Perfecto!',
            'El usuario fue editado exitosamente',
            'success'
          );
        }
      });
    } else {
      if (this.imageFile?.size! < this.oneMegaByte) {
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
              .editUsers(
                this.alterableUser,
                this.editUser.idUser!,
                this.imageFile
              )
              .subscribe(() => {
                this.settingPage.ngOnInit();
                this.clean();
              });
            Swal.fire(
              '¡Perfecto!',
              'El usuario fue editado exitosamente',
              'success'
            );
          }
        });
      } else {
        this.imageFile = null;
        this.editImage = null;
        Swal.fire('Error', 'La imagen es muy pesada', 'error');
      }
    }
  }

  deleteUser() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este usuario?',
      text: 'No podras recuperar informacion del mismo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.editUser.idUser!).subscribe(() => {
          this.settingPage.ngOnInit();
          this.clean();
        });
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado', 'success');
      }
    });
  }
}
