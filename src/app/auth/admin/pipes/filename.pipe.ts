import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename',
})
export class FilenamePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value == null) {
      value = 'Elige una imagen';
    }
    return value;
  }
}
