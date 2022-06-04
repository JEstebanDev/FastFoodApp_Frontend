export interface OrderResponse {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  order: Order;
}

export interface Order {
  idOrder: number;
  statusOrder: string;
  amount: number;
  total: number;
  product: Product;
  additional: Additional[];
}

export interface Additional {
  idAdditional: number;
  name: string;
  imageUrl: null;
  price: number;
  category: Category[];
  status: Status;
}

export interface Category {
  idCategory: number;
  name: string;
  imageUrl: string;
  status: Status;
}

export enum Status {
  Active = 'ACTIVE',
}

export interface Product {
  idProduct: number;
  name: string;
  calories: number;
  description: string;
  price: number;
  duration: string;
  discountPoint: number;
  highlight: number;
  status: Status;
  category: Category;
  imageUrl: null;
}
