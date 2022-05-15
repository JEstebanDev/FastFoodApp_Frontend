import { Component, OnInit } from '@angular/core';
import { AddCartInterface } from '../../interfaces/addCart.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  /* orderList!: AddCartInterface[]; */
  ngOnInit(): void {
    /* if (this.orderService.order != null) {
      this.orderList = this.orderService.order;
      console.log(this.orderList);
    } */
  }
  orderList: AddCartInterface[] = [
    {
      product: {
        idProduct: 17,
        name: 'Pizza Estofada super especial ',
        calories: 1200,
        description:
          'Pollo desmechado, vegetales al wok (cebolla, tomate y pimentón asado), en salsa teriyaki, queso y salsa napolitana.',
        price: 1000,
        duration: '30',
        discountPoint: 120,
        highlight: 2,
        status: 'ACTIVE',
        category: {
          idCategory: 1,
          name: 'Pizza',
          imageUrl: 'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
          status: 'ACTIVE',
        },
        imageUrl: null,
      },
      additional: [
        {
          idAdditional: 3,
          name: 'Mushroom',
          imageUrl: 'imageUrl',
          price: 500,
          category: [
            {
              idCategory: 1,
              name: 'Pizza',
              imageUrl: 'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
              status: 'ACTIVE',
            },
          ],
          status: 'ACTIVE',
        },
        {
          idAdditional: 2,
          name: 'Salami',
          imageUrl: 'imageUrl',
          price: 1000,
          category: [
            {
              idCategory: 1,
              name: 'Pizza',
              imageUrl: 'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
              status: 'ACTIVE',
            },
          ],
          status: 'ACTIVE',
        },
        {
          idAdditional: 1,
          name: 'Ham',
          imageUrl: 'imageUrl',
          price: 800,
          category: [
            {
              idCategory: 1,
              name: 'Pizza',
              imageUrl: 'https://pngimg.com/uploads/pizza/pizza_PNG7151.png',
              status: 'ACTIVE',
            },
            {
              idCategory: 3,
              name: 'HotDog',
              imageUrl:
                'http://assets.stickpng.com/images/580b57fcd9996e24bc43c1b7.png',
              status: 'ACTIVE',
            },
          ],
          status: 'ACTIVE',
        },
      ],
    },
  ];
}
