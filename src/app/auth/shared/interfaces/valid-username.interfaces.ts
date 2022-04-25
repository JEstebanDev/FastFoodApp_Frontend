export interface ValidationUsernameRequest {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  User: User;
}

export interface User {
  username: string;
}
