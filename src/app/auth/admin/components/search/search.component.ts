import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @Input() holder: string = '';
  @Input() text: string = '';
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  constructor() {}
  timeout: any = null;

  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        this.onDebounce.emit(event.target.value);
      }
    }, 500);
  }
}
