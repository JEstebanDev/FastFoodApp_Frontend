import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBill',
})
export class StatusBillPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'DELETED':
        value = 'ELIMINADA';
        break;
      case 'PENDING':
        value = 'PENDIENTE';
        break;
      case 'PAID':
        value = 'PAGA';
        break;
    }
    return value;
  }
}
