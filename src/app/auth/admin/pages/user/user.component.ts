import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';
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
    private router: Router,
    private scroller: ViewportScroller,
    private validateAdminEmployeeGuard: ValidateAdminEmployeeGuard
  ) {}
  users!: UserInterface;
  editUser!: User;
  validateUser: boolean = false;
  showDetails = false;
  listNames: Suggestion[] = [];
  active = false;
  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();
    this.userService
      .getUsers()
      .subscribe((listUser) => (this.users = listUser));

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userService.getUsersByName(params.name).subscribe((showClient) => {
        this.router.navigate([], {
          queryParams: { name: null },
        });
        if (showClient.data != null) {
          if (showClient.data.user!.length >= 1) {
            this.showDetailUser(showClient.data.user![0]);
          }
        }
      });
    });
  }

  showDetailUser(user: User) {
    this.editUser = user;
    this.showDetails = true;
    this.scroller.scrollToAnchor('editUser');
  }

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
