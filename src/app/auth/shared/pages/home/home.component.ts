import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/auth/admin/interfaces/products.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  listProducts!: ProductInterface;

  ngOnInit(): void {
    this.homeService.getProductsHighlight().subscribe((listProducts) => {
      this.listProducts = listProducts;
      console.log(this.listProducts);
    });
  }
}
