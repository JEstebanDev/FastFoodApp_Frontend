import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Additional } from '../../interfaces/additional.interface';

@Component({
  selector: 'app-additional-card',
  templateUrl: './additional-card.component.html',
  styles: [],
})
export class AdditionalCardComponent implements OnInit {
  @Input() additional!: Additional;

  @Output() detailAdditional = new EventEmitter<Additional>();
  constructor() {}

  ngOnInit(): void {}

  detailsAdditional() {
    this.detailAdditional.emit(this.additional);
  }
}
