import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { OrdersDTO } from '../../interfaces/bill.interface';
import { Bill } from '../../interfaces/onebill.interface';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  constructor(private billService: BillService) {}
  bill!: Bill;
  homeProductsDetails: OrdersDTO[] = [];
  isModalVisible = false;
  getProductsDetails(productsDetails: OrdersDTO[]) {
    this.homeProductsDetails = productsDetails;
  }

  search(idBill: string) {
    this.billService.getDetailsBill(idBill).subscribe((onebill) => {
      if (onebill.statusCode != 400) {
        if (onebill.data.bill.billUserDTO != null) {
          this.isModalVisible = true;
          this.bill = onebill.data.bill;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Esta factura no existe',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Esta factura no existe',
        });
      }
    });
  }
}
