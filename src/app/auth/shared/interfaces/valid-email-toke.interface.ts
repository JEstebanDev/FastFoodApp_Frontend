export interface ValidEmailToken {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data?: Data;
}

export interface Data {
  valid: boolean;
}
