import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateAdminEmployeeGuard } from '../../guards/validate-admin-employee.guard';
import { Suggestion } from '../../interfaces/suggestion.interface';
import { ListUser, UserInterface } from '../../interfaces/user.interface';
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
  editUser!: ListUser;
  validateUser: boolean = false;
  showDetails = false;
  listNames: Suggestion[] = [];
  active = false;
  page: number = 0;
  dataUser: boolean = false;
  ngOnInit(): void {
    this.validateUser = this.validateAdminEmployeeGuard.canActivate();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.userService
        .getUsersByName(params.name)
        .subscribe((showClient: any) => {
          this.router.navigate([], {
            queryParams: { name: null },
          });
          if (showClient.data.user != null) {
            if (showClient.data.user.length >= 1) {
              this.showDetailUser(showClient.data.user[0]);
            }
          }
        });
    });
    this.paginationUser(0);
  }

  paginationUser(numberPage: number) {
    this.userService.getUsers(numberPage).subscribe((listUser) => {
      if (listUser.data.user.listUser.length > 0) {
        this.users = listUser;
      } else {
        this.dataUser = true;
      }
    });
  }

  showDetailUser(user: ListUser) {
    this.editUser = user;
    this.showDetails = true;
    this.scroller.scrollToAnchor('editUser');
  }

  search(name: string) {
    this.userService.getUsersByName(name).subscribe((result: any) => {
      this.listNames = [];
      result.data.user!.forEach((element: any) => {
        this.listNames.push({
          imageUrl: element.urlImage != null ? element.urlImage : null,
          name: element.name,
          username: element.username,
        });
      });
    });
  }
}
