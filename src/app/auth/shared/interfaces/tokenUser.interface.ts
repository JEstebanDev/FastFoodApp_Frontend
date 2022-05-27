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
  valid: boolean;
  access_token: string;
}

export interface UserInfo {
  idUser: number;
  name: string;
  username: string;
  urlImage: string;
  phone: number;
  email: string;
  discountPoint: number;
  status: string;
}
