import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonPrev]',
})
export class ButtonPrevDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') nextFunc() {
    let element = this.elementRef.nativeElement.parentElement.children[0];
    let item = element.getElementsByClassName('item');
    element.prepend(item[item.length - 1]);
  }
}
