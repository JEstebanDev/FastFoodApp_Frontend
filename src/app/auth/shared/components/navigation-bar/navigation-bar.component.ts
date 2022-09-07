import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styles: [],
})
export class NavigationBarComponent implements OnInit {
  constructor(private router: Router) {}
  isActive: string = 'inicio';
  ngOnInit(): void {
    console.log(this.router.url);
    switch (this.router.url) {
      case '/order':
        this.isActive = 'carrito';
        break;

      case '/checkout':
        this.isActive = 'pago';
        break;

      case '/home':
        this.isActive = 'inicio';
        break;

      case '/bill':
        this.isActive = 'factura';
        break;

      case '/profile':
        this.isActive = 'perfil';
        break;
      default:
        this.isActive = 'inicio';
        break;
    }
  }
}
