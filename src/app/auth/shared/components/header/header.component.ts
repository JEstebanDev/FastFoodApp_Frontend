import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/auth/admin/interfaces/products.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private homeService: HomeService) {}
  listProducts!: ProductInterface;
  ngOnInit(): void {
    this.homeService.getProductsHighlight().subscribe((listProducts) => {
      this.listProducts = listProducts;
    });
  }
}
