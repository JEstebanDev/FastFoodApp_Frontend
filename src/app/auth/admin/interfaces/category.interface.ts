export interface CategoryInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface ListCategoryInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: ListData;
}
export interface ListData {
  category: Category[];
}

export interface Data {
  category: Category;
}

export interface Category {
  idCategory: number;
  name: string;
  imageUrl: string | null;
  status: string;
}
