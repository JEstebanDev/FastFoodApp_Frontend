export interface Onebill {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  bill: Bill;
}

export interface Bill {
  billUserDTO: BillUserDTO;
  ordersDTO: OrdersDTO[];
}

export interface BillUserDTO {
  idBill: number;
  idTransaction: string | null;
  date: Date;
  noTable: number;
  totalPrice: number;
  statusBill: string;
  payMode: PayMode;
  userForBill: UserForBill;
}

export interface PayMode {
  idPayMode: number;
  name: string;
  status: string;
}

export interface UserForBill {
  idUser: number;
  urlImage: string;
  username: string;
  name: string;
}

export interface OrdersDTO {
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
  imageUrl: string;
  price: number;
  category: Category[];
  status: string;
}

export interface Category {
  idCategory: number;
  name: string;
  imageUrl: string;
  status: string;
}

export interface Product {
  idProduct: number;
  name: string;
  calories: number;
  description: string;
  price: number;
  duration: null | string;
  highlight: number;
  discountPoint: number;
  status: string;
  category: Category;
  imageUrl: null | string;
}
