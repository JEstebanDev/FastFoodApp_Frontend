import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  constructor() {}

  @Output() detailUser = new EventEmitter<User>();
  ngOnInit(): void {}

  detailsUser() {
    this.detailUser.emit(this.user);
  }
}
