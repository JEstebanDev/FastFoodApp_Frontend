import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusOrder',
})
export class StatusOrderPipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'PENDING') {
      value = 'Pendiente';
    }
    if (value == 'ACCEPTED') {
      value = 'Aceptado';
    }
    if (value == 'COOKING') {
      value = 'Cocinando';
    }
    if (value == 'COOKED') {
      value = 'Preparado';
    }
    if (value == 'DELIVERED') {
      value = 'Entregado';
    }
    return value;
  }
}
