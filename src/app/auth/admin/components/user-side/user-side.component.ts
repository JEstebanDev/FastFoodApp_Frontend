import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UserComponent } from '../../pages/user/user.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-side',
  templateUrl: './user-side.component.html',
  styles: [],
})
export class UserSideComponent implements OnInit, OnChanges {
  @Input() editUser!: User;

  isClean = true;

  alterableUser: User = {
    name: '',
    username: '',
    phone: 0,
    email: '',
    password: '',
    discountPoint: 0,
    status: '',
  };

  user: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    username: [, [Validators.required]],
    phone: [''],
    email: [, [Validators.required]],
    password: [, [Validators.required]],
    discountPoint: [],
    status: ['ACTIVE', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userPage: UserComponent
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'].currentValue != null) {
      this.isClean = false;
      this.user.get('password')?.clearValidators();
      this.user.get('password')?.updateValueAndValidity();
      this.user.patchValue(this.editUser!);
    }
  }

  ngOnInit(): void {}

  clean() {
    this.user.controls['password'].addValidators([
      Validators.required,
      Validators.minLength(6),
    ]);

    this.isClean = true;
    this.user.reset({ status: 'ACTIVE' });
  }

  createUser() {
    this.alterableUser = this.user.value;
    this.userService.createUser(this.alterableUser).subscribe(() => {
      this.userPage.ngOnInit();
      this.clean();
    });
  }

  editUsers() {
    this.alterableUser = this.user.value;
    this.userService
      .editUsers(this.alterableUser, this.editUser.idUser!)
      .subscribe(() => {
        this.userPage.ngOnInit();
        this.clean();
      });
  }

  deleteUser() {
    this.userService.deleteUser(this.editUser.idUser!).subscribe(() => {
      this.userPage.ngOnInit();
      this.clean();
    });
  }
}
