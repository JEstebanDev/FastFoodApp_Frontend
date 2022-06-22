export interface AddCartInterface {
  amount: number;
  bill: BillUser;
  product: Product;
  additional?: Additional[];
}
export interface Additional {
  idAdditional: number;
  name: string;
  imageUrl: string | null;
  price: number;
  category: Category[];
  status: string;
}

export interface BillUser {
  idBill: number;
}

export interface Category {
  idCategory: number;
  name?: string;
  imageUrl?: string;
  status?: string;
}

export interface Product {
  idProduct: number;
  name: string;
  calories: number;
  description: string;
  price: number;
  duration: string | null;
  highlight: number;
  discountPoint: number;
  status: string;
  category: Category;
  imageUrl: null | string;
}
