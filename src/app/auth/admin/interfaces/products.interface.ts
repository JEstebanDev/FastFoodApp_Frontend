export interface ProductInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  category?: Category[];
  products?: Product[];
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
  duration: string | null;
  highlight: number;
  discountPoint: number;
  status: string;
  category: Category | any;
  imageUrl: null | string;
}
