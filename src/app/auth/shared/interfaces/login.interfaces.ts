export interface LoginRequest {
  username: string;
  password: string;
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
  access_token: string;
  refresh_token: string;
}
