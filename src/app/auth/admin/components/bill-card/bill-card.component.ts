import { Component, Input } from '@angular/core';
import { Bill } from '../../interfaces/bill.interface';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styles: [],
})
export class BillCardComponent {
  @Input() bill!: Bill;
  isModalVisible = false;
  showDetailsBill() {
    this.isModalVisible = true;
  }
}
