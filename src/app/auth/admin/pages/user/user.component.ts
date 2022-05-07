import { Component, OnInit } from '@angular/core';
import { User, UserInterface } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  users!: UserInterface;
  editUser!: User;
  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((listUser) => (this.users = listUser));
  }

  showDetailUser(user: User) {
    this.editUser = user;
  }
}
