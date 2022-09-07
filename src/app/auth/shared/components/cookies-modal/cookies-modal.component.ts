import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cookies-modal',
  templateUrl: './cookies-modal.component.html',
  styles: [],
})
export class CookiesModalComponent implements OnInit {
  constructor() {}
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  acceptCookies() {
    localStorage.setItem('cookies', 'true');
    this.close.emit(false);
  }
}
