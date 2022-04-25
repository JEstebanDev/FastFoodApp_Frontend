import { Component, Input, OnInit } from '@angular/core';
import { OrdersDTO } from '../../interfaces/home.interface';
@Component({
  selector: 'app-home-products-details',
  templateUrl: './home-products-details.component.html',
  styles: [],
})
export class HomeProductsDetailsComponent implements OnInit {
  @Input() homeProductsDetails!: OrdersDTO[];
  constructor() {}

  ngOnInit(): void {}
}
