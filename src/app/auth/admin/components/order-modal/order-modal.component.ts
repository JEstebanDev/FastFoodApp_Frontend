import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ListBill } from '../../interfaces/bill.interface';
import { UpdateBill } from '../../interfaces/updateBill.interface';
import { BillService } from '../../services/bill.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styles: [],
})
export class OrderModalComponent implements OnInit {
  @Input() bill!: ListBill;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  updateBill!: UpdateBill;
  ngOnInit(): void {}

  constructor(
    private billService: BillService,
    private homeService: HomeService
  ) {}

  closeModal() {
    this.close.emit(false);
  }

  addToOrder() {
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
        this.homeService
          .setStatusOrder(this.bill.billUserDTO.idBill, 'NEW')
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
