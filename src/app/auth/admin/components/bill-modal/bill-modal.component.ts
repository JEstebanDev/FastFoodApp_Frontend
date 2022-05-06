import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Bill } from '../../interfaces/bill.interface';

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styles: [],
})
export class BillModalComponent implements OnInit {
  @Input() bill!: Bill;
  constructor() {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(false);
  }
}
