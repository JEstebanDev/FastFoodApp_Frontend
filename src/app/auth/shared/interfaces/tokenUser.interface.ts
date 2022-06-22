export interface TokenUser {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data?: Data;
}

export interface Data {
  user: DataUser;
}

export interface DataUser {
  tokens: Tokens;
  user: UserInfo;
}

export interface Tokens {
  access_token: string;
}

export interface UserInfo {
  idUser: number;
  name: string;
  username: string;
  urlImage: string | null;
  phone: number;
  email: string;
  discountPoint: number;
  userRoles: string;
  status: string;
}
