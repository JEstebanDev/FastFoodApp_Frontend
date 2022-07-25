import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [],
})
export class UserCardComponent implements OnInit {
  @Input() user!: ListUser;
  constructor() {}

  @Output() detailUser = new EventEmitter<ListUser>();
  ngOnInit(): void {}

  detailsUser() {
    this.detailUser.emit(this.user);
  }
}
