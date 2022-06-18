import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Bill } from '../../interfaces/bill.interface';
import { UpdateBill } from '../../interfaces/updateBill.interface';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styles: [],
})
export class OrderModalComponent implements OnInit {
  @Input() bill!: Bill;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  updateBill!: UpdateBill;
  ngOnInit(): void {}

  constructor(private billService: BillService) {}

  closeModal() {
    this.close.emit(false);
  }

  addToOrder() {
    this.updateBill = {
      date: new Date(),
      noTable: this.bill.billUserDTO.noTable,
      payMode: {
        idPayMode: this.bill.billUserDTO.payMode.idPayMode,
      },
      statusBill: this.bill.billUserDTO.statusBill,
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Añadirás a la lista esta orden',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, añádela',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.billService
          .updateBill(this.bill.billUserDTO.idBill, this.updateBill)
          .subscribe(() => {
            this.close.emit(true);
            window.location.reload();
          });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Orden añadida',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }
}
