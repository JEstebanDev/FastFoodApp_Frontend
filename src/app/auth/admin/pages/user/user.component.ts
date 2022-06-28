import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../interfaces/suggestion.interface';
import { User, UserInterface } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  users!: UserInterface;
  editUser!: User;
  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((listUser) => (this.users = listUser));

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userService.getUsersByName(params.name).subscribe((showClient) => {
        this.router.navigate([], {
          queryParams: { name: null },
        });
        if (showClient.data != null) {
          if (showClient.data.user!.length <= 1) {
            this.editUser = showClient.data.user![0];
          }
        }
      });
    });
  }

  showDetailUser(user: User) {
    this.editUser = user;
  }

  listNames: Suggestion[] = [];
  search(name: string) {
    this.userService.getUsersByName(name).subscribe((result) => {
      this.listNames = [];
      if (result.data != null) {
        result.data.user!.forEach((element) => {
          this.listNames.push({
            imageUrl: element.urlImage != null ? element.urlImage : null,
            name: element.name,
            username: element.username,
          });
        });
      }
    });
  }
}
