import { Component, Input } from '@angular/core';
import { ListBill } from '../../interfaces/bill.interface';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styles: [],
})
export class BillCardComponent {
  @Input() bill!: ListBill;
  isModalVisible = false;
  showDetailsBill() {
    this.isModalVisible = true;
  }
}
