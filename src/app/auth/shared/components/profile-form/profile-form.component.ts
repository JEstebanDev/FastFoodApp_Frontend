import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/admin/interfaces/user.interface';
import { UserService } from 'src/app/auth/admin/services/user.service';
import Swal from 'sweetalert2';
import { ValidatorEmailService } from '../../services/validator-email.service';
import { ValidatorUsernameService } from '../../services/validator-username.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styles: [],
})
export class ProfileFormComponent implements OnInit {
  @Input() editUser!: User;
  oneMegaByte: number = 1048576;
  editImage!: string | null;
  idUser!: number | null;
  title = 'Nuevo Usuario';
  imageFile!: File | null;
  isClean = true;
  deleteImage = false;

  alterableUser: User = {
    name: '',
    phone: 0,
    email: '',
    password: '',
    status: '',
  };

  user: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      username: ['', Validators.required, [this.validatorUsername]],
      phone: [''],
      email: [
        ,
        [
          Validators.required,
          Validators.pattern(this.validatorEmail.emailPattern),
        ],
        [this.validatorEmail],
      ],
      password: [, [Validators.required]],
      confirmPassword: [, [Validators.required]],
    },
    {
      validators: [
        this.validatorEmail.camposIguales('password', 'confirmPassword'),
      ],
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private validatorEmail: ValidatorEmailService,
    private validatorUsername: ValidatorUsernameService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'].currentValue != null) {
      this.title = 'Editar usuario';
      this.isClean = false;
      this.idUser = this.editUser.idUser!;
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
    this.deleteImage = true;
    this.imageFile = null;
    this.editImage = null;
  }

  ngOnInit(): void {}

  emailText: string = 'Este campo es obligatorio';
  usernameText: string = 'Este campo es obligatorio';
  validate(variable: string) {
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

  editUsers() {
    this.alterableUser = this.user.value;
    console.log(12);
    if (this.imageFile == null) {
      console.log(13);
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
            .subscribe((resp) => {
              console.log(resp);
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
        console.log(14);
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
              .subscribe(() => {});
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
    /*  this.userService.deleteUser(this.editUser.idUser!).subscribe(() => {
      this.userPage.ngOnInit();
      this.clean();
    }); */
  }
}
