export interface Taxes {
  timeStamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  tax: Tax[];
}

export interface Tax {
  idTax: number;
  value: number;
}
