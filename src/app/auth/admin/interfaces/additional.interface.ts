export interface AdditionalInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  additional: Additional | Additional[] | boolean;
}

export interface Additional {
  idAdditional: number;
  name: string;
  imageUrl: string | null;
  price: number;
  category: Category[];
  status: string;
}

export interface Category {
  idCategory: number;
  name?: string;
  imageUrl?: string;
  status?: string;
}

export interface CategoriesValue {
  idCategory: number;
  name: string;
  check: boolean;
}
