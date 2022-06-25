export interface LoginRequest {
  username: string;
  password: string;
}

export interface RecoverRequest {
  newPassword: string;
  repeatNewPassword: string;
}

export interface SignUpRequest {
  username: string;
  name: string;
  phone?: number;
  email: string;
  password: string;
}

export interface LoginResponse {
  timeStamp?: Date;
  statusCode?: number;
  status: string;
  message?: string;
  data?: Data;
}

export interface Data {
  tokens: Tokens;
}

export interface Tokens {
  valid: boolean;
  userRoles: string;
  access_token: string;
  refresh_token: string;
}

export interface SignUpResponse {
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
  idUser: number;
  name: string;
  username: string;
  urlImage: string | null;
  phone: number;
  email: string;
  password: string;
  discountPoint: number;
  userRoles: string;
  status: string;
}
