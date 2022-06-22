export interface UserInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  user: User[];
}

export interface User {
  idUser?: number;
  name: string;
  username?: string;
  urlImage?: string | null;
  phone: number;
  email: string;
  password?: string;
  discountPoint?: number;
  status: string;
}
