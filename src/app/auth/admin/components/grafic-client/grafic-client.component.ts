import { Component, Input, OnInit } from '@angular/core';
import { InfoClient } from '../../interfaces/reportClient.interface';

@Component({
  selector: 'app-grafic-client',
  templateUrl: './grafic-client.component.html',
  styles: [],
})
export class GraficClientComponent implements OnInit {
  @Input() reportClientItem!: InfoClient;
  constructor() {}

  ngOnInit(): void {}
}
