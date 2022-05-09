import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonNext]',
})
export class ButtonNextDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') nextFunc() {
    let element = this.elementRef.nativeElement.parentElement.children[0];
    let item = element.getElementsByClassName('item');
    element.append(item[0]);
  }
}
