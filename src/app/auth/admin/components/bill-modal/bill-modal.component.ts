import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { ListBill } from '../../interfaces/bill.interface';
import { BillComponent } from '../../pages/bill/bill.component';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-bill-modal',
  templateUrl: './bill-modal.component.html',
  styles: [],
})
export class BillModalComponent implements OnInit {
  private _urlFrontend: string = environment.urlFrontend;
  @Input() bill!: ListBill;
  linkBill: string = '';
  constructor(
    private billService: BillService,
    private billPage: BillComponent
  ) {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  closeModal() {
    this.close.emit(false);
  }

  statusBill(idBill: number, statusBill: string) {
    let status = '';
    if (statusBill == 'DELETED') {
      status = 'eliminada';
    }
    if (statusBill == 'PAID') {
      status = 'paga';
    }
    Swal.fire({
      title: '¿Estas seguro? ',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.bill.billUserDTO.payMode.name == 'Wompi') {
          this.billService
            .updateStatusBillWompi(
              idBill,
              this.bill.billUserDTO.referenceTransaction!
            )
            .subscribe(() => {
              this.billPage.ngOnInit();
            });
        } else {
          this.billService
            .updateStatusBill(idBill, statusBill)
            .subscribe(() => {
              this.billPage.ngOnInit();
            });
        }

        this.close.emit(false);
        Swal.fire(
          'Factura ' + status,
          'Modificado el estado de la factura ' + idBill,
          'success'
        );
      }
    });
  }

  checkTransaction() {
    this.billService
      .checkTransaction(this.bill.billUserDTO.idBill)
      .subscribe((resp: any) => {
        this.bill.billUserDTO.statusBill = resp.data.bill;
      });
  }

  generateQR() {
    this.billService
      .getTokenBill(this.bill.billUserDTO.idBill)
      .subscribe((token) => {
        if (token.statusCode == 401) {
          localStorage.removeItem('token');
        }
        this.linkBill = `${this._urlFrontend}/bill?idBill=${token.data
          ?.unattributed!}`;
      });
  }
}
