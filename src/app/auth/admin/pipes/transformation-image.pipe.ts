import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformationImage',
})
export class TransformationImagePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(
      'upload/',
      'upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/'
    );
  }
}
