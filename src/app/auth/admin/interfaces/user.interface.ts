export interface UserInterface {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  pages: number[];
  listUser: ListUser[];
}

export interface ListUser {
  idUser?: number;
  name: string;
  username?: string;
  urlImage?: string | null;
  phone: number;
  email: string;
  password?: string;
  discountPoint?: number;
  userRoles?: string;
  status: string;
}

export interface UserEmployee {
  phone: number;
  email: string;
}
