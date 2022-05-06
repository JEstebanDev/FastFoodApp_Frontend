import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../interfaces/bill.interface';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styles: [],
})
export class BillCardComponent implements OnInit {
  @Input() bill!: Bill;
  isModalVisible = false;
  constructor() {}

  ngOnInit(): void {}

  showDetailsBill() {
    this.isModalVisible = true;
  }
}
