import { Component, OnInit } from '@angular/core';
import { Bill, BillInterface } from '../../interfaces/bill.interface';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styles: [],
})
export class BillComponent implements OnInit {
  constructor(private billService: BillService) {}

  listBills!: BillInterface;
  isModalVisible: boolean = false;
  oneBill!: any;
  ngOnInit(): void {
    this.billService
      .getListBills(this.idUser, this.statusBill, this.startDate, this.endDate)
      .subscribe((listBills) => {
        this.listBills = listBills;
      });
  }
  idBill!: string;
  idUser!: string;
  startDate!: Date;
  endDate!: Date;
  statusBill: string = 'DEFAULT';

  searchByParams(params: string, e: any) {
    if (params === 'idBill') {
      this.idBill = e;
    }
    if (params === 'idUser') {
      this.idUser = e;
    }
    if (params === 'startDate') {
      this.startDate = e;
    }
    if (params === 'endDate') {
      this.endDate = e;
    }
    if (params === 'statusBill') {
      this.statusBill = e;
    }
    if (this.idBill != null) {
      if (this.idBill.length > 0) {
        this.billService.getDetailsBill(this.idBill).subscribe((bill) => {
          this.oneBill = bill.data.bill;
          this.isModalVisible = true;
          this.idBill = '';
        });
      }
    }
    this.billService
      .getListBills(this.idUser, this.statusBill, this.startDate, this.endDate)
      .subscribe((listBills) => {
        this.listBills = listBills;
      });
  }
}
